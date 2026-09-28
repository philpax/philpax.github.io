use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    markdown::{HeadingHierarchy, MarkdownConverter},
    util,
    views::components::{TagList, TagListProps, collect_pr_entries},
};

pub fn tags<'a>(bump: &'a Bump, document: &Document) -> paxhtml::Element<'a> {
    let tags = document.tags().cloned().unwrap_or_default();
    html! { in bump; <TagList tags={tags} /> }
}

pub fn date<'a>(bump: &'a Bump, document: &Document) -> paxhtml::Element<'a> {
    let date = document
        .metadata
        .datetime
        .unwrap_or_else(|| panic!("No datetime for {document}"))
        .date_naive();
    paxhtml::html! { in bump; <time>{date.to_string()}</time> }
}

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
}

pub fn post<'a>(
    context: ViewContext<'a>,
    document: &Document,
    post_body: PostBody,
) -> paxhtml::Element<'a> {
    let bump = context.bump;
    let route_path = document.route_path();
    let url = route_path.url_path();
    let heading_class = post_body_to_heading_class(post_body);

    // Metadata + clickable title that heads every post.
    let title_and_meta = html! { in bump;
        <>
            {post_title_link(bump, url.clone(), heading_class, html! { in bump; {document.metadata.title.clone()} })}
            {post_meta(bump, document, post_body)}
        </>
    };

    // Full post view: the post-body stays a block so the floated TOC sidebar and
    // per-paragraph sidenotes work; spacing comes from the
    // `.post-body` / `.post-prose` cascade.
    let toc = document
        .rest_of_content
        .as_ref()
        .and_then(|node| document_to_html_list(context, node, &url));
    let (toc_sidebar, toc_inline) = toc_elements(bump, toc);

    let mut body_elements = vec![];
    body_elements.extend(toc_sidebar);
    if document.metadata.draft {
        body_elements.push(html! { in bump;
            <div class={format!("p-4 border border-hot text-hot text-center {CODE_FONT_STYLE}")}>
                <div class="text-xl font-bold">"DRAFT"</div>
                <div class="text-sm mt-1 text-fg">"I hope you're here because you're meant to be. It'd be a bit awkward otherwise."</div>
            </div>
        });
    }
    if let Some((filename, alt)) = &document.hero_filename_and_alt {
        body_elements.push(html! { in bump;
            <img src={route_path.with_filename(filename).url_path()} alt={format!("Hero image: {alt}")} class="border border-wire hero-image block w-full" />
        });
    }

    let pr_entries = document
        .rest_of_content
        .as_ref()
        .map(|content| collect_pr_entries(bump, content))
        .unwrap_or_default();
    let mut converter = MarkdownConverter::new(context, &url)
        .with_source_path(document.source_path.clone())
        .with_document_base_url(url.clone())
        .with_pr_entries(pr_entries);
    body_elements.extend(toc_inline);
    body_elements.push(converter.convert_blocks(&crate::markdown::document_root(document)));

    html! { in bump;
        <article>{title_and_meta}#{body_elements.into_iter()}</article>
    }
}

/// Render the post metadata as a single inline mono line:
/// `date · updated X · type · N words · #tags`, with the date(s) and the word
/// count highlighted (`text-fg`) against the dim line.
fn post_meta<'a>(bump: &'a Bump, document: &Document, post_body: PostBody) -> paxhtml::Element<'a> {
    let type_str = document.document_type.to_string().to_lowercase();
    let words = document.word_count.to_string();
    let has_tags = document.tags().is_some_and(|t| !t.is_empty());

    // Only the full post view shows the "updated" date; summaries omit it.
    let updated = (post_body == PostBody::Full)
        .then(|| {
            document
                .metadata
                .datetime
                .zip(document.metadata.last_modified)
                .filter(|(published, modified)| published.date_naive() != modified.date_naive())
                .map(|(_, modified)| modified.date_naive())
        })
        .flatten();

    html! { in bump;
        // A single mono line that scrolls horizontally rather than wrapping/stacking,
        // so a long tag list (or narrow viewport) never truncates the row.
        <div class={format!("post-meta flex flex-row items-center gap-x-2 text-sm text-dim overflow-x-auto {CODE_FONT_STYLE}")}>
            <div class="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
                <span class="text-fg">{date(bump, document)}</span>
                {updated.map(|m| html! { in bump; <><span>" · updated "</span><span class="text-fg"><time>{m.to_string()}</time></span></> })}
                <span ariaHidden="true">"·"</span>
                <span>{type_str}</span>
                <span ariaHidden="true">"·"</span>
                <span><span class="text-fg">{words}</span>" words"</span>
            </div>
            {has_tags.then(|| html! { in bump; <>
                <span ariaHidden="true" class="flex-shrink-0">"·"</span>
                <div class="flex-shrink-0">{tags(bump, document)}</div>
            </>})}
        </div>
    }
}

/// Gets the class for the heading of a post body.
pub fn post_body_to_heading_class(post_body: PostBody) -> &'static str {
    match post_body {
        PostBody::Full => "text-2xl font-bold",
    }
}

/// The clickable post title shared by post cards and post-like pages (e.g.
/// credits): a non-underlined link wrapping an `<h2>` that warms to `hot` on
/// hover. `title` is the already-rendered heading content (text, or a
/// colon-broken title).
pub fn post_title_link<'a>(
    bump: &'a Bump,
    url: String,
    heading_class: &str,
    title: paxhtml::Element<'a>,
) -> paxhtml::Element<'a> {
    html! { in bump;
        <a href={url} class="block no-underline post-title group">
            <h2 class={format!("{heading_class} text-phosphor group-hover:text-hot transition-colors")}>{title}</h2>
        </a>
    }
}

/// Render the TOC sidebar (2xl sticky) and inline TOC (smaller screens) from a heading list.
/// Returns `(sidebar, inline)` — both `None` if there are no headings.
pub fn toc_elements<'a>(
    bump: &'a Bump,
    toc: Option<paxhtml::Element<'a>>,
) -> (Option<paxhtml::Element<'a>>, Option<paxhtml::Element<'a>>) {
    let h3_classname = "font-bold text-phosphor mb-1 px-1";
    let link_classes = "toc [&_a]:text-dim [&_a]:no-underline [&_a]:px-1 [&_a:hover]:text-hot [&_a.active]:bg-phosphor [&_a.active]:text-canvas [&_a.active]:rounded-sm";
    let toc_header = "Table of Contents";

    let sidebar = toc.clone().map(|hierarchy_list| {
        html! { in bump;
            <aside class="toc-sidebar hidden 2xl:block 2xl:float-left 2xl:clear-left 2xl:w-[calc((100vw-var(--body-content-width))/2-4rem)] 2xl:-ml-[calc((100vw-var(--body-content-width))/2-3rem)] 2xl:pr-2 2xl:sticky 2xl:top-4 2xl:flex 2xl:flex-col 2xl:items-end" id="toc-sticky">
                <div class="w-max max-w-full">
                    <h3 class={h3_classname}>
                        <a href={"#toc-sticky".to_string()}>
                            {toc_header}
                        </a>
                    </h3>
                    <div class={link_classes}>
                        {hierarchy_list}
                    </div>
                </div>
            </aside>
        }
    });

    let inline = toc.map(|hierarchy_list| {
        html! { in bump;
            <aside class="toc 2xl:hidden py-2 border-y border-wire" id="toc-inline">
                <h3 class={h3_classname}>
                    <a href={"#toc-inline".to_string()}>
                        {toc_header}
                    </a>
                </h3>
                <div class={link_classes}>
                    {hierarchy_list}
                </div>
            </aside>
        }
    });

    (sidebar, inline)
}

pub fn document_to_html_list<'a>(
    context: ViewContext<'a>,
    node: &markdown::mdast::Node,
    error_context: &str,
) -> Option<paxhtml::Element<'a>> {
    let bump = context.bump;
    let heading_hierarchy = HeadingHierarchy::from_node(context, node, error_context);

    fn build_list_recursively<'a>(
        bump: &'a Bump,
        children: &[HeadingHierarchy<'a>],
        toplevel: bool,
    ) -> paxhtml::Element<'a> {
        if children.is_empty() {
            return paxhtml::Element::Empty;
        }

        // Top-level: no padding; nested: indent left (or right for sidebar via CSS)
        let ul_class = if toplevel {
            "list-none p-0 m-0"
        } else {
            "list-none m-0 pl-6"
        };

        html! { in bump;
            <ul class={ul_class}>
                {if toplevel {
                    // Bodge: use lowercase introduction text if all of the headings are lowercase
                    let all_headings_lowercase = children.iter().all(|h| h.heading_text.to_lowercase() == h.heading_text);
                    let introduction_text = if all_headings_lowercase {
                        "introduction"
                    } else {
                        "Introduction"
                    };

                    html! { in bump;
                        <li>
                            <a href={"#"}>
                                {introduction_text}
                            </a>
                        </li>
                    }
                } else {
                    paxhtml::Element::Empty
                }}
                #{children.iter().map(|h| build_list_item_recursively(bump, h))}
            </ul>
        }
    }

    fn build_list_item_recursively<'a>(
        bump: &'a Bump,
        HeadingHierarchy {
            heading,
            heading_text,
            children,
        }: &HeadingHierarchy<'a>,
    ) -> paxhtml::Element<'a> {
        html! { in bump;
            <li>
                <a href={format!("#{}", util::slugify(heading_text))}>
                    {heading.clone()}
                </a>
                {build_list_recursively(bump, children, false)}
            </li>
        }
    }

    Some(build_list_recursively(bump, &heading_hierarchy, true)).filter(|e| !e.is_empty())
}
