use paxhtml::{Element, html};

use crate::{
    content::{Content, Document, DocumentLeafNode, DocumentNode, DocumentType},
    views::{
        ViewContext,
        components::{A, AProps, StatusYear, project_status},
        listings::{gap, inline_markdown},
    },
};

/// Immediate child pages, with subfolders before notes and each group sorted by title.
pub fn note_index_entries<'a>(content: &'a Content, document: &Document) -> Vec<&'a Document> {
    if document.document_type != DocumentType::Note {
        return vec![];
    }
    let Some(folder) = content
        .notes
        .documents
        .find_folder_for_document(&document.id)
    else {
        return vec![];
    };
    let mut entries: Vec<(bool, &Document)> = folder
        .children
        .values()
        .filter_map(|node| match node {
            DocumentNode::Folder(folder) => match &folder.index {
                Some(DocumentLeafNode::Document(document)) => {
                    Some((!folder.is_leaf(), document.as_ref()))
                }
                _ => None,
            },
            DocumentNode::Leaf(DocumentLeafNode::Document(document)) => {
                Some((false, document.as_ref()))
            }
            DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => None,
        })
        .collect();
    entries.sort_by_cached_key(|(folder, document)| {
        (
            !*folder,
            document.metadata.title.to_lowercase(),
            document.id.clone(),
        )
    });
    entries.into_iter().map(|(_, document)| document).collect()
}

/// Compact child-page titles and excerpts, or nothing when there are no child pages.
pub fn notes_index<'a>(context: ViewContext<'a>, entries: &[&Document]) -> Element<'a> {
    if entries.is_empty() {
        return Element::Empty;
    }
    let bump = context.bump;
    html! { in bump;
        <nav class="notes-index embed" ariaLabel="Notes in this folder">
            <ul class="stack" style={gap("4")}>
                #{entries.iter().map(|document| {
                    let url = document.route_path().url_path();
                    let excerpt = paxsite_content::md::note_excerpt(&document.description);
                    html! { in bump;
                        <li class="notes-index-entry">
                            <h3>
                                <A href={url.clone()}>{inline_markdown(context, &document.metadata.title, &url)}</A>
                                {document.metadata.status.as_ref().map(|status| html! { in bump;
                                    <span class="notes-index-status">{project_status(bump, status, StatusYear::Leading)}</span>
                                })}
                            </h3>
                            {excerpt.map(|excerpt| html! { in bump; <p>{excerpt}</p> })}
                        </li>
                    }
                })}
            </ul>
        </nav>
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        content::{DocumentFolderNode, DocumentId, RedirectNode},
        image_store::ImageStore,
        syntax::SyntaxHighlighter,
        views::ViewContextBase,
    };
    use chrono::TimeZone;
    use paxhtml::bumpalo::Bump;
    use std::collections::BTreeMap;

    fn document(parts: &[&str], description: &str) -> Document {
        let mut base = paxsite_content::Document::empty();
        base.document_type = DocumentType::Note;
        base.id = parts.iter().map(|part| part.to_lowercase()).collect();
        base.display_path = parts.iter().map(|part| (*part).to_string()).collect();
        base.metadata.title = parts.last().copied().unwrap_or("Notes").to_string();
        base.metadata.datetime = Some(chrono::Utc.with_ymd_and_hms(2025, 1, 1, 0, 0, 0).unwrap());
        base.metadata.last_modified =
            Some(chrono::Utc.with_ymd_and_hms(2025, 1, 2, 0, 0, 0).unwrap());
        base.description_raw = description.into();
        Document::from_base(base)
    }

    fn leaf(document: Document) -> DocumentNode<Document> {
        DocumentNode::Leaf(DocumentLeafNode::Document(Box::new(document)))
    }

    fn redirect(parts: &[&str]) -> DocumentLeafNode<Document> {
        DocumentLeafNode::Redirect(RedirectNode {
            id: parts.iter().map(|part| (*part).into()).collect(),
            target_url: "/notes/elsewhere/".into(),
            target_og_image_path: None,
            source_path: "redirect.md".into(),
        })
    }

    fn render(content: &Content, id: DocumentId) -> String {
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
        }
        .with_bump(&bump);
        let note = content.notes.documents.document_by_id(&id).unwrap();
        let entries = note_index_entries(content, note);
        paxhtml::Document::new(&bump, [notes_index(context, &entries)])
            .write_to_string()
            .unwrap()
    }

    #[test]
    fn immediate_children_use_compact_excerpts_with_folders_first() {
        let mut content = Content::empty();
        let mut tagged = document(&["Projects", "beta"], "A < B & **C**. Another sentence.");
        tagged.base.metadata.authored_by = Some("GLM-5.3-Flash".into());
        tagged.base.metadata.taxonomies = Some(paxsite_content::DocumentTaxonomies {
            tags: vec!["blackbird".into()],
        });
        content.notes.documents.children.insert(
            "Projects".into(),
            DocumentNode::Folder(DocumentFolderNode {
                index: Some(DocumentLeafNode::Document(Box::new(document(
                    &["Projects"],
                    "The parent description.",
                )))),
                folder_name: "Projects".into(),
                children: BTreeMap::from([
                    (
                        "Zeta".into(),
                        DocumentNode::Folder(DocumentFolderNode {
                            index: Some(DocumentLeafNode::Document(Box::new(document(
                                &["Projects", "Zeta"],
                                "The folder. More.",
                            )))),
                            folder_name: "Zeta".into(),
                            children: BTreeMap::from([(
                                "Hidden child".into(),
                                leaf(document(
                                    &["Projects", "Zeta", "Hidden child"],
                                    "Not listed here.",
                                )),
                            )]),
                        }),
                    ),
                    ("beta".into(), leaf(tagged)),
                    (
                        "Alpha".into(),
                        DocumentNode::Folder(DocumentFolderNode {
                            index: Some(DocumentLeafNode::Document(Box::new(document(
                                &["Projects", "Alpha"],
                                "The leaf-folder note has no full stop",
                            )))),
                            folder_name: "Alpha".into(),
                            children: BTreeMap::new(),
                        }),
                    ),
                    (
                        "Redirect".into(),
                        DocumentNode::Leaf(redirect(&["projects", "redirect"])),
                    ),
                    (
                        "Redirect folder".into(),
                        DocumentNode::Folder(DocumentFolderNode {
                            index: Some(redirect(&["projects", "redirect-folder"])),
                            folder_name: "Redirect folder".into(),
                            children: BTreeMap::new(),
                        }),
                    ),
                    (
                        "No index".into(),
                        DocumentNode::Folder(DocumentFolderNode {
                            index: None,
                            folder_name: "No index".into(),
                            children: BTreeMap::from([(
                                "Hidden descendant".into(),
                                leaf(document(
                                    &["Projects", "No index", "Hidden descendant"],
                                    "Not listed here either.",
                                )),
                            )]),
                        }),
                    ),
                    (
                        "No description".into(),
                        leaf(document(&["Projects", "No description"], "# Heading only")),
                    ),
                ]),
            }),
        );
        let html = render(&content, vec!["projects".into()]);
        assert!(html.contains("class=\"notes-index embed\""));
        assert_eq!(html.matches("class=\"notes-index-entry\"").count(), 4);
        assert!(
            html.find("href=\"/notes/projects/zeta/\"").unwrap()
                < html.find("href=\"/notes/projects/alpha/\"").unwrap()
        );
        assert!(
            html.find("href=\"/notes/projects/alpha/\"").unwrap()
                < html.find("href=\"/notes/projects/beta/\"").unwrap()
        );
        assert!(html.contains("<p>A &lt; B &amp; C.</p>"));
        assert!(html.contains("<p>The leaf-folder note has no full stop</p>"));
        assert!(!html.contains("Another sentence"));
        assert!(!html.contains("Hidden child"));
        assert!(!html.contains("Hidden descendant"));
        assert!(!html.contains("The parent description"));
        assert!(!html.contains("elsewhere"));
        assert!(!html.contains("Redirect"));
        assert!(!html.contains("class=\"metadata"));
        assert!(!html.contains("GLM-5.3-Flash"));
        assert!(!html.contains("<time"));
        assert!(!html.contains("href=\"/tags/blackbird/\""));
        assert!(!html.contains("class=\"dated-path\""));
        assert!(html.contains("class=\"link-note\""));
    }

    #[test]
    fn root_and_empty_folder_indexes_render_without_listing_themselves() {
        let mut content = Content::empty();
        content.notes.documents.index = Some(DocumentLeafNode::Document(Box::new(document(
            &[],
            "Root intro.",
        ))));
        let html = render(&content, vec![]);
        assert!(html.is_empty());
        content
            .notes
            .documents
            .children
            .insert("A".into(), leaf(document(&["A"], "A note.")));
        let html = render(&content, vec![]);
        assert_eq!(html.matches("class=\"notes-index-entry\"").count(), 1);
        assert!(html.contains("href=\"/notes/a/\""));
        assert!(!html.contains("Root intro"));
    }

    #[test]
    fn ordinary_notes_and_other_document_types_have_no_child_index() {
        let mut content = Content::empty();
        content.notes.documents.index =
            Some(DocumentLeafNode::Document(Box::new(document(&[], "Root."))));
        content
            .notes
            .documents
            .children
            .insert("Child".into(), leaf(document(&["Child"], "Child.")));
        let child = content
            .notes
            .documents
            .document_by_id(&vec!["child".into()])
            .unwrap();
        assert!(note_index_entries(&content, child).is_empty());
        let mut post = document(&[], "Post.");
        post.base.document_type = DocumentType::Blog;
        assert!(note_index_entries(&content, &post).is_empty());
        assert!(note_index_entries(&content, &document(&["Missing"], "Missing.")).is_empty());
    }

    #[test]
    fn redirect_only_and_unpaged_children_do_not_create_an_index() {
        let mut content = Content::empty();
        content.notes.documents.index =
            Some(DocumentLeafNode::Document(Box::new(document(&[], "Root."))));
        content.notes.documents.children = BTreeMap::from([
            ("Old".into(), DocumentNode::Leaf(redirect(&["old"]))),
            (
                "Unpaged".into(),
                DocumentNode::Folder(DocumentFolderNode {
                    index: None,
                    folder_name: "Unpaged".into(),
                    children: BTreeMap::from([(
                        "Descendant".into(),
                        leaf(document(&["Unpaged", "Descendant"], "Descendant.")),
                    )]),
                }),
            ),
        ]);
        assert!(render(&content, vec![]).is_empty());
    }
}
