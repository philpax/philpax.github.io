use super::*;
use crate::views::{
    components::{A, AProps, TagLabel, TagLabelProps, TagLink, TagLinkProps},
    listings::{index_row, inline_markdown, page_head, summary_list},
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;
    // Most used first, then alphabetical.
    let mut tags: Vec<(&String, usize)> = content
        .tags
        .iter()
        .map(|(tag, docs)| (tag, docs.len()))
        .collect();
    tags.sort_by(|(a, a_count), (b, b_count)| b_count.cmp(a_count).then_with(|| a.cmp(b)));
    let max = tags.iter().map(|(_, count)| *count).max().unwrap_or(1);

    layout(
        context,
        SocialMeta {
            title: Some("Tags".to_string()),
            description: Some(format!("All tags on {}", context.website_name)),
            url: Some(Route::Tags.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        }
        .with_preview(
            context.website_base_url,
            &crate::og_image::page_image_path("tags"),
        ),
        CurrentPage::Tags,
        html! { in bump;
            <div class="frame-narrow">
                {page_head(bump, html! { in bump; {copy::tags::TITLE} }, Some(html! { in bump; {copy::tags::LEDE} }))}
                <div class="index-groups">
                    {index_row(
                        bump,
                        html! { in bump; {copy::labels::SUBJECTS} },
                        Some(html! { in bump; {copy::tags::count(tags.len())} }),
                        html! { in bump;
                            <ul class="tag-index">
                                #{tags.iter().map(|(tag, count)| html! { in bump;
                                    <li>
                                        <TagLink tag={tag.to_string()} />
                                        <span ariaHidden="true" class="tag-index-bar" style={format!("width: {:.1}%", *count as f64 / max as f64 * 100.0)}></span>
                                        <span class="tag-index-count">{count.to_string()}</span>
                                    </li>
                                })}
                            </ul>
                        },
                    )}
                </div>
            </div>
        },
    )
}

pub fn tag<'a>(context: ViewContext<'a>, tag_id: &str) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;

    let url = Route::Tag {
        tag_id: tag_id.to_string(),
    }
    .url_path();

    // Collect all documents with this tag
    let mut tagged_documents = Vec::new();
    for doc_id in &content.tags[tag_id] {
        if let Some(doc) = content.document_by_id(doc_id) {
            tagged_documents.push(doc);
        }
    }

    // Sort by date, newest first
    tagged_documents.sort_by_key(|d| d.metadata.datetime);
    tagged_documents.reverse();

    layout(
        context,
        SocialMeta {
            title: Some(format!("#{tag_id}")),
            description: Some(format!("All content tagged with {tag_id}")),
            url: Some(
                Route::Tag {
                    tag_id: tag_id.to_string(),
                }
                .abs_url(context.website_base_url),
            ),
            type_: Some("website".to_string()),
            article_tag: Some(tag_id.to_string()),
            ..Default::default()
        }
        .with_preview(
            context.website_base_url,
            &crate::og_image::tag_image_path(tag_id),
        ),
        CurrentPage::Tags,
        html! { in bump;
            <div class="frame-narrow">
                {page_head(
                    bump,
                    html! { in bump; <TagLabel tag={tag_id.to_string()} /> },
                    Some(inline_markdown(context, &content.tag_descriptions[tag_id], &url)),
                )}
                <div class="index-groups">
                    {index_row(
                        bump,
                        html! { in bump; {copy::labels::TAGGED} },
                        Some(html! { in bump; <A href={Route::Tags.url_path()}>{copy::tag::ALL_TAGS}</A> }),
                        if tagged_documents.is_empty() {
                            html! { in bump; <p class="empty-message">{copy::empty::TAG}</p> }
                        } else {
                            summary_list(context, tagged_documents.iter().copied(), "8")
                        },
                    )}
                </div>
            </div>
        },
    )
}
