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

/// Which HTML element a [`Section`] wraps itself in. The styling and inner
/// structure are identical; only the tag (and thus the landmark semantics)
/// differ — e.g. `Footer` for the page colophon, `Article` for prose.
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum SectionTag {
    Section,
    Article,
    Footer,
}

pub struct SectionProps<'bump> {
    /// The lowercase section label, e.g. "posts".
    pub label: String,
    /// The wrapping element. Defaults to `<section>`.
    pub tag: SectionTag,
    /// Extra classes appended to the outer element (alongside `segment`).
    pub class: Option<String>,
    /// Extra classes appended to the padded body (e.g. `flex`, hairline rules).
    pub body_class: Option<String>,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for SectionProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            label: String::new(),
            tag: SectionTag::Section,
            class: None,
            body_class: None,
            children: None,
        }
    }
}

/// A standard content section: a wire-bordered `.segment` with a `SegmentLabel`
/// header and a padded (`p-4`) body. Used for the home-page and index-page
/// sections so they all share one structure. Pass `body_class` for per-section
/// body tweaks (e.g. a flex layout or hairline-separated list), and `tag` to
/// change the wrapping element (e.g. `Footer`).
#[allow(non_snake_case)]
pub fn Section<'bump>(bump: &'bump Bump, props: SectionProps<'bump>) -> paxhtml::Element<'bump> {
    let class = match props.class {
        Some(c) => format!("segment {c}"),
        None => "segment".to_string(),
    };
    let body_class = match props.body_class {
        Some(c) => format!("p-4 {c}"),
        None => "p-4".to_string(),
    };
    let inner = paxhtml::html! { in bump;
        <>
            <SegmentLabel label={props.label} />
            <div class={body_class}>
                {props.children.unwrap_or(paxhtml::Element::Empty)}
            </div>
        </>
    };
    match props.tag {
        SectionTag::Section => paxhtml::html! { in bump; <section class={class}>{inner}</section> },
        SectionTag::Article => paxhtml::html! { in bump; <article class={class}>{inner}</article> },
        SectionTag::Footer => paxhtml::html! { in bump; <footer class={class}>{inner}</footer> },
    }
}
