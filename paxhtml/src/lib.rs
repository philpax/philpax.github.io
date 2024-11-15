use std::{
    io::Write,
    path::{Path, PathBuf},
};

pub mod builder;
pub mod util;

#[cfg(feature = "macros")]
pub use paxhtml_macro::html;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct RoutePath {
    segments: Vec<String>,
}
impl RoutePath {
    pub fn new<'a>(segments: impl IntoIterator<Item = &'a str>) -> Self {
        Self {
            segments: segments.into_iter().map(|s| s.to_string()).collect(),
        }
    }
    pub fn dir_path(&self, out_dir: &Path) -> PathBuf {
        let mut path = out_dir.to_path_buf();
        for segment in &self.segments {
            path.push(segment);
        }
        path
    }
    pub fn index_path(&self, out_dir: &Path) -> PathBuf {
        self.dir_path(out_dir).join("index.html")
    }
    /// Always starts and ends with a `/`
    pub fn url_path(&self) -> String {
        let mut path = format!("/{}", self.segments.join("/"));
        if !path.ends_with('/') {
            path.push('/');
        }
        path
    }
}

#[derive(Debug)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Document {
    pub children: Vec<Element>,
}
impl Document {
    pub fn new(children: impl builder::ToElements) -> Self {
        Document {
            children: children.to_elements(),
        }
    }

    pub fn write_to_route(
        &self,
        output_dir: &Path,
        route_path: impl Into<RoutePath>,
    ) -> std::io::Result<()> {
        let path = route_path.into().index_path(output_dir);
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        #[cfg(feature = "dump_tree")]
        {
            std::fs::write(
                path.with_extension("json"),
                serde_json::to_string_pretty(&self).unwrap(),
            )?;
        }
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

#[derive(Debug, Default, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Attribute {
    pub key: String,
    pub value: Option<String>,
}
pub fn attr(value: impl Into<Attribute>) -> Attribute {
    value.into()
}
impl From<&str> for Attribute {
    fn from(s: &str) -> Self {
        Attribute {
            key: s.to_string(),
            value: None,
        }
    }
}
impl From<String> for Attribute {
    fn from(s: String) -> Self {
        Attribute {
            key: s,
            value: None,
        }
    }
}
impl From<Attribute> for (String, Option<String>) {
    fn from(a: Attribute) -> Self {
        (a.key, a.value)
    }
}
impl From<(&str, &str)> for Attribute {
    fn from((key, value): (&str, &str)) -> Self {
        Attribute {
            key: key.to_string(),
            value: Some(value.to_string()),
        }
    }
}
impl From<(&str, String)> for Attribute {
    fn from((key, value): (&str, String)) -> Self {
        Attribute {
            key: key.to_string(),
            value: Some(value),
        }
    }
}
impl From<(String, &str)> for Attribute {
    fn from((key, value): (String, &str)) -> Self {
        Attribute {
            key,
            value: Some(value.to_string()),
        }
    }
}
impl From<(String, String)> for Attribute {
    fn from((key, value): (String, String)) -> Self {
        Attribute {
            key,
            value: Some(value),
        }
    }
}

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
impl From<Vec<Element>> for Element {
    fn from(children: Vec<Element>) -> Self {
        Element::Fragment { children }
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
            Element::Fragment { children } => {
                for child in children {
                    child.write(writer, depth)?;
                }
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
}

#[cfg(test)]
mod tests {
    use super::builder::*;

    #[test]
    fn test_inline_code() {
        let input = p(Empty)([
            text("This is an example of "),
            code(Empty)("inline code"),
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
        let input = ul(("class", "tags"))(Empty);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<ul class=\"tags\"></ul>");
    }

    #[test]
    fn test_void_element() {
        let input = br(Empty);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<br>");
    }
}
