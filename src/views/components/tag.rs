use paxhtml::{DefaultIn, bumpalo::Bump};

use crate::{
    Route,
    views::components::{A, AProps},
};

/// A tag's hue, from its first letter: `a` is 0° and `z` is 360°, so tags
/// spread around the wheel alphabetically. Emitted as `--tag-hue`.
pub fn tag_hue(tag: &str) -> f64 {
    tag.trim()
        .to_lowercase()
        .chars()
        .find(|c| c.is_ascii_lowercase())
        .map(|c| (c as u32 - 'a' as u32) as f64 / 25.0 * 360.0)
        .unwrap_or(0.0)
}

pub struct TagLinkProps {
    pub tag: String,
}
impl DefaultIn<'_> for TagLinkProps {
    fn default_in(_bump: &Bump) -> Self {
        Self { tag: String::new() }
    }
}

/// A tag as a link to its page, in its own hue.
#[allow(non_snake_case)]
pub fn TagLink<'bump>(bump: &'bump Bump, props: TagLinkProps) -> paxhtml::Element<'bump> {
    let href = Route::Tag {
        tag_id: props.tag.clone(),
    }
    .url_path();
    paxhtml::html! { in bump;
        <A href={href} class={"tag-link".to_string()} style={hue_style(&props.tag)}>
            <span class="tag-prefix" ariaHidden="true">"#"</span>
            {props.tag}
        </A>
    }
}

pub struct TagLabelProps {
    pub tag: String,
}
impl DefaultIn<'_> for TagLabelProps {
    fn default_in(_bump: &Bump) -> Self {
        Self { tag: String::new() }
    }
}

/// A tag as a label rather than a link: the heading of its own page.
#[allow(non_snake_case)]
pub fn TagLabel<'bump>(bump: &'bump Bump, props: TagLabelProps) -> paxhtml::Element<'bump> {
    paxhtml::html! { in bump;
        <span class="tag-label" style={hue_style(&props.tag)}>
            <span class="tag-prefix" ariaHidden="true">"#"</span>
            {props.tag}
        </span>
    }
}

pub struct TagListProps {
    pub tags: Vec<String>,
}
impl DefaultIn<'_> for TagListProps {
    fn default_in(_bump: &Bump) -> Self {
        Self { tags: vec![] }
    }
}

/// A document's tags as a row of links; nothing at all if it has none.
#[allow(non_snake_case)]
pub fn TagList<'bump>(bump: &'bump Bump, props: TagListProps) -> paxhtml::Element<'bump> {
    if props.tags.is_empty() {
        return paxhtml::Element::Empty;
    }
    paxhtml::html! { in bump;
        <ul class="tag-list">
            #{props.tags.into_iter().map(|tag| paxhtml::html! { in bump;
                <li><TagLink tag={tag} /></li>
            })}
        </ul>
    }
}

fn hue_style(tag: &str) -> String {
    format!("--tag-hue: {}", tag_hue(tag))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hues_follow_the_first_letter() {
        assert_eq!(tag_hue("ai"), 0.0);
        assert_eq!(tag_hue("xr"), 331.2);
        assert_eq!(tag_hue("zzz"), 360.0);
        assert_eq!(tag_hue("3d"), 43.199999999999996);
        assert_eq!(tag_hue("---"), 0.0);
        // Printed as the redesign prints them.
        assert_eq!(tag_hue("personal").to_string(), "216");
        assert_eq!(tag_hue("meta").to_string(), "172.79999999999998");
    }
}
