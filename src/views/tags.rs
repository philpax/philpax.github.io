use super::*;
use crate::{
    util,
    views::{
        components::{Link, LinkProps, Section, SectionProps},
        posts,
    },
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let mut tag_keys = context.content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(
        context,
        SocialMeta {
            title: Some("Tags".to_string()),
            description: Some(format!("All tags on {}", context.website_name)),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Tags.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
            noindex: false,
            standard_site_uri: None,
        },
        CurrentPage::Tags,
        html! { in bump;
            <Section label={"tags".to_string()}>
                <ul class={format!("list-none m-0 flex flex-col gap-2 text-sm {CODE_FONT_STYLE}")}>
                #{
                    tag_keys.iter().map(|tag| {
                        let item_count = context.content.tags[*tag].len();
                        html! { in bump;
                            <li class="flex gap-2 items-baseline">
                                <Link underline title={format!("Tag: {tag}")} target={Route::Tag { tag_id: tag.to_string() }.url_path()}>
                                    {format!("#{tag}")}
                                </Link>
                                <span class="text-dim">
                                    {format!(
                                        "({} {})",
                                        item_count,
                                        util::pluralize("item", item_count)
                                    )}
                                </span>
                            </li>
                        }
                    })
                }
                </ul>
            </Section>
        },
    )
}

pub fn tag<'a>(context: ViewContext<'a>, tag_id: &str) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;

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
            image: Some(Route::Icon.abs_url(context.website_base_url)),
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
            article_modified_time: None,
            article_tag: Some(tag_id.to_string()),
            noindex: false,
            standard_site_uri: None,
        },
        CurrentPage::Tags,
        html! { in bump;
            <Section label={format!("tag: {tag_id}")}>
                <header class="mb-6">
                    <div class={format!("kicker {CODE_FONT_STYLE}")} ariaHidden="true">"// filtered by tag"</div>
                    <a href={Route::Tag { tag_id: tag_id.to_string() }.url_path()} class="no-underline">
                        <h1 class="text-3xl font-bold text-phosphor [text-shadow:var(--glow)]">
                            {"#"}{tag_id}
                            <small class={format!("text-dim text-base font-normal ml-2 {CODE_FONT_STYLE}")}>
                                {format!("({} {})", tagged_documents.len(), util::pluralize("item", tagged_documents.len()))}
                            </small>
                        </h1>
                    </a>
                </header>
                <div class="[&>*]:py-6 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*:not(:first-child)]:hairline">
                #{
                    tagged_documents.iter().map(|doc| {
                        posts::post(context, doc, posts::PostBody::Description)
                    })
                }
                </div>
            </Section>
        },
    )
}
