use crate::{content, html};

pub fn post(document: &content::Document) -> html::Document {
    layout([partials::post(document, false)])
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
                        document
                            .metadata
                            .date()
                            .map(|d| datetime(d))
                            .unwrap_or_default(),
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
