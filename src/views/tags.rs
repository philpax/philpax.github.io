use super::*;
use crate::{
    util,
    views::{components, posts},
};

pub fn index(context: ViewContext) -> paxhtml::Document {
    let mut tag_keys = context.content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(
        context,
        SocialMeta {
            title: Some("Tags".to_string()),
            description: Some(format!("All tags on {}", context.website_name)),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::Tags.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        CurrentPage::Tags,
        html! {
            <ul class="list-none m-0 list-inside">
            #{
                tag_keys.iter().map(|tag| {
                    let item_count = context.content.tags[*tag].len();
                    html! {
                        <li class="list-disc">
                            {components::link(
                                true,
                                format!("Tag: {tag}"),
                                Route::Tag { tag_id: tag.to_string() }.url_path(),
                                "",
                                format!("#{tag}").into()
                            )}
                            {format!(
                                " ({} {})",
                                item_count,
                                util::pluralize("item", item_count)
                            )}
                        </li>
                    }
                })
            }
            </ul>
        },
    )
}

pub fn tag(context: ViewContext, tag_id: &str) -> paxhtml::Document {
    let content = &context.content;

    // Collect all documents with this tag
    let mut tagged_documents = Vec::new();
    for doc_id in &content.tags[tag_id] {
        if let Some(doc) = content.document_by_id(doc_id) {
            tagged_documents.push(doc);
        }
    }

    // Sort by date, newest first
    tagged_documents.sort_by_key(|d| d.metadata.datetime());
    tagged_documents.reverse();

    layout(
        context,
        SocialMeta {
            title: Some(format!("#{tag_id}")),
            description: Some(format!("All content tagged with {tag_id}")),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(
                Route::Tag {
                    tag_id: tag_id.to_string(),
                }
                .abs_url(context.website_base_url),
            ),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: Some(tag_id.to_string()),
        },
        CurrentPage::Tags,
        html! {
            <>
                <header class="text-center mb-4">
                    <a href={Route::Tag { tag_id: tag_id.to_string() }.url_path()}>
                        <h1 class="text-3xl font-bold">
                            {"#"}{tag_id}
                            <small class="text-[var(--color-secondary)]">
                                {format!(" ({} {})", tagged_documents.len(), util::pluralize("item", tagged_documents.len()))}
                            </small>
                        </h1>
                    </a>
                </header>
                <div class="*:mb-8">
                #{
                    tagged_documents.iter().map(|doc| {
                        posts::post(context, doc, posts::PostBody::Description)
                    })
                }
                </div>
            </>
        },
    )
}
