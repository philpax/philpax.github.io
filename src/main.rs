use std::path::Path;

mod content;
mod html;
mod markdown;
mod views;

const RSS_TITLE: &str = "Philpax's Blog";
const RSS_AUTHOR: &str = "Philpax";
const RSS_LINK: &str = "https://philpax.me";
const RSS_DESCRIPTION: &str = "The blog of Philpax, your friendly neighbourhood polyglot programmer/engineer, cursed with more projects than time.";

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

            let html = views::post(&doc);
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
    let items = content
        .blog()
        .documents
        .iter()
        .map(|doc| {
            let link = format!("{RSS_LINK}/blog/{}/", doc.id);

            rss::ItemBuilder::default()
                .title(doc.metadata.title.clone())
                .link(link.clone())
                .guid(
                    rss::GuidBuilder::default()
                        .value(link)
                        .permalink(false)
                        .build(),
                )
                .description(doc.description.as_ref().map(|d| {
                    html::Element::write_many_to_string(&markdown::convert_to_html(d)).unwrap()
                }))
                .author(RSS_AUTHOR.to_string())
                .pub_date(doc.metadata.date().map(|d| {
                    d.and_time(chrono::NaiveTime::default())
                        .and_utc()
                        .to_rfc2822()
                }))
                .build()
        })
        .collect::<Vec<_>>();

    Ok(rss::ChannelBuilder::default()
        .title(RSS_TITLE)
        .link(RSS_LINK)
        .atom_ext(
            rss::extension::atom::AtomExtensionBuilder::default()
                .link(rss::extension::atom::Link {
                    rel: "self".into(),
                    href: format!("{RSS_LINK}/blog.rss"),
                    mime_type: Some("application/rss+xml".to_string()),
                    ..Default::default()
                })
                .build(),
        )
        .description(RSS_DESCRIPTION)
        .language("en-AU".to_string())
        .last_build_date(chrono::Utc::now().to_rfc2822())
        .generator("paxsite".to_string())
        .items(items)
        .build())
}
