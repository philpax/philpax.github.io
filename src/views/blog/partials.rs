use super::*;
use crate::{
    markdown::{HeadingHierarchy, MarkdownConverter},
    syntax::SyntaxHighlighter,
    util,
};

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum HeaderFocus<'a> {
    AllPosts,
    Tags,
    Tag(&'a str),
}
pub fn header(focus: HeaderFocus) -> paxhtml::Element {
    fn class(is_active: bool) -> &'static str {
        if is_active {
            "no-underline active"
        } else {
            "no-underline"
        }
    }

    html! {
        <header id="posts-header">
            <a href={Route::Blog.url_path()} class={class(focus == HeaderFocus::AllPosts)}>"All posts"</a>
            <a href={Route::BlogTags.url_path()} class={class(focus == HeaderFocus::Tags)}>"Tags"</a>
            {match focus {
                HeaderFocus::AllPosts => html! {
                    <>
                        <a href={Route::BlogRss.url_path()} class={class(false)}>
                            "RSS"
                        </a>
                    </>
                },
                HeaderFocus::Tag(tag) => html! {
                    <>
                        <a href={Route::BlogTag { tag_id: tag }.url_path()} class={class(true)}>
                            "#"{tag}
                        </a>
                    </>
                },
                _ => paxhtml::Element::Empty,
            }}
        </header>
    }
}

pub fn tags(document: &Document) -> paxhtml::Element {
    document
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| {
            let tags = t.tags.iter().map(|tag| {
                html! {
                    <li>
                        <a class="no-underline" href={Route::BlogTag { tag_id: tag }.url_path()}>{format!("#{tag}")}</a>
                    </li>
                }
            });
            html! { <ul class="tags">#{tags}</ul> }
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

#[derive(Clone, PartialEq, Eq)]
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
                    <aside class="toc" id="toc-sticky" hidden>
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        {hierarchy_list}
                    </aside>
                });
            }

            if let Some((filename, alt)) = &document.hero_filename_and_alt {
                elements.push(html! {
                    <img src={route_path.with_filename(filename).url_path()} alt={format!("Hero image: {alt}")} class="hero-image" />
                });
            }
            elements.push(MarkdownConverter::new(context.syntax).convert(&document.description));

            if let Some(hierarchy_list) = toc {
                elements.push(html! {
                    <aside class="toc" id="toc-inline">
                        <h3 class={h3_classname}>"Table of Contents"</h3>
                        {hierarchy_list}
                    </aside>
                });
            }

            if let Some(content) = document.rest_of_content.as_ref() {
                elements.push(MarkdownConverter::new(context.syntax).convert(content));
            }

            paxhtml::Element::from(elements)
        }
        PostBody::Description => html! {
            <>
                {MarkdownConverter::new(context.syntax).convert(&document.description)}
                <p>
                    <a href={url}>"Read more"</a>
                </p>
            </>
        },
        PostBody::Short => MarkdownConverter::new(context.syntax).convert(
            document
                .metadata
                .short()
                .as_ref()
                .unwrap_or(&document.description),
        ),
    };

    let heading_size = match post_body {
        PostBody::Full | PostBody::Description => "text-2xl",
        PostBody::Short => "text-xl",
    };

    html! {
        <article class="post">
            <header>
                <div class="post-meta">
                    {date(document)}
                    " · "
                    {tags(document)}
                    " · "
                    {document.word_count.to_string()}
                    " words"
                </div>
                <a href={url} class="post-title no-underline">
                    <h2 class={format!("{heading_size} font-bold")}>{break_on_colon(&document.metadata.title)}</h2>
                </a>
            </header>
            <div class="post-body">
                {post_body_rendered}
            </div>
        </article>
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
                        <li><a href="#">"Introduction"</a></li>
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
                <a href={format!("#{}", util::slugify(heading_text))}>{heading.clone()}</a>
                {build_list_recursively(children, false)}
            </li>
        }
    }

    Some(build_list_recursively(&heading_hierarchy, true)).filter(|e| !e.is_empty())
}
