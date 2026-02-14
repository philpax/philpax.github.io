use std::{
    collections::{BTreeMap, HashMap},
    path::{Path, PathBuf},
    process::Command,
};

use anyhow::Context;
use serde::Deserialize;

use crate::{Route, RoutePath, util};

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

const MUSIC_LIBRARY_PATH: &str = "assets/baked/music.json";

pub struct Content {
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
        let path = PathBuf::from("content");

        let now = std::time::Instant::now();
        let blog = DocumentCollection::read(&path.join("blog"), DocumentType::Blog, fast)?;
        report("Read blog", now.elapsed());

        let now = std::time::Instant::now();
        let updates = DocumentCollection::read(&path.join("updates"), DocumentType::Update, fast)?;
        report("Read updates", now.elapsed());

        let now = std::time::Instant::now();
        let notes = NotesCollection::read(&path.join("notes"), fast)?;
        report("Read notes", now.elapsed());

        // Combine tags from both blog and updates
        let now = std::time::Instant::now();
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
        report("Built tags index", now.elapsed());

        let now = std::time::Instant::now();
        let about = Document::read(
            &path.join("about.md"),
            vec!["about".to_string()],
            vec!["About".to_string()],
            DocumentType::Blog,
            fast,
        )?;
        report("Read about", now.elapsed());

        let now = std::time::Instant::now();
        let credits = Document::read(
            &path.join("credits.md"),
            vec!["credits".to_string()],
            vec!["Credits".to_string()],
            DocumentType::Blog,
            fast,
        )?;
        report("Read credits", now.elapsed());

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

        Ok(Content {
            blog,
            updates,
            notes,
            tags,
            about,
            credits,
            music_library,
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
    #[cfg(test)]
    pub fn empty() -> Self {
        Self {
            documents: vec![],
            document_key_to_id: HashMap::new(),
        }
    }

    fn read(
        collection_path: &Path,
        document_type: DocumentType,
        fast: bool,
    ) -> anyhow::Result<Self> {
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

                documents.push(Document::read(
                    &index,
                    vec![id.clone()],
                    vec![id],
                    document_type,
                    fast,
                )?);
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
    #[cfg(test)]
    pub fn empty() -> Self {
        Self {
            documents: DocumentFolderNode {
                index_document: None,
                folder_name: "".to_string(),
                children: Default::default(),
            },
        }
    }

    fn read(collection_path: &Path, fast: bool) -> anyhow::Result<Self> {
        fn find_documents(
            collection_path: &Path,
            path: &Path,
            fast: bool,
        ) -> anyhow::Result<DocumentFolderNode> {
            const HOME_NAME: &str = "Home";

            fn path_to_display_name(collection_path: &Path, path: &Path) -> Vec<String> {
                let mut output: Vec<String> = path
                    .with_extension("")
                    .strip_prefix(collection_path)
                    .unwrap()
                    .iter()
                    .map(|s| s.to_string_lossy().to_string())
                    .collect();
                if output.is_empty() {
                    output.push(HOME_NAME.to_string());
                }
                output
            }

            fn display_path_to_id(display_path: &[String]) -> DocumentId {
                if display_path.len() == 1 && display_path[0] == HOME_NAME {
                    return vec![];
                }

                display_path.iter().map(|s| util::slugify(s)).collect()
            }

            let mut documents = BTreeMap::new();
            let display_name = path_to_display_name(collection_path, path);
            let folder_name = display_name.last().cloned().unwrap();
            let index_document = if path.join("index.md").exists() {
                Some(Document::read(
                    &path.join("index.md"),
                    display_path_to_id(&display_name),
                    display_name,
                    DocumentType::Note,
                    fast,
                )?)
            } else {
                None
            };

            for entry in std::fs::read_dir(path)? {
                let path = entry?.path();

                if path.file_name().is_some_and(|f| f == "index.md") {
                    continue;
                }

                let display_path = path_to_display_name(collection_path, &path);
                let document_name = display_path.last().unwrap().clone();
                let document_id = display_path_to_id(&display_path);

                if path.is_dir() {
                    documents.insert(
                        document_name,
                        DocumentNode::Folder(find_documents(collection_path, &path, fast)?),
                    );
                    continue;
                }

                if path.extension().is_some_and(|e| e == "md") {
                    documents.insert(
                        document_name,
                        DocumentNode::Document {
                            document: Document::read(
                                &path,
                                document_id,
                                display_path,
                                DocumentType::Note,
                                fast,
                            )?,
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

        let documents = find_documents(collection_path, collection_path, fast)?;
        Ok(NotesCollection { documents })
    }
}

impl DocumentFolderNode {
    /// A leaf folder has an index document but no children,
    /// so it should be treated as a single note rather than an expandable folder.
    pub fn is_leaf(&self) -> bool {
        self.index_document.is_some() && self.children.is_empty()
    }

    pub fn find_folder_for_document(&self, id: &DocumentId) -> Option<&DocumentFolderNode> {
        if let Some(doc) = &self.index_document
            && doc.id == *id
        {
            return Some(self);
        }
        for child in self.children.values() {
            if let DocumentNode::Folder(f) = child
                && let Some(result) = f.find_folder_for_document(id)
            {
                return Some(result);
            }
        }
        None
    }
}

#[derive(Debug)]
pub struct Document {
    pub id: DocumentId,
    pub alternate_id: Option<DocumentId>,
    pub display_path: Vec<String>,
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
    #[cfg(test)]
    pub fn empty() -> Self {
        Self {
            id: vec![],
            alternate_id: None,
            display_path: vec![],
            document_type: DocumentType::Blog,
            metadata: DocumentMetadata {
                title: "".to_string(),
                short: None,
                datetime: None,
                last_modified: None,
                taxonomies: None,
            },
            description: markdown::mdast::Node::Root(markdown::mdast::Root {
                children: Default::default(),
                position: Default::default(),
            }),
            rest_of_content: None,
            files: vec![],
            hero_filename_and_alt: None,
            word_count: 0,
        }
    }

    fn read(
        path: &Path,
        id: DocumentId,
        display_path: Vec<String>,
        document_type: DocumentType,
        fast: bool,
    ) -> anyhow::Result<Self> {
        let file =
            std::fs::read_to_string(path).with_context(|| format!("failed to read {path:?}"))?;
        let (metadata, content_raw) = if document_type != DocumentType::Note {
            let parts: Vec<_> = file.splitn(3, "+++").collect();

            if parts.len() != 3 {
                return Err(anyhow::anyhow!(
                    "invalid markdown file: missing front matter"
                ));
            }

            let mut metadata: DocumentMetadata = toml::from_str(parts[1])?;
            let file_dates = get_file_dates(path, fast)?;
            metadata.last_modified = Some(file_dates.last_commit);
            let content_raw = parts[2];

            (metadata, content_raw)
        } else {
            let mut file_dates = get_file_dates(path, fast)?;

            // HACK: Use the music library's modification datetime if it's in use + it's newer than the actual file
            if file.contains("<MusicLibrary") {
                let library_dates = get_file_dates(Path::new(MUSIC_LIBRARY_PATH), fast)?;
                if library_dates.last_commit > file_dates.last_commit {
                    file_dates.last_commit = library_dates.last_commit;
                }
            }

            let metadata = DocumentMetadata {
                title: display_path.last().cloned().unwrap(),
                short: None,
                datetime: Some(file_dates.first_commit),
                last_modified: Some(file_dates.last_commit),
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
            display_path,
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

    pub fn og_image_path(&self) -> String {
        let type_dir = match self.document_type {
            DocumentType::Blog => "blog",
            DocumentType::Update => "updates",
            DocumentType::Note => "notes",
        };
        let filename = format!("{}.png", self.id.join("-"));
        format!("/og-images/{}/{}", type_dir, filename)
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

    pub fn tags(&self) -> Option<&Vec<String>> {
        self.metadata.taxonomies.as_ref().map(|t| &t.tags)
    }
}

#[derive(Debug, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    short: Option<String>,
    #[serde(with = "toml_datetime_compat", default)]
    pub datetime: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(skip)]
    pub last_modified: Option<chrono::DateTime<chrono::Utc>>,
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

struct FileDates {
    first_commit: chrono::DateTime<chrono::Utc>,
    last_commit: chrono::DateTime<chrono::Utc>,
}

fn get_file_dates(path: &Path, fast: bool) -> anyhow::Result<FileDates> {
    // Helper to get file mtime
    let get_mtime = || -> anyhow::Result<chrono::DateTime<chrono::Utc>> {
        let metadata = std::fs::metadata(path)?;
        let modified = metadata.modified()?;
        let datetime = chrono::DateTime::from(modified);
        Ok(datetime.with_timezone(&chrono::Utc))
    };

    // In fast mode, skip git and just use file mtime for both
    if fast {
        let mtime = get_mtime()?;
        return Ok(FileDates {
            first_commit: mtime,
            last_commit: mtime,
        });
    }

    // Get all commit dates in one Git call
    let git_output = Command::new("git")
        .args([
            "log",
            "--format=%cI",
            "--follow",
            "--",
            path.to_str().unwrap(),
        ])
        .output();

    if let Some(output) = git_output.ok().filter(|o| o.status.success()) {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let dates: Vec<chrono::DateTime<chrono::Utc>> = stdout
            .lines()
            .filter_map(|line| {
                chrono::DateTime::parse_from_rfc3339(line.trim())
                    .ok()
                    .map(|dt| dt.with_timezone(&chrono::Utc))
            })
            .collect();

        if !dates.is_empty() {
            return Ok(FileDates {
                // First line is most recent commit, last line is first commit
                last_commit: dates[0],
                first_commit: dates[dates.len() - 1],
            });
        }
    }

    // Fallback to file modification time
    let mtime = get_mtime()?;
    Ok(FileDates {
        first_commit: mtime,
        last_commit: mtime,
    })
}
