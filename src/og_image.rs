use anyhow::Result;
use base64::{engine::general_purpose::STANDARD, Engine};
use chrono::{DateTime, Utc};
use std::{path::Path, sync::Arc};

const IMAGE_WIDTH: u32 = 1200;
const IMAGE_HEIGHT: u32 = 630;
const SIDE_PADDING: f32 = 40.0; // Padding on each side

#[derive(Default)]
pub struct OgImageOptions {
    pub post_type: String,
    pub title: String,
    pub datetime: Option<DateTime<Utc>>,
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
        // Generate SVG
        let svg_content = generate_svg(
            &options.post_type,
            &options.title,
            &self.author,
            options.datetime.as_ref(),
            &self.og_base_data_url,
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

/// Generate SVG content for the OG image
fn generate_svg(
    post_type: &str,
    title: &str,
    author: &str,
    datetime: Option<&DateTime<Utc>>,
    og_base_url: &str,
) -> String {
    const TEXT_COLOR: &str = "#ffffff";
    const SECONDARY_TEXT_COLOR: &str = "#cccccc"; // --color-secondary from stylesheet
    const BOTTOM_MARGIN: f32 = 40.0;
    const TOP_PADDING: f32 = 40.0;
    const TYPE_FONT_SIZE: f32 = 30.0;
    const AUTHOR_FONT_SIZE: f32 = 40.0;
    const DATE_FONT_SIZE: f32 = 30.0;

    // Calculate dynamic title font size based on length
    // let title_font_size = calculate_title_font_size(&options.title);
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
    let post_type = escape_xml(&post_type.to_lowercase());
    let title = escape_xml(&title);
    let author = escape_xml(&author.to_lowercase());

    // Format date if present
    let date_element = if let Some(dt) = datetime {
        let date_str = dt.format("%Y-%m-%d").to_string();
        let escaped_date_str = escape_xml(&date_str);
        format!(
            r#"<text x="{date_text_x}" y="{date_text_y}" font-size="{DATE_FONT_SIZE}px" fill="{SECONDARY_TEXT_COLOR}" text-anchor="end">{escaped_date_str}</text>"#
        )
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

/// Escape XML special characters
fn escape_xml(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}
