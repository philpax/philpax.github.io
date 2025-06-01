pub fn link(
    underline: bool,
    title: impl Into<Option<String>>,
    target: impl Into<String>,
    children: paxhtml::Element,
) -> paxhtml::Element {
    let underline_classes = if underline {
        "\
        underline
        decoration-[var(--color-secondary)] \
        decoration-solid \
        decoration-[3px] \
        decoration-skip-ink-none \
        underline-offset-[4px] \
        hover:decoration-[color-mix(in_srgb,var(--color-secondary)_80%,transparent)] \
        hover:decoration-[7px] \
        hover:underline-offset-[0px] \
        "
    } else {
        "no-underline"
    };

    let title = title.into().unwrap_or_else(|| children.inner_text());

    paxhtml::html! {
        <a
            href={target.into()}
            title={title}
            class={format!("\
            text-[var(--color)] \
            transition-all duration-200 \
            hover:text-[var(--color-secondary)] \
            visited:text-[var(--color)] \
            visited:hover:text-[var(--color-secondary)] \
            {underline_classes}\
            ")}
        >
            {children}
        </a>
    }
}
