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

fn main() -> anyhow::Result<()> {
    #[cfg(feature = "fonts")]
    fonts::download_if_required()?;

    let output_dir = Path::new("public");
    let static_dir = Path::new("static");
    #[cfg(feature = "serve")]
    let port = 8192;

    let rss_config = rss::RssConfig {
        base_url: "https://philpax.me",
        rss_title: "Philpax's Blog",
        rss_author: "Philpax",
        rss_description: concat!(
            "The blog of Philpax, ",
            "your friendly neighbourhood polyglot programmer/engineer, ",
            "cursed with more projects than time."
        ),
    };

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
    let content = content::Content::read()?;

    // Copy all static content first
    util::copy_dir(static_dir, output_dir)?;

    // Write out content
    for collection in content.collections.values() {
        for doc in &collection.documents {
            let post_route_path = doc.route_path(collection);

            views::collection::post(collection, doc)
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

    // Write out blog index
    views::blog::index(&content).write_to_route(
        output_dir,
        Route::Collection {
            collection_id: "blog",
        },
    )?;

    // Write out main index
    views::index(&content).write_to_route(output_dir, Route::Index)?;

    // Write out tags
    {
        views::tags(&content).write_to_route(output_dir, Route::Tags)?;
        for tag_id in content.tags.keys() {
            views::tag(&content, tag_id).write_to_route(output_dir, Route::Tag { tag_id })?;
        }
    }

    // Write out RSS feed
    rss::write_all(rss_config, &content, output_dir)?;

    // Write out icon
    {
        content
            .icon
            .resize(128, 128, image::imageops::FilterType::Lanczos3)
            .save(output_dir.join("icon.png"))?;

        content
            .icon
            .resize(32, 32, image::imageops::FilterType::Lanczos3)
            .save(output_dir.join("favicon.ico"))?;
    }

    // Write out bundled styles
    std::fs::write(output_dir.join("styles.css"), styles::generate()?)?;

    // Write out bundled JavaScript
    std::fs::write(output_dir.join("scripts.js"), js::generate()?)?;

    #[cfg(feature = "serve")]
    {
        let server = file_serve::ServerBuilder::new(output_dir)
            .port(port)
            .build();

        println!("Serving at http://{}", server.addr());
        println!("Hit CTRL-C to stop");

        server.serve()?;
    }

    Ok(())
}
