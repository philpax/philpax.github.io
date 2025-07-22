use super::*;
use crate::{
    markdown::{HeadingHierarchy, MarkdownConverter},
    syntax::SyntaxHighlighter,
    util,
};

pub const POST_BODY_CONTENT_MARGIN_LEFT_CLASS: &str = "ml-4";
// uses `POST_BODY_CONTENT_MARGIN_LEFT_CLASS` for child paragraphs; can't construct dynamically
// because tailwind looks for full class names
pub const POST_BODY_MARGIN_CLASS: &str =
    "*:mb-4 [&>h1]:mb-0 [&>h2]:mb-0 [&>h3]:mb-0 [&>h4]:mb-0 [&>h5]:mb-0 [&>h6]:mb-0 [&>p]:ml-4";

pub fn tags(document: &Document) -> paxhtml::Element {
    document
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| {
            let tags = t.tags.iter().map(|tag| {
                html! {
                    <li class="inline-block mr-[var(--meta-spacing)] last:mr-0">
                        {components::link(false, format!("Tag: {tag}"), Route::Tag { tag_id: tag }.url_path(), "", format!("#{tag}").into())}
                    </li>
                }
            });
            html! { <ul class="list-none m-0 p-0 inline-block">#{tags}</ul> }
        })
        .unwrap_or_default()
}

pub fn date(document: &Document) -> paxhtml::Element {
    document
        .metadata
        .datetime()
        .map(|dt| dt.date_naive())
        .map(crate::elements::date_with_chrono)
        .unwrap_or_default()
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
            let mut elements = vec![];

            let h3_classname = "text-lg font-bold";

            let toc = document_to_html_list(context.syntax, document);
            if let Some(hierarchy_list) = toc.clone() {
                elements.push(html! {
                    <aside class="toc sticky top-4 float-right -mr-64 mt-0 w-60 hidden 2xl:block" id="toc-sticky">
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        {hierarchy_list}
                    </aside>
                });
            }

            if let Some((filename, alt)) = &document.hero_filename_and_alt {
                elements.push(html! {
                    <img src={route_path.with_filename(filename).url_path()} alt={format!("Hero image: {alt}")} class="my-2 border-4 border-[var(--color)] hero-image" />
                });
            }
            elements
                .push(MarkdownConverter::new(context.syntax).convert(&document.description, None));

            if let Some(hierarchy_list) = toc {
                elements.push(html! {
                    <aside class="toc 2xl:hidden" id="toc-inline">
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        <div class={POST_BODY_CONTENT_MARGIN_LEFT_CLASS}>
                            {hierarchy_list}
                        </div>
                    </aside>
                });
            }

            if let Some(content) = document.rest_of_content.as_ref() {
                elements.push(MarkdownConverter::new(context.syntax).convert(content, None));
            }

            paxhtml::Element::from(elements)
        }
        PostBody::Description => html! {
            <>
                {MarkdownConverter::new(context.syntax).convert(&document.description, None)}
                <p>
                    {components::link(true, None, url.clone(), "", "Read more".into())}
                </p>
            </>
        },
        PostBody::Short => MarkdownConverter::new(context.syntax).convert(
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
                <div class="flex items-center p-0 gap-[var(--meta-spacing)] text-[var(--color-secondary)] -mb-1 post-meta">
                    {date(document)}
                    " · "
                    {tags(document)}
                    " · "
                    {document.word_count.to_string()}
                    " words"
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

fn document_to_html_list(
    syntax: &SyntaxHighlighter,
    document: &Document,
) -> Option<paxhtml::Element> {
    let heading_hierarchy = HeadingHierarchy::from_node(syntax, document.rest_of_content.as_ref()?);

    fn build_list_recursively(children: &[HeadingHierarchy], toplevel: bool) -> paxhtml::Element {
        if children.is_empty() {
            return paxhtml::Element::Empty;
        }

        html! {
            <ul>
                {if toplevel {
                    html! {
                        <li>
                            {components::link(true, None, "#".to_string(), "", "Introduction".into())}
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
                {components::link(true, None, format!("#{}", util::slugify(heading_text)), "", heading.clone())}
                {build_list_recursively(children, false)}
            </li>
        }
    }

    Some(build_list_recursively(&heading_hierarchy, true)).filter(|e| !e.is_empty())
}
