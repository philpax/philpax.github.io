pub fn link(
    underline: bool,
    title: impl Into<Option<String>>,
    target: impl Into<String>,
    additional_classes: impl Into<String>,
    children: paxhtml::Element,
) -> paxhtml::Element {
    let additional_classes = additional_classes.into();
    let title = title.into().unwrap_or_else(|| children.inner_text());

    paxhtml::html! {
        <a
            href={target.into()}
            title={title}
            class={format!("{} {additional_classes}", if underline { "link-underline" } else { "link-no-underline" })}
        >
            {children}
        </a>
    }
}
