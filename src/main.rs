use std::{io::Write, path::Path};

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");
    std::fs::remove_dir_all(public).ok();
    std::fs::create_dir_all(public)?;

    let file = std::fs::read_to_string("layout/index.kdl")?;
    let doc: kdl::KdlDocument = file.parse()?;

    let html_doc = HtmlDocument {
        children: doc.nodes().iter().map(convert_kdl_to_tag).collect(),
    };
    html_doc.write_to_path(&public.join("index.html"))?;

    Ok(())
}

fn strip_surrounding_quotes(mut s: &str) -> &str {
    if s.starts_with('"') {
        s = &s[1..];
    }
    if s.ends_with('"') {
        s = &s[..s.len() - 1];
    }
    s
}

pub fn convert_kdl_to_tag(node: &kdl::KdlNode) -> HtmlElement {
    // This is an awful hack because KDL doesn't expose whether this is
    // a plain identifier
    let node_name = node.name().to_string();
    if node_name.contains('"') {
        return HtmlElement::Text {
            text: strip_surrounding_quotes(&node_name).to_string(),
        };
    }

    HtmlElement::Tag {
        name: node_name,
        attributes: node
            .entries()
            .iter()
            .map(|entry| {
                let value = strip_surrounding_quotes(&entry.value().to_string()).to_string();
                match entry.name() {
                    Some(key) => (key.to_string(), Some(value)),
                    None => (value, None),
                }
            })
            .collect(),
        children: node
            .children()
            .map(|children| children.nodes().iter().map(convert_kdl_to_tag).collect())
            .unwrap_or_default(),
    }
}

#[derive(Debug)]
pub struct HtmlDocument {
    children: Vec<HtmlElement>,
}
impl HtmlDocument {
    pub fn write_to_path(&self, path: &Path) -> anyhow::Result<()> {
        let file = std::fs::File::create(path)?;
        let mut writer = std::io::BufWriter::new(file);

        writeln!(writer, "<!DOCTYPE html>")?;
        for child in &self.children {
            child.write(&mut writer, 0)?;
        }

        Ok(())
    }
}

#[derive(Debug)]
pub enum HtmlElement {
    Tag {
        name: String,
        attributes: Vec<(String, Option<String>)>,
        children: Vec<HtmlElement>,
    },
    Text {
        text: String,
    },
}
impl HtmlElement {
    pub fn write(&self, writer: &mut dyn Write, depth: usize) -> anyhow::Result<()> {
        match self {
            HtmlElement::Tag {
                name,
                attributes,
                children,
            } => {
                // start tag
                write!(writer, "{}<{}", "  ".repeat(depth), name)?;
                if !attributes.is_empty() {
                    write!(writer, " ")?;
                }
                for (key, value) in attributes {
                    match value {
                        Some(value) => write!(writer, "{key}=\"{value}\" ")?,
                        None => write!(writer, "{key} ")?,
                    }
                }
                if children.is_empty() {
                    writeln!(writer, "/>")?;
                    return Ok(());
                } else {
                    writeln!(writer, ">")?;
                }

                // children
                for child in children {
                    child.write(writer, depth + 1)?;
                }

                // end tag
                writeln!(writer, "{}</{}>", "  ".repeat(depth), name)?;
                Ok(())
            }
            HtmlElement::Text { text } => Ok(writeln!(writer, "{}{}", "  ".repeat(depth), text)?),
        }
    }
}
