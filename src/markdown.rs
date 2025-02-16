use std::collections::HashMap;

use crate::{elements as e, syntax::SyntaxHighlighter};
use paxhtml::builder as b;

pub use markdown::mdast::Node;

pub struct MarkdownConverter<'a> {
    pub syntax: &'a SyntaxHighlighter,
    pub footnotes: HashMap<String, Vec<Node>>,
    pub without_blocking_elements: bool,
}
impl<'a> MarkdownConverter<'a> {
    pub fn new(syntax: &'a SyntaxHighlighter) -> Self {
        Self {
            syntax,
            footnotes: HashMap::new(),
            without_blocking_elements: false,
        }
    }

    /// Don't generate any elements that would otherwise cause a `<p>` to self-close;
    /// instead, just return their children.
    pub fn without_blocking_elements(mut self) -> Self {
        self.without_blocking_elements = true;
        self
    }

    pub fn convert(&mut self, node: &Node) -> paxhtml::Element {
        self.gather_footnote_definitions(node);

        match node {
            Node::Root(r) => {
                paxhtml::Element::from_iter(r.children.iter().map(|n| self.convert(n)))
            }

            Node::Heading(h) => {
                let children = self.convert_many(&h.children);
                if self.without_blocking_elements {
                    children
                } else {
                    e::h_with_id((h.depth + 2).min(6), true)(children)
                }
            }
            Node::Text(t) => b::text(&t.value),
            Node::Paragraph(p) => {
                let children = self.convert_many(&p.children);
                if self.without_blocking_elements {
                    children
                } else {
                    b::p([])(children)
                }
            }
            Node::Strong(s) => b::strong([])(self.convert_many(&s.children)),
            Node::Emphasis(e) => b::em([])(self.convert_many(&e.children)),
            Node::Delete(d) => b::s([])(self.convert_many(&d.children)),
            Node::List(l) => {
                let children = self.convert_many(&l.children);
                if l.ordered {
                    b::ol([])(children)
                } else {
                    b::ul([])(children)
                }
            }
            Node::ListItem(li) => {
                // hack: if we only have one paragraph as a child, drop the paragraph and use the
                // inner context instead. previously, this hack only applied to
                //      li(children:[paragraph(children:[content])])
                // to
                //      li(children:[content])
                // but I realised that this is a more general problem:
                //      li(children:[paragraph(children:[content]), ul(children:[...])])
                // should be
                //      li(children:[content, ul(children:[...])])
                let has_one_paragraph = li
                    .children
                    .iter()
                    .filter(|c| matches!(c, Node::Paragraph(_)))
                    .count()
                    == 1;
                if has_one_paragraph {
                    let mut children = Vec::new();
                    for child in &li.children {
                        if let Node::Paragraph(p) = child {
                            children.extend(p.children.iter().map(|n| self.convert(n)));
                        } else {
                            children.push(self.convert(child));
                        }
                    }
                    b::li([])(children)
                } else {
                    b::li([])(self.convert_many(&li.children))
                }
            }
            Node::Code(c) => b::pre([("class", "code").into()])(b::code([])([
                b::pre([("class", "code-language").into()])(
                    self.syntax.lookup_language(c.lang.as_deref()).name.as_str(),
                ),
                self.syntax
                    .highlight_code(c.lang.as_deref(), &c.value)
                    .unwrap(),
            ])),
            Node::BlockQuote(b) => {
                let children = self.convert_many(&b.children);
                if self.without_blocking_elements {
                    b::q([])(children)
                } else {
                    b::blockquote([])(children)
                }
            }
            Node::Break(_) => b::br([]),
            Node::InlineCode(c) => b::code([("class", "code").into()])(
                self.syntax.highlight_code(None, &c.value).unwrap(),
            ),
            Node::Image(i) => b::a([("href", i.url.clone()).into()])(b::img([
                ("src", i.url.clone()).into(),
                ("alt", i.alt.clone()).into(),
            ])),
            Node::Link(l) => {
                let mut attrs = vec![("href", l.url.clone()).into()];
                if let Some(title) = &l.title {
                    attrs.push(("title", title.clone()).into());
                }

                b::a(attrs)(paxhtml::Element::from_iter(
                    l.children.iter().map(|n| self.convert(n)),
                ))
            }
            Node::Html(h) => {
                // HACK: Strip comments from Markdown HTML. This won't work if the comment is closed
                // in the middle of the string and actual content follows, but it's good enough for now.
                if h.value.starts_with("<!--") && h.value.ends_with("-->") {
                    return paxhtml::Element::Empty;
                }

                paxhtml::Element::Raw {
                    html: h.value.clone(),
                }
            }
            Node::FootnoteReference(r) => {
                let definition = self
                    .footnotes
                    .get(&r.identifier)
                    .unwrap_or_else(|| panic!("Footnote definition for {} not found", r.identifier))
                    .clone();

                let id = format!("footnote-{}", r.identifier);
                paxhtml::Element::from_iter([
                    b::input([
                        ("type", "checkbox").into(),
                        ("id", id.clone()).into(),
                        ("class", "footnote-checkbox").into(),
                        ("autocomplete", "off").into(),
                    ]),
                    b::label([("for", id.clone()).into()])(b::sup([
                        ("class", "footnote-number").into()
                    ])(
                        r.identifier.to_string()
                    )),
                    b::span([])(
                        MarkdownConverter::new(self.syntax)
                            .without_blocking_elements()
                            .convert_many(&definition),
                    ),
                ])
            }

            // Not supported yet
            Node::FootnoteDefinition(_)
            | Node::InlineMath(_)
            | Node::ImageReference(_)
            | Node::LinkReference(_)
            | Node::Math(_)
            | Node::Table(_)
            | Node::ThematicBreak(_)
            | Node::TableRow(_)
            | Node::TableCell(_)
            | Node::Definition(_) => paxhtml::Element::Empty,

            // Never supported
            Node::Toml(_)
            | Node::Yaml(_)
            | Node::MdxJsxFlowElement(_)
            | Node::MdxjsEsm(_)
            | Node::MdxTextExpression(_)
            | Node::MdxJsxTextElement(_)
            | Node::MdxFlowExpression(_) => paxhtml::Element::Empty,
        }
    }

    fn convert_many(&mut self, nodes: &[Node]) -> paxhtml::Element {
        paxhtml::Element::from_iter(nodes.iter().map(|n| self.convert(n)))
    }

    /// We use a pre-pass to gather footnote definitions, so that we can render them in the correct
    /// context.
    fn gather_footnote_definitions(&mut self, node: &Node) {
        if let Node::FootnoteDefinition(f) = node {
            self.footnotes
                .insert(f.identifier.clone(), f.children.clone());
        }

        if let Some(children) = node.children() {
            for child in children {
                self.gather_footnote_definitions(child);
            }
        }
    }
}

pub fn inner_text(node: &Node, ignore_node: Option<fn(&Node) -> bool>) -> String {
    if let Some(ignore_node) = ignore_node {
        if ignore_node(node) {
            return String::new();
        }
    }

    if let Node::Text(text) = node {
        text.value.clone()
    } else if let Node::InlineCode(code) = node {
        code.value.clone()
    } else {
        let mut output: String = node
            .children()
            .map(|c| c.iter().map(|n| inner_text(n, ignore_node)).collect())
            .unwrap_or_default();
        if matches!(
            node,
            Node::Paragraph(_) | Node::Heading(_) | Node::BlockQuote(_)
        ) {
            output.push('\n');
        }
        output
    }
}

#[derive(Debug, PartialEq, Clone)]
pub struct HeadingHierarchy {
    pub heading: paxhtml::Element,
    pub heading_text: String,
    pub children: Vec<HeadingHierarchy>,
}
impl HeadingHierarchy {
    pub fn new(
        heading: impl Into<paxhtml::Element>,
        heading_text: impl Into<String>,
        children: impl IntoIterator<Item = HeadingHierarchy>,
    ) -> Self {
        Self {
            heading: heading.into(),
            heading_text: heading_text.into(),
            children: children.into_iter().collect(),
        }
    }
    pub fn from_node(syntax: &SyntaxHighlighter, node: &Node) -> Vec<HeadingHierarchy> {
        let mut headings = Vec::new();
        collect_headings(syntax, node, &mut headings);

        let mut result = Vec::new();
        let mut stack: Vec<(u8, HeadingHierarchy)> = Vec::new();

        for (depth, heading, heading_text) in headings {
            while let Some((prev_depth, _)) = stack.last() {
                if *prev_depth >= depth {
                    let (_prev_depth, finished_heading) = stack.pop().unwrap();
                    if let Some((_, parent_heading)) = stack.last_mut() {
                        parent_heading.children.push(finished_heading);
                    } else {
                        // If there's no parent, this is a root-level heading
                        result.push(finished_heading);
                    }
                } else {
                    break;
                }
            }
            stack.push((depth, HeadingHierarchy::new(heading, heading_text, [])));
        }

        // Clear any remaining headings in the stack
        while let Some((_, finished_heading)) = stack.pop() {
            if let Some((_, parent_heading)) = stack.last_mut() {
                parent_heading.children.push(finished_heading);
            } else {
                result.push(finished_heading);
            }
        }

        fn collect_headings(
            syntax: &SyntaxHighlighter,
            node: &Node,
            headings: &mut Vec<(u8, paxhtml::Element, String)>,
        ) {
            if let Some(children) = node.children() {
                for child in children {
                    if let Node::Heading(heading) = child {
                        headings.push((
                            heading.depth,
                            MarkdownConverter::new(syntax)
                                .without_blocking_elements()
                                .convert(child),
                            inner_text(child, None).trim().to_string(),
                        ));
                    }
                    collect_headings(syntax, child, headings); // Recurse into all children
                }
            }
        }

        result
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::content::parse_markdown;

    #[test]
    fn test_heading_hierarchy() {
        use HeadingHierarchy as HH;

        let input = r#"
# test
## test123
### test456
## test789
# test2
"#
        .trim();

        let ast = parse_markdown(input);
        let syntax = SyntaxHighlighter::default();

        fn hh(heading: impl Into<String>, children: impl IntoIterator<Item = HH>) -> HH {
            let heading = heading.into();
            HH::new(heading.clone(), heading, children)
        }

        assert_eq!(
            HH::from_node(&syntax, &ast),
            vec![
                hh(
                    "test",
                    [hh("test123", [hh("test456", [])]), hh("test789", []),],
                ),
                hh("test2", []),
            ]
        )
    }
}
