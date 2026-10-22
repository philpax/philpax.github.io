use std::sync::Arc;

use arborium::{Config, GrammarStore, Highlighter, HtmlFormat, theme::builtin};
use paxhtml::bumpalo::Bump;

/// Where a piece of code appears. Only block code reports unknown languages;
/// inline code is usually untagged prose, so a colon in it is not a request.
#[derive(Clone, Copy, PartialEq, Eq)]
pub enum CodeKind {
    Block,
    Inline,
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
        builtin::github_dark().to_css(selector)
    }

    pub fn light_theme_css(&self, selector: &str) -> String {
        builtin::github_light().to_css(selector)
    }

    fn normalize_language(language: Option<&str>) -> &str {
        match language {
            Some(lang) => arborium::detect_language(lang).unwrap_or(lang),
            None => "text",
        }
    }

    fn highlight_language(language: &str) -> &str {
        match language {
            "crystal" => "ruby",
            // Fences are commonly tagged `re`; arborium only knows `regex`.
            "re" => "regex",
            lang => lang,
        }
    }

    /// Display name for a language: canonical name, or `text`.
    pub fn language_name<'a>(&self, language: Option<&'a str>) -> &'a str {
        Self::normalize_language(language)
    }

    /// Check if a language token maps to a grammar we can actually highlight.
    fn is_valid_language(&self, language: &str) -> bool {
        let normalized = Self::highlight_language(Self::normalize_language(Some(language)));
        self.store.get(normalized).is_some()
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
        kind: CodeKind,
    ) -> Result<paxhtml::Element<'bump>, arborium::Error> {
        let language = Self::highlight_language(Self::normalize_language(language));
        let mut highlighter =
            Highlighter::with_store_and_config(self.store.clone(), self.config.clone());
        match highlighter.highlight(language, code) {
            Ok(html) => Ok(paxhtml::Element::raw(bump, &html)),
            Err(arborium::Error::UnsupportedLanguage { language }) => {
                if kind == CodeKind::Block && language != "text" {
                    eprintln!(
                        "warning: unsupported language '{language}', rendering as plain text"
                    );
                }
                Ok(paxhtml::Element::text(bump, code))
            }
            Err(e) => Err(e),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::SyntaxHighlighter;

    /// A colon only introduces a language when a grammar actually exists for it;
    /// otherwise the text is prose that merely contains a colon.
    #[test]
    fn inline_code_language_prefix_requires_a_grammar() {
        let syntax = SyntaxHighlighter::default();

        assert_eq!(syntax.parse_inline_code("c:JOIN"), (Some("c"), "JOIN"));
        assert_eq!(
            syntax.parse_inline_code("py:print(1)"),
            (Some("py"), "print(1)")
        );

        for code in [
            "std::sync::atomic",
            "http://example.com",
            "store: false",
            "Major: Minor",
        ] {
            assert_eq!(syntax.parse_inline_code(code), (None, code));
        }
    }

    /// Fence tags the content uses must resolve to a grammar we have compiled in.
    #[test]
    fn fence_language_aliases_resolve_to_a_grammar() {
        let syntax = SyntaxHighlighter::default();

        assert!(syntax.is_valid_language("re"));
        assert!(syntax.is_valid_language("regex"));
        assert!(syntax.is_valid_language("crystal"));

        // Anything else is prose, not a language: see `CodeKind::Inline`.
        assert!(!syntax.is_valid_language("std"));
    }
}
