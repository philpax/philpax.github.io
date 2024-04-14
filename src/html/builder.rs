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
    tag("html", [("lang".into(), Some("en-AU".into()))], children)
}

pub fn title(text: &str) -> Element {
    tag_with_text("title", [], text)
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

pub fn h(
    depth: u8,
    attributes: impl Into<Vec<Attribute>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    tag(&format!("h{}", depth), attributes, children)
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

pub fn a_simple(href: &str, txt: &str) -> Element {
    a(href, Some(txt), [text(txt)])
}

pub fn br() -> Element {
    tag("br", [], [])
}

pub fn datetime<TZ: chrono::TimeZone>(date: chrono::DateTime<TZ>) -> Element {
    tag_with_text(
        "time",
        [("datetime".to_string(), Some(date.to_rfc3339()))],
        &date.date_naive().to_string(),
    )
}

macro_rules! aliased_builders {
    (
        children: [$($children_ident:ident),*],
        attribute: [$($attribute_ident:ident),*],
        attribute_and_children: [$($attribute_and_children_ident:ident),*],
    ) => {
        $(
            pub fn $children_ident(children: impl Into<Vec<Element>>) -> Element {
                tag(stringify!($children_ident), [], children)
            }
        )*
        $(
            pub fn $attribute_ident(attributes: impl Into<Vec<Attribute>>) -> Element {
                tag(stringify!($attribute_ident), attributes, [])
            }
        )*
        $(
            pub fn $attribute_and_children_ident(
                attributes: impl Into<Vec<Attribute>>,
                children: impl Into<Vec<Element>>,
            ) -> Element {
                tag(stringify!($attribute_and_children_ident), attributes, children)
            }
        )*
    };
}

aliased_builders! {
    children: [head, body, main],
    attribute: [meta],
    attribute_and_children: [p, code, div, pre, header, nav, ul, li, article, section],
}
