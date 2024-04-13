use crate::{content, html};

pub fn post(document: &content::Document) -> html::Document {
    layout([partials::post(document, false)])
}

pub fn index(content: &content::Content) -> html::Document {
    layout(
        content
            .blog()
            .documents
            .iter()
            .map(|doc| partials::post(doc, true))
            .collect::<Vec<_>>(),
    )
}

mod partials {
    use crate::{content, html, markdown};

    pub fn post(document: &content::Document, use_description: bool) -> html::Element {
        use html::builder::*;

        article(
            [],
            [
                header(
                    [],
                    [
                        h(1, [], [text(&document.metadata.title)]),
                        document.metadata.date().map(datetime).unwrap_or_default(),
                    ],
                ),
                section(
                    [],
                    markdown::convert_to_html(
                        document
                            .description
                            .as_ref()
                            .filter(|_| use_description)
                            .unwrap_or(&document.content),
                    ),
                ),
            ],
        )
    }
}

fn layout(inner: impl Into<Vec<html::Element>>) -> html::Document {
    use html::builder::*;

    html::Document::new([html([
        head([
            title("Philpax"),
            meta([("charset".into(), Some("utf-8".into()))]),
            link("stylesheet", "/styles.css"),
        ]),
        body([h(1, [], [text("Philpax")]), div([], inner)]),
    ])])
}
