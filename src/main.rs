use std::path::Path;

mod content;
#[cfg(feature = "fonts")]
mod fonts;
mod js;
mod markdown;
mod rss;
mod styles;
mod util;
mod views;

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
    for (collection_id, collection) in &content.collections {
        let collection_path = output_dir.join(collection_id);
        for doc in &collection.documents {
            let mut output_path = collection_path.clone();
            if doc.id != "index" {
                output_path = output_path.join(&doc.id);
            }
            std::fs::create_dir_all(&output_path)?;

            views::collection::post(collection, doc)
                .write_to_path(&output_path.join("index.html"))?;

            for path in &doc.files {
                std::fs::copy(path, output_path.join(path.file_name().unwrap()))?;
            }

            // Write redirect for alternate_id if it exists
            if let Some(alternate_id) = doc.alternate_id.as_ref() {
                let alternate_path = collection_path.join(alternate_id);
                std::fs::create_dir_all(&alternate_path)?;

                views::redirect(&doc.url(collection, None))
                    .write_to_path(&alternate_path.join("index.html"))?;
            }
        }
    }

    // Write out blog index
    views::blog::index(&content).write_to_path(&output_dir.join("blog").join("index.html"))?;

    // Write out main index
    views::index(&content).write_to_path(&output_dir.join("index.html"))?;

    // Write out tags
    {
        let tags_path = output_dir.join("tags");
        std::fs::create_dir_all(&tags_path)?;
        views::tags(&content).write_to_path(&tags_path.join("index.html"))?;

        for tag_id in content.tags.keys() {
            let tag_path = tags_path.join(tag_id);
            std::fs::create_dir_all(&tag_path)?;
            views::tag(&content, tag_id).write_to_path(&tag_path.join("index.html"))?;
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
