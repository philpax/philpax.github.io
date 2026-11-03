use paxhtml::{DefaultIn, builder::Builder, bumpalo::Bump, html};

pub struct HeadingProps<'bump> {
    /// The heading's level, 1 through 6.
    pub level: u8,
    /// The heading's id, which its anchor links to.
    pub id: String,
    /// A class for the heading, if it needs one.
    pub class: String,
    /// Whether the heading holds a link of its own, which can't sit inside another.
    pub contains_link: bool,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for HeadingProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            level: 1,
            id: String::new(),
            class: String::new(),
            contains_link: false,
            children: None,
        }
    }
}

/// A heading with an id, its contents linking to it (see [`HeadingAnchor`]).
#[allow(non_snake_case)]
pub fn Heading<'bump>(bump: &'bump Bump, props: HeadingProps<'bump>) -> paxhtml::Element<'bump> {
    let builder = Builder::new(bump);
    let id = props.id;
    let attrs = [
        Some(builder.attr(("id", id.clone()))),
        (!props.class.is_empty()).then(|| builder.attr(("class", props.class))),
    ];
    builder.tag(
        &format!("h{}", props.level.clamp(1, 6)),
        attrs.into_iter().flatten(),
        false,
    )(html! { in bump;
        <HeadingAnchor id={id} contains_link={props.contains_link}>{props.children}</HeadingAnchor>
    })
}

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
        html! { in bump; <a class="heading-link" href={href}>{props.children}</a> }
    }
}
