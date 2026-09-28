use paxhtml::{DefaultIn, bumpalo::Bump};

/// The class the stylesheet reads a link's colour from, by where the link
/// goes: the section the path starts with. `None` for anything else, including
/// external links.
pub fn destination_class(href: &str) -> Option<&'static str> {
    let section = href.strip_prefix('/')?.split('/').next()?;
    match section {
        "blog" => Some("link-post"),
        "updates" => Some("link-update"),
        "notes" => Some("link-note"),
        "tags" => Some("link-tag"),
        _ => None,
    }
}

pub struct AProps<'bump> {
    pub href: String,
    pub class: Option<String>,
    pub style: Option<String>,
    pub title: Option<String>,
    /// Marks the link as the current page (`aria-current="page"`).
    pub current: bool,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for AProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            href: String::new(),
            class: None,
            style: None,
            title: None,
            current: false,
            children: None,
        }
    }
}

/// A link in the redesign's chrome. An internal link carries its destination
/// class; an external one opens in a new tab.
#[allow(non_snake_case)]
pub fn A<'bump>(bump: &'bump Bump, props: AProps<'bump>) -> paxhtml::Element<'bump> {
    let external = is_external(&props.href);
    let class = [props.class.as_deref(), destination_class(&props.href)]
        .into_iter()
        .flatten()
        .collect::<Vec<_>>()
        .join(" ");

    let attrs = [
        (!class.is_empty()).then(|| paxhtml::Attribute::new(bump, "class", &class)),
        props
            .style
            .map(|style| paxhtml::Attribute::new(bump, "style", &style)),
        props
            .title
            .map(|title| paxhtml::Attribute::new(bump, "title", &title)),
        props
            .current
            .then(|| paxhtml::Attribute::new(bump, "aria-current", "page")),
        external.then(|| paxhtml::Attribute::new(bump, "target", "_blank")),
        external.then(|| paxhtml::Attribute::new(bump, "rel", "noopener noreferrer")),
    ];

    paxhtml::html! { in bump;
        <a href={props.href} {attrs.into_iter().flatten()}>
            {props.children.unwrap_or(paxhtml::Element::Empty)}
        </a>
    }
}

fn is_external(href: &str) -> bool {
    href.starts_with("http:") || href.starts_with("https:")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn destination_classes() {
        assert_eq!(destination_class("/blog/"), Some("link-post"));
        assert_eq!(destination_class("/blog/hello-again/"), Some("link-post"));
        assert_eq!(destination_class("/updates/"), Some("link-update"));
        assert_eq!(destination_class("/notes/ai/"), Some("link-note"));
        assert_eq!(destination_class("/tags/xr/"), Some("link-tag"));
        assert_eq!(destination_class("/credits/"), None);
        assert_eq!(destination_class("/"), None);
        assert_eq!(destination_class("https://example.com/blog/"), None);
        assert_eq!(destination_class("#fn-1"), None);
    }
}
