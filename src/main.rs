use std::path::Path;

mod config;
mod content;
mod html;
mod markdown;
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
        let rss_channel = build_rss_channel(&content)?;
        let mut file = std::fs::File::create(public.join("blog.rss"))?;
        rss_channel.pretty_write_to(&mut file, b' ', 2)?;
    }

    Ok(())
}

fn build_rss_channel(content: &content::Content) -> anyhow::Result<rss::Channel> {
    let blog = content.blog();
    let items = blog
        .documents
        .iter()
        .map(|doc| {
            let url = doc.url(blog, true);

            rss::ItemBuilder::default()
                .title(doc.metadata.title.clone())
                .link(url.clone())
                .guid(
                    rss::GuidBuilder::default()
                        .value(url)
                        .permalink(false)
                        .build(),
                )
                .description(doc.description.as_ref().map(|d| {
                    html::Element::write_many_to_string(&markdown::convert_to_html(d)).unwrap()
                }))
                .author(config::RSS_AUTHOR.to_string())
                .pub_date(doc.metadata.datetime().map(|d| d.to_rfc2822()))
                .build()
        })
        .collect::<Vec<_>>();

    Ok(rss::ChannelBuilder::default()
        .title(config::RSS_TITLE)
        .link(config::BASE_URL)
        .atom_ext(
            rss::extension::atom::AtomExtensionBuilder::default()
                .link(rss::extension::atom::Link {
                    rel: "self".into(),
                    href: format!("{}/blog.rss", config::BASE_URL),
                    mime_type: Some("application/rss+xml".to_string()),
                    ..Default::default()
                })
                .build(),
        )
        .description(config::RSS_DESCRIPTION)
        .language("en-AU".to_string())
        .last_build_date(chrono::Utc::now().to_rfc2822())
        .generator("paxsite".to_string())
        .items(items)
        .build())
}
