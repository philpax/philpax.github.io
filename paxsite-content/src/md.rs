//! Shared markdown helpers. These live in the content layer so that both the
//! site generator and the CLI derive plain text the same way (no desync).

use markdown::mdast::Node;

/// Parses markdown into an mdast tree using GFM options.
pub fn parse_markdown(md: &str) -> Node {
    markdown::to_mdast(md, &markdown::ParseOptions::gfm()).unwrap_or_else(|_| {
        Node::Root(markdown::mdast::Root {
            children: Vec::new(),
            position: None,
        })
    })
}

/// Renders a markdown document to plain text — the canonical operation used for
/// `site.standard.document` `textContent`. Code blocks (which carry no child
/// text nodes) and the structural nodes naturally collapse to their text.
pub fn markdown_to_plaintext(md: &str) -> String {
    inner_text(&parse_markdown(md), None).trim().to_string()
}

/// Recursively collects the text content of an mdast node. `ignore_node`, when
/// provided, prunes matching subtrees (e.g. footnote definitions).
pub fn inner_text(node: &Node, ignore_node: Option<fn(&Node) -> bool>) -> String {
    if let Some(ignore_node) = ignore_node
        && ignore_node(node)
    {
        return String::new();
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
            Node::Paragraph(_) | Node::Heading(_) | Node::Blockquote(_)
        ) {
            output.push('\n');
        }
        output
    }
}
