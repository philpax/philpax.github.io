use super::*;
use crate::{util, views::components};

pub fn index(context: ViewContext) -> paxhtml::Document {
    let mut tag_keys = context.content.blog.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(
        context,
        SocialMeta {
            title: Some("Tags".to_string()),
            description: Some(format!("All tags on {}", context.website_name)),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::BlogTags.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        html! {
            <>
                {partials::header(partials::HeaderFocus::Tags)}
                <ul id="tags-list-index" class="list-none m-0 list-inside">
                #{
                    tag_keys.iter().map(|tag| {
                        let post_count = context.content.blog.tags[*tag].len();
                        html! {
                            <li class="list-disc">
                                {components::link(true, format!("Tag: {tag}"), Route::BlogTag { tag_id: tag }.url_path(), format!("#{tag}").into())}
                                {format!(
                                    " ({} {})",
                                    post_count,
                                    util::pluralize("post", post_count)
                                )}
                            </li>
                        }
                    })
                }
                </ul>
            </>
        },
    )
}

pub fn tag(context: ViewContext, tag_id: &str) -> paxhtml::Document {
    let blog = &context.content.blog;
    layout(
        context,
        SocialMeta {
            title: Some(format!("#{tag_id}")),
            description: Some(format!("All posts tagged with {tag_id}")),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::BlogTag { tag_id }.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: Some(tag_id.to_string()),
        },
        html! {
            <>
                {partials::header(partials::HeaderFocus::Tag(tag_id))}
                #{
                    blog.tags[tag_id].iter().map(|t| {
                        let doc = blog.document_by_id(t).unwrap();
                        partials::post(context, doc, partials::PostBody::Description)
                    })
                }
            </>
        },
    )
}
