#![allow(unused)]

use chrono::Timelike;
use paxhtml::bumpalo::Bump;
use paxhtml::builder::Builder;
pub use paxhtml::{html, Element};

pub fn date_with_chrono<'bump>(bump: &'bump Bump, date: chrono::NaiveDate) -> Element<'bump> {
    let b = Builder::new(bump);
    let date = date.to_string();
    b.time([
        b.attr(("datetime", date.as_str())),
        b.attr(("title", date.as_str())),
    ])(b.text(&date))
}

pub fn datetime_with_chrono<'bump, TZ: chrono::TimeZone>(
    bump: &'bump Bump,
    date: chrono::DateTime<TZ>,
) -> Element<'bump> {
    let b = Builder::new(bump);
    b.time([
        b.attr(("datetime", date.to_rfc3339())),
        b.attr(("title", date.to_rfc2822())),
    ])(b.text(&date.with_nanosecond(0).unwrap().to_rfc3339()))
}

pub fn break_on_colon<'bump>(bump: &'bump Bump, value: &str) -> Element<'bump> {
    let b = Builder::new(bump);
    b.fragment(value.split(": ").enumerate().map(|(i, s)| {
        let s = s.replace("-", "\u{2011}");
        if i > 0 {
            b.fragment([
                b.text(": "),
                b.span([b.attr(("style", "display: inline-block"))])(b.text(&s)),
            ])
        } else {
            b.span([b.attr(("style", "display: inline-block"))])(b.text(&s))
        }
    }))
}

/// Accepts a `with_link` attribute that will wrap the children in a link to the heading.
pub fn h_with_id<'bump>(
    bump: &'bump Bump,
    depth: u8,
    class: &str,
    with_link: bool,
    children: Element<'bump>,
) -> Element<'bump> {
    let b = Builder::new(bump);
    let id = crate::util::slugify(&children.inner_text(bump));

    let children = if with_link {
        b.a([
            b.attr(("href", format!("#{id}"))),
            b.attr(("class", "no-underline")),
        ])(children)
    } else {
        children
    };

    b.tag(
        &format!("h{depth}"),
        [b.attr(("id", id.as_str())), b.attr(("class", class))],
        false,
    )(children)
}

macro_rules! generate_hs_with_id {
    ($(($fn_ident:ident, $depth:literal)),*) => {
        $(
        /// Accepts a `with_link` attribute that will wrap the children in a link to the heading.
        pub fn $fn_ident<'bump>(bump: &'bump Bump, element: Element<'bump>, class: &str) -> Element<'bump> {
            h_with_id(bump, $depth, class, false, element)
        }
        )*
    };
}
generate_hs_with_id![
    (h1_with_id, 1),
    (h2_with_id, 2),
    (h3_with_id, 3),
    (h4_with_id, 4),
    (h5_with_id, 5),
    (h6_with_id, 6)
];
