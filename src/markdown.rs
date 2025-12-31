use std::collections::HashMap;

use paxhtml::bumpalo::Bump;
use paxhtml::builder::Builder;

use crate::{
    elements as e,
    views::{
        components::{self, Footnote, FootnoteProps, Link, LinkProps},
        ViewContext,
    },
};

pub use markdown::mdast::Node;

pub struct MarkdownConverter<'bump, 'a> {
    pub bump: &'bump Bump,
    pub context: ViewContext<'a>,
    pub footnotes: HashMap<String, Vec<Node>>,
    pub without_blocking_elements: bool,
    pub footnote_counter: HashMap<String, usize>,
    pub next_footnote_number: usize,
    pub sidenotes_enabled: bool,
}
impl<'bump, 'a> MarkdownConverter<'bump, 'a> {
    pub fn new(bump: &'bump Bump, context: ViewContext<'a>) -> Self {
        Self {
            bump,
            context,
            footnotes: HashMap::new(),
            without_blocking_elements: false,
            footnote_counter: HashMap::new(),
            next_footnote_number: 1,
            sidenotes_enabled: false,
        }
    }

    /// Don't generate any elements that would otherwise cause a `<p>` to self-close;
    /// instead, just return their children.
    pub fn without_blocking_elements(mut self) -> Self {
        self.without_blocking_elements = true;
        self
    }

    /// Enable sidenotes for footnotes on wide screens (2xl+).
    /// Only use this for full article pages (blog, updates, notes).
    pub fn with_sidenotes(mut self) -> Self {
        self.sidenotes_enabled = true;
        self
    }

    pub fn convert(&mut self, node: &Node, parent_node: Option<&Node>) -> paxhtml::Element<'bump> {
        let bump = self.bump;
        let b = Builder::new(bump);

        // Only gather footnotes at the root level (when there's no parent)
        if parent_node.is_none() {
            self.gather_footnote_definitions(node);
        }

        match node {
            Node::Root(r) => b.fragment(r.children.iter().map(|n| self.convert(n, Some(node)))),

            Node::Heading(h) => {
                let children = self.convert_many(&h.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    let resolved_depth = (h.depth + 2).min(6);
                    let class = match resolved_depth {
                        3 => "text-lg font-bold",
                        4 => "text-base font-bold",
                        5 => "text-sm font-bold",
                        6 => "text-xs font-bold",
                        value => panic!("Heading depth {value} is not supported"),
                    };

                    e::h_with_id(bump, resolved_depth, class, true, children)
                }
            }
            Node::Text(t) => b.text(&t.value),
            Node::Paragraph(p) => {
                let children = self.convert_many(&p.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    b.p([])(children)
                }
            }
            Node::Strong(s) => b.strong([])(self.convert_many(&s.children, Some(node))),
            Node::Emphasis(em) => b.em([])(self.convert_many(&em.children, Some(node))),
            Node::Delete(d) => b.s([])(self.convert_many(&d.children, Some(node))),
            Node::List(l) => {
                let children = self.convert_many(&l.children, Some(node));
                if l.ordered {
                    b.ol([b.attr(("class", "list-decimal pl-8"))])(children)
                } else {
                    b.ul([b.attr(("class", "list-disc pl-8"))])(children)
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

                let class = b.attr(("class", "*:mb-2 [&>*:last-child]:mb-0 mb-1"));
                if has_one_paragraph {
                    let mut children = Vec::new();
                    for child in &li.children {
                        if let Node::Paragraph(p) = child {
                            children.extend(p.children.iter().map(|n| self.convert(n, Some(node))));
                        } else {
                            children.push(self.convert(child, Some(node)));
                        }
                    }
                    b.li([class])(b.fragment(children))
                } else {
                    b.li([class])(self.convert_many(&li.children, Some(node)))
                }
            }
            Node::Code(c) => {
                components::code(bump, self.context.syntax, c.lang.as_deref(), &c.value)
            }
            Node::Blockquote(bq) => {
                let children = self.convert_many(&bq.children, Some(node));
                if self.without_blocking_elements {
                    b.q([])(children)
                } else {
                    b.blockquote([])(children)
                }
            }
            Node::Break(_) => b.br([]),
            Node::InlineCode(c) => {
                let (lang, code) = self.context.syntax.parse_inline_code(&c.value);
                components::inline_code(
                    bump,
                    self.context.syntax,
                    !matches!(parent_node, Some(Node::Heading(_))),
                    lang,
                    code,
                )
            }
            Node::Image(i) => {
                // Check if the URL ends with a video extension
                let is_video = i.url.to_lowercase().ends_with(".mp4")
                    || i.url.to_lowercase().ends_with(".webm")
                    || i.url.to_lowercase().ends_with(".mov")
                    || i.url.to_lowercase().ends_with(".avi")
                    || i.url.to_lowercase().ends_with(".mkv")
                    || i.url.to_lowercase().ends_with(".ogv");

                if is_video {
                    b.video([
                        b.attr(("src", i.url.clone())),
                        b.attr(("controls", "true")),
                        b.attr(("loop", "true")),
                        b.attr((
                            "class",
                            "border-2 border-(--color) max-w-(--centered-content-width) mx-auto block",
                        )),
                    ])(paxhtml::Element::Empty)
                } else {
                    b.a([b.attr(("href", i.url.clone()))])(b.img([
                        b.attr(("src", i.url.clone())),
                        b.attr(("alt", i.alt.clone())),
                        b.attr((
                            "class",
                            "border-2 border-(--color) max-w-(--centered-content-width) mx-auto block",
                        )),
                    ]))
                }
            }
            Node::Link(l) => paxhtml::html! { in bump;
                <Link underline target={l.url.clone()}>
                    #{l.children.iter().map(|n| self.convert(n, Some(node)))}
                </Link>
            },
            Node::Html(h) => {
                // HACK: Strip comments from Markdown HTML. This won't work if the comment is closed
                // in the middle of the string and actual content follows, but it's good enough for now.
                if h.value.starts_with("<!--") && h.value.ends_with("-->") {
                    return paxhtml::Element::Empty;
                }

                let element = paxhtml::parse_html(bump, &h.value).expect("failed to parse HTML"); // todo: make this a fallible result
                if element.tag() == Some("MusicLibrary") {
                    return components::music_library(bump, self.context);
                }

                element
            }
            Node::FootnoteReference(r) => {
                let definition = self
                    .footnotes
                    .get(&r.identifier)
                    .unwrap_or_else(|| panic!("Footnote definition for {} not found", r.identifier))
                    .clone();

                // Assign a numeric counter to this footnote reference
                let footnote_number = self
                    .footnote_counter
                    .entry(r.identifier.clone())
                    .or_insert_with(|| {
                        let number = self.next_footnote_number;
                        self.next_footnote_number += 1;
                        number
                    });

                let children = vec![MarkdownConverter::new(bump, self.context)
                    .without_blocking_elements()
                    .convert_many(&definition, None)];

                let sidenotes_enabled = self.sidenotes_enabled;
                paxhtml::html! { in bump;
                    <Footnote identifier={footnote_number.to_string()} sidenotes_enabled={sidenotes_enabled}>
                        #{children}
                    </Footnote>
                }
            }

            // Table
            Node::Table(t) => {
                let children = self.convert_many(&t.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    b.table([b.attr(("class", "w-full border-collapse border border-[var(--color-secondary)] rounded-lg overflow-hidden"))])(children)
                }
            }
            Node::TableRow(t) => {
                let children = self.convert_many(&t.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    b.tr([b.attr(("class", "border-b border-[var(--color-secondary)]"))])(children)
                }
            }
            Node::TableCell(t) => {
                let children = self.convert_many(&t.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    b.td([b.attr(("class", "px-4 py-3 text-sm text-[var(--text-color)] border-r border-[var(--color-secondary)] last:border-r-0"))])(children)
                }
            }

            // Handled elsewhere
            Node::FootnoteDefinition(_) => paxhtml::Element::Empty,

            // Not supported yet
            Node::InlineMath(_)
            | Node::ImageReference(_)
            | Node::LinkReference(_)
            | Node::Math(_)
            | Node::ThematicBreak(_)
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

    fn convert_many(
        &mut self,
        nodes: &[Node],
        parent_node: Option<&Node>,
    ) -> paxhtml::Element<'bump> {
        let b = paxhtml::builder::Builder::new(self.bump);
        b.fragment(nodes.iter().map(|n| self.convert(n, parent_node)))
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
            Node::Paragraph(_) | Node::Heading(_) | Node::Blockquote(_)
        ) {
            output.push('\n');
        }
        output
    }
}

#[derive(Debug, PartialEq, Clone)]
pub struct HeadingHierarchy<'bump> {
    pub heading: paxhtml::Element<'bump>,
    pub heading_text: String,
    pub children: Vec<HeadingHierarchy<'bump>>,
}
impl<'bump> HeadingHierarchy<'bump> {
    pub fn new(
        heading: paxhtml::Element<'bump>,
        heading_text: impl Into<String>,
        children: impl IntoIterator<Item = HeadingHierarchy<'bump>>,
    ) -> Self {
        Self {
            heading,
            heading_text: heading_text.into(),
            children: children.into_iter().collect(),
        }
    }
    pub fn from_node(
        bump: &'bump Bump,
        context: ViewContext,
        node: &Node,
    ) -> Vec<HeadingHierarchy<'bump>> {
        let mut headings = Vec::new();
        collect_headings(bump, context, node, &mut headings);

        let mut result = Vec::new();
        let mut stack: Vec<(u8, HeadingHierarchy<'bump>)> = Vec::new();

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

        fn collect_headings<'bump>(
            bump: &'bump Bump,
            context: ViewContext,
            node: &Node,
            headings: &mut Vec<(u8, paxhtml::Element<'bump>, String)>,
        ) {
            if let Some(children) = node.children() {
                for child in children {
                    if let Node::Heading(heading) = child {
                        headings.push((
                            heading.depth,
                            MarkdownConverter::new(bump, context)
                                .without_blocking_elements()
                                .convert(child, Some(child)),
                            inner_text(child, None).trim().to_string(),
                        ));
                    }
                    collect_headings(bump, context, child, headings); // Recurse into all children
                }
            }
        }

        result
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        content::{parse_markdown, Content},
        syntax::SyntaxHighlighter,
    };

    fn view_context_for_syntax_highlighter<'a>(
        syntax: &'a SyntaxHighlighter,
        content: &'a Content,
    ) -> ViewContext<'a> {
        ViewContext {
            website_author: "test",
            website_name: "test",
            website_description: "test",
            website_base_url: "test",
            syntax,
            content,
            generation_date: chrono::Utc::now(),
            fast: false,
        }
    }

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
        let content = Content::empty();
        let context = view_context_for_syntax_highlighter(&syntax, &content);
        let bump = Bump::new();

        fn hh<'bump>(
            bump: &'bump Bump,
            heading: &str,
            children: impl IntoIterator<Item = HH<'bump>>,
        ) -> HH<'bump> {
            HH::new(
                Builder::new(bump).text(heading),
                heading.to_string(),
                children,
            )
        }

        let result = HH::from_node(&bump, context, &ast);
        let expected = vec![
            hh(
                &bump,
                "test",
                [
                    hh(&bump, "test123", [hh(&bump, "test456", [])]),
                    hh(&bump, "test789", []),
                ],
            ),
            hh(&bump, "test2", []),
        ];
        assert_eq!(result, expected);
    }

    #[test]
    fn test_footnote_numbering() {
        let input = r#"
Here is some text with a footnote[^note1] and another[^note2].

[^note1]: This is the first footnote.
[^note2]: This is the second footnote.
"#;

        let ast = parse_markdown(input);
        let syntax = SyntaxHighlighter::default();
        let content = Content::empty();
        let context = view_context_for_syntax_highlighter(&syntax, &content);
        let bump = Bump::new();
        let mut converter = MarkdownConverter::new(&bump, context);

        let result = converter.convert(&ast, None);
        let html = paxhtml::Document::new(&bump, [result])
            .write_to_string()
            .unwrap();

        // Check that footnote references use numeric counters
        assert!(html.contains("footnote-1"));
        assert!(html.contains("footnote-2"));
        assert!(!html.contains("footnote-note1"));
        assert!(!html.contains("footnote-note2"));

        // Check that the footnote numbers are displayed correctly
        assert!(html.contains(">1<"));
        assert!(html.contains(">2<"));
    }
}
