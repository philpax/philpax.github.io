use std::{
    path::{Path, PathBuf},
    process::Command,
};

use anyhow::Context;
use inquire::{Select, Text};
use paxsite_content::{
    DocumentMetadata, DocumentNode, DocumentTaxonomies, DocumentType, INDEX_FILENAME, Tag,
    blog_or_update_path, display_name_to_filename, filename_to_display_name, generate_frontmatter,
    note_path, read_frontmatter, title_to_slug, write_frontmatter,
};

fn main() -> anyhow::Result<()> {
    let root = find_project_root()?;

    const CREATE: &str = "Create new content";
    const EDIT: &str = "Edit existing content";

    let action = Select::new("What would you like to do?", vec![CREATE, EDIT]).prompt()?;

    match action {
        CREATE => create_content(&root)?,
        EDIT => edit_content(&root)?,
        _ => unreachable!(),
    }

    Ok(())
}

fn create_content(root: &Path) -> anyhow::Result<()> {
    const BLOG: &str = "Blog post";
    const UPDATE: &str = "Update";
    const NOTE: &str = "Note";

    let content_type =
        Select::new("What would you like to create?", vec![BLOG, UPDATE, NOTE]).prompt()?;

    match content_type {
        BLOG => create_blog_or_update(root, DocumentType::Blog)?,
        UPDATE => create_blog_or_update(root, DocumentType::Update)?,
        NOTE => create_note(root)?,
        _ => unreachable!(),
    }

    Ok(())
}

fn create_blog_or_update(root: &Path, doc_type: DocumentType) -> anyhow::Result<()> {
    let title = Text::new("Title:").prompt()?;
    let short = Text::new("Short description:").prompt()?;

    let today = chrono::Utc::now().format("%Y-%m-%dT00:00:00Z").to_string();
    let datetime_str = Text::new("Date (YYYY-MM-DDTHH:MM:SSZ):")
        .with_default(&today)
        .prompt()?;
    let datetime = chrono::DateTime::parse_from_rfc3339(&datetime_str)
        .or_else(|_| {
            chrono::NaiveDateTime::parse_from_str(&datetime_str, "%Y-%m-%dT%H:%M:%S")
                .map(|ndt| ndt.and_utc().fixed_offset())
        })
        .context("Invalid datetime format")?
        .with_timezone(&chrono::Utc);

    let content = paxsite_content::Content::read(true)?;
    let existing_tags = content.all_tags();
    let mut selected_tags: Vec<Tag> = if !existing_tags.is_empty() {
        inquire::MultiSelect::new("Select tags:", existing_tags).prompt()?
    } else {
        vec![]
    };

    let additional = Text::new("Additional new tags (comma-separated):")
        .with_default("")
        .prompt()?;
    for tag in additional
        .split(',')
        .map(|s| s.trim())
        .filter(|s| !s.is_empty())
    {
        if !selected_tags.contains(&tag.to_string()) {
            selected_tags.push(tag.to_string());
        }
    }

    let metadata = DocumentMetadata {
        title: title.clone(),
        short: Some(short),
        datetime: Some(datetime),
        last_modified: None,
        taxonomies: Some(DocumentTaxonomies {
            tags: selected_tags,
        }),
    };

    let slug = title_to_slug(&title);
    let path = blog_or_update_path(root, doc_type, &slug);

    if path.exists() {
        anyhow::bail!("File already exists: {}", path.display());
    }

    std::fs::create_dir_all(path.parent().unwrap())?;

    let frontmatter = generate_frontmatter(&metadata);
    let content =
        format!("{frontmatter}\nIntroduction paragraph.\n\n<!-- more -->\n\nFull content here.\n");
    std::fs::write(&path, content)?;

    println!("Created {}", path.display());
    open_in_editor(&path);

    Ok(())
}

fn create_note(root: &Path) -> anyhow::Result<()> {
    let title = Text::new("Title:").prompt()?;

    let content = paxsite_content::Content::read(true)?;
    let folder = select_note_folder(&content.notes.documents, &[])?;

    let path = note_path(root, &folder, &title);

    if path.exists() {
        anyhow::bail!("File already exists: {}", path.display());
    }

    std::fs::create_dir_all(path.parent().unwrap())?;
    ensure_note_folder_indices(root, &folder)?;

    let file_content = "Description here.\n\n<!-- more -->\n\nContent here.\n";
    std::fs::write(&path, file_content)?;

    println!("Created {}", path.display());
    open_in_editor(&path);

    Ok(())
}

fn edit_content(root: &Path) -> anyhow::Result<()> {
    const OPEN: &str = "Open in editor";
    const METADATA: &str = "Edit metadata";
    const RENAME: &str = "Rename/move";

    let content = paxsite_content::Content::read(true)?;
    let items = content.all_content_items();
    if items.is_empty() {
        println!("No content found.");
        return Ok(());
    }

    let display_items: Vec<String> = items
        .iter()
        .map(|item| {
            let type_label = item.document_type.dir_name();
            let path = item.display_path.join(" · ");
            format!("[{type_label}] {path}")
        })
        .collect();

    let selection = Select::new("Select content to edit:", display_items.clone()).prompt()?;
    let idx = display_items.iter().position(|s| *s == selection).unwrap();
    let item = &items[idx];

    let action = match item.document_type {
        DocumentType::Note => {
            Select::new("What would you like to do?", vec![OPEN, RENAME]).prompt()?
        }
        _ => Select::new("What would you like to do?", vec![OPEN, METADATA]).prompt()?,
    };

    match action {
        OPEN => {
            open_in_editor(&item.source_path);
        }
        METADATA => {
            edit_metadata(&content, item)?;
        }
        RENAME => {
            rename_note(root, &content, item)?;
        }
        _ => unreachable!(),
    }

    Ok(())
}

fn edit_metadata(
    content: &paxsite_content::Content,
    item: &paxsite_content::ContentItem,
) -> anyhow::Result<()> {
    let (mut metadata, body) = read_frontmatter(&item.source_path)?;

    let title = Text::new("Title:").with_default(&metadata.title).prompt()?;
    metadata.title = title;

    let short = Text::new("Short description:")
        .with_default(metadata.short.as_deref().unwrap_or(""))
        .prompt()?;
    metadata.short = if short.is_empty() { None } else { Some(short) };

    if let Some(dt) = metadata.datetime {
        let dt_str = dt.format("%Y-%m-%dT%H:%M:%SZ").to_string();
        let new_dt_str = Text::new("Date (YYYY-MM-DDTHH:MM:SSZ):")
            .with_default(&dt_str)
            .prompt()?;
        metadata.datetime = Some(
            chrono::DateTime::parse_from_rfc3339(&new_dt_str)
                .or_else(|_| {
                    chrono::NaiveDateTime::parse_from_str(&new_dt_str, "%Y-%m-%dT%H:%M:%S")
                        .map(|ndt| ndt.and_utc().fixed_offset())
                })
                .context("Invalid datetime format")?
                .with_timezone(&chrono::Utc),
        );
    }

    let existing_tags = content.all_tags();
    let current_tags: Vec<Tag> = metadata
        .taxonomies
        .as_ref()
        .map(|t| t.tags.clone())
        .unwrap_or_default();

    let defaults: Vec<bool> = existing_tags
        .iter()
        .map(|t| current_tags.contains(t))
        .collect();

    let mut selected_tags: Vec<Tag> = if !existing_tags.is_empty() {
        inquire::MultiSelect::new("Select tags:", existing_tags)
            .with_default(
                &defaults
                    .iter()
                    .enumerate()
                    .filter(|&(_, v)| *v)
                    .map(|(i, _)| i)
                    .collect::<Vec<_>>(),
            )
            .prompt()?
    } else {
        vec![]
    };

    let additional = Text::new("Additional new tags (comma-separated):")
        .with_default("")
        .prompt()?;
    for tag in additional
        .split(',')
        .map(|s| s.trim())
        .filter(|s| !s.is_empty())
    {
        if !selected_tags.contains(&tag.to_string()) {
            selected_tags.push(tag.to_string());
        }
    }

    metadata.taxonomies = Some(DocumentTaxonomies {
        tags: selected_tags,
    });

    write_frontmatter(&item.source_path, &metadata, &body)?;
    println!("Updated {}", item.source_path.display());

    Ok(())
}

fn rename_note(
    root: &Path,
    content: &paxsite_content::Content,
    item: &paxsite_content::ContentItem,
) -> anyhow::Result<()> {
    let current_title = item.display_path.last().cloned().unwrap_or_default();
    let current_folder_parts: Vec<String> = if item.display_path.len() > 1 {
        item.display_path[..item.display_path.len() - 1]
            .iter()
            .map(|s| display_name_to_filename(s))
            .collect()
    } else {
        vec![]
    };

    let new_title = Text::new("Title:").with_default(&current_title).prompt()?;

    let new_folder = select_note_folder(&content.notes.documents, &current_folder_parts)?;

    let new_path = note_path(root, &new_folder, &new_title);

    if new_path == item.source_path {
        println!("No changes made.");
        return Ok(());
    }

    if new_path.exists() {
        anyhow::bail!("File already exists: {}", new_path.display());
    }

    std::fs::create_dir_all(new_path.parent().unwrap())?;
    ensure_note_folder_indices(root, &new_folder)?;
    std::fs::rename(&item.source_path, &new_path)?;

    // Clean up empty parent directories
    let mut parent = item.source_path.parent();
    let notes_dir = root.join(DocumentType::Note.content_dir());
    while let Some(dir) = parent {
        if dir == notes_dir {
            break;
        }
        if std::fs::read_dir(dir)?.next().is_none() {
            std::fs::remove_dir(dir)?;
            parent = dir.parent();
        } else {
            break;
        }
    }

    println!(
        "Moved {} -> {}",
        item.source_path.display(),
        new_path.display()
    );

    Ok(())
}

// ── Hierarchical folder selector ────────────────────────────────────────────

/// Interactively navigates the notes folder tree, allowing the user to
/// select an existing folder or create new ones. Returns a filesystem-style
/// path like "Programming/Languages".
fn select_note_folder(
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
        let display_name = paxsite_content::filename_to_display_name(part);
        match current.children.get(&display_name) {
            Some(DocumentNode::Folder(f)) => current = f,
            _ => return None,
        }
    }
    Some(current)
}

// ── Utilities ───────────────────────────────────────────────────────────────

/// Ensures every folder in the given notes folder path has an `index.md`.
/// Creates one with a default template for any folder that's missing it.
fn ensure_note_folder_indices(root: &Path, folder_path: &str) -> anyhow::Result<()> {
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

fn open_in_editor(path: &Path) {
    let editor = std::env::var("EDITOR")
        .or_else(|_| std::env::var("VISUAL"))
        .unwrap_or_else(|_| "vi".to_string());

    println!("Opening in {editor}...");
    let _ = Command::new(&editor)
        .arg(path)
        .stdin(std::process::Stdio::inherit())
        .stdout(std::process::Stdio::inherit())
        .stderr(std::process::Stdio::inherit())
        .status();
}

fn find_project_root() -> anyhow::Result<PathBuf> {
    let mut dir = std::env::current_dir()?;
    loop {
        if dir.join(Path::new(paxsite_content::CONTENT_DIR)).is_dir()
            && dir.join("Cargo.toml").exists()
        {
            return Ok(dir);
        }
        if !dir.pop() {
            anyhow::bail!(
                "Could not find project root (looking for a directory with both a content dir and Cargo.toml)"
            );
        }
    }
}
