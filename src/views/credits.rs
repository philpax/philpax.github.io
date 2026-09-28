use super::*;

use crate::{
    markdown::MarkdownConverter,
    views::listings::{inline_markdown, page_head},
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;
    let url = Route::Credits.url_path();

    layout(
        context,
        SocialMeta {
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        },
        CurrentPage::Credits,
        html! { in bump;
            <div class="frame-narrow">
                {page_head(
                    bump,
                    html! { in bump; <span>{inline_markdown(context, &content.credits.metadata.title, &url)}</span> },
                    Some(html! { in bump; {copy::credits::LEDE} }),
                )}
                <article class="plain-page-body">
                    <div class="prose">
                        {MarkdownConverter::new(context, &url).with_sidenotes().convert_sectioned(&content.credits.description)}
                    </div>
                </article>
            </div>
        },
    )
}
