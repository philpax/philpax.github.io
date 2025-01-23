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

#[derive(Clone, PartialEq, Eq)]
pub enum PostBody {
    Full { toc: Option<paxhtml::Element> },
    Description,
    Short,
}
pub fn post(context: ViewContext, document: &Document, post_body: PostBody) -> paxhtml::Element {
    let url = document.route_path().url_path();

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
                {match post_body {
                    PostBody::Full { toc }=> paxhtml::Element::from_iter(
                        std::iter::once(markdown::convert_to_html(context.syntax, &document.description))
                            .chain(toc.into_iter())
                            .chain(document.rest_of_content.as_ref().map(|c|
                                markdown::convert_to_html(context.syntax, c)
                            ))
                    ),
                    PostBody::Description => html! {
                        <>
                            {markdown::convert_to_html(context.syntax, &document.description)}
                            <p>
                                <a href={url}>"Read more"</a>
                            </p>
                        </>
                    },
                    PostBody::Short => markdown::convert_to_html(
                        context.syntax,
                        document.metadata.short().as_ref().unwrap_or(&document.description),
                    ),
                }}
            </div>
        </article>
    }
}
