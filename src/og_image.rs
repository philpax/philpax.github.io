use anyhow::{Context, Result};
use base64::{Engine, engine::general_purpose::STANDARD};
use chrono::{DateTime, Utc};
use image::{GenericImageView, ImageEncoder, ImageReader};
use rayon::prelude::*;
use std::{io::Cursor, path::Path, sync::Arc, thread::JoinHandle};

use crate::content::{Content, Document, DocumentFolderNode, DocumentNode, DocumentType};

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

pub struct OgImageOptions<'a> {
    pub document_type: DocumentType,
    pub title: &'a str,
    pub datetime: Option<DateTime<Utc>>,
    pub last_modified: Option<DateTime<Utc>>,
    pub hero_image_path: Option<&'a Path>,
}

pub struct Generator {
    author: String,
    og_base_data_url: String,
    fontdb: Arc<fontdb::Database>,
}
impl Generator {
    pub fn new(author: String) -> Result<Self> {
        let og_base_data_url = std::fs::read("assets/source/ogbase.png")
            .map(|data| STANDARD.encode(&data))
            .map(|e| format!("data:image/png;base64,{e}"))?;

        let mut fontdb = fontdb::Database::new();
        fontdb.load_font_data(std::fs::read("static/fonts/Literata.ttf")?);
        let fontdb = Arc::new(fontdb);

        Ok(Self {
            author,
            og_base_data_url,
            fontdb,
        })
    }

    /// Generate an OpenGraph preview image with the given options
    pub fn generate(&self, options: &OgImageOptions, output_path: &Path) -> Result<()> {
        // Determine the background image data URL
        let bg_data_url = if let Some(hero_path) = options.hero_image_path {
            create_blurred_darkened_background(hero_path)?
        } else {
            self.og_base_data_url.clone()
        };

        // Generate SVG
        let svg_content = generate_svg(
            options.document_type,
            options.title,
            &self.author,
            options.datetime.as_ref(),
            options.last_modified.as_ref(),
            &bg_data_url,
        );

        let opt = usvg::Options {
            fontdb: self.fontdb.clone(),
            ..Default::default()
        };
        let tree = usvg::Tree::from_str(&svg_content, &opt)?;

        // Render to PNG
        let pixmap_size = tree.size().to_int_size();
        let mut pixmap = resvg::tiny_skia::Pixmap::new(pixmap_size.width(), pixmap_size.height())
            .ok_or_else(|| anyhow::anyhow!("Failed to create pixmap"))?;

        resvg::render(
            &tree,
            resvg::usvg::Transform::identity(),
            &mut pixmap.as_mut(),
        );

        // Save PNG
        if let Some(parent) = output_path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        pixmap.save_png(output_path)?;

        Ok(())
    }
}

/// Spawns OG image generation in a background thread.
/// Returns a JoinHandle that can be used to wait for completion.
pub fn spawn_generation(
    content: Arc<Content>,
    output_dir: &Path,
    author: &str,
) -> JoinHandle<Result<()>> {
    let output_dir = output_dir.to_path_buf();
    let author = author.to_string();

    std::thread::spawn(move || {
        let og_images_dir = output_dir.join("og-images");
        std::fs::create_dir_all(&og_images_dir)?;

        // Create subdirectories
        std::fs::create_dir_all(og_images_dir.join("blog"))?;
        std::fs::create_dir_all(og_images_dir.join("updates"))?;
        std::fs::create_dir_all(og_images_dir.join("notes"))?;

        let generator = Generator::new(author)?;

        // Collect all documents
        let mut all_docs: Vec<&Document> = Vec::new();
        all_docs.extend(&content.blog.documents);
        all_docs.extend(&content.updates.documents);
        collect_notes(&mut all_docs, &content.notes.documents);

        // Generate images in parallel
        all_docs.par_iter().try_for_each(|doc| {
            let hero_image_path = doc.hero_filename_and_alt.as_ref().map(|(filename, _)| {
                doc.route_path()
                    .with_filename(filename)
                    .file_path(&output_dir)
            });

            let options = OgImageOptions {
                document_type: doc.document_type,
                title: &doc.metadata.title,
                datetime: doc.metadata.datetime,
                last_modified: doc.metadata.last_modified,
                hero_image_path: hero_image_path.as_deref(),
            };

            let subdir = type_subdir(doc.document_type);
            let type_dir = og_images_dir.join(subdir);
            let filename = format!("{}.png", doc.id.join("-"));
            let output_path = type_dir.join(&filename);

            generator
                .generate(&options, &output_path)
                .with_context(|| {
                    format!("Failed to generate OG image for {}", doc.metadata.title)
                })?;

            Ok(())
        })
    })
}

// -----------------------------------------------------------------------------
// Private implementation (in order of use)
// -----------------------------------------------------------------------------

const IMAGE_WIDTH: u32 = 1200;
const IMAGE_HEIGHT: u32 = 630;
const SIDE_PADDING: f32 = 40.0;

/// Create a blurred and darkened background image from a hero image
fn create_blurred_darkened_background(hero_path: &Path) -> Result<String> {
    // Load the hero image
    let img = ImageReader::open(hero_path)?.decode()?;

    // Calculate crop dimensions for OG image aspect ratio (1200x630)
    let (orig_width, orig_height) = img.dimensions();
    let target_aspect = IMAGE_WIDTH as f64 / IMAGE_HEIGHT as f64;
    let orig_aspect = orig_width as f64 / orig_height as f64;

    let (crop_width, crop_height) = if orig_aspect > target_aspect {
        // Image is wider than target, crop width
        let new_width = (orig_height as f64 * target_aspect) as u32;
        (new_width, orig_height)
    } else {
        // Image is taller than target, crop height
        let new_height = (orig_width as f64 / target_aspect) as u32;
        (orig_width, new_height)
    };

    // Center crop
    let crop_x = (orig_width - crop_width) / 2;
    let crop_y = (orig_height - crop_height) / 2;

    // Crop, resize to target dimensions, and convert to RGBA
    let img = img
        .crop_imm(crop_x, crop_y, crop_width, crop_height)
        .resize_exact(
            IMAGE_WIDTH,
            IMAGE_HEIGHT,
            image::imageops::FilterType::Lanczos3,
        )
        .to_rgba8();

    let blurred = image::imageops::blur(&img, 20.0);

    // Find peak brightness of the blurred image
    let peak_brightness = blurred
        .pixels()
        .map(|p| (p[0] as f64 + p[1] as f64 + p[2] as f64) / 3.0)
        .fold(0.0_f64, f64::max);

    // Calculate multiplier to achieve target peak brightness
    let target_brightness = 0.5 * 255.0;
    let multiplier = (target_brightness / peak_brightness).min(1.0) as f32;

    let darkened = image::ImageBuffer::from_fn(IMAGE_WIDTH, IMAGE_HEIGHT, |x, y| {
        let pixel = blurred.get_pixel(x, y);
        image::Rgba([
            (pixel[0] as f32 * multiplier) as u8,
            (pixel[1] as f32 * multiplier) as u8,
            (pixel[2] as f32 * multiplier) as u8,
            pixel[3],
        ])
    });

    // Encode to PNG and then to base64 data URL
    let mut png_bytes = Vec::new();
    let encoder = image::codecs::png::PngEncoder::new(Cursor::new(&mut png_bytes));
    encoder.write_image(
        &darkened,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        image::ExtendedColorType::Rgba8,
    )?;

    let base64_data = STANDARD.encode(&png_bytes);
    Ok(format!("data:image/png;base64,{base64_data}"))
}

/// Generate SVG content for the OG image
fn generate_svg(
    document_type: DocumentType,
    title: &str,
    author: &str,
    datetime: Option<&DateTime<Utc>>,
    last_modified: Option<&DateTime<Utc>>,
    og_base_url: &str,
) -> String {
    const TEXT_COLOR: &str = "#ffffff";
    const SECONDARY_TEXT_COLOR: &str = "#cccccc";
    const BOTTOM_MARGIN: f32 = 40.0;
    const TOP_PADDING: f32 = 40.0;
    const TYPE_FONT_SIZE: f32 = 30.0;
    const AUTHOR_FONT_SIZE: f32 = 40.0;
    const DATE_FONT_SIZE: f32 = 30.0;
    const UPDATED_DATE_FONT_SIZE: f32 = 20.0;

    let title_font_size = 40.0;

    // Text positioning
    let title_x = SIDE_PADDING;
    let title_y = IMAGE_HEIGHT as f32 - BOTTOM_MARGIN;
    let type_x = SIDE_PADDING;
    let type_y = title_y - title_font_size - 4.0;
    let author_text_x = IMAGE_WIDTH as f32 - SIDE_PADDING;
    let author_text_y = TOP_PADDING + AUTHOR_FONT_SIZE;
    let date_text_x = author_text_x;
    let date_text_y = author_text_y + DATE_FONT_SIZE + 6.0;
    let updated_date_text_y = date_text_y + UPDATED_DATE_FONT_SIZE + 4.0;

    // Truncate the title to a maximum length, ending with a ... if truncated
    const MAX_TITLE_LENGTH: usize = 50;
    let title = if title.len() > MAX_TITLE_LENGTH {
        format!(
            "{}...",
            title.chars().take(MAX_TITLE_LENGTH).collect::<String>()
        )
    } else {
        title.to_string()
    };

    // Escape XML special characters and lowercase
    let post_type = escape_xml(&document_type.to_string().to_lowercase());
    let title = escape_xml(&title);
    let author = escape_xml(&author.to_lowercase());

    // Format date if present
    let date_element = if let Some(dt) = datetime {
        let date_str = dt.format("%Y-%m-%d").to_string();
        let escaped_date_str = escape_xml(&date_str);
        let mut svg = format!(
            r#"<text x="{date_text_x}" y="{date_text_y}" font-size="{DATE_FONT_SIZE}px" fill="{SECONDARY_TEXT_COLOR}" text-anchor="end">{escaped_date_str}</text>"#
        );

        // Add last modified date if different from published date
        if let Some(lm) = last_modified
            && lm.date_naive() != dt.date_naive()
        {
            let lm_str = lm.format("%Y-%m-%d").to_string();
            let escaped_lm_str = escape_xml(&lm_str);
            svg.push_str(&format!(
                    r#"<text x="{date_text_x}" y="{updated_date_text_y}" font-size="{UPDATED_DATE_FONT_SIZE}px" fill="{SECONDARY_TEXT_COLOR}" text-anchor="end">updated {escaped_lm_str}</text>"#
                ));
        }

        svg
    } else {
        String::new()
    };

    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<svg width="{IMAGE_WIDTH}" height="{IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {{
        font-family: 'Literata';
        src: url('/fonts/Literata.woff2') format('woff2');
      }}
      text {{
        font-family: 'Literata', serif;
      }}
    </style>
  </defs>

  <image href="{og_base_url}" x="0" y="0" width="{IMAGE_WIDTH}" height="{IMAGE_HEIGHT}"/>

  {date_element}
  <text x="{type_x}" y="{type_y}" font-size="{TYPE_FONT_SIZE}px" fill="{SECONDARY_TEXT_COLOR}">{post_type}</text>
  <text x="{title_x}" y="{title_y}" font-size="{title_font_size}px" fill="{TEXT_COLOR}">{title}</text>

  <text x="{author_text_x}" y="{author_text_y}" font-size="{AUTHOR_FONT_SIZE}px" text-anchor="end" fill="{TEXT_COLOR}">{author}</text>
</svg>"#
    )
}

fn escape_xml(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}

fn collect_notes<'a>(docs: &mut Vec<&'a Document>, folder: &'a DocumentFolderNode) {
    if let Some(doc) = &folder.index_document {
        docs.push(doc);
    }
    for child in folder.children.values() {
        match child {
            DocumentNode::Folder(folder) => {
                collect_notes(docs, folder);
            }
            DocumentNode::Document { document } => {
                docs.push(document);
            }
        }
    }
}

fn type_subdir(document_type: DocumentType) -> &'static str {
    match document_type {
        DocumentType::Blog => "blog",
        DocumentType::Update => "updates",
        DocumentType::Note => "notes",
    }
}
