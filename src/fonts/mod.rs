//! The site's faces, cut down at build time to the characters the built pages
//! set in each and instanced to the axes the sheet uses, then served as WOFF2
//! with `@font-face` rules to match.

use std::path::Path;

use anyhow::Context as _;
use rayon::prelude::*;

mod subset;
mod text;

pub struct GenerateOutput {
    /// The `@font-face` rules for every face.
    pub css: String,
    /// What became of each face.
    pub faces: Vec<FaceReport>,
}

pub struct FaceReport {
    pub name: &'static str,
    pub source_len: usize,
    pub woff2_len: usize,
    pub cached: bool,
}
impl std::fmt::Display for FaceReport {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}: {:.1} KiB source, {:.1} KiB served{}",
            self.name,
            self.source_len as f64 / 1024.0,
            self.woff2_len as f64 / 1024.0,
            if self.cached { " (cached)" } else { "" }
        )
    }
}

/// Subset every face to what the pages written under `output_dir` set in it,
/// plus what `sheet` and `script` draw, write the files to `/fonts/`, and
/// return the rules that load them.
///
/// A fast build renders less (the music library, for one), so rather than cut
/// the faces to its pages it reuses each face's last cut, if there is one.
pub fn generate(
    output_dir: &Path,
    sheet: &str,
    script: &str,
    fast: bool,
) -> anyhow::Result<GenerateOutput> {
    let source_dir = Path::new(SOURCE_DIR);
    let cache_dir = Path::new(CACHE_DIR);
    let last_cuts = fast
        .then(|| {
            FACES
                .iter()
                .map(|face| subset::last(face, source_dir, cache_dir))
                .collect::<Option<Vec<_>>>()
        })
        .flatten();
    let subsets = match last_cuts {
        Some(subsets) => subsets,
        None => {
            let characters = text::collect(output_dir, sheet, script)?;
            FACES
                .par_iter()
                .map(|face| subset::subset(face, source_dir, characters.get(face.role), cache_dir))
                .collect::<anyhow::Result<Vec<_>>>()?
        }
    };

    let fonts_dir = output_dir.join("fonts");
    std::fs::create_dir_all(&fonts_dir)?;
    let mut css = Vec::new();
    let mut faces = Vec::new();
    for (face, subset) in FACES.iter().zip(subsets) {
        let file = format!("{}.{}.woff2", face.name, subset.key);
        let path = fonts_dir.join(&file);
        std::fs::write(&path, &subset.woff2)
            .with_context(|| format!("failed to write {path:?}"))?;
        css.push(font_face_rule(face, &file));
        faces.push(FaceReport {
            name: face.name,
            source_len: subset.source_len,
            woff2_len: subset.woff2.len(),
            cached: subset.cached,
        });
    }
    Ok(GenerateOutput {
        css: css.join("\n"),
        faces,
    })
}

/// A face from `SOURCE_DIR` fixed at one point on each of its axes, with every
/// glyph kept, as TTF: for a renderer that cannot vary a font's axes itself,
/// such as the one behind the preview images. `axes` must name every axis the
/// font has, each with a value or `None` for the font's default.
pub fn static_instance(source: &str, axes: &[(&[u8; 4], Option<f32>)]) -> anyhow::Result<Vec<u8>> {
    let path = Path::new(SOURCE_DIR).join(source);
    let bytes = std::fs::read(&path).with_context(|| format!("failed to read {path:?}"))?;
    subset::static_instance(&bytes, axes).with_context(|| format!("failed to instance {path:?}"))
}

// --- Private implementation details ---

/// The variable (and, for Iosevka, static) originals, with their licences.
const SOURCE_DIR: &str = "assets/source/fonts";
/// Cut faces, kept between builds: one entry per face, named by its key.
const CACHE_DIR: &str = ".cache/fonts";

/// A face as the sheet uses it.
struct Face {
    /// The served file's stem.
    name: &'static str,
    /// The family `tokens.css` names.
    family: &'static str,
    italic: bool,
    /// The file under `SOURCE_DIR`.
    source: &'static str,
    /// Which text it sets.
    role: Role,
    /// How each axis is instanced; an axis not listed keeps its full range.
    /// The rule's `font-weight` follows `wght`, or is 400 without it.
    axes: &'static [Axis],
}

/// Which of the sheet's faces a font is, by the text it sets.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Role {
    /// `--f-ui`, the default: everything.
    Ui,
    /// `--f-display`: headings.
    Display,
    /// `--f-body`: prose and the other reading text.
    Body,
    /// `--f-mono`: code.
    Mono,
    /// `--f-wordmark`: the site's name.
    Wordmark,
}

#[derive(Debug, Clone, Copy)]
enum Axis {
    /// Fixed at a value.
    Pin(&'static [u8; 4], f32),
    /// Fixed at the font's default.
    Default(&'static [u8; 4]),
    /// Narrowed to a range.
    Range(&'static [u8; 4], f32, f32),
}

/// The weights the sheet asks of each face (tokens.css: medium 500, semibold
/// 560, bold 600, and 400 unset): the reading and UI faces also meet `bolder`
/// on `b`/`strong` over 400, which is 700. Optical size follows the font size
/// (`font-optical-sizing: auto`), so it's narrowed to the type scale's sizes
/// for each face; outside them the browser clamps to the nearest.
const FACES: &[Face] = &[
    Face {
        name: "source-serif-4",
        family: "Source Serif 4 Variable",
        italic: false,
        source: "sourceserif4/SourceSerif4[opsz,wght].ttf",
        role: Role::Body,
        // Prose at 17px, its notes and small text down to 12px, the
        // standfirst at 20px.
        axes: &[
            Axis::Range(b"wght", 400.0, 700.0),
            Axis::Range(b"opsz", 12.0, 20.0),
        ],
    },
    Face {
        name: "source-serif-4-italic",
        family: "Source Serif 4 Variable",
        italic: true,
        source: "sourceserif4/SourceSerif4-Italic[opsz,wght].ttf",
        role: Role::Body,
        axes: &[
            Axis::Range(b"wght", 400.0, 700.0),
            Axis::Range(b"opsz", 12.0, 20.0),
        ],
    },
    Face {
        name: "fraunces",
        family: "Fraunces Variable",
        italic: false,
        source: "fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf",
        role: Role::Display,
        // Headings from `--text-lg` (20px) to `--text-4xl` (42px); softness
        // and wonkiness are never varied.
        axes: &[
            Axis::Range(b"wght", 400.0, 600.0),
            Axis::Range(b"opsz", 20.0, 42.0),
            Axis::Default(b"SOFT"),
            Axis::Default(b"WONK"),
        ],
    },
    Face {
        name: "figtree",
        family: "Figtree Variable",
        italic: false,
        source: "figtree/Figtree[wght].ttf",
        role: Role::Ui,
        axes: &[Axis::Range(b"wght", 400.0, 700.0)],
    },
    Face {
        name: "alegreya",
        family: "Alegreya Variable",
        italic: false,
        source: "alegreya/Alegreya[wght].ttf",
        role: Role::Wordmark,
        // The wordmark is bold.
        axes: &[Axis::Pin(b"wght", 600.0)],
    },
    Face {
        name: "iosevka",
        family: "Iosevka",
        italic: false,
        source: "iosevka/Iosevka-Regular.ttf",
        role: Role::Mono,
        axes: &[],
    },
];

fn font_face_rule(face: &Face, file: &str) -> String {
    let weight = face
        .axes
        .iter()
        .find_map(|axis| match *axis {
            Axis::Pin(b"wght", w) => Some(format!("{w}")),
            Axis::Range(b"wght", min, max) => Some(format!("{min} {max}")),
            _ => None,
        })
        .unwrap_or_else(|| "400".to_string());
    format!(
        "@font-face {{\n  font-family: '{family}';\n  font-style: {style};\n  font-weight: {weight};\n  font-display: swap;\n  src: url(/fonts/{file}) format('woff2');\n}}\n",
        family = face.family,
        style = if face.italic { "italic" } else { "normal" },
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    const TOKENS: &str = include_str!("../styles/site/tokens.css");

    #[test]
    fn every_family_is_one_the_sheet_names() {
        for face in FACES {
            assert!(
                TOKENS.contains(&format!("'{}'", face.family)),
                "{} is not in tokens.css",
                face.family
            );
        }
    }

    #[test]
    fn every_weight_token_is_covered() {
        let weights: Vec<f32> = TOKENS
            .lines()
            .filter_map(|l| l.trim().strip_prefix("--font-weight-"))
            .filter_map(|l| l.split_once(':'))
            .map(|(_, v)| v.trim().trim_end_matches(';').parse().unwrap())
            .collect();
        assert!(!weights.is_empty());
        for face in FACES.iter().filter(|f| f.role != Role::Wordmark) {
            let Some((min, max)) = face.axes.iter().find_map(|a| match *a {
                Axis::Range(b"wght", min, max) => Some((min, max)),
                _ => None,
            }) else {
                continue;
            };
            for w in &weights {
                assert!((min..=max).contains(w), "{} lacks weight {w}", face.name);
            }
        }
    }

    #[test]
    fn rules_follow_the_weight_axis() {
        let rule = font_face_rule(&FACES[0], "x.woff2");
        assert!(rule.contains("font-weight: 400 700;"));
        assert!(rule.contains("font-display: swap;"));
        let mono = FACES.iter().find(|f| f.role == Role::Mono).unwrap();
        assert!(font_face_rule(mono, "x.woff2").contains("font-weight: 400;"));
    }
}
