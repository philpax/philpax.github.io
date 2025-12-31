use paxhtml::bumpalo;

use super::*;
use crate::views::posts;

pub fn index<'bump, 'a>(context: ViewContext<'bump, 'a>) -> paxhtml::Document<'bump> {
    let bump = context.bump;
    let all_posts = context
        .content
        .updates
        .documents
        .iter()
        .map(|doc| posts::post(context, doc, posts::PostBody::Description));
    layout(
        context,
        SocialMeta {
            title: Some("Updates".to_string()),
            description: Some(format!("All updates from {}", context.website_name)),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Updates.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
        },
        CurrentPage::Updates,
        html! { in bump;
            <>
                <div class="*:mb-8">
                    #{all_posts}
                </div>
            </>
        },
    )
}

pub fn post<'bump, 'a>(
    context: ViewContext<'bump, 'a>,
    document: &crate::content::Document,
) -> paxhtml::Document<'bump> {
    let og_image_url = format!("{}{}", context.website_base_url, document.og_image_path());

    layout(
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
        CurrentPage::Updates,
        posts::post(context, document, posts::PostBody::Full),
    )
}
