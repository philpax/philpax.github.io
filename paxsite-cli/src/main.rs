use std::{
    path::{Path, PathBuf},
    process::Command,
};

use anyhow::Context;
use atproto::{Datetime, Document as PdsDocument, Publication, Str, UriValue};
use inquire::{Select, Text};
use paxsite_content::{
    CONFIG, Document, DocumentMetadata, DocumentNode, DocumentTaxonomies, DocumentType,
    INDEX_FILENAME, StandardSite, Tag, blog_or_update_path, display_name_to_filename,
    filename_to_display_name, generate_frontmatter, markdown_to_plaintext, note_path,
    read_frontmatter, title_to_slug, write_frontmatter,
};

mod atproto;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let root = find_project_root()?;

    // Non-interactive subcommand used by the pre-push hook: verifies every
    // non-draft blog/update post has an up-to-date standard.site record, exiting
    // non-zero (without prompting) if any are missing or stale.
    if std::env::args().nth(1).as_deref() == Some("check-standard-site") {
        return check_standard_site();
    }

    const CREATE: &str = "Create new content";
    const EDIT: &str = "Edit existing content";
    const PUBLISH: &str = "Publish a draft";
    const PUBLISH_ONE: &str = "Publish one post to standard.site";
    const BACKFILL: &str = "Backfill standard.site records";
    const UPDATE_PUBLICATION: &str = "Update standard.site publication";

    let action = Select::new(
        "What would you like to do?",
        vec![
            CREATE,
            EDIT,
            PUBLISH,
            PUBLISH_ONE,
            BACKFILL,
            UPDATE_PUBLICATION,
        ],
    )
    .prompt()?;

    match action {
        CREATE => create_content(&root)?,
        EDIT => edit_content(&root)?,
        PUBLISH => publish_content(&root).await?,
        PUBLISH_ONE => publish_one_standard_site(&root).await?,
        BACKFILL => backfill_standard_site(&root).await?,
        UPDATE_PUBLICATION => update_publication(&root).await?,
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

fn edit_content(root: &Path) -> anyhow::Result<()> {
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

async fn publish_content(root: &Path) -> anyhow::Result<()> {
    let content = paxsite_content::Content::read(true, true)?;
    let drafts: Vec<&paxsite_content::Document> = content
        .blog
        .documents
        .iter()
        .chain(content.updates.documents.iter())
        .filter(|d| d.metadata.draft)
        .collect();

    if drafts.is_empty() {
        println!("No drafts to publish.");
        return Ok(());
    }

    let display_items: Vec<String> = drafts
        .iter()
        .map(|d| format!("[{}] {}", d.document_type.dir_name(), d.metadata.title))
        .collect();

    let selection = Select::new("Select a draft to publish:", display_items.clone()).prompt()?;
    let idx = display_items.iter().position(|s| *s == selection).unwrap();
    publish_doc(root, drafts[idx]).await
}

async fn publish_doc(root: &Path, doc: &paxsite_content::Document) -> anyhow::Result<()> {
    if !doc.metadata.draft {
        anyhow::bail!("{} is not a draft", doc.id.join("/"));
    }

    let (mut metadata, body) = read_frontmatter(&doc.source_path)?;
    metadata.draft = false;
    metadata.datetime = Some(chrono::Utc::now());
    write_frontmatter(&doc.source_path, &metadata, &body)?;
    println!("Published {}", doc.source_path.display());

    // Mirror to the PDS as a standard.site document, if configured. Re-read the
    // document so the record reflects the just-written publish date.
    if let Some(mut session) = StandardSiteSession::open(root).await? {
        let doc = reload_document(doc)?;
        session.publish_document(&doc).await?;
    }

    Ok(())
}

// ── standard.site publishing ──────────────────────────────────────────────────

/// An authenticated standard.site session plus the resolved publication URI,
/// established once and reused across one or more document upserts.
struct StandardSiteSession {
    publisher: atproto::Publisher,
    publication_uri: String,
}

impl StandardSiteSession {
    /// Logs in and ensures the publication record matches the config. Returns
    /// `Ok(None)` when standard.site is disabled (no DID configured in [`CONFIG`]).
    async fn open(root: &Path) -> anyhow::Result<Option<Self>> {
        let (Some(publisher), Some(publication_uri)) =
            (standard_site_login(root).await?, CONFIG.publication_uri())
        else {
            return Ok(None);
        };

        // Idempotently ensure the publication singleton matches the config.
        publisher.upsert_publication(&publication_record()?).await?;

        Ok(Some(Self {
            publisher,
            publication_uri,
        }))
    }

    /// Upserts the document's standard.site record and writes the resulting
    /// AT-URI and content fingerprint back into its frontmatter.
    async fn publish_document(&mut self, doc: &Document) -> anyhow::Result<()> {
        let existing = doc.metadata.standard_site.as_ref().map(|s| s.uri.clone());
        let record = document_record(&self.publication_uri, doc)?;
        let uri = self
            .publisher
            .upsert_document(existing.as_deref(), &record)
            .await
            .with_context(|| format!("failed to publish {}", doc.id.join("/")))?;

        let (mut metadata, body) = read_frontmatter(&doc.source_path)?;
        metadata.standard_site = Some(StandardSite {
            uri: uri.clone(),
            hash: doc.standard_site_fingerprint(),
        });
        write_frontmatter(&doc.source_path, &metadata, &body)?;

        println!("  → standard.site: {uri}");
        Ok(())
    }
}

/// Logs into the PDS for standard.site work, or `Ok(None)` if disabled (no DID).
async fn standard_site_login(root: &Path) -> anyhow::Result<Option<atproto::Publisher>> {
    let Some(did) = CONFIG.atproto_did else {
        return Ok(None);
    };
    let store_path = root.join(".standard-site-session.json");
    Ok(Some(atproto::login(&store_path, did).await?))
}

/// The publication record derived from the current site config.
fn publication_record() -> anyhow::Result<Publication<Str>> {
    Ok(Publication::new()
        .url(uri(CONFIG.base_url)?)
        .name(CONFIG.name)
        .description(Str::from(CONFIG.description))
        .build())
}

/// Parses a string into a validated AT Protocol URI value.
fn uri(s: &str) -> anyhow::Result<UriValue<Str>> {
    UriValue::<Str>::new_owned(s).map_err(|e| anyhow::anyhow!("invalid uri {s:?}: {e}"))
}

/// Pushes the publication record (name/description/url from [`CONFIG`]) to the
/// PDS, showing the before/after so config-only changes can be applied without
/// touching a post.
async fn update_publication(root: &Path) -> anyhow::Result<()> {
    let Some(publisher) = standard_site_login(root).await? else {
        anyhow::bail!("standard.site is not configured (no DID set in paxsite_content::CONFIG)");
    };

    let before = publisher.get_publication().await?;
    match &before {
        Some(p) => {
            println!("Current publication:");
            println!("  name:        {}", p.name);
            println!("  description: {}", p.description.as_deref().unwrap_or(""));
            println!("  url:         {}", p.url.as_ref());
        }
        None => println!("No existing publication record (it will be created)."),
    }

    let new = publication_record()?;
    let uri = publisher.upsert_publication(&new).await?;

    let changed = before
        .as_ref()
        .is_none_or(|b| b.name != new.name || b.description != new.description || b.url != new.url);
    if changed {
        println!("\nUpdated publication ({uri}):");
        println!("  name:        {}", new.name);
        println!(
            "  description: {}",
            new.description.as_deref().unwrap_or("")
        );
        println!("  url:         {}", new.url.as_ref());
    } else {
        println!("\nPublication already up to date ({uri}).");
    }
    Ok(())
}

/// Builds the `site.standard.document` record for a document.
fn document_record(publication_uri: &str, doc: &Document) -> anyhow::Result<PdsDocument<Str>> {
    // Concatenate the raw markdown (intro + body) and render it to plain text via
    // the shared canonical operation.
    let mut markdown = doc.description_raw.clone();
    if let Some(rest) = &doc.rest_of_content_raw {
        markdown.push_str("\n\n");
        markdown.push_str(rest);
    }
    let text = markdown_to_plaintext(&markdown);

    let tags: Vec<Str> = doc
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| t.tags.iter().map(|s| Str::from(s.as_str())).collect())
        .unwrap_or_default();
    let published_at = doc
        .metadata
        .datetime
        .unwrap_or_else(chrono::Utc::now)
        .fixed_offset();

    Ok(PdsDocument::new()
        .site(uri(publication_uri)?)
        .title(doc.metadata.title.as_str())
        .published_at(Datetime::from(published_at))
        // Canonical site-relative path, shared with the SSG (no desync).
        .path(Str::from(doc.url_path().as_str()))
        .maybe_description(doc.metadata.short.as_deref().map(Str::from))
        .maybe_tags((!tags.is_empty()).then_some(tags))
        .maybe_text_content((!text.is_empty()).then(|| Str::from(text.as_str())))
        .build())
}

/// Re-reads a document from disk so callers observe just-written frontmatter.
fn reload_document(doc: &Document) -> anyhow::Result<Document> {
    Document::read(
        &doc.source_path,
        doc.id.clone(),
        doc.display_path.clone(),
        doc.document_type,
        true,
    )
}

/// Publishes a single chosen non-draft blog/update post to standard.site.
/// Handy for testing the flow or re-publishing one post on demand.
async fn publish_one_standard_site(root: &Path) -> anyhow::Result<()> {
    let content = paxsite_content::Content::read(true, true)?;
    let docs: Vec<&Document> = publishable_docs(&content).collect();
    if docs.is_empty() {
        println!("No published blog/update posts.");
        return Ok(());
    }

    let display: Vec<String> = docs
        .iter()
        .map(|d| {
            let status = if needs_publish(d) {
                ""
            } else {
                " (up to date)"
            };
            format!(
                "[{}] {}{status}",
                d.document_type.dir_name(),
                d.metadata.title
            )
        })
        .collect();
    let selection = Select::new("Select a post to publish:", display.clone()).prompt()?;
    let idx = display.iter().position(|s| *s == selection).unwrap();

    let Some(mut session) = StandardSiteSession::open(root).await? else {
        anyhow::bail!("standard.site is not configured (no DID set in paxsite_content::CONFIG)");
    };
    session.publish_document(docs[idx]).await
}

/// Publishes every non-draft blog/update post that lacks an up-to-date record.
async fn backfill_standard_site(root: &Path) -> anyhow::Result<()> {
    let content = paxsite_content::Content::read(true, true)?;
    let stale: Vec<&Document> = publishable_docs(&content)
        .filter(|d| needs_publish(d))
        .collect();

    if stale.is_empty() {
        println!("All non-draft blog/update posts are already up to date.");
        return Ok(());
    }

    let Some(mut session) = StandardSiteSession::open(root).await? else {
        anyhow::bail!("standard.site is not configured (no DID set in paxsite_content::CONFIG)");
    };

    println!("Publishing {} document(s)...", stale.len());
    for doc in stale {
        println!("[{}] {}", doc.document_type.dir_name(), doc.metadata.title);
        session.publish_document(doc).await?;
    }
    Ok(())
}

/// Pre-push gate: fails if any publishable post is missing or has a stale record.
fn check_standard_site() -> anyhow::Result<()> {
    // Feature not enabled → nothing to enforce.
    if CONFIG.atproto_did.is_none() {
        return Ok(());
    }

    let content = paxsite_content::Content::read(true, true)?;
    let stale: Vec<&Document> = publishable_docs(&content)
        .filter(|d| needs_publish(d))
        .collect();

    if stale.is_empty() {
        return Ok(());
    }

    eprintln!(
        "standard.site: {} post(s) need publishing before push:",
        stale.len()
    );
    for doc in &stale {
        let reason = if doc.metadata.standard_site.is_none() {
            "never published"
        } else {
            "content changed since last publish"
        };
        eprintln!(
            "  - [{}] {} ({reason})",
            doc.document_type.dir_name(),
            doc.id.join("/")
        );
    }
    eprintln!("Run `paxsite-cli` → \"Backfill standard.site records\" (or publish) to fix.");
    std::process::exit(1);
}

/// Iterator over non-draft blog and update documents.
fn publishable_docs(content: &paxsite_content::Content) -> impl Iterator<Item = &Document> {
    content
        .blog
        .documents
        .iter()
        .chain(content.updates.documents.iter())
        .filter(|d| !d.metadata.draft)
}

/// Whether a document has no record yet, or its content has drifted from the
/// last-published fingerprint.
fn needs_publish(doc: &Document) -> bool {
    match &doc.metadata.standard_site {
        None => true,
        Some(s) => s.hash != doc.standard_site_fingerprint(),
    }
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
