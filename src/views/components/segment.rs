use paxhtml::{DefaultIn, bumpalo::Bump};

pub struct SegmentLabelProps {
    /// The lowercase segment name, e.g. "posts".
    pub label: String,
}
impl DefaultIn<'_> for SegmentLabelProps {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            label: String::new(),
        }
    }
}

/// The mono header label for a `.segment` (e.g. "posts"), rendered as a
/// bottom-bordered band. Styling lives in the `.segment-label` component class.
#[allow(non_snake_case)]
pub fn SegmentLabel<'bump>(bump: &'bump Bump, props: SegmentLabelProps) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <span class="segment-label">{props.label}</span>
    }
}

/// Which HTML element a [`Segment`] wraps itself in. The styling and inner
/// structure are identical; only the tag (and thus the landmark semantics)
/// differ — e.g. `Footer` for the page colophon, `Article` for prose.
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum SegmentTag {
    Section,
    Article,
    Footer,
}

pub struct SegmentProps<'bump> {
    /// The lowercase segment label, e.g. "posts".
    pub label: String,
    /// The wrapping element. Defaults to `<section>`.
    pub tag: SegmentTag,
    /// Extra classes appended to the outer element (alongside `segment`).
    pub class: Option<String>,
    /// Extra classes appended to the padded body (e.g. a `flex` layout).
    pub body_class: Option<String>,
    /// Rich content for the title-bar header band. Overrides `label` when set
    /// (e.g. a post's metadata + title).
    pub header: Option<paxhtml::Element<'bump>>,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for SegmentProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            label: String::new(),
            tag: SegmentTag::Section,
            class: None,
            body_class: None,
            header: None,
            children: None,
        }
    }
}

/// A standard content segment: a wire-bordered `.segment` with a `SegmentLabel`
/// header and a padded (`p-3`) body. Used for the home-page and index-page
/// segments so they all share one structure. Pass `body_class` for per-segment
/// body tweaks (e.g. a flex layout), and `tag` to change the wrapping element
/// (e.g. `Footer`).
#[allow(non_snake_case)]
pub fn Segment<'bump>(bump: &'bump Bump, props: SegmentProps<'bump>) -> paxhtml::Element<'bump> {
    let class = match props.class {
        Some(c) => format!("segment {c}"),
        None => "segment".to_string(),
    };
    let body_class = format!("p-3 {}", props.body_class.as_deref().unwrap_or_default());
    let header = match props.header {
        Some(h) => h,
        None => paxhtml::html! { in bump; <SegmentLabel label={props.label} /> },
    };
    let inner = paxhtml::html! { in bump;
        <>
            <div class="segment-header">{header}</div>
            <div class={body_class}>
                {props.children.unwrap_or(paxhtml::Element::Empty)}
            </div>
        </>
    };
    match props.tag {
        SegmentTag::Section => paxhtml::html! { in bump; <section class={class}>{inner}</section> },
        SegmentTag::Article => paxhtml::html! { in bump; <article class={class}>{inner}</article> },
        SegmentTag::Footer => paxhtml::html! { in bump; <footer class={class}>{inner}</footer> },
    }
}
