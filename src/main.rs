use std::path::Path;

mod content;
mod html;
mod markdown;

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");
    std::fs::remove_dir_all(public).ok();
    std::fs::create_dir_all(public)?;

    let content = content::Content::read()?;
    for (collection_id, collection) in content.collections {
        for (post_id, doc) in collection.documents {
            let mut output_path = public.join(&collection_id);
            if post_id != "index" {
                output_path = output_path.join(post_id);
            }
            std::fs::create_dir_all(&output_path)?;

            let html = views::post(&doc.content);
            html.write_to_path(&output_path.join("index.html"))?;

            for path in doc.files {
                std::fs::copy(&path, &output_path.join(path.file_name().unwrap()))?;
            }
        }
    }

    Ok(())
}

mod views;
