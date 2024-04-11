use serde::Deserialize;
use std::path::Path;

fn main() -> anyhow::Result<()> {
    let public = Path::new("public");
    std::fs::remove_dir_all(public).ok();
    std::fs::create_dir_all(public)?;

    let layouts = templating::Layouts::new()?;

    let content = content::read()?;
    for (post_id, doc) in content.blog {
        let output_path = public.join("blog").join(post_id);
        std::fs::create_dir_all(&output_path)?;

        let html = layouts.generate(&doc.content);
        html.write_to_path(&output_path.join("index.html"))?;
    }

    Ok(())
}

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    pub date: toml::value::Datetime,
    pub taxonomies: DocumentTaxonomies,
}

#[derive(Debug, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<String>,
}

#[derive(Debug)]
pub struct Document {
    pub metadata: DocumentMetadata,
    pub content: markdown::mdast::Node,
}

mod content {
    use std::{collections::HashMap, path::Path};

    use anyhow::Context;

    use super::{Document, DocumentMetadata};

    #[derive(Debug)]
    pub struct Content {
        pub blog: HashMap<String, Document>,
    }

    pub fn read() -> anyhow::Result<Content> {
        let content_path = Path::new("content");
        let blog_path = content_path.join("blog");

        let mut blog = HashMap::new();
        for entry in std::fs::read_dir(blog_path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                continue;
            }

            let post_id = path
                .file_name()
                .context("no post id for directory")?
                .to_string_lossy()
                .to_string();

            let index = path.join("index.md");
            if !index.exists() {
                continue;
            }

            let file = std::fs::read_to_string(&index)?;
            let doc = parse_markdown_file(&file)?;
            blog.insert(post_id, doc);
        }

        Ok(Content { blog })
    }

    pub fn parse_markdown_file(file: &str) -> anyhow::Result<Document> {
        let parts: Vec<_> = file.splitn(3, "+++").collect();

        if parts.len() != 3 {
            return Err(anyhow::anyhow!("invalid markdown file"));
        }

        let metadata: DocumentMetadata = toml::from_str(parts[1])?;
        let content = markdown::to_mdast(parts[2], &markdown::ParseOptions::gfm()).unwrap();

        Ok(Document { metadata, content })
    }
}

mod templating {
    use std::{io::Write, path::Path};

    pub struct Layouts {
        pub index: kdl::KdlDocument,
    }
    impl Layouts {
        pub fn new() -> anyhow::Result<Layouts> {
            let file = std::fs::read_to_string("layout/index.kdl")?;
            let index: kdl::KdlDocument = file.parse()?;

            Ok(Layouts { index })
        }

        pub fn generate(&self, document: &markdown::mdast::Node) -> HtmlDocument {
            HtmlDocument {
                children: self
                    .index
                    .nodes()
                    .iter()
                    .flat_map(|n| convert_kdl_to_tag(n, document))
                    .collect(),
            }
        }
    }

    pub fn convert_markdown_to_tag(node: &markdown::mdast::Node) -> Vec<HtmlElement> {
        fn tag(name: &str, children: &[markdown::mdast::Node]) -> HtmlElement {
            HtmlElement::tag(
                name,
                children.iter().flat_map(convert_markdown_to_tag).collect(),
            )
        }

        use markdown::mdast::Node;
        match node {
            Node::Root(r) => r
                .children
                .iter()
                .flat_map(convert_markdown_to_tag)
                .collect(),

            Node::Heading(h) => {
                vec![tag(&format!("h{}", h.depth), &h.children)]
            }
            Node::Text(t) => {
                vec![HtmlElement::Text {
                    text: t.value.to_string(),
                }]
            }
            Node::Paragraph(p) => {
                vec![tag("p", &p.children)]
            }
            Node::Strong(s) => {
                vec![tag("strong", &s.children)]
            }
            Node::Emphasis(e) => {
                vec![tag("em", &e.children)]
            }
            Node::List(l) => {
                vec![tag(if l.ordered { "ol" } else { "ul" }, &l.children)]
            }
            Node::ListItem(li) => {
                vec![tag("li", &li.children)]
            }
            Node::Code(c) => {
                vec![HtmlElement::Tag {
                    name: "pre".into(),
                    attributes: vec![],
                    children: vec![HtmlElement::tag_with_text("code", &c.value)],
                }]
            }
            Node::BlockQuote(b) => {
                vec![tag("blockquote", &b.children)]
            }
            Node::Break(_) => {
                vec![tag("br", &[])]
            }
            Node::InlineCode(c) => {
                vec![HtmlElement::tag_with_text("code", &c.value)]
            }
            Node::Image(i) => {
                vec![HtmlElement::Tag {
                    name: "img".into(),
                    attributes: vec![
                        ("src".into(), Some(i.url.to_string())),
                        ("alt".into(), Some(i.alt.to_string())),
                    ],
                    children: vec![],
                }]
            }
            Node::Link(l) => {
                let mut attributes = vec![("href".into(), Some(l.url.to_string()))];
                if let Some(title) = l.title.clone() {
                    attributes.push(("title".into(), Some(title)))
                }
                vec![HtmlElement::Tag {
                    name: "a".into(),
                    attributes,
                    children: l
                        .children
                        .iter()
                        .flat_map(convert_markdown_to_tag)
                        .collect(),
                }]
            }

            // Not supported yet
            Node::FootnoteDefinition(_)
            | Node::InlineMath(_)
            | Node::Delete(_)
            | Node::FootnoteReference(_)
            | Node::Html(_)
            | Node::ImageReference(_)
            | Node::LinkReference(_)
            | Node::Math(_)
            | Node::Table(_)
            | Node::ThematicBreak(_)
            | Node::TableRow(_)
            | Node::TableCell(_)
            | Node::Definition(_) => {
                vec![]
            }

            // Never supported
            markdown::mdast::Node::Toml(_)
            | markdown::mdast::Node::Yaml(_)
            | markdown::mdast::Node::MdxJsxFlowElement(_)
            | markdown::mdast::Node::MdxjsEsm(_)
            | markdown::mdast::Node::MdxTextExpression(_)
            | markdown::mdast::Node::MdxJsxTextElement(_)
            | markdown::mdast::Node::MdxFlowExpression(_) => {
                vec![]
            }
        }
    }

    pub fn convert_kdl_to_tag(
        node: &kdl::KdlNode,
        document: &markdown::mdast::Node,
    ) -> Vec<HtmlElement> {
        // This is an awful hack because KDL doesn't expose whether this is
        // a plain identifier
        let node_name = node.name().to_string();
        if node_name.contains('"') {
            return vec![HtmlElement::Text {
                text: strip_surrounding_quotes(&node_name).to_string(),
            }];
        }

        if node_name == "block" {
            return convert_markdown_to_tag(document);
        }

        vec![HtmlElement::Tag {
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
                .map(|children| {
                    children
                        .nodes()
                        .iter()
                        .flat_map(|n| convert_kdl_to_tag(n, document))
                        .collect()
                })
                .unwrap_or_default(),
        }]
    }

    #[derive(Debug)]
    pub struct HtmlDocument {
        pub children: Vec<HtmlElement>,
    }
    impl HtmlDocument {
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
    #[allow(dead_code)]
    impl HtmlElement {
        pub fn write_to_string(&self) -> anyhow::Result<String> {
            let mut output = vec![];
            self.write(&mut output)?;
            Ok(String::from_utf8(output)?)
        }

        pub fn write(&self, writer: &mut dyn Write) -> anyhow::Result<()> {
            match self {
                HtmlElement::Tag {
                    name,
                    attributes,
                    children,
                } => {
                    // start tag
                    write!(writer, "<{name}")?;
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
                HtmlElement::Text { text } => {
                    let text = html_escape::encode_text(text);
                    for (idx, line) in text.lines().enumerate() {
                        if idx > 0 {
                            writeln!(writer)?;
                        }
                        write!(writer, "{}", line)?;
                    }
                    Ok(())
                }
            }
        }

        pub fn tag(name: &str, children: Vec<HtmlElement>) -> HtmlElement {
            HtmlElement::Tag {
                name: name.to_string(),
                attributes: vec![],
                children,
            }
        }

        pub fn tag_with_text(name: &str, text: &str) -> HtmlElement {
            HtmlElement::Tag {
                name: name.to_string(),
                attributes: vec![],
                children: vec![HtmlElement::Text {
                    text: text.to_string(),
                }],
            }
        }

        pub fn text(text: &str) -> HtmlElement {
            HtmlElement::Text {
                text: text.to_string(),
            }
        }
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
}

#[cfg(test)]
mod tests {
    use crate::templating;
    use templating::HtmlElement as HE;

    #[test]
    fn test_inline_code() {
        let input = HE::tag(
            "p",
            vec![
                HE::text("This is an example of "),
                HE::tag("code", vec![HE::text("inline code")]),
                HE::text(" in a paragraph."),
            ],
        );

        let output = input.write_to_string().unwrap();
        assert_eq!(
            output,
            "<p>This is an example of <code>inline code</code> in a paragraph.</p>"
        );
    }
}
