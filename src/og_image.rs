use anyhow::Result;
use chrono::{DateTime, Utc};
use std::path::Path;

const IMAGE_WIDTH: u32 = 1200;
const IMAGE_HEIGHT: u32 = 630;
const BACKGROUND_COLOR: &str = "#3c2954";
const TEXT_COLOR: &str = "#ffffff";
const BOTTOM_MARGIN: f32 = 80.0;
const SIDE_PADDING: f32 = 100.0; // Padding on each side
const TOP_PADDING: f32 = 60.0;
const TYPE_FONT_SIZE: f32 = 32.0;
const AUTHOR_FONT_SIZE: f32 = 32.0;
const DATE_FONT_SIZE: f32 = 28.0;
const TITLE_MAX_FONT_SIZE: f32 = 80.0;
const TITLE_MIN_FONT_SIZE: f32 = 40.0;
const LINE_SPACING: f32 = 20.0;
const MAX_TEXT_WIDTH: f32 = IMAGE_WIDTH as f32 - (SIDE_PADDING * 2.0);
const ICON_SIZE: f32 = 40.0; // Size of the circular icon
const ICON_MARGIN: f32 = 12.0; // Space between icon and text

pub struct OgImageOptions {
    pub post_type: String,
    pub title: String,
    pub author: String,
    pub datetime: Option<DateTime<Utc>>,
}

impl Default for OgImageOptions {
    fn default() -> Self {
        Self {
            post_type: String::new(),
            title: String::new(),
            author: "philpax".to_string(),
            datetime: None,
        }
    }
}

/// Generate an OpenGraph preview image with the given options
pub fn generate_og_image(options: &OgImageOptions, output_path: &Path) -> Result<()> {
    // Calculate dynamic title font size based on length
    let title_font_size = calculate_title_font_size(&options.title);

    // Load icon and convert to base64
    let icon_data_url = load_icon_as_data_url()?;

    // Generate SVG
    let svg_content = generate_svg(
        &options.post_type,
        &options.title,
        &options.author,
        options.datetime.as_ref(),
        title_font_size,
        &icon_data_url,
    );

    // Parse SVG with usvg
    let mut opt = usvg::Options::default();
    opt.fontdb_mut().load_system_fonts();

    // Try to load Literata font from the static directory
    if let Ok(font_data) = std::fs::read("static/fonts/Literata.woff2") {
        opt.fontdb_mut().load_font_data(font_data);
    }

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

/// Load the icon.png file and convert it to a base64 data URL
fn load_icon_as_data_url() -> Result<String> {
    let icon_path = "assets/baked/static/icon.png";
    let icon_data = std::fs::read(icon_path)?;
    let base64_data = base64_encode(&icon_data);
    Ok(format!("data:image/png;base64,{}", base64_data))
}

/// Simple base64 encoding
fn base64_encode(data: &[u8]) -> String {
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut result = String::new();

    for chunk in data.chunks(3) {
        let b1 = chunk[0];
        let b2 = chunk.get(1).copied().unwrap_or(0);
        let b3 = chunk.get(2).copied().unwrap_or(0);

        result.push(CHARS[(b1 >> 2) as usize] as char);
        result.push(CHARS[(((b1 & 0x03) << 4) | (b2 >> 4)) as usize] as char);

        if chunk.len() > 1 {
            result.push(CHARS[(((b2 & 0x0f) << 2) | (b3 >> 6)) as usize] as char);
        } else {
            result.push('=');
        }

        if chunk.len() > 2 {
            result.push(CHARS[(b3 & 0x3f) as usize] as char);
        } else {
            result.push('=');
        }
    }

    result
}

/// Calculate the appropriate font size for the title to fit within the image width
fn calculate_title_font_size(title: &str) -> f32 {
    // Estimate character width for Literata font (serif)
    // Average character width ≈ font_size * 0.55 for this font
    const AVG_CHAR_WIDTH_RATIO: f32 = 0.55;

    let char_count = title.chars().count() as f32;

    // Calculate the font size that would fit the text within MAX_TEXT_WIDTH
    // estimated_width = char_count * font_size * AVG_CHAR_WIDTH_RATIO
    // We want: estimated_width <= MAX_TEXT_WIDTH
    // Therefore: font_size <= MAX_TEXT_WIDTH / (char_count * AVG_CHAR_WIDTH_RATIO)
    let calculated_size = MAX_TEXT_WIDTH / (char_count * AVG_CHAR_WIDTH_RATIO);

    // Clamp between min and max font sizes
    calculated_size.clamp(TITLE_MIN_FONT_SIZE, TITLE_MAX_FONT_SIZE)
}

/// Generate SVG content for the OG image
fn generate_svg(
    post_type: &str,
    title: &str,
    author: &str,
    datetime: Option<&DateTime<Utc>>,
    title_font_size: f32,
    icon_data_url: &str,
) -> String {
    // Calculate vertical positions (from bottom up)
    let author_y = IMAGE_HEIGHT as f32 - BOTTOM_MARGIN;
    let title_y = author_y - AUTHOR_FONT_SIZE - LINE_SPACING;
    let type_y = title_y - title_font_size - LINE_SPACING;

    // Icon positioning
    let icon_x = SIDE_PADDING;
    let icon_y = author_y - AUTHOR_FONT_SIZE / 2.0 - ICON_SIZE / 2.0; // Center vertically with text
    let icon_center_x = icon_x + ICON_SIZE / 2.0;
    let icon_center_y = icon_y + ICON_SIZE / 2.0;
    let icon_radius = ICON_SIZE / 2.0;
    let author_text_x = icon_x + ICON_SIZE + ICON_MARGIN;

    // Text positioning
    let type_text_x = SIDE_PADDING;
    let title_text_x = SIDE_PADDING;
    let date_text_x = IMAGE_WIDTH as f32 - SIDE_PADDING;
    let date_text_y = TOP_PADDING;

    // Dimensions and colors
    let image_width = IMAGE_WIDTH;
    let image_height = IMAGE_HEIGHT;
    let text_color = TEXT_COLOR;
    let background_color = BACKGROUND_COLOR;
    let type_font_size = TYPE_FONT_SIZE;
    let author_font_size = AUTHOR_FONT_SIZE;
    let date_font_size = DATE_FONT_SIZE;
    let icon_size = ICON_SIZE;

    // Escape XML special characters and lowercase
    let post_type = escape_xml(&post_type.to_lowercase());
    let title = escape_xml(title);
    let author = escape_xml(&author.to_lowercase());

    // Format date if present
    let date_element = if let Some(dt) = datetime {
        let date_str = dt.format("%Y-%m-%d").to_string();
        let escaped_date_str = escape_xml(&date_str);
        format!(
            r#"<text x="{date_text_x}" y="{date_text_y}" font-size="{date_font_size}px" opacity="0.7" text-anchor="end">{escaped_date_str}</text>"#
        )
    } else {
        String::new()
    };

    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<svg width="{image_width}" height="{image_height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {{
        font-family: 'Literata';
        src: url('/fonts/Literata.woff2') format('woff2');
      }}
      text {{
        font-family: 'Literata', serif;
        fill: {text_color};
      }}
    </style>
    <clipPath id="icon-circle">
      <circle cx="{icon_center_x}" cy="{icon_center_y}" r="{icon_radius}"/>
    </clipPath>
  </defs>

  <rect width="100%" height="100%" fill="{background_color}"/>

  {date_element}
  <text x="{type_text_x}" y="{type_y}" font-size="{type_font_size}px" opacity="0.7">{post_type}</text>
  <text x="{title_text_x}" y="{title_y}" font-size="{title_font_size}px" font-weight="bold">{title}</text>

  <!-- Icon with circular clip and white border -->
  <image href="{icon_data_url}" x="{icon_x}" y="{icon_y}" width="{icon_size}" height="{icon_size}" clip-path="url(#icon-circle)"/>
  <circle cx="{icon_center_x}" cy="{icon_center_y}" r="{icon_radius}" fill="none" stroke="white" stroke-width="2"/>

  <text x="{author_text_x}" y="{author_y}" font-size="{author_font_size}px" opacity="0.7">{author}</text>
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
