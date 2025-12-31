use paxhtml::bumpalo::{self, Bump};

use super::*;

use crate::{markdown::MarkdownConverter, views::posts};

pub fn index<'bump>(bump: &'bump Bump, context: ViewContext) -> paxhtml::Document<'bump> {
    let content = &context.content;
    layout(
        bump,
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
                    {MarkdownConverter::new(bump, context).with_sidenotes().convert(&content.credits.description, None)}
                </div>
            </article>
        },
    )
}
