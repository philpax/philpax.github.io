#[derive(Default)]
pub struct LinkProps {
    pub underline: bool,
    pub title: String,
    pub target: String,
    pub additional_classes: String,
    pub children: Vec<paxhtml::Element>,
}

#[allow(non_snake_case)]
pub fn Link(props: LinkProps) -> paxhtml::Element {
    let children = paxhtml::Element::from(props.children);
    let title = if props.title.is_empty() {
        children.inner_text()
    } else {
        props.title
    };

    paxhtml::html! {
        <a
            href={props.target}
            title={title}
            class={format!("{} {}", if props.underline { "link-underline" } else { "link-no-underline" }, props.additional_classes)}
        >
            {children}
        </a>
    }
}
