use paxhtml::builder as b;

pub use markdown::mdast::Node;

pub fn convert_to_html(node: &Node) -> Vec<paxhtml::Element> {
    use b::Empty;
    match node {
        Node::Root(r) => r.children.iter().flat_map(convert_to_html).collect(),

        Node::Heading(h) => {
            vec![b::h((h.depth + 2).min(6), true, convert_many(&h.children))]
        }
        Node::Text(t) => {
            vec![b::text(t.value.as_str())]
        }
        Node::Paragraph(p) => {
            vec![b::p(Empty)(convert_many(&p.children))]
        }
        Node::Strong(s) => {
            vec![b::strong(Empty)(convert_many(&s.children))]
        }
        Node::Emphasis(e) => {
            vec![b::em(Empty)(convert_many(&e.children))]
        }
        Node::List(l) => {
            let children = convert_many(&l.children);
            vec![if l.ordered {
                b::ol(Empty)(children)
            } else {
                b::ul(Empty)(children)
            }]
        }
        Node::ListItem(li) => {
            // hack: if the only child of this list item is a paragraph, drop the paragraph
            // and use the raw content instead
            if li.children.len() == 1 {
                if let Node::Paragraph(p) = &li.children[0] {
                    return vec![b::li(Empty)(convert_many(&p.children))];
                }
            }

            vec![b::li(Empty)(convert_many(&li.children))]
        }
        Node::Code(c) => {
            vec![b::pre(Empty)(b::code(Empty)(c.value.as_str()))]
        }
        Node::BlockQuote(b) => {
            vec![b::blockquote(Empty)(convert_many(&b.children))]
        }
        Node::Break(_) => {
            vec![b::br(Empty)]
        }
        Node::InlineCode(c) => {
            vec![b::code(Empty)(c.value.as_str())]
        }
        Node::Image(i) => {
            vec![b::img(&i.url, &i.alt)]
        }
        Node::Link(l) => {
            vec![b::a(
                &l.url,
                l.title.as_deref(),
                l.children
                    .iter()
                    .flat_map(convert_to_html)
                    .collect::<Vec<_>>(),
            )]
        }
        Node::Html(h) => vec![paxhtml::Element::Raw {
            html: h.value.clone(),
        }],

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
        | Node::Definition(_) => {
            vec![]
        }

        // Never supported
        Node::Toml(_)
        | Node::Yaml(_)
        | Node::MdxJsxFlowElement(_)
        | Node::MdxjsEsm(_)
        | Node::MdxTextExpression(_)
        | Node::MdxJsxTextElement(_)
        | Node::MdxFlowExpression(_) => {
            vec![]
        }
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

fn convert_many(nodes: &[Node]) -> Vec<paxhtml::Element> {
    nodes.iter().flat_map(convert_to_html).collect()
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
                        HeadingHierarchy("test789".into(), vec![])
                    ]
                ),
                HeadingHierarchy("test2".into(), vec![])
            ]
        )
    }
}
