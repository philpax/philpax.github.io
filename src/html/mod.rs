use std::{io::Write, path::Path};

#[allow(dead_code)]
pub mod builder;

#[derive(Debug)]
pub struct Document {
    pub children: Vec<Element>,
}
impl Document {
    pub fn new(children: impl Into<Vec<Element>>) -> Self {
        Document {
            children: children.into(),
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

#[derive(Debug, Default)]
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
impl Element {
    #[allow(dead_code)]
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
                if children.is_empty() {
                    write!(writer, "/>")?;
                    return Ok(());
                } else {
                    write!(writer, ">")?;
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
}

#[cfg(test)]
mod tests {
    use super::builder::*;

    #[test]
    fn test_inline_code() {
        let input = p(
            [],
            [
                text("This is an example of "),
                code([], [text("inline code")]),
                text(" in a paragraph."),
            ],
        );

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }
}
