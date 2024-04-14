use super::{Attribute, Element};

pub fn tag(
    name: impl Into<String>,
    attributes: impl Into<Vec<Attribute>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.into(),
        children: children.into(),
    }
}

pub fn tag_with_text(
    name: impl Into<String>,
    attributes: impl Into<Vec<Attribute>>,
    text: impl Into<String>,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.into(),
        children: vec![Element::Text { text: text.into() }],
    }
}

pub fn text(text: impl Into<String>) -> Element {
    Element::Text { text: text.into() }
}

pub fn html(children: impl Into<Vec<Element>>) -> Element {
    tag("html", [("lang".into(), Some("en-AU".into()))], children)
}

pub fn title(text: impl Into<String>) -> Element {
    tag_with_text("title", [], text)
}

pub fn link(rel: impl Into<String>, href: impl Into<String>) -> Element {
    tag(
        "link",
        [
            ("rel".into(), Some(rel.into())),
            ("href".into(), Some(href.into())),
        ],
        [],
    )
}

pub fn h(
    depth: u8,
    attributes: impl Into<Vec<Attribute>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    tag(format!("h{}", depth), attributes, children)
}

pub fn img(src: impl Into<String>, alt: impl Into<String>) -> Element {
    tag(
        "img",
        [
            ("src".into(), Some(src.into())),
            ("alt".into(), Some(alt.into())),
        ],
        [],
    )
}

pub fn a(
    href: impl Into<String>,
    title: Option<impl Into<String>>,
    children: impl Into<Vec<Element>>,
) -> Element {
    let mut attributes = vec![("href".into(), Some(href.into()))];
    if let Some(title) = title {
        attributes.push(("title".into(), Some(title.into())));
    }

    tag("a", attributes, children)
}

pub fn a_simple(href: impl Into<String>, txt: impl Into<String>) -> Element {
    let txt = txt.into();
    a(href, Some(txt.clone()), [text(txt)])
}

pub fn br() -> Element {
    tag("br", [], [])
}

pub fn datetime<TZ: chrono::TimeZone>(date: chrono::DateTime<TZ>) -> Element {
    tag_with_text(
        "time",
        [("datetime".into(), Some(date.to_rfc3339()))],
        date.date_naive().to_string(),
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
