use std::{collections::HashMap, sync::OnceLock};

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
    pub fn default_theme(&self) -> &str {
        "ayu-dark"
    }

    pub fn theme_names_and_keys(&self) -> &'static [(String, String)] {
        static THEME_NAMES_AND_KEYS: OnceLock<Vec<(String, String)>> = OnceLock::new();
        THEME_NAMES_AND_KEYS.get_or_init(|| {
            let mapping: HashMap<&str, &str> = HashMap::from_iter([
                ("ayu-dark", "Ayu Dark"),
                ("InspiredGitHub", "Inspired GitHub"),
                ("Solarized (dark)", "Solarized (dark)"),
                ("Solarized (light)", "Solarized (light)"),
                ("base16-eighties.dark", "Base16 Eighties (dark)"),
                ("base16-mocha.dark", "Base16 Mocha (dark)"),
                ("base16-ocean.dark", "Base16 Ocean (dark)"),
                ("base16-ocean.light", "Base16 Ocean (light)"),
            ]);

            self.theme_set
                .themes
                .keys()
                .map(|k| {
                    (
                        mapping.get(k.as_str()).unwrap_or(&k.as_str()).to_string(),
                        k.clone(),
                    )
                })
                .collect()
        })
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

pub fn js() -> String {
    include_str!("syntax.js").to_string()
}

pub fn style_link(context: ViewContext) -> paxhtml::Element {
    html! {
        <link rel="stylesheet" href={format!("/syntax/{}.css", context.syntax.default_theme())} id="syntax-theme" />
    }
}

pub fn selector(context: ViewContext) -> paxhtml::Element {
    html! {
        <select id="syntax-theme-selector" style="visibility: hidden;">
            {
                context.syntax.theme_names_and_keys().iter().map(|(name, key)| html! {
                    <option value={key}>{name}</option>
                }).collect::<Vec<_>>()
            }
        </select>
    }
}
