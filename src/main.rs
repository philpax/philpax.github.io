use std::path::Path;

mod content;
mod html;
mod markdown;

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");
    std::fs::remove_dir_all(public).ok();
    std::fs::create_dir_all(public)?;

    let content = content::read()?;
    for (post_id, doc) in content.blog {
        let output_path = public.join("blog").join(post_id);
        std::fs::create_dir_all(&output_path)?;

        let html = views::blog_post(&doc.content);
        html.write_to_path(&output_path.join("index.html"))?;
    }

    Ok(())
}

mod views;
