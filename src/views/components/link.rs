#[derive(Default)]
#[allow(dead_code)]
pub struct LinkProps {
    pub underline: bool,
    pub title: Option<String>,
    pub target: String,
    pub additional_classes: Option<String>,
    pub children: Vec<paxhtml::Element>,
}

#[allow(non_snake_case, dead_code)]
pub fn Link(props: LinkProps) -> paxhtml::Element {
    let children = paxhtml::Element::from(props.children);
    let title = props.title.unwrap_or_else(|| children.inner_text());
    let additional_classes = props.additional_classes.unwrap_or_default();

    paxhtml::html! {
        <a
            href={props.target}
            title={title}
            class={format!("{} {}", if props.underline { "link-underline" } else { "link-no-underline" }, additional_classes)}
        >
            {children}
        </a>
    }
}
