//! Content editing flows (metadata edits, note rename/move).

use std::path::Path;

use anyhow::Context;
use inquire::{Select, Text};
use paxsite_content::{
    DocumentTaxonomies, DocumentType, Tag, display_name_to_filename, note_path, read_frontmatter,
    write_frontmatter,
};

use crate::{
    notes::{ensure_note_folder_indices, select_note_folder},
    util::open_in_editor,
};

pub(crate) fn edit_content(root: &Path) -> anyhow::Result<()> {
    const OPEN: &str = "Open in editor";
    const METADATA: &str = "Edit metadata";
    const RENAME: &str = "Rename/move";

    let content = paxsite_content::Content::read(true, true)?;
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
