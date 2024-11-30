use std::path::Path;

use crate::{content, markdown, syntax::SyntaxHighlighter, util};

pub struct RssConfig<'a> {
    pub base_url: &'a str,
    pub rss_title: &'a str,
    pub rss_author: &'a str,
    pub rss_description: &'a str,
    pub syntax: &'a SyntaxHighlighter,
}

pub fn write_all(
    config: RssConfig,
    content: &content::Content,
    output: &Path,
) -> anyhow::Result<()> {
    let RssConfig {
        base_url,
        rss_title,
        rss_author,
        rss_description,
        syntax,
    } = config;

    let rss_output_dir = output.join("rss");
    std::fs::create_dir_all(&rss_output_dir)?;

    for (collection_id, collection) in &content.collections {
        let rss_output = rss_output_dir.join(format!("{collection_id}.rss"));
        let relative_path = rss_output.strip_prefix(output)?;
        let relative_path = relative_path.strip_prefix("/").unwrap_or(relative_path);

        let items = collection
            .documents
            .iter()
            .map(|doc| build_item(base_url, collection, rss_author, doc, syntax))
            .collect::<Vec<_>>();

        let atom_ext = rss::extension::atom::AtomExtensionBuilder::default()
            .link(rss::extension::atom::Link {
                rel: "self".into(),
                href: format!("{}/{}", base_url, util::normalize_path(relative_path)),
                mime_type: Some("application/rss+xml".to_string()),
                ..Default::default()
            })
            .build();

        let rss_channel = rss::ChannelBuilder::default()
            .title(rss_title)
            .link(base_url)
            .atom_ext(atom_ext)
            .description(rss_description)
            .language("en-AU".to_string())
            .last_build_date(chrono::Utc::now().to_rfc2822())
            .generator("paxgen".to_string())
            .items(items)
            .build();

        let mut file = std::fs::File::create(rss_output)?;
        rss_channel.pretty_write_to(&mut file, b' ', 2)?;
    }

    Ok(())
}

fn build_item(
    base_url: &str,
    collection: &content::Collection,
    author: &str,
    doc: &content::Document,
    syntax: &SyntaxHighlighter,
) -> rss::Item {
    let url = format!("{base_url}{}", doc.route_path(collection).url_path());

    let guid = rss::GuidBuilder::default()
        .value(url.clone())
        .permalink(false)
        .build();

    let description = doc.description.as_ref().map(|d| {
        markdown::convert_to_html(syntax, d)
            .write_to_string()
            .unwrap()
    });

    rss::ItemBuilder::default()
        .title(doc.metadata.title.clone())
        .link(url)
        .guid(guid)
        .description(description)
        .author(author.to_string())
        .pub_date(doc.metadata.datetime().map(|d| d.to_rfc2822()))
        .build()
}
