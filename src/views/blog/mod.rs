use super::*;

pub mod partials;
pub mod tags;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let all_posts = context
        .content
        .blog
        .documents
        .iter()
        .map(|doc| partials::post(context, doc, partials::PostBody::Description));
    layout(
        context,
        SocialMeta {
            title: Some(context.website_name.to_string()),
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
                {partials::header(partials::HeaderFocus::AllPosts)}
                #{all_posts}
            </>
        },
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Document {
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
            // TODO: support images
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(document.route_path().abs_url(context.website_base_url)),
            type_: Some("article".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: document.metadata.datetime(),
            article_tag: document
                .metadata
                .taxonomies
                .as_ref()
                .map(|t| t.tags.join(", ")),
        },
        partials::post(context, document, partials::PostBody::Full),
    )
}
