use super::*;

/// The 404 page GitHub Pages serves: credits-page layout with a link home.
pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;

    layout(
        context,
        SocialMeta {
            title: Some(copy::not_found::TITLE.to_string()),
            description: Some(context.website_description.to_string()),
            type_: Some("website".to_string()),
            ..Default::default()
        }
        .with_preview(
            context.website_base_url,
            &crate::og_image::page_image_path("404"),
        ),
        CurrentPage::NotFound,
        html! { in bump;
            <div class="frame-narrow">
                <header class="page-head run-on">
                    <h1>{copy::not_found::TITLE}</h1>
                    <p>{copy::not_found::LEDE}</p>
                </header>
                <article class="plain-page-body">
                    <div class="prose">
                        <p><A href={Route::Index.url_path()}>{copy::not_found::HOME_LINK}</A></p>
                    </div>
                </article>
            </div>
        },
    )
}
