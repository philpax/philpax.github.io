//! The site's colours, marks and measures, read from the sheet's tokens. The
//! images always use the dark theme (the second `light-dark()` value).

use anyhow::Context as _;

/// A colour as gamma-encoded sRGB channels in 0..=1.
pub type Rgb = [f64; 3];

/// What a preview image draws with.
pub struct Palette {
    pub canvas: Rgb,
    pub ink: Rgb,
    pub ink_muted: Rgb,
}

/// A section's colours and mark.
pub struct Section {
    /// Accent for the field and text.
    pub accent: Rgb,
    /// Solid colour behind the wordmark and section box.
    pub solid: Rgb,
    /// The section's mark, as white SVG, if any.
    pub icon_svg: Option<String>,
}

impl Palette {
    pub fn from_tokens(css: &str) -> anyhow::Result<Self> {
        Ok(Self {
            canvas: colour(css, "--canvas-dark")?,
            ink: colour(css, "--ink")?,
            ink_muted: colour(css, "--ink-muted")?,
        })
    }
}

impl Section {
    /// The section `name`: `post`, `update`, `note`, `tag` or `credits`.
    pub fn from_tokens(css: &str, name: &str) -> anyhow::Result<Self> {
        let icon_name = format!("--icon-{name}");
        Ok(Self {
            accent: colour(css, &format!("--c-{name}"))?,
            solid: colour(css, &format!("--c-{name}-solid"))?,
            icon_svg: value(css, &icon_name)
                .is_ok()
                .then(|| icon(css, &icon_name))
                .transpose()?,
        })
    }
}

/// A length or number token, in the unit it is written in (`1.25rem` is
/// 1.25; `-0.021em` is -0.021).
pub fn measure(css: &str, name: &str) -> anyhow::Result<f64> {
    let value = value(css, name)?;
    let number = value
        .strip_suffix("rem")
        .or_else(|| value.strip_suffix("em"))
        .unwrap_or(value);
    number
        .parse()
        .with_context(|| format!("{name} is not a plain length: {value}"))
}

/// A colour as `#rrggbb`.
pub fn hex(rgb: Rgb) -> String {
    let [r, g, b] = rgb.map(|c| (c.clamp(0.0, 1.0) * 255.0).round() as u8);
    format!("#{r:02x}{g:02x}{b:02x}")
}

// --- Private implementation details ---

/// A token's value: text between `name:` and the terminating `;`.
fn value<'a>(css: &'a str, name: &str) -> anyhow::Result<&'a str> {
    let start = css
        .find(&format!("{name}:"))
        .with_context(|| format!("the tokens have no {name}"))?
        + name.len()
        + 1;
    let end = css[start..]
        .find(';')
        .with_context(|| format!("{name} is not terminated"))?;
    Ok(css[start..start + end].trim())
}

/// A colour token's dark value: its last `oklch()`, with `var()`s resolved.
fn colour(css: &str, name: &str) -> anyhow::Result<Rgb> {
    let value = value(css, name)?;
    let start = value
        .rfind("oklch(")
        .with_context(|| format!("{name} is not in oklch()"))?
        + "oklch(".len();
    let inner = &value[start..];
    // The oklch's closing parenthesis: the first not closing a var().
    let mut depth = 0;
    let end = inner
        .char_indices()
        .find(|&(_, c)| {
            match c {
                '(' => depth += 1,
                ')' if depth == 0 => return true,
                ')' => depth -= 1,
                _ => {}
            }
            false
        })
        .map(|(i, _)| i)
        .with_context(|| format!("{name}'s oklch() is not closed"))?;
    let parts: Vec<f64> = inner[..end]
        .split_whitespace()
        .map(|part| number(css, part))
        .collect::<anyhow::Result<_>>()
        .with_context(|| format!("failed to read {name}"))?;
    let [l, c, h] = parts[..] else {
        anyhow::bail!("{name}'s oklch() does not have three parts");
    };
    Ok(oklch_to_srgb(l, c, h))
}

/// A number, a percentage (as a fraction), or a `var()` naming one.
fn number(css: &str, part: &str) -> anyhow::Result<f64> {
    if let Some(name) = part.strip_prefix("var(").and_then(|p| p.strip_suffix(')')) {
        return number(css, value(css, name)?);
    }
    match part.strip_suffix('%') {
        Some(percent) => Ok(percent.parse::<f64>()? / 100.0),
        None => Ok(part.parse()?),
    }
}

/// An icon token's SVG, recoloured white (masks want black).
fn icon(css: &str, name: &str) -> anyhow::Result<String> {
    let value = value(css, name)?;
    let data = value
        .strip_prefix("url(\"data:image/svg+xml,")
        .and_then(|v| v.strip_suffix("\")"))
        .with_context(|| format!("{name} is not an inline SVG"))?;
    Ok(percent_decode(data).replace("#000", "#fff"))
}

fn percent_decode(s: &str) -> String {
    let bytes = s.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%'
            && let Some(byte) = s
                .get(i + 1..i + 3)
                .and_then(|h| u8::from_str_radix(h, 16).ok())
        {
            out.push(byte);
            i += 3;
        } else {
            out.push(bytes[i]);
            i += 1;
        }
    }
    String::from_utf8_lossy(&out).into_owned()
}

/// OKLCH (lightness 0..=1, chroma, hue in degrees) to gamma-encoded sRGB,
/// clipped to the gamut.
fn oklch_to_srgb(l: f64, c: f64, h: f64) -> Rgb {
    let (a, b) = (c * h.to_radians().cos(), c * h.to_radians().sin());
    let l_ = l + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
    let m_ = l - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
    let s_ = l - 0.089_484_177_5 * a - 1.291_485_548_0 * b;
    let (l3, m3, s3) = (l_.powi(3), m_.powi(3), s_.powi(3));
    let linear = [
        4.076_741_662_1 * l3 - 3.307_711_591_3 * m3 + 0.230_969_929_2 * s3,
        -1.268_438_004_6 * l3 + 2.609_757_401_1 * m3 - 0.341_319_396_5 * s3,
        -0.004_196_086_3 * l3 - 0.703_418_614_7 * m3 + 1.707_614_701_0 * s3,
    ];
    linear.map(|v| {
        let v = v.clamp(0.0, 1.0);
        if v <= 0.003_130_8 {
            12.92 * v
        } else {
            1.055 * v.powf(1.0 / 2.4) - 0.055
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const CSS: &str = "--hue-post: 297;\n--c-post-solid: oklch(42% 0.185 var(--hue-post));\n--c-post: light-dark(var(--c-post-solid), oklch(74% 0.115 var(--hue-post)));\n--canvas-dark: oklch(17% 0.022 297);\n--icon-post: url(\"data:image/svg+xml,%3Csvg stroke='%23000'/%3E\");";

    #[test]
    fn reads_the_dark_value_and_looks_up_vars() {
        assert_eq!(
            hex(colour(CSS, "--c-post").unwrap()),
            hex(oklch_to_srgb(0.74, 0.115, 297.0))
        );
        assert_eq!(
            hex(colour(CSS, "--c-post-solid").unwrap()),
            hex(oklch_to_srgb(0.42, 0.185, 297.0))
        );
    }

    #[test]
    fn converts_oklch() {
        assert_eq!(hex(oklch_to_srgb(1.0, 0.0, 0.0)), "#ffffff");
        assert_eq!(hex(oklch_to_srgb(0.0, 0.0, 0.0)), "#000000");
        // CSS Color 4's own example: oklch(62.8% 0.2577 29.23) is sRGB red.
        assert_eq!(hex(oklch_to_srgb(0.628, 0.2577, 29.23)), "#ff0000");
    }

    #[test]
    fn reads_measures() {
        let css = "--text-lg: 1.25rem;\n--tracking-display: -0.021em;\n--lead-normal: 1.5;";
        assert_eq!(measure(css, "--text-lg").unwrap(), 1.25);
        assert_eq!(measure(css, "--tracking-display").unwrap(), -0.021);
        assert_eq!(measure(css, "--lead-normal").unwrap(), 1.5);
    }

    #[test]
    fn icons_are_drawn_in_white() {
        assert_eq!(icon(CSS, "--icon-post").unwrap(), "<svg stroke='#fff'/>");
    }
}
