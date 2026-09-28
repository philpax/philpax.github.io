//! Cutting a face down: HarfBuzz subsets and instances it, it's packed as
//! WOFF2, and the result is cached by everything that went into it.

use std::{
    collections::BTreeSet,
    path::{Path, PathBuf},
};

use anyhow::Context as _;
use hb_subset::{Blob, FontFace, SubsetInput, Tag, sys};
use sha2::{Digest as _, Sha256};

use super::{Axis, Face};

/// A face cut down to its characters and axes.
pub struct Subset {
    /// The WOFF2 file.
    pub woff2: Vec<u8>,
    /// A digest of everything that went into it, as hex.
    pub key: String,
    /// The source file's size, for the report.
    pub source_len: usize,
    /// Whether it came from the cache.
    pub cached: bool,
}

/// Subset `face` to `characters`, from the cache in `cache_dir` if the same
/// source, instancing and characters were cut before. A new result replaces
/// the face's previous entry.
pub fn subset(
    face: &Face,
    source_dir: &Path,
    characters: &BTreeSet<char>,
    cache_dir: &Path,
) -> anyhow::Result<Subset> {
    let source_path = source_dir.join(face.source);
    let source =
        std::fs::read(&source_path).with_context(|| format!("failed to read {source_path:?}"))?;
    let key = cache_key(face, &source, characters);
    let entry = cache_dir.join(format!("{}.{key}.woff2", face.name));

    if let Ok(woff2) = std::fs::read(&entry) {
        return Ok(Subset {
            woff2,
            key,
            source_len: source.len(),
            cached: true,
        });
    }

    let ttf = instance_and_subset(face, &source, characters)
        .with_context(|| format!("failed to subset {source_path:?}"))?;
    let woff2 = ttf2woff2::encode(&ttf, ttf2woff2::BrotliQuality::from(WOFF2_QUALITY))
        .with_context(|| format!("failed to encode {source_path:?} as WOFF2"))?;

    std::fs::create_dir_all(cache_dir)?;
    for stale in entries_of(cache_dir, face.name)? {
        std::fs::remove_file(&stale).with_context(|| format!("failed to remove {stale:?}"))?;
    }
    std::fs::write(&entry, &woff2).with_context(|| format!("failed to write {entry:?}"))?;

    Ok(Subset {
        woff2,
        key,
        source_len: source.len(),
        cached: false,
    })
}

/// The face's last cut, whatever it was cut to, if the cache has one.
pub fn last(face: &Face, source_dir: &Path, cache_dir: &Path) -> Option<Subset> {
    let entry = entries_of(cache_dir, face.name).ok()?.into_iter().next()?;
    let key = entry.file_stem()?.to_str()?.rsplit_once('.')?.1.to_string();
    let source_len = std::fs::metadata(source_dir.join(face.source)).ok()?.len() as usize;
    Some(Subset {
        woff2: std::fs::read(&entry).ok()?,
        key,
        source_len,
        cached: true,
    })
}

// --- Private implementation details ---

/// Bump to invalidate every cached face when the pipeline itself changes.
const PIPELINE_VERSION: &str = "1";

/// Brotli's best: the cache makes the time a one-off.
const WOFF2_QUALITY: u8 = 11;

/// Layout features kept beyond HarfBuzz's defaults (kerning, ligatures,
/// marks, contextual alternates and the like): the sheet's `tabular-nums`.
const EXTRA_FEATURES: &[&[u8; 4]] = &[b"tnum"];

fn cache_key(face: &Face, source: &[u8], characters: &BTreeSet<char>) -> String {
    let mut hasher = Sha256::new();
    hasher.update(PIPELINE_VERSION);
    hasher.update(Sha256::digest(source));
    hasher.update(format!("{:?}|{EXTRA_FEATURES:?}|", face.axes));
    hasher.update(characters.iter().collect::<String>());
    let digest = hasher.finalize();
    digest[..8].iter().map(|b| format!("{b:02x}")).collect()
}

fn instance_and_subset(
    face: &Face,
    source: &[u8],
    characters: &BTreeSet<char>,
) -> anyhow::Result<Vec<u8>> {
    let font = FontFace::new(Blob::from_bytes(source)?)?;
    let mut input = SubsetInput::new()?;
    {
        let mut unicodes = input.unicode_set();
        for &c in characters {
            unicodes.insert(c);
        }
    }
    {
        let mut features = input.layout_feature_tag_set();
        for tag in EXTRA_FEATURES {
            features.insert(Tag::new(*tag));
        }
    }

    for axis in face.axes {
        // SAFETY: both pointers are live for the call; HarfBuzz copies what
        // it needs into the input.
        let ok = unsafe {
            match *axis {
                Axis::Pin(tag, value) => sys::hb_subset_input_pin_axis_location(
                    input.as_raw(),
                    font.as_raw(),
                    Tag::new(tag).into(),
                    value,
                ),
                Axis::Default(tag) => sys::hb_subset_input_pin_axis_to_default(
                    input.as_raw(),
                    font.as_raw(),
                    Tag::new(tag).into(),
                ),
                Axis::Range(tag, min, max) => sys::hb_subset_input_set_axis_range(
                    input.as_raw(),
                    font.as_raw(),
                    Tag::new(tag).into(),
                    min,
                    max,
                    f32::NAN,
                ),
            }
        };
        anyhow::ensure!(ok != 0, "the font has no axis to set as {axis:?}");
    }

    let subset = input.subset_font(&font)?;
    Ok(subset.underlying_blob().to_vec())
}

/// The cache entries for the face called `name`.
fn entries_of(cache_dir: &Path, name: &str) -> anyhow::Result<Vec<PathBuf>> {
    let mut entries = Vec::new();
    for entry in std::fs::read_dir(cache_dir)? {
        let path = entry?.path();
        let is_face = path
            .file_name()
            .and_then(|n| n.to_str())
            .and_then(|n| n.strip_suffix(".woff2"))
            .and_then(|n| n.rsplit_once('.'))
            .is_some_and(|(stem, _)| stem == name);
        if is_face {
            entries.push(path);
        }
    }
    Ok(entries)
}
