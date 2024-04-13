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
