//! A document's hero image, softened into the background of its preview.
//!
//! The image is centre-cropped to the preview's shape and blurred, then made
//! partly monochrome and pulled most of the way towards the canvas, so the text
//! drawn over it keeps its contrast. It replaces the contour field rather than
//! sitting under it.

use anyhow::{Context, Result};
use image::imageops::FilterType;
use std::path::Path;

use super::{
    IMAGE_HEIGHT, IMAGE_WIDTH,
    tokens::{Palette, Rgb},
};

/// The area behind a preview, as opaque RGBA covering the whole image.
pub fn background(path: &Path, palette: &Palette) -> Result<Vec<u8>> {
    let image = image::ImageReader::open(path)
        .with_context(|| format!("failed to open the hero image {path:?}"))?
        .decode()
        .with_context(|| format!("failed to decode the hero image {path:?}"))?;

    // Centre crop to the preview's aspect, then scale to exactly its size.
    let (width, height) = (image.width(), image.height());
    let target = IMAGE_WIDTH as f64 / IMAGE_HEIGHT as f64;
    let (crop_width, crop_height) = match width as f64 / height as f64 > target {
        true => ((height as f64 * target) as u32, height),
        false => (width, (width as f64 / target) as u32),
    };
    let image = image
        .crop_imm(
            (width - crop_width) / 2,
            (height - crop_height) / 2,
            crop_width,
            crop_height,
        )
        .resize_exact(IMAGE_WIDTH, IMAGE_HEIGHT, FilterType::Lanczos3)
        .to_rgba8();
    let blurred = image::imageops::blur(&image, BLUR);

    let rgba = blurred
        .pixels()
        .flat_map(|pixel| {
            let alpha = pixel[3] as f64 / 255.0;
            let srgb = [pixel[0], pixel[1], pixel[2]].map(|c| c as f64 / 255.0);
            let luma = LUMA.iter().zip(srgb).map(|(w, c)| w * c).sum::<f64>();
            let [r, g, b] = std::array::from_fn(|i| {
                // Source over the canvas, so any transparency reads as the canvas.
                let canvas = palette.canvas[i];
                let base = canvas * (1.0 - alpha) + srgb[i] * alpha;
                // Towards grey, then dimmed, then pulled towards the canvas.
                let muted = base + (luma - base) * DESATURATION;
                let mixed = muted * DIM * (1.0 - MIX) + canvas * MIX;
                (mixed.clamp(0.0, 1.0) * 255.0).round() as u8
            });
            [r, g, b, 255]
        })
        .collect();
    Ok(rgba)
}

/// Blur radius in pixels, at the preview's own size.
const BLUR: f32 = 14.0;

/// Rec. 709 luminance weights, as the channels are gamma-encoded sRGB.
const LUMA: Rgb = [0.2126, 0.7152, 0.0722];

/// How far towards grey the image is taken, 0 to 1.
const DESATURATION: f64 = 0.18;

/// How much of the image's brightness survives.
const DIM: f64 = 0.9;

/// How much of the canvas is mixed over the image.
const MIX: f64 = 0.24;
