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
/// A type that represents no children.
pub struct NC;
impl ToElements for NC {
    fn to_elements(self) -> Vec<Element> {
        vec![]
    }
}

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

pub fn tag_curried<E: ToElements>(
    name: impl Into<String>,
    attributes: impl Into<Vec<Attribute>>,
) -> impl FnOnce(E) -> Element {
    move |children: E| tag(name, attributes, children)
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
pub fn h1(children: impl ToElements) -> Element {
    h(1, false, children)
}
pub fn h2(children: impl ToElements) -> Element {
    h(2, false, children)
}
pub fn h3(children: impl ToElements) -> Element {
    h(3, false, children)
}
pub fn h4(children: impl ToElements) -> Element {
    h(4, false, children)
}
pub fn h5(children: impl ToElements) -> Element {
    h(5, false, children)
}
pub fn h6(children: impl ToElements) -> Element {
    h(6, false, children)
}

pub fn img(src: impl Into<String>, alt: impl Into<String>) -> Element {
    tag(
        "img",
        [
            ("src".into(), Some(src.into())),
            ("alt".into(), Some(alt.into())),
        ],
        NC,
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
    tag("br", [], NC)
}

pub fn date(date: chrono::NaiveDate) -> Element {
    tag_with_text(
        "time",
        [
            ("datetime".into(), Some(date.to_string())),
            ("title".into(), Some(date.to_string())),
        ],
        date.to_string(),
    )
}

pub fn datetime<TZ: chrono::TimeZone>(date: chrono::DateTime<TZ>) -> Element {
    tag_with_text(
        "time",
        [
            ("datetime".into(), Some(date.to_rfc3339())),
            ("title".into(), Some(date.to_rfc2822())),
        ],
        date.to_rfc2822(),
    )
}

macro_rules! aliased_builders {
    (
        $($tag_ident:ident),*
    ) => {
        $(
            pub fn $tag_ident<E: ToElements>(attributes: impl Into<Vec<Attribute>>) -> impl FnOnce(E) -> Element {
                tag_curried(stringify!($tag_ident), attributes)
            }
        )*
    };
}

aliased_builders! {
    meta, head, body, main, p, code, div, pre, header, nav,
    ol, ul, li, strong, em, blockquote, article, section,
    aside, span, link
}
