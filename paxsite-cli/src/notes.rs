//! Interactive notes-folder navigation and index-file maintenance, shared by the
//! create and edit flows.

use std::path::Path;

use inquire::{Select, Text};
use paxsite_content::{
    DocumentNode, DocumentType, INDEX_FILENAME, display_name_to_filename, filename_to_display_name,
};

/// Interactively navigates the notes folder tree, allowing the user to
/// select an existing folder or create new ones. Returns a filesystem-style
/// path like "Programming/Languages".
pub(crate) fn select_note_folder(
    root_folder: &paxsite_content::DocumentFolderNode<paxsite_content::Document>,
    initial_path: &[String],
) -> anyhow::Result<String> {
    const PLACE_HERE: &str = ">> Place note here <<";
    const CREATE_NEW: &str = ">> Create new folder <<";
    const GO_BACK: &str = ">> Go back <<";

    // path_parts stores filesystem-style names (underscores for spaces)
    let mut path_parts: Vec<String> = initial_path.to_vec();

    loop {
        // Navigate from root to current position
        let current = find_folder_by_path(root_folder, &path_parts);

        let mut options = vec![PLACE_HERE.to_string()];

        // Add child folders from the tree (if we're in an existing folder)
        if let Some(folder) = current {
            for (name, node) in &folder.children {
                if matches!(node, DocumentNode::Folder(_)) {
                    options.push(format!("{name}/"));
                }
            }
        }

        options.push(CREATE_NEW.to_string());

        if !path_parts.is_empty() {
            options.push(GO_BACK.to_string());
        }

        let prompt = if path_parts.is_empty() {
            "Folder:".to_string()
        } else {
            format!("Folder ({}):", path_parts.join("/"))
        };

        let selection = Select::new(&prompt, options).prompt()?;

        if selection == PLACE_HERE {
            return Ok(path_parts.join("/"));
        } else if selection == CREATE_NEW {
            let name = Text::new("New folder name:").prompt()?;
            if !name.is_empty() {
                path_parts.push(display_name_to_filename(&name));
            }
            // Loop continues — the new folder will show as empty (no children),
            // so the user can place the note here or create further subfolders.
        } else if selection == GO_BACK {
            path_parts.pop();
        } else {
            // Selected a child folder — strip trailing /
            let display_name = selection.trim_end_matches('/');
            path_parts.push(display_name_to_filename(display_name));
        }
    }
}

/// Navigates from the root folder node to the folder at the given path.
/// Returns `None` if the path leads to a folder that doesn't exist in the tree
/// (e.g. a newly created folder).
fn find_folder_by_path<'a>(
    root: &'a paxsite_content::DocumentFolderNode<paxsite_content::Document>,
    path_parts: &[String],
) -> Option<&'a paxsite_content::DocumentFolderNode<paxsite_content::Document>> {
    let mut current = root;
    for part in path_parts {
        let display_name = filename_to_display_name(part);
        match current.children.get(&display_name) {
            Some(DocumentNode::Folder(f)) => current = f,
            _ => return None,
        }
    }
    Some(current)
}

/// Ensures every folder in the given notes folder path has an `index.md`.
/// Creates one with a default template for any folder that's missing it.
pub(crate) fn ensure_note_folder_indices(root: &Path, folder_path: &str) -> anyhow::Result<()> {
    if folder_path.is_empty() {
        return Ok(());
    }

    let notes_dir = root.join(DocumentType::Note.content_dir());
    let mut current = notes_dir.clone();

    for part in folder_path.split('/') {
        current = current.join(part);
        let index = current.join(INDEX_FILENAME);
        if !index.exists() {
            let folder_name = filename_to_display_name(part);
            let content = format!("{folder_name} notes.\n\n<!-- more -->\n\n<NotesIndex />\n");
            std::fs::create_dir_all(&current)?;
            std::fs::write(&index, content)?;
            println!("Created {}", index.display());
        }
    }

    Ok(())
}
