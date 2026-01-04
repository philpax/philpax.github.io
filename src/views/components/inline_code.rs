use anyhow::Context;
use paxhtml::bumpalo::Bump;

use crate::{syntax::SyntaxHighlighter, views::CODE_FONT_STYLE};

// Note: This component uses references so it's kept as a regular function
// rather than using the custom component syntax
pub fn inline_code<'bump>(
    bump: &'bump Bump,
    syntax: &SyntaxHighlighter,
    styled: bool,
    lang: Option<&str>,
    code: &str,
    error_context: &str,
) -> anyhow::Result<paxhtml::Element<'bump>> {
    let highlighted = syntax
        .highlight_code(bump, lang, code)
        .with_context(|| format!("failed to highlight inline code ({error_context})"))?;

    Ok(paxhtml::html! { in bump;
        <code class={if styled { format!("code text-sm p-1 m-y-0.5 {CODE_FONT_STYLE}") } else { format!("code {CODE_FONT_STYLE}") }}>
            {highlighted}
        </code>
    })
}
