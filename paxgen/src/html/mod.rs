use std::{io::Write, path::Path};

#[allow(dead_code)]
pub mod builder;

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

    pub fn write_to_path(&self, path: &Path) -> anyhow::Result<()> {
        let file = std::fs::File::create(path)?;
        let mut writer = std::io::BufWriter::new(file);

        writeln!(writer, "<!DOCTYPE html>")?;
        for child in &self.children {
            child.write(&mut writer)?;
        }

        Ok(())
    }
}

type Attribute = (String, Option<String>);

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub enum Element {
    #[default]
    Empty,
    Tag {
        name: String,
        attributes: Vec<Attribute>,
        children: Vec<Element>,
    },
    Text {
        text: String,
    },
    Raw {
        html: String,
    },
}
#[allow(dead_code)]
impl Element {
    pub fn write_to_string(&self) -> anyhow::Result<String> {
        let mut output = vec![];
        self.write(&mut output)?;
        Ok(String::from_utf8(output)?)
    }

    pub fn write(&self, writer: &mut dyn Write) -> anyhow::Result<()> {
        match self {
            Element::Empty => Ok(()),
            Element::Tag {
                name,
                attributes,
                children,
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
                if children.is_empty() {
                    return Ok(());
                }

                // children
                for child in children {
                    child.write(writer)?;
                }

                // end tag
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

    pub fn write_many_to_string(elements: &[Element]) -> anyhow::Result<String> {
        let mut output = vec![];
        for (idx, element) in elements.iter().enumerate() {
            if idx > 0 {
                writeln!(output)?;
            }
            element.write(&mut output)?;
        }
        Ok(String::from_utf8(output)?)
    }

    pub fn attrs(&self) -> Option<&[Attribute]> {
        match self {
            Element::Tag { attributes, .. } => Some(attributes),
            _ => None,
        }
    }

    pub fn with_attrs(self, attributes: impl IntoIterator<Item = Attribute>) -> Self {
        match self {
            Element::Tag {
                name,
                attributes: old_attrs,
                children,
            } => Element::Tag {
                name,
                attributes: old_attrs.into_iter().chain(attributes).collect(),
                children,
            },
            _ => panic!("Cannot add attributes to non-tag element {self:?}"),
        }
    }

    pub fn with_id(self, id: impl Into<String>) -> Self {
        self.with_attrs([("id".into(), Some(id.into()))])
    }

    pub fn with_class(self, class: impl Into<String>) -> Self {
        let mut existing_class = self
            .attrs()
            .and_then(|attrs| attrs.iter().find(|(key, _)| key == "class"))
            .and_then(|(_, value)| value.clone())
            .unwrap_or_default();
        if !existing_class.is_empty() {
            existing_class.push(' ');
        }
        existing_class.push_str(&class.into());

        self.with_attrs([("class".into(), Some(existing_class))])
    }

    pub fn inner_text(&self) -> String {
        match self {
            Element::Empty => String::new(),
            Element::Tag { children, .. } => children.iter().map(Element::inner_text).collect(),
            Element::Text { text } => text.clone(),
            Element::Raw { .. } => String::new(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::builder::*;

    #[test]
    fn test_inline_code() {
        let input = p([
            text("This is an example of "),
            code(text("inline code")),
            text(" in a paragraph."),
        ]);

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }
}
