use crate::{
    content::{Collection, Content, Document},
    elements::*,
    util,
};

mod partials;

fn layout(inner: impl paxhtml::builder::ToElements) -> paxhtml::Document {
    let links = [("/blog", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    paxhtml::Document::new([
        doctype("html"),
        html(("lang", "en-AU"))([
            head(Empty)([
                title(Empty)("Philpax"),
                meta(("charset", "utf-8")),
                meta([
                    ("name", "viewport"),
                    ("content", "width=device-width, initial-scale=1"),
                ]),
                link([
                    ("rel", "alternate"),
                    ("href", "/rss/blog.rss"),
                    ("type", "application/rss+xml"),
                    ("title", "Philpax's Blog"),
                ]),
                link([("rel", "stylesheet"), ("href", "/styles.css")]),
                script(("src", "/scripts.js"))(Empty),
            ]),
            body(Empty)([
                header(Empty)([
                    img([("src", "/icon.png"), ("alt", "Philpax icon")]),
                    h1_with_id(Empty)(a(("href", "/"))("Philpax")),
                    nav(Empty)(ul(("id", "header-links"))(
                        links
                            .iter()
                            .copied()
                            .map(|(url, label)| li(Empty)(a(("href", url))(label)))
                            .collect::<Vec<_>>(),
                    )),
                ]),
                main(Empty)(inner.to_elements()),
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
    let mut tag_keys = content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(article(Empty)([
        header(Empty)(h2_with_id(Empty)(a(("href", "/tags"))("Tags"))),
        div(Empty)(ul(Empty)(
            tag_keys
                .iter()
                .map(|tag| {
                    let post_count = content.tags[*tag].len();
                    li(Empty)([
                        a(("href", format!("/tags/{tag}")))(format!("#{tag}")),
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
    layout(article(Empty)([
        header(Empty)(h2_with_id(Empty)(a(("href", format!("/tags/{tag_id}")))(
            format!("Tags - #{tag_id}"),
        ))),
        div(Empty)(ul(Empty)(
            content.tags[tag_id]
                .iter()
                .map(|t| {
                    let collection = &content.collections[&t.0];
                    let document = collection.document_by_id(&t.1).unwrap();

                    li(Empty)(a(("href", document.route_path(collection).url_path()))(
                        document.metadata.title.clone(),
                    ))
                })
                .collect::<Vec<_>>(),
        )),
    ]))
}

pub fn redirect(to_url: &str) -> paxhtml::Document {
    paxhtml::Document::new([
        doctype("html"),
        html(("lang", "en-AU"))([
            head(Empty)([
                title(Empty)("Redirecting..."),
                meta(("charset", "utf-8")),
                meta([
                    ("http-equiv", "refresh"),
                    ("content", &format!("0; url={to_url}")),
                ]),
            ]),
            body(Empty)([
                p(Empty)("Redirecting..."),
                p(Empty)(a([
                    ("href", to_url),
                    ("title", "Click here if you are not redirected"),
                ])("Click here")),
            ]),
        ]),
    ])
}
