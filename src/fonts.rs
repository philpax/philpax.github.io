use anyhow::Context;
use std::fs;
use std::path::Path;

pub const FONTS: &[&str] = &[
    "Coda",
    "K2D",
    "Noto Sans Display",
    "Saira Semi Condensed",
    "Titillium Web",
    "Alike Angular",
    "Gilda Display",
    "Inria Serif",
    "Mate",
    "Piazzolla",
    "Port Lligat Slab",
    "Sedan",
    "Roboto",
    "Mona Sans",
    "Host Grotesk",
    "Schibsted Grotesk",
    "Hanken Grotesk",
    "Familjen Grotesk",
];

pub fn download_if_required() -> anyhow::Result<()> {
    let output_dir = Path::new("static/fonts");
    fs::create_dir_all(output_dir).context("Failed to create output directory")?;

    for font in FONTS {
        download_font(output_dir, font)
            .with_context(|| format!("Failed to download font {}", font))?;
    }

    Ok(())
}

fn download_font(output_dir: &Path, font_name: &str) -> anyhow::Result<()> {
    let path = output_dir.join(format!("{}.woff2", font_name.replace(" ", "")));
    if path.exists() {
        return Ok(());
    }

    let url = format!(
        "https://fonts.googleapis.com/css2?family={}",
        font_name.replace(" ", "+")
    );
    let css_text = reqwest::blocking::get(&url)
        .context("Failed to fetch CSS")?
        .text()
        .context("Failed to read CSS response")?;

    let font_url = css_text
        .split("src: url(")
        .nth(1)
        .and_then(|s| s.split(')').next())
        .ok_or_else(|| anyhow::anyhow!("No font URL found for {}", font_name))?
        .replace("%2F", "/")
        .replace("%3A", ":")
        .replace("%2C", ",");

    let font_bytes = reqwest::blocking::get(&font_url)
        .context("Failed to fetch font file")?
        .bytes()
        .context("Failed to read font bytes")?;

    fs::write(&path, font_bytes).context("Failed to write font file")?;
    println!("Downloaded: {}", path.display());

    Ok(())
}
