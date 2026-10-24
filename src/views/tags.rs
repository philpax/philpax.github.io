use super::*;
use crate::{
    content::DocumentType,
    views::{
        components::{A, AProps, TagLabel, TagLabelProps, TagLink, TagLinkProps},
        listings::{index_row, inline_markdown, page_head, summary_list},
    },
};

/// Under the page's title, here and in its preview.
pub const LEDE: &str = "all tags across the 'site";

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
                {page_head(bump, html! { in bump; {CurrentPage::Tags.name()} }, Some(html! { in bump; {LEDE} }))}
                <div class="index-groups">
                    {index_row(
                        bump,
                        html! { in bump; "Subjects" },
                        Some(html! { in bump; {format!("{} {}", tags.len(), crate::util::pluralize("tag", tags.len()))} }),
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

    let tagged_documents: Vec<_> = content.tags[tag_id]
        .iter()
        .filter_map(|(kind, id)| content.document_by_id(*kind, id))
        .collect();

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
                <p><A href={Route::Tags.url_path()}>"All tags →"</A></p>
                {tagged_documents.is_empty().then(|| html! { in bump;
                    <p class="empty-message">"nothing has this tag"</p>
                })}
                {tag_groups(context, &tagged_documents)}
            </div>
        },
    )
}

fn tag_groups<'a>(context: ViewContext<'a>, documents: &[&Document]) -> Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <div class="index-groups">
            #{[
                (DocumentType::Blog, "Posts"),
                (DocumentType::Update, "Updates"),
                (DocumentType::Note, "Notes"),
            ].into_iter().filter_map(|(kind, label)| {
                let mut group: Vec<_> = documents.iter().copied()
                    .filter(|document| document.document_type == kind)
                    .collect();
                group.sort_by(|a, b| {
                    let when = |doc: &Document| match kind {
                        DocumentType::Note => doc.metadata.last_modified.or(doc.metadata.datetime),
                        _ => doc.metadata.datetime,
                    };
                    when(b).cmp(&when(a)).then_with(|| a.id.cmp(&b.id))
                });
                (!group.is_empty()).then(|| index_row(
                    bump,
                    html! { in bump; {label} },
                    None,
                    summary_list(context, group.into_iter(), "8"),
                ))
            })}
        </div>
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        content::{Content, DocumentCollection, DocumentLeafNode},
        image_store::ImageStore,
        syntax::SyntaxHighlighter,
    };
    use paxhtml::bumpalo::Bump;

    fn document(kind: DocumentType, title: &str, day: u32, modified_day: u32) -> Document {
        let mut document = Document::empty();
        document.base.document_type = kind;
        document.base.id = vec!["shared".into()];
        document.base.display_path = vec![title.into()];
        document.base.metadata.title = title.into();
        document.base.metadata.datetime = Some(
            chrono::DateTime::parse_from_rfc3339(&format!("2025-01-{day:02}T00:00:00Z"))
                .unwrap()
                .to_utc(),
        );
        document.base.metadata.last_modified = Some(
            chrono::DateTime::parse_from_rfc3339(&format!("2025-01-{modified_day:02}T00:00:00Z"))
                .unwrap()
                .to_utc(),
        );
        document.base.metadata.taxonomies = Some(paxsite_content::DocumentTaxonomies {
            tags: vec!["shared".into()],
        });
        document
    }

    fn render_tag(content: &Content) -> String {
        let syntax = SyntaxHighlighter::default();
        let image_store = ImageStore::new(content);
        let bump = Bump::new();
        let context = ViewContextBase {
            website_author: "test",
            website_name: "test",
            website_description: "test",
            website_base_url: "https://example.com",
            syntax: &syntax,
            content,
            image_store: &image_store,
            generation_date: chrono::Utc::now(),
            fast: true,
        };
        tag(context.with_bump(&bump), "shared")
            .write_to_string()
            .unwrap()
    }

    #[test]
    fn tag_page_separates_document_types_with_identical_ids() {
        let mut content = Content::empty();
        content.blog = DocumentCollection {
            documents: vec![document(DocumentType::Blog, "The post", 2, 2)],
            document_key_to_id: HashMap::from([(vec!["shared".into()], 0)]),
        };
        content.updates = DocumentCollection {
            documents: vec![document(DocumentType::Update, "The update", 3, 3)],
            document_key_to_id: HashMap::from([(vec!["shared".into()], 0)]),
        };
        content.notes.documents.index = Some(DocumentLeafNode::Document(Box::new(document(
            DocumentType::Note,
            "The note",
            1,
            4,
        ))));
        content.tags.insert(
            "shared".into(),
            [DocumentType::Blog, DocumentType::Update, DocumentType::Note]
                .into_iter()
                .map(|kind| (kind, vec!["shared".into()]))
                .collect(),
        );
        content
            .tag_descriptions
            .insert("shared".into(), "Shared subject".into());
        let html = render_tag(&content);
        let html: String = html.split_whitespace().collect();
        let posts = html.find("<h2>Posts</h2>").unwrap();
        let updates = html.find("<h2>Updates</h2>").unwrap();
        let notes = html.find("<h2>Notes</h2>").unwrap();
        assert!(posts < updates && updates < notes);
        assert!(html[posts..updates].contains("href=\"/blog/shared/\""));
        assert!(html[updates..notes].contains("href=\"/updates/shared/\""));
        assert!(html[notes..].contains("href=\"/notes/shared/\""));
        assert!(html[notes..].contains("2025-01-04T00:00:00+00:00"));
        for group in [&html[posts..updates], &html[updates..notes], &html[notes..]] {
            assert!(group.contains("<articleclass=\"summary\">"));
            assert!(group.contains("<divclass=\"summary-meta\"><time"));
            assert!(group.find("<h3>").unwrap() < group.find("<time").unwrap());
            assert!(!group.contains("class=\"dated-row\""));
        }
    }

    #[test]
    fn note_only_tag_omits_empty_groups() {
        let mut content = Content::empty();
        content.notes.documents.index = Some(DocumentLeafNode::Document(Box::new(document(
            DocumentType::Note,
            "The note",
            1,
            4,
        ))));
        content.tags.insert(
            "shared".into(),
            vec![(DocumentType::Note, vec!["shared".into()])],
        );
        content
            .tag_descriptions
            .insert("shared".into(), "Shared subject".into());
        let html: String = render_tag(&content).split_whitespace().collect();
        assert!(html.contains("<h2>Notes</h2>"));
        assert!(!html.contains("<h2>Posts</h2>"));
        assert!(!html.contains("<h2>Updates</h2>"));
    }

    #[test]
    fn tag_groups_sort_posts_by_publication_and_notes_by_modification() {
        let post_old = document(DocumentType::Blog, "Old post", 1, 5);
        let post_new = document(DocumentType::Blog, "New post", 2, 2);
        let note_old = document(DocumentType::Note, "Old note", 3, 3);
        let note_new = document(DocumentType::Note, "New note", 1, 4);
        let content = Content::empty();
        let syntax = SyntaxHighlighter::default();
        let image_store = ImageStore::new(&content);
        let bump = Bump::new();
        let context = ViewContextBase {
            website_author: "test",
            website_name: "test",
            website_description: "test",
            website_base_url: "https://example.com",
            syntax: &syntax,
            content: &content,
            image_store: &image_store,
            generation_date: chrono::Utc::now(),
            fast: true,
        };
        let groups = tag_groups(
            context.with_bump(&bump),
            &[&post_old, &note_old, &note_new, &post_new],
        );
        let html = paxhtml::Document::new(&bump, [groups])
            .write_to_string()
            .unwrap();
        assert!(html.find("New post").unwrap() < html.find("Old post").unwrap());
        assert!(html.find("New note").unwrap() < html.find("Old note").unwrap());
    }

    #[test]
    fn note_header_renders_native_tags() {
        let note = document(DocumentType::Note, "The note", 1, 4);
        let content = Content::empty();
        let syntax = SyntaxHighlighter::default();
        let image_store = ImageStore::new(&content);
        let bump = Bump::new();
        let context = ViewContextBase {
            website_author: "test",
            website_name: "test",
            website_description: "test",
            website_base_url: "https://example.com",
            syntax: &syntax,
            content: &content,
            image_store: &image_store,
            generation_date: chrono::Utc::now(),
            fast: true,
        };
        let head = document::head(context.with_bump(&bump), &note);
        let html = paxhtml::Document::new(&bump, [head])
            .write_to_string()
            .unwrap();
        assert!(html.contains("href=\"/tags/shared/\""));
        assert!(html.contains("class=\"tag-list\""));
    }
}
