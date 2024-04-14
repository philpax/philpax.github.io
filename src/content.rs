use std::{
    collections::HashMap,
    path::{Path, PathBuf},
};

use anyhow::Context;
use serde::Deserialize;

use crate::{config, util};

pub type CollectionId = String;
pub type DocumentId = String;
pub type Tag = String;

#[derive(Debug)]
pub struct Content {
    pub path: PathBuf,
    pub collections: HashMap<CollectionId, Collection>,
    pub tags: HashMap<Tag, Vec<(CollectionId, DocumentId)>>,
}
impl Content {
    pub fn read() -> anyhow::Result<Self> {
        let mut content = Content {
            path: Path::new("content").to_path_buf(),
            collections: HashMap::new(),
            tags: HashMap::new(),
        };

        content.read_collection("about")?;
        content.read_collection("blog")?;

        for (collection_id, collection) in &content.collections {
            for document in &collection.documents {
                if let Some(taxonomies) = &document.metadata.taxonomies {
                    for tag in &taxonomies.tags {
                        content
                            .tags
                            .entry(tag.clone())
                            .or_default()
                            .push((collection_id.clone(), document.id.clone()));
                    }
                }
            }
        }

        Ok(content)
    }

    pub fn read_collection(&mut self, id: &str) -> anyhow::Result<()> {
        let collection = Collection::read(&self.path, id)?;
        self.collections.insert(collection.id.clone(), collection);

        Ok(())
    }

    pub fn blog(&self) -> &Collection {
        self.collections.get("blog").unwrap()
    }
}

#[derive(Debug)]
pub struct Collection {
    pub id: CollectionId,
    pub documents: Vec<Document>,
    pub document_key_to_id: HashMap<DocumentId, usize>,
}
impl Collection {
    pub fn read(content_path: &Path, id: &str) -> anyhow::Result<Self> {
        let collection_path = content_path.join(id);

        let mut collection = Collection {
            id: id.to_string(),
            documents: vec![],
            document_key_to_id: HashMap::new(),
        };

        for entry in std::fs::read_dir(&collection_path)? {
            let path = entry?.path();
            if !path.is_dir() {
                continue;
            }

            let id = path
                .file_name()
                .context("no post id for directory")?
                .to_string_lossy()
                .to_string();

            let index = path.join("index.md");
            if !index.exists() {
                anyhow::bail!("no index.md for {}/{id}", collection.id);
            }

            collection.read_document(&index, id)?;
        }

        let index_path = collection_path.join("index.md");
        if index_path.exists() {
            collection.read_document(&index_path, "index".to_string())?;
        }

        collection.documents.sort_by_key(|d| d.metadata.datetime());
        collection.documents.reverse();

        for (i, document) in collection.documents.iter().enumerate() {
            collection.document_key_to_id.insert(document.id.clone(), i);
            if let Some(alternate_id) = &document.alternate_id {
                collection
                    .document_key_to_id
                    .insert(alternate_id.clone(), i);
            }
        }

        Ok(collection)
    }

    fn read_document(&mut self, path: &Path, id: String) -> anyhow::Result<()> {
        let document = Document::read(path, id)?;
        self.documents.push(document);

        Ok(())
    }

    pub fn document_by_id(&self, id: &str) -> Option<&Document> {
        self.document_key_to_id
            .get(id)
            .and_then(|&i| self.documents.get(i))
    }
}

#[derive(Debug)]
pub struct Document {
    pub id: DocumentId,
    pub alternate_id: Option<DocumentId>,
    pub metadata: DocumentMetadata,
    pub description: Option<markdown::mdast::Node>,
    pub content: markdown::mdast::Node,
    pub files: Vec<PathBuf>,
}
impl Document {
    fn read(path: &Path, id: String) -> anyhow::Result<Self> {
        let file = std::fs::read_to_string(path)?;
        let parts: Vec<_> = file.splitn(3, "+++").collect();

        if parts.len() != 3 {
            return Err(anyhow::anyhow!("invalid markdown file"));
        }

        let metadata: DocumentMetadata = toml::from_str(parts[1])?;
        let content_raw = parts[2];

        let description = content_raw
            .split("<!-- more -->")
            .next()
            .map(|s| parse_markdown(s.trim()));
        let content = parse_markdown(content_raw);

        let mut files = vec![];
        for entry in std::fs::read_dir(path.parent().unwrap())? {
            let path = entry?.path();
            if path.extension().is_some_and(|e| e == "md") {
                continue;
            }
            files.push(path);
        }

        let alternate_id = util::slugify(&metadata.title);
        let alternate_id = if alternate_id == id {
            None
        } else {
            Some(alternate_id)
        };

        Ok(Document {
            id,
            alternate_id,
            metadata,
            description,
            content,
            files,
        })
    }

    pub fn url(&self, collection: &Collection, absolute_url: bool) -> String {
        let mut url = String::new();

        if absolute_url {
            url.push_str(config::BASE_URL);
        }

        url.push('/');
        url.push_str(&collection.id);
        if self.id != "index" {
            url.push('/');
            url.push_str(&self.id);
        }
        url.push('/');

        url
    }
}

#[derive(Debug, Deserialize, Clone, Copy)]
#[serde(transparent)]
pub struct NaiveDate(#[serde(with = "toml_datetime_compat")] chrono::NaiveDate);

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    date: Option<NaiveDate>,
    pub taxonomies: Option<DocumentTaxonomies>,
}
impl DocumentMetadata {
    pub fn datetime(&self) -> Option<chrono::DateTime<chrono::Utc>> {
        self.date
            .map(|d| d.0.and_time(Default::default()).and_utc())
    }
}

#[derive(Debug, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<Tag>,
}

fn parse_markdown(md: &str) -> markdown::mdast::Node {
    markdown::to_mdast(md, &markdown::ParseOptions::gfm()).unwrap()
}
