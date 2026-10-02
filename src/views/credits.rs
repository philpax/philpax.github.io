use super::*;

use crate::{
    markdown::MarkdownConverter,
    views::listings::{inline_markdown, page_head},
};

/// Under the page's title, here and in its preview.
pub const LEDE: &str = "who’s to blame for this, then?";

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;
    let url = Route::Credits.url_path();

    layout(
        context,
        SocialMeta {
            description: Some(context.website_description.to_string()),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        }
        .with_preview(
            context.website_base_url,
            &crate::og_image::page_image_path("credits"),
        ),
        CurrentPage::Credits,
        html! { in bump;
            <div class="frame-narrow">
                {page_head(
                    bump,
                    html! { in bump; <span>{inline_markdown(context, &content.credits.metadata.title, &url)}</span> },
                    Some(html! { in bump; {LEDE} }),
                )}
                <article class="plain-page-body prose">
                    {MarkdownConverter::new(context, &url).convert_blocks(&crate::markdown::document_root(&content.credits))}
                </article>
            </div>
        },
    )
}
