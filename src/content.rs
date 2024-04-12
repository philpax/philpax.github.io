use std::{collections::HashMap, path::Path};

use anyhow::Context;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    pub date: toml::value::Datetime,
    pub taxonomies: DocumentTaxonomies,
}

#[derive(Debug, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<String>,
}

#[derive(Debug)]
pub struct Document {
    pub id: String,
    pub metadata: DocumentMetadata,
    pub content: markdown::mdast::Node,
}

#[derive(Debug)]
pub struct Content {
    pub blog: HashMap<String, Document>,
}
impl Content {
    pub fn read() -> anyhow::Result<Self> {
        let content_path = Path::new("content");
        let blog_path = content_path.join("blog");

        let mut blog = HashMap::new();
        for entry in std::fs::read_dir(blog_path)? {
            let path = entry?.path();
            if !path.is_dir() {
                continue;
            }

            let doc = Self::read_document_dir(&path)?;
            blog.insert(doc.id.clone(), doc);
        }

        Ok(Self { blog })
    }

    fn read_document_dir(path: &Path) -> anyhow::Result<Document> {
        if !path.is_dir() {
            anyhow::bail!("{path:?} not a directory");
        }

        let id = path
            .file_name()
            .context("no post id for directory")?
            .to_string_lossy()
            .to_string();

        let index = path.join("index.md");
        if !index.exists() {
            anyhow::bail!("no index.md for post {id}");
        }

        let file = std::fs::read_to_string(&index)?;
        let parts: Vec<_> = file.splitn(3, "+++").collect();

        if parts.len() != 3 {
            return Err(anyhow::anyhow!("invalid markdown file"));
        }

        let metadata: DocumentMetadata = toml::from_str(parts[1])?;
        let content = markdown::to_mdast(parts[2], &markdown::ParseOptions::gfm()).unwrap();

        Ok(Document {
            id,
            metadata,
            content,
        })
    }
}
