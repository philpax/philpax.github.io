use paxhtml::{DefaultIn, bumpalo::Bump};

pub struct SegmentLabelProps {
    /// The lowercase segment name, e.g. "posts" → rendered as `┌─ posts ─────`.
    pub label: String,
}
impl DefaultIn<'_> for SegmentLabelProps {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            label: String::new(),
        }
    }
}

/// A mono "segment" label in the disassembler style: `┌─ <label> ─────`.
/// The decorative box-drawing characters are supplied by CSS `::before`/`::after`,
/// so the visible text content is just the label (screen-reader friendly).
#[allow(non_snake_case)]
pub fn SegmentLabel<'bump>(bump: &'bump Bump, props: SegmentLabelProps) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <span class="segment-label">{props.label}</span>
    }
}
