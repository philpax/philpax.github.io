//! Finds the characters each face must cover: the built pages' text (by the
//! elements the sheet sets in each face) plus what the sheet and script draw.

use std::{collections::BTreeSet, path::Path};

use anyhow::Context as _;
use rayon::prelude::*;
use scraper::{ElementRef, Html, Node, Selector};

use super::Role;

/// Characters each role's face must cover.
#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Characters {
    pub ui: BTreeSet<char>,
    pub display: BTreeSet<char>,
    pub body: BTreeSet<char>,
    pub mono: BTreeSet<char>,
    pub wordmark: BTreeSet<char>,
}
impl Characters {
    pub fn get(&self, role: Role) -> &BTreeSet<char> {
        match role {
            Role::Ui => &self.ui,
            Role::Display => &self.display,
            Role::Body => &self.body,
            Role::Mono => &self.mono,
            Role::Wordmark => &self.wordmark,
        }
    }
}

/// Collects characters from every page under `output_dir` that uses the sheet,
/// plus what `sheet` and `script` generate, printable ASCII, and each
/// character's other case.
pub fn collect(output_dir: &Path, sheet: &str, script: &str) -> anyhow::Result<Characters> {
    let pages = html_files(output_dir)?;
    let selectors = RoleSelectors::new();
    // Own pool: the global one is busy with image work.
    let pool = rayon::ThreadPoolBuilder::new().build()?;
    let mut characters = pool.install(|| {
        pages
            .par_iter()
            .map(|path| {
                let html = std::fs::read_to_string(path)
                    .with_context(|| format!("failed to read {path:?}"))?;
                anyhow::Ok(page_characters(&html, &selectors))
            })
            .try_reduce(Characters::default, |mut a, b| {
                a.merge(b);
                Ok(a)
            })
    })?;
    characters.add_generated(sheet, script);
    characters.close_over_case();
    Ok(characters)
}

// --- Private implementation details ---

/// Every `.html` file under `dir`.
fn html_files(dir: &Path) -> anyhow::Result<Vec<std::path::PathBuf>> {
    let mut files = Vec::new();
    let mut stack = vec![dir.to_path_buf()];
    while let Some(dir) = stack.pop() {
        for entry in std::fs::read_dir(&dir).with_context(|| format!("failed to read {dir:?}"))? {
            let path = entry?.path();
            if path.is_dir() {
                stack.push(path);
            } else if path.extension().is_some_and(|e| e == "html") {
                files.push(path);
            }
        }
    }
    Ok(files)
}

/// The elements each face sets, per the sheet. The UI face is the default and
/// takes everything; the others take everything inside their elements, even if
/// a nested rule switches back.
struct RoleSelectors {
    ui: Selector,
    display: Selector,
    body: Selector,
    mono: Selector,
    wordmark: Selector,
}
impl RoleSelectors {
    fn new() -> Self {
        let parse = |s: &str| Selector::parse(s).expect("role selectors are valid");
        Self {
            ui: parse("body"),
            // elements.css: display-face headings.
            display: parse("h1, h2, h3"),
            // patterns.css's reading face, and documents.css's standfirst.
            body: parse(
                ".prose, .page-head p, .summary > p, .social-card blockquote, \
                 .document-header hgroup p",
            ),
            // elements.css.
            mono: parse("code, kbd, samp, pre"),
            // layout.css: the site name in the brand link.
            wordmark: parse(".site-brand"),
        }
    }
}

/// Characters one page needs per face. Pages that don't load the sheet need none.
fn page_characters(html: &str, selectors: &RoleSelectors) -> Characters {
    if !html.contains("/styles.css") {
        return Characters::default();
    }
    let document = Html::parse_document(html);
    let under = |selector: &Selector, skip_embeds: bool| {
        let mut set = BTreeSet::new();
        for element in document.select(selector) {
            element_characters(element, skip_embeds, &mut set);
        }
        set
    };
    Characters {
        ui: under(&selectors.ui, false),
        display: under(&selectors.display, false),
        // Embeds sit in prose but take the chrome's face; their own reading text
        // (a caption, a quote) is matched by the selector itself.
        body: under(&selectors.body, true),
        mono: under(&selectors.mono, false),
        wordmark: under(&selectors.wordmark, false),
    }
}

/// Attributes rendered as text: `alt`, `placeholder`, `value`, option `label`.
const RENDERED_ATTRIBUTES: &[&str] = &["alt", "placeholder", "value", "label"];

/// Visible text inside `element`, plus its rendered attributes. With
/// `skip_embeds`, leaves out what's inside an `.embed` within it.
fn element_characters(element: ElementRef<'_>, skip_embeds: bool, set: &mut BTreeSet<char>) {
    for node in element.descendants() {
        let in_embed = || {
            std::iter::once(node)
                .chain(node.ancestors())
                .take_while(|ancestor| ancestor.id() != element.id())
                .filter_map(ElementRef::wrap)
                .any(|ancestor| ancestor.value().classes().any(|class| class == "embed"))
        };
        if skip_embeds && in_embed() {
            continue;
        }
        match node.value() {
            Node::Text(text) => {
                let hidden = node
                    .parent()
                    .and_then(|p| p.value().as_element().map(|e| e.name()))
                    .is_some_and(|name| matches!(name, "script" | "style"));
                if !hidden {
                    set.extend(text.chars().filter(|c| !c.is_control()));
                }
            }
            Node::Element(e) => {
                for name in RENDERED_ATTRIBUTES {
                    if let Some(value) = e.attr(name) {
                        set.extend(value.chars().filter(|c| !c.is_control()));
                    }
                }
            }
            _ => {}
        }
    }
}

impl Characters {
    fn merge(&mut self, other: Characters) {
        self.ui.extend(other.ui);
        self.display.extend(other.display);
        self.body.extend(other.body);
        self.mono.extend(other.mono);
        self.wordmark.extend(other.wordmark);
    }

    /// What the sheet and script put on the page, plus printable ASCII. The
    /// wordmark only sets the site's name.
    fn add_generated(&mut self, sheet: &str, script: &str) {
        let generated: BTreeSet<char> = css_content_strings(sheet)
            .chars()
            .chain(script_characters(script))
            .chain(BROWSER_GENERATED.chars())
            .chain(' '..='~')
            .filter(|c| !c.is_control())
            .collect();
        for set in [
            &mut self.ui,
            &mut self.display,
            &mut self.body,
            &mut self.mono,
        ] {
            set.extend(&generated);
        }
    }

    /// The sheet changes case on labels, so add each character's other case.
    fn close_over_case(&mut self) {
        for set in [
            &mut self.ui,
            &mut self.display,
            &mut self.body,
            &mut self.mono,
            &mut self.wordmark,
        ] {
            let cased: Vec<char> = set
                .iter()
                .flat_map(|c| c.to_lowercase().chain(c.to_uppercase()))
                .collect();
            set.extend(cased);
        }
    }
}

/// Characters the browser draws itself: `text-overflow` ellipsis, `<q>` quotes,
/// disclosure markers.
const BROWSER_GENERATED: &str = "…“”‘’▸▾";

/// Every `content:` string in the sheet, escapes decoded.
fn css_content_strings(sheet: &str) -> String {
    let mut out = String::new();
    let mut rest = sheet;
    while let Some(start) = rest.find("content:") {
        rest = &rest[start + "content:".len()..];
        let end = rest.find([';', '}']).unwrap_or(rest.len());
        let value = &rest[..end];
        let mut chars = value.chars();
        while let Some(c) = chars.next() {
            let quote = match c {
                '\'' | '"' => c,
                _ => continue,
            };
            loop {
                match chars.next() {
                    None => break,
                    Some(c) if c == quote => break,
                    Some('\\') => {
                        let hex: String = chars
                            .clone()
                            .take_while(|c| c.is_ascii_hexdigit())
                            .take(6)
                            .collect();
                        if hex.is_empty() {
                            out.extend(chars.next());
                            continue;
                        }
                        for _ in 0..hex.len() {
                            chars.next();
                        }
                        // One whitespace character ends an escape.
                        if chars.clone().next().is_some_and(char::is_whitespace) {
                            chars.next();
                        }
                        out.extend(u32::from_str_radix(&hex, 16).ok().and_then(char::from_u32));
                    }
                    Some(c) => out.push(c),
                }
            }
        }
        rest = &rest[end..];
    }
    out
}

/// The script's characters, with `\uXXXX`, `\u{X}` and `\xXX` escapes decoded.
fn script_characters(script: &str) -> impl Iterator<Item = char> + '_ {
    let escaped = script.match_indices('\\').filter_map(|(i, _)| {
        let rest = &script[i + 1..];
        let hex = if let Some(braced) = rest.strip_prefix("u{") {
            braced.split('}').next()?
        } else if let Some(u) = rest.strip_prefix('u') {
            u.get(..4)?
        } else {
            rest.strip_prefix('x')?.get(..2)?
        };
        u32::from_str_radix(hex, 16).ok().and_then(char::from_u32)
    });
    script.chars().chain(escaped)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn content_strings_are_decoded() {
        let sheet = "a::before { content: '\\2197'; } b::after{content:\" / \"} c { content: ''; }";
        assert_eq!(css_content_strings(sheet), "↗ / ");
        assert_eq!(css_content_strings("x { content: '\\2197 x'; }"), "↗x");
        assert_eq!(css_content_strings("x { content: '\\'a'; }"), "'a");
    }

    #[test]
    fn script_escapes_are_decoded() {
        let chars: String = script_characters(r"'→' + '\u{1F600}' + '\xe9'")
            .filter(|c| !c.is_ascii())
            .collect();
        assert_eq!(chars, "→😀é");
    }

    #[test]
    fn page_text_goes_to_the_faces_that_set_it() {
        let html = r#"<html><head><title>Ⓣ</title><link rel="stylesheet" href="/styles.css">
            <script>var s = "Ⓢ";</script></head><body class="site">
            <a class="site-brand" href="/"><img alt="Ⓐ">Philpax</a>
            <h1>Héading</h1>
            <div class="prose"><p>Prōse <code>cødé</code></p></div>
            <input placeholder="Filtér">
            </body></html>"#;
        let c = page_characters(html, &RoleSelectors::new());
        assert!(c.wordmark.contains(&'P') && c.wordmark.contains(&'Ⓐ'));
        assert!(!c.wordmark.contains(&'H'));
        assert!(c.display.contains(&'é') && !c.display.contains(&'ō'));
        assert!(c.body.contains(&'ō') && c.body.contains(&'ø'));
        assert!(c.mono.contains(&'ø') && !c.mono.contains(&'ō'));
        for ch in ['é', 'ō', 'ø', 'P', 'Ⓐ'] {
            assert!(c.ui.contains(&ch), "{ch}");
        }
        assert!(c.ui.contains(&'é'));
        assert!(!c.ui.contains(&'Ⓣ') && !c.ui.contains(&'Ⓢ'));
    }

    #[test]
    fn embeds_in_prose_keep_to_the_chrome() {
        let html = r#"<html><head><link rel="stylesheet" href="/styles.css"></head>
            <body class="site"><div class="prose"><p>Prōse</p>
            <figure class="city-poster embed"><span>Ëmbed</span>
            <figcaption><div class="prose"><p>Captiøn</p></div></figcaption></figure>
            </div></body></html>"#;
        let c = page_characters(html, &RoleSelectors::new());
        assert!(c.body.contains(&'ō') && c.body.contains(&'ø'));
        assert!(!c.body.contains(&'Ë') && c.ui.contains(&'Ë'));
    }

    #[test]
    fn pages_without_the_sheet_ask_nothing() {
        let html = "<html><body><h1>Redirecting…</h1></body></html>";
        assert_eq!(
            page_characters(html, &RoleSelectors::new()),
            Characters::default()
        );
    }

    #[test]
    fn generated_characters_and_cases() {
        let mut c = Characters::default();
        c.ui.insert('É');
        c.wordmark.insert('p');
        c.add_generated(
            "x::before { content: '\\2197'; }",
            "el.textContent = '\\u2192';",
        );
        c.close_over_case();
        assert!(c.ui.contains(&'é') && c.ui.contains(&'↗') && c.ui.contains(&'→'));
        assert!(c.body.contains(&'~') && c.mono.contains(&'…'));
        assert_eq!(c.wordmark, BTreeSet::from(['p', 'P']));
    }
}
