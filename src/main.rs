use std::path::Path;

mod config;
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

    config::Config::initialize(config::Config {
        output_directory: Path::new("public").into(),
        static_directory: Path::new("static").into(),
        #[cfg(feature = "serve")]
        port: 8192,

        base_url: "https://philpax.me".into(),

        rss_title: "Philpax's Blog".into(),
        rss_author: "Philpax".into(),
        rss_description: "The blog of Philpax, your friendly neighbourhood polyglot programmer/engineer, cursed with more projects than time.".into(),
    });
    let config = config::Config::get();
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

            let html = views::post(collection, doc);
            html.write_to_path(&output_path.join("index.html"))?;

            for path in &doc.files {
                std::fs::copy(path, output_path.join(path.file_name().unwrap()))?;
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
        let html = views::index(&content);
        html.write_to_path(&output.join("index.html"))?;
    }

    // Write out tags
    {
        let html = views::tags(&content);
        let tags_path = output.join("tags");
        std::fs::create_dir_all(&tags_path)?;
        html.write_to_path(&tags_path.join("index.html"))?;

        for tag_id in content.tags.keys() {
            let html = views::tag(&content, tag_id);
            let tag_path = tags_path.join(tag_id);
            std::fs::create_dir_all(&tag_path)?;
            html.write_to_path(&tag_path.join("index.html"))?;
        }
    }

    // Write out RSS feed
    {
        rss::write_all(&content, output)?;
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

    // Write out bundled styles
    let styles = styles::generate()?;
    std::fs::write(output.join("styles.css"), styles)?;

    // Write out bundled JavaScript
    let js = js::generate()?;
    std::fs::write(output.join("scripts.js"), js)?;

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
