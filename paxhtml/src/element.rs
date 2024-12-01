use crate::Attribute;

#[derive(Debug, Default, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum Element {
    #[default]
    Empty,
    Tag {
        name: String,
        attributes: Vec<Attribute>,
        children: Vec<Element>,
        void: bool,
    },
    Fragment {
        children: Vec<Element>,
    },
    Text {
        text: String,
    },
    Raw {
        html: String,
    },
}
impl From<String> for Element {
    fn from(s: String) -> Self {
        Element::Text { text: s }
    }
}
impl From<&str> for Element {
    fn from(s: &str) -> Self {
        s.to_string().into()
    }
}
impl From<&String> for Element {
    fn from(s: &String) -> Self {
        s.clone().into()
    }
}
impl From<Vec<Element>> for Element {
    fn from(children: Vec<Element>) -> Self {
        if children.is_empty() {
            Element::Empty
        } else if children.len() == 1 {
            children[0].clone()
        } else {
            Element::Fragment { children }
        }
    }
}
impl From<&[Element]> for Element {
    fn from(children: &[Element]) -> Self {
        children.to_vec().into()
    }
}
impl<const N: usize> From<[Element; N]> for Element {
    fn from(children: [Element; N]) -> Self {
        children.to_vec().into()
    }
}
impl FromIterator<Element> for Element {
    fn from_iter<I: IntoIterator<Item = Element>>(iter: I) -> Self {
        iter.into_iter().collect::<Vec<_>>().into()
    }
}
/// A trait for converting an iterator of elements into a single [`Element`].
///
/// This trait is implemented for any iterator that yields [`Element`]s, making it
/// easier to construct a single element from multiple elements. The resulting
/// element will be:
/// - [`Element::Empty`] if the iterator is empty
/// - The single element if the iterator contains exactly one element
/// - [`Element::Fragment`] containing all elements if the iterator contains multiple elements
pub trait IntoElement {
    fn into_element(self) -> Element;
}
impl<T: Iterator<Item = Element>> IntoElement for T {
    fn into_element(self) -> Element {
        Element::from_iter(self)
    }
}
impl Element {
    pub fn tag(&self) -> Option<&str> {
        match self {
            Element::Tag { name, .. } => Some(name),
            _ => None,
        }
    }

    pub fn attrs(&self) -> Option<&[Attribute]> {
        match self {
            Element::Tag { attributes, .. } => Some(attributes),
            _ => None,
        }
    }

    pub fn inner_text(&self) -> String {
        match self {
            Element::Empty => String::new(),
            Element::Tag { children, .. } => children.iter().map(Element::inner_text).collect(),
            Element::Fragment { children } => children.iter().map(Element::inner_text).collect(),
            Element::Text { text } => text.clone(),
            Element::Raw { .. } => String::new(),
        }
    }

    /// Returns `true` if the element is [`Empty`].
    ///
    /// [`Empty`]: Element::Empty
    #[must_use]
    pub fn is_empty(&self) -> bool {
        matches!(self, Self::Empty)
    }

    /// Returns `true` if the element is [`Tag`].
    ///
    /// [`Tag`]: Element::Tag
    #[must_use]
    pub fn is_tag(&self) -> bool {
        matches!(self, Self::Tag { .. })
    }

    /// Returns `true` if the element is [`Fragment`].
    ///
    /// [`Fragment`]: Element::Fragment
    #[must_use]
    pub fn is_fragment(&self) -> bool {
        matches!(self, Self::Fragment { .. })
    }

    /// Returns `true` if the element is [`Text`].
    ///
    /// [`Text`]: Element::Text
    #[must_use]
    pub fn is_text(&self) -> bool {
        matches!(self, Self::Text { .. })
    }

    /// Returns `true` if the element is [`Raw`].
    ///
    /// [`Raw`]: Element::Raw
    #[must_use]
    pub fn is_raw(&self) -> bool {
        matches!(self, Self::Raw { .. })
    }
}
