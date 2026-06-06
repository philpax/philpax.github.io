use super::*;

use crate::{
    markdown::MarkdownConverter,
    views::{
        components::{Segment, SegmentProps, SegmentTag},
        posts,
    },
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;

    // Mirror a post's title band: clickable title in the segment header.
    let heading_class = posts::post_body_to_heading_class(posts::PostBody::Full);
    let header = html! { in bump;
        <div class="flex flex-col">
            <a href={Route::Credits.url_path()} class="block no-underline post-title group">
                <h2 class={format!("{heading_class} text-phosphor group-hover:text-hot transition-colors")}>
                    "Credits"
                </h2>
            </a>
        </div>
    };

    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
            noindex: false,
            standard_site_uri: None,
        },
        CurrentPage::Home,
        html! { in bump;
            <Segment tag={SegmentTag::Article} header={header} body_class={"post-body measured".to_string()}>
                {MarkdownConverter::new(context, Route::Credits.url_path()).with_sidenotes().convert_sectioned(&content.credits.description)}
            </Segment>
        },
    )
}
