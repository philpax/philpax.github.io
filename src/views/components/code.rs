use paxhtml::{DefaultIn, bumpalo::Bump, html};

pub struct CodeBlockProps<'bump> {
    /// The language's display name, shown as the block's label.
    pub language: String,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for CodeBlockProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            language: String::new(),
            children: None,
        }
    }
}

/// A block of code, already highlighted, under its language.
#[allow(non_snake_case)]
pub fn CodeBlock<'bump>(
    bump: &'bump Bump,
    props: CodeBlockProps<'bump>,
) -> paxhtml::Element<'bump> {
    html! { in bump;
        <pre>
            <span class="code-language">{props.language}</span>
            <code>{props.children}</code>
        </pre>
    }
}
