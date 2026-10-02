use paxhtml::{DefaultIn, bumpalo::Bump, html};

pub struct FootnoteProps<'bump> {
    pub identifier: String,
    /// Its place in the order of first reference.
    pub number: usize,
    /// The note's contents.
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for FootnoteProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            identifier: String::new(),
            number: 0,
            children: None,
        }
    }
}

/// A footnote's marker with the note beside it. The note opens via `:target`
/// without script, and floats into the margin where there's room.
#[allow(non_snake_case)]
pub fn Footnote<'bump>(bump: &'bump Bump, props: FootnoteProps<'bump>) -> paxhtml::Element<'bump> {
    let id = format!("fn-{}", props.identifier);
    let number = props.number.to_string();
    html! { in bump;
        <span class="fn">
            <a class="fn-mark" href={format!("#{id}")} role="doc-noteref" ariaLabel={format!("Note {number}")}>
                {&number}
            </a>
            <span class="fn-note" id={id} role="doc-footnote">
                <span class="fn-num" ariaHidden="true">{&number}</span>
                {props.children}
            </span>
        </span>
    }
}
