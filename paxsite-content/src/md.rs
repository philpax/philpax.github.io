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

/// The first sentence of the opening top-level paragraph, or the whole paragraph
/// if it has no full stop. The result is plain text with normalized whitespace.
pub fn note_excerpt(description: &Node) -> Option<String> {
    let paragraph = description
        .children()?
        .iter()
        .find(|node| matches!(node, Node::Paragraph(_)))?;
    let text = inner_text(paragraph, None);
    let text = text.split_whitespace().collect::<Vec<_>>().join(" ");
    if text.is_empty() {
        return None;
    }
    let end = text
        .char_indices()
        .find_map(|(index, character)| {
            (character == '.'
                && text[index + 1..]
                    .chars()
                    .next()
                    .is_none_or(char::is_whitespace))
            .then_some(index + 1)
        })
        .unwrap_or(text.len());
    Some(text[..end].to_string())
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
    } else if matches!(node, Node::Break(_)) {
        "\n".to_string()
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
        // Blank line before headings so sections read as separate.
        if matches!(node, Node::Heading(_)) {
            output.insert(0, '\n');
        }
        output
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn note_excerpts_use_the_first_sentence_or_whole_first_paragraph() {
        for (markdown, expected) in [
            (
                "First sentence. Second sentence.\n\nAnother paragraph.",
                Some("First sentence."),
            ),
            (
                "A paragraph without a full stop\ncontinues here\n\nAnother paragraph.",
                Some("A paragraph without a full stop continues here"),
            ),
            (
                "[blackbird](https://github.com/philpax/blackbird) is a **music player**. More.",
                Some("blackbird is a music player."),
            ),
            (
                "genresin.space and llama.cpp are names. Another sentence.",
                Some("genresin.space and llama.cpp are names."),
            ),
            ("Café < & music. Second sentence.", Some("Café < & music.")),
            (
                "First line  \ncontinues here. Second sentence.",
                Some("First line continues here."),
            ),
            (
                "First line\\\ncontinues here. Second sentence.",
                Some("First line continues here."),
            ),
            (
                "# Heading\n\nThe introduction. More.",
                Some("The introduction."),
            ),
            ("- A nested paragraph.", None),
            ("# Heading only", None),
            ("", None),
        ] {
            assert_eq!(
                note_excerpt(&parse_markdown(markdown)).as_deref(),
                expected,
                "{markdown}"
            );
        }
    }

    #[test]
    fn hard_line_breaks_separate_words() {
        for source in [
            "First line  \ncontinues here.",
            "First line\\\ncontinues here.",
        ] {
            assert_eq!(markdown_to_plaintext(source), "First line\ncontinues here.");
        }
    }
}
