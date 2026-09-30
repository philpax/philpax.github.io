use std::{
    collections::{HashMap, HashSet},
    path::{Path, PathBuf},
};

use paxhtml::builder::Builder;

use crate::{
    content::{Content, Document},
    views::{
        ViewContext,
        components::{self, PrEntry, destination_class, pr_id_from_url, tl_id_from_url},
    },
};

pub use markdown::mdast::Node;

pub struct MarkdownConverter<'a> {
    pub context: ViewContext<'a>,
    pub footnotes: HashMap<String, Vec<Node>>,
    pub without_blocking_elements: bool,
    pub strip_links: bool,
    pub footnote_counter: HashMap<String, usize>,
    pub next_footnote_number: usize,
    pub error_context: String,
    pub source_path: Option<PathBuf>,
    pub document_base_url: Option<String>,
    pub website_base_url: Option<String>,
    pub pr_entries: Vec<PrEntry>,
}
impl<'a> MarkdownConverter<'a> {
    pub fn new(context: ViewContext<'a>, error_context: impl Into<String>) -> Self {
        Self {
            context,
            footnotes: HashMap::new(),
            without_blocking_elements: false,
            strip_links: false,
            footnote_counter: HashMap::new(),
            next_footnote_number: 1,
            error_context: error_context.into(),
            source_path: None,
            document_base_url: None,
            website_base_url: None,
            pr_entries: Vec::new(),
        }
    }

    /// Provide a pre-collected list of PR entries (used to render `<PrTimeline />`).
    pub fn with_pr_entries(mut self, entries: Vec<PrEntry>) -> Self {
        self.pr_entries = entries;
        self
    }

    /// Set the source path of the document being converted, enabling resolution of
    /// relative `.md` links to their output URLs.
    pub fn with_source_path(mut self, path: PathBuf) -> Self {
        self.source_path = Some(path);
        self
    }

    /// Set the document's base URL (e.g. `/updates/the-big-claude-down/`), so that
    /// relative URLs in images and links resolve against the document rather than the
    /// page being rendered. Required when rendering a document's content on a page that
    /// isn't the document's own URL (e.g. index views).
    pub fn with_document_base_url(mut self, url: impl Into<String>) -> Self {
        self.document_base_url = Some(url.into());
        self
    }

    /// Set the website's base URL (e.g. `https://philpax.me`). When set, site-absolute
    /// paths like `/og-images/foo.png` are rewritten to fully-absolute URLs, and
    /// relative URLs are also rooted against the website. Used for RSS, where feed
    /// readers don't share a site context.
    pub fn with_website_base_url(mut self, url: impl Into<String>) -> Self {
        self.website_base_url = Some(url.into());
        self
    }

    /// Don't generate any elements that would otherwise cause a `<p>` to self-close;
    /// instead, just return their children.
    pub fn without_blocking_elements(mut self) -> Self {
        self.without_blocking_elements = true;
        self
    }

    /// Strip links, rendering only their text content.
    /// Useful for TOC generation where nested links are invalid.
    pub fn strip_links(mut self) -> Self {
        self.strip_links = true;
        self
    }

    /// Render a document body as the site's blocks: each run of authored
    /// content is a `.prose` block, and each block-level component
    /// (`<PrTimeline />`, `<BlueskyPost />`, `<MusicLibrary />`, `<CityPoster>`)
    /// sits beside them rather than inside one, so that nothing styled for
    /// prose ever reaches a component. `<NotesIndex />` renders nothing: the
    /// notes rail is the index.
    pub fn convert_blocks(&mut self, root: &Node) -> paxhtml::Element<'a> {
        let b = Builder::new(self.context.bump);

        // Footnote bookkeeping happens once, over the whole document.
        self.gather_footnote_definitions(root);
        self.validate_footnote_references(root);

        let nodes = root.children().map(Vec::as_slice).unwrap_or_default();
        let mut blocks = vec![];
        let mut run_start = 0;
        let mut i = 0;
        while i < nodes.len() {
            let component = if let Some(name) = block_component(self.context.bump, &nodes[i]) {
                let element = match name {
                    BlockComponent::NotesIndex => None,
                    _ => Some(self.convert(&nodes[i], Some(root))),
                };
                Some((element, i))
            } else {
                self.try_convert_paired_element(nodes, i, Some(root))
                    .map(|(element, end)| (Some(self.handle_paired_element(element)), end))
            };
            let Some((element, end)) = component else {
                i += 1;
                continue;
            };
            blocks.extend(self.prose(&nodes[run_start..i], root));
            blocks.extend(element);
            i = end + 1;
            run_start = i;
        }
        blocks.extend(self.prose(&nodes[run_start..], root));
        b.fragment(blocks)
    }

    pub fn convert(&mut self, node: &Node, parent_node: Option<&Node>) -> paxhtml::Element<'a> {
        let bump = self.context.bump;
        let b = Builder::new(bump);

        // Only gather footnotes at the root level (when there's no parent)
        if parent_node.is_none() {
            self.gather_footnote_definitions(node);
            self.validate_footnote_references(node);
        }

        match node {
            Node::Root(r) => self.convert_many(&r.children, Some(node)),

            // A heading links to itself. One that holds a link of its own can't
            // be wrapped in another, so it gets a separate `#` anchor instead.
            Node::Heading(h) => {
                let children = self.convert_many(&h.children, Some(node));
                if self.without_blocking_elements {
                    return children;
                }
                let id = heading_id(node);
                let href = format!("#{id}");
                let children = if contains_link(&h.children) {
                    b.fragment([
                        b.a([b.attr(("class", "heading-anchor")), b.attr(("href", href))])(
                            b.text("# "),
                        ),
                        children,
                    ])
                } else {
                    b.a([b.attr(("href", href))])(children)
                };
                b.tag(
                    &format!("h{}", (h.depth + 1).min(6)),
                    [b.attr(("id", id))],
                    false,
                )(children)
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
                    let start = l
                        .start
                        .filter(|start| *start != 1)
                        .map(|start| b.attr(("start", start.to_string())));
                    b.ol(start)(children)
                } else {
                    b.ul([])(children)
                }
            }
            Node::ListItem(li) => {
                // A list item holding a single paragraph is written as a tight
                // one: the paragraph's contents go straight into the item, with
                // any nested list after them.
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
                            children.extend(p.children.iter().map(|n| self.convert(n, Some(node))));
                        } else {
                            children.push(self.convert(child, Some(node)));
                        }
                    }
                    b.li([])(b.fragment(children))
                } else {
                    b.li([])(self.convert_many(&li.children, Some(node)))
                }
            }
            // A block of code: its language, `text` if it names none, then
            // the code.
            Node::Code(c) => {
                let language = c.lang.as_deref().map(str::trim).filter(|l| !l.is_empty());
                let highlighted = self.highlight(language, &c.value, "code block");
                b.pre([])(b.fragment([
                    b.span([b.attr(("class", "code-language"))])(
                        b.text(self.context.syntax.language_name(language)),
                    ),
                    b.code([])(highlighted),
                ]))
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
                let (language, code) = self.context.syntax.parse_inline_code(&c.value);
                b.code([])(self.highlight(language, code, "inline code"))
            }
            Node::Image(i) => {
                if i.url.is_empty() {
                    eprintln!(
                        "warning: empty image source in {}: ![{}]()",
                        self.error_context, i.alt
                    );
                }
                // Markdown image syntax is used for video clips too; an <img>
                // pointed at one would just be a broken image.
                let lowercase = i.url.to_lowercase();
                let is_video = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".ogv"]
                    .iter()
                    .any(|extension| lowercase.ends_with(extension));

                if is_video {
                    b.video([
                        b.attr(("src", self.resolve_relative_url(&i.url))),
                        b.attr("controls"),
                        b.attr("loop"),
                        b.attr("muted"),
                        b.attr("playsinline"),
                        b.attr(("preload", "metadata")),
                    ])(paxhtml::Element::Empty)
                } else {
                    // A local image is shown as its preview, linking to the
                    // original.
                    let is_local = !i.url.starts_with("http://")
                        && !i.url.starts_with("https://")
                        && !i.url.starts_with("//");
                    let src_url = if is_local {
                        self.context.image_store.resolve_preview_url(&i.url)
                    } else {
                        i.url.clone()
                    };
                    let title = i.title.as_ref().map(|t| b.attr(("title", t.as_str())));
                    b.a([b.attr(("href", self.resolve_relative_url(&i.url)))])(
                        b.img(
                            [
                                b.attr(("src", self.resolve_relative_url(&src_url))),
                                b.attr(("alt", i.alt.as_str())),
                                b.attr(("loading", "lazy")),
                            ]
                            .into_iter()
                            .chain(title),
                        ),
                    )
                }
            }
            // A link says where it goes: an internal one carries the class of
            // the section it points into, and one to elsewhere on the page,
            // `link-here`.
            Node::Link(l) => {
                if l.url.is_empty() {
                    eprintln!(
                        "warning: empty link target in {}: [{}]()",
                        self.error_context,
                        inner_text(node, None).trim()
                    );
                }
                let url = self.resolve_relative_url(&self.resolve_link_url(&l.url));
                let children = self.convert_many(&l.children, Some(node));
                if self.strip_links {
                    return children;
                }
                let class = if url.starts_with('#') {
                    Some("link-here")
                } else {
                    destination_class(&url)
                };
                let attrs = [
                    class.map(|class| b.attr(("class", class))),
                    l.title
                        .as_ref()
                        .map(|title| b.attr(("title", title.as_str()))),
                ];
                b.a(std::iter::once(b.attr(("href", url.as_str())))
                    .chain(attrs.into_iter().flatten()))(children)
            }
            Node::Html(h) => self.convert_html(&h.value),
            Node::FootnoteReference(r) => self.convert_footnote_reference(&r.identifier),

            Node::Table(t) => {
                if self.without_blocking_elements {
                    return self.convert_many(&t.children, Some(node));
                }
                // The first row is the header, and sets how many cells every
                // row has: as in GFM, a shorter row is padded with empty ones.
                let mut rows = t.children.iter();
                let columns = t
                    .children
                    .first()
                    .and_then(Node::children)
                    .map_or(0, Vec::len);
                let head = rows
                    .next()
                    .map(|row| b.thead([])(b.tr([])(self.convert_cells(row, "th", columns))));
                let body: Vec<_> = rows
                    .map(|row| b.tr([])(self.convert_cells(row, "td", columns)))
                    .collect();
                b.table([])(b.fragment([head.unwrap_or_default(), b.tbody([])(b.fragment(body))]))
            }
            Node::TableRow(t) => {
                if self.without_blocking_elements {
                    self.convert_many(&t.children, Some(node))
                } else {
                    let columns = t.children.len();
                    b.tr([])(self.convert_cells(node, "td", columns))
                }
            }
            Node::TableCell(t) => {
                let children = self.convert_many(&t.children, Some(node));
                if self.without_blocking_elements {
                    children
                } else {
                    b.td([])(children)
                }
            }
            Node::ThematicBreak(_) => {
                if self.without_blocking_elements {
                    paxhtml::Element::Empty
                } else {
                    b.hr([])
                }
            }

            // Handled elsewhere
            Node::FootnoteDefinition(_) => paxhtml::Element::Empty,

            // Not supported yet
            Node::InlineMath(_)
            | Node::ImageReference(_)
            | Node::LinkReference(_)
            | Node::Math(_)
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

    /// Rewrite a URL so it resolves correctly when rendered outside the document's own
    /// page. Relative paths are rooted at `document_base_url`; if `website_base_url` is
    /// also set, site-absolute paths (`/foo`) are made fully absolute too. External,
    /// fragment, protocol-relative, `mailto:`, and `tel:` URLs are left alone.
    fn resolve_relative_url(&self, url: &str) -> String {
        if url.is_empty()
            || url.starts_with('#')
            || url.starts_with("//")
            || url.contains("://")
            || url.starts_with("mailto:")
            || url.starts_with("tel:")
        {
            return url.to_string();
        }
        if url.starts_with('/') {
            return match &self.website_base_url {
                Some(host) => format!("{host}{url}"),
                None => url.to_string(),
            };
        }
        let Some(base) = &self.document_base_url else {
            return url.to_string();
        };
        let stripped = url.strip_prefix("./").unwrap_or(url);
        format!("{base}{stripped}")
    }

    /// If the URL points to a `.md` file and we have a source path, resolve it to
    /// the corresponding output route URL. Links are validated up-front in the
    /// content phase (see [`validate_document_links`]); if resolution somehow
    /// fails here we fall back to the raw URL rather than aborting a render.
    fn resolve_link_url(&self, url: &str) -> String {
        let is_md_link = url.ends_with(".md") || url.contains(".md#");
        let is_absolute_url = url.contains("://");
        if !is_md_link || is_absolute_url {
            return url.to_string();
        }
        let Some(source_path) = &self.source_path else {
            return url.to_string();
        };
        self.context
            .content
            .resolve_markdown_link(source_path, url)
            .unwrap_or_else(|| url.to_string())
    }

    /// A run of authored content as one `.prose` block; nothing for a run with
    /// nothing in it.
    fn prose(&mut self, nodes: &[Node], root: &Node) -> Option<paxhtml::Element<'a>> {
        let b = Builder::new(self.context.bump);
        let is_blank = |node: &Node| match node {
            Node::Html(h) => {
                let value = h.value.trim();
                value.starts_with("<!--") && value.ends_with("-->")
            }
            Node::FootnoteDefinition(_) | Node::Definition(_) => true,
            _ => false,
        };
        (!nodes.iter().all(is_blank))
            .then(|| b.div([b.attr(("class", "prose"))])(self.convert_many(nodes, Some(root))))
    }

    /// Highlight code, or print it as it is if the highlighter fails.
    fn highlight(&self, language: Option<&str>, code: &str, what: &str) -> paxhtml::Element<'a> {
        self.context
            .syntax
            .highlight_code(self.context.bump, language, code)
            .unwrap_or_else(|e| {
                panic!("failed to highlight {what} ({}): {e:?}", self.error_context)
            })
    }

    /// A table row's cells, as `th` or `td`.
    /// A row's cells as `cell` elements, padded with empty ones to `columns`.
    fn convert_cells(&mut self, row: &Node, cell: &str, columns: usize) -> paxhtml::Element<'a> {
        let b = Builder::new(self.context.bump);
        let mut cells: Vec<_> = row
            .children()
            .map(Vec::as_slice)
            .unwrap_or_default()
            .iter()
            .map(|c| {
                let children =
                    self.convert_many(c.children().map(Vec::as_slice).unwrap_or_default(), Some(c));
                b.tag(cell, [], false)(children)
            })
            .collect();
        while cells.len() < columns {
            cells.push(b.tag(cell, [], false)(paxhtml::Element::Empty));
        }
        b.fragment(cells)
    }

    /// Raw HTML in the Markdown: a comment is dropped, a component is
    /// rendered, and anything else is passed through.
    fn convert_html(&mut self, value: &str) -> paxhtml::Element<'a> {
        let bump = self.context.bump;

        // HACK: Strip comments from Markdown HTML. This won't work if the comment is closed
        // in the middle of the string and actual content follows, but it's good enough for now.
        if value.starts_with("<!--") && value.ends_with("-->") {
            return paxhtml::Element::Empty;
        }

        // Guard stray closing tags for custom elements (e.g. </CityPoster>)
        // These are handled by try_convert_paired_element in convert_many
        if value.trim().starts_with("</")
            && value
                .trim()
                .chars()
                .nth(2)
                .is_some_and(|c| c.is_ascii_uppercase())
        {
            return paxhtml::Element::Empty;
        }

        let element = paxhtml::parse_html(bump, value).expect("failed to parse HTML"); // todo: make this a fallible result
        let attr = |name: &str| {
            element
                .attr(name)
                .and_then(|a| a.value_as_str())
                .map(str::to_string)
        };
        match element.tag() {
            Some("MusicLibrary") => components::music_library(self.context),
            // The notes rail is the index.
            Some("NotesIndex") => paxhtml::Element::Empty,
            Some("MonthDayDate") => components::month_day_date(
                bump,
                &attr("date").expect("MonthDayDate requires 'date' attribute"),
                element.attr("noyear").is_some(),
            ),
            Some("MonthDayDateRange") => components::month_day_date_range(
                bump,
                &attr("start").expect("MonthDayDateRange requires 'start' attribute"),
                &attr("end").expect("MonthDayDateRange requires 'end' attribute"),
                element.attr("noyear").is_some(),
            ),
            Some("BlueskyPost") => {
                let url = attr("post").unwrap_or_else(|| {
                    panic!(
                        "BlueskyPost requires 'post' attribute in {}",
                        self.error_context
                    )
                });
                let post_data = self
                    .context
                    .content
                    .bluesky_posts
                    .get(&url)
                    .unwrap_or_else(|| {
                        panic!(
                            "BlueskyPost data not found for {url} in {}",
                            self.error_context
                        )
                    });
                components::bluesky_post(bump, post_data)
            }
            Some("PrMeta") => render_pr_meta(bump, &element, None),
            Some("PrTimeline") => components::pr_timeline(bump, &self.pr_entries),
            _ => element,
        }
    }

    /// A footnote reference becomes the note itself, beside its marker: a link
    /// to the note, which opens by `:target` without a script and in place with
    /// one, and which floats into the margin where the column has room.
    fn convert_footnote_reference(&mut self, identifier: &str) -> paxhtml::Element<'a> {
        let b = Builder::new(self.context.bump);
        let definition = self.footnote_definition(identifier).clone();

        // Numbered in order of first reference.
        let number = *self
            .footnote_counter
            .entry(identifier.to_string())
            .or_insert_with(|| {
                let number = self.next_footnote_number;
                self.next_footnote_number += 1;
                number
            });
        let number = number.to_string();

        let mut converter = MarkdownConverter {
            context: self.context,
            footnotes: self.footnotes.clone(),
            without_blocking_elements: true,
            strip_links: self.strip_links,
            footnote_counter: HashMap::new(),
            next_footnote_number: 1,
            error_context: self.error_context.clone(),
            source_path: self.source_path.clone(),
            document_base_url: self.document_base_url.clone(),
            website_base_url: self.website_base_url.clone(),
            pr_entries: vec![],
        };
        let note = converter.convert_many(&definition, None);

        let id = format!("fn-{identifier}");
        b.span([b.attr(("class", "fn"))])(b.fragment([
            b.a([
                b.attr(("class", "fn-mark")),
                b.attr(("href", format!("#{id}"))),
                b.attr(("role", "doc-noteref")),
                b.attr(("aria-label", format!("Note {number}"))),
            ])(b.text(&number)),
            b.span([
                b.attr(("class", "fn-note")),
                b.attr(("id", id)),
                b.attr(("role", "doc-footnote")),
            ])(b.fragment([
                b.span([b.attr(("class", "fn-num")), b.attr(("aria-hidden", "true"))])(
                    b.text(&number),
                ),
                note,
            ])),
        ]))
    }

    fn convert_many(&mut self, nodes: &[Node], parent_node: Option<&Node>) -> paxhtml::Element<'a> {
        let bump = self.context.bump;
        let b = paxhtml::builder::Builder::new(bump);

        let mut elements = Vec::new();
        let mut i = 0;
        while i < nodes.len() {
            if let Some((element, end_idx)) = self.try_convert_pr_mention(nodes, i, parent_node) {
                elements.push(element);
                i = end_idx + 1;
            } else if let Some((element, end_idx)) =
                self.try_convert_paired_element(nodes, i, parent_node)
            {
                elements.push(self.handle_paired_element(element));
                i = end_idx + 1;
            } else {
                elements.push(self.convert(&nodes[i], parent_node));
                i += 1;
            }
        }

        b.fragment(elements)
    }

    /// Detect a `[title](github-pr-url) <PrMeta ... />` pair and wrap it in a
    /// `.pr-mention` with a stable id, so the timeline's row can link to the
    /// mention and the mention's dates can link to the row.
    fn try_convert_pr_mention(
        &mut self,
        nodes: &[Node],
        i: usize,
        parent_node: Option<&Node>,
    ) -> Option<(paxhtml::Element<'a>, usize)> {
        let Node::Link(link) = &nodes[i] else {
            return None;
        };
        let pr_id = pr_id_from_url(&link.url)?;

        let mut j = i + 1;
        let prmeta_idx = loop {
            if j >= nodes.len() {
                return None;
            }
            match &nodes[j] {
                Node::Text(t) if t.value.chars().all(char::is_whitespace) => j += 1,
                Node::FootnoteReference(_) => j += 1,
                Node::Html(h) if h.value.trim_start().starts_with("<PrMeta") => break j,
                _ => return None,
            }
        };

        let bump = self.context.bump;
        let tl_id = tl_id_from_url(&link.url);
        let mut children = Vec::with_capacity(prmeta_idx - i + 1);
        for (idx, node) in nodes.iter().enumerate().take(prmeta_idx + 1).skip(i) {
            if idx == prmeta_idx
                && let Node::Html(h) = node
                && let Ok(element) = paxhtml::parse_html(bump, &h.value)
                && element.tag() == Some("PrMeta")
            {
                children.push(render_pr_meta(bump, &element, tl_id.clone()));
            } else {
                children.push(self.convert(node, parent_node));
            }
        }

        let span = paxhtml::html! { in bump;
            <span class="pr-mention" id={pr_id}>
                #{children}
            </span>
        };

        Some((span, prmeta_idx))
    }

    /// Try to detect and parse a paired custom element starting at position `i`.
    ///
    /// Custom elements are identified by an opening `Node::Html` whose value starts
    /// with `<` followed by an uppercase letter. The function scans forward for a
    /// matching closing tag, converts the body nodes between them as one `.prose`
    /// block, and returns a complete paxhtml Element with that block as its child.
    fn try_convert_paired_element(
        &mut self,
        nodes: &[Node],
        i: usize,
        parent_node: Option<&Node>,
    ) -> Option<(paxhtml::Element<'a>, usize)> {
        let bump = self.context.bump;

        let Node::Html(open) = &nodes[i] else {
            return None;
        };
        let trimmed = open.value.trim();

        // Must start with `<` followed by an uppercase letter (custom component)
        if !trimmed.starts_with('<')
            || trimmed
                .chars()
                .nth(1)
                .is_none_or(|c| !c.is_ascii_uppercase())
        {
            return None;
        }

        // Parse the opening tag to get the tag name and check if it's void (self-closing).
        // Void elements like `<MusicLibrary />` are not paired and are handled by `convert`.
        let (tag_name, _, void) = paxhtml::parse_opening_tag(trimmed).ok()?;
        if void {
            return None;
        }

        // Find the matching closing tag
        let closing_tag = format!("</{tag_name}>");
        let mut end_idx = None;
        for (j, node) in nodes.iter().enumerate().skip(i + 1) {
            if let Node::Html(close) = node
                && close.value.trim() == closing_tag
            {
                end_idx = Some(j);
                break;
            }
        }

        let end_idx = match end_idx {
            Some(idx) => idx,
            None => {
                eprintln!(
                    "warning: unclosed <{tag_name}> tag in {}",
                    self.error_context
                );
                return None;
            }
        };

        // The body between the tags is authored content, so it is prose.
        let b = Builder::new(bump);
        let body = self.convert_many(&nodes[i + 1..end_idx], parent_node);
        let body = b.div([b.attr(("class", "prose"))])(body);

        // Build the complete element with children
        let element = paxhtml::parse_element_with_children(bump, trimmed, [body])
            .expect("failed to parse paired element opening tag");

        Some((element, end_idx))
    }

    /// Dispatch a parsed paired custom element to the appropriate component handler.
    fn handle_paired_element(&self, element: paxhtml::Element<'a>) -> paxhtml::Element<'a> {
        let bump = self.context.bump;

        // Destructure to avoid borrow-after-move issues
        let paxhtml::Element::Tag {
            name,
            attributes,
            children,
            ..
        } = element
        else {
            return paxhtml::Element::Empty;
        };

        match name.as_str() {
            "CityPoster" => {
                let image_attr = attributes
                    .iter()
                    .find(|a| a.key.as_str() == "image")
                    .and_then(|a| a.value_as_str())
                    .unwrap_or_else(|| {
                        panic!(
                            "CityPoster missing 'image' attribute in {}",
                            self.error_context
                        )
                    });
                let small_url = self
                    .context
                    .image_store
                    .resolve_small_preview_url(image_attr);
                let body = paxhtml::Element::Fragment { children };
                components::city_poster(
                    bump,
                    &self.resolve_relative_url(image_attr),
                    &self.resolve_relative_url(&small_url),
                    body,
                )
            }
            _ => {
                eprintln!(
                    "warning: unknown custom element <{name}> in {}",
                    self.error_context
                );
                paxhtml::Element::Empty
            }
        }
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

    /// Panic on `[^ident]` patterns that aren't backed by a `[^ident]:` definition.
    /// The markdown parser silently keeps such references as plain text rather than
    /// emitting a `Node::FootnoteReference`, so we have to scan `Text` nodes ourselves.
    fn validate_footnote_references(&self, node: &Node) {
        if let Node::Text(t) = node {
            for ident in scan_footnote_refs(&t.value) {
                self.footnote_definition(ident);
            }
        }
        if let Some(children) = node.children() {
            for child in children {
                self.validate_footnote_references(child);
            }
        }
    }

    /// Look up a footnote definition by identifier, or panic with a uniform
    /// "broken footnote reference" message. Shared by `validate_footnote_references`
    /// (the pre-pass over raw `[^ident]` text) and the `Node::FootnoteReference`
    /// rendering arm so both paths emit the same error.
    fn footnote_definition(&self, identifier: &str) -> &Vec<Node> {
        self.footnotes.get(identifier).unwrap_or_else(|| {
            panic!(
                "Broken footnote reference in {}: '[^{identifier}]' — definition not found",
                self.error_context
            )
        })
    }
}

/// The components that stand beside prose rather than inside it.
#[derive(Copy, Clone, PartialEq, Eq)]
enum BlockComponent {
    PrTimeline,
    BlueskyPost,
    MusicLibrary,
    NotesIndex,
}

/// Whether a top-level node is one of the block components.
fn block_component(bump: &paxhtml::bumpalo::Bump, node: &Node) -> Option<BlockComponent> {
    let Node::Html(h) = node else {
        return None;
    };
    let value = h.value.trim();
    if !value.starts_with('<') || !value.chars().nth(1).is_some_and(|c| c.is_ascii_uppercase()) {
        return None;
    }
    match paxhtml::parse_html(bump, value).ok()?.tag()? {
        "PrTimeline" => Some(BlockComponent::PrTimeline),
        "BlueskyPost" => Some(BlockComponent::BlueskyPost),
        "MusicLibrary" => Some(BlockComponent::MusicLibrary),
        "NotesIndex" => Some(BlockComponent::NotesIndex),
        _ => None,
    }
}

/// A heading's anchor: its text, slugified. The same slug the link checker
/// validates against (see [`collect_heading_anchors`]).
pub fn heading_id(heading: &Node) -> String {
    crate::util::slugify(inner_text(heading, None).trim())
}

/// A document's body as one Markdown tree: its description and the rest of
/// its content, which are split at `<!-- more -->` when read, joined again.
pub fn document_root(document: &Document) -> Node {
    let children = document
        .description
        .children()
        .into_iter()
        .chain(document.rest_of_content.as_ref().and_then(Node::children))
        .flatten()
        .cloned()
        .collect();
    Node::Root(markdown::mdast::Root {
        children,
        position: None,
    })
}

/// Scan a string for `[^ident]` footnote-reference patterns. Identifiers are
/// non-empty and may not contain whitespace; everything else (including `Code`
/// / `InlineCode` values) lives in non-`Text` nodes and is naturally skipped.
fn scan_footnote_refs(text: &str) -> Vec<&str> {
    let mut refs = Vec::new();
    let bytes = text.as_bytes();
    let mut i = 0;
    while i + 2 < bytes.len() {
        if bytes[i] == b'[' && bytes[i + 1] == b'^' {
            let start = i + 2;
            if let Some(rel) = bytes[start..].iter().position(|&b| b == b']') {
                let end = start + rel;
                let ident = &text[start..end];
                if !ident.is_empty() && !ident.chars().any(char::is_whitespace) {
                    refs.push(ident);
                }
                i = end + 1;
                continue;
            }
        }
        i += 1;
    }
    refs
}

fn render_pr_meta<'bump>(
    bump: &'bump paxhtml::bumpalo::Bump,
    element: &paxhtml::Element<'bump>,
    tl_id: Option<String>,
) -> paxhtml::Element<'bump> {
    let attr_str = |key: &str| {
        element
            .attr(key)
            .and_then(|a| a.value_as_str())
            .map(|s| s.to_string())
    };
    let attr_u32 = |key: &str| {
        element
            .attr(key)
            .and_then(|a| a.value.as_ref())
            .and_then(|v| v.as_int())
            .unwrap_or(0) as u32
    };
    components::pr_meta(
        bump,
        components::PrMetaProps {
            date: attr_str("date"),
            start: attr_str("start"),
            end: attr_str("end"),
            add: attr_u32("add"),
            sub: attr_u32("sub"),
            closed: element.attr("closed").is_some(),
            tl_id,
        },
    )
}

fn contains_link(nodes: &[Node]) -> bool {
    nodes.iter().any(|node| {
        matches!(node, Node::Link(_))
            || node
                .children()
                .is_some_and(|children| contains_link(children))
    })
}

/// Walk a markdown AST and collect the slug for every heading. The slug is
/// [`heading_id`], which the converter gives each heading, so this is the
/// canonical anchor set for in-document heading links.
pub fn collect_heading_anchors(node: &Node) -> HashSet<String> {
    fn walk(node: &Node, anchors: &mut HashSet<String>) {
        if matches!(node, Node::Heading(_)) {
            anchors.insert(heading_id(node));
        }
        if let Some(children) = node.children() {
            for child in children {
                walk(child, anchors);
            }
        }
    }
    let mut anchors = HashSet::new();
    walk(node, &mut anchors);
    anchors
}

/// Resolve a link's checkable `(route_url, fragment)` anchor target, or `None` if
/// there's nothing to validate (external, no fragment, or an untracked route).
/// Same resolution rules used when rendering hrefs, kept here so the content-phase
/// validator and the converter can't drift apart.
fn resolve_anchor_target(
    content: &Content,
    source_path: Option<&Path>,
    document_base_url: Option<&str>,
    raw_url: &str,
) -> Option<(String, String)> {
    let resolved: Option<String> = if let Some(frag) = raw_url.strip_prefix('#') {
        Some(frag)
            .filter(|f| !f.is_empty())
            .and_then(|f| document_base_url.map(|b| format!("{b}#{f}")))
    } else if raw_url.ends_with(".md") || raw_url.contains(".md#") {
        source_path.and_then(|p| content.resolve_markdown_link(p, raw_url))
    } else if raw_url.starts_with('/') && !raw_url.contains("://") {
        Some(raw_url.to_string())
    } else {
        None
    };
    resolved
        .as_deref()
        .and_then(|r| r.split_once('#'))
        .filter(|(_, f)| !f.is_empty())
        .map(|(r, f)| (r.to_string(), f.to_string()))
}

fn walk_links(node: &Node, f: &mut impl FnMut(&str)) {
    if let Node::Link(l) = node {
        f(&l.url);
    }
    if let Some(children) = node.children() {
        for child in children {
            walk_links(child, f);
        }
    }
}

/// Validate every link in a document: `.md` links must resolve to a real output
/// route, and `#fragment`s must point at a known anchor on the target page.
/// Returns one message per broken link. This is the single source of link
/// validation — run as a content-phase pre-pass, so the converter can assume
/// links are valid by the time it renders them.
pub fn validate_document_links(content: &Content, doc: &Document) -> Vec<String> {
    let mut errors = Vec::new();
    let source_path = doc.source_path.as_path();
    // The doc's own route URL keys both same-page anchors and the registry.
    let document_base_url = content.route_url_for(source_path).map(str::to_string);
    let here = document_base_url
        .clone()
        .unwrap_or_else(|| source_path.display().to_string());

    let mut check = |raw_url: &str| {
        // `.md` links must resolve to a real route.
        let is_md = raw_url.ends_with(".md") || raw_url.contains(".md#");
        if is_md
            && !raw_url.contains("://")
            && content
                .resolve_markdown_link(source_path, raw_url)
                .is_none()
        {
            errors.push(format!("{here}: broken .md link '{raw_url}'"));
            return;
        }
        // Fragments must hit a known anchor on the target page.
        if let Some((route_url, fragment)) = resolve_anchor_target(
            content,
            Some(source_path),
            document_base_url.as_deref(),
            raw_url,
        ) && let Some(anchors) = content.anchors.get(&route_url)
            && !anchors.contains(&fragment)
        {
            errors.push(format!(
                "{here}: broken anchor '{raw_url}' → '{route_url}#{fragment}'"
            ));
        }
    };

    walk_links(&doc.description, &mut check);
    if let Some(rest) = &doc.rest_of_content {
        walk_links(rest, &mut check);
    }
    errors
}

// `inner_text` is the canonical markdown→plaintext walker; it lives in
// paxsite-content so the CLI can derive standard.site `textContent` identically.
pub use paxsite_content::inner_text;

#[derive(Debug, PartialEq, Clone)]
pub struct HeadingHierarchy<'a> {
    pub heading: paxhtml::Element<'a>,
    pub heading_text: String,
    pub children: Vec<HeadingHierarchy<'a>>,
}
impl<'a> HeadingHierarchy<'a> {
    pub fn new(
        heading: paxhtml::Element<'a>,
        heading_text: impl Into<String>,
        children: impl IntoIterator<Item = HeadingHierarchy<'a>>,
    ) -> Self {
        Self {
            heading,
            heading_text: heading_text.into(),
            children: children.into_iter().collect(),
        }
    }
    pub fn from_node(
        context: ViewContext<'a>,
        node: &Node,
        error_context: &str,
    ) -> Vec<HeadingHierarchy<'a>> {
        let mut headings = Vec::new();
        collect_headings(context, node, &mut headings, error_context);

        let mut result = Vec::new();
        let mut stack: Vec<(u8, HeadingHierarchy<'a>)> = Vec::new();

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

        fn collect_headings<'a>(
            context: ViewContext<'a>,
            node: &Node,
            headings: &mut Vec<(u8, paxhtml::Element<'a>, String)>,
            error_context: &str,
        ) {
            if let Some(children) = node.children() {
                for child in children {
                    if let Node::Heading(heading) = child {
                        headings.push((
                            heading.depth,
                            MarkdownConverter::new(context, error_context)
                                .without_blocking_elements()
                                .strip_links()
                                .convert(child, Some(child)),
                            inner_text(child, None).trim().to_string(),
                        ));
                    }
                    collect_headings(context, child, headings, error_context); // Recurse into all children
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
        content::{Content, parse_markdown},
        syntax::SyntaxHighlighter,
        views::ViewContextBase,
    };
    use paxhtml::bumpalo::Bump;

    fn view_context_base<'a>(
        syntax: &'a SyntaxHighlighter,
        content: &'a Content,
        image_store: &'a crate::image_store::ImageStore,
    ) -> ViewContextBase<'a> {
        ViewContextBase {
            website_author: "test",
            website_name: "test",
            website_description: "test",
            website_base_url: "test",
            syntax,
            content,
            image_store,
            generation_date: chrono::Utc::now(),
            fast: false,
        }
    }

    #[test]
    fn a_link_within_the_page_says_so() {
        let ast = parse_markdown("See [below](#below) and [the blog](/blog/).\n");
        let syntax = SyntaxHighlighter::default();
        let content = Content::empty();
        let bump = Bump::new();
        let image_store = crate::image_store::ImageStore::new(&content);
        let context = view_context_base(&syntax, &content, &image_store).with_bump(&bump);
        let result = MarkdownConverter::new(context, "test").convert_blocks(&ast);
        let html = paxhtml::Document::new(&bump, [result])
            .write_to_string()
            .unwrap();
        assert!(
            html.contains(r##"<a href="#below" class="link-here">below</a>"##),
            "{html}"
        );
        assert!(
            html.contains(r#"<a href="/blog/" class="link-post">the blog</a>"#),
            "{html}"
        );
    }

    #[test]
    fn a_short_table_row_is_padded_to_the_header() {
        let ast = parse_markdown("| a | b | c |\n| - | - | - |\n| 1 |\n");
        let syntax = SyntaxHighlighter::default();
        let content = Content::empty();
        let bump = Bump::new();
        let image_store = crate::image_store::ImageStore::new(&content);
        let context = view_context_base(&syntax, &content, &image_store).with_bump(&bump);
        let result = MarkdownConverter::new(context, "test").convert_blocks(&ast);
        let html = paxhtml::Document::new(&bump, [result])
            .write_to_string()
            .unwrap();
        let html: String = html.split_whitespace().collect();
        assert!(
            html.contains("<tr><td>1</td><td></td><td></td></tr>"),
            "{html}"
        );
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
        let bump = Bump::new();
        let image_store = crate::image_store::ImageStore::new(&content);
        let context = view_context_base(&syntax, &content, &image_store).with_bump(&bump);

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

        let result = HH::from_node(context, &ast, "test");
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
        let bump = Bump::new();
        let image_store = crate::image_store::ImageStore::new(&content);
        let context = view_context_base(&syntax, &content, &image_store).with_bump(&bump);
        let mut converter = MarkdownConverter::new(context, "test");

        let result = converter.convert(&ast, None);
        let html = paxhtml::Document::new(&bump, [result])
            .write_to_string()
            .unwrap();

        // Each note sits beside its marker, named after its footnote and
        // numbered in order of reference.
        assert!(html.contains(
            r##"<span class="fn"><a class="fn-mark" href="#fn-note1" role="doc-noteref" aria-label="Note 1">1</a><span class="fn-note" id="fn-note1" role="doc-footnote"><span class="fn-num" aria-hidden="true">1</span>This is the first footnote.</span></span>"##
        ));
        assert!(
            html.contains(r##"href="#fn-note2" role="doc-noteref" aria-label="Note 2">2</a>"##)
        );
        // No apparatus at the foot.
        assert_eq!(html.matches("This is the first footnote.").count(), 1);
    }

    #[test]
    fn test_blocks() {
        let input = r#"
# A heading with [a link](/notes/foo)

Some prose with `code`.

<PrTimeline />

```rust
fn main() {}
```

<NotesIndex />
"#;

        let ast = parse_markdown(input);
        let syntax = SyntaxHighlighter::default();
        let content = Content::empty();
        let bump = Bump::new();
        let image_store = crate::image_store::ImageStore::new(&content);
        let context = view_context_base(&syntax, &content, &image_store).with_bump(&bump);
        let result = MarkdownConverter::new(context, "test").convert_blocks(&ast);
        let html = paxhtml::Document::new(&bump, [result])
            .write_to_string()
            .unwrap();

        // The timeline (empty here) splits the prose in two, and the notes
        // index renders nothing at all.
        assert_eq!(html.matches(r#"<div class="prose">"#).count(), 2);
        assert!(html.contains(
            r##"<h2 id="a-heading-with-a-link"><a class="heading-anchor" href="#a-heading-with-a-link"># </a>A heading with <a href="/notes/foo" class="link-note">a link</a></h2>"##
        ));
        assert!(html.contains(r#"<pre><span class="code-language">rust</span><code>"#));
        assert!(!html.contains("NotesIndex"));
    }
}
