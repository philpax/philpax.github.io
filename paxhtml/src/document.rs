use std::path::Path;

use crate::{routing::RoutePath, Element};

#[derive(Debug)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Document {
    pub children: Vec<Element>,
}
impl From<Vec<Element>> for Document {
    fn from(children: Vec<Element>) -> Self {
        Document { children }
    }
}
impl Document {
    pub fn new(children: impl IntoIterator<Item = Element>) -> Self {
        Document {
            children: children.into_iter().collect(),
        }
    }

    pub fn write(&self, writer: &mut impl std::io::Write) -> std::io::Result<()> {
        for (idx, child) in self.children.iter().enumerate() {
            if idx > 0 {
                writeln!(writer)?;
            }
            child.write(writer, 0)?;
        }
        Ok(())
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
        self.write(&mut writer)
    }

    pub fn write_to_string(&self) -> std::io::Result<String> {
        let mut output = vec![];
        self.write(&mut output)?;
        Ok(String::from_utf8(output).unwrap())
    }
}

#[cfg(test)]
mod tests {
    use crate::builder::*;

    #[test]
    fn should_indent_successive_p_tags_in_a_fragment() {
        let input_elements = vec![div([])([p([])(text("Hello")), p([])(text("World"))])];

        let desired_output = "<div>\n  <p>Hello</p>\n  <p>World</p>\n</div>";

        let input_document: Document = input_elements.clone().into();
        let output = input_document.write_to_string().unwrap();
        assert_eq!(output, desired_output);

        let input_element: Element = input_elements.into();
        let output = input_element.write_to_string().unwrap();
        assert_eq!(output, desired_output);
    }
}
