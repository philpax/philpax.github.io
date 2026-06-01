//! Input types for the standard.site records we write to the PDS. These are the
//! caller-facing shapes; the on-the-wire lexicon serialization (with `$type` and
//! camelCase keys) lives in private `wire` structs in this module.

use serde::Serialize;

use crate::{DOCUMENT_NSID, PUBLICATION_NSID};

/// A `site.standard.publication` record — the publication this site represents.
#[derive(Debug, Clone)]
pub struct PublicationRecord {
    /// Canonical web URL of the publication, e.g. `https://philpax.me`.
    pub url: String,
    /// Human-facing name.
    pub name: String,
    /// Optional human-facing description.
    pub description: Option<String>,
}

/// A `site.standard.document` record — a single published post.
#[derive(Debug, Clone)]
pub struct DocumentRecord {
    /// AT-URI of the publication this document belongs to.
    pub site: String,
    /// Document title.
    pub title: String,
    /// Site-relative URL path, e.g. `/blog/hello-again/`.
    pub path: String,
    /// RFC 3339 publish timestamp.
    pub published_at: String,
    /// Optional short description.
    pub description: Option<String>,
    /// Tags, omitted from the record when empty.
    pub tags: Vec<String>,
    /// Optional plain-text rendering of the document body.
    pub text_content: Option<String>,
}

// ── Wire shapes ───────────────────────────────────────────────────────────────

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct PublicationWire<'a> {
    #[serde(rename = "$type")]
    type_: &'static str,
    url: &'a str,
    name: &'a str,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<&'a str>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct DocumentWire<'a> {
    #[serde(rename = "$type")]
    type_: &'static str,
    site: &'a str,
    title: &'a str,
    path: &'a str,
    published_at: &'a str,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<&'a str>,
    #[serde(skip_serializing_if = "<[_]>::is_empty")]
    tags: &'a [String],
    #[serde(skip_serializing_if = "Option::is_none")]
    text_content: Option<&'a str>,
}

impl PublicationRecord {
    pub(crate) fn wire(&self) -> PublicationWire<'_> {
        PublicationWire {
            type_: PUBLICATION_NSID,
            url: &self.url,
            name: &self.name,
            description: self.description.as_deref(),
        }
    }
}

impl DocumentRecord {
    pub(crate) fn wire(&self) -> DocumentWire<'_> {
        DocumentWire {
            type_: DOCUMENT_NSID,
            site: &self.site,
            title: &self.title,
            path: &self.path,
            published_at: &self.published_at,
            description: self.description.as_deref(),
            tags: &self.tags,
            text_content: self.text_content.as_deref(),
        }
    }
}
