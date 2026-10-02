use paxhtml::{DefaultIn, bumpalo::Bump, html};

pub struct InlineCodeProps<'bump> {
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for InlineCodeProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self { children: None }
    }
}

/// Code within a line of prose, already highlighted.
#[allow(non_snake_case)]
pub fn InlineCode<'bump>(
    bump: &'bump Bump,
    props: InlineCodeProps<'bump>,
) -> paxhtml::Element<'bump> {
    html! { in bump; <code>{props.children}</code> }
}
