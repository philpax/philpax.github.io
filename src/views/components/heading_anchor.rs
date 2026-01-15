use paxhtml::DefaultIn;
use paxhtml::bumpalo::Bump;

use super::{Link, LinkProps};

pub struct HeadingAnchorProps {
    pub target: String,
}
impl DefaultIn<'_> for HeadingAnchorProps {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            target: String::new(),
        }
    }
}

/// An anchor link used before headings and in TOC entries.
#[allow(non_snake_case)]
pub fn HeadingAnchor<'bump>(
    bump: &'bump Bump,
    props: HeadingAnchorProps,
) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <Link target={props.target} underline additionalClasses={"mr-1".to_string()}>"#"</Link>
    }
}
