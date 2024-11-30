use std::io::Write;

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
    pub fn write_to_string(&self) -> std::io::Result<String> {
        let mut output = vec![];
        self.write(&mut output, 0)?;
        Ok(String::from_utf8(output).unwrap())
    }

    pub fn write(&self, writer: &mut dyn Write, depth: usize) -> std::io::Result<()> {
        match self {
            Element::Empty => Ok(()),
            Element::Tag {
                name,
                attributes,
                children,
                void,
            } => {
                // start tag
                write!(writer, "<{name}")?;
                for Attribute { key, value } in attributes {
                    match value {
                        Some(value) => write!(writer, " {key}=\"{value}\"")?,
                        None => write!(writer, " {key}")?,
                    }
                }
                write!(writer, ">")?;

                if *void {
                    if !children.is_empty() {
                        return Err(std::io::Error::new(
                            std::io::ErrorKind::InvalidInput,
                            format!("Void element ({self:?}) has children"),
                        ));
                    }
                    return Ok(());
                }

                // children - we flatten them to simplify the logic below,
                // which ensures that fragments are not indented
                fn flatten_children(children: &[Element]) -> Vec<Element> {
                    children
                        .iter()
                        .flat_map(|c| match c {
                            Element::Empty => vec![],
                            Element::Text { text } if text == "\n" => vec![],
                            Element::Fragment { children } => flatten_children(children),
                            _ => vec![c.clone()],
                        })
                        .collect::<Vec<_>>()
                }
                let children = flatten_children(children);
                let children_started_with_text = children
                    .first()
                    .is_some_and(|c| matches!(c, Element::Text { .. }));
                let should_indent = !children.is_empty() && !children_started_with_text;
                let mut did_indent = false;
                for child in children {
                    let depth = depth + 1;
                    let should_indent_this_child = should_indent
                        && !child.tag().is_some_and(|t| ["code", "pre"].contains(&t))
                        && !child.is_raw();
                    if should_indent_this_child {
                        writeln!(writer)?;
                        for _ in 0..depth {
                            write!(writer, "  ")?;
                        }
                        did_indent = true;
                    }
                    child.write(writer, depth)?;
                }

                // end tag
                if did_indent {
                    writeln!(writer)?;
                    for _ in 0..depth {
                        write!(writer, "  ")?;
                    }
                }
                write!(writer, "</{name}>")?;
                Ok(())
            }
            Element::Fragment { children: _ } => {
                unreachable!()
            }
            Element::Text { text } => {
                let text = html_escape::encode_text(text);
                for (idx, line) in text.lines().enumerate() {
                    if idx > 0 {
                        writeln!(writer)?;
                    }
                    write!(writer, "{}", line)?;
                }
                Ok(())
            }
            Element::Raw { html } => {
                write!(writer, "{html}")?;
                Ok(())
            }
        }
    }

    pub fn write_many_to_string(elements: &[Element]) -> std::io::Result<String> {
        let mut output = vec![];
        for (idx, element) in elements.iter().enumerate() {
            if idx > 0 {
                writeln!(output)?;
            }
            element.write(&mut output, 0)?;
        }
        Ok(String::from_utf8(output).unwrap())
    }

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

#[cfg(test)]
mod tests {
    use crate::builder::*;

    #[test]
    fn test_inline_code() {
        let input = p([])([
            text("This is an example of "),
            code([])("inline code"),
            text(" in a paragraph."),
        ]);

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }

    #[test]
    fn test_empty_ul_with_tags_class() {
        let input = ul([("class", "tags").into()])([]);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<ul class=\"tags\"></ul>");
    }

    #[test]
    fn test_void_element() {
        let input = br([]);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<br>");
    }
}
