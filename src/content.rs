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
    source_path_to_route: HashMap<PathBuf, String>,
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
            source_path_to_route: HashMap::new(),
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
        let mut notes = NotesCollection::read(&path.join("notes"), fast)?;
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

        let now = std::time::Instant::now();
        let (source_path_to_route, source_path_to_og_image) = {
            let mut routes = HashMap::new();
            let mut og_images = HashMap::new();
            let insert = |routes: &mut HashMap<PathBuf, String>,
                          og_images: &mut HashMap<PathBuf, String>,
                          doc: &Document| {
                routes.insert(doc.source_path.clone(), doc.route_path().url_path());
                og_images.insert(doc.source_path.clone(), doc.og_image_path());
            };
            for doc in &blog.documents {
                insert(&mut routes, &mut og_images, doc);
            }
            for doc in &updates.documents {
                insert(&mut routes, &mut og_images, doc);
            }
            fn insert_notes(
                routes: &mut HashMap<PathBuf, String>,
                og_images: &mut HashMap<PathBuf, String>,
                folder: &DocumentFolderNode,
            ) {
                if let Some(DocumentLeafNode::Document(doc)) = &folder.index {
                    routes.insert(doc.source_path.clone(), doc.route_path().url_path());
                    og_images.insert(doc.source_path.clone(), doc.og_image_path());
                }
                for node in folder.children.values() {
                    match node {
                        DocumentNode::Folder(f) => insert_notes(routes, og_images, f),
                        DocumentNode::Leaf(DocumentLeafNode::Document(document)) => {
                            routes.insert(
                                document.source_path.clone(),
                                document.route_path().url_path(),
                            );
                            og_images
                                .insert(document.source_path.clone(), document.og_image_path());
                        }
                        DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => {}
                    }
                }
            }
            insert_notes(&mut routes, &mut og_images, &notes.documents);
            insert(&mut routes, &mut og_images, &about);
            insert(&mut routes, &mut og_images, &credits);
            (routes, og_images)
        };
        report("Built source path index", now.elapsed());

        let now = std::time::Instant::now();
        notes.resolve_redirects(&source_path_to_route, &source_path_to_og_image)?;
        report("Resolved note redirects", now.elapsed());

        Ok(Content {
            blog,
            updates,
            notes,
            tags,
            about,
            credits,
            music_library,
            source_path_to_route,
        })
    }

    /// Resolves a relative `.md` link from a document's source path to the corresponding route URL.
    /// Fragments (e.g. `#section`) are preserved.
    /// Returns `None` if the resolved path doesn't correspond to any known document.
    pub fn resolve_markdown_link(
        &self,
        from_source_path: &Path,
        relative_link: &str,
    ) -> Option<String> {
        // Split off fragment
        let (path_part, fragment) = match relative_link.split_once('#') {
            Some((p, f)) => (p, Some(f)),
            None => (relative_link, None),
        };

        // Resolve against the directory containing the source file
        let base_dir = from_source_path.parent()?;
        let resolved = base_dir.join(path_part);
        let normalized = normalize_path(&resolved);

        // Look up the route
        let route_url = self.source_path_to_route.get(&normalized)?;

        Some(match fragment {
            Some(f) => format!("{route_url}#{f}"),
            None => route_url.clone(),
        })
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
pub struct RedirectNode {
    pub id: DocumentId,
    pub target_url: String,
    pub target_og_image_path: Option<String>,
    source_path: PathBuf,
}

#[derive(Debug)]
pub enum DocumentLeafNode {
    Document(Box<Document>),
    Redirect(RedirectNode),
}

#[derive(Debug)]
pub struct DocumentFolderNode {
    pub index: Option<DocumentLeafNode>,
    pub folder_name: String,
    pub children: BTreeMap<String, DocumentNode>,
}

#[derive(Debug)]
pub enum DocumentNode {
    Folder(DocumentFolderNode),
    Leaf(DocumentLeafNode),
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
                index: None,
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
                    .map(|s| s.to_string_lossy().replace('_', " "))
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

            fn read_leaf(
                path: &Path,
                id: DocumentId,
                display_path: Vec<String>,
                fast: bool,
            ) -> anyhow::Result<DocumentLeafNode> {
                let raw = std::fs::read_to_string(path)
                    .with_context(|| format!("failed to read {path:?}"))?;
                if let Some(raw_target) = extract_redirect_target(&raw) {
                    return Ok(DocumentLeafNode::Redirect(RedirectNode {
                        id,
                        target_url: raw_target,
                        target_og_image_path: None,
                        source_path: path.to_path_buf(),
                    }));
                }
                Ok(DocumentLeafNode::Document(Box::new(Document::read(
                    path,
                    id,
                    display_path,
                    DocumentType::Note,
                    fast,
                )?)))
            }

            let mut documents = BTreeMap::new();
            let display_name = path_to_display_name(collection_path, path);
            let folder_name = display_name.last().cloned().unwrap();
            let index = if path.join("index.md").exists() {
                let index_path = path.join("index.md");
                Some(read_leaf(
                    &index_path,
                    display_path_to_id(&display_name),
                    display_name,
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
                        DocumentNode::Leaf(read_leaf(&path, document_id, display_path, fast)?),
                    );
                }
            }
            Ok(DocumentFolderNode {
                index,
                folder_name,
                children: documents,
            })
        }

        let documents = find_documents(collection_path, collection_path, fast)?;
        Ok(NotesCollection { documents })
    }

    pub fn resolve_redirects(
        &mut self,
        source_path_to_route: &HashMap<PathBuf, String>,
        source_path_to_og_image: &HashMap<PathBuf, String>,
    ) -> anyhow::Result<()> {
        fn resolve_in_folder(
            folder: &mut DocumentFolderNode,
            source_path_to_route: &HashMap<PathBuf, String>,
            source_path_to_og_image: &HashMap<PathBuf, String>,
        ) -> anyhow::Result<()> {
            if let Some(DocumentLeafNode::Redirect(r)) = &mut folder.index {
                let (url, og) = resolve_redirect(r, source_path_to_route, source_path_to_og_image)?;
                r.target_url = url;
                r.target_og_image_path = og;
            }
            for node in folder.children.values_mut() {
                match node {
                    DocumentNode::Folder(f) => {
                        resolve_in_folder(f, source_path_to_route, source_path_to_og_image)?
                    }
                    DocumentNode::Leaf(DocumentLeafNode::Redirect(r)) => {
                        let (url, og) =
                            resolve_redirect(r, source_path_to_route, source_path_to_og_image)?;
                        r.target_url = url;
                        r.target_og_image_path = og;
                    }
                    DocumentNode::Leaf(DocumentLeafNode::Document(_)) => {}
                }
            }
            Ok(())
        }

        fn resolve_redirect(
            r: &RedirectNode,
            source_path_to_route: &HashMap<PathBuf, String>,
            source_path_to_og_image: &HashMap<PathBuf, String>,
        ) -> anyhow::Result<(String, Option<String>)> {
            let base_dir = r.source_path.parent().ok_or_else(|| {
                anyhow::anyhow!("redirect has no parent dir: {:?}", r.source_path)
            })?;
            let resolved = normalize_path(&base_dir.join(&r.target_url));
            let url = source_path_to_route
                .get(&resolved)
                .cloned()
                .ok_or_else(|| {
                    anyhow::anyhow!(
                        "redirect target {:?} in {:?} does not resolve to a known document",
                        r.target_url,
                        r.source_path
                    )
                })?;
            let og_image = source_path_to_og_image.get(&resolved).cloned();
            Ok((url, og_image))
        }

        resolve_in_folder(
            &mut self.documents,
            source_path_to_route,
            source_path_to_og_image,
        )
    }
}

impl DocumentFolderNode {
    /// A leaf folder has an index but no children,
    /// so it should be treated as a single note rather than an expandable folder.
    pub fn is_leaf(&self) -> bool {
        self.index.is_some() && self.children.is_empty()
    }

    pub fn has_visible_content(&self) -> bool {
        matches!(self.index, Some(DocumentLeafNode::Document(_)))
            || self.children.values().any(|node| match node {
                DocumentNode::Folder(f) => f.has_visible_content(),
                DocumentNode::Leaf(DocumentLeafNode::Document(_)) => true,
                DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => false,
            })
    }

    pub fn find_folder_for_document(&self, id: &DocumentId) -> Option<&DocumentFolderNode> {
        if let Some(DocumentLeafNode::Document(doc)) = &self.index
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
    pub source_path: PathBuf,
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
            source_path: PathBuf::new(),
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
            source_path: path.to_path_buf(),
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

fn extract_redirect_target(content: &str) -> Option<String> {
    content
        .trim()
        .strip_prefix("#REDIRECT=")
        .map(|t| t.trim().to_string())
}

fn normalize_path(path: &Path) -> PathBuf {
    let mut components = Vec::new();
    for component in path.components() {
        match component {
            std::path::Component::ParentDir => {
                components.pop();
            }
            std::path::Component::CurDir => {}
            c => components.push(c),
        }
    }
    components.iter().collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_normalize_path() {
        assert_eq!(
            normalize_path(Path::new("content/notes/Hardware/../Programming/foo.md")),
            PathBuf::from("content/notes/Programming/foo.md")
        );
        assert_eq!(
            normalize_path(Path::new("content/notes/./Hardware/Laptop.md")),
            PathBuf::from("content/notes/Hardware/Laptop.md")
        );
        assert_eq!(
            normalize_path(Path::new("a/b/c/../../d.md")),
            PathBuf::from("a/d.md")
        );
    }

    #[test]
    fn test_resolve_markdown_link() {
        let mut content = Content::empty();
        content.source_path_to_route.insert(
            PathBuf::from("content/notes/Programming/Reasons_I_do_not_like_Python.md"),
            "/notes/programming/reasons-i-do-not-like-python/".to_string(),
        );
        content.source_path_to_route.insert(
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
