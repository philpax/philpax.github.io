use paxhtml::bumpalo::{self, Bump};

use crate::{syntax::SyntaxHighlighter, views::CODE_FONT_STYLE};

// Note: This component uses references so it's kept as a regular function
// rather than using the custom component syntax
pub fn inline_code<'bump>(
    bump: &'bump Bump,
    syntax: &SyntaxHighlighter,
    styled: bool,
    lang: Option<&str>,
    code: &str,
) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <code class={if styled { format!("code text-sm p-1 m-y-0.5 {CODE_FONT_STYLE}") } else { format!("code {CODE_FONT_STYLE}") }}>
            {syntax.highlight_code(bump, lang, code).unwrap()}
        </code>
    }
}
