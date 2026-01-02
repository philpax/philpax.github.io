use std::cell::RefCell;
use std::sync::Arc;

use arborium::{theme::builtin, Config, GrammarStore, Highlighter, HtmlFormat};
use paxhtml::bumpalo::Bump;

thread_local! {
    static THREAD_HIGHLIGHTER: RefCell<Option<Highlighter>> = const { RefCell::new(None) };
}

pub struct SyntaxHighlighter {
    store: Arc<GrammarStore>,
    config: Config,
}
impl Default for SyntaxHighlighter {
    fn default() -> Self {
        let config = Config {
            html_format: HtmlFormat::CustomElements,
            ..Default::default()
        };
        let highlighter = Highlighter::with_config(config.clone());
        Self {
            store: highlighter.store().clone(),
            config,
        }
    }
}
impl SyntaxHighlighter {
    pub fn dark_theme_css(&self, selector: &str) -> String {
        builtin::ayu_dark().to_css(selector)
    }

    pub fn light_theme_css(&self, selector: &str) -> String {
        builtin::ayu_light().to_css(selector)
    }

    fn normalize_language(language: Option<&str>) -> &str {
        match language {
            Some("sh") => "bash",
            // Languages not supported by arborium - fallback to plaintext
            Some("re" | "pug") => "text",
            Some(other) => other,
            None => "text",
        }
    }

    /// Get the display name for a language
    pub fn language_name<'a>(&self, language: Option<&'a str>) -> &'a str {
        Self::normalize_language(language)
    }

    /// Check if a language token is valid/recognized
    pub fn is_valid_language(&self, language: &str) -> bool {
        let normalized = Self::normalize_language(Some(language));
        // Check if arborium can detect/use this language
        normalized != "text" || language == "text"
    }

    /// Parse inline code with optional language prefix (e.g., "rs:Option<T>")
    /// Returns (language, code) where language is Some if a valid prefix was found
    pub fn parse_inline_code<'a>(&self, code: &'a str) -> (Option<&'a str>, &'a str) {
        // Look for pattern: alphabetic chars followed by colon
        if let Some(colon_pos) = code.find(':') {
            let potential_lang = &code[..colon_pos];
            // Must be non-empty, alphabetic, and a valid language
            if !potential_lang.is_empty()
                && potential_lang.chars().all(|c| c.is_ascii_alphabetic())
                && self.is_valid_language(potential_lang)
            {
                return (Some(potential_lang), &code[colon_pos + 1..]);
            }
        }
        (None, code)
    }

    pub fn highlight_code<'bump>(
        &self,
        bump: &'bump Bump,
        language: Option<&str>,
        code: &str,
    ) -> paxhtml::Element<'bump> {
        let language = Self::normalize_language(language);
        THREAD_HIGHLIGHTER.with(|cell| {
            let mut hl_ref = cell.borrow_mut();
            let highlighter = hl_ref.get_or_insert_with(|| {
                Highlighter::with_store_and_config(self.store.clone(), self.config.clone())
            });
            match highlighter.highlight(language, code) {
                Ok(html) => paxhtml::Element::raw(bump, &html),
                // For unsupported languages, just return the escaped text
                Err(arborium::Error::UnsupportedLanguage { .. }) => {
                    paxhtml::Element::text(bump, code)
                }
                Err(e) => panic!("Syntax highlighting error: {e}"),
            }
        })
    }
}
