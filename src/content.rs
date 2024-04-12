use std::{
    collections::HashMap,
    path::{Path, PathBuf},
};

use anyhow::Context;
use serde::Deserialize;

#[derive(Debug)]
pub struct Content {
    pub path: PathBuf,
    pub collections: HashMap<String, Collection>,
}
impl Content {
    pub fn read() -> anyhow::Result<Self> {
        let mut content = Content {
            path: Path::new("content").to_path_buf(),
            collections: HashMap::new(),
        };

        content.read_collection("about")?;
        content.read_collection("blog")?;

        Ok(content)
    }

    pub fn read_collection(&mut self, id: &str) -> anyhow::Result<()> {
        let collection = Collection::read(&self.path, id)?;
        self.collections.insert(collection.id.clone(), collection);

        Ok(())
    }
}

#[derive(Debug)]
pub struct Collection {
    pub id: String,
    pub documents: HashMap<String, Document>,
}
impl Collection {
    pub fn read(content_path: &Path, id: &str) -> anyhow::Result<Self> {
        let collection_path = content_path.join(id);

        let mut collection = Collection {
            id: id.to_string(),
            documents: HashMap::new(),
        };

        for entry in std::fs::read_dir(&collection_path)? {
            let path = entry?.path();
            if !path.is_dir() {
                continue;
            }

            collection.read_document_dir(&path)?;
        }

        let index_path = collection_path.join("index.md");
        if index_path.exists() {
            collection.read_document(&index_path, "index".to_string())?;
        }

        Ok(collection)
    }

    fn read_document_dir(&mut self, path: &Path) -> anyhow::Result<()> {
        let id = path
            .file_name()
            .context("no post id for directory")?
            .to_string_lossy()
            .to_string();

        let index = path.join("index.md");
        if !index.exists() {
            anyhow::bail!("no index.md for {}/{id}", self.id);
        }

        self.read_document(&index, id)
    }

    fn read_document(&mut self, path: &Path, id: String) -> Result<(), anyhow::Error> {
        let file = std::fs::read_to_string(path)?;
        let parts: Vec<_> = file.splitn(3, "+++").collect();

        if parts.len() != 3 {
            return Err(anyhow::anyhow!("invalid markdown file"));
        }

        let metadata: DocumentMetadata = toml::from_str(parts[1])?;
        let content = markdown::to_mdast(parts[2], &markdown::ParseOptions::gfm()).unwrap();

        let doc = Document {
            id,
            metadata,
            content,
        };

        self.documents.insert(doc.id.clone(), doc);

        Ok(())
    }
}

#[derive(Debug)]
pub struct Document {
    pub id: String,
    pub metadata: DocumentMetadata,
    pub content: markdown::mdast::Node,
}

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    pub date: Option<toml::value::Datetime>,
    pub taxonomies: Option<DocumentTaxonomies>,
}

#[derive(Debug, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<String>,
}
