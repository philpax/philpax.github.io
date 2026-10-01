use paxhtml::{DefaultIn, bumpalo::Bump, html};

pub struct HeadingAnchorProps<'bump> {
    /// The heading's id.
    pub id: String,
    /// Whether the heading holds a link of its own, which can't sit inside another.
    pub contains_link: bool,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for HeadingAnchorProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            id: String::new(),
            contains_link: false,
            children: None,
        }
    }
}

/// A heading's contents, linking to the heading. One holding a link gets a hanging
/// `#` anchor instead.
#[allow(non_snake_case)]
pub fn HeadingAnchor<'bump>(
    bump: &'bump Bump,
    props: HeadingAnchorProps<'bump>,
) -> paxhtml::Element<'bump> {
    let href = format!("#{}", props.id);
    if props.contains_link {
        html! { in bump;
            <>
                <a class="heading-anchor" href={href}>"# "</a>
                {props.children}
            </>
        }
    } else {
        html! { in bump; <a href={href}>{props.children}</a> }
    }
}
