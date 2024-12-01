use std::io::Write;

use crate::{Attribute, Element};

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum RenderElement {
    Tag {
        name: String,
        attributes: Vec<Attribute>,
        children: Vec<RenderElement>,
        void: bool,
    },
    Text {
        text: String,
    },
    Raw {
        html: String,
    },
}
impl RenderElement {
    pub fn from_elements(elements: impl IntoIterator<Item = Element>) -> Vec<Self> {
        elements
            .into_iter()
            .flat_map(|e| match e {
                Element::Empty => vec![],
                Element::Tag {
                    name,
                    attributes,
                    children,
                    void,
                } => vec![Self::Tag {
                    name,
                    attributes,
                    children: Self::from_elements(children),
                    void,
                }],
                Element::Fragment { children } => Self::from_elements(children),
                Element::Text { text } if text == "\n" => vec![],
                Element::Text { text } => vec![Self::Text { text }],
                Element::Raw { html } => vec![Self::Raw { html }],
            })
            .collect()
    }

    pub fn write_to_string(&self) -> std::io::Result<String> {
        let mut output = vec![];
        self.write(&mut output, 0)?;
        Ok(String::from_utf8(output).unwrap())
    }

    pub fn write(&self, writer: &mut dyn Write, depth: usize) -> std::io::Result<()> {
        match self {
            RenderElement::Tag {
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

                let children_started_with_text = children
                    .first()
                    .is_some_and(|c| matches!(c, RenderElement::Text { .. }));
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
            RenderElement::Text { text } => {
                let text = html_escape::encode_text(text);
                for (idx, line) in text.lines().enumerate() {
                    if idx > 0 {
                        writeln!(writer)?;
                    }
                    write!(writer, "{}", line)?;
                }
                Ok(())
            }
            RenderElement::Raw { html } => {
                write!(writer, "{html}")?;
                Ok(())
            }
        }
    }

    pub fn write_many(
        writer: &mut dyn Write,
        elements: &[RenderElement],
        depth: usize,
    ) -> std::io::Result<()> {
        for (idx, element) in elements.iter().enumerate() {
            if idx > 0 {
                writeln!(writer)?;
            }
            element.write(writer, depth)?;
        }
        Ok(())
    }

    pub fn write_many_to_string(elements: &[RenderElement]) -> std::io::Result<String> {
        let mut output = vec![];
        Self::write_many(&mut output, elements, 0)?;
        Ok(String::from_utf8(output).unwrap())
    }

    pub fn tag(&self) -> Option<&str> {
        match self {
            RenderElement::Tag { name, .. } => Some(name),
            _ => None,
        }
    }

    /// Returns `true` if the element is [`Raw`].
    ///
    /// [`Raw`]: RenderElement::Raw
    #[must_use]
    pub fn is_raw(&self) -> bool {
        matches!(self, Self::Raw { .. })
    }
}
