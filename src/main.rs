use std::path::Path;

use paxhtml::RoutePath;

mod content;
mod elements;
#[cfg(feature = "fonts")]
mod fonts;
mod js;
mod markdown;
mod rss;
mod styles;
mod syntax;
mod util;
mod views;

#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub enum Route<'a> {
    Index,
    Collection {
        collection_id: &'a str,
    },
    CollectionPost {
        collection_id: &'a str,
        post_id: &'a str,
    },
    Tags,
    Tag {
        tag_id: &'a str,
    },
}
impl<'a> From<Route<'a>> for RoutePath {
    fn from(route: Route<'a>) -> Self {
        route.route_path()
    }
}
impl<'a> Route<'a> {
    pub fn route_path(&self) -> RoutePath {
        match *self {
            Route::Index => RoutePath::new([]),
            Route::Collection { collection_id } => RoutePath::new([collection_id]),
            Route::CollectionPost {
                collection_id,
                post_id,
            } => RoutePath::new([collection_id, post_id]),
            Route::Tags => RoutePath::new(["tags"]),
            Route::Tag { tag_id } => RoutePath::new(["tags", tag_id]),
        }
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
    #[cfg(feature = "fonts")]
    fonts::download_if_required()?;

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
        for collection in content.collections.values() {
            for doc in &collection.documents {
                let post_route_path = doc.route_path(collection);

                views::collection::post(view_context, collection, doc)
                    .write_to_route(output_dir, post_route_path.clone())?;
                {
                    let post_output_dir = post_route_path.dir_path(output_dir);
                    for path in &doc.files {
                        std::fs::copy(path, post_output_dir.join(path.file_name().unwrap()))?;
                    }
                }

                // Write redirect for alternate_id if it exists
                if let Some(alternate_route_path) = doc.alternate_route_path(collection) {
                    views::redirect(&post_route_path.url_path())
                        .write_to_route(output_dir, alternate_route_path)?;
                }
            }
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote blog index", || {
        // Write out blog index
        views::blog::index(view_context).write_to_route(
            output_dir,
            Route::Collection {
                collection_id: "blog",
            },
        )
    })?;

    timer.step("Wrote main index", || {
        // Write out main index
        views::main::index(view_context).write_to_route(output_dir, Route::Index)
    })?;

    timer.step("Wrote tags", || {
        // Write out tags
        views::tags::index(view_context).write_to_route(output_dir, Route::Tags)?;
        for tag_id in content.tags.keys() {
            views::tags::tag(view_context, tag_id)
                .write_to_route(output_dir, Route::Tag { tag_id })?;
        }
        anyhow::Ok(())
    })?;

    timer.step("Wrote RSS feed", || {
        // Write out RSS feed
        rss::write_all(rss_config, &content, output_dir)
    })?;

    timer.step("Wrote icon", || {
        content
            .icon
            .resize(128, 128, image::imageops::FilterType::Lanczos3)
            .save(output_dir.join("icon.png"))?;

        content
            .icon
            .resize(32, 32, image::imageops::FilterType::Lanczos3)
            .save(output_dir.join("favicon.ico"))?;

        anyhow::Ok(())
    })?;

    timer.step("Wrote bundled styles", || {
        let syntax_dir = output_dir.join("syntax");
        std::fs::create_dir_all(&syntax_dir)?;
        for (name, css) in syntax.themes_css() {
            std::fs::write(syntax_dir.join(format!("{name}.css")), css)?;
        }

        // Write out bundled styles
        anyhow::Ok(std::fs::write(
            output_dir.join("styles.css"),
            styles::generate()?,
        )?)
    })?;

    timer.step("Wrote bundled JavaScript", || {
        // Write out bundled JavaScript
        anyhow::Ok(std::fs::write(
            output_dir.join("scripts.js"),
            js::generate()?,
        )?)
    })?;

    timer.finish();

    #[cfg(feature = "serve")]
    serve(output_dir, port)?;

    Ok(())
}

#[cfg(feature = "serve")]
fn serve(output_dir: &Path, port: u16) -> anyhow::Result<()> {
    let app = axum::Router::new()
        .route(
            "/__poll_for_liveness",
            axum::routing::get(|| async { http::StatusCode::OK }),
        )
        .nest_service(
            "/",
            axum::routing::get_service(tower_http::services::ServeDir::new(
                std::path::PathBuf::from(output_dir),
            ))
            .handle_error(|error| async move {
                (
                    http::StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Unhandled internal error: {}", error),
                )
            }),
        );

    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], port));
    println!("Serving at http://{}", addr);
    println!("Hit CTRL-C to stop");

    tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(async move {
            let listener = tokio::net::TcpListener::bind(addr).await?;
            axum::serve(listener, app).await?;
            anyhow::Ok(())
        })
}
