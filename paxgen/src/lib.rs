pub mod content;
pub mod html;
pub mod markdown;
pub mod util;
pub mod views;

mod config;
mod rss;
pub use config::Config;
pub use views::Views;

use std::path::Path;

pub fn run(
    config: Config,
    views: impl Views,
    post_write: impl FnOnce(&Path) -> anyhow::Result<()>,
) -> anyhow::Result<()> {
    Config::initialize(config);
    let config = Config::get();
    let output = &config.output_directory;

    if output.is_dir() {
        // Remove everything in the public directory; this is done manually
        // to ensure that you can continue serving from the directory while
        // the build is running.
        for entry in std::fs::read_dir(output)? {
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
    util::copy_dir(&config.static_directory, output)?;

    // Write out content
    for (collection_id, collection) in &content.collections {
        let collection_path = output.join(collection_id);
        for doc in &collection.documents {
            let mut output_path = collection_path.clone();
            if doc.id != "index" {
                output_path = output_path.join(&doc.id);
            }
            std::fs::create_dir_all(&output_path)?;

            let html = views.post(collection, doc);
            html.write_to_path(&output_path.join("index.html"))?;

            for path in &doc.files {
                std::fs::copy(path, &output_path.join(path.file_name().unwrap()))?;
            }

            // Write redirect for alternate_id if it exists
            if let Some(alternate_id) = doc.alternate_id.as_ref() {
                let alternate_path = collection_path.join(alternate_id);
                std::fs::create_dir_all(&alternate_path)?;

                let html = &views::redirect(&doc.url(collection, false));
                html.write_to_path(&alternate_path.join("index.html"))?;
            }
        }
    }

    // Write out a redirect on blog/index.html
    {
        let html = views::redirect("/");
        html.write_to_path(&output.join("blog").join("index.html"))?;
    }

    // Write out index
    {
        let html = views.index(&content);
        html.write_to_path(&output.join("index.html"))?;
    }

    // Write out tags
    {
        let html = views.tags(&content);
        let tags_path = output.join("tags");
        std::fs::create_dir_all(&tags_path)?;
        html.write_to_path(&tags_path.join("index.html"))?;

        for tag_id in content.tags.keys() {
            let html = views.tag(&content, tag_id);
            let tag_path = tags_path.join(tag_id);
            std::fs::create_dir_all(&tag_path)?;
            html.write_to_path(&tag_path.join("index.html"))?;
        }
    }

    // Write out RSS feed
    {
        let rss_channel = rss::build_channel(&content)?;
        let mut file = std::fs::File::create(output.join("blog.rss"))?;
        rss_channel.pretty_write_to(&mut file, b' ', 2)?;
    }

    // Write out icon
    {
        let small_icon = content
            .icon
            .resize(128, 128, image::imageops::FilterType::Lanczos3);
        small_icon.save(output.join("icon.png"))?;

        let favicon = content
            .icon
            .resize(32, 32, image::imageops::FilterType::Lanczos3);
        favicon.save(output.join("favicon.ico"))?;
    }

    // Do post-write
    post_write(output)?;

    #[cfg(feature = "serve")]
    {
        let server = file_serve::ServerBuilder::new(output)
            .port(config.port)
            .build();

        println!("Serving at http://{}", server.addr());
        println!("Hit CTRL-C to stop");

        server.serve()?;
    }

    Ok(())
}
