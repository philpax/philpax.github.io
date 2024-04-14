use crate::{content, html, util};

mod partials;

pub fn post(collection: &content::Collection, document: &content::Document) -> html::Document {
    layout([partials::post(collection, document, false)])
}

pub fn index(content: &content::Content) -> html::Document {
    let blog = content.blog();
    layout(
        blog.documents
            .iter()
            .map(|doc| partials::post(blog, doc, true))
            .collect::<Vec<_>>(),
    )
}

pub fn tags(content: &content::Content) -> html::Document {
    use html::builder::*;

    let mut tag_keys = content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(article([
        header(h(2, false, a_simple("/tags", "Tags"))),
        div(ul(tag_keys
            .iter()
            .map(|tag| {
                let post_count = content.tags[*tag].len();
                li([
                    a_simple(format!("/tags/{tag}"), format!("#{tag}")),
                    text(format!(
                        " ({} {})",
                        post_count,
                        util::pluralize("post", post_count)
                    )),
                ])
            })
            .collect::<Vec<_>>())),
    ]))
}

pub fn tag(content: &content::Content, tag_id: &str) -> html::Document {
    use html::builder::*;

    layout(article([
        header(h(
            2,
            false,
            a_simple(format!("/tags/{tag_id}"), format!("Tags - #{tag_id}")),
        )),
        div(ul(content.tags[tag_id]
            .iter()
            .map(|t| {
                let collection = &content.collections[&t.0];
                let document = collection.document_by_id(&t.1).unwrap();

                li(a_simple(
                    document.url(collection, false),
                    document.metadata.title.clone(),
                ))
            })
            .collect::<Vec<_>>())),
    ]))
}

pub fn redirect(to_url: &str) -> html::Document {
    use html::builder::*;

    html::Document::new(html([
        head([
            title("Redirecting..."),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("http-equiv".into(), Some("refresh".into())),
                ("content".into(), Some(format!("0; url={}", to_url))),
            ]),
        ]),
        body([
            p(text("Redirecting...")),
            p(a(
                to_url,
                Some("Click here if you are not redirected"),
                text("Click here"),
            )),
        ]),
    ]))
}

fn layout(inner: impl html::builder::ToElements) -> html::Document {
    use html::builder::*;

    let links = [("/", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    html::Document::new(html([
        head([
            title("Philpax"),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("name".into(), Some("viewport".into())),
                (
                    "content".into(),
                    Some("width=device-width, initial-scale=1".into()),
                ),
            ]),
            link("stylesheet", "/styles.css"),
        ]),
        body([
            header([
                img("/icon.png", "Philpax icon"),
                h(1, false, a_simple("/", "Philpax")),
                nav(ul(links
                    .iter()
                    .copied()
                    .map(|(url, label)| li(a_simple(url, label)))
                    .collect::<Vec<_>>())),
            ]),
            main(inner.to_elements()),
        ]),
    ]))
}
