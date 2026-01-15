use paxhtml::DefaultIn;
use paxhtml::bumpalo::Bump;

#[allow(dead_code)]
pub struct LinkProps<'bump> {
    pub underline: bool,
    pub title: Option<String>,
    pub target: String,
    pub additional_classes: Option<String>,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for LinkProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            underline: false,
            title: None,
            target: String::new(),
            additional_classes: None,
            children: None,
        }
    }
}

#[allow(non_snake_case, dead_code)]
pub fn Link<'bump>(bump: &'bump Bump, props: LinkProps<'bump>) -> paxhtml::Element<'bump> {
    let children = props.children.unwrap_or(paxhtml::Element::Empty);
    let title = props
        .title
        .unwrap_or_else(|| children.inner_text(bump).to_string());
    let additional_classes = props.additional_classes.unwrap_or_default();

    paxhtml::html! { in bump;
        <a
            href={props.target}
            title={title}
            class={format!("{} {}", if props.underline { "link-underline" } else { "link-no-underline" }, additional_classes)}
        >
            {children}
        </a>
    }
}
