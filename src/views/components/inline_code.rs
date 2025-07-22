use crate::syntax::SyntaxHighlighter;

pub fn inline_code(syntax: &SyntaxHighlighter, styled: bool, code: &str) -> paxhtml::Element {
    paxhtml::html! {
        <code class={if styled { "code text-sm p-1 m-y-0.5" } else { "code" }}>
            {syntax.highlight_code(None, code).unwrap()}
        </code>
    }
}
