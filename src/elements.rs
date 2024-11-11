#![allow(unused)]

pub use paxhtml::builder::*;

pub fn date_with_chrono(date: chrono::NaiveDate) -> Element {
    let date = date.to_string();
    time([("datetime", date.as_str()), ("title", date.as_str())])(date.clone())
}

pub fn datetime_with_chrono<TZ: chrono::TimeZone>(date: chrono::DateTime<TZ>) -> Element {
    time([
        ("datetime", date.to_rfc3339()),
        ("title", date.to_rfc2822()),
    ])(date.to_rfc2822())
}

/// Accepts a `with_link` attribute that will wrap the children in a link to the heading.
pub fn h_with_id<E: ToElements>(
    depth: u8,
    attributes: impl ToAttributes,
) -> impl FnOnce(E) -> Element {
    move |children: E| {
        let children = children.to_elements();
        let inner_text = children.iter().map(|c| c.inner_text()).collect::<String>();
        let id = crate::util::slugify(&inner_text);

        let mut attributes = attributes.to_attributes();
        attributes.push(("id", id.clone()).into());

        let with_link = if let Some(index) = attributes.iter().position(|a| a.key == "with_link") {
            attributes.remove(index);
            true
        } else {
            false
        };

        let children = if with_link {
            vec![a(("href", format!("#{id}")))(children)]
        } else {
            children
        };

        tag(format!("h{depth}"), attributes, false)(children)
    }
}
macro_rules! generate_hs_with_id {
    ($(($fn_ident:ident, $depth:literal)),*) => {
        $(
        /// Accepts a `with_link` attribute that will wrap the children in a link to the heading.
        pub fn $fn_ident<E: ToElements>(attributes: impl ToAttributes) -> impl FnOnce(E) -> Element {
            h_with_id($depth, attributes)
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
