use crate::{
    content::{Collection, Content, Document},
    util,
};

mod partials;

fn layout(inner: impl paxhtml::builder::ToElements) -> paxhtml::Document {
    use paxhtml::builder::*;

    let links = [("/blog", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    paxhtml::Document::new([
        doctype([("html".into(), None)]),
        html([
            head([])([
                title("Philpax"),
                meta([("charset".into(), Some("utf-8".into()))]),
                meta([
                    ("name".into(), Some("viewport".into())),
                    (
                        "content".into(),
                        Some("width=device-width, initial-scale=1".into()),
                    ),
                ]),
                link([
                    ("rel".into(), Some("alternate".into())),
                    ("href".into(), Some("/rss/blog.rss".into())),
                    ("type".into(), Some("application/rss+xml".into())),
                    ("title".into(), Some("Philpax's Blog".into())),
                ]),
                link([
                    ("rel".into(), Some("stylesheet".into())),
                    ("href".into(), Some("/styles.css".into())),
                ]),
                script("/scripts.js"),
            ]),
            body([])([
                header([])([
                    img("/icon.png", "Philpax icon"),
                    h1(a_simple("/", "Philpax")),
                    nav([])(ul([("id".into(), Some("header-links".into()))])(
                        links
                            .iter()
                            .copied()
                            .map(|(url, label)| li([])(a_simple(url, label)))
                            .collect::<Vec<_>>(),
                    )),
                ]),
                main([])(inner.to_elements()),
            ]),
        ]),
    ])
}

pub mod collection {
    use super::*;

    pub fn post(collection: &Collection, document: &Document) -> paxhtml::Document {
        layout(partials::post(
            collection,
            document,
            partials::PostBody::Full,
        ))
    }
}

pub mod blog {
    use super::*;

    pub fn index(content: &Content) -> paxhtml::Document {
        let blog = content.collections.get("blog").unwrap();
        layout(
            blog.documents
                .iter()
                .flat_map(|doc| partials::post(blog, doc, partials::PostBody::Description))
                .collect::<Vec<_>>(),
        )
    }
}

pub fn index(content: &Content) -> paxhtml::Document {
    let blog = content.collections.get("blog").unwrap();
    layout(
        blog.documents
            .iter()
            .flat_map(|doc| partials::post(blog, doc, partials::PostBody::Short))
            .collect::<Vec<_>>(),
    )
}

pub fn tags(content: &Content) -> paxhtml::Document {
    use paxhtml::builder::*;

    let mut tag_keys = content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(article([])([
        header([])(h2(a_simple("/tags", "Tags"))),
        div([])(ul([])(
            tag_keys
                .iter()
                .map(|tag| {
                    let post_count = content.tags[*tag].len();
                    li([])([
                        a_simple(format!("/tags/{tag}"), format!("#{tag}")),
                        text(format!(
                            " ({} {})",
                            post_count,
                            util::pluralize("post", post_count)
                        )),
                    ])
                })
                .collect::<Vec<_>>(),
        )),
    ]))
}

pub fn tag(content: &Content, tag_id: &str) -> paxhtml::Document {
    use paxhtml::builder::*;

    layout(article([])([
        header([])(h2(a_simple(
            format!("/tags/{tag_id}"),
            format!("Tags - #{tag_id}"),
        ))),
        div([])(ul([])(
            content.tags[tag_id]
                .iter()
                .map(|t| {
                    let collection = &content.collections[&t.0];
                    let document = collection.document_by_id(&t.1).unwrap();

                    li([])(a_simple(
                        document.url(collection, None),
                        document.metadata.title.clone(),
                    ))
                })
                .collect::<Vec<_>>(),
        )),
    ]))
}

pub fn redirect(to_url: &str) -> paxhtml::Document {
    use paxhtml::builder::*;

    paxhtml::Document::new(html([
        head([])([
            title("Redirecting..."),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("http-equiv".into(), Some("refresh".into())),
                ("content".into(), Some(format!("0; url={}", to_url))),
            ]),
        ]),
        body([])([
            p([])(text("Redirecting...")),
            p([])(a(
                to_url,
                Some("Click here if you are not redirected"),
                text("Click here"),
            )),
        ]),
    ]))
}
