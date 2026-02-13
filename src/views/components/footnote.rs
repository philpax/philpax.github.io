use paxhtml::DefaultIn;
use paxhtml::bumpalo::Bump;

#[allow(dead_code)]
pub struct FootnoteProps<'bump> {
    pub identifier: String,
    pub children: Option<paxhtml::Element<'bump>>,
    #[allow(dead_code)]
    pub class: Option<String>,
    /// When true, footnotes display as sidenotes on wide screens (2xl+).
    /// When false, footnotes are always inline.
    pub sidenotes_enabled: bool,
}
impl DefaultIn<'_> for FootnoteProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            identifier: String::new(),
            children: None,
            class: None,
            sidenotes_enabled: false,
        }
    }
}

/// Footnote component with dual display:
/// - When sidenotes_enabled=false: inline checkbox toggle on all screens
/// - When sidenotes_enabled=true:
///   - Small screens: inline checkbox toggle
///   - Wide screens (2xl+): sidenote floats into right margin with bidirectional linking
///
/// Uses only inline elements (<span>, <small>) to avoid breaking <p> tags.
/// Based on Tufte CSS sidenote pattern.
#[allow(non_snake_case, dead_code)]
pub fn Footnote<'bump>(bump: &'bump Bump, props: FootnoteProps<'bump>) -> paxhtml::Element<'bump> {
    let id = format!("footnote-{}", props.identifier);
    let sidenote_id = format!("sidenote-{}", props.identifier);
    let ref_id = format!("fnref-{}", props.identifier);
    let children = props.children.unwrap_or(paxhtml::Element::Empty);

    // Styling for the inline footnote reference (sup)
    let sup_class = "\
        footnote-number px-2 ml-1 bg-[var(--color)] text-[var(--background-color)] text-xs \
        hover:bg-[var(--color-secondary)] relative \
        before:content-['fn'] before:italic before:text-[0.6em] before:mr-[0.3em] before:text-[var(--background-color-secondary)]\
    ";

    // When sidenotes are disabled, render inline-only footnote
    if !props.sidenotes_enabled {
        return paxhtml::html! { in bump;
            <span class="footnote m-0" id={ref_id}>
                <input r#type="checkbox" id={id.clone()} class="peer hidden" autocomplete="off" />
                <label r#for={id} class="inline-block cursor-pointer select-none">
                    <sup class={sup_class}>
                        {&props.identifier}
                    </sup>
                </label>
                <span class="footnote-inline hidden peer-checked:block bg-[var(--color)] text-[var(--background-color)] p-2 my-1 [&_a]:text-[var(--background-color)] [&_a]:decoration-[var(--background-color-secondary)] [&_a:hover]:text-[var(--background-color-secondary)]">
                    {children}
                </span>
            </span>
        };
    }

    // Styling for the sidenote's number (span, not sup - full height, no vertical offset)
    let sidenote_number_class = "\
        footnote-number px-2 mr-2 bg-[var(--color)] text-[var(--background-color)] text-sm \
        before:content-['fn'] before:italic before:text-[0.8em] before:mr-[0.3em] before:text-[var(--background-color-secondary)]\
    ";

    // Sidenote: hidden on small screens, floats right into right margin on 2xl+
    // Fixed width (w-80 = 20rem) with negative margin calculated to anchor left edge
    // at 1rem past content edge: -mr = -(width + gap) = -(20rem + 1rem) = -21rem
    let sidenote_class = "\
        sidenote hidden \
        2xl:block 2xl:float-right 2xl:clear-right \
        2xl:w-80 2xl:ml-4 2xl:-mr-[21rem] \
        text-sm border-t-2 border-[var(--color-secondary)] pt-0 pb-1 mb-4\
    ";

    // Clone children for use in both inline and sidenote display
    let children_clone = children.clone();

    paxhtml::html! { in bump;
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
                {children_clone}
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
