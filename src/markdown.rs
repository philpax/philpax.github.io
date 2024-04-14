use crate::html::{self, builder as b};

pub use markdown::mdast::Node;

pub fn convert_to_html(node: &Node) -> Vec<html::Element> {
    match node {
        Node::Root(r) => r.children.iter().flat_map(convert_to_html).collect(),

        Node::Heading(h) => {
            vec![b::h((h.depth + 2).min(6), true, convert_many(&h.children))]
        }
        Node::Text(t) => {
            vec![b::text(t.value.to_string())]
        }
        Node::Paragraph(p) => {
            vec![b::p(convert_many(&p.children))]
        }
        Node::Strong(s) => {
            vec![b::strong(convert_many(&s.children))]
        }
        Node::Emphasis(e) => {
            vec![b::em(convert_many(&e.children))]
        }
        Node::List(l) => {
            let children = convert_many(&l.children);
            vec![if l.ordered {
                b::ol(children)
            } else {
                b::ul(children)
            }]
        }
        Node::ListItem(li) => {
            // hack: if the only child of this list item is a paragraph, drop the paragraph
            // and use the raw content instead
            if li.children.len() == 1 {
                if let Node::Paragraph(p) = &li.children[0] {
                    return vec![b::li(convert_many(&p.children))];
                }
            }

            vec![b::li(convert_many(&li.children))]
        }
        Node::Code(c) => {
            vec![b::pre(b::code(b::text(&c.value)))]
        }
        Node::BlockQuote(b) => {
            vec![b::blockquote(convert_many(&b.children))]
        }
        Node::Break(_) => {
            vec![b::br()]
        }
        Node::InlineCode(c) => {
            vec![b::code(b::text(&c.value))]
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
        Node::Html(h) => vec![html::Element::Raw {
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

fn convert_many(nodes: &[Node]) -> Vec<html::Element> {
    nodes.iter().flat_map(convert_to_html).collect()
}
