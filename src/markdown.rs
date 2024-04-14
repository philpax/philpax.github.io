use crate::html::{self, builder as b};

pub use markdown::mdast::Node;

pub fn convert_to_html(node: &Node) -> Vec<html::Element> {
    match node {
        Node::Root(r) => r.children.iter().flat_map(convert_to_html).collect(),

        Node::Heading(h) => {
            vec![tag(&format!("h{}", (h.depth + 2).min(6)), &h.children)]
        }
        Node::Text(t) => {
            vec![b::text(t.value.to_string())]
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
            vec![b::pre([], [b::code([], [b::text(&c.value)])])]
        }
        Node::BlockQuote(b) => {
            vec![tag("blockquote", &b.children)]
        }
        Node::Break(_) => {
            vec![b::br()]
        }
        Node::InlineCode(c) => {
            vec![b::tag_with_text("code", [], &c.value)]
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

fn tag(name: &str, children: &[Node]) -> html::Element {
    b::tag(
        name,
        [],
        children
            .iter()
            .flat_map(convert_to_html)
            .collect::<Vec<_>>(),
    )
}
