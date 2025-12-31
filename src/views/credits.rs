use paxhtml::bumpalo;

use super::*;

use crate::{markdown::MarkdownConverter, views::posts};

pub fn index<'bump, 'a>(context: ViewContext<'bump, 'a>) -> paxhtml::Document<'bump> {
    let bump = context.bump;
    let content = &context.content;
    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
        },
        CurrentPage::Home,
        html! { in bump;
            <article>
                <a href={Route::Credits.url_path()} class={posts::post_body_to_heading_class(posts::PostBody::Full)}>
                    <h2>"Credits"</h2>
                </a>
                <div class={format!("post-body {}", posts::POST_BODY_MARGIN_CLASS)}>
                    {MarkdownConverter::new(context).with_sidenotes().convert(&content.credits.description, None)}
                </div>
            </article>
        },
    )
}
