use paxhtml::bumpalo::Bump;

use crate::{
    content::{Document, DocumentCollection},
    markdown::MarkdownConverter,
    views::ViewContext,
    Route,
};

pub fn generate(
    context: ViewContext,
    collection: &DocumentCollection,
    title_suffix: &str,
    description: &str,
    route: Route,
) -> anyhow::Result<String> {
    let items = collection
        .documents
        .iter()
        .map(|doc| build_item(context, doc))
        .collect::<Vec<_>>();

    let atom_ext = rss::extension::atom::AtomExtensionBuilder::default()
        .link(rss::extension::atom::Link {
            rel: "self".into(),
            href: route.abs_url(context.website_base_url),
            mime_type: Some("application/rss+xml".to_string()),
            ..Default::default()
        })
        .build();

    let rss_channel = rss::ChannelBuilder::default()
        .title(format!("{} [{}]", context.website_name, title_suffix))
        .link(context.website_base_url)
        .atom_ext(atom_ext)
        .description(description)
        .language("en-AU".to_string())
        .last_build_date(chrono::Utc::now().to_rfc2822())
        .generator("paxsite".to_string())
        .items(items)
        .build();

    Ok(String::from_utf8(rss_channel.pretty_write_to(
        Vec::new(),
        b' ',
        2,
    )?)?)
}

fn build_item(context: ViewContext, doc: &Document) -> rss::Item {
    let bump = Bump::new();
    let url = format!(
        "{}{}",
        context.website_base_url,
        doc.route_path().url_path()
    );

    let guid = rss::GuidBuilder::default()
        .value(url.clone())
        .permalink(false)
        .build();

    let description = paxhtml::Document::new(
        &bump,
        [MarkdownConverter::new(&bump, context).convert(&doc.description, None)],
    )
    .write_to_string()
    .unwrap();

    rss::ItemBuilder::default()
        .title(doc.metadata.title.clone())
        .link(url)
        .guid(guid)
        .description(description)
        .author(context.website_author.to_string())
        .pub_date(doc.metadata.datetime.map(|d| d.to_rfc2822()))
        .build()
}
