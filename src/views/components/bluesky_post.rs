use paxhtml::bumpalo::Bump;
use paxsite_content::bluesky::{BlueskyPostData, Facet, FacetFeature};

use super::display_date;

/// An archived Bluesky post: who posted it, what they said, and when, with
/// the date linking to the post itself.
pub fn bluesky_post<'bump>(bump: &'bump Bump, post: &BlueskyPostData) -> paxhtml::Element<'bump> {
    let avatar = post.author_avatar_filename.as_ref().map(|filename| {
        paxhtml::html! { in bump; <img src={filename.as_str()} alt="" /> }
    });
    let name = Some(post.author_display_name.as_str())
        .filter(|name| !name.is_empty())
        .unwrap_or(&post.author_handle);
    let posted_at = chrono::DateTime::parse_from_rfc3339(&post.created_at)
        .ok()
        .map(|dt| dt.with_timezone(&chrono::Utc))
        .map(|dt| {
            paxhtml::html! { in bump;
                <a href={post.url.clone()}>
                    <time datetime={post.created_at.clone()}>{display_date(dt.date_naive())}</time>
                </a>
            }
        });

    paxhtml::html! { in bump;
        <figure class="social-card">
            <header>
                {avatar}
                // Name over handle: two lines of one address, so it stacks.
                <p class="stack">
                    <b>{name}</b>
                    <span>{format!("@{}", post.author_handle)}</span>
                </p>
            </header>
            <blockquote>{render_rich_text(bump, &post.text, &post.facets)}</blockquote>
            <figcaption>
                {posted_at}
                <span>{format!("{} replies", post.reply_count)}</span>
                <span>{format!("{} reposts", post.repost_count)}</span>
                <span>{format!("{} likes", post.like_count)}</span>
            </figcaption>
        </figure>
    }
}

fn render_rich_text<'bump>(
    bump: &'bump Bump,
    text: &str,
    facets: &[Facet],
) -> paxhtml::Element<'bump> {
    let mut sorted_facets: Vec<_> = facets.iter().collect();
    sorted_facets.sort_by_key(|f| f.byte_start);

    let mut elements: Vec<paxhtml::Element<'bump>> = Vec::new();
    let mut cursor = 0;

    for facet in &sorted_facets {
        let start = facet.byte_start.min(text.len());
        let end = facet.byte_end.min(text.len());

        if start < cursor || start >= end {
            continue;
        }
        if !text.is_char_boundary(start) || !text.is_char_boundary(end) {
            continue;
        }

        elements.push(paxhtml::html! { in bump; {&text[cursor..start]} });

        let facet_text = &text[start..end];
        if let Some(feature) = facet.features.first() {
            let href = match feature {
                FacetFeature::Link { uri } => uri.clone(),
                FacetFeature::Mention { did } => paxsite_content::bluesky::profile_url(did),
                FacetFeature::Tag { tag } => paxsite_content::bluesky::hashtag_url(tag),
            };
            elements.push(paxhtml::html! { in bump; <a href={href}>{facet_text}</a> });
        } else {
            elements.push(paxhtml::html! { in bump; {facet_text} });
        }

        cursor = end;
    }

    if cursor < text.len() {
        elements.push(paxhtml::html! { in bump; {&text[cursor..]} });
    }

    // Line breaks stay as they were written: the card preserves white space.
    paxhtml::builder::Builder::new(bump).fragment(elements)
}
