//! Preview images: the header's contour field in the section's colour, the
//! wordmark and section box, and the page's title and subtitle, in the site's
//! faces and dark theme colours.

use anyhow::{Context, Result};
use base64::{Engine, engine::general_purpose::STANDARD};
use chrono::{DateTime, Utc};
use rayon::prelude::*;
use std::{path::Path, sync::Arc, thread::JoinHandle};

use crate::{
    content::{
        Content, Document, DocumentFolderNode, DocumentLeafNode, DocumentNode, DocumentType,
    },
    views::{self, CurrentPage},
};

mod field;
mod tokens;

use tokens::{Palette, Section, hex};

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/// Preview of a non-document page, by name: `index`, `blog`, `updates`, `tags`,
/// `credits` or `404`.
pub fn page_image_path(page: &str) -> String {
    format!("/og-images/pages/{page}.png")
}

/// Preview of a tag's page.
pub fn tag_image_path(tag: &str) -> String {
    format!("/og-images/tags/{tag}.png")
}

/// Spawns OG image generation on a background thread.
pub fn spawn_generation(
    content: Arc<Content>,
    output_dir: &Path,
    author: &str,
) -> JoinHandle<Result<()>> {
    let output_dir = output_dir.to_path_buf();
    let author = author.to_string();

    std::thread::spawn(move || {
        let generator = Generator::new(author)?;
        previews(&content)
            .par_iter()
            .try_for_each(|(path, preview)| {
                let output_path = output_dir.join(path.trim_start_matches('/'));
                generator
                    .generate(preview, &output_path)
                    .with_context(|| format!("Failed to generate OG image for {}", preview.title))
            })
    })
}

// -----------------------------------------------------------------------------
// Private implementation (in order of use)
// -----------------------------------------------------------------------------

/// Which section's colours and box a preview uses.
#[derive(Clone, Copy)]
enum Look {
    Post,
    Update,
    Note,
    Tag,
    Credits,
}

impl Look {
    const ALL: [Look; 5] = [
        Look::Post,
        Look::Update,
        Look::Note,
        Look::Tag,
        Look::Credits,
    ];

    /// Section name in the tokens.
    fn token(self) -> &'static str {
        match self {
            Look::Post => "post",
            Look::Update => "update",
            Look::Note => "note",
            Look::Tag => "tag",
            Look::Credits => "credits",
        }
    }

    /// Label on the section's box, as in the nav.
    fn label(self) -> &'static str {
        match self {
            Look::Post => CurrentPage::Blog,
            Look::Update => CurrentPage::Updates,
            Look::Note => CurrentPage::Notes,
            Look::Tag => CurrentPage::Tags,
            Look::Credits => CurrentPage::Credits,
        }
        .name()
    }
}

/// What a preview shows.
struct Preview {
    look: Look,
    /// Wordmark alone, centred and large, instead of the header row and title
    /// (the front page).
    wordmark_only: bool,
    /// Whether the section's box is drawn; omitted where the title names it.
    boxed: bool,
    /// Drawn before the title in muted ink (a tag's `#`).
    prefix: Option<&'static str>,
    title: String,
    /// Line under the title: a document's date or a page's lede.
    subtitle: Option<String>,
    /// Selects the part of the field shown; stable per page.
    seed: u64,
}

/// Every preview to draw, by served path.
fn previews(content: &Content) -> Vec<(String, Preview)> {
    let mut documents: Vec<&Document> = Vec::new();
    documents.extend(&content.blog.documents);
    documents.extend(&content.updates.documents);
    collect_notes(&mut documents, &content.notes.documents);
    let documents = documents.into_iter().map(|doc| {
        let look = match doc.document_type {
            DocumentType::Blog => Look::Post,
            DocumentType::Update => Look::Update,
            DocumentType::Note => Look::Note,
        };
        let preview = Preview {
            look,
            wordmark_only: false,
            boxed: true,
            prefix: None,
            title: doc.metadata.title.clone(),
            subtitle: dates(doc.metadata.datetime, doc.metadata.last_modified),
            seed: 0,
        };
        (doc.og_image_path(), preview)
    });

    let page = |name: &str, look, title: &str, subtitle: &str| {
        let preview = Preview {
            look,
            wordmark_only: false,
            boxed: false,
            prefix: None,
            title: title.to_string(),
            subtitle: Some(subtitle.to_string()),
            seed: 0,
        };
        (page_image_path(name), preview)
    };
    let index = Preview {
        look: Look::Post,
        wordmark_only: true,
        boxed: false,
        prefix: None,
        title: paxsite_content::CONFIG.name.to_string(),
        subtitle: None,
        seed: 0,
    };
    let pages = [
        (page_image_path("index"), index),
        page(
            "blog",
            Look::Post,
            CurrentPage::Blog.name(),
            views::blog::LEDE,
        ),
        page(
            "updates",
            Look::Update,
            CurrentPage::Updates.name(),
            views::updates::LEDE,
        ),
        page(
            "tags",
            Look::Tag,
            CurrentPage::Tags.name(),
            views::tags::LEDE,
        ),
        page(
            "credits",
            Look::Credits,
            &paxsite_content::markdown_to_plaintext(&content.credits.metadata.title),
            views::credits::LEDE,
        ),
        page(
            "404",
            Look::Post,
            CurrentPage::NotFound.name(),
            views::not_found::LEDE,
        ),
    ];

    let tags = content.tags.keys().map(|tag| {
        let preview = Preview {
            look: Look::Tag,
            wordmark_only: false,
            boxed: true,
            prefix: Some("#"),
            title: tag.clone(),
            subtitle: content
                .tag_descriptions
                .get(tag)
                .map(|description| paxsite_content::markdown_to_plaintext(description)),
            seed: 0,
        };
        (tag_image_path(tag), preview)
    });

    documents
        .chain(pages)
        .chain(tags)
        .map(|(path, preview)| {
            let seed = fnv1a(&path);
            (path, Preview { seed, ..preview })
        })
        .collect()
}

/// A document's date, plus its last-modified date if later.
fn dates(datetime: Option<DateTime<Utc>>, last_modified: Option<DateTime<Utc>>) -> Option<String> {
    datetime.map(|dt| {
        let mut date = dt.format("%Y-%m-%d").to_string();
        if let Some(lm) = last_modified
            && lm.date_naive() != dt.date_naive()
        {
            date.push_str(&format!(" · updated {}", lm.format("%Y-%m-%d")));
        }
        date
    })
}

struct Generator {
    author: String,
    fontdb: Arc<fontdb::Database>,
    fonts: Fonts,
    palette: Palette,
    /// Colours per look, in `Look::ALL` order.
    sections: Vec<Section>,
    header: Header,
    icon_data_url: String,
}

impl Generator {
    fn new(author: String) -> Result<Self> {
        let mut fontdb = fontdb::Database::new();
        let fonts = Fonts::load(&mut fontdb)?;
        let tokens = crate::styles::tokens_css();
        let icon =
            std::fs::read("assets/baked/static/icon.png").context("failed to read the icon")?;
        Ok(Self {
            author,
            fontdb: Arc::new(fontdb),
            fonts,
            palette: Palette::from_tokens(tokens)?,
            header: Header::from_tokens(tokens)?,
            sections: Look::ALL
                .iter()
                .map(|look| Section::from_tokens(tokens, look.token()))
                .collect::<Result<_>>()?,
            icon_data_url: format!("data:image/png;base64,{}", STANDARD.encode(icon)),
        })
    }

    /// Draws `preview` to `output_path`.
    fn generate(&self, preview: &Preview, output_path: &Path) -> Result<()> {
        let section = &self.sections[preview.look as usize];
        let background = field::render(
            IMAGE_WIDTH,
            IMAGE_HEIGHT,
            preview.seed,
            self.palette.canvas,
            section.accent,
        );
        let size = resvg::tiny_skia::IntSize::from_wh(IMAGE_WIDTH, IMAGE_HEIGHT)
            .context("the image has no size")?;
        let mut pixmap = resvg::tiny_skia::Pixmap::from_vec(background, size)
            .context("failed to make the image's canvas")?;

        let tree = usvg::Tree::from_str(
            &self.svg(preview, section),
            &usvg::Options {
                fontdb: self.fontdb.clone(),
                ..Default::default()
            },
        )?;
        resvg::render(&tree, usvg::Transform::identity(), &mut pixmap.as_mut());

        if let Some(parent) = output_path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        pixmap.save_png(output_path)?;
        Ok(())
    }
}

const IMAGE_WIDTH: u32 = 1200;
const IMAGE_HEIGHT: u32 = 630;
/// Margin on all sides.
const PADDING: f32 = 64.0;
/// Wordmark height; the rest of the header row scales to match.
const BOX_HEIGHT: f32 = 72.0;

/// The site's faces, pre-instanced at the weights used (the renderer can't
/// vary axes).
struct Fonts {
    display: Font,
    ui: Font,
    wordmark: Font,
}

struct Font {
    /// Family name in the renderer.
    family: String,
    data: Arc<Vec<u8>>,
}

impl Fonts {
    fn load(db: &mut fontdb::Database) -> Result<Self> {
        let mut load = |source: &str, axes: &[(&[u8; 4], Option<f32>)]| -> Result<Font> {
            let data = crate::fonts::static_instance(source, axes)?;
            let before = db.len();
            db.load_font_data(data.clone());
            let family = db
                .faces()
                .nth(before)
                .and_then(|face| face.families.first())
                .map(|(family, _)| family.clone())
                .with_context(|| format!("{source} has no family name"))?;
            Ok(Font {
                family,
                data: Arc::new(data),
            })
        };
        Ok(Self {
            // Document title: heading face, semibold, display optical size.
            display: load(
                "fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf",
                &[
                    (b"wght", Some(560.0)),
                    (b"opsz", Some(72.0)),
                    (b"SOFT", None),
                    (b"WONK", None),
                ],
            )?,
            ui: load("figtree/Figtree[wght].ttf", &[(b"wght", Some(400.0))])?,
            wordmark: load("alegreya/Alegreya[wght].ttf", &[(b"wght", Some(600.0))])?,
        })
    }
}

impl Font {
    fn face(&self) -> ttf_parser::Face<'_> {
        ttf_parser::Face::parse(&self.data, 0).expect("an instanced font parses")
    }

    /// Width of `text` at `size` with `tracking` (ems) after each character.
    fn measure(&self, text: &str, size: f32, tracking: f32) -> f32 {
        let face = self.face();
        let scale = size / face.units_per_em() as f32;
        text.chars()
            .filter_map(|c| face.glyph_index(c))
            .filter_map(|g| face.glyph_hor_advance(g))
            .map(|advance| advance as f32 * scale + tracking * size)
            .sum()
    }

    /// Baseline in a `line_height`-tall line box at `top`, centring ascent and
    /// descent as CSS does.
    fn baseline(&self, top: f32, line_height: f32, size: f32) -> f32 {
        let face = self.face();
        let scale = size / face.units_per_em() as f32;
        let ascent = face.ascender() as f32 * scale;
        let descent = -(face.descender() as f32) * scale;
        top + (line_height - ascent - descent) / 2.0 + ascent
    }
}

/// The header's measures in CSS pixels, from the `.site-brand` and nav box
/// tokens (`layout.css`).
struct Header {
    /// Wordmark text size, line height and letter-spacing (ems).
    brand_size: f32,
    brand_line: f32,
    brand_tracking: f32,
    /// Nav box text size and line height.
    nav_size: f32,
    nav_line: f32,
    /// `--s-2` and `--s-3`: box padding and wordmark gap.
    s2: f32,
    s3: f32,
}

impl Header {
    fn from_tokens(css: &str) -> Result<Self> {
        let rem = |name| tokens::measure(css, name).map(|v| (v * 16.0) as f32);
        let lead = tokens::measure(css, "--lead-normal")? as f32;
        let spacing = rem("--spacing")?;
        let (brand_size, nav_size) = (rem("--text-lg")?, rem("--text-sm")?);
        Ok(Self {
            brand_size,
            brand_line: brand_size * lead,
            brand_tracking: tokens::measure(css, "--tracking-display")? as f32,
            nav_size,
            nav_line: nav_size * lead,
            s2: spacing * 2.0,
            s3: spacing * 3.0,
        })
    }

    /// Wordmark height: line plus vertical padding.
    fn brand_height(&self) -> f32 {
        self.brand_line + self.s2 * 2.0
    }
}

impl Generator {
    /// The wordmark, `height` tall with top-left at `x`, `y`: icon to the box
    /// edges, then the name on `solid`.
    fn wordmark(&self, x: f32, y: f32, height: f32, solid: &str) -> String {
        let header = &self.header;
        let k = height / header.brand_height();
        let name = self.author.to_lowercase();
        let (name_size, tracking) = (header.brand_size * k, header.brand_tracking);
        let width = self.wordmark_width(height);
        format!(
            r#"<rect x="{x}" y="{y}" width="{width}" height="{height}" fill="{solid}"/>
  <image href="{icon}" x="{x}" y="{y}" width="{height}" height="{height}" preserveAspectRatio="xMidYMid slice"/>
  <text x="{name_x}" y="{name_y}" font-family="{family}" font-size="{name_size}" letter-spacing="{spacing}" fill="white">{name}</text>"#,
            icon = self.icon_data_url,
            name_x = x + height + header.s3 * k,
            name_y =
                self.fonts
                    .wordmark
                    .baseline(y + header.s2 * k, header.brand_line * k, name_size),
            spacing = tracking * name_size,
            family = escape_xml(&self.fonts.wordmark.family),
            name = escape_xml(&name),
        )
    }

    /// Wordmark width at `height`.
    fn wordmark_width(&self, height: f32) -> f32 {
        let header = &self.header;
        let k = height / header.brand_height();
        let name = self.author.to_lowercase();
        height
            + header.s3 * k * 2.0
            + self
                .fonts
                .wordmark
                .measure(&name, header.brand_size * k, header.brand_tracking)
    }

    /// Everything drawn over the field, as SVG.
    fn svg(&self, preview: &Preview, section: &Section) -> String {
        if preview.wordmark_only {
            let height = WORDMARK_ALONE_HEIGHT;
            let width = self.wordmark_width(height);
            let wordmark = self.wordmark(
                (IMAGE_WIDTH as f32 - width) / 2.0,
                (IMAGE_HEIGHT as f32 - height) / 2.0,
                height,
                &hex(section.solid),
            );
            return format!(
                r#"<svg width="{IMAGE_WIDTH}" height="{IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  {wordmark}
</svg>"#
            );
        }

        let (w, h) = (IMAGE_WIDTH as f32, IMAGE_HEIGHT as f32);
        let ink = hex(self.palette.ink);
        let muted = hex(self.palette.ink_muted);
        let solid = hex(section.solid);
        let header = &self.header;
        // Header row, scaled so the wordmark is BOX_HEIGHT tall.
        let k = BOX_HEIGHT / header.brand_height();

        let brand = self.wordmark(PADDING, PADDING, BOX_HEIGHT, &solid);

        // Section box, centred on the wordmark as in the header.
        let section_box = (preview.boxed)
            .then_some(section.icon_svg.as_ref())
            .flatten()
            .map(|icon| {
                let label = preview.look.label();
                let label_size = header.nav_size * k;
                let (pad_x, pad_y) = (header.s3 * k, header.s2 * k);
                let (icon_size, icon_gap) = (label_size * 0.85, label_size * 0.3);
                let box_width = pad_x * 2.0
                    + icon_size
                    + icon_gap
                    + self.fonts.ui.measure(label, label_size, 0.0);
                let box_height = header.nav_line * k + pad_y * 2.0;
                let (box_x, box_y) = (
                    w - PADDING - box_width,
                    PADDING + (BOX_HEIGHT - box_height) / 2.0,
                );
                let label_y = self
                    .fonts
                    .ui
                    .baseline(box_y + pad_y, header.nav_line * k, label_size);
                format!(
                    r#"<rect x="{box_x}" y="{box_y}" width="{box_width}" height="{box_height}" fill="{solid}"/>
  <image href="data:image/svg+xml;base64,{icon}" x="{icon_x}" y="{icon_y}" width="{icon_size}" height="{icon_size}"/>
  <text x="{label_x}" y="{label_y}" font-family="{family}" font-size="{label_size}" fill="white">{label}</text>"#,
                    icon = STANDARD.encode(icon),
                    icon_x = box_x + pad_x,
                    // The mark is an empty inline block: its bottom sits on the
                    // baseline, lowered by `vertical-align: -0.06em`.
                    icon_y = label_y + label_size * 0.06 - icon_size,
                    label_x = box_x + pad_x + icon_size + icon_gap,
                    family = escape_xml(&self.fonts.ui.family),
                    label = escape_xml(label),
                )
            })
            .unwrap_or_default();

        // Title at the largest size fitting three lines, truncated beyond that.
        let max_width = w - PADDING * 2.0;
        let prefix = preview.prefix.unwrap_or_default();
        let full_title = format!("{prefix}{}", preview.title);
        let display = &self.fonts.display;
        let (title_size, lines) = TITLE_SIZES
            .iter()
            .map(|&size| (size, wrap(display, &full_title, size, max_width)))
            .find(|(_, lines)| lines.len() <= MAX_TITLE_LINES)
            .unwrap_or_else(|| {
                let size = *TITLE_SIZES.last().unwrap();
                let lines = wrap(display, &full_title, size, max_width);
                (
                    size,
                    truncate(display, lines, size, max_width, MAX_TITLE_LINES),
                )
            });
        let title_line = title_size * 1.12;

        // Subtitle, up to two lines.
        let (sub_size, sub_gap) = (28.0, 18.0);
        let sub_line = sub_size * 1.3;
        let sub_lines = preview
            .subtitle
            .as_deref()
            .map(|subtitle| {
                let lines = wrap(&self.fonts.ui, subtitle, sub_size, max_width);
                truncate(
                    &self.fonts.ui,
                    lines,
                    sub_size,
                    max_width,
                    MAX_SUBTITLE_LINES,
                )
            })
            .unwrap_or_default();

        // Title and date form one block, centred below the header row.
        let sub_height = if sub_lines.is_empty() {
            0.0
        } else {
            sub_gap + sub_line * sub_lines.len() as f32
        };
        let block_height = title_line * lines.len() as f32 + sub_height;
        let space_top = PADDING + BOX_HEIGHT;
        let block_top = space_top + (h - PADDING - space_top - block_height) / 2.0;

        let title = lines
            .iter()
            .enumerate()
            .map(|(i, line)| {
                // Prefix on the first line in muted ink.
                let line = match line.strip_prefix(prefix) {
                    Some(rest) if i == 0 && !prefix.is_empty() => format!(
                        r#"<tspan fill="{muted}">{}</tspan>{}"#,
                        escape_xml(prefix),
                        escape_xml(rest)
                    ),
                    _ => escape_xml(line),
                };
                format!(
                    r#"<text x="{PADDING}" y="{y}" font-family="{family}" font-size="{title_size}" fill="{ink}">{line}</text>"#,
                    y = display.baseline(block_top + title_line * i as f32, title_line, title_size),
                    family = escape_xml(&display.family),
                )
            })
            .collect::<Vec<_>>()
            .join("\n  ");
        let subtitle = sub_lines
            .iter()
            .enumerate()
            .map(|(i, line)| {
                let top = block_top + title_line * lines.len() as f32 + sub_gap + sub_line * i as f32;
                format!(
                    r#"<text x="{PADDING}" y="{y}" font-family="{family}" font-size="{sub_size}" fill="{muted}">{line}</text>"#,
                    y = self.fonts.ui.baseline(top, sub_line, sub_size),
                    family = escape_xml(&self.fonts.ui.family),
                    line = escape_xml(line),
                )
            })
            .collect::<Vec<_>>()
            .join("\n  ");

        // Text sits on a full-width background bar that hides the field behind it.
        let bar = format!(
            r#"<rect x="0" y="{y}" width="{IMAGE_WIDTH}" height="{height}" fill="{canvas}"/>"#,
            y = block_top - BAR_MARGIN,
            height = block_height + BAR_MARGIN * 2.0,
            canvas = hex(self.palette.canvas),
        );
        format!(
            r#"<svg width="{IMAGE_WIDTH}" height="{IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  {bar}
  {brand}
  {section_box}
  {title}
  {subtitle}
</svg>"#
        )
    }
}

/// Wordmark height when alone.
const WORDMARK_ALONE_HEIGHT: f32 = 176.0;

/// Bar extent above and below the text.
const BAR_MARGIN: f32 = 28.0;

/// Title sizes, largest first; the first that fits is used.
const TITLE_SIZES: &[f32] = &[84.0, 72.0, 60.0];
const MAX_TITLE_LINES: usize = 3;
const MAX_SUBTITLE_LINES: usize = 2;

/// `text` wrapped at spaces to lines no wider than `max_width` at `size`.
fn wrap(font: &Font, text: &str, size: f32, max_width: f32) -> Vec<String> {
    let mut lines: Vec<String> = Vec::new();
    for word in text.split_whitespace() {
        match lines.last_mut() {
            Some(line) if font.measure(&format!("{line} {word}"), size, 0.0) <= max_width => {
                line.push(' ');
                line.push_str(word);
            }
            _ => lines.push(word.to_string()),
        }
    }
    lines
}

/// The first `max_lines` of `lines`, ending in an ellipsis if any were dropped.
fn truncate(
    font: &Font,
    mut lines: Vec<String>,
    size: f32,
    max_width: f32,
    max_lines: usize,
) -> Vec<String> {
    if lines.len() <= max_lines {
        return lines;
    }
    lines.truncate(max_lines);
    if let Some(last) = lines.last_mut() {
        while !last.is_empty() && font.measure(&format!("{last}…"), size, 0.0) > max_width {
            last.pop();
        }
        *last = format!("{}…", last.trim_end());
    }
    lines
}

/// FNV-1a: stable, so a document gets the same field every build.
fn fnv1a(s: &str) -> u64 {
    s.bytes().fold(0xcbf2_9ce4_8422_2325, |hash, byte| {
        (hash ^ byte as u64).wrapping_mul(0x0000_0100_0000_01b3)
    })
}

fn escape_xml(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}

fn collect_notes<'a>(docs: &mut Vec<&'a Document>, folder: &'a DocumentFolderNode) {
    if let Some(DocumentLeafNode::Document(doc)) = &folder.index {
        docs.push(doc.as_ref());
    }
    for child in folder.children.values() {
        match child {
            DocumentNode::Folder(folder) => {
                collect_notes(docs, folder);
            }
            DocumentNode::Leaf(DocumentLeafNode::Document(document)) => {
                docs.push(document.as_ref());
            }
            DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => {}
        }
    }
}
