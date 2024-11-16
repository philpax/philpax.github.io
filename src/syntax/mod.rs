use syntect::{
    highlighting::ThemeSet,
    html::{css_for_theme_with_class_style, ClassStyle, ClassedHTMLGenerator},
    parsing::SyntaxSet,
    util::LinesWithEndings,
};

#[derive(Debug)]
pub enum SyntaxError {
    Syntect(syntect::Error),
    SyntaxNotFound(String),
}
impl std::fmt::Display for SyntaxError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Syntect(err) => write!(f, "{}", err),
            Self::SyntaxNotFound(language) => write!(f, "Syntax not found for {}", language),
        }
    }
}
impl std::error::Error for SyntaxError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Self::Syntect(err) => Some(err),
            Self::SyntaxNotFound(_) => None,
        }
    }
}
impl From<syntect::Error> for SyntaxError {
    fn from(err: syntect::Error) -> Self {
        Self::Syntect(err)
    }
}

pub struct SyntaxHighlighter {
    pub syntax_set: SyntaxSet,
    pub theme_set: ThemeSet,
}
impl Default for SyntaxHighlighter {
    fn default() -> Self {
        Self {
            syntax_set: syntect::dumps::from_binary(include_bytes!("syntax_set.packdump")),
            theme_set: ThemeSet::load_defaults(),
        }
    }
}
impl SyntaxHighlighter {
    pub fn themes(&self) -> Vec<String> {
        self.theme_set.themes.keys().cloned().collect()
    }

    pub fn themes_css(&self) -> Vec<(String, String)> {
        self.theme_set
            .themes
            .iter()
            .map(|(name, theme)| {
                (
                    name.to_string(),
                    css_for_theme_with_class_style(theme, ClassStyle::Spaced).unwrap(),
                )
            })
            .collect()
    }

    pub fn highlight_code(
        &self,
        language: &str,
        code: &str,
    ) -> Result<paxhtml::Element, SyntaxError> {
        let syntax = self
            .syntax_set
            .find_syntax_by_token(language)
            .ok_or(SyntaxError::SyntaxNotFound(language.to_string()))?;
        let mut html_generator = ClassedHTMLGenerator::new_with_class_style(
            syntax,
            &self.syntax_set,
            ClassStyle::Spaced,
        );
        for line in LinesWithEndings::from(code) {
            html_generator.parse_html_for_line_which_includes_newline(line)?;
        }
        Ok(paxhtml::Element::Raw {
            html: html_generator.finalize(),
        })
    }
}
