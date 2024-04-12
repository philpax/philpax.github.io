use super::{Attribute, Element};

pub fn tag(
    name: &str,
    attributes: impl Into<Vec<Attribute>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    Element::Tag {
        name: name.to_string(),
        attributes: attributes.into(),
        children: children.into(),
    }
}

pub fn tag_with_text(name: &str, attributes: impl Into<Vec<Attribute>>, text: &str) -> Element {
    Element::Tag {
        name: name.to_string(),
        attributes: attributes.into(),
        children: vec![Element::Text {
            text: text.to_string(),
        }],
    }
}

pub fn text(text: impl Into<String>) -> Element {
    Element::Text { text: text.into() }
}

pub fn html(children: impl Into<Vec<Element>>) -> Element {
    tag("html", [], children)
}

pub fn head(children: impl Into<Vec<Element>>) -> Element {
    tag("head", [], children)
}

pub fn title(text: &str) -> Element {
    tag_with_text("title", [], text)
}

pub fn meta(attributes: impl Into<Vec<Attribute>>) -> Element {
    tag("meta", attributes, [])
}

pub fn link(rel: &str, href: &str) -> Element {
    tag(
        "link",
        [
            ("rel".to_string(), Some(rel.to_string())),
            ("href".to_string(), Some(href.to_string())),
        ],
        [],
    )
}

pub fn body(children: impl Into<Vec<Element>>) -> Element {
    tag("body", [], children)
}

pub fn h(
    depth: u8,
    attributes: impl Into<Vec<Attribute>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    tag(&format!("h{}", depth), attributes, children)
}

pub fn p(attributes: impl Into<Vec<Attribute>>, children: impl Into<Vec<Element>>) -> Element {
    tag("p", attributes, children)
}

pub fn code(attributes: impl Into<Vec<Attribute>>, children: impl Into<Vec<Element>>) -> Element {
    tag("code", attributes, children)
}

pub fn div(attributes: impl Into<Vec<Attribute>>, children: impl Into<Vec<Element>>) -> Element {
    tag("div", attributes, children)
}

pub fn pre(attributes: impl Into<Vec<Attribute>>, children: impl Into<Vec<Element>>) -> Element {
    tag("pre", attributes, children)
}

pub fn img(src: &str, alt: &str) -> Element {
    tag(
        "img",
        [
            ("src".to_string(), Some(src.to_string())),
            ("alt".to_string(), Some(alt.to_string())),
        ],
        [],
    )
}

pub fn a(href: &str, title: Option<&str>, children: impl Into<Vec<Element>>) -> Element {
    let mut attributes = vec![("href".to_string(), Some(href.to_string()))];
    if let Some(title) = title {
        attributes.push(("title".to_string(), Some(title.to_string())));
    }

    tag("a", attributes, children)
}

pub fn br() -> Element {
    tag("br", [], [])
}
