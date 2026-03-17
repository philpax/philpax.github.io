use std::{
    collections::{BTreeMap, BTreeSet, HashMap},
    path::{Path, PathBuf},
    process::Command,
};

use anyhow::Context;
use serde::{Deserialize, Serialize};

pub use paxhtml::util::slugify;

// ── Constants ───────────────────────────────────────────────────────────────

pub type DocumentId = Vec<String>;
pub type Tag = String;

pub const CONTENT_DIR: &str = "content";
pub const INDEX_FILENAME: &str = "index.md";
pub const FRONTMATTER_DELIMITER: &str = "+++";
pub const MD_EXTENSION: &str = "md";
pub const MORE_SEPARATOR: &str = "<!-- more -->";

const HOME_NAME: &str = "Home";
const REDIRECT_PREFIX: &str = "#REDIRECT=";
const ABOUT_FILENAME: &str = "about.md";
const CREDITS_FILENAME: &str = "credits.md";

// ── Core types ──────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DocumentType {
    Blog,
    Update,
    Note,
}
impl DocumentType {
    /// Returns the directory name for this document type within the content directory.
    pub fn dir_name(self) -> &'static str {
        match self {
            DocumentType::Blog => "blog",
            DocumentType::Update => "updates",
            DocumentType::Note => "notes",
        }
    }

    /// Returns the path to the content directory for this document type,
    /// relative to the project root.
    pub fn content_dir(self) -> PathBuf {
        Path::new(CONTENT_DIR).join(self.dir_name())
    }
}
impl std::fmt::Display for DocumentType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{self:?}")
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DocumentMetadata {
    pub title: String,
    pub short: Option<String>,
    #[serde(with = "toml_datetime_compat", default)]
    pub datetime: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(skip)]
    pub last_modified: Option<chrono::DateTime<chrono::Utc>>,
    pub taxonomies: Option<DocumentTaxonomies>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DocumentTaxonomies {
    pub tags: Vec<Tag>,
}

// ── Traits ──────────────────────────────────────────────────────────────────

pub trait HasDocumentId {
    fn document_id(&self) -> &DocumentId;
}

// ── Document ────────────────────────────────────────────────────────────────

#[derive(Debug)]
pub struct Document {
    pub id: DocumentId,
    pub alternate_id: Option<DocumentId>,
    pub display_path: Vec<String>,
    pub document_type: DocumentType,
    pub source_path: PathBuf,
    pub metadata: DocumentMetadata,
    /// Raw markdown text before the more separator (or the entire content if none).
    pub description_raw: String,
    /// Raw markdown text after the more separator, if present.
    pub rest_of_content_raw: Option<String>,
    pub files: Vec<PathBuf>,
    pub hero_filename_and_alt: Option<(String, String)>,
}
impl HasDocumentId for Document {
    fn document_id(&self) -> &DocumentId {
        &self.id
    }
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
            description_raw: String::new(),
            rest_of_content_raw: None,
            files: vec![],
            hero_filename_and_alt: None,
        }
    }

    pub fn read(
        path: &Path,
        id: DocumentId,
        display_path: Vec<String>,
        document_type: DocumentType,
        fast: bool,
    ) -> anyhow::Result<Self> {
        let file =
            std::fs::read_to_string(path).with_context(|| format!("failed to read {path:?}"))?;

        let (metadata, content_raw) = if document_type != DocumentType::Note {
            let parts: Vec<_> = file.splitn(3, FRONTMATTER_DELIMITER).collect();
            if parts.len() != 3 {
                anyhow::bail!("invalid markdown file: missing front matter");
            }

            let mut metadata: DocumentMetadata = toml::from_str(parts[1])?;
            let file_dates = get_file_dates(path, fast)?;
            metadata.last_modified = Some(file_dates.last_commit);

            (metadata, parts[2].to_string())
        } else {
            let file_dates = get_file_dates(path, fast)?;
            let metadata = DocumentMetadata {
                title: display_path.last().cloned().unwrap(),
                short: None,
                datetime: Some(file_dates.first_commit),
                last_modified: Some(file_dates.last_commit),
                taxonomies: None,
            };

            (metadata, file)
        };

        let (description_raw, rest_of_content_raw) = match content_raw.split_once(MORE_SEPARATOR) {
            Some((desc, rest)) => (desc.trim().to_string(), Some(rest.trim().to_string())),
            None => (content_raw, None),
        };

        let mut files = vec![];
        let mut hero_filename = None;
        let mut hero_alt = None;
        for entry in std::fs::read_dir(path.parent().unwrap())? {
            let path = entry?.path();
            if path.extension().is_some_and(|e| e == MD_EXTENSION) {
                continue;
            }
            if path.is_dir() {
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
                .chain([slugify(&metadata.title)])
                .collect::<Vec<_>>();
            if alternate_id == id {
                None
            } else {
                Some(alternate_id)
            }
        } else {
            None
        };

        Ok(Document {
            id,
            alternate_id,
            display_path,
            document_type,
            source_path: path.to_path_buf(),
            metadata,
            description_raw,
            rest_of_content_raw,
            files,
            hero_filename_and_alt: hero_filename.zip(hero_alt),
        })
    }

    pub fn og_image_path(&self) -> String {
        let type_dir = self.document_type.dir_name();
        let filename = format!("{}.png", self.id.join("-"));
        format!("/og-images/{type_dir}/{filename}")
    }

    pub fn tags(&self) -> Option<&Vec<String>> {
        self.metadata.taxonomies.as_ref().map(|t| &t.tags)
    }
}

// ── Routing ─────────────────────────────────────────────────────────────────

/// Returns the URL path for a document given its type and ID.
///
/// Produces paths like `/blog/my-post/`, `/updates/my-update/`, `/notes/programming/rust/`.
pub fn document_url_path(doc_type: DocumentType, id: &DocumentId) -> String {
    let dir = doc_type.dir_name();
    let id_path = id.join("/");
    if id_path.is_empty() {
        format!("/{dir}/")
    } else {
        format!("/{dir}/{id_path}/")
    }
}

// ── Tree types ──────────────────────────────────────────────────────────────

#[derive(Debug)]
pub struct RedirectNode {
    pub id: DocumentId,
    pub target_url: String,
    pub target_og_image_path: Option<String>,
    pub source_path: PathBuf,
}

#[derive(Debug)]
pub enum DocumentLeafNode<D> {
    Document(Box<D>),
    Redirect(RedirectNode),
}
impl<D> DocumentLeafNode<D> {
    pub fn map_document<E>(self, f: &mut impl FnMut(D) -> E) -> DocumentLeafNode<E> {
        match self {
            DocumentLeafNode::Document(doc) => DocumentLeafNode::Document(Box::new(f(*doc))),
            DocumentLeafNode::Redirect(r) => DocumentLeafNode::Redirect(r),
        }
    }
}

#[derive(Debug)]
pub struct DocumentFolderNode<D> {
    pub index: Option<DocumentLeafNode<D>>,
    pub folder_name: String,
    pub children: BTreeMap<String, DocumentNode<D>>,
}
impl<D> DocumentFolderNode<D> {
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

    pub fn map_documents<E>(self, f: &mut impl FnMut(D) -> E) -> DocumentFolderNode<E> {
        DocumentFolderNode {
            index: self.index.map(|leaf| leaf.map_document(f)),
            folder_name: self.folder_name,
            children: self
                .children
                .into_iter()
                .map(|(k, node)| (k, node.map_documents(f)))
                .collect(),
        }
    }
}
impl<D: HasDocumentId> DocumentFolderNode<D> {
    pub fn find_folder_for_document(&self, id: &DocumentId) -> Option<&DocumentFolderNode<D>> {
        if let Some(DocumentLeafNode::Document(doc)) = &self.index
            && doc.document_id() == id
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
pub enum DocumentNode<D> {
    Folder(DocumentFolderNode<D>),
    Leaf(DocumentLeafNode<D>),
}
impl<D> DocumentNode<D> {
    pub fn map_documents<E>(self, f: &mut impl FnMut(D) -> E) -> DocumentNode<E> {
        match self {
            DocumentNode::Folder(folder) => DocumentNode::Folder(folder.map_documents(f)),
            DocumentNode::Leaf(leaf) => DocumentNode::Leaf(leaf.map_document(f)),
        }
    }
}

// ── Collections ─────────────────────────────────────────────────────────────

#[derive(Debug)]
pub struct DocumentCollection<D> {
    pub documents: Vec<D>,
    pub document_key_to_id: HashMap<DocumentId, usize>,
}
impl<D> DocumentCollection<D> {
    pub fn empty() -> Self {
        Self {
            documents: vec![],
            document_key_to_id: HashMap::new(),
        }
    }

    pub fn document_by_id(&self, id: &DocumentId) -> Option<&D> {
        self.document_key_to_id
            .get(id)
            .and_then(|&i| self.documents.get(i))
    }

    pub fn map_documents<E: HasDocumentId>(
        self,
        mut f: impl FnMut(D) -> E,
    ) -> DocumentCollection<E> {
        let documents: Vec<E> = self.documents.into_iter().map(&mut f).collect();
        let document_key_to_id = build_document_index(&documents);
        DocumentCollection {
            documents,
            document_key_to_id,
        }
    }
}
impl DocumentCollection<Document> {
    pub fn read(
        collection_path: &Path,
        document_type: DocumentType,
        fast: bool,
    ) -> anyhow::Result<Self> {
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

            let index = path.join(INDEX_FILENAME);
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

        let document_key_to_id = build_document_index(&documents);
        Ok(DocumentCollection {
            documents,
            document_key_to_id,
        })
    }
}

#[derive(Debug)]
pub struct NotesCollection<D> {
    pub documents: DocumentFolderNode<D>,
}
impl<D> NotesCollection<D> {
    pub fn empty() -> Self {
        Self {
            documents: DocumentFolderNode {
                index: None,
                folder_name: "".to_string(),
                children: Default::default(),
            },
        }
    }

    pub fn map_documents<E>(self, mut f: impl FnMut(D) -> E) -> NotesCollection<E> {
        NotesCollection {
            documents: self.documents.map_documents(&mut f),
        }
    }

    pub fn resolve_redirects(
        &mut self,
        source_path_to_route: &HashMap<PathBuf, String>,
        source_path_to_og_image: &HashMap<PathBuf, String>,
    ) -> anyhow::Result<()> {
        resolve_redirects_in_folder(
            &mut self.documents,
            source_path_to_route,
            source_path_to_og_image,
        )
    }
}
impl NotesCollection<Document> {
    pub fn read(collection_path: &Path, fast: bool) -> anyhow::Result<Self> {
        let documents = read_notes_folder(collection_path, collection_path, fast)?;
        Ok(NotesCollection { documents })
    }
}

// ── Content ─────────────────────────────────────────────────────────────────

/// A content item found by iterating the content collections.
pub struct ContentItem {
    pub document_type: DocumentType,
    pub display_path: Vec<String>,
    pub source_path: PathBuf,
}

/// All site content read from disk using raw (unparsed) documents.
pub struct Content {
    pub blog: DocumentCollection<Document>,
    pub updates: DocumentCollection<Document>,
    pub notes: NotesCollection<Document>,
    pub about: Document,
    pub credits: Document,
    pub tags: HashMap<Tag, Vec<DocumentId>>,
    pub source_path_to_route: HashMap<PathBuf, String>,
    pub source_path_to_og_image: HashMap<PathBuf, String>,
}
impl Content {
    pub fn empty() -> Self {
        Self {
            blog: DocumentCollection::empty(),
            updates: DocumentCollection::empty(),
            notes: NotesCollection::empty(),
            about: Document::empty(),
            credits: Document::empty(),
            tags: HashMap::new(),
            source_path_to_route: HashMap::new(),
            source_path_to_og_image: HashMap::new(),
        }
    }

    pub fn read(fast: bool) -> anyhow::Result<Self> {
        let blog =
            DocumentCollection::read(&DocumentType::Blog.content_dir(), DocumentType::Blog, fast)?;
        let updates = DocumentCollection::read(
            &DocumentType::Update.content_dir(),
            DocumentType::Update,
            fast,
        )?;
        let mut notes = NotesCollection::read(&DocumentType::Note.content_dir(), fast)?;

        let about = Document::read(
            &Path::new(CONTENT_DIR).join(ABOUT_FILENAME),
            vec!["about".to_string()],
            vec!["About".to_string()],
            DocumentType::Blog,
            fast,
        )?;

        let credits = Document::read(
            &Path::new(CONTENT_DIR).join(CREDITS_FILENAME),
            vec!["credits".to_string()],
            vec!["Credits".to_string()],
            DocumentType::Blog,
            fast,
        )?;

        // Build tags index
        let mut tags: HashMap<Tag, Vec<DocumentId>> = HashMap::new();
        for document in blog.documents.iter().chain(updates.documents.iter()) {
            if let Some(taxonomies) = &document.metadata.taxonomies {
                for tag in &taxonomies.tags {
                    tags.entry(tag.clone())
                        .or_default()
                        .push(document.id.clone());
                }
            }
        }

        // Build source path → route/og-image mappings
        let (source_path_to_route, source_path_to_og_image) = {
            let mut routes = HashMap::new();
            let mut og_images = HashMap::new();
            let insert = |routes: &mut HashMap<PathBuf, String>,
                          og_images: &mut HashMap<PathBuf, String>,
                          doc: &Document| {
                routes.insert(
                    doc.source_path.clone(),
                    document_url_path(doc.document_type, &doc.id),
                );
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
                folder: &DocumentFolderNode<Document>,
            ) {
                if let Some(DocumentLeafNode::Document(doc)) = &folder.index {
                    routes.insert(
                        doc.source_path.clone(),
                        document_url_path(doc.document_type, &doc.id),
                    );
                    og_images.insert(doc.source_path.clone(), doc.og_image_path());
                }
                for node in folder.children.values() {
                    match node {
                        DocumentNode::Folder(f) => insert_notes(routes, og_images, f),
                        DocumentNode::Leaf(DocumentLeafNode::Document(doc)) => {
                            routes.insert(
                                doc.source_path.clone(),
                                document_url_path(doc.document_type, &doc.id),
                            );
                            og_images.insert(doc.source_path.clone(), doc.og_image_path());
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

        // Resolve note redirects
        notes.resolve_redirects(&source_path_to_route, &source_path_to_og_image)?;

        Ok(Content {
            blog,
            updates,
            notes,
            about,
            credits,
            tags,
            source_path_to_route,
            source_path_to_og_image,
        })
    }

    /// Returns all unique tags sorted alphabetically.
    pub fn all_tags(&self) -> Vec<Tag> {
        let mut tags = BTreeSet::new();
        for document in self
            .blog
            .documents
            .iter()
            .chain(self.updates.documents.iter())
        {
            if let Some(taxonomies) = &document.metadata.taxonomies {
                for tag in &taxonomies.tags {
                    tags.insert(tag.clone());
                }
            }
        }
        tags.into_iter().collect()
    }

    /// Returns all note folder paths relative to the notes content directory.
    pub fn note_folders(&self) -> Vec<String> {
        let mut folders = Vec::new();
        collect_note_folders(&self.notes.documents, &mut vec![], &mut folders);
        folders.sort();
        folders
    }

    /// Returns all content items (for listing/selection).
    pub fn all_content_items(&self) -> Vec<ContentItem> {
        let mut items = Vec::new();

        for doc in &self.blog.documents {
            items.push(ContentItem {
                document_type: DocumentType::Blog,
                display_path: vec![doc.metadata.title.clone()],
                source_path: doc.source_path.clone(),
            });
        }

        for doc in &self.updates.documents {
            items.push(ContentItem {
                document_type: DocumentType::Update,
                display_path: vec![doc.metadata.title.clone()],
                source_path: doc.source_path.clone(),
            });
        }

        collect_note_content_items(&self.notes.documents, &mut items);

        items
    }

    /// Resolves a relative `.md` link from a document's source path to the corresponding route URL.
    /// Fragments are preserved. Returns `None` if the resolved path doesn't correspond to any known document.
    pub fn resolve_markdown_link(
        &self,
        from_source_path: &Path,
        relative_link: &str,
    ) -> Option<String> {
        let (path_part, fragment) = match relative_link.split_once('#') {
            Some((p, f)) => (p, Some(f)),
            None => (relative_link, None),
        };

        let base_dir = from_source_path.parent()?;
        let resolved = base_dir.join(path_part);
        let normalized = normalize_path(&resolved);

        let route_url = self.source_path_to_route.get(&normalized)?;

        Some(match fragment {
            Some(f) => format!("{route_url}#{f}"),
            None => route_url.clone(),
        })
    }

    /// Iterates over all associated files across all documents.
    pub fn all_associated_files(&self) -> impl Iterator<Item = &PathBuf> {
        fn collect_note_files(
            folder: &DocumentFolderNode<Document>,
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

    /// Looks up a document by ID across blog and update collections.
    pub fn document_by_id(&self, id: &DocumentId) -> Option<&Document> {
        self.blog
            .document_by_id(id)
            .or_else(|| self.updates.document_by_id(id))
    }
}

// ── Path and filename utilities ─────────────────────────────────────────────

/// Converts a display name to a filename by replacing spaces with underscores.
pub fn display_name_to_filename(name: &str) -> String {
    name.replace(' ', "_")
}

/// Converts a filename to a display name by replacing underscores with spaces
/// and stripping the `.md` extension.
pub fn filename_to_display_name(filename: &str) -> String {
    filename
        .strip_suffix(".md")
        .unwrap_or(filename)
        .replace('_', " ")
}

/// Converts a title to a URL slug (alias for `slugify`).
pub fn title_to_slug(title: &str) -> String {
    slugify(title)
}

/// Converts a display path to a document ID by slugifying each component.
pub fn display_path_to_id(display_path: &[String]) -> DocumentId {
    display_path.iter().map(|s| slugify(s)).collect()
}

/// Returns the path for a blog or update post's index file.
pub fn blog_or_update_path(base: &Path, doc_type: DocumentType, slug: &str) -> PathBuf {
    base.join(doc_type.content_dir())
        .join(slug)
        .join(INDEX_FILENAME)
}

/// Returns the path for a note file.
pub fn note_path(base: &Path, folder: &str, title: &str) -> PathBuf {
    base.join(DocumentType::Note.content_dir())
        .join(folder)
        .join(format!(
            "{}.{MD_EXTENSION}",
            display_name_to_filename(title)
        ))
}

/// Normalizes a path by resolving `..` and `.` components.
pub fn normalize_path(path: &Path) -> PathBuf {
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

// ── Frontmatter utilities ───────────────────────────────────────────────────

/// Generates TOML frontmatter between delimiters.
pub fn generate_frontmatter(metadata: &DocumentMetadata) -> String {
    let mut output = format!("{FRONTMATTER_DELIMITER}\n");
    output.push_str(&format!(
        "title = {}\n",
        toml::Value::from(metadata.title.as_str())
    ));

    if let Some(short) = &metadata.short {
        output.push_str(&format!("short = {}\n", toml::Value::from(short.as_str())));
    }

    if let Some(dt) = metadata.datetime {
        output.push_str(&format!("datetime = {}\n", dt.format("%Y-%m-%dT%H:%M:%SZ")));
    }

    if let Some(taxonomies) = &metadata.taxonomies {
        output.push_str("\n[taxonomies]\n");
        let tags: Vec<String> = taxonomies
            .tags
            .iter()
            .map(|t| format!("{}", toml::Value::from(t.as_str())))
            .collect();
        output.push_str(&format!("tags=[{}]\n", tags.join(", ")));
    }

    output.push_str(&format!("{FRONTMATTER_DELIMITER}\n"));
    output
}

/// Reads frontmatter from a blog/update file, returning the metadata and the body content.
pub fn read_frontmatter(path: &Path) -> anyhow::Result<(DocumentMetadata, String)> {
    let content = std::fs::read_to_string(path)?;
    let parts: Vec<_> = content.splitn(3, FRONTMATTER_DELIMITER).collect();
    if parts.len() != 3 {
        anyhow::bail!("invalid markdown file: missing frontmatter");
    }
    let metadata: DocumentMetadata = toml::from_str(parts[1])?;
    let body = parts[2].to_string();
    Ok((metadata, body))
}

/// Writes updated frontmatter + body back to a file.
pub fn write_frontmatter(
    path: &Path,
    metadata: &DocumentMetadata,
    body: &str,
) -> anyhow::Result<()> {
    let frontmatter = generate_frontmatter(metadata);
    let content = format!("{frontmatter}{body}");
    std::fs::write(path, content)?;
    Ok(())
}

// ── File dates ──────────────────────────────────────────────────────────────

pub struct FileDates {
    pub first_commit: chrono::DateTime<chrono::Utc>,
    pub last_commit: chrono::DateTime<chrono::Utc>,
}

pub fn get_file_dates(path: &Path, fast: bool) -> anyhow::Result<FileDates> {
    let get_mtime = || -> anyhow::Result<chrono::DateTime<chrono::Utc>> {
        let metadata = std::fs::metadata(path)?;
        let modified = metadata.modified()?;
        let datetime = chrono::DateTime::from(modified);
        Ok(datetime.with_timezone(&chrono::Utc))
    };

    if fast {
        let mtime = get_mtime()?;
        return Ok(FileDates {
            first_commit: mtime,
            last_commit: mtime,
        });
    }

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
                last_commit: dates[0],
                first_commit: dates[dates.len() - 1],
            });
        }
    }

    let mtime = get_mtime()?;
    Ok(FileDates {
        first_commit: mtime,
        last_commit: mtime,
    })
}

// ── Private helpers ─────────────────────────────────────────────────────────

fn extract_redirect_target(content: &str) -> Option<String> {
    content
        .trim()
        .strip_prefix(REDIRECT_PREFIX)
        .map(|t| t.trim().to_string())
}

fn path_to_display_name(collection_path: &Path, path: &Path) -> Vec<String> {
    let mut output: Vec<String> = path
        .with_extension("")
        .strip_prefix(collection_path)
        .unwrap()
        .iter()
        .map(|s| filename_to_display_name(&s.to_string_lossy()))
        .collect();
    if output.is_empty() {
        output.push(HOME_NAME.to_string());
    }
    output
}

fn notes_display_path_to_id(display_path: &[String]) -> DocumentId {
    if display_path.len() == 1 && display_path[0] == HOME_NAME {
        return vec![];
    }
    display_path_to_id(display_path)
}

fn read_notes_leaf(
    path: &Path,
    id: DocumentId,
    display_path: Vec<String>,
    fast: bool,
) -> anyhow::Result<DocumentLeafNode<Document>> {
    let raw = std::fs::read_to_string(path).with_context(|| format!("failed to read {path:?}"))?;
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

fn read_notes_folder(
    collection_path: &Path,
    path: &Path,
    fast: bool,
) -> anyhow::Result<DocumentFolderNode<Document>> {
    let display_name = path_to_display_name(collection_path, path);
    let folder_name = display_name.last().cloned().unwrap();
    let index = if path.join(INDEX_FILENAME).exists() {
        let index_path = path.join(INDEX_FILENAME);
        Some(read_notes_leaf(
            &index_path,
            notes_display_path_to_id(&display_name),
            display_name,
            fast,
        )?)
    } else {
        None
    };

    let mut children = BTreeMap::new();
    for entry in std::fs::read_dir(path)? {
        let path = entry?.path();

        if path.file_name().is_some_and(|f| f == INDEX_FILENAME) {
            continue;
        }

        let display_path = path_to_display_name(collection_path, &path);
        let document_name = display_path.last().unwrap().clone();
        let document_id = notes_display_path_to_id(&display_path);

        if path.is_dir() {
            children.insert(
                document_name,
                DocumentNode::Folder(read_notes_folder(collection_path, &path, fast)?),
            );
            continue;
        }

        if path.extension().is_some_and(|e| e == MD_EXTENSION) {
            children.insert(
                document_name,
                DocumentNode::Leaf(read_notes_leaf(&path, document_id, display_path, fast)?),
            );
        }
    }

    Ok(DocumentFolderNode {
        index,
        folder_name,
        children,
    })
}

fn build_document_index<D: HasDocumentId>(documents: &[D]) -> HashMap<DocumentId, usize> {
    let mut index = HashMap::new();
    for (i, doc) in documents.iter().enumerate() {
        index.insert(doc.document_id().clone(), i);
    }
    index
}

fn resolve_redirects_in_folder<D>(
    folder: &mut DocumentFolderNode<D>,
    source_path_to_route: &HashMap<PathBuf, String>,
    source_path_to_og_image: &HashMap<PathBuf, String>,
) -> anyhow::Result<()> {
    if let Some(DocumentLeafNode::Redirect(r)) = &mut folder.index {
        let (url, og) = resolve_single_redirect(r, source_path_to_route, source_path_to_og_image)?;
        r.target_url = url;
        r.target_og_image_path = og;
    }
    for node in folder.children.values_mut() {
        match node {
            DocumentNode::Folder(f) => {
                resolve_redirects_in_folder(f, source_path_to_route, source_path_to_og_image)?;
            }
            DocumentNode::Leaf(DocumentLeafNode::Redirect(r)) => {
                let (url, og) =
                    resolve_single_redirect(r, source_path_to_route, source_path_to_og_image)?;
                r.target_url = url;
                r.target_og_image_path = og;
            }
            DocumentNode::Leaf(DocumentLeafNode::Document(_)) => {}
        }
    }
    Ok(())
}

fn resolve_single_redirect(
    r: &RedirectNode,
    source_path_to_route: &HashMap<PathBuf, String>,
    source_path_to_og_image: &HashMap<PathBuf, String>,
) -> anyhow::Result<(String, Option<String>)> {
    let base_dir = r
        .source_path
        .parent()
        .ok_or_else(|| anyhow::anyhow!("redirect has no parent dir: {:?}", r.source_path))?;
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

fn collect_note_folders(
    folder: &DocumentFolderNode<Document>,
    path_parts: &mut Vec<String>,
    folders: &mut Vec<String>,
) {
    for (name, node) in &folder.children {
        if let DocumentNode::Folder(f) = node {
            path_parts.push(display_name_to_filename(name));
            folders.push(path_parts.join("/"));
            collect_note_folders(f, path_parts, folders);
            path_parts.pop();
        }
    }
}

fn collect_note_content_items(folder: &DocumentFolderNode<Document>, items: &mut Vec<ContentItem>) {
    if let Some(DocumentLeafNode::Document(doc)) = &folder.index {
        items.push(ContentItem {
            document_type: DocumentType::Note,
            display_path: doc.display_path.clone(),
            source_path: doc.source_path.clone(),
        });
    }
    for node in folder.children.values() {
        match node {
            DocumentNode::Folder(f) => collect_note_content_items(f, items),
            DocumentNode::Leaf(DocumentLeafNode::Document(doc)) => {
                items.push(ContentItem {
                    document_type: DocumentType::Note,
                    display_path: doc.display_path.clone(),
                    source_path: doc.source_path.clone(),
                });
            }
            DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => {}
        }
    }
}

// ── Tests ───────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_normalize_path() {
        assert_eq!(
            normalize_path(Path::new("a/b/../c/d.md")),
            PathBuf::from("a/c/d.md")
        );
        assert_eq!(
            normalize_path(Path::new("a/./b/c.md")),
            PathBuf::from("a/b/c.md")
        );
        assert_eq!(
            normalize_path(Path::new("a/b/c/../../d.md")),
            PathBuf::from("a/d.md")
        );
    }

    #[test]
    fn test_document_url_path() {
        assert_eq!(
            document_url_path(DocumentType::Blog, &vec!["hello-world".to_string()]),
            "/blog/hello-world/"
        );
        assert_eq!(
            document_url_path(DocumentType::Update, &vec!["my-update".to_string()]),
            "/updates/my-update/"
        );
        assert_eq!(
            document_url_path(
                DocumentType::Note,
                &vec!["programming".to_string(), "rust".to_string()]
            ),
            "/notes/programming/rust/"
        );
        assert_eq!(document_url_path(DocumentType::Note, &vec![]), "/notes/");
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
