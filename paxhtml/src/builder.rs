use crate::{attr, util};

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

pub trait ToAttributes {
    fn to_attributes(self) -> Vec<Attribute>;
}
impl<T: Into<Attribute>> ToAttributes for T {
    fn to_attributes(self) -> Vec<Attribute> {
        vec![self.into()]
    }
}
impl<T: Into<Attribute>> ToAttributes for Vec<T> {
    fn to_attributes(self) -> Vec<Attribute> {
        self.into_iter().map(Into::into).collect()
    }
}
impl<T: Into<Attribute> + Clone> ToAttributes for &[T] {
    fn to_attributes(self) -> Vec<Attribute> {
        self.iter().cloned().map(|e| e.into()).collect()
    }
}
impl<T: Into<Attribute> + Clone, const N: usize> ToAttributes for [T; N] {
    fn to_attributes(self) -> Vec<Attribute> {
        self.iter().cloned().map(|e| e.into()).collect()
    }
}

/// A type that represents no attributes or elements.
pub struct Empty;
impl ToAttributes for Empty {
    fn to_attributes(self) -> Vec<Attribute> {
        vec![]
    }
}
impl ToElements for Empty {
    fn to_elements(self) -> Vec<Element> {
        vec![]
    }
}

pub fn text(text: impl Into<String>) -> Element {
    Element::from(text.into())
}

pub fn tag(
    name: impl Into<String>,
    attributes: impl ToAttributes,
    children: impl ToElements,
    void: bool,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.to_attributes(),
        children: children.to_elements(),
        void,
    }
}

pub fn tag_curried<E: ToElements>(
    name: impl Into<String>,
    attributes: impl ToAttributes,
    void: bool,
) -> impl FnOnce(E) -> Element {
    move |children: E| tag(name, attributes, children, void)
}

pub fn tag_with_text(
    name: impl Into<String>,
    attributes: impl ToAttributes,
    text: impl Into<String>,
) -> Element {
    Element::Tag {
        name: name.into(),
        attributes: attributes.to_attributes(),
        children: vec![Element::Text { text: text.into() }],
        void: false,
    }
}

pub fn doctype(attributes: impl ToAttributes) -> Element {
    tag("!DOCTYPE", attributes, Empty, true)
}

pub fn html(children: impl ToElements) -> Element {
    tag("html", ("lang", "en-AU"), children, false)
}

pub fn h(depth: u8, with_link: bool, children: impl ToElements) -> Element {
    let children = children.to_elements();
    let inner_text = children.iter().map(|c| c.inner_text()).collect::<String>();
    let id = util::slugify(&inner_text);

    let children = if with_link {
        vec![a(format!("#{id}"), None::<String>, children)]
    } else {
        children
    };

    tag(format!("h{depth}"), ("id", id), children, false)
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
        [("src", src.into()), ("alt", alt.into())],
        Empty,
        true,
    )
}

pub fn a(
    href: impl Into<String>,
    title: Option<impl Into<String>>,
    children: impl ToElements,
) -> Element {
    let mut attributes = vec![attr(("href", href.into()))];
    if let Some(title) = title {
        attributes.push(attr(("title", title.into())));
    }

    tag("a", attributes, children, false)
}

pub fn a_simple(href: impl Into<String>, txt: impl Into<String>) -> Element {
    a(href, None::<String>, txt.into())
}

pub fn date(date: chrono::NaiveDate) -> Element {
    let date = date.to_string();
    tag_with_text(
        "time",
        [("datetime", date.as_str()), ("title", date.as_str())],
        date.clone(),
    )
}

pub fn datetime<TZ: chrono::TimeZone>(date: chrono::DateTime<TZ>) -> Element {
    tag_with_text(
        "time",
        [
            ("datetime", date.to_rfc3339()),
            ("title", date.to_rfc2822()),
        ],
        date.to_rfc2822(),
    )
}

macro_rules! non_void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident<E: ToElements>(attributes: impl ToAttributes) -> impl FnOnce(E) -> Element {
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
        pub fn $tag_ident(attributes: impl ToAttributes) -> Element {
            tag(stringify!($tag_ident), attributes, Empty, true)
        }
    )* };
}
void_builders! {
    area, base, br, col, embed, hr, input, link, meta,
    param, source, track, wbr
}
