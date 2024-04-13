use std::path::Path;

mod config;
mod content;
mod html;
mod markdown;
mod rss;
mod views;

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");
    std::fs::remove_dir_all(public).ok();
    std::fs::create_dir_all(public)?;

    let content = content::Content::read()?;

    // Write out content
    for (collection_id, collection) in &content.collections {
        for doc in &collection.documents {
            let mut output_path = public.join(collection_id);
            if doc.id != "index" {
                output_path = output_path.join(&doc.id);
            }
            std::fs::create_dir_all(&output_path)?;

            let html = views::post(doc);
            html.write_to_path(&output_path.join("index.html"))?;

            for path in &doc.files {
                std::fs::copy(path, &output_path.join(path.file_name().unwrap()))?;
            }
        }
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
