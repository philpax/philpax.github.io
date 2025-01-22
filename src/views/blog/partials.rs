use super::*;
use crate::markdown;

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
            " · "
            <a href={Route::BlogTags.url_path()} class={class(focus == HeaderFocus::Tags)}>"Tags"</a>
            {match focus {
                HeaderFocus::Tag(tag) => html! {
                    <>
                        " · "
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

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
    Description,
    Short,
}
pub fn post(context: ViewContext, document: &Document, post_body: PostBody) -> paxhtml::Element {
    let url = document.route_path().url_path();
    let short = document.metadata.short();
    let body = match post_body {
        PostBody::Full => &document.content,
        PostBody::Description => document.description.as_ref().unwrap_or(&document.content),
        PostBody::Short => short.as_ref().unwrap_or(&document.content),
    };

    html! {
        <article class="post">
            <header>
                <div class="post-meta">
                    {date(document)}
                    " · "
                    {tags(document)}
                </div>
                <a href={url} class="post-title no-underline">
                    <h2>{break_on_colon(&document.metadata.title)}</h2>
                </a>
            </header>
            <div class="post-body">
                {markdown::convert_to_html(context.syntax, body)}
                {if post_body == PostBody::Description {
                    html! {
                        <p>
                            <a href={url}>"Read more"</a>
                        </p>
                    }
                } else {
                    paxhtml::Element::Empty
                }}
            </div>
        </article>
    }
}
