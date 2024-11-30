pub use super::{Attribute, Document, Element, IntoElement};

pub fn text(text: impl Into<String>) -> Element {
    Element::from(text.into())
}

pub fn tag<E: Into<Element>>(
    name: impl Into<String>,
    attributes: impl IntoIterator<Item = Attribute>,
    void: bool,
) -> impl FnOnce(E) -> Element {
    move |children: E| {
        let children = children.into();
        let children = if let Element::Fragment { children } = children {
            children
        } else if !children.is_empty() {
            vec![children]
        } else {
            vec![]
        };
        Element::Tag {
            name: name.into(),
            attributes: attributes.into_iter().collect(),
            children,
            void,
        }
    }
}

pub fn doctype(attributes: impl IntoIterator<Item = Attribute>) -> Element {
    Element::Tag {
        name: "!DOCTYPE".into(),
        attributes: attributes.into_iter().collect(),
        children: vec![],
        void: true,
    }
}

macro_rules! non_void_builders {
    ($($tag_ident:ident),*) => { $(
        pub fn $tag_ident<E: Into<Element>>(attributes: impl IntoIterator<Item = Attribute>) -> impl FnOnce(E) -> Element {
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
        pub fn $tag_ident(attributes: impl IntoIterator<Item = Attribute>) -> Element {
            tag(stringify!($tag_ident), attributes, true)([])
        }
    )* };
}
void_builders! {
    area, base, br, col, embed, hr, input, link, meta,
    param, source, track, wbr, img
}
