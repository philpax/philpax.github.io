use std::{
    collections::HashSet,
    path::{Path, PathBuf},
    sync::Arc,
    thread::JoinHandle,
};

use anyhow::Context;
use rayon::prelude::*;

/// Images larger than this in either dimension get a resized preview.
const PREVIEW_MAX_DIMENSION: u32 = 1536;
/// Small preview width for compact layouts (e.g. CityPoster component).
const SMALL_PREVIEW_MAX_WIDTH: u32 = 384;

const IMAGE_EXTENSIONS: &[&str] = &["png", "jpg", "jpeg", "gif", "webp"];

/// Tracks which images need preview variants (because they exceed the size threshold).
#[derive(Debug)]
pub struct ImageStore {
    /// Source paths of images that need a resized preview.
    needs_preview: HashSet<PathBuf>,
}
impl ImageStore {
    /// Build the store by scanning all image files from the given content.
    pub fn new(content: &crate::content::Content) -> Self {
        let needs_preview: HashSet<PathBuf> = content
            .all_associated_files()
            .filter(|p| is_image_path(p))
            .filter(|path| {
                let Ok(reader) = image::ImageReader::open(path) else {
                    return false;
                };
                let Ok((w, h)) = reader.into_dimensions() else {
                    return false;
                };
                w > PREVIEW_MAX_DIMENSION || h > PREVIEW_MAX_DIMENSION
            })
            .cloned()
            .collect();
        Self { needs_preview }
    }

    /// Returns `true` if this image needs a preview (is larger than the threshold).
    pub fn needs_preview(&self, source_path: &Path) -> bool {
        self.needs_preview.contains(source_path)
    }

    /// Returns the preview filename for an image if it needs one, otherwise the original filename.
    /// The `url` should be a relative path like `foo.png` or `./foo.png`.
    pub fn resolve_preview_url(&self, url: &str) -> String {
        self.resolve_preview_url_with_suffix(url, "_preview")
    }

    /// Returns the small preview filename for an image if it needs one, otherwise the original filename.
    /// Small previews are 384px wide, intended for compact layouts like CityPoster.
    pub fn resolve_small_preview_url(&self, url: &str) -> String {
        self.resolve_preview_url_with_suffix(url, "_small")
    }

    /// Spawn a background thread to generate preview images for all documents.
    /// Returns a join handle that resolves when all previews are generated.
    pub fn spawn_preview_generation(
        self: Arc<Self>,
        content: Arc<crate::content::Content>,
        output_dir: &Path,
    ) -> JoinHandle<anyhow::Result<()>> {
        let output_dir = output_dir.to_path_buf();

        std::thread::spawn(move || {
            use crate::content::{DocumentFolderNode, DocumentLeafNode, DocumentNode};

            let mut all_docs: Vec<&crate::content::Document> = Vec::new();
            all_docs.extend(&content.blog.documents);
            all_docs.extend(&content.updates.documents);
            fn collect_notes<'a>(
                folder: &'a DocumentFolderNode,
                docs: &mut Vec<&'a crate::content::Document>,
            ) {
                if let Some(DocumentLeafNode::Document(doc)) = &folder.index {
                    docs.push(doc.as_ref());
                }
                for child in folder.children.values() {
                    match child {
                        DocumentNode::Folder(folder) => collect_notes(folder, docs),
                        DocumentNode::Leaf(DocumentLeafNode::Document(document)) => {
                            docs.push(document.as_ref())
                        }
                        DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => {}
                    }
                }
            }
            collect_notes(&content.notes.documents, &mut all_docs);

            all_docs.par_iter().try_for_each(|doc| {
                let post_output_dir = doc.route_path().dir_path(&output_dir);
                for path in &doc.files {
                    if self.needs_preview(path) {
                        let filename = Path::new(path.file_name().unwrap());

                        let preview_filename = suffixed_path(filename, "_preview");
                        let preview_output =
                            post_output_dir.join(preview_filename.file_name().unwrap());
                        self.write_preview(path, &preview_output, PREVIEW_MAX_DIMENSION)
                            .with_context(|| format!("failed to generate preview for {path:?}"))?;

                        let small_filename = suffixed_path(filename, "_small");
                        let small_output =
                            post_output_dir.join(small_filename.file_name().unwrap());
                        self.write_preview(path, &small_output, SMALL_PREVIEW_MAX_WIDTH)
                            .with_context(|| {
                                format!("failed to generate small preview for {path:?}")
                            })?;
                    }
                }
                anyhow::Ok(())
            })
        })
    }
}
impl ImageStore {
    fn resolve_preview_url_with_suffix(&self, url: &str, suffix: &str) -> String {
        let path = Path::new(url);
        if !is_image_path(path) {
            return url.to_string();
        }

        let filename = match path.file_name() {
            Some(f) => f,
            None => return url.to_string(),
        };

        if self
            .needs_preview
            .iter()
            .any(|p| p.file_name() == Some(filename))
        {
            let preview = suffixed_path(path, suffix);
            preview.to_string_lossy().into_owned()
        } else {
            url.to_string()
        }
    }

    /// Generate the preview file for a source image to the given output path.
    fn write_preview(
        &self,
        source: &Path,
        preview_output_path: &Path,
        max_dimension: u32,
    ) -> anyhow::Result<bool> {
        if !self.needs_preview(source) {
            return Ok(false);
        }
        let img = image::ImageReader::open(source)?.decode()?;
        let resized = img.resize(
            max_dimension,
            max_dimension,
            image::imageops::FilterType::Lanczos3,
        );
        resized.save(preview_output_path)?;
        Ok(true)
    }
}

/// Returns whether the given path has an image extension.
fn is_image_path(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .is_some_and(|e| IMAGE_EXTENSIONS.contains(&e.to_lowercase().as_str()))
}

/// Returns a suffixed path for an image (e.g. `foo.png` with `_preview` -> `foo_preview.png`).
fn suffixed_path(path: &Path, suffix: &str) -> PathBuf {
    let stem = path.file_stem().unwrap().to_string_lossy();
    let ext = path.extension().unwrap().to_string_lossy();
    path.with_file_name(format!("{stem}{suffix}.{ext}"))
}
