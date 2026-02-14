use paxhtml::builder::Builder;
use paxhtml::html;

use crate::{
    content::{DocumentId, DocumentNode},
    elements as e,
    views::{
        ViewContext,
        components::{Link, LinkProps},
    },
};

pub fn notes_index<'a>(context: ViewContext<'a>, note_id: &DocumentId) -> paxhtml::Element<'a> {
    let bump = context.bump;
    let folder = context
        .content
        .notes
        .documents
        .find_folder_for_document(note_id)
        .expect("NotesIndex: folder not found");

    let mut items = Vec::new();
    // Subfolders first (skip leaf folders — they're rendered with documents below)
    for node in folder.children.values() {
        let DocumentNode::Folder(subfolder) = node else {
            continue;
        };
        if subfolder.is_leaf() {
            continue;
        }
        let Some(index_doc) = &subfolder.index_document else {
            continue;
        };
        items.push(e::li(
            bump,
            html! { in bump;
                <Link underline target={index_doc.route_path().url_path()}>
                    {format!("{}/", subfolder.folder_name)}
                </Link>
            },
        ));
    }
    // Documents (and leaf folders, which are treated as single notes)
    for node in folder.children.values() {
        let document = match node {
            DocumentNode::Document { document } => document,
            DocumentNode::Folder(subfolder) if subfolder.is_leaf() => {
                subfolder.index_document.as_ref().unwrap()
            }
            _ => continue,
        };
        items.push(e::li(
            bump,
            html! { in bump;
                <Link underline target={document.route_path().url_path()}>
                    {document.metadata.title.clone()}
                </Link>
            },
        ));
    }
    e::ul(bump, Builder::new(bump).fragment(items))
}
