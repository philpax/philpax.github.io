use paxhtml::{DefaultIn, bumpalo::Bump};

pub struct FootnoteProps<'bump> {
    pub identifier: String,
    pub children: Option<paxhtml::Element<'bump>>,
    /// When true, footnotes display as sidenotes on wide screens (2xl+).
    /// When false, footnotes are always inline.
    pub sidenotes_enabled: bool,
}
impl DefaultIn<'_> for FootnoteProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            identifier: String::new(),
            children: None,
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
#[allow(non_snake_case)]
pub fn Footnote<'bump>(bump: &'bump Bump, props: FootnoteProps<'bump>) -> paxhtml::Element<'bump> {
    let id = format!("footnote-{}", props.identifier);
    let sidenote_id = format!("sidenote-{}", props.identifier);
    let ref_id = format!("fnref-{}", props.identifier);
    let children = props.children.unwrap_or(paxhtml::Element::Empty);

    // Styling for the inline footnote reference (sup)
    let sup_class = "\
        footnote-number px-2 ml-1 bg-phosphor text-canvas text-xs \
        hover:bg-hot relative \
        before:content-['fn'] before:italic before:text-[0.6em] before:mr-[0.3em] before:text-canvas\
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
                <span class="footnote-inline hidden peer-checked:block bg-fg text-canvas text-sm p-2 my-1 [&_a]:text-canvas [&_a]:decoration-panel [&_a:hover]:text-panel">
                    {children}
                </span>
            </span>
        };
    }

    // Styling for the sidenote's number (span, not sup - full height, no vertical
    // offset). No "fn" prefix here (unlike the inline popup) — the marginal
    // placement already reads as a note, so just the number.
    let sidenote_number_class = "\
        footnote-number px-2 bg-phosphor text-canvas text-sm\
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
            <span class="footnote-inline hidden max-2xl:peer-checked:block bg-fg text-canvas text-sm p-2 my-1 [&_a]:text-canvas [&_a]:decoration-panel [&_a:hover]:text-panel">
                {children_clone}
            </span>

            // Sidenote content (wide screens) - floats into the right margin as a
            // flex row sharing one top border, so the divider spans both the marker
            // and the body. The marker is a fixed-width slot with the fn-N chip
            // right-aligned to the gutter edge, so the body starts at a fixed x.
            <small id={sidenote_id} class="sidenote">
                <a href={format!("#{ref_id}")} class="sidenote-marker">
                    <span class={sidenote_number_class}>
                        <span class="inline-block min-w-[2ch] text-center tabular-nums">
                            {&props.identifier}
                        </span>
                    </span>
                </a>
                <span class="flex-1 min-w-0">{children}</span>
            </small>
        </span>
    }
}
