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

pub fn tag<E: ToElements>(
    name: impl Into<String>,
    attributes: impl ToAttributes,
    void: bool,
) -> impl FnOnce(E) -> Element {
    move |children: E| Element::Tag {
        name: name.into(),
        attributes: attributes.to_attributes(),
        children: children.to_elements(),
        void,
    }
}

pub fn doctype(attributes: impl ToAttributes) -> Element {
    Element::Tag {
        name: "!DOCTYPE".into(),
        attributes: attributes.to_attributes(),
        children: Empty.to_elements(),
        void: true,
    }
}

macro_rules! non_void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident<E: ToElements>(attributes: impl ToAttributes) -> impl FnOnce(E) -> Element {
            tag(stringify!($tag_ident), attributes, false)
        }
    )* };
}
non_void_builders! {
    head, body, main, p, code, div, pre, header, nav,
    ol, ul, li, strong, em, blockquote, article, section,
    aside, span, script, title, time, html, a,
    h1, h2, h3, h4, h5, h6
}

macro_rules! void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident(attributes: impl ToAttributes) -> Element {
            tag(stringify!($tag_ident), attributes, true)(Empty)
        }
    )* };
}
void_builders! {
    area, base, br, col, embed, hr, input, link, meta,
    param, source, track, wbr, img
}
