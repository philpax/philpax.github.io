//! Content creation flows (blog posts, updates, notes).

use std::path::Path;

use anyhow::Context;
use inquire::{Select, Text};
use paxsite_content::{
    DocumentMetadata, DocumentTaxonomies, DocumentType, Tag, blog_or_update_path,
    generate_frontmatter, note_path, title_to_slug,
};

use crate::{
    notes::{ensure_note_folder_indices, select_note_folder},
    util::open_in_editor,
};

pub(crate) fn create_content(root: &Path) -> anyhow::Result<()> {
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

    let content = paxsite_content::Content::read(true, true)?;
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
        draft: true,
        taxonomies: Some(DocumentTaxonomies {
            tags: selected_tags,
        }),
        standard_site: None,
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

    let content = paxsite_content::Content::read(true, true)?;
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
