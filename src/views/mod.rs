use crate::{html, markdown};

pub fn blog_post(document: &markdown::Node) -> html::Document {
    layout(markdown::convert_to_html(document))
}

fn layout(inner: Vec<html::Element>) -> html::Document {
    use html::builder::*;

    html::Document::new([html([
        head([title("Philpax"), link("stylesheet", "/styles.css")]),
        body([h(1, [], [text("Philpax")]), div([], inner)]),
    ])])
}
