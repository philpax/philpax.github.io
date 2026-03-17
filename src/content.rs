use std::{
    collections::HashMap,
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
        match self.document_type {
            DocumentType::Blog => Route::BlogPost {
                post_id: self.id.clone(),
            }
            .route_path(),
            DocumentType::Update => Route::UpdatePost {
                post_id: self.id.clone(),
            }
            .route_path(),
            DocumentType::Note => Route::Note {
                note_id: self.id.clone(),
            }
            .route_path(),
        }
    }

    pub fn alternate_route_path(&self) -> Option<RoutePath> {
        self.alternate_id
            .as_ref()
            .map(|post_id| match self.document_type {
                DocumentType::Blog => Route::BlogPost {
                    post_id: post_id.clone(),
                }
                .route_path(),
                DocumentType::Update => Route::UpdatePost {
                    post_id: post_id.clone(),
                }
                .route_path(),
                DocumentType::Note => Route::Note {
                    note_id: post_id.clone(),
                }
                .route_path(),
            })
    }
}

// ── Content ─────────────────────────────────────────────────────────────────

pub struct Content {
    base: paxsite_content::Content,
    pub blog: DocumentCollection,
    pub updates: DocumentCollection,
    pub notes: NotesCollection,
    pub tags: HashMap<Tag, Vec<DocumentId>>,
    pub about: Document,
    pub credits: Document,
    pub music_library: blackbird_json_export_types::Output,
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
            about: Document::empty(),
            credits: Document::empty(),
            music_library: blackbird_json_export_types::Output::new(),
        }
    }

    pub fn read(
        fast: bool,
        report: &mut impl FnMut(&'static str, std::time::Duration),
    ) -> anyhow::Result<Self> {
        let now = std::time::Instant::now();
        let raw = paxsite_content::Content::read(fast)?;
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
            serde_json::from_str::<blackbird_json_export_types::Output>(&std::fs::read_to_string(
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
        let base = paxsite_content::Content {
            blog: paxsite_content::DocumentCollection::empty(),
            updates: paxsite_content::DocumentCollection::empty(),
            notes: paxsite_content::NotesCollection::empty(),
            about: paxsite_content::Document::empty(),
            credits: paxsite_content::Document::empty(),
            tags: HashMap::new(),
            source_path_to_route: raw.source_path_to_route,
            source_path_to_og_image: raw.source_path_to_og_image,
        };

        Ok(Content {
            base,
            blog,
            updates,
            notes,
            tags,
            about,
            credits,
            music_library,
        })
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

    pub fn document_by_id(&self, id: &DocumentId) -> Option<&Document> {
        self.blog
            .document_by_id(id)
            .or_else(|| self.updates.document_by_id(id))
    }
}

pub fn parse_markdown(md: &str) -> markdown::mdast::Node {
    markdown::to_mdast(md, &markdown::ParseOptions::gfm()).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

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
