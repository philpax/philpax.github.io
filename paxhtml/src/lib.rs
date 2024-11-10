use std::{io::Write, path::Path};

pub mod builder;
pub mod util;

#[derive(Debug)]
pub struct Document {
    pub children: Vec<Element>,
}
impl Document {
    pub fn new(children: impl builder::ToElements) -> Self {
        Document {
            children: children.to_elements(),
        }
    }

    pub fn write_to_path(&self, path: &Path) -> std::io::Result<()> {
        let mut writer = std::io::BufWriter::new(std::fs::File::create(path)?);
        for (idx, child) in self.children.iter().enumerate() {
            if idx > 0 {
                writeln!(writer)?;
            }
            child.write(&mut writer, 0)?;
        }
        Ok(())
    }
}

pub type Attribute = (String, Option<String>);

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub enum Element {
    #[default]
    Empty,
    Tag {
        name: String,
        attributes: Vec<Attribute>,
        children: Vec<Element>,
        void: bool,
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
                for (key, value) in attributes {
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

                // children
                let children_started_with_text = children
                    .first()
                    .is_some_and(|c| matches!(c, Element::Text { .. }));
                let should_indent = !children.is_empty() && !children_started_with_text;
                let mut did_indent = false;
                for child in children {
                    let depth = depth + 1;
                    let should_indent_this_child = should_indent
                        && !child.tag().is_some_and(|t| ["code", "pre"].contains(&t))
                        && !child.is_empty();
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
}

#[cfg(test)]
mod tests {
    use super::builder::*;

    #[test]
    fn test_inline_code() {
        let input = p([])([
            Element::from("This is an example of "),
            code([])("inline code"),
            Element::from(" in a paragraph."),
        ]);

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }

    #[test]
    fn test_empty_ul_with_tags_class() {
        let input = ul([("class".into(), Some("tags".into()))])(NC);
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
