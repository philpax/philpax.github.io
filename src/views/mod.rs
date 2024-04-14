use crate::{content, html};

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

    layout([article(
        [],
        [
            header([], [h(2, [], [a("/tags", Some("Tags"), [text("Tags")])])]),
            div(
                [],
                [ul(
                    [],
                    tag_keys
                        .iter()
                        .map(|tag| {
                            li(
                                [],
                                [
                                    text(format!("#{tag}")),
                                    ul(
                                        [],
                                        content.tags[*tag]
                                            .iter()
                                            .map(|t| {
                                                let collection = &content.collections[&t.0];
                                                let document =
                                                    collection.document_by_id(&t.1).unwrap();

                                                li(
                                                    [],
                                                    [a(
                                                        &document.url(collection, false),
                                                        Some(&document.metadata.title),
                                                        [text(&document.metadata.title)],
                                                    )],
                                                )
                                            })
                                            .collect::<Vec<_>>(),
                                    ),
                                ],
                            )
                        })
                        .collect::<Vec<_>>(),
                )],
            ),
        ],
    )])
}

pub fn redirect(to_url: &str) -> html::Document {
    use html::builder::*;

    html::Document::new([html([
        head([
            title("Redirecting..."),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("http-equiv".into(), Some("refresh".into())),
                ("content".into(), Some(format!("0; url={}", to_url))),
            ]),
        ]),
        body([
            p([], [text("Redirecting...")]),
            p(
                [],
                [a(
                    to_url,
                    Some("Click here if you are not redirected"),
                    [text("Click here")],
                )],
            ),
        ]),
    ])])
}

fn layout(inner: impl Into<Vec<html::Element>>) -> html::Document {
    use html::builder::*;

    let links = [("/", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    html::Document::new([html([
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
            header(
                [],
                [
                    h(1, [], [text("Philpax")]),
                    nav(
                        [],
                        [ul(
                            [],
                            links
                                .iter()
                                .copied()
                                .map(|(url, label)| li([], [a(url, None, [text(label)])]))
                                .collect::<Vec<_>>(),
                        )],
                    ),
                ],
            ),
            main(inner.into()),
        ]),
    ])])
}
