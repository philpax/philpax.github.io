use super::*;

/// Under the title, finishing its sentence; here and in the page's preview.
pub const LEDE: &str =
    "can make all the difference in the world. But not this world. Alas, there’s nothing here.";

/// The 404 page GitHub Pages serves: credits-page layout with a link home.
pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;

    layout(
        context,
        SocialMeta {
            title: Some(CurrentPage::NotFound.name().to_string()),
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
                    <h1>{CurrentPage::NotFound.name()}</h1>
                    <p>{LEDE}</p>
                </header>
                <article class="plain-page-body">
                    <div class="prose">
                        <p><A href={Route::Index.url_path()}>"Back to the front page"</A></p>
                    </div>
                </article>
            </div>
        },
    )
}
