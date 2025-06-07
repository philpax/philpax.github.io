use super::*;
use crate::views::posts;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let all_posts = context
        .content
        .blog
        .documents
        .iter()
        .map(|doc| posts::post(context, doc, posts::PostBody::Description));
    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::Blog.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        html! {
            <>
                <div class="*:mb-8">
                    #{all_posts}
                </div>
            </>
        },
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Document {
    let hero_image = document.hero_filename_and_alt.as_ref().map(|(f, _)| {
        document
            .route_path()
            .with_filename(f)
            .abs_url(context.website_base_url)
    });
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
            image: hero_image
                .clone()
                .or_else(|| Some(Route::Icon.route_path().abs_url(context.website_base_url))),
            url: Some(document.route_path().abs_url(context.website_base_url)),
            type_: Some("article".to_string()),
            twitter_card: hero_image
                .as_ref()
                .map(|_| "summary_large_image".to_string()),
            twitter_image: hero_image,
            article_published_time: document.metadata.datetime(),
            article_tag: document
                .metadata
                .taxonomies
                .as_ref()
                .map(|t| t.tags.join(", ")),
        },
        posts::post(context, document, posts::PostBody::Full),
    )
}
