use super::*;
use crate::views::posts;

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
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

pub fn post<'a>(context: ViewContext<'a>, document: &Document) -> paxhtml::Document<'a> {
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
        CurrentPage::Blog,
        posts::post(context, document, posts::PostBody::Full),
    )
}
