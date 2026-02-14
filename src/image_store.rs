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
        let path = Path::new(url);
        if !is_image_path(path) {
            return url.to_string();
        }

        // Check if any source in the store has a matching filename that needs a preview
        let filename = match path.file_name() {
            Some(f) => f,
            None => return url.to_string(),
        };

        if self
            .needs_preview
            .iter()
            .any(|p| p.file_name() == Some(filename))
        {
            let preview = preview_path(path);
            preview.to_string_lossy().into_owned()
        } else {
            url.to_string()
        }
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
            use crate::content::{DocumentFolderNode, DocumentNode};

            let mut all_docs: Vec<&crate::content::Document> = Vec::new();
            all_docs.extend(&content.blog.documents);
            all_docs.extend(&content.updates.documents);
            fn collect_notes<'a>(
                folder: &'a DocumentFolderNode,
                docs: &mut Vec<&'a crate::content::Document>,
            ) {
                if let Some(doc) = &folder.index_document {
                    docs.push(doc);
                }
                for child in folder.children.values() {
                    match child {
                        DocumentNode::Folder(folder) => collect_notes(folder, docs),
                        DocumentNode::Document { document } => docs.push(document),
                    }
                }
            }
            collect_notes(&content.notes.documents, &mut all_docs);

            all_docs.par_iter().try_for_each(|doc| {
                let post_output_dir = doc.route_path().dir_path(&output_dir);
                for path in &doc.files {
                    if self.needs_preview(path) {
                        let preview_filename = preview_path(Path::new(path.file_name().unwrap()));
                        let preview_output =
                            post_output_dir.join(preview_filename.file_name().unwrap());
                        self.write_preview(path, &preview_output)
                            .with_context(|| format!("failed to generate preview for {path:?}"))?;
                    }
                }
                anyhow::Ok(())
            })
        })
    }
}
impl ImageStore {
    /// Generate the preview file for a source image to the given output path.
    fn write_preview(&self, source: &Path, preview_output_path: &Path) -> anyhow::Result<bool> {
        if !self.needs_preview(source) {
            return Ok(false);
        }
        let img = image::ImageReader::open(source)?.decode()?;
        let resized = img.resize(
            PREVIEW_MAX_DIMENSION,
            PREVIEW_MAX_DIMENSION,
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

/// Returns the preview path for an image (e.g. `foo.png` -> `foo_preview.png`).
fn preview_path(path: &Path) -> PathBuf {
    let stem = path.file_stem().unwrap().to_string_lossy();
    let ext = path.extension().unwrap().to_string_lossy();
    path.with_file_name(format!("{stem}_preview.{ext}"))
}
