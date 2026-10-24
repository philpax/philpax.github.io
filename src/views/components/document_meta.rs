use paxhtml::{Element, bumpalo::Bump, html};

use super::{A, AProps, TagList, TagListProps, display_date};
use crate::{
    content::{Document, DocumentType},
    views::document::DRAFT,
};

/// Facts shown in a full document heading or a listing summary.
#[derive(Clone, Copy)]
pub enum MetadataLayout {
    Document,
    Summary,
}

/// A document's facts and tags, with slashes between nonempty segments.
pub fn document_meta<'a>(
    bump: &'a Bump,
    document: &Document,
    layout: MetadataLayout,
    folders: Vec<(String, Option<String>)>,
) -> Element<'a> {
    let full = matches!(layout, MetadataLayout::Document);
    let kind = full
        .then_some(match document.document_type {
            DocumentType::Blog => Some("Post"),
            DocumentType::Update => Some("Update"),
            DocumentType::Note => None,
        })
        .flatten();
    let tags = document.tags().cloned().unwrap_or_default();
    let segments = [
        kind.map(|kind| ("metadata-kind", html! { in bump; <span>{kind}</span> })),
        Some(("metadata-date", document_time(bump, document))),
        full.then(|| ("metadata-words", html! { in bump;
            <span>{format!("{} words", crate::util::number_to_comma_separated_string(document.word_count))}</span>
        })),
        (!folders.is_empty()).then(|| ("metadata-folders", folder_path(bump, folders))),
        document.metadata.draft.then(|| ("metadata-draft", html! { in bump; <em>{DRAFT}</em> })),
        (!tags.is_empty()).then(|| ("metadata-tags", html! { in bump; <TagList tags={tags} /> })),
    ];
    let class = match layout {
        MetadataLayout::Document => "metadata metadata-document",
        MetadataLayout::Summary => "metadata metadata-summary",
    };
    html! { in bump;
        <div class={class}>
            #{segments.into_iter().flatten().enumerate().map(|(i, (class, segment))| html! { in bump;
                <div class={format!("metadata-segment {class}")}>
                    {(i > 0).then(|| separator(bump))}
                    {segment}
                </div>
            })}
        </div>
    }
}

/// Publish date of a post or update, or a note's last modification date.
pub fn document_time<'a>(bump: &'a Bump, document: &Document) -> Element<'a> {
    let when = match document.document_type {
        DocumentType::Note => document
            .metadata
            .last_modified
            .or(document.metadata.datetime),
        _ => document.metadata.datetime,
    }
    .unwrap_or_else(|| panic!("No datetime for {document}"));
    html! { in bump;
        <time datetime={when.to_rfc3339()}>{display_date(when.date_naive())}</time>
    }
}

/// A note's parent folders, linking only to folders with an index page.
pub fn folder_path<'a>(bump: &'a Bump, folders: Vec<(String, Option<String>)>) -> Element<'a> {
    html! { in bump;
        <span class="dated-path">
            #{folders.into_iter().enumerate().map(|(i, (name, route))| html! { in bump;
                <>
                    {(i > 0).then(|| separator(bump))}
                    {match route {
                        Some(route) => html! { in bump; <A href={route}>{name}</A> },
                        None => html! { in bump; <span>{name}</span> },
                    }}
                </>
            })}
        </span>
    }
}

fn separator(bump: &Bump) -> Element<'_> {
    html! { in bump; <span ariaHidden="true">" / "</span> }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::TimeZone;

    fn render(
        document: &Document,
        layout: MetadataLayout,
        folders: Vec<(String, Option<String>)>,
    ) -> String {
        let bump = Bump::new();
        paxhtml::Document::new(&bump, [document_meta(&bump, document, layout, folders)])
            .write_to_string()
            .unwrap()
            .split_whitespace()
            .collect()
    }

    fn document(kind: DocumentType) -> Document {
        let mut document = Document::empty();
        document.base.document_type = kind;
        document.base.metadata.datetime =
            Some(chrono::Utc.with_ymd_and_hms(2025, 1, 1, 0, 0, 0).unwrap());
        document.base.metadata.last_modified =
            Some(chrono::Utc.with_ymd_and_hms(2025, 1, 2, 0, 0, 0).unwrap());
        document.word_count = 1234;
        document
    }

    #[test]
    fn document_and_summary_rows_separate_nonempty_segments() {
        for kind in [DocumentType::Blog, DocumentType::Update, DocumentType::Note] {
            let mut document = document(kind);
            for layout in [MetadataLayout::Document, MetadataLayout::Summary] {
                let html = render(&document, layout, vec![]);
                let full = matches!(layout, MetadataLayout::Document);
                let expected = if full {
                    1 + usize::from(kind != DocumentType::Note)
                } else {
                    0
                };
                assert_eq!(html.matches("aria-hidden=\"true\"").count(), expected);
                assert!(!html.contains("metadata-tags"));
                assert_eq!(html.contains("1,234words"), full);
                assert_eq!(
                    html.contains("<span>Post</span>"),
                    full && kind == DocumentType::Blog
                );
                assert_eq!(
                    html.contains("<span>Update</span>"),
                    full && kind == DocumentType::Update
                );
                let day = if kind == DocumentType::Note {
                    "02"
                } else {
                    "01"
                };
                assert!(html.contains(&format!("2025-01-{day}T00:00:00+00:00")));
            }
            document.base.metadata.draft = true;
            document.base.metadata.taxonomies = Some(paxsite_content::DocumentTaxonomies {
                tags: vec!["ai".into()],
            });
            for layout in [MetadataLayout::Document, MetadataLayout::Summary] {
                let html = render(&document, layout, vec![]);
                let expected = match layout {
                    MetadataLayout::Document => 3 + usize::from(kind != DocumentType::Note),
                    MetadataLayout::Summary => 2,
                };
                assert_eq!(
                    html.matches("aria-hidden=\"true\">/</span>").count(),
                    expected
                );
                assert!(html.find("<time").unwrap() < html.find("<em>draft</em>").unwrap());
                assert!(html.find("<em>draft</em>").unwrap() < html.find("metadata-tags").unwrap());
                assert!(html.contains("href=\"/tags/ai/\""));
            }
        }
    }

    #[test]
    fn note_paths_appear_before_tags_and_keep_unlinked_folders() {
        let mut note = document(DocumentType::Note);
        note.base.metadata.taxonomies = Some(paxsite_content::DocumentTaxonomies {
            tags: vec!["ai".into()],
        });
        let html = render(
            &note,
            MetadataLayout::Summary,
            vec![
                ("AI".into(), Some("/notes/ai/".into())),
                ("Missing < &".into(), None),
            ],
        );
        assert!(html.contains("href=\"/notes/ai/\""));
        assert!(html.contains("<span>Missing&lt;&amp;</span>"));
        assert!(html.find("<time").unwrap() < html.find("dated-path").unwrap());
        assert!(html.find("dated-path").unwrap() < html.find("metadata-tags").unwrap());
        assert_eq!(html.matches("aria-hidden=\"true\">/</span>").count(), 3);
    }

    #[test]
    fn notes_without_modification_dates_use_their_creation_date() {
        let mut note = document(DocumentType::Note);
        note.base.metadata.last_modified = None;
        assert!(
            render(&note, MetadataLayout::Summary, vec![]).contains("2025-01-01T00:00:00+00:00")
        );
    }
}
