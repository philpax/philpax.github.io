use std::path::Path;

use crate::{routing::RoutePath, Element, RenderElement};

#[derive(Debug)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct Document {
    pub children: Vec<RenderElement>,
}
impl From<Vec<Element>> for Document {
    fn from(children: Vec<Element>) -> Self {
        Document {
            children: RenderElement::from_elements(children),
        }
    }
}
impl Document {
    pub fn new(children: impl IntoIterator<Item = Element>) -> Self {
        Document {
            children: RenderElement::from_elements(children),
        }
    }

    pub fn write(&self, writer: &mut impl std::io::Write) -> std::io::Result<()> {
        RenderElement::write_many(writer, &self.children, 0)
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
    fn test_inline_code() {
        let input = Document::new([p([])([
            text("This is an example of "),
            code([])("inline code"),
            text(" in a paragraph."),
        ])]);

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }

    #[test]
    fn test_empty_ul_with_tags_class() {
        let input = Document::new([ul([("class", "tags").into()])([])]);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<ul class=\"tags\"></ul>");
    }

    #[test]
    fn test_void_element() {
        let input = Document::new([br([])]);
        let output = input.write_to_string().unwrap();
        assert_eq!(output, "<br>");
    }

    #[test]
    fn should_indent_successive_p_tags_in_a_fragment() {
        let input_elements = Document::new([div([])([p([])(text("Hello")), p([])(text("World"))])]);
        let output = input_elements.write_to_string().unwrap();
        assert_eq!(output, "<div>\n  <p>Hello</p>\n  <p>World</p>\n</div>");
    }
}
