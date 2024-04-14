use std::path::Path;

mod config;
mod content;
mod html;
mod markdown;
mod rss;
mod util;
mod views;

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");

    if public.is_dir() {
        // Remove everything in the public directory
        for entry in std::fs::read_dir(public)? {
            let path = entry?.path();
            if path.is_dir() {
                std::fs::remove_dir_all(&path)?;
            } else {
                std::fs::remove_file(&path)?;
            }
        }
    }
    std::fs::create_dir_all(public)?;

    let content = content::Content::read()?;

    // Write out content
    for (collection_id, collection) in &content.collections {
        let collection_path = public.join(collection_id);
        for doc in &collection.documents {
            let mut output_path = collection_path.clone();
            if doc.id != "index" {
                output_path = output_path.join(&doc.id);
            }
            std::fs::create_dir_all(&output_path)?;

            let html = views::post(collection, doc);
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
        html.write_to_path(&public.join("blog").join("index.html"))?;
    }

    // Write out index
    {
        let html = views::index(&content);
        html.write_to_path(&public.join("index.html"))?;
    }

    // Write out RSS feed
    {
        let rss_channel = rss::build_channel(&content)?;
        let mut file = std::fs::File::create(public.join("blog.rss"))?;
        rss_channel.pretty_write_to(&mut file, b' ', 2)?;
    }

    Ok(())
}
