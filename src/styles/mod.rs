use std::hash::{Hash, Hasher};
use std::path::Path;

use crate::views::ViewContextBase;

pub struct GenerateOutput {
    pub css: String,
    pub dark_mode_icon: String,
    pub light_mode_icon: String,
}

pub fn generate(
    context: ViewContextBase<'_>,
    tailwind_output: &str,
) -> anyhow::Result<GenerateOutput> {
    let (property_sets, remaining) =
        paxcss::extract_prefixed_property_sets(include_str!("website.css"));
    let dark_mode = property_sets.get(paxcss::DARK_MODE).unwrap();
    let light_mode = property_sets.get(paxcss::LIGHT_MODE).unwrap();
    let syntax_dark_root = context.syntax.dark_theme_css("pre.code");
    let syntax_dark_explicit = context.syntax.dark_theme_css(":root.dark-theme pre.code");
    let syntax_light_root = context.syntax.light_theme_css("pre.code");
    let syntax_light_explicit = context.syntax.light_theme_css(":root.light-theme pre.code");
    let css = format!(
        r#"
/* --- THEMES --- */
:root {{
{dark_mode}
}}
:root.dark-theme {{
{dark_mode}
}}

@media (prefers-color-scheme: light) {{
:root {{
{light_mode}
}}
}}
:root.light-theme {{
{light_mode}
}}

/* --- WEBSITE --- */
{remaining}

/* --- TAILWIND --- */
{tailwind_output}

/* --- SYNTAX HIGHLIGHTING (DARK) --- */
{syntax_dark_root}
{syntax_dark_explicit}

/* --- SYNTAX HIGHLIGHTING (LIGHT) --- */
@media (prefers-color-scheme: light) {{
{syntax_light_root}
}}
{syntax_light_explicit}
"#,
    )
    .trim()
    .to_string();

    let dark_mode_icon = std::fs::read_to_string("assets/source/phosphor/moon.svg")?.replace(
        r##"fill="#000000""##,
        &format!(
            r##"fill="{}""##,
            paxcss::parse_rules(dark_mode)
                .get("--background-color")
                .unwrap()
        ),
    );
    let light_mode_icon = std::fs::read_to_string("assets/source/phosphor/sun.svg")?.replace(
        r##"fill="#000000""##,
        &format!(
            r##"fill="{}""##,
            paxcss::parse_rules(light_mode)
                .get("--background-color")
                .unwrap()
        ),
    );

    Ok(GenerateOutput {
        css,
        dark_mode_icon,
        light_mode_icon,
    })
}

pub fn generate_tailwind(
    fast: bool,
    use_global_tailwind: bool,
    report: &mut impl FnMut(&'static str, std::time::Duration),
) -> anyhow::Result<String> {
    let now = std::time::Instant::now();
    let hash = compute_tailwind_input_hash()?;
    report("Computed input hash", now.elapsed());

    // Check cache first
    let now = std::time::Instant::now();
    if let Some(cached) = get_cached_tailwind(hash) {
        report("Loaded from cache", now.elapsed());
        return Ok(cached);
    }
    report("Cache miss", now.elapsed());

    // Generate fresh
    let now = std::time::Instant::now();
    let tailwind = if use_global_tailwind {
        paxhtml_tailwind::Tailwind::global()
    } else {
        paxhtml_tailwind::Tailwind::download(paxhtml_tailwind::RECOMMENDED_VERSION, fast)?
    };
    report(
        if use_global_tailwind {
            "Used global tailwind"
        } else {
            "Downloaded tailwind"
        },
        now.elapsed(),
    );

    let now = std::time::Instant::now();
    let tailwind_output = tailwind.generate_from_file(Path::new(TAILWIND_INPUT))?;
    report("Generated CSS", now.elapsed());

    // Cache the result
    let now = std::time::Instant::now();
    save_tailwind_cache(hash, &tailwind_output)?;
    report("Saved to cache", now.elapsed());

    Ok(tailwind_output)
}

// --- Private implementation details ---

const TAILWIND_CACHE_HASH: &str = "target/tailwind-cache.hash";
const TAILWIND_CACHE_CSS: &str = "target/tailwind-cache.css";
const TAILWIND_INPUT: &str = "src/styles/tailwind.css";

fn compute_tailwind_input_hash() -> anyhow::Result<u64> {
    let mut hasher = std::collections::hash_map::DefaultHasher::new();

    // Hash the tailwind input CSS
    std::fs::read(TAILWIND_INPUT)?.hash(&mut hasher);

    // Hash all .rs files in src/ (they may contain Tailwind classes)
    fn collect_rs_files(dir: &std::path::Path, files: &mut Vec<std::path::PathBuf>) {
        if let Ok(entries) = std::fs::read_dir(dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.is_dir() {
                    collect_rs_files(&path, files);
                } else if path.extension().is_some_and(|e| e == "rs") {
                    files.push(path);
                }
            }
        }
    }

    let mut paths = Vec::new();
    collect_rs_files(Path::new("src"), &mut paths);
    paths.sort(); // Ensure consistent ordering

    for path in paths {
        path.to_string_lossy().hash(&mut hasher);
        std::fs::read(&path)?.hash(&mut hasher);
    }

    Ok(hasher.finish())
}

fn get_cached_tailwind(hash: u64) -> Option<String> {
    let cached_hash: u64 = std::fs::read_to_string(TAILWIND_CACHE_HASH)
        .ok()?
        .parse()
        .ok()?;
    if cached_hash != hash {
        return None;
    }
    std::fs::read_to_string(TAILWIND_CACHE_CSS).ok()
}

fn save_tailwind_cache(hash: u64, css: &str) -> anyhow::Result<()> {
    std::fs::write(TAILWIND_CACHE_HASH, hash.to_string())?;
    std::fs::write(TAILWIND_CACHE_CSS, css)?;
    Ok(())
}
