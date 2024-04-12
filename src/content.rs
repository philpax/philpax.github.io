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
    pub metadata: DocumentMetadata,
    pub content: markdown::mdast::Node,
}

#[derive(Debug)]
pub struct Content {
    pub blog: HashMap<String, Document>,
}

pub fn read() -> anyhow::Result<Content> {
    let content_path = Path::new("content");
    let blog_path = content_path.join("blog");

    let mut blog = HashMap::new();
    for entry in std::fs::read_dir(blog_path)? {
        let entry = entry?;
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }

        let post_id = path
            .file_name()
            .context("no post id for directory")?
            .to_string_lossy()
            .to_string();

        let index = path.join("index.md");
        if !index.exists() {
            continue;
        }

        let file = std::fs::read_to_string(&index)?;
        let doc = parse_markdown_file(&file)?;
        blog.insert(post_id, doc);
    }

    Ok(Content { blog })
}

pub fn parse_markdown_file(file: &str) -> anyhow::Result<Document> {
    let parts: Vec<_> = file.splitn(3, "+++").collect();

    if parts.len() != 3 {
        return Err(anyhow::anyhow!("invalid markdown file"));
    }

    let metadata: DocumentMetadata = toml::from_str(parts[1])?;
    let content = markdown::to_mdast(parts[2], &markdown::ParseOptions::gfm()).unwrap();

    Ok(Document { metadata, content })
}
