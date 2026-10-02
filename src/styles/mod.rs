use crate::views::ViewContextBase;

pub struct GenerateOutput {
    pub css: String,
}

/// Bundles the document styles, `site/` (with `@import`s inlined) and the
/// highlighter's token colours into one sheet. The `@font-face` rules come
/// from `crate::fonts` and are prepended by the caller.
pub fn generate(context: ViewContextBase<'_>) -> anyhow::Result<GenerateOutput> {
    let site = inline_imports(SITE_ENTRY, SITE_FILES)?;
    let syntax = syntax_css(context);
    let css = [DOCUMENT, &site, &syntax].join("\n");
    Ok(GenerateOutput { css })
}

/// The sheet's design tokens, for the preview images.
pub fn tokens_css() -> &'static str {
    SITE_FILES
        .iter()
        .find(|(name, _)| *name == "tokens.css")
        .map(|(_, css)| *css)
        .expect("tokens.css is bundled")
}

// --- Private implementation details ---

const DOCUMENT: &str = include_str!("document.css");
const SITE_ENTRY: &str = include_str!("site/site.css");

/// Files `site/site.css` may import, by import name.
const SITE_FILES: &[(&str, &str)] = &[
    ("tokens.css", include_str!("site/tokens.css")),
    ("sections.css", include_str!("site/sections.css")),
    ("elements.css", include_str!("site/elements.css")),
    ("patterns.css", include_str!("site/patterns.css")),
    ("layout.css", include_str!("site/layout.css")),
    ("listings.css", include_str!("site/listings.css")),
    ("home.css", include_str!("site/home.css")),
    ("documents.css", include_str!("site/documents.css")),
    ("notes.css", include_str!("site/notes.css")),
    ("prose.css", include_str!("site/prose.css")),
    ("code.css", include_str!("site/code.css")),
    ("footnotes.css", include_str!("site/footnotes.css")),
    ("components.css", include_str!("site/components.css")),
    ("music.css", include_str!("site/music.css")),
];

/// Replaces each `@import './name.css';` line with that file's contents.
fn inline_imports(entry: &str, files: &[(&str, &str)]) -> anyhow::Result<String> {
    let mut out =
        String::with_capacity(entry.len() + files.iter().map(|(_, f)| f.len()).sum::<usize>());
    for line in entry.lines() {
        let Some(name) = import_name(line) else {
            out.push_str(line);
            out.push('\n');
            continue;
        };
        let (_, contents) = files
            .iter()
            .find(|(file, _)| *file == name)
            .ok_or_else(|| anyhow::anyhow!("site.css imports {name}, which is not bundled"))?;
        out.push_str(contents);
        out.push('\n');
    }
    Ok(out)
}

fn import_name(line: &str) -> Option<&str> {
    let rest = line.trim().strip_prefix("@import")?.trim();
    let rest = rest.strip_suffix(';')?.trim();
    let quoted = rest
        .strip_prefix('\'')
        .and_then(|r| r.strip_suffix('\''))
        .or_else(|| rest.strip_prefix('"').and_then(|r| r.strip_suffix('"')))?;
    Some(quoted.strip_prefix("./").unwrap_or(quoted))
}

/// The highlighter's colours. Light is the default; dark follows the system
/// preference unless `<html>` pins `light`, or a `dark` class pins dark.
///
/// The theme's background and foreground become `--code-background` and
/// `--code-color`. Its other custom properties (e.g. `--accent`) would repaint
/// the site, so they are dropped.
fn syntax_css(context: ViewContextBase<'_>) -> String {
    const SCOPE: &str = ".site";
    let light = theme_rules(&context.syntax.light_theme_css(SCOPE));
    let dark_system = theme_rules(
        &context
            .syntax
            .dark_theme_css(&format!(":root:not(.light) {SCOPE}")),
    );
    let dark_pinned = theme_rules(
        &context
            .syntax
            .dark_theme_css(&format!(":root.dark {SCOPE}")),
    );
    // Light rules apply in both themes, so tokens only the light theme colours
    // need resetting in dark.
    let dark_system = reset_missing_tokens(&dark_system, &light);
    let dark_pinned = reset_missing_tokens(&dark_pinned, &light);
    format!(
        "/* Syntax highlighting. */\n{light}\n@media (prefers-color-scheme: dark) {{\n{dark_system}}}\n{dark_pinned}"
    )
}

/// Appends rules for `tokens` to `theme`'s block.
fn add_tokens(theme: &str, tokens: &[(&str, &str)]) -> String {
    let rules: String = tokens
        .iter()
        .map(|(name, colour)| format!("  {name} {{ color: {colour}; }}\n"))
        .collect();
    let end = theme.rfind('}').expect("a theme's rules end its block");
    format!("{}{rules}{}", &theme[..end], &theme[end..])
}

/// Token elements a theme colours: `a-k` for `  a-k { color: … }`.
fn token_names(css: &str) -> std::collections::BTreeSet<&str> {
    css.lines()
        .filter_map(|line| line.trim_start().split_once(" {"))
        .map(|(name, _)| name)
        .filter(|name| name.starts_with("a-"))
        .collect()
}

/// Resets each token that `other` colours but `theme` doesn't to the block's
/// text colour.
fn reset_missing_tokens(theme: &str, other: &str) -> String {
    let own = token_names(theme);
    let resets = token_names(other)
        .into_iter()
        .filter(|name| !own.contains(name))
        .map(|name| (name, "inherit"))
        .collect::<Vec<_>>();
    add_tokens(theme, &resets)
}

/// Renames the block's background and foreground to the sheet's custom
/// properties and drops its others.
fn theme_rules(css: &str) -> String {
    css.lines()
        .filter(|line| !line.trim_start().starts_with("--"))
        .map(|line| {
            let indent = &line[..line.len() - line.trim_start().len()];
            let line = line.trim_start();
            if let Some(value) = line.strip_prefix("background:") {
                format!("{indent}--code-background:{value}\n")
            } else if let Some(value) = line.strip_prefix("color:") {
                format!("{indent}--code-color:{value}\n")
            } else {
                format!("{indent}{line}\n")
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_import_is_bundled() {
        let css = inline_imports(SITE_ENTRY, SITE_FILES).unwrap();
        assert!(!css.contains("@import"));
        assert!(css.contains("--canvas-dark"));
    }

    #[test]
    fn import_names() {
        assert_eq!(import_name("@import './tokens.css';"), Some("tokens.css"));
        assert_eq!(import_name("  @import \"a.css\" ;"), Some("a.css"));
        assert_eq!(import_name("@layer site-element;"), None);
    }

    #[test]
    fn tokens_only_one_theme_colours_are_reset_in_the_other() {
        let dark = ".d {\n  a-k { color: #fff; }\n}\n";
        let light = ".l {\n  a-k { color: #000; }\n  a-p { color: #111; }\n}\n";
        assert_eq!(
            reset_missing_tokens(dark, light),
            ".d {\n  a-k { color: #fff; }\n  a-p { color: inherit; }\n}\n"
        );
    }

    #[test]
    fn theme_rules_keep_tokens_and_rename_the_block_colours() {
        let css = ".x {\n  background: #fff;\n  --bg: #fff;\n  color: #000;\n  --accent: #f00;\n  a-k { color: #123; }\n}\n";
        assert_eq!(
            theme_rules(css),
            ".x {\n  --code-background: #fff;\n  --code-color: #000;\n  a-k { color: #123; }\n}\n"
        );
    }
}
