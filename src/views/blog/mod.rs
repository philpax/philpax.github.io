use paxhtml::bumpalo::{self, Bump};

use super::*;
use crate::views::posts;

pub fn index<'bump>(bump: &'bump Bump, context: ViewContext) -> paxhtml::Document<'bump> {
    let all_posts = context
        .content
        .blog
        .documents
        .iter()
        .map(|doc| posts::post(bump, context, doc, posts::PostBody::Description));
    layout(
        bump,
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Blog.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
        },
        CurrentPage::Blog,
        html! { in bump;
            <>
                <div class="*:mb-8">
                    #{all_posts}
                </div>
            </>
        },
    )
}

pub fn post<'bump>(
    bump: &'bump Bump,
    context: ViewContext,
    document: &Document,
) -> paxhtml::Document<'bump> {
    let og_image_url = format!("{}{}", context.website_base_url, document.og_image_path());

    layout(
        bump,
        context,
        SocialMeta {
            title: Some(document.metadata.title.clone()),
            description: Some(
                document
                    .metadata
                    .short()
                    .unwrap_or_else(|| document.description.clone())
                    .to_string(),
            ),
            image: Some(og_image_url.clone()),
            url: Some(document.route_path().abs_url(context.website_base_url)),
            type_: Some("article".to_string()),
            twitter_card: Some("summary_large_image".to_string()),
            twitter_image: Some(og_image_url),
            article_published_time: document.metadata.datetime,
            article_modified_time: None,
            article_tag: document.tags().map(|t| t.join(", ")),
        },
        CurrentPage::Blog,
        posts::post(bump, context, document, posts::PostBody::Full),
    )
}
