use std::{
    collections::{BTreeMap, HashMap},
    path::{Path, PathBuf},
};

use anyhow::Context;
use serde::Deserialize;

use crate::{util, Route, RoutePath};

pub type DocumentId = Vec<String>;
pub type Tag = String;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DocumentType {
    Blog,
    Update,
    Note,
}
impl std::fmt::Display for DocumentType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{self:?}")
    }
}

#[derive(Debug)]
pub struct Content {
    pub path: PathBuf,
    pub blog: DocumentCollection,
    pub updates: DocumentCollection,
    pub notes: NotesCollection,
    pub tags: HashMap<Tag, Vec<DocumentId>>,
    pub about: Document,
    pub credits: Document,
}
impl Content {
    pub fn read() -> anyhow::Result<Self> {
        let path = PathBuf::from("content");

        let blog = DocumentCollection::read(&path.join("blog"), DocumentType::Blog)?;
        let updates = DocumentCollection::read(&path.join("updates"), DocumentType::Update)?;
        let notes = NotesCollection::read(&path.join("notes"))?;

        // Combine tags from both blog and updates
        let mut tags = HashMap::new();
        for document in blog.documents.iter().chain(updates.documents.iter()) {
            if let Some(taxonomies) = &document.metadata.taxonomies {
                for tag in &taxonomies.tags {
                    tags.entry(tag.clone())
                        .or_insert_with(Vec::new)
                        .push(document.id.clone());
                }
            }
        }

        Ok(Content {
            path: path.clone(),
            blog,
            updates,
            notes,
            tags,
            about: Document::read(
                &path.join("about.md"),
                vec!["about".to_string()],
                DocumentType::Blog,
            )?,
            credits: Document::read(
                &path.join("credits.md"),
                vec!["credits".to_string()],
                DocumentType::Blog,
            )?,
        })
    }

    pub fn document_by_id(&self, id: &DocumentId) -> Option<&Document> {
        self.blog
            .document_by_id(id)
            .or_else(|| self.updates.document_by_id(id))
    }
}

#[derive(Debug)]
pub struct DocumentCollection {
    pub documents: Vec<Document>,
    pub document_key_to_id: HashMap<DocumentId, usize>,
}
impl DocumentCollection {
    fn read(collection_path: &Path, document_type: DocumentType) -> anyhow::Result<Self> {
        let documents = {
            let mut documents = vec![];
            for entry in std::fs::read_dir(collection_path)? {
                let path = entry?.path();
                if !path.is_dir() {
                    continue;
                }

                let id = path
                    .file_name()
                    .context("no document id for directory")?
                    .to_string_lossy()
                    .to_string();

                let index = path.join("index.md");
                if !index.exists() {
                    anyhow::bail!("{index:?} does not exist");
                }

                documents.push(Document::read(&index, vec![id], document_type)?);
            }
            documents.sort_by_key(|d| d.metadata.datetime);
            documents.reverse();
            documents
        };

        let document_key_to_id = {
            let mut document_key_to_id = HashMap::new();
            for (i, document) in documents.iter().enumerate() {
                document_key_to_id.insert(document.id.clone(), i);
                if let Some(alternate_id) = &document.alternate_id {
                    document_key_to_id.insert(alternate_id.clone(), i);
                }
            }
            document_key_to_id
        };

        Ok(DocumentCollection {
            documents,
            document_key_to_id,
        })
    }

    pub fn document_by_id(&self, id: &DocumentId) -> Option<&Document> {
        self.document_key_to_id
            .get(id)
            .and_then(|&i| self.documents.get(i))
    }
}

#[derive(Debug)]
pub struct DocumentFolderNode {
    pub index_document: Option<Document>,
    pub folder_name: String,
    pub children: BTreeMap<String, DocumentNode>,
}

#[derive(Debug)]
pub enum DocumentNode {
    Folder(DocumentFolderNode),
    Document { document: Document },
}

#[derive(Debug)]
pub struct NotesCollection {
    pub documents: DocumentFolderNode,
}
impl NotesCollection {
    fn read(collection_path: &Path) -> anyhow::Result<Self> {
        fn find_documents(
            collection_path: &Path,
            path: &Path,
        ) -> anyhow::Result<DocumentFolderNode> {
            fn path_to_id(collection_path: &Path, path: &Path) -> DocumentId {
                path.with_extension("")
                    .strip_prefix(collection_path)
                    .unwrap()
                    .iter()
                    .map(|s| s.to_string_lossy().to_string())
                    .collect()
            }

            let mut documents = BTreeMap::new();
            let id = path_to_id(collection_path, path);
            let folder_name = id.last().cloned().unwrap_or_else(|| "Home".to_string());
            let index_document = if path.join("index.md").exists() {
                Some(Document::read(
                    &path.join("index.md"),
                    id,
                    DocumentType::Note,
                )?)
            } else {
                None
            };

            for entry in std::fs::read_dir(path)? {
                let path = entry?.path();

                if path.file_name().is_some_and(|f| f == "index.md") {
                    continue;
                }

                let path_id = path_to_id(collection_path, &path);
                let id = path_id.last().unwrap().clone();

                if path.is_dir() {
                    documents.insert(
                        id,
                        DocumentNode::Folder(find_documents(collection_path, &path)?),
                    );
                    continue;
                }

                if path.extension().is_some_and(|e| e == "md") {
                    documents.insert(
                        id,
                        DocumentNode::Document {
                            document: Document::read(&path, path_id, DocumentType::Note)?,
                        },
                    );
                }
            }
            Ok(DocumentFolderNode {
                index_document,
                folder_name,
                children: documents,
            })
        }

        Ok(NotesCollection {
            documents: find_documents(collection_path, collection_path)?,
        })
    }
}

#[derive(Debug)]
pub struct Document {
    pub id: DocumentId,
    pub alternate_id: Option<DocumentId>,
    pub document_type: DocumentType,
    pub metadata: DocumentMetadata,
    pub description: markdown::mdast::Node,
    pub rest_of_content: Option<markdown::mdast::Node>,
    pub files: Vec<PathBuf>,
    pub hero_filename_and_alt: Option<(String, String)>,
    pub word_count: usize,
}
impl std::fmt::Display for Document {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}:", self.document_type.to_string().to_lowercase())?;
        for (idx, id) in self.id.iter().enumerate() {
            if idx > 0 {
                write!(f, "/")?;
            }
            write!(f, "{id}")?;
        }
        Ok(())
    }
}
impl Document {
    fn read(path: &Path, id: DocumentId, document_type: DocumentType) -> anyhow::Result<Self> {
        let file =
            std::fs::read_to_string(path).with_context(|| format!("failed to read {path:?}"))?;
        let (metadata, content_raw) = if document_type != DocumentType::Note {
            let parts: Vec<_> = file.splitn(3, "+++").collect();

            if parts.len() != 3 {
                return Err(anyhow::anyhow!(
                    "invalid markdown file: missing front matter"
                ));
            }

            let metadata: DocumentMetadata = toml::from_str(parts[1])?;
            let content_raw = parts[2];

            (metadata, content_raw)
        } else {
            let metadata = DocumentMetadata {
                title: id.last().cloned().unwrap_or_else(|| "Home".to_string()),
                short: None,
                datetime: None,
                taxonomies: None,
            };
            (metadata, file.as_str())
        };

        let (description, rest_of_content) = match content_raw.split_once("<!-- more -->") {
            Some((description, rest_of_content)) => (
                parse_markdown(description.trim()),
                Some(parse_markdown(rest_of_content.trim())),
            ),
            None => (parse_markdown(content_raw), None),
        };

        let mut files = vec![];
        let mut hero_filename = None;
        let mut hero_alt = None;
        for entry in std::fs::read_dir(path.parent().unwrap())? {
            let path = entry?.path();
            if path.extension().is_some_and(|e| e == "md") {
                continue;
            }
            if path.is_dir() {
                // Boy, I hope this doesn't come back to bite me later
                continue;
            }
            if let Some(filename) = path.file_name() {
                let filename = filename.to_string_lossy();
                if filename == "hero.jpg" {
                    hero_filename = Some(filename.to_string());
                } else if filename == "hero.txt" {
                    hero_alt = Some(std::fs::read_to_string(&path)?);
                }
            }
            files.push(path);
        }

        if hero_filename.is_some() && hero_alt.is_none() {
            anyhow::bail!("hero.txt is missing for {id:?}");
        }

        let alternate_id = if !id.is_empty() {
            let alternate_id = id[0..id.len() - 1]
                .iter()
                .cloned()
                .chain([util::slugify(&metadata.title)])
                .collect::<Vec<_>>();
            if alternate_id == id {
                None
            } else {
                Some(alternate_id)
            }
        } else {
            None
        };

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

        Ok(Document {
            id,
            alternate_id,
            document_type,
            metadata,
            description,
            rest_of_content,
            files,
            hero_filename_and_alt: hero_filename.zip(hero_alt),
            word_count,
        })
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

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    short: Option<String>,
    #[serde(with = "toml_datetime_compat", default)]
    pub datetime: Option<chrono::DateTime<chrono::Utc>>,
    pub taxonomies: Option<DocumentTaxonomies>,
}
impl DocumentMetadata {
    pub fn short(&self) -> Option<markdown::mdast::Node> {
        self.short.as_deref().map(parse_markdown)
    }
}

#[derive(Debug, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<Tag>,
}

pub fn parse_markdown(md: &str) -> markdown::mdast::Node {
    markdown::to_mdast(md, &markdown::ParseOptions::gfm()).unwrap()
}
