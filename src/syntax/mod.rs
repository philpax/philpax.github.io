use paxhtml::bumpalo::Bump;
use syntect::{
    highlighting::ThemeSet,
    html::{css_for_theme_with_class_style, ClassStyle, ClassedHTMLGenerator},
    parsing::{SyntaxReference, SyntaxSet},
    util::LinesWithEndings,
};

pub struct SyntaxHighlighter {
    pub syntax_set: SyntaxSet,
    pub theme_set: ThemeSet,
}
impl Default for SyntaxHighlighter {
    fn default() -> Self {
        Self::new(&mut |_, _| {})
    }
}
impl SyntaxHighlighter {
    pub fn new(report: &mut impl FnMut(&'static str, std::time::Duration)) -> Self {
        let now = std::time::Instant::now();
        let syntax_set = syntect::dumps::from_binary(include_bytes!(
            "../../assets/baked/syntax/syntax_set.packdump"
        ));
        report("Loaded syntax set", now.elapsed());

        let now = std::time::Instant::now();
        let theme_set = syntect::dumps::from_binary(include_bytes!(
            "../../assets/baked/syntax/theme_set.packdump"
        ));
        report("Loaded theme set", now.elapsed());

        Self {
            syntax_set,
            theme_set,
        }
    }

    pub fn dark_theme(&self) -> &str {
        "ayu-dark"
    }

    pub fn light_theme(&self) -> &str {
        "ayu-light"
    }

    pub fn dark_theme_css(&self) -> String {
        css_for_theme_with_class_style(
            &self.theme_set.themes[self.dark_theme()],
            ClassStyle::Spaced,
        )
        .unwrap()
    }

    pub fn light_theme_css(&self) -> String {
        css_for_theme_with_class_style(
            &self.theme_set.themes[self.light_theme()],
            ClassStyle::Spaced,
        )
        .unwrap()
    }

    pub fn lookup_language(&self, language: Option<&str>) -> &SyntaxReference {
        language
            .and_then(|l| self.syntax_set.find_syntax_by_token(l))
            .unwrap_or_else(|| self.syntax_set.find_syntax_by_name("plaintext").unwrap())
    }

    /// Check if a language token is valid/recognized
    pub fn is_valid_language(&self, language: &str) -> bool {
        self.syntax_set.find_syntax_by_token(language).is_some()
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
    ) -> Result<paxhtml::Element<'bump>, syntect::Error> {
        let syntax = self.lookup_language(language);
        let mut html_generator = ClassedHTMLGenerator::new_with_class_style(
            syntax,
            &self.syntax_set,
            ClassStyle::Spaced,
        );
        for line in LinesWithEndings::from(code) {
            html_generator.parse_html_for_line_which_includes_newline(line)?;
        }
        Ok(paxhtml::Element::raw(bump, &html_generator.finalize()))
    }
}
