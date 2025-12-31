use std::path::Path;

use anyhow::Context;
use paxhtml::bumpalo::Bump;
use paxhtml::RoutePath;

use crate::content::DocumentId;

mod content;
mod elements;
mod js;
mod markdown;
mod og_image;
mod rss;
#[cfg(feature = "serve")]
mod serve;
mod styles;
mod syntax;
mod util;
mod views;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Route {
    Index,
    Blog,
    BlogPost {
        post_id: DocumentId,
    },
    Updates,
    UpdatePost {
        post_id: DocumentId,
    },
    Notes,
    Note {
        note_id: DocumentId,
    },
    Tags,
    Tag {
        tag_id: String,
    },
    /// No longer in use: just the home page
    DeprecatedAbout,
    BlogRss,
    UpdatesRss,
    Credits,
    Styles,
    Scripts,
    Icon,
    Favicon,
    DarkModeIcon,
    LightModeIcon,
}
impl Route {
    pub fn route_path(&self) -> RoutePath {
        match self {
            Route::Index => RoutePath::new([], None),
            Route::Blog => RoutePath::new(["blog"], None),
            Route::BlogPost { post_id } => RoutePath::new(
                ["blog"]
                    .iter()
                    .copied()
                    .chain(post_id.iter().map(|s| s.as_str())),
                None,
            ),
            Route::Updates => RoutePath::new(["updates"], None),
            Route::UpdatePost { post_id } => RoutePath::new(
                ["updates"]
                    .iter()
                    .copied()
                    .chain(post_id.iter().map(|s| s.as_str())),
                None,
            ),
            Route::Notes => RoutePath::new(["notes"], None),
            Route::Note { note_id } => RoutePath::new(
                ["notes"]
                    .iter()
                    .copied()
                    .chain(note_id.iter().map(|s| s.as_str())),
                None,
            ),
            Route::Tags => RoutePath::new(["tags"], None),
            Route::Tag { tag_id } => RoutePath::new(["tags", tag_id], None),
            Route::DeprecatedAbout => RoutePath::new(["about"], None),
            Route::BlogRss => RoutePath::new([], "blog.rss".to_string()),
            Route::UpdatesRss => RoutePath::new([], "updates.rss".to_string()),
            Route::Credits => RoutePath::new(["credits"], None),
            Route::Styles => RoutePath::new([], "styles.css".to_string()),
            Route::Scripts => RoutePath::new([], "scripts.js".to_string()),
            Route::Icon => RoutePath::new([], "icon.png".to_string()),
            Route::Favicon => RoutePath::new([], "favicon.ico".to_string()),
            Route::DarkModeIcon => RoutePath::new(["phosphor"], "moon.svg".to_string()),
            Route::LightModeIcon => RoutePath::new(["phosphor"], "sun.svg".to_string()),
        }
    }
    pub fn url_path(&self) -> String {
        self.route_path().url_path()
    }
    pub fn abs_url(&self, domain: &str) -> String {
        self.route_path().abs_url(domain)
    }
}
impl From<Route> for RoutePath {
    fn from(route: Route) -> Self {
        route.route_path()
    }
}

struct Timer {
    step: usize,
    accumulated: std::time::Duration,
}
impl Timer {
    pub fn new() -> Self {
        Self {
            step: 1,
            accumulated: std::time::Duration::ZERO,
        }
    }
    pub fn step<R>(&mut self, label: &str, f: impl FnOnce() -> R) -> R {
        let now = std::time::Instant::now();
        let result = f();
        let elapsed = now.elapsed();
        println!("{}. {} in {:?}", self.step, label, elapsed);
        self.step += 1;
        self.accumulated += elapsed;
        result
    }
    pub fn finish(self) {
        println!("Total time: {:?}", self.accumulated);
    }
}

fn main() -> anyhow::Result<()> {
    let fast = std::env::args().any(|arg| arg == "--fast" || arg == "-f");
    let use_global_tailwind =
        std::env::args().any(|arg| arg == "--use-global-tailwind" || arg == "-u");

    let mut timer = Timer::new();

    let output_dir = Path::new("public");
    #[cfg(feature = "serve")]
    let port = 8192;

    if !fast {
        timer.step("Cleared output directory", || {
            if output_dir.is_dir() {
                // Remove everything in the public directory; this is done manually
                // to ensure that you can continue serving from the directory while
                // the build is running.
                for entry in std::fs::read_dir(output_dir)? {
                    let path = entry?.path();
                    if path.is_dir() {
                        std::fs::remove_dir_all(&path)?;
                    } else {
                        std::fs::remove_file(&path)?;
                    }
                }
            }
            anyhow::Ok(())
        })?;
    } else {
        timer.step(
            "Fast mode enabled, skipping output directory clearing",
            || anyhow::Ok(()),
        )?;
    }

    timer.step("Copied baked static content", || {
        util::copy_dir(Path::new("assets/baked/static"), output_dir)
    })?;

    timer.step("Copied static content", || {
        util::copy_dir(Path::new("static"), output_dir)
    })?;

    // Run syntax loading, tailwind generation, and content reading in parallel
    let (syntax, tailwind_css, content) = timer.step(
        "Loaded syntax, generated Tailwind CSS, and read content",
        || {
            let ((syntax, tailwind_css), content) = rayon::join(
                || {
                    rayon::join(syntax::SyntaxHighlighter::default, || {
                        styles::generate_tailwind(fast, use_global_tailwind)
                    })
                },
                || content::Content::read(fast),
            );

            anyhow::Ok((syntax, tailwind_css?, content?))
        },
    )?;
    // ViewContextBase can be shared across threads (no bump reference)
    let view_context = views::ViewContextBase {
        website_author: "Philpax",
        website_name: "Philpax",
        website_description: concat!(
            "The blog of Philpax, ",
            "your friendly neighbourhood polyglot programmer/engineer, ",
            "cursed with more projects than time."
        ),
        website_base_url: "https://philpax.me",
        content: &content,
        syntax: &syntax,
        generation_date: chrono::Utc::now(),
        fast,
    };

    timer.step("Wrote content", || {
        use rayon::prelude::*;

        content
            .blog
            .documents
            .par_iter()
            .chain(content.updates.documents.par_iter())
            .try_for_each(|doc| {
                let bump = Bump::new();
                let post_route_path = doc.route_path();

                let view = match doc.document_type {
                    content::DocumentType::Blog => views::blog::post(view_context.with_bump(&bump), doc),
                    content::DocumentType::Update => views::updates::post(view_context.with_bump(&bump), doc),
                    content::DocumentType::Note => unreachable!(),
                };

                view.write_to_route(output_dir, post_route_path.clone())?;
                {
                    let post_output_dir = post_route_path.dir_path(output_dir);
                    for path in &doc.files {
                        let output_path = post_output_dir.join(path.file_name().unwrap());
                        std::fs::copy(path, &output_path).with_context(|| {
                            format!("failed to copy content file {path:?} to {output_path:?}")
                        })?;
                    }
                }

                // Write redirect for alternate_id if it exists
                if let Some(alternate_route_path) = doc.alternate_route_path() {
                    views::redirect(&bump, &post_route_path.url_path())
                        .write_to_route(output_dir, alternate_route_path)?;
                }

                anyhow::Ok(())
            })?;

        fn write_note_folder(
            output_dir: &Path,
            context: views::ViewContextBase<'_>,
            folder: &content::DocumentFolderNode,
        ) -> anyhow::Result<()> {
            if let Some(index_document) = &folder.index_document {
                let bump = Bump::new();
                views::notes::note(context.with_bump(&bump), index_document).write_to_route(
                    output_dir,
                    Route::Note {
                        note_id: index_document.id.clone(),
                    },
                )?;
            }

            for child in folder.children.values() {
                match child {
                    content::DocumentNode::Folder(folder) => {
                        write_note_folder(output_dir, context, folder)?;
                    }
                    content::DocumentNode::Document { document } => {
                        let bump = Bump::new();
                        views::notes::note(context.with_bump(&bump), document).write_to_route(
                            output_dir,
                            Route::Note {
                                note_id: document.id.clone(),
                            },
                        )?;
                    }
                }
            }
            Ok(())
        }

        write_note_folder(output_dir, view_context, &content.notes.documents)?;

        anyhow::Ok(())
    })?;

    if !fast {
        timer.step("Generated OG images", || {
            use rayon::prelude::*;

            let og_images_dir = output_dir.join("og-images");
            std::fs::create_dir_all(&og_images_dir)?;

            // Create subdirectories
            std::fs::create_dir_all(og_images_dir.join("blog"))?;
            std::fs::create_dir_all(og_images_dir.join("updates"))?;
            std::fs::create_dir_all(og_images_dir.join("notes"))?;

            let generator = og_image::Generator::new(view_context.website_author.into())?;

            // Helper function to generate OG image for a document
            fn generate_doc_image(
                generator: &og_image::Generator,
                output_dir: &Path,
                og_images_dir: &Path,
                doc: &content::Document,
            ) -> anyhow::Result<()> {
                let (post_type, type_subdir) = match doc.document_type {
                    content::DocumentType::Blog => ("blog", "blog"),
                    content::DocumentType::Update => ("update", "updates"),
                    content::DocumentType::Note => ("note", "notes"),
                };

                let hero_image_path = doc.hero_filename_and_alt.as_ref().map(|(filename, _)| {
                    doc.route_path()
                        .with_filename(filename)
                        .file_path(output_dir)
                });

                let options = og_image::OgImageOptions {
                    post_type: post_type.to_string(),
                    title: doc.metadata.title.clone(),
                    datetime: doc.metadata.datetime,
                    hero_image_path: hero_image_path.as_deref(),
                };

                let type_dir = og_images_dir.join(type_subdir);
                let filename = format!("{}.png", doc.id.join("-"));
                let output_path = type_dir.join(&filename);

                generator
                    .generate(&options, &output_path)
                    .with_context(|| {
                        format!("Failed to generate OG image for {}", doc.metadata.title)
                    })?;

                Ok(())
            }

            // Collect all documents
            let mut all_docs = Vec::new();

            // Add blog posts and updates
            all_docs.extend(content.blog.documents.iter());
            all_docs.extend(content.updates.documents.iter());

            // Recursively collect notes
            fn collect_notes<'a>(
                docs: &mut Vec<&'a content::Document>,
                folder: &'a content::DocumentFolderNode,
            ) {
                if let Some(index_document) = &folder.index_document {
                    docs.push(index_document);
                }
                for child in folder.children.values() {
                    match child {
                        content::DocumentNode::Folder(folder) => {
                            collect_notes(docs, folder);
                        }
                        content::DocumentNode::Document { document } => {
                            docs.push(document);
                        }
                    }
                }
            }

            collect_notes(&mut all_docs, &content.notes.documents);

            // Generate images in parallel
            all_docs.par_iter().try_for_each(|doc| {
                generate_doc_image(&generator, output_dir, &og_images_dir, doc)
            })?;

            anyhow::Ok(())
        })?;
    } else {
        timer.step(
            "Skipped OG image generation in fast mode",
            || anyhow::Ok(()),
        )?;
    }

    timer.step("Wrote blog index", || {
        let bump = Bump::new();
        let result = views::blog::index(view_context.with_bump(&bump)).write_to_route(output_dir, Route::Blog);
        result
    })?;

    timer.step("Wrote updates index", || {
        let bump = Bump::new();
        let result = views::updates::index(view_context.with_bump(&bump)).write_to_route(output_dir, Route::Updates);
        result
    })?;

    timer.step("Wrote tags", || {
        let bump = Bump::new();
        views::tags::index(view_context.with_bump(&bump)).write_to_route(output_dir, Route::Tags)?;

        for tag_id in content.tags.keys() {
            let bump = Bump::new();
            views::tags::tag(view_context.with_bump(&bump), tag_id).write_to_route(
                output_dir,
                Route::Tag {
                    tag_id: tag_id.to_string(),
                },
            )?;
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote credits", || {
        let bump = Bump::new();
        let result = views::credits::index(view_context.with_bump(&bump)).write_to_route(output_dir, Route::Credits);
        result
    })?;

    timer.step("Wrote frontpage", || {
        let bump = Bump::new();
        views::frontpage::index(view_context.with_bump(&bump))
            .write_to_route(output_dir, Route::Index)?;
        let bump = Bump::new();
        let result = views::redirect(&bump, &Route::Index.url_path())
            .write_to_route(output_dir, Route::DeprecatedAbout);
        result
    })?;

    timer.step("Wrote RSS feeds", || {
        for (route, collection, title_suffix, description) in [
            (
                Route::BlogRss,
                &content.blog,
                "blog",
                view_context.website_description,
            ),
            (
                Route::UpdatesRss,
                &content.updates,
                "updates",
                concat!(
                    "More-frequent, less-formal updates from Philpax, ",
                    "your friendly neighbourhood polyglot programmer/engineer, ",
                    "cursed with more projects than time."
                ),
            ),
        ] {
            let output = rss::generate(
                view_context,
                collection,
                title_suffix,
                description,
                route.clone(),
            )?;
            RoutePath::from(route).write(output_dir, output)?;
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote bundled styles", || {
        let output = styles::generate(view_context, &tailwind_css)?;
        RoutePath::from(Route::Styles).write(output_dir, output.css)?;
        RoutePath::from(Route::DarkModeIcon).write(output_dir, output.dark_mode_icon)?;
        RoutePath::from(Route::LightModeIcon).write(output_dir, output.light_mode_icon)?;
        anyhow::Ok(())
    })?;

    timer.step("Wrote bundled JavaScript", || {
        RoutePath::from(Route::Scripts).write(output_dir, js::generate()?)?;
        anyhow::Ok(())
    })?;

    timer.finish();

    #[cfg(feature = "serve")]
    serve::serve(
        output_dir,
        port,
        std::env::args().any(|arg| arg == "--public" || arg == "-p"),
    )?;

    Ok(())
}
