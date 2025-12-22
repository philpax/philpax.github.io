use super::*;
use crate::{
    markdown::{HeadingHierarchy, MarkdownConverter},
    util,
    views::components::{Link, LinkProps},
};

pub const POST_BODY_CONTENT_MARGIN_LEFT_CLASS: &str = "ml-4";
// uses `POST_BODY_CONTENT_MARGIN_LEFT_CLASS` for child paragraphs; can't construct dynamically
// because tailwind looks for full class names
pub const POST_BODY_MARGIN_CLASS: &str =
    "*:mb-4 [&>h1]:mb-0 [&>h2]:mb-0 [&>h3]:mb-0 [&>h4]:mb-0 [&>h5]:mb-0 [&>h6]:mb-0";

pub fn tags(document: &Document) -> paxhtml::Element {
    document
        .tags()
        .map(|t| {
            let tags = t.iter().map(|tag| {
                html! {
                    <li class="inline-block mr-[var(--meta-spacing)] last:mr-0">
                        <Link title={format!("Tag: {tag}")} target={Route::Tag { tag_id: tag.to_string() }.url_path()}>
                            {format!("#{tag}")}
                        </Link>
                    </li>
                }
            });
            html! { <ul class="list-none m-0 p-0 inline-block">#{tags}</ul> }
        })
        .unwrap_or_default()
}

pub fn date(document: &Document) -> paxhtml::Element {
    crate::elements::date_with_chrono(
        document
            .metadata
            .datetime
            .unwrap_or_else(|| panic!("No datetime for {document}"))
            .date_naive(),
    )
}

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
    Description,
    Short,
}

pub fn post(context: ViewContext, document: &Document, post_body: PostBody) -> paxhtml::Element {
    let route_path = document.route_path();
    let url = route_path.url_path();

    let post_body_rendered = match post_body {
        PostBody::Full => {
            let h3_classname = "text-lg font-bold";
            let toc = document_to_html_list(context, document);

            let mut content_elements = vec![];

            // TOC sidebar (2xl only) - floats left into margin
            if let Some(hierarchy_list) = toc.clone() {
                content_elements.push(html! {
                    <aside class="toc-sidebar hidden 2xl:block 2xl:float-left 2xl:clear-left 2xl:w-[calc((100vw-var(--body-content-width))/2-4rem)] 2xl:-ml-[calc((100vw-var(--body-content-width))/2-3rem)] 2xl:pr-2 2xl:text-right 2xl:sticky 2xl:top-4" id="toc-sticky">
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        <div class="toc">
                            {hierarchy_list}
                        </div>
                    </aside>
                });
            }

            if let Some((filename, alt)) = &document.hero_filename_and_alt {
                content_elements.push(html! {
                    <img src={route_path.with_filename(filename).url_path()} alt={format!("Hero image: {alt}")} class="my-2 border-4 border-[var(--color)] hero-image" />
                });
            }

            let mut converter = MarkdownConverter::new(context);
            content_elements.push(converter.convert(&document.description, None));

            // Inline TOC for small screens (between description and rest of content)
            if let Some(hierarchy_list) = toc {
                content_elements.push(html! {
                    <aside class="toc 2xl:hidden" id="toc-inline">
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        <div class={POST_BODY_CONTENT_MARGIN_LEFT_CLASS}>
                            {hierarchy_list}
                        </div>
                    </aside>
                });
            }

            if let Some(content) = document.rest_of_content.as_ref() {
                content_elements.push(converter.convert(content, None));
            }

            paxhtml::Element::from(content_elements)
        }
        PostBody::Description => html! {
            <>
                {MarkdownConverter::new(context).convert(&document.description, None)}
                <p>
                    <Link underline target={url.clone()}>
                        "Read more"
                    </Link>
                </p>
            </>
        },
        PostBody::Short => MarkdownConverter::new(context).convert(
            document
                .metadata
                .short()
                .as_ref()
                .unwrap_or(&document.description),
            None,
        ),
    };

    let heading_class = post_body_to_heading_class(post_body);

    html! {
        <article class="post">
            <header class="pb-0 mb-0">
                <div class="flex flex-col sm:flex-row items-start sm:items-center p-0 gap-[var(--meta-spacing)] text-[var(--color-secondary)] -mb-1 post-meta">
                    <div class="flex items-center gap-[var(--meta-spacing)]">
                        {date(document)}
                        " · "
                        <em>{document.document_type.to_string().to_lowercase()}</em>
                        " · "
                        {document.word_count.to_string()}
                        " words"
                    </div>
                    {if document.tags().is_some_and(|t| !t.is_empty()) { html! { <>
                        <div class="sm:hidden -mt-1">
                            {tags(document)}
                        </div>
                        <div class="hidden sm:flex items-center gap-[var(--meta-spacing)]">
                            " · "
                            {tags(document)}
                        </div>
                    </> }} else { paxhtml::Element::Empty } }
                </div>
                <a href={url} class="flex items-center p-0 no-underline post-title">
                    <h2 class={heading_class}>{break_on_colon(&document.metadata.title)}</h2>
                </a>
            </header>
            <div class={format!("post-body {}", if post_body != PostBody::Short { POST_BODY_MARGIN_CLASS } else { "" })}>
                {post_body_rendered}
            </div>
        </article>
    }
}

/// Gets the class for the heading of a post body.
pub fn post_body_to_heading_class(post_body: PostBody) -> &'static str {
    match post_body {
        PostBody::Full | PostBody::Description => "text-2xl font-bold",
        PostBody::Short => "text-xl font-bold",
    }
}

fn document_to_html_list(context: ViewContext, document: &Document) -> Option<paxhtml::Element> {
    let heading_hierarchy =
        HeadingHierarchy::from_node(context, document.rest_of_content.as_ref()?);

    fn build_list_recursively(children: &[HeadingHierarchy], toplevel: bool) -> paxhtml::Element {
        if children.is_empty() {
            return paxhtml::Element::Empty;
        }

        html! {
            <ul>
                {if toplevel {
                    // Bodge: use lowercase introduction text if all of the headings are lowercase
                    let all_headings_lowercase = children.iter().all(|h| h.heading_text.to_lowercase() == h.heading_text);
                    let introduction_text = if all_headings_lowercase {
                        "introduction"
                    } else {
                        "Introduction"
                    };

                    html! {
                        <li>
                            <Link underline target={"#"}>
                                {introduction_text}
                            </Link>
                        </li>
                    }
                } else {
                    paxhtml::Element::Empty
                }}
                #{children.iter().map(build_list_item_recursively)}
            </ul>
        }
    }

    fn build_list_item_recursively(
        HeadingHierarchy {
            heading,
            heading_text,
            children,
        }: &HeadingHierarchy,
    ) -> paxhtml::Element {
        html! {
            <li>
                <Link underline target={format!("#{}", util::slugify(heading_text))}>
                    {heading.clone()}
                </Link>
                {build_list_recursively(children, false)}
            </li>
        }
    }

    Some(build_list_recursively(&heading_hierarchy, true)).filter(|e| !e.is_empty())
}
