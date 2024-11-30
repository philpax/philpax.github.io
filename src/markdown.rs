use crate::{elements as e, syntax::SyntaxHighlighter};
use paxhtml::builder as b;

pub use markdown::mdast::Node;

pub fn convert_to_html(syntax: &SyntaxHighlighter, node: &Node) -> Vec<paxhtml::Element> {
    match node {
        Node::Root(r) => r
            .children
            .iter()
            .flat_map(|n| convert_to_html(syntax, n))
            .collect(),

        Node::Heading(h) => {
            vec![e::h_with_id((h.depth + 2).min(6), true)(convert_many(
                syntax,
                &h.children,
            ))]
        }
        Node::Text(t) => {
            vec![b::text(&t.value)]
        }
        Node::Paragraph(p) => {
            vec![b::p([])(convert_many(syntax, &p.children))]
        }
        Node::Strong(s) => {
            vec![b::strong([])(convert_many(syntax, &s.children))]
        }
        Node::Emphasis(e) => {
            vec![b::em([])(convert_many(syntax, &e.children))]
        }
        Node::List(l) => {
            let children = convert_many(syntax, &l.children);
            vec![if l.ordered {
                b::ol([])(children)
            } else {
                b::ul([])(children)
            }]
        }
        Node::ListItem(li) => {
            // hack: if the only child of this list item is a paragraph, drop the paragraph
            // and use the raw content instead
            if li.children.len() == 1 {
                if let Node::Paragraph(p) = &li.children[0] {
                    return vec![b::li([])(convert_many(syntax, &p.children))];
                }
            }

            vec![b::li([])(convert_many(syntax, &li.children))]
        }
        Node::Code(c) => {
            vec![b::pre([("class", "code").into()])(b::code([])(
                syntax.highlight_code(c.lang.as_deref(), &c.value).unwrap(),
            ))]
        }
        Node::BlockQuote(b) => {
            vec![b::blockquote([])(convert_many(syntax, &b.children))]
        }
        Node::Break(_) => {
            vec![b::br([])]
        }
        Node::InlineCode(c) => {
            vec![b::code([("class", "code").into()])(
                syntax.highlight_code(None, &c.value).unwrap(),
            )]
        }
        Node::Image(i) => {
            vec![b::img([
                ("src", i.url.clone()).into(),
                ("alt", i.alt.clone()).into(),
            ])]
        }
        Node::Link(l) => {
            let mut attrs = vec![("href", l.url.clone()).into()];
            if let Some(title) = &l.title {
                attrs.push(("title", title.clone()).into());
            }

            vec![b::a(attrs)(
                l.children
                    .iter()
                    .flat_map(|n| convert_to_html(syntax, n))
                    .collect::<Vec<_>>(),
            )]
        }
        Node::Html(h) => {
            // HACK: Strip comments from Markdown HTML. This won't work if the comment is closed
            // in the middle of the string and actual content follows, but it's good enough for now.
            if h.value.starts_with("<!--") && h.value.ends_with("-->") {
                return vec![];
            }

            vec![paxhtml::Element::Raw {
                html: h.value.clone(),
            }]
        }

        // Not supported yet
        Node::FootnoteDefinition(_)
        | Node::InlineMath(_)
        | Node::Delete(_)
        | Node::FootnoteReference(_)
        | Node::ImageReference(_)
        | Node::LinkReference(_)
        | Node::Math(_)
        | Node::Table(_)
        | Node::ThematicBreak(_)
        | Node::TableRow(_)
        | Node::TableCell(_)
        | Node::Definition(_) => vec![],

        // Never supported
        Node::Toml(_)
        | Node::Yaml(_)
        | Node::MdxJsxFlowElement(_)
        | Node::MdxjsEsm(_)
        | Node::MdxTextExpression(_)
        | Node::MdxJsxTextElement(_)
        | Node::MdxFlowExpression(_) => vec![],
    }
}
#[derive(Debug, PartialEq, Clone)]
pub struct HeadingHierarchy(pub String, pub Vec<HeadingHierarchy>);

pub fn heading_hierarchy(node: &Node) -> Vec<HeadingHierarchy> {
    let mut headings = Vec::new();
    collect_headings(node, &mut headings);

    let mut result = Vec::new();
    let mut stack: Vec<(u8, HeadingHierarchy)> = Vec::new();

    for (depth, text) in headings {
        while let Some((prev_depth, _)) = stack.last() {
            if *prev_depth >= depth {
                let (_prev_depth, finished_heading) = stack.pop().unwrap();
                if let Some((_, parent_heading)) = stack.last_mut() {
                    parent_heading.1.push(finished_heading);
                } else {
                    // If there's no parent, this is a root-level heading
                    result.push(finished_heading);
                }
            } else {
                break;
            }
        }
        stack.push((depth, HeadingHierarchy(text, Vec::new())));
    }

    // Clear any remaining headings in the stack
    while let Some((_, finished_heading)) = stack.pop() {
        if let Some((_, parent_heading)) = stack.last_mut() {
            parent_heading.1.push(finished_heading);
        } else {
            result.push(finished_heading);
        }
    }

    fn collect_headings(node: &Node, headings: &mut Vec<(u8, String)>) {
        if let Some(children) = node.children() {
            for child in children {
                if let Node::Heading(heading) = child {
                    headings.push((heading.depth, inner_text(child)));
                }
                collect_headings(child, headings); // Recurse into all children
            }
        }
    }

    result
}

fn inner_text(node: &Node) -> String {
    if let Node::Text(text) = node {
        text.value.clone()
    } else {
        node.children()
            .map(|c| c.iter().map(inner_text).collect())
            .unwrap_or_default()
    }
}

fn convert_many(syntax: &SyntaxHighlighter, nodes: &[Node]) -> Vec<paxhtml::Element> {
    nodes
        .iter()
        .flat_map(|n| convert_to_html(syntax, n))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::content::parse_markdown;

    #[test]
    fn test_heading_hierarchy() {
        let input = r#"
# test
## test123
### test456
## test789
# test2
"#
        .trim();

        let ast = parse_markdown(input);

        assert_eq!(
            heading_hierarchy(&ast),
            vec![
                HeadingHierarchy(
                    "test".into(),
                    vec![
                        HeadingHierarchy(
                            "test123".into(),
                            vec![HeadingHierarchy("test456".into(), vec![])]
                        ),
                        HeadingHierarchy("test789".into(), vec![]),
                    ],
                ),
                HeadingHierarchy("test2".into(), vec![]),
            ]
        )
    }
}
