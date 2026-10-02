use super::*;
use crate::views::{
    document,
    listings::{listed, page_head, year_groups},
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let documents: Vec<&Document> = context
        .content
        .updates
        .documents
        .iter()
        .filter(|d| listed(d))
        .collect();
    layout(
        context,
        SocialMeta {
            title: Some("Updates".to_string()),
            description: Some(format!("All updates from {}", context.website_name)),
            url: Some(Route::Updates.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        }
        .with_preview(
            context.website_base_url,
            &crate::og_image::page_image_path("updates"),
        ),
        CurrentPage::Updates,
        html! { in bump;
            <div class="frame-narrow">
                {page_head(bump, html! { in bump; {copy::updates::TITLE} }, Some(html! { in bump; {copy::updates::LEDE} }))}
                {documents.is_empty().then(|| html! { in bump;
                    <p class="empty-message">{copy::empty::INDEX}</p>
                })}
                {year_groups(context, &documents)}
            </div>
        },
    )
}

pub fn post<'a>(
    context: ViewContext<'a>,
    document: &crate::content::Document,
) -> paxhtml::Document<'a> {
    let og_image_url = format!("{}{}", context.website_base_url, document.og_image_path());

    layout(
        context,
        SocialMeta {
            title: Some(document.metadata.title.clone()),
            description: Some(
                document
                    .metadata
                    .short_markdown()
                    .unwrap_or_else(|| document.description.clone())
                    .to_string(),
            ),
            image: Some(og_image_url.clone()),
            url: Some(document.route_path().abs_url(context.website_base_url)),
            type_: Some("article".to_string()),
            twitter_card: Some("summary_large_image".to_string()),
            twitter_image: Some(og_image_url),
            article_published_time: document.metadata.datetime,
            article_tag: document.tags().map(|t| t.join(", ")),
            noindex: document.metadata.draft,
            standard_site_uri: document
                .metadata
                .standard_site
                .as_ref()
                .map(|s| s.uri.clone()),
            ..Default::default()
        },
        CurrentPage::Updates,
        document::page(context, document),
    )
}
