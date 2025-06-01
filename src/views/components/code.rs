use crate::{syntax::SyntaxHighlighter, views::FONT_STYLE};

pub fn code(syntax: &SyntaxHighlighter, lang: Option<&str>, code: &str) -> paxhtml::Element {
    paxhtml::html! {
        <pre class="code text-sm p-2 overflow-x-auto max-w-full">
            <code>
                <pre class={format!("\
                    bg-[hsl(220,27%,20%)] text-white -mt-2 mb-1 -ml-2 py-0.5 px-1 \
                    w-fit lowercase text-xs sticky -left-2 \
                    {FONT_STYLE} italic \
                ")}>
                    {syntax.lookup_language(lang).name.as_str()}
                </pre>
                {syntax.highlight_code(lang, code).unwrap()}
            </code>
        </pre>
    }
}
