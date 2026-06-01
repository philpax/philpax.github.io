//! standard.site publishing: drafts → PDS records, plus the pre-push staleness gate.

use std::path::Path;

use anyhow::Context;
use inquire::Select;
use paxsite_content::{
    CONFIG, Document, StandardSite, markdown_to_plaintext, read_frontmatter, write_frontmatter,
};

use crate::atproto::{self, Datetime, Document as PdsDocument, Publication, Str, UriValue};

pub(crate) async fn publish_content(root: &Path) -> anyhow::Result<()> {
    let content = paxsite_content::Content::read(true, true)?;
    let drafts: Vec<&Document> = content
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

async fn publish_doc(root: &Path, doc: &Document) -> anyhow::Result<()> {
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
pub(crate) async fn update_publication(root: &Path) -> anyhow::Result<()> {
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
pub(crate) async fn publish_one_standard_site(root: &Path) -> anyhow::Result<()> {
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
pub(crate) async fn backfill_standard_site(root: &Path) -> anyhow::Result<()> {
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
pub(crate) fn check_standard_site() -> anyhow::Result<()> {
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
