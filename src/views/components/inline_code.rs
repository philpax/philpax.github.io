use crate::syntax::SyntaxHighlighter;

pub fn inline_code(syntax: &SyntaxHighlighter, code: &str) -> paxhtml::Element {
    paxhtml::html! {
        <code class="code text-sm">
            {syntax.highlight_code(None, code).unwrap()}
        </code>
    }
}
