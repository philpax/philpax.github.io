use crate::util;

pub use super::{Attribute, Element};

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
    void: bool,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.into(),
        children: children.to_elements(),
        void,
    }
}

pub fn tag_curried<E: ToElements>(
    name: impl Into<String>,
    attributes: impl Into<Vec<Attribute>>,
    void: bool,
) -> impl FnOnce(E) -> Element {
    move |children: E| tag(name, attributes, children, void)
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
        void: false,
    }
}

pub fn doctype(attributes: impl Into<Vec<Attribute>>) -> Element {
    tag("!DOCTYPE", attributes, NC, true)
}

pub fn html(children: impl ToElements) -> Element {
    tag(
        "html",
        [("lang".into(), Some("en-AU".into()))],
        children,
        false,
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

    tag(
        format!("h{}", depth),
        [("id".into(), Some(id))],
        children,
        false,
    )
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
        true,
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

    tag("a", attributes, children, false)
}

pub fn a_simple(href: impl Into<String>, txt: impl Into<String>) -> Element {
    a(href, None::<String>, txt.into())
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

macro_rules! non_void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident<E: ToElements>(attributes: impl Into<Vec<Attribute>>) -> impl FnOnce(E) -> Element {
            tag_curried(stringify!($tag_ident), attributes, false)
        }
    )* };
}
non_void_builders! {
    head, body, main, p, code, div, pre, header, nav,
    ol, ul, li, strong, em, blockquote, article, section,
    aside, span, script, title
}

macro_rules! void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident(attributes: impl Into<Vec<Attribute>>) -> Element {
            tag(stringify!($tag_ident), attributes, NC, true)
        }
    )* };
}
void_builders! {
    area, base, br, col, embed, hr, input, link, meta,
    param, source, track, wbr
}
