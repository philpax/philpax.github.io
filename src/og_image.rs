use anyhow::Result;
use std::path::Path;

const IMAGE_WIDTH: u32 = 1200;
const IMAGE_HEIGHT: u32 = 630;
const BACKGROUND_COLOR: &str = "#3c2954";
const TEXT_COLOR: &str = "#ffffff";
const BOTTOM_MARGIN: f32 = 80.0;
const SIDE_PADDING: f32 = 100.0; // Padding on each side
const TYPE_FONT_SIZE: f32 = 32.0;
const AUTHOR_FONT_SIZE: f32 = 32.0;
const TITLE_MAX_FONT_SIZE: f32 = 80.0;
const TITLE_MIN_FONT_SIZE: f32 = 40.0;
const LINE_SPACING: f32 = 20.0;
const MAX_TEXT_WIDTH: f32 = IMAGE_WIDTH as f32 - (SIDE_PADDING * 2.0);

pub struct OgImageOptions {
    pub post_type: String,
    pub title: String,
    pub author: String,
}

impl Default for OgImageOptions {
    fn default() -> Self {
        Self {
            post_type: String::new(),
            title: String::new(),
            author: "Philpax".to_string(),
        }
    }
}

/// Generate an OpenGraph preview image with the given options
pub fn generate_og_image(options: &OgImageOptions, output_path: &Path) -> Result<()> {
    // Calculate dynamic title font size based on length
    let title_font_size = calculate_title_font_size(&options.title);

    // Generate SVG
    let svg_content = generate_svg(
        &options.post_type,
        &options.title,
        &options.author,
        title_font_size,
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
    pixmap.save_png(output_path)?;

    Ok(())
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
fn generate_svg(post_type: &str, title: &str, author: &str, title_font_size: f32) -> String {
    // Calculate vertical positions (from bottom up)
    let author_y = IMAGE_HEIGHT as f32 - BOTTOM_MARGIN;
    let title_y = author_y - AUTHOR_FONT_SIZE - LINE_SPACING;
    let type_y = title_y - title_font_size - LINE_SPACING;

    // Escape XML special characters
    let post_type = escape_xml(post_type);
    let title = escape_xml(title);
    let author = escape_xml(author);

    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<svg width="{}" height="{}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {{
        font-family: 'Literata';
        src: url('/fonts/Literata.woff2') format('woff2');
      }}
      text {{
        font-family: 'Literata', serif;
        fill: {};
        text-anchor: middle;
      }}
    </style>
  </defs>

  <rect width="100%" height="100%" fill="{}"/>

  <text x="50%" y="{}" font-size="{}px" opacity="0.7">{}</text>
  <text x="50%" y="{}" font-size="{}px" font-weight="bold" textLength="{}" lengthAdjust="spacingAndGlyphs">{}</text>
  <text x="50%" y="{}" font-size="{}px" opacity="0.7">{}</text>
</svg>"#,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        TEXT_COLOR,
        BACKGROUND_COLOR,
        type_y,
        TYPE_FONT_SIZE,
        post_type,
        title_y,
        title_font_size,
        MAX_TEXT_WIDTH,
        title,
        author_y,
        AUTHOR_FONT_SIZE,
        author
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
