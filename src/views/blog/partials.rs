use super::*;
use crate::{markdown, util};

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
    Description,
}
pub fn post(context: ViewContext, document: &Document, post_body: PostBody) -> paxhtml::Element {
    let post_url = context.content.blog.route_path(document).url_path();
    let mut post_body_html = vec![markdown::convert_to_html(
        context.syntax,
        &match post_body {
            PostBody::Full => None,
            PostBody::Description => document.description.clone(),
        }
        .unwrap_or(document.content.clone()),
    )];

    if post_body == PostBody::Description {
        post_body_html.push(html! {
            <p>
                <a href={post_url}>"Read more"</a>
            </p>
        });
    }

    let tag_list = document
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| {
            html! {
                <ul class="tags">
                #{
                    t.tags.iter().map(|tag| { html! {
                        <li>
                            <a href={Route::BlogTag { tag_id: tag }.url_path()}>{format!("#{tag}")}</a>
                        </li>
                    }})
                }
                </ul>
            }
        })
        .unwrap_or_default();

    let article = html! {
        <article class="post">
            <header>
                {h2_with_id(html! {
                    <a href={post_url}>
                        {document.metadata.title.clone()}
                    </a>
                })}
                {tag_list}
                {document
                    .metadata
                    .datetime()
                    .map(|dt| dt.date_naive())
                    .map(crate::elements::date_with_chrono)
                    .unwrap_or_default()}
            </header>
            <div class="post-body">
                {post_body_html}
            </div>
        </article>
    };

    if post_body != PostBody::Full {
        return vec![article].into();
    }

    let heading_hierarchy = markdown::HeadingHierarchy::from_node(&document.content);
    if heading_hierarchy.is_empty() {
        return vec![article].into();
    }

    fn build_list_recursively(hierarchy: &markdown::HeadingHierarchy) -> paxhtml::Element {
        let markdown::HeadingHierarchy { heading, children } = hierarchy;
        let link = html! {
            <a href={format!("#{}", util::slugify(heading))}>{heading}</a>
        };

        let mut body = vec![link];
        if !children.is_empty() {
            body.push(html! {
                <ul>
                    {children.iter().map(build_list_recursively).into_element()}
                </ul>
            });
        }
        html! {
            <li>
                {body}
            </li>
        }
    }

    let aside = html! {
        <aside>
            {h2_with_id("Contents")}
            <ul>
                {heading_hierarchy.iter().map(build_list_recursively).into_element()}
            </ul>
        </aside>
    };

    vec![article, aside].into()
}

pub fn frontpage_post(context: ViewContext, document: &Document) -> paxhtml::Element {
    let post_url = context.content.blog.route_path(document).url_path();
    let post_body_html = vec![markdown::convert_to_html(
        context.syntax,
        document
            .metadata
            .short()
            .as_ref()
            .unwrap_or(&document.content),
    )];

    let tag_list = document
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| {
            html! {
                <ul class="tags">
                #{
                    t.tags.iter().map(|tag| { html! {
                        <li>
                            <a href={Route::BlogTag { tag_id: tag }.url_path()}>{format!("#{tag}")}</a>
                        </li>
                    }})
                }
                </ul>
            }
        })
        .unwrap_or_default();

    html! {
        <article class="post">
            <header>
                {h2_with_id(html! {
                    <a href={post_url}>
                        {document.metadata.title.clone()}
                    </a>
                })}
            </header>
            <span>
                {document
                    .metadata
                    .datetime()
                    .map(|dt| dt.date_naive())
                    .map(crate::elements::date_with_chrono)
                    .unwrap_or_default()}
                " · "
                {tag_list}
            </span>
            <div class="post-body">
                {post_body_html}
            </div>
        </article>
    }
}
