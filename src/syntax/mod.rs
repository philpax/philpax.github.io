use paxhtml::html;
use syntect::{
    highlighting::ThemeSet,
    html::{css_for_theme_with_class_style, ClassStyle, ClassedHTMLGenerator},
    parsing::SyntaxSet,
    util::LinesWithEndings,
};

use crate::ViewContext;

pub struct SyntaxHighlighter {
    pub syntax_set: SyntaxSet,
    pub theme_set: ThemeSet,
}
impl Default for SyntaxHighlighter {
    fn default() -> Self {
        Self {
            syntax_set: syntect::dumps::from_binary(include_bytes!("syntax_set.packdump")),
            theme_set: syntect::dumps::from_binary(include_bytes!("theme_set.packdump")),
        }
    }
}
impl SyntaxHighlighter {
    pub fn theme(&self) -> &str {
        "ayu-dark"
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
        language: Option<&str>,
        code: &str,
    ) -> Result<paxhtml::Element, syntect::Error> {
        let syntax = language
            .and_then(|l| self.syntax_set.find_syntax_by_token(l))
            .unwrap_or_else(|| self.syntax_set.find_syntax_by_name("plaintext").unwrap());
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

pub fn style_link(context: ViewContext) -> paxhtml::Element {
    html! {
        <link rel="stylesheet" href={format!("/syntax/{}.css", context.syntax.theme())} id="syntax-theme" />
    }
}
