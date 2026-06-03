use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    markdown::{HeadingHierarchy, MarkdownConverter},
    util,
    views::components::{IsoDate, IsoDateProps, Link, LinkProps, collect_pr_entries},
};

pub const POST_BODY_MARGIN_CLASS: &str =
    "*:mb-4 [&>h1]:mb-0 [&>h2]:mb-0 [&>h3]:mb-0 [&>h4]:mb-0 [&>h5]:mb-0 [&>h6]:mb-0";

pub fn tags<'a>(bump: &'a Bump, document: &Document) -> paxhtml::Element<'a> {
    document
        .tags()
        .map(|t| {
            let tags = t.iter().map(|tag| {
                html! { in bump;
                    <li class="flex-shrink-0 mr-2 last:mr-0">
                        <Link underline title={format!("Tag: {tag}")} target={Route::Tag { tag_id: tag.to_string() }.url_path()}>
                            {format!("#{tag}")}
                        </Link>
                    </li>
                }
            });
            html! { in bump; <ul class={format!("list-none m-0 p-0 flex flex-wrap gap-y-1 min-w-0 {CODE_FONT_STYLE}")}>#{tags}</ul> }
        })
        .unwrap_or_default()
}

pub fn date<'a>(bump: &'a Bump, document: &Document) -> paxhtml::Element<'a> {
    let date = document
        .metadata
        .datetime
        .unwrap_or_else(|| panic!("No datetime for {document}"))
        .date_naive();
    paxhtml::html! { in bump; <IsoDate date={date} /> }
}

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
    Description,
    Short,
}

pub fn post<'a>(
    context: ViewContext<'a>,
    document: &Document,
    post_body: PostBody,
) -> paxhtml::Element<'a> {
    let bump = context.bump;
    let route_path = document.route_path();
    let url = route_path.url_path();

    let post_body_rendered = match post_body {
        PostBody::Full => {
            let toc = document
                .rest_of_content
                .as_ref()
                .and_then(|node| document_to_html_list(context, node, &url));
            let (toc_sidebar, toc_inline) = toc_elements(bump, toc);

            let mut content_elements = vec![];

            // Decorative address gutter ("hexdump offsets") in the left margin on very
            // wide screens. Purely cosmetic and aria-hidden; hidden below 2xl. Only shown
            // when there's no TOC sidebar (which otherwise occupies the left margin), so
            // the two never collide.
            let has_sidebar = toc_sidebar.is_some();
            content_elements.extend(toc_sidebar);
            if !has_sidebar {
                content_elements.push(address_gutter(bump));
            }

            if let Some((filename, alt)) = &document.hero_filename_and_alt {
                content_elements.push(html! { in bump;
                    <figure class="my-3">
                        <img src={route_path.with_filename(filename).url_path()} alt={format!("Hero image: {alt}")} class="border border-wire hero-image block w-full" />
                        <figcaption class={format!("text-xs text-dim mt-1 {CODE_FONT_STYLE}")} ariaHidden="true">
                            {format!("; {filename}")}
                        </figcaption>
                    </figure>
                });
            }

            let pr_entries = document
                .rest_of_content
                .as_ref()
                .map(|content| collect_pr_entries(bump, content))
                .unwrap_or_default();

            let mut converter = MarkdownConverter::new(context, &url)
                .with_sidenotes()
                .with_source_path(document.source_path.clone())
                .with_document_base_url(url.clone())
                .with_pr_entries(pr_entries);
            content_elements.push(converter.convert(&document.description, None));

            // Inline TOC for small screens (between description and rest of content)
            content_elements.extend(toc_inline);

            if let Some(content) = document.rest_of_content.as_ref() {
                content_elements.push(converter.convert(content, None));
            }

            paxhtml::builder::Builder::new(bump).fragment(content_elements)
        }
        PostBody::Description => html! { in bump;
            <>
                {MarkdownConverter::new(context, &url)
                    .with_source_path(document.source_path.clone())
                    .with_document_base_url(url.clone())
                    .convert(&document.description, None)}
                <p>
                    <Link underline target={url.clone()}>
                        "Read more"
                    </Link>
                </p>
            </>
        },
        PostBody::Short => MarkdownConverter::new(context, &url)
            .with_source_path(document.source_path.clone())
            .with_document_base_url(url.clone())
            .convert(
                document
                    .metadata
                    .short_markdown()
                    .as_ref()
                    .unwrap_or(&document.description),
                None,
            ),
    };

    let heading_class = post_body_to_heading_class(post_body);

    html! { in bump;
        <article class="post">
            <header class="pb-0 mb-0">
                {post_meta(bump, document, post_body)}
                <a href={url} class="block p-0 no-underline post-title group">
                    <h2 class={format!("{heading_class} text-phosphor group-hover:text-hot transition-colors")}>{break_on_colon(bump, &document.metadata.title)}</h2>
                </a>
                {document.metadata.draft.then(|| html! { in bump;
                    <div class={format!("my-3 p-4 border border-hot text-hot {CODE_FONT_STYLE}")}>
                        <div class="text-xl font-bold">"!! DRAFT !!"</div>
                        <div class="text-sm mt-1 text-fg">"I hope you're here because you're meant to be. It'd be a bit awkward otherwise."</div>
                    </div>
                })}
            </header>
            <div class={format!(
                "post-body {} {}",
                if post_body != PostBody::Short { POST_BODY_MARGIN_CLASS } else { "" },
                if post_body != PostBody::Full { "[&_.sidenote]:!hidden [&_.footnote>label]:!inline-block [&_.footnote>a]:!hidden [&_.peer:checked~.footnote-inline]:!block" } else { "" }
            )}>
                {post_body_rendered}
            </div>
        </article>
    }
}

/// A decorative hexdump-style offset column for the left margin on very wide
/// screens. Cosmetic only and aria-hidden; rendered as a sticky left float that
/// mirrors the TOC sidebar's positioning.
fn address_gutter<'a>(bump: &'a Bump) -> paxhtml::Element<'a> {
    let addresses: String = (0..16)
        .map(|i| format!("0x{:04x}", i * 0x10))
        .collect::<Vec<_>>()
        .join("\n");
    html! { in bump;
        <aside ariaHidden="true" class="address-gutter hidden 2xl:block 2xl:float-left 2xl:clear-left 2xl:w-[var(--gutter-width)] 2xl:-ml-[calc((100vw-var(--body-content-width))/2-1rem)] 2xl:sticky 2xl:top-4">
            {addresses}
        </aside>
    }
}

/// Render the post metadata. In `Full` mode it's a mono "header struct"
/// (`field : value` rows); otherwise a compact mono meta line.
fn post_meta<'a>(bump: &'a Bump, document: &Document, post_body: PostBody) -> paxhtml::Element<'a> {
    let type_str = document.document_type.to_string().to_lowercase();
    let words = document.word_count.to_string();
    let has_tags = document.tags().is_some_and(|t| !t.is_empty());

    if post_body == PostBody::Full {
        let updated = document
            .metadata
            .datetime
            .zip(document.metadata.last_modified)
            .filter(|(published, modified)| published.date_naive() != modified.date_naive())
            .map(|(_, modified)| modified.date_naive());

        let row = |label: &'static str, value: paxhtml::Element<'a>| {
            html! { in bump;
                <div class="flex gap-2 items-baseline">
                    <span class="text-dim w-16 flex-shrink-0">{label}</span>
                    <span class="text-dim" ariaHidden="true">": "</span>
                    <span class="min-w-0">{value}</span>
                </div>
            }
        };

        return html! { in bump;
            <div class={format!("post-meta text-sm text-fg mb-2 pl-3 border-l border-wire {CODE_FONT_STYLE}")}>
                {row("date", html! { in bump;
                    <>
                        {date(bump, document)}
                        {updated.map(|m| html! { in bump; <><span class="text-dim">" · updated "</span><IsoDate date={m} /></> })}
                    </>
                })}
                {row("type", html! { in bump; <>{type_str}</> })}
                {row("size", html! { in bump; <>{words}" words"</> })}
                {has_tags.then(|| row("tags", tags(bump, document)))}
            </div>
        };
    }

    html! { in bump;
        <div class={format!("post-meta flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-2 gap-y-1 text-sm text-dim {CODE_FONT_STYLE}")}>
            <div class="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
                {date(bump, document)}
                <span ariaHidden="true">"·"</span>
                <span>{type_str}</span>
                <span ariaHidden="true">"·"</span>
                <span>{words}" words"</span>
            </div>
            {has_tags.then(|| html! { in bump;
                <div class="min-w-0">{tags(bump, document)}</div>
            })}
        </div>
    }
}

/// Gets the class for the heading of a post body.
pub fn post_body_to_heading_class(post_body: PostBody) -> &'static str {
    match post_body {
        PostBody::Full | PostBody::Description => "text-2xl font-bold",
        PostBody::Short => "text-xl font-bold",
    }
}

/// Render the TOC sidebar (2xl sticky) and inline TOC (smaller screens) from a heading list.
/// Returns `(sidebar, inline)` — both `None` if there are no headings.
pub fn toc_elements<'a>(
    bump: &'a Bump,
    toc: Option<paxhtml::Element<'a>>,
) -> (Option<paxhtml::Element<'a>>, Option<paxhtml::Element<'a>>) {
    let h3_classname = format!("text-sm font-bold text-phosphor mb-1 {CODE_FONT_STYLE}");
    let link_classes = "toc [&_a]:text-dim [&_a]:no-underline [&_a:hover]:text-hot";

    let sidebar = toc.clone().map(|hierarchy_list| {
        html! { in bump;
            <aside class="toc-sidebar hidden 2xl:block 2xl:float-left 2xl:clear-left 2xl:w-[calc((100vw-var(--body-content-width))/2-4rem)] 2xl:-ml-[calc((100vw-var(--body-content-width))/2-3rem)] 2xl:pr-2 2xl:sticky 2xl:top-4 2xl:flex 2xl:flex-col 2xl:items-end" id="toc-sticky">
                <div class="w-max max-w-full">
                    <h3 class={h3_classname.clone()}>
                        <Link underline target={"#toc-sticky".to_string()}>
                            "; contents"
                        </Link>
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
            <aside class="toc 2xl:hidden my-4 py-2 border-y border-wire" id="toc-inline">
                <h3 class={h3_classname}>
                    <Link underline target={"#toc-inline".to_string()}>
                        "; contents"
                    </Link>
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
                            <Link underline target={"#"}>
                                {introduction_text}
                            </Link>
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
                <Link underline target={format!("#{}", util::slugify(heading_text))}>
                    {heading.clone()}
                </Link>
                {build_list_recursively(bump, children, false)}
            </li>
        }
    }

    Some(build_list_recursively(bump, &heading_hierarchy, true)).filter(|e| !e.is_empty())
}
