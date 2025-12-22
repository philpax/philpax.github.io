#[derive(Default)]
#[allow(dead_code)]
pub struct FootnoteProps {
    pub identifier: String,
    pub children: Vec<paxhtml::Element>,
    #[allow(dead_code)]
    pub class: Option<String>,
}

/// Footnote component with dual display:
/// - Small screens: inline checkbox toggle (existing behavior)
/// - Wide screens (2xl+): sidenote floats into right margin with bidirectional linking
///
/// Uses only inline elements (<span>, <small>) to avoid breaking <p> tags.
/// Based on Tufte CSS sidenote pattern.
#[allow(non_snake_case, dead_code)]
pub fn Footnote(props: FootnoteProps) -> paxhtml::Element {
    let id = format!("footnote-{}", props.identifier);
    let sidenote_id = format!("sidenote-{}", props.identifier);
    let ref_id = format!("fnref-{}", props.identifier);
    let children = paxhtml::Element::from(props.children);

    // Styling for the inline footnote reference (sup)
    let sup_class = "\
        footnote-number px-2 ml-1 bg-[var(--color)] text-[var(--background-color)] text-xs \
        hover:bg-[var(--color-secondary)] relative \
        before:content-['fn'] before:italic before:text-[0.6em] before:mr-[0.3em] before:text-[var(--background-color-secondary)]\
    ";

    // Styling for the sidenote's number (span, not sup - full height, no vertical offset)
    let sidenote_number_class = "\
        footnote-number px-2 mr-2 bg-[var(--color)] text-[var(--background-color)] text-sm \
        before:content-['fn'] before:italic before:text-[0.8em] before:mr-[0.3em] before:text-[var(--background-color-secondary)]\
    ";

    // Sidenote: hidden on small screens, floats right on 2xl+
    // Has background and z-index to overlay the sticky TOC when scrolling
    let sidenote_class = "\
        sidenote hidden \
        2xl:block 2xl:float-right 2xl:clear-right \
        2xl:w-[calc((100vw-var(--body-content-width))/2-4rem)] \
        2xl:-mr-[calc((100vw-var(--body-content-width))/2-3rem)] \
        text-sm border-t-2 border-[var(--color-secondary)] pt-0 pb-1 mb-4 \
        backdrop-blur-lg z-10 relative\
    ";

    paxhtml::html! {
        <span class="footnote m-0" id={ref_id.clone()}>
            // Checkbox for inline toggle (small screens only)
            <input r#type="checkbox" id={id.clone()} class="peer hidden 2xl:hidden" autocomplete="off" />

            // Small screens: clickable label triggers checkbox
            <label r#for={id.clone()} class="inline-block cursor-pointer select-none 2xl:hidden">
                <sup class={sup_class}>
                    {&props.identifier}
                </sup>
            </label>

            // Wide screens: anchor link to sidenote
            <a href={format!("#{sidenote_id}")} class="hidden 2xl:inline">
                <sup class={sup_class}>
                    {&props.identifier}
                </sup>
            </a>

            // Inline popup content (small screens only) - toggled by checkbox
            <span class="footnote-inline hidden max-2xl:peer-checked:block bg-[var(--color)] text-[var(--background-color)] p-2 my-1 [&_a]:text-[var(--background-color)] [&_a]:decoration-[var(--background-color-secondary)] [&_a:hover]:text-[var(--background-color-secondary)]">
                {children.clone()}
            </span>

            // Sidenote content (wide screens) - floats into right margin
            <small id={sidenote_id} class={sidenote_class}>
                <a href={format!("#{ref_id}")} class="no-underline">
                    <span class={sidenote_number_class}>
                        {&props.identifier}
                    </span>
                </a>
                {children}
            </small>
        </span>
    }
}
