use std::path::Path;

use paxhtml::RoutePath;

mod content;
mod elements;
mod js;
mod markdown;
mod rss;
#[cfg(feature = "serve")]
mod serve;
mod styles;
mod syntax;
mod util;
mod views;

#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub enum Route<'a> {
    Index,
    Blog,
    BlogPost { post_id: &'a str },
    BlogTags,
    BlogTag { tag_id: &'a str },
    BlogRss,
    Styles,
    Scripts,
    Icon,
    Favicon,
}
impl<'a> From<Route<'a>> for RoutePath {
    fn from(route: Route<'a>) -> Self {
        route.route_path()
    }
}
impl<'a> Route<'a> {
    pub fn route_path(&self) -> RoutePath {
        match *self {
            Route::Index => RoutePath::new([], None),
            Route::Blog => RoutePath::new(["blog"], None),
            Route::BlogPost { post_id } => RoutePath::new(["blog", post_id], None),
            Route::BlogTags => RoutePath::new(["blog", "tags"], None),
            Route::BlogTag { tag_id } => RoutePath::new(["blog", "tags", tag_id], None),
            Route::BlogRss => RoutePath::new([], "blog.rss".to_string()),
            Route::Styles => RoutePath::new([], "styles.css".to_string()),
            Route::Scripts => RoutePath::new([], "scripts.js".to_string()),
            Route::Icon => RoutePath::new([], "icon.png".to_string()),
            Route::Favicon => RoutePath::new([], "favicon.ico".to_string()),
        }
    }
    pub fn url_path(&self) -> String {
        self.route_path().url_path()
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

#[derive(Copy, Clone)]
pub struct ViewContext<'a> {
    pub syntax: &'a syntax::SyntaxHighlighter,
    pub content: &'a content::Content,
}

fn main() -> anyhow::Result<()> {
    let mut timer = Timer::new();

    let output_dir = Path::new("public");
    let static_dir = Path::new("static");
    #[cfg(feature = "serve")]
    let port = 8192;

    let syntax = timer.step(
        "Loaded syntax highlighter",
        syntax::SyntaxHighlighter::default,
    );

    let rss_config = rss::RssConfig {
        base_url: "https://philpax.me",
        rss_title: "Philpax's Blog",
        rss_author: "Philpax",
        rss_description: concat!(
            "The blog of Philpax, ",
            "your friendly neighbourhood polyglot programmer/engineer, ",
            "cursed with more projects than time."
        ),
        syntax: &syntax,
    };

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

    let content = timer.step("Read content", content::Content::read)?;

    let view_context = ViewContext {
        content: &content,
        syntax: &syntax,
    };

    timer.step("Copied static content", || {
        // Copy all static content first
        util::copy_dir(static_dir, output_dir)
    })?;

    timer.step("Wrote content", || {
        // Write out content
        for doc in &content.blog.documents {
            let post_route_path = content.blog.route_path(doc);

            views::blog::post(view_context, doc)
                .write_to_route(output_dir, post_route_path.clone())?;
            {
                let post_output_dir = post_route_path.dir_path(output_dir);
                for path in &doc.files {
                    std::fs::copy(path, post_output_dir.join(path.file_name().unwrap()))?;
                }
            }

            // Write redirect for alternate_id if it exists
            if let Some(alternate_route_path) = content.blog.alternate_route_path(doc) {
                views::redirect(&post_route_path.url_path())
                    .write_to_route(output_dir, alternate_route_path)?;
            }
        }

        anyhow::Ok(())
    })?;

    timer.step("Wrote blog index", || {
        // Write out blog index
        views::blog::index(view_context).write_to_route(output_dir, Route::Blog)
    })?;

    timer.step("Wrote blog tags", || {
        // Write out tags
        views::blog::tags::index(view_context).write_to_route(output_dir, Route::BlogTags)?;
        for tag_id in content.blog.tags.keys() {
            views::blog::tags::tag(view_context, tag_id)
                .write_to_route(output_dir, Route::BlogTag { tag_id })?;
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote main index", || {
        // Write out main index
        views::main::index(view_context).write_to_route(output_dir, Route::Index)
    })?;

    timer.step("Wrote RSS feed", || {
        // Write out RSS feed
        let route_path = Route::BlogRss.route_path();
        anyhow::Ok(route_path.write(
            output_dir,
            rss::generate(rss_config, &content.blog, route_path.filename())?,
        )?)
    })?;

    timer.step("Wrote bundled styles", || {
        // Write out bundled styles
        anyhow::Ok(
            Route::Styles
                .route_path()
                .write(output_dir, styles::generate(view_context)?)?,
        )
    })?;

    timer.step("Wrote bundled JavaScript", || {
        // Write out bundled JavaScript
        anyhow::Ok(
            Route::Scripts
                .route_path()
                .write(output_dir, js::generate()?)?,
        )
    })?;

    timer.finish();

    #[cfg(feature = "serve")]
    serve::serve(output_dir, port)?;

    Ok(())
}
