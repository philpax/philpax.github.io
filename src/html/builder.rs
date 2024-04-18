use crate::util;

use super::{Attribute, Element};

pub trait ToElements {
    fn to_elements(self) -> Vec<Element>;
}
impl<T: Into<Element>> ToElements for T {
    fn to_elements(self) -> Vec<Element> {
        vec![self.into()]
    }
}
impl<T: Into<Element>> ToElements for Vec<T> {
    fn to_elements(self) -> Vec<Element> {
        self.into_iter().map(Into::into).collect()
    }
}
impl<T: Into<Element> + Clone> ToElements for &[T] {
    fn to_elements(self) -> Vec<Element> {
        self.iter().cloned().map(|e| e.into()).collect()
    }
}
impl<T: Into<Element> + Clone, const N: usize> ToElements for [T; N] {
    fn to_elements(self) -> Vec<Element> {
        self.iter().cloned().map(|e| e.into()).collect()
    }
}
pub struct NoChildren;
impl ToElements for NoChildren {
    fn to_elements(self) -> Vec<Element> {
        vec![]
    }
}

pub const EMPTY: NoChildren = NoChildren;

pub fn tag(
    name: impl Into<String>,
    attributes: impl Into<Vec<Attribute>>,
    children: impl ToElements,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.into(),
        children: children.to_elements(),
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

pub fn html(children: impl ToElements) -> Element {
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
        EMPTY,
    )
}

pub fn script(src: impl Into<String>) -> Element {
    tag(
        "script",
        [("src".into(), Some(src.into()))],
        [Element::Text {
            text: "".to_string(),
        }],
    )
}

pub fn h(depth: u8, with_link: bool, children: impl ToElements) -> Element {
    let children = children.to_elements();
    let inner_text = children.iter().map(|c| c.inner_text()).collect::<String>();
    let id = util::slugify(&inner_text);

    let children = if with_link {
        vec![a(format!("#{}", id), None::<String>, children)]
    } else {
        children
    };

    tag(format!("h{}", depth), [("id".into(), Some(id))], children)
}

pub fn img(src: impl Into<String>, alt: impl Into<String>) -> Element {
    tag(
        "img",
        [
            ("src".into(), Some(src.into())),
            ("alt".into(), Some(alt.into())),
        ],
        EMPTY,
    )
}

pub fn a(
    href: impl Into<String>,
    title: Option<impl Into<String>>,
    children: impl ToElements,
) -> Element {
    let mut attributes = vec![("href".into(), Some(href.into()))];
    if let Some(title) = title {
        attributes.push(("title".into(), Some(title.into())));
    }

    tag("a", attributes, children)
}

pub fn a_simple(href: impl Into<String>, txt: impl Into<String>) -> Element {
    let txt = txt.into();
    a(href, None::<String>, text(txt))
}

pub fn br() -> Element {
    tag("br", [], EMPTY)
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
        plain: [$($plain_ident:ident),*],
        children: [$($children_ident:ident),*],
    ) => {
        $(
            pub fn $plain_ident(attributes: impl Into<Vec<Attribute>>) -> Element {
                tag(stringify!($plain_ident), attributes, EMPTY)
            }
        )*
        $(
            pub fn $children_ident(children: impl ToElements) -> Element {
                tag(stringify!($children_ident), [], children)
            }
        )*
    };
}

aliased_builders! {
    plain: [meta],
    children: [
        head, body, main, p, code, div, pre, header, nav,
        ol, ul, li, strong, em, blockquote, article, section,
        aside, span
    ],
}
