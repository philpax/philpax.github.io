use paxhtml::bumpalo::{self, Bump};

use crate::{
    syntax::SyntaxHighlighter,
    views::{CODE_FONT_STYLE, FONT_STYLE},
};

// Note: This component uses references so it's kept as a regular function
// rather than using the custom component syntax
pub fn code<'bump>(
    bump: &'bump Bump,
    syntax: &SyntaxHighlighter,
    lang: Option<&str>,
    code: &str,
) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <pre class="code text-sm p-2 overflow-x-auto max-w-(--centered-content-width) mx-auto">
            <code class={CODE_FONT_STYLE}>
                <pre class={format!("\
                    bg-(--code-label-bg) text-(--code-label-color) -mt-2 mb-1 -ml-2 py-0.5 px-1 \
                    w-fit lowercase text-xs sticky -left-2 \
                    {FONT_STYLE} italic \
                ")}>
                    {syntax.language_name(lang)}
                </pre>
                {syntax.highlight_code(bump, lang, code)}
            </code>
        </pre>
    }
}
