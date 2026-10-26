use std::{
    collections::{HashMap, HashSet},
    path::{Path, PathBuf},
};

use crate::{Route, RoutePath};

pub use paxsite_content::{
    DocumentId, DocumentLeafNode, DocumentNode, DocumentType, HasDocumentId, RedirectNode, Tag,
};

pub type DocumentMetadata = paxsite_content::DocumentMetadata;
pub type DocumentFolderNode = paxsite_content::DocumentFolderNode<Document>;
pub type DocumentCollection = paxsite_content::DocumentCollection<Document>;
pub type NotesCollection = paxsite_content::NotesCollection<Document>;

const MUSIC_LIBRARY_PATH: &str = "assets/baked/music.json";
const TAG_DESCRIPTIONS_PATH: &str = "content/tags.toml";

// ── DocumentMetadataExt ─────────────────────────────────────────────────────

pub trait DocumentMetadataExt {
    fn short_markdown(&self) -> Option<markdown::mdast::Node>;
}
impl DocumentMetadataExt for DocumentMetadata {
    fn short_markdown(&self) -> Option<markdown::mdast::Node> {
        self.short.as_deref().map(parse_markdown)
    }
}

// ── Document ────────────────────────────────────────────────────────────────

#[derive(Debug)]
pub struct Document {
    pub base: paxsite_content::Document,
    pub description: markdown::mdast::Node,
    pub rest_of_content: Option<markdown::mdast::Node>,
    pub word_count: usize,
}
impl std::ops::Deref for Document {
    type Target = paxsite_content::Document;
    fn deref(&self) -> &Self::Target {
        &self.base
    }
}
impl std::fmt::Display for Document {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.base.fmt(f)
    }
}
impl HasDocumentId for Document {
    fn document_id(&self) -> &DocumentId {
        &self.base.id
    }
}
impl Document {
    #[cfg(test)]
    pub fn empty() -> Self {
        Self {
            base: paxsite_content::Document::empty(),
            description: markdown::mdast::Node::Root(markdown::mdast::Root {
                children: Default::default(),
                position: Default::default(),
            }),
            rest_of_content: None,
            word_count: 0,
        }
    }

    pub fn from_base(base: paxsite_content::Document) -> Self {
        let description = parse_markdown(&base.description_raw);
        let rest_of_content = base.rest_of_content_raw.as_deref().map(parse_markdown);

        let ignore_node = |node: &markdown::mdast::Node| {
            matches!(
                node,
                markdown::mdast::Node::Code(_)
                    | markdown::mdast::Node::FootnoteReference(_)
                    | markdown::mdast::Node::FootnoteDefinition(_)
            )
        };

        let inner_text = format!(
            "{}\n{}",
            super::markdown::inner_text(&description, Some(ignore_node)),
            rest_of_content
                .as_ref()
                .map(|n| super::markdown::inner_text(n, Some(ignore_node)))
                .unwrap_or_default()
        )
        .trim()
        .to_string();
        let word_count = inner_text.split_whitespace().count();

        Self {
            base,
            description,
            rest_of_content,
            word_count,
        }
    }

    pub fn route_path(&self) -> RoutePath {
        // Canonical route derivation lives in paxsite-content so the SSG and the
        // CLI's standard.site `path` can never drift apart.
        self.base.route_path()
    }

    pub fn alternate_route_path(&self) -> Option<RoutePath> {
        let alternate_id = self.alternate_id.as_ref()?;
        Some(match self.document_type {
            DocumentType::Blog => Route::BlogPost {
                post_id: alternate_id.clone(),
            }
            .route_path(),
            DocumentType::Update => Route::UpdatePost {
                post_id: alternate_id.clone(),
            }
            .route_path(),
            DocumentType::Note => Route::Note {
                note_id: alternate_id.clone(),
            }
            .route_path(),
            // A page has a single route, so it has no alternate one.
            DocumentType::Page => return None,
        })
    }
}

// ── Content ─────────────────────────────────────────────────────────────────

pub struct Content {
    base: paxsite_content::Content,
    pub blog: DocumentCollection,
    pub updates: DocumentCollection,
    pub notes: NotesCollection,
    pub tags: HashMap<Tag, Vec<(DocumentType, DocumentId)>>,
    /// Tag descriptions (inline Markdown) from `content/tags.toml`.
    pub tag_descriptions: HashMap<Tag, String>,
    /// Old tag names mapped directly to their canonical tag names.
    pub tag_aliases: HashMap<Tag, Tag>,
    pub about: Document,
    pub credits: Document,
    pub music_library: paxsite_music::MusicLibrary,
    pub bluesky_posts: HashMap<(String, PathBuf), paxsite_content::bluesky::BlueskyPostData>,
    /// Map from a document's route URL (e.g. `/blog/foo/`) to the set of
    /// heading-slug anchors valid on that page. Used to validate `[a](#x)` and
    /// `[c](../c.md#d)` links during the content-phase pre-pass.
    pub anchors: HashMap<String, HashSet<String>>,
    /// Broken markdown links/anchors found by the content-phase pre-pass (see
    /// [`crate::markdown::validate_document_links`]). Empty when content is sound;
    /// the build/`--check` reports these and bails before rendering.
    pub link_errors: Vec<String>,
}
impl Content {
    #[cfg(test)]
    pub fn empty() -> Self {
        Self {
            base: paxsite_content::Content::empty(),
            blog: DocumentCollection::empty(),
            updates: DocumentCollection::empty(),
            notes: NotesCollection::empty(),
            tags: HashMap::new(),
            tag_descriptions: HashMap::new(),
            tag_aliases: HashMap::new(),
            about: Document::empty(),
            credits: Document::empty(),
            music_library: paxsite_music::MusicLibrary::empty(),
            bluesky_posts: HashMap::new(),
            anchors: HashMap::new(),
            link_errors: Vec::new(),
        }
    }

    pub fn document_asset_paths(&self, document: &Document) -> Vec<PathBuf> {
        // A cache migration can remove flat assets collected by the initial scan.
        let mut paths = document
            .files
            .iter()
            .filter(|path| {
                !path
                    .file_name()
                    .is_some_and(|name| name.to_string_lossy().starts_with("bluesky-"))
                    || path.is_file()
            })
            .cloned()
            .collect::<Vec<_>>();
        let directory = document.source_path.parent().unwrap();
        let mut posts = Vec::new();
        extract_bluesky_urls(&document.description, directory, &mut posts);
        if let Some(rest) = &document.rest_of_content {
            extract_bluesky_urls(rest, directory, &mut posts);
        }
        for key in posts {
            if let Some(post) = self.bluesky_posts.get(&key) {
                paths.extend(
                    post.local_asset_filenames()
                        .map(|name| directory.join(name)),
                );
            }
        }
        paths.sort();
        paths.dedup();
        paths
    }

    pub fn read(
        fast: bool,
        report: &mut impl FnMut(&'static str, std::time::Duration),
    ) -> anyhow::Result<Self> {
        let now = std::time::Instant::now();
        let raw = paxsite_content::Content::read(fast, cfg!(feature = "draft"))?;
        report("Read raw content", now.elapsed());

        let now = std::time::Instant::now();
        let blog = raw.blog.map_documents(Document::from_base);
        report("Parse blog markdown", now.elapsed());

        let now = std::time::Instant::now();
        let updates = raw.updates.map_documents(Document::from_base);
        report("Parse updates markdown", now.elapsed());

        let now = std::time::Instant::now();
        let notes = raw.notes.map_documents(|mut doc| {
            // HACK: Use the music library's modification datetime if it's in use
            // and it's newer than the actual file
            if (doc.description_raw.contains("<MusicLibrary")
                || doc
                    .rest_of_content_raw
                    .as_deref()
                    .is_some_and(|r| r.contains("<MusicLibrary")))
                && let Ok(library_dates) =
                    paxsite_content::get_file_dates(Path::new(MUSIC_LIBRARY_PATH), fast)
                && doc
                    .metadata
                    .last_modified
                    .is_some_and(|lm| library_dates.last_commit > lm)
            {
                doc.metadata.last_modified = Some(library_dates.last_commit);
            }
            Document::from_base(doc)
        });
        report("Parse notes markdown", now.elapsed());

        let now = std::time::Instant::now();
        let about = Document::from_base(raw.about);
        let credits = Document::from_base(raw.credits);
        report("Parse about/credits markdown", now.elapsed());

        let now = std::time::Instant::now();
        let music_library = if fast {
            Default::default()
        } else {
            serde_json::from_str::<paxsite_music::MusicLibrary>(&std::fs::read_to_string(
                MUSIC_LIBRARY_PATH,
            )?)?
        };
        report(
            if fast {
                "Skipped music library"
            } else {
                "Read music library"
            },
            now.elapsed(),
        );

        // Keep the base Content's indices (source path mappings) for link resolution.
        // Documents have been consumed by map_documents, so we replace them with empties.
        let tags = raw.tags;

        let now = std::time::Instant::now();
        let tag_descriptions = raw.tag_config.descriptions;
        let tag_aliases = raw.tag_config.aliases;
        validate_tag_descriptions(&tags, &tag_descriptions)?;
        report("Read tag descriptions", now.elapsed());
        let base = paxsite_content::Content {
            blog: paxsite_content::DocumentCollection::empty(),
            updates: paxsite_content::DocumentCollection::empty(),
            notes: paxsite_content::NotesCollection::empty(),
            about: paxsite_content::Document::empty(),
            credits: paxsite_content::Document::empty(),
            tags: HashMap::new(),
            tag_config: paxsite_content::tags::TagConfig::default(),
            source_path_to_route: raw.source_path_to_route,
            source_path_to_og_image: raw.source_path_to_og_image,
        };

        let mut content = Content {
            base,
            blog,
            updates,
            notes,
            tags,
            tag_descriptions,
            tag_aliases,
            about,
            credits,
            music_library,
            bluesky_posts: HashMap::new(),
            anchors: HashMap::new(),
            link_errors: Vec::new(),
        };

        let now = std::time::Instant::now();
        content.bluesky_posts = content.load_bluesky_posts()?;
        report("Fetched Bluesky posts", now.elapsed());

        let now = std::time::Instant::now();
        content.anchors = content.build_anchor_registry();
        report("Built anchor registry", now.elapsed());

        // Pre-pass: validate every markdown link/anchor now that the registry is
        // built, so the build (or `--check`) can bail before any rendering.
        let now = std::time::Instant::now();
        let link_errors: Vec<String> = content
            .all_documents()
            .flat_map(|doc| super::markdown::validate_document_links(&content, doc))
            .collect();
        content.link_errors = link_errors;
        report("Validated links", now.elapsed());

        Ok(content)
    }

    /// The canonical output route URL for a source path, matching the keys used
    /// by the anchor registry and `resolve_markdown_link`.
    pub fn route_url_for(&self, source_path: &Path) -> Option<&str> {
        self.base
            .source_path_to_route
            .get(source_path)
            .map(String::as_str)
    }

    /// Returns an iterator over all documents in the content.
    pub fn all_documents(&self) -> impl Iterator<Item = &Document> {
        self.blog
            .documents
            .iter()
            .chain(self.updates.documents.iter())
            .chain(std::iter::once(&self.about))
            .chain(std::iter::once(&self.credits))
            .chain(self.notes.documents.all_documents())
    }

    /// Resolves a relative `.md` link from a document's source path to the corresponding route URL.
    pub fn resolve_markdown_link(
        &self,
        from_source_path: &Path,
        relative_link: &str,
    ) -> Option<String> {
        self.base
            .resolve_markdown_link(from_source_path, relative_link)
    }

    /// Iterates over all associated files across all documents.
    pub fn all_associated_files(&self) -> impl Iterator<Item = &PathBuf> {
        fn collect_note_files(
            folder: &DocumentFolderNode,
        ) -> Box<dyn Iterator<Item = &PathBuf> + '_> {
            let index_files = folder
                .index
                .iter()
                .filter_map(|n| {
                    if let DocumentLeafNode::Document(d) = n {
                        Some(d)
                    } else {
                        None
                    }
                })
                .flat_map(|d| d.files.iter());
            let child_files = folder.children.values().flat_map(|node| match node {
                DocumentNode::Folder(f) => collect_note_files(f),
                DocumentNode::Leaf(DocumentLeafNode::Document(document)) => {
                    Box::new(document.files.iter())
                }
                DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => Box::new(std::iter::empty()),
            });
            Box::new(index_files.chain(child_files))
        }

        self.blog
            .documents
            .iter()
            .flat_map(|d| d.files.iter())
            .chain(self.updates.documents.iter().flat_map(|d| d.files.iter()))
            .chain(collect_note_files(&self.notes.documents))
    }

    pub fn document_by_id(
        &self,
        document_type: DocumentType,
        id: &DocumentId,
    ) -> Option<&Document> {
        match document_type {
            DocumentType::Blog => self.blog.document_by_id(id),
            DocumentType::Update => self.updates.document_by_id(id),
            DocumentType::Note => self.notes.documents.document_by_id(id),
            DocumentType::Page => [&self.about, &self.credits]
                .into_iter()
                .find(|page| &page.id == id),
        }
    }

    /// Build a map from each document's route URL to its set of heading-slug
    /// anchors. Keyed on the same route URLs that `resolve_markdown_link`
    /// produces so cross-page lookups can be validated against the registry.
    fn build_anchor_registry(&self) -> HashMap<String, HashSet<String>> {
        let mut anchors = HashMap::new();
        for doc in self.all_documents() {
            let Some(route) = self.base.source_path_to_route.get(&doc.source_path) else {
                continue;
            };
            let mut doc_anchors = super::markdown::collect_heading_anchors(&doc.description);
            if let Some(rest) = &doc.rest_of_content {
                doc_anchors.extend(super::markdown::collect_heading_anchors(rest));
            }
            anchors.insert(route.clone(), doc_anchors);
        }
        anchors
    }

    fn load_bluesky_posts(
        &self,
    ) -> anyhow::Result<HashMap<(String, PathBuf), paxsite_content::bluesky::BlueskyPostData>> {
        let mut posts = Vec::new();
        for doc in self.all_documents() {
            let content_dir = doc.source_path.parent().unwrap().to_path_buf();
            extract_bluesky_urls(&doc.description, &content_dir, &mut posts);
            if let Some(rest) = &doc.rest_of_content {
                extract_bluesky_urls(rest, &content_dir, &mut posts);
            }
        }
        paxsite_content::bluesky::ensure_posts_cached(&posts)
    }
}

/// A used tag without a description is an error; an unused description is a warning.
fn validate_tag_descriptions(
    tags: &HashMap<Tag, Vec<(DocumentType, DocumentId)>>,
    descriptions: &HashMap<Tag, String>,
) -> anyhow::Result<()> {
    let mut undescribed: Vec<&Tag> = tags
        .keys()
        .filter(|tag| !descriptions.contains_key(*tag))
        .collect();
    if !undescribed.is_empty() {
        undescribed.sort();
        anyhow::bail!(
            "{TAG_DESCRIPTIONS_PATH}: no description for {}",
            undescribed
                .iter()
                .map(|tag| format!("\"{tag}\""))
                .collect::<Vec<_>>()
                .join(", ")
        );
    }

    // Only draft builds see every used tag; otherwise draft-only tags look unused.
    let mut unused: Vec<&Tag> = descriptions
        .keys()
        .filter(|tag| !tags.contains_key(*tag))
        .collect();
    if cfg!(feature = "draft") && !unused.is_empty() {
        unused.sort();
        eprintln!(
            "warning: {TAG_DESCRIPTIONS_PATH}: described but unused: {}",
            unused
                .iter()
                .map(|tag| tag.as_str())
                .collect::<Vec<_>>()
                .join(", ")
        );
    }

    Ok(())
}

fn extract_bluesky_urls(
    node: &markdown::mdast::Node,
    content_dir: &Path,
    out: &mut Vec<(String, PathBuf)>,
) {
    if let markdown::mdast::Node::Html(h) = node
        && let Ok(element) = paxhtml::parse_html(&paxhtml::bumpalo::Bump::new(), h.value.trim())
        && element.tag() == Some("BlueskyPost")
        && let Some(url) = element.attr("post").and_then(|a| a.value_as_str())
    {
        out.push((url.to_string(), content_dir.to_path_buf()));
    }
    if let Some(children) = node.children() {
        for child in children {
            extract_bluesky_urls(child, content_dir, out);
        }
    }
}

pub fn parse_markdown(md: &str) -> markdown::mdast::Node {
    markdown::to_mdast(md, &markdown::ParseOptions::gfm()).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn document_assets_include_fetched_media_before_a_second_file_scan() {
        let mut content = Content::empty();
        let mut doc = Document::empty();
        doc.base.source_path = PathBuf::from("content/notes/Projects/example.md");
        let avatar = PathBuf::from("content/notes/Projects/_bluesky/123/avatar.webp");
        doc.base.files = vec![avatar.clone()];
        let url = "https://bsky.app/profile/example.test/post/123";
        let embed = format!("<BlueskyPost post=\"{url}\" />");
        doc.description = parse_markdown(&embed);
        doc.rest_of_content = Some(parse_markdown(&embed));
        content.bluesky_posts.insert(
            (url.into(), doc.source_path.parent().unwrap().to_path_buf()),
            serde_json::from_value(serde_json::json!({
                "url": url,
                "author_display_name": "Example",
                "author_handle": "example.test",
                "author_avatar_filename": "_bluesky/123/avatar.webp",
                "text": "Archived text",
                "facets": [],
                "created_at": "2026-01-01T00:00:00Z",
                "like_count": 0, "reply_count": 0, "repost_count": 0, "quote_count": 0,
                "fetched_at": "2026-01-02T00:00:00Z",
                "images": [{"filename": "_bluesky/123/image-0.webp", "alt": "", "width": null, "height": null}],
                "video": {
                    "playlist": "https://video.bsky.app/playlist.m3u8", "alt": "",
                    "width": null, "height": null,
                    "thumbnail": {"filename": "_bluesky/123/poster.jpg", "alt": "", "width": null, "height": null}
                }
            }))
            .unwrap(),
        );
        assert_eq!(
            content.document_asset_paths(&doc),
            vec![
                avatar,
                PathBuf::from("content/notes/Projects/_bluesky/123/image-0.webp"),
                PathBuf::from("content/notes/Projects/_bluesky/123/poster.jpg"),
            ]
        );
        let mut other = Document::empty();
        other.base.source_path = PathBuf::from("content/notes/Other/example.md");
        other.description = parse_markdown(&embed);
        let mut other_post = content.bluesky_posts.values().next().unwrap().clone();
        other_post.author_avatar_filename = Some("different-avatar.jpg".into());
        other_post.images[0].filename = "different-image.png".into();
        other_post.video = None;
        content.bluesky_posts.insert(
            (
                url.into(),
                other.source_path.parent().unwrap().to_path_buf(),
            ),
            other_post,
        );
        assert_eq!(
            content.document_asset_paths(&other),
            vec![
                PathBuf::from("content/notes/Other/different-avatar.jpg"),
                PathBuf::from("content/notes/Other/different-image.png"),
            ]
        );
        doc.description = parse_markdown("");
        assert_eq!(content.document_asset_paths(&doc).len(), 3);
        doc.rest_of_content = None;
        assert_eq!(content.document_asset_paths(&doc), doc.files);
    }

    #[test]
    fn migrated_flat_assets_do_not_survive_the_initial_document_scan() {
        let content = Content::empty();
        let mut doc = Document::empty();
        let directory = std::env::temp_dir().join(format!(
            "paxsite-migrated-assets-{}-{}",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos(),
        ));
        std::fs::create_dir(&directory).unwrap();
        doc.base.source_path = directory.join("example.md");
        let removed = directory.join("bluesky-old-0.webp");
        let retained = directory.join("bluesky-other-0.webp");
        let ordinary = directory.join("ordinary-image.webp");
        std::fs::write(&retained, b"image").unwrap();
        doc.base.files = vec![removed, retained.clone(), ordinary.clone()];
        let mut expected = vec![retained, ordinary];
        expected.sort();
        assert_eq!(content.document_asset_paths(&doc), expected);
        std::fs::remove_dir_all(directory).unwrap();
    }

    #[test]
    fn test_resolve_markdown_link() {
        let mut content = Content::empty();
        content.base.source_path_to_route.insert(
            PathBuf::from("content/notes/Programming/Reasons_I_do_not_like_Python.md"),
            "/notes/programming/reasons-i-do-not-like-python/".to_string(),
        );
        content.base.source_path_to_route.insert(
            PathBuf::from("content/blog/ocufabulous/index.md"),
            "/blog/ocufabulous/".to_string(),
        );

        // Same directory
        assert_eq!(
            content.resolve_markdown_link(
                Path::new("content/notes/Programming/Using_uv.md"),
                "Reasons_I_do_not_like_Python.md"
            ),
            Some("/notes/programming/reasons-i-do-not-like-python/".to_string())
        );

        // Parent traversal
        assert_eq!(
            content.resolve_markdown_link(
                Path::new("content/notes/Hardware/VR_Headsets.md"),
                "../../blog/ocufabulous/index.md"
            ),
            Some("/blog/ocufabulous/".to_string())
        );

        // With fragment
        assert_eq!(
            content.resolve_markdown_link(
                Path::new("content/notes/Programming/Using_uv.md"),
                "Reasons_I_do_not_like_Python.md#section"
            ),
            Some("/notes/programming/reasons-i-do-not-like-python/#section".to_string())
        );

        // Non-existent target
        assert_eq!(
            content.resolve_markdown_link(
                Path::new("content/notes/Programming/Using_uv.md"),
                "nonexistent.md"
            ),
            None
        );
    }
}
