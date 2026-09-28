use crate::views::ViewContextBase;

pub struct GenerateOutput {
    pub css: String,
}

/// Bundle the site's stylesheet into one file: the document around the site,
/// the sheet in `site/` with its `@import`s inlined in order, and the
/// highlighter's token colours for both themes. The faces' rules are generated
/// with the fonts (see `crate::fonts`) and go in front.
pub fn generate(context: ViewContextBase<'_>) -> anyhow::Result<GenerateOutput> {
    let site = inline_imports(SITE_ENTRY, SITE_FILES)?;
    let syntax = syntax_css(context);
    let css = [DOCUMENT, &site, &syntax].join("\n");
    Ok(GenerateOutput { css })
}

// --- Private implementation details ---

const DOCUMENT: &str = include_str!("document.css");
const SITE_ENTRY: &str = include_str!("site/site.css");

/// Every file `site/site.css` may import, by the name it imports it by.
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

/// Replace each `@import './name.css';` line with that file's contents, so the
/// entry's order is the bundle's order.
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

/// The highlighter's token colours, scoped to code in the site. The light theme is
/// the default and the dark one follows the site's theme mechanism: the system
/// preference unless `<html>` pins `light`, or a `dark` class pins it.
///
/// Only the token rules are kept: the generated block also sets a background,
/// a foreground and an `--accent` of its own, which would repaint the site's
/// code block and its accent.
fn syntax_css(context: ViewContextBase<'_>) -> String {
    const SCOPE: &str = ".site code";
    let light = tokens_only(&context.syntax.light_theme_css(SCOPE));
    let dark_system = tokens_only(
        &context
            .syntax
            .dark_theme_css(&format!(":root:not(.light) {SCOPE}")),
    );
    let dark_pinned = tokens_only(
        &context
            .syntax
            .dark_theme_css(&format!(":root.dark {SCOPE}")),
    );
    format!(
        "/* Syntax highlighting. */\n{light}\n@media (prefers-color-scheme: dark) {{\n{dark_system}}}\n{dark_pinned}"
    )
}

/// Drop the declarations on the generated block's own selector, keeping the
/// nested `a-*` token rules and the braces around them.
fn tokens_only(css: &str) -> String {
    css.lines()
        .filter(|line| {
            let line = line.trim_start();
            !line.starts_with("--")
                && !line.starts_with("background:")
                && !line.starts_with("color:")
        })
        .map(|line| format!("{line}\n"))
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
    fn tokens_only_keeps_token_rules() {
        let css = ".x {\n  background: #fff;\n  --bg: #fff;\n  color: #000;\n  --accent: #f00;\n  a-k { color: #123; }\n}\n";
        assert_eq!(tokens_only(css), ".x {\n  a-k { color: #123; }\n}\n");
    }
}
