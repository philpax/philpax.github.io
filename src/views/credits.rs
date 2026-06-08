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
            {posts::post_title_link(bump, Route::Credits.url_path(), heading_class, html! { in bump; "Credits" })}
        </div>
    };

    layout(
        context,
        SocialMeta {
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Credits.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        },
        CurrentPage::Home,
        html! { in bump;
            <Segment tag={SegmentTag::Article} header={header} body_class={"post-body measured".to_string()}>
                {MarkdownConverter::new(context, Route::Credits.url_path()).with_sidenotes().convert_sectioned(&content.credits.description)}
            </Segment>
        },
    )
}
