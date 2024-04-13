use crate::{config, content, html, markdown};

pub fn build_channel(content: &content::Content) -> anyhow::Result<rss::Channel> {
    let blog = content.blog();
    let items = blog
        .documents
        .iter()
        .map(|doc| build_item(blog, doc))
        .collect::<Vec<_>>();

    let atom_ext = rss::extension::atom::AtomExtensionBuilder::default()
        .link(rss::extension::atom::Link {
            rel: "self".into(),
            href: format!("{}/blog.rss", config::BASE_URL),
            mime_type: Some("application/rss+xml".to_string()),
            ..Default::default()
        })
        .build();

    Ok(rss::ChannelBuilder::default()
        .title(config::RSS_TITLE)
        .link(config::BASE_URL)
        .atom_ext(atom_ext)
        .description(config::RSS_DESCRIPTION)
        .language("en-AU".to_string())
        .last_build_date(chrono::Utc::now().to_rfc2822())
        .generator("paxsite".to_string())
        .items(items)
        .build())
}

fn build_item(blog: &content::Collection, doc: &content::Document) -> rss::Item {
    let url = doc.url(blog, true);

    let guid = rss::GuidBuilder::default()
        .value(url.clone())
        .permalink(false)
        .build();

    let description = doc
        .description
        .as_ref()
        .map(|d| html::Element::write_many_to_string(&markdown::convert_to_html(d)).unwrap());

    rss::ItemBuilder::default()
        .title(doc.metadata.title.clone())
        .link(url)
        .guid(guid)
        .description(description)
        .author(config::RSS_AUTHOR.to_string())
        .pub_date(doc.metadata.datetime().map(|d| d.to_rfc2822()))
        .build()
}
