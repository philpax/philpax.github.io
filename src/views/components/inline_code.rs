use crate::syntax::SyntaxHighlighter;

// Note: This component uses references so it's kept as a regular function
// rather than using the custom component syntax
pub fn inline_code(syntax: &SyntaxHighlighter, styled: bool, code: &str) -> paxhtml::Element {
    paxhtml::html! {
        <code class={if styled { "code text-sm p-1 m-y-0.5" } else { "code" }}>
            {syntax.highlight_code(None, code).unwrap()}
        </code>
    }
}
