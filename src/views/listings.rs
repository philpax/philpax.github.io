//! Pieces shared by the indexes, tag pages and front page: page heads, index rows,
//! summaries and dated one-line rows.

use std::collections::HashSet;

use chrono::Datelike;
use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    content::{DocumentId, DocumentType},
    markdown::MarkdownConverter,
    views::components::{MetadataLayout, document_meta, document_time, folder_path},
};

/// Whether a post or update appears in the indexes and on the front page: drafts only do
/// in draft builds, where their rows say so.
pub fn listed(doc: &Document) -> bool {
    cfg!(feature = "draft") || !doc.metadata.draft
}

/// The heading that opens every index, tag page and plain page.
pub fn page_head<'a>(bump: &'a Bump, title: Element<'a>, lede: Option<Element<'a>>) -> Element<'a> {
    html! { in bump;
        <header class="page-head">
            <h1>{title}</h1>
            {lede.map(|lede| html! { in bump; <p>{lede}</p> })}
        </header>
    }
}

/// An index row: a margin label, entries in the column.
pub fn index_row<'a>(
    bump: &'a Bump,
    label: Element<'a>,
    note: Option<Element<'a>>,
    children: Element<'a>,
) -> Element<'a> {
    html! { in bump;
        <section class="index-row">
            <header>
                <h2>{label}</h2>
                {note.map(|note| html! { in bump; <p>{note}</p> })}
            </header>
            <div>{children}</div>
        </section>
    }
}

/// Posts or updates grouped into index rows by year, newest first, or a line saying there
/// are none.
pub fn year_groups<'a>(context: ViewContext<'a>, documents: &[&Document]) -> Element<'a> {
    let bump = context.bump;
    let mut years: Vec<i32> = vec![];
    for doc in documents {
        let year = datetime(doc).year();
        if !years.contains(&year) {
            years.push(year);
        }
    }
    html! { in bump;
        <>
        {documents.is_empty().then(|| html! { in bump;
            <p class="empty-message">"nothing here yet"</p>
        })}
        <div class="index-groups">
            #{years.into_iter().map(|year| {
                let group = documents.iter().filter(|d| datetime(d).year() == year);
                index_row(
                    bump,
                    html! { in bump; {year.to_string()} },
                    None,
                    summary_list(context, group.copied(), "8"),
                )
            })}
        </div>
        </>
    }
}

/// A column of summaries, `step` apart on the spacing scale.
pub fn summary_list<'a, 'd>(
    context: ViewContext<'a>,
    documents: impl Iterator<Item = &'d Document>,
    step: &str,
) -> Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <ul class="stack" style={gap(step)}>
            #{documents.map(|doc| html! { in bump; <li>{summary(context, doc)}</li> })}
        </ul>
    }
}

/// A document's title, date, tags, parent folders and short description.
pub fn summary<'a>(context: ViewContext<'a>, doc: &Document) -> Element<'a> {
    let bump = context.bump;
    let url = doc.route_path().url_path();
    let folders = if doc.document_type == DocumentType::Note {
        note_folders(context, doc)
    } else {
        vec![]
    };
    let short = match doc.document_type {
        DocumentType::Note => paxsite_content::md::note_excerpt(&doc.description)
            .map(|excerpt| html! { in bump; {excerpt} }),
        _ => doc
            .metadata
            .short
            .as_deref()
            .map(|short| inline_markdown(context, short, &url)),
    };
    html! { in bump;
        <article class="summary">
            <h3>
                <A href={url.clone()}>
                    <span>{inline_markdown(context, &doc.metadata.title, &url)}</span>
                </A>
            </h3>
            {document_meta(bump, doc, MetadataLayout::Summary, folders)}
            {short.map(|short| html! { in bump; <p>{short}</p> })}
        </article>
    }
}

/// Dated one-liners for updates and notes. A note's parent folders stack under its title.
pub fn dated_list<'a>(context: ViewContext<'a>, documents: &[&Document]) -> Element<'a> {
    let bump = context.bump;
    let note_ids = note_ids(context);
    html! { in bump;
        <ul class="stack" style={gap("2-5")}>
            #{documents.iter().map(|doc| {
                let folders = folders(doc, &note_ids);
                html! { in bump;
                    <li class="dated-row">
                        {document_time(bump, doc)}
                        <span class="dated-entry">
                            <A href={doc.route_path().url_path()}>{doc.metadata.title.clone()}</A>
                            {doc.metadata.draft.then(|| html! { in bump; <em>{document::DRAFT}</em> })}
                            {(!folders.is_empty()).then(|| folder_path(bump, folders))}
                        </span>
                    </li>
                }
            })}
        </ul>
    }
}

/// A note's parent folders by name, with each one's page route if it has one.
pub fn note_folders(context: ViewContext<'_>, doc: &Document) -> Vec<(String, Option<String>)> {
    folders(doc, &note_ids(context))
}

/// A `.stack`'s gap, from the spacing scale.
pub fn gap(step: &str) -> String {
    format!("--stack: var(--s-{step})")
}

/// A line of Markdown rendered inline, without a paragraph: titles, summaries, tag descriptions.
pub fn inline_markdown<'a>(
    context: ViewContext<'a>,
    markdown: &str,
    error_context: &str,
) -> Element<'a> {
    MarkdownConverter::new(context, error_context)
        .without_blocking_elements()
        .convert(&crate::content::parse_markdown(markdown), None)
}

// --- Private implementation details ---

fn datetime(doc: &Document) -> chrono::DateTime<chrono::Utc> {
    doc.metadata
        .datetime
        .unwrap_or_else(|| panic!("No datetime for {doc}"))
}

/// Every note's id.
fn note_ids<'a>(context: ViewContext<'a>) -> HashSet<&'a DocumentId> {
    context
        .content
        .notes
        .documents
        .all_documents()
        .into_iter()
        .map(|d| &d.id)
        .collect()
}

/// A note's parent folders by name, with each one's page route.
fn folders(doc: &Document, note_ids: &HashSet<&DocumentId>) -> Vec<(String, Option<String>)> {
    if doc.document_type != DocumentType::Note {
        return vec![];
    }
    let depth = doc.display_path.len().saturating_sub(1);
    (0..depth)
        .map(|i| {
            let id = doc.id[..=i].to_vec();
            let route = note_ids
                .contains(&id)
                .then(|| Route::Note { note_id: id }.url_path());
            (doc.display_path[i].clone(), route)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        content::{Content, DocumentLeafNode, DocumentNode},
        image_store::ImageStore,
        syntax::SyntaxHighlighter,
    };

    #[test]
    fn note_paths_link_each_parent_and_use_slashes() {
        let make_note = |parts: &[&str]| {
            let mut note = Document::empty();
            note.base.document_type = DocumentType::Note;
            note.base.display_path = parts.iter().map(|part| (*part).to_string()).collect();
            note.base.id = paxsite_content::display_path_to_id(&note.display_path);
            note.base.metadata.title = parts.last().unwrap().to_string();
            note.base.metadata.datetime = Some(chrono::Utc::now());
            note.base.metadata.taxonomies = Some(paxsite_content::DocumentTaxonomies {
                tags: vec!["ai".into()],
            });
            note.description = crate::content::parse_markdown("A < B & C. Another sentence.");
            note
        };
        let mut content = Content::empty();
        content.notes.documents.children.insert(
            "AI".into(),
            DocumentNode::Folder(crate::content::DocumentFolderNode {
                index: Some(DocumentLeafNode::Document(Box::new(make_note(&["AI"])))),
                folder_name: "AI".into(),
                children: std::collections::BTreeMap::from([(
                    "Links".into(),
                    DocumentNode::Folder(crate::content::DocumentFolderNode {
                        index: Some(DocumentLeafNode::Document(Box::new(make_note(&[
                            "AI", "Links",
                        ])))),
                        folder_name: "Links".into(),
                        children: std::collections::BTreeMap::from([(
                            "Agents".into(),
                            DocumentNode::Leaf(DocumentLeafNode::Document(Box::new(make_note(&[
                                "AI", "Links", "Agents",
                            ])))),
                        )]),
                    }),
                )]),
            }),
        );
        let note = content
            .document_by_id(
                DocumentType::Note,
                &vec!["ai".into(), "links".into(), "agents".into()],
            )
            .unwrap();
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
        let context = context.with_bump(&bump);
        let folders = note_folders(context, note);
        assert_eq!(
            folders,
            [
                ("AI".into(), Some("/notes/ai/".into())),
                ("Links".into(), Some("/notes/ai/links/".into())),
            ]
        );
        for element in [dated_list(context, &[note]), summary(context, note)] {
            let html = paxhtml::Document::new(&bump, [element])
                .write_to_string()
                .unwrap();
            assert!(html.contains("href=\"/notes/ai/\""));
            assert!(html.contains("href=\"/notes/ai/links/\""));
            assert!(html.contains("<span aria-hidden=\"true\"> / </span>"));
            assert!(!html.contains('·'));
            if html.contains("class=\"summary\"") {
                let meta = html
                    .split("class=\"metadata metadata-summary\"")
                    .nth(1)
                    .unwrap();
                assert!(meta.find("<time").unwrap() < meta.find("class=\"dated-path\"").unwrap());
                assert!(
                    meta.find("class=\"dated-path\"").unwrap()
                        < meta.find("class=\"tag-list\"").unwrap()
                );
                assert!(html.contains("<p>A &lt; B &amp; C.</p>"));
                assert!(!html.contains("Another sentence"));
            }
        }
    }

    #[test]
    fn missing_parent_pages_remain_unlinked() {
        let mut content = Content::empty();
        let mut parent = Document::empty();
        parent.base.document_type = DocumentType::Note;
        parent.base.id = vec!["ai".into()];
        content.notes.documents.children.insert(
            "AI".into(),
            DocumentNode::Leaf(DocumentLeafNode::Document(Box::new(parent))),
        );
        let mut note = Document::empty();
        note.base.document_type = DocumentType::Note;
        note.base.id = vec!["ai".into(), "missing".into(), "note".into()];
        note.base.display_path = vec!["AI".into(), "Missing".into(), "Note".into()];
        assert_eq!(
            folders(
                &note,
                &content
                    .notes
                    .documents
                    .all_documents()
                    .into_iter()
                    .map(|d| &d.id)
                    .collect()
            ),
            [
                ("AI".into(), Some("/notes/ai/".into())),
                ("Missing".into(), None),
            ]
        );
    }
}
