use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use paxhtml::RoutePath;
use paxhtml::bumpalo::Bump;

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
mod timer;
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

fn main() -> anyhow::Result<()> {
    let fast = std::env::args().any(|arg| arg == "--fast" || arg == "-f");
    let use_global_tailwind =
        std::env::args().any(|arg| arg == "--use-global-tailwind" || arg == "-u");
    let verbose = std::env::args().any(|arg| arg == "--verbose" || arg == "-v");

    let mut timer = timer::Timer::new(verbose);

    let output_dir = Path::new("public");
    #[cfg(feature = "serve")]
    let port = 8192;

    if !fast {
        timer.step("Cleared output directory", |_| {
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
            |_| anyhow::Ok(()),
        )?;
    }

    timer.step("Copied baked static content", |_| {
        util::copy_dir(Path::new("assets/baked/static"), output_dir, fast)
    })?;

    timer.step("Copied static content", |_| {
        util::copy_dir(Path::new("static"), output_dir, fast)
    })?;

    // Run syntax loading, tailwind generation, and content reading in parallel
    let (syntax, tailwind_css, content) = timer.step(
        "Loaded syntax, generated Tailwind CSS, and read content",
        |substeps| {
            use std::sync::Mutex;

            // Collect timing reports from parallel tasks
            let tailwind_reports: Mutex<Vec<(&'static str, std::time::Duration)>> =
                Mutex::new(Vec::new());
            let content_reports: Mutex<Vec<(&'static str, std::time::Duration)>> =
                Mutex::new(Vec::new());

            let ((syntax, tailwind_css), content) = rayon::join(
                || {
                    rayon::join(syntax::SyntaxHighlighter::default, || {
                        styles::generate_tailwind(
                            fast,
                            use_global_tailwind,
                            &mut |label, elapsed| {
                                tailwind_reports.lock().unwrap().push((label, elapsed));
                            },
                        )
                    })
                },
                || {
                    content::Content::read(fast, &mut |label, elapsed| {
                        content_reports.lock().unwrap().push((label, elapsed));
                    })
                },
            );

            // Report tailwind timings
            substeps.step_nested("Generated Tailwind CSS", |nested| {
                for (label, elapsed) in tailwind_reports.into_inner().unwrap() {
                    nested.report(label, elapsed);
                }
            });

            // Report content timings
            substeps.step_nested("Read content", |nested| {
                for (label, elapsed) in content_reports.into_inner().unwrap() {
                    nested.report(label, elapsed);
                }
            });

            anyhow::Ok((syntax, tailwind_css?, Arc::new(content?)))
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

    timer.step("Wrote content", |_| {
        use rayon::prelude::*;

        fn collect_notes<'a>(
            folder: &'a content::DocumentFolderNode,
            docs: &mut Vec<&'a content::Document>,
        ) {
            if let Some(doc) = &folder.index_document {
                docs.push(doc);
            }
            for child in folder.children.values() {
                match child {
                    content::DocumentNode::Folder(folder) => collect_notes(folder, docs),
                    content::DocumentNode::Document { document } => docs.push(document),
                }
            }
        }

        fn write_post(
            output_dir: &Path,
            view_context: views::ViewContextBase<'_>,
            doc: &content::Document,
            view: paxhtml::Document,
        ) -> anyhow::Result<()> {
            let route_path = doc.route_path();
            view.write_to_route(output_dir, route_path.clone())?;

            // Copy associated files
            let post_output_dir = route_path.dir_path(output_dir);
            for path in &doc.files {
                let output_path = post_output_dir.join(path.file_name().unwrap());
                util::copy_or_symlink(path, &output_path, view_context.fast)
                    .with_context(|| format!("failed to copy {path:?} to {output_path:?}"))?;
            }

            // Write redirect for alternate URL if needed
            if let Some(alternate_route_path) = doc.alternate_route_path() {
                let bump = paxhtml::bumpalo::Bump::new();
                views::redirect(&bump, &route_path.url_path())
                    .write_to_route(output_dir, alternate_route_path)?;
            }
            Ok(())
        }

        let mut all_docs: Vec<&content::Document> = Vec::new();
        all_docs.extend(&content.blog.documents);
        all_docs.extend(&content.updates.documents);
        collect_notes(&content.notes.documents, &mut all_docs);

        all_docs.par_iter().try_for_each(|doc| {
            let bump = Bump::new();
            let ctx = view_context.with_bump(&bump);

            match doc.document_type {
                content::DocumentType::Blog => {
                    let view = views::blog::post(ctx, doc);
                    write_post(output_dir, view_context, doc, view)?;
                }
                content::DocumentType::Update => {
                    let view = views::updates::post(ctx, doc);
                    write_post(output_dir, view_context, doc, view)?;
                }
                content::DocumentType::Note => {
                    views::notes::note(ctx, doc).write_to_route(output_dir, doc.route_path())?;
                }
            }
            anyhow::Ok(())
        })
    })?;

    // Spawn OG image generation in a background thread (non-blocking)
    let og_image_handle = if !fast {
        Some(og_image::spawn_generation(
            Arc::clone(&content),
            output_dir,
            view_context.website_author,
        ))
    } else {
        timer.step("Skipped OG image generation in fast mode", |_| {
            anyhow::Ok(())
        })?;
        None
    };

    timer.step("Wrote blog index", |_| {
        let bump = Bump::new();

        views::blog::index(view_context.with_bump(&bump)).write_to_route(output_dir, Route::Blog)
    })?;

    timer.step("Wrote updates index", |_| {
        let bump = Bump::new();

        views::updates::index(view_context.with_bump(&bump))
            .write_to_route(output_dir, Route::Updates)
    })?;

    timer.step("Wrote tags", |substeps| {
        substeps.step("Wrote tags index", || {
            let bump = Bump::new();

            views::tags::index(view_context.with_bump(&bump))
                .write_to_route(output_dir, Route::Tags)
        })?;

        substeps.step("Wrote individual tags", || {
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

        anyhow::Ok(())
    })?;

    timer.step("Wrote credits", |_| {
        let bump = Bump::new();

        views::credits::index(view_context.with_bump(&bump))
            .write_to_route(output_dir, Route::Credits)
    })?;

    timer.step("Wrote frontpage", |substeps| {
        substeps.step("Wrote index", || {
            let bump = Bump::new();

            views::frontpage::index(view_context.with_bump(&bump))
                .write_to_route(output_dir, Route::Index)
        })?;
        substeps.step("Wrote deprecated about redirect", || {
            let bump = Bump::new();

            views::redirect(&bump, &Route::Index.url_path())
                .write_to_route(output_dir, Route::DeprecatedAbout)
        })?;
        anyhow::Ok(())
    })?;

    timer.step("Wrote RSS feeds", |substeps| {
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
            substeps.step(
                &format!("Wrote {title_suffix} RSS"),
                || -> anyhow::Result<()> {
                    let output = rss::generate(
                        view_context,
                        collection,
                        title_suffix,
                        description,
                        route.clone(),
                    )?;
                    RoutePath::from(route).write(output_dir, output)?;
                    Ok(())
                },
            )?;
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote bundled styles", |substeps| {
        let output = substeps.step("Generated styles", || {
            styles::generate(view_context, &tailwind_css)
        })?;
        substeps.step("Wrote CSS", || {
            RoutePath::from(Route::Styles).write(output_dir, output.css)
        })?;
        anyhow::Ok(())
    })?;

    timer.step("Wrote bundled JavaScript", |_| {
        RoutePath::from(Route::Scripts).write(output_dir, js::generate()?)?;
        anyhow::Ok(())
    })?;

    // Handle OG image generation completion
    #[cfg(feature = "serve")]
    {
        // In serve mode, let OG images generate in the background while serving
        if og_image_handle.is_some() {
            timer.report("OG images", "generating in background");
        }
        timer.finish();

        // Pass the handle to serve so it can report when done
        serve::serve(
            output_dir,
            port,
            std::env::args().any(|arg| arg == "--public" || arg == "-p"),
            og_image_handle,
        )?;
    }

    #[cfg(not(feature = "serve"))]
    {
        // In production mode, wait for OG images to complete before finishing
        if let Some(handle) = og_image_handle {
            timer.step("Generated OG images", |_| {
                handle
                    .join()
                    .map_err(|_| anyhow::anyhow!("OG image generation thread panicked"))?
            })?;
        }
        timer.finish();
    }

    Ok(())
}
