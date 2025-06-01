use super::*;

use crate::{markdown::MarkdownConverter, views::blog};

pub fn index(context: ViewContext) -> paxhtml::Document {
    let content = &context.content;
    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        html! {
            <article>
                <a href={Route::Credits.url_path()} class={blog::partials::post_body_to_heading_class(blog::partials::PostBody::Full)}>
                    <h2>"Credits"</h2>
                </a>
                <div class="post-body">
                    {MarkdownConverter::new(context.syntax).convert(&content.credits.description)}
                </div>
            </article>
        },
    )
}
