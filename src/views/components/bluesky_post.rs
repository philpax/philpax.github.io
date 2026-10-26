use paxhtml::bumpalo::Bump;
use paxsite_content::bluesky::{self, BlueskyPostData, Facet, FacetFeature};

use super::{A, AProps};

/// An archived Bluesky post with local images, remote video and a link to the original.
pub fn bluesky_post<'bump>(bump: &'bump Bump, post: &BlueskyPostData) -> paxhtml::Element<'bump> {
    let avatar = post.author_avatar_filename.as_ref().map(|filename| {
        paxhtml::html! { in bump; <img src={filename.as_str()} alt="" /> }
    });
    let name = Some(post.author_display_name.as_str())
        .filter(|name| !name.is_empty())
        .unwrap_or(&post.author_handle);
    let posted_at = iso_datetime(&post.created_at);
    let archived_at = iso_datetime(&post.fetched_at);

    paxhtml::html! { in bump;
        <figure class="social-card embed">
            <header>
                <A href={bluesky::handle_profile_url(&post.author_handle)} class={"social-card-author".to_string()}>
                    {avatar}
                    // Name over handle.
                    <p class="stack">
                        <b>{name}</b>
                        <span>{format!("@{}", post.author_handle)}</span>
                    </p>
                </A>
            </header>
            <blockquote>{render_rich_text(bump, &post.text, &post.facets)}</blockquote>
            {(!post.images.is_empty()).then(|| paxhtml::html! { in bump;
                <div class="social-card-images">
                    #{post.images.iter().enumerate().map(|(index, image)| paxhtml::html! { in bump;
                        <a href={image.filename.as_str()}
                            {image.alt.trim().is_empty().then(|| paxhtml::Attribute::new(bump, "aria-label", &format!("View image {}", index + 1)))}>
                            <img src={image.filename.as_str()} alt={image.alt.as_str()} loading="lazy"
                                {image.width.map(|width| paxhtml::Attribute::new(bump, "width", &width.to_string()))}
                                {image.height.map(|height| paxhtml::Attribute::new(bump, "height", &height.to_string()))} />
                        </a>
                    })}
                </div>
            })}
            {post.video.as_ref().map(|video| paxhtml::html! { in bump;
                <div class="social-card-video">
                    <video controls playsinline preload="none" dataHls={video.playlist.as_str()}
                        tabindex="0"
                        ariaLabel={if video.alt.is_empty() { "Bluesky video" } else { video.alt.as_str() }}
                        {video.thumbnail.as_ref().map(|image| paxhtml::Attribute::new(bump, "poster", image.filename.as_str()))}
                        {video.width.map(|width| paxhtml::Attribute::new(bump, "width", &width.to_string()))}
                        {video.height.map(|height| paxhtml::Attribute::new(bump, "height", &height.to_string()))}>
                        "Video playback is not supported by this browser."
                    </video>
                </div>
            })}
            <figcaption>
                <a href={post.url.as_str()}>
                    <time datetime={posted_at.as_str()}>{posted_at.as_str()}</time>
                </a>
                <span>{format!("{} replies", post.reply_count)}</span>
                <span>{format!("{} reposts", post.repost_count)}</span>
                <span>{format!("{} likes", post.like_count)}</span>
                <span title={format!("Archived at {archived_at}")}>
                    "archived "<time datetime={archived_at.as_str()}>{archived_at.as_str()}</time>
                </span>
            </figcaption>
        </figure>
    }
}

fn iso_datetime(value: &str) -> String {
    chrono::DateTime::parse_from_rfc3339(value)
        .map(|dt| {
            dt.with_timezone(&chrono::Utc)
                .to_rfc3339_opts(chrono::SecondsFormat::Secs, true)
        })
        .unwrap_or_else(|_| value.to_string())
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

    // The card preserves white space, so line breaks stay as written.
    paxhtml::builder::Builder::new(bump).fragment(elements)
}

#[cfg(test)]
mod tests {
    use super::*;
    use paxsite_content::bluesky::{BlueskyImage, BlueskyVideo};

    fn post() -> BlueskyPostData {
        serde_json::from_value(serde_json::json!({
            "url": "https://bsky.app/profile/example.test/post/123",
            "author_display_name": "Example",
            "author_handle": "example.test",
            "author_avatar_filename": null,
            "text": "Archived text <&>",
            "facets": [],
            "created_at": "2026-01-01T00:00:00Z",
            "like_count": 1,
            "reply_count": 2,
            "repost_count": 3,
            "quote_count": 0,
            "fetched_at": "2026-01-02T00:00:00Z"
        }))
        .unwrap()
    }

    fn render(post: &BlueskyPostData) -> String {
        let bump = Bump::new();
        paxhtml::Document::new(&bump, [bluesky_post(&bump, post)])
            .write_to_string()
            .unwrap()
    }

    fn image() -> BlueskyImage {
        BlueskyImage {
            filename: "_bluesky/123/image-0.webp".into(),
            alt: "An image <&>".into(),
            width: Some(1280),
            height: Some(720),
        }
    }

    #[test]
    fn images_are_local_linked_lazy_and_escaped() {
        let mut post = post();
        post.images.push(image());
        let html = render(&post);
        assert!(html.contains("href=\"_bluesky/123/image-0.webp\""));
        assert!(html.contains("src=\"_bluesky/123/image-0.webp\""));
        assert!(html.contains("alt=\"An image &lt;&amp;&gt;\""));
        assert!(html.contains("loading=\"lazy\""));
        assert!(html.contains("width=\"1280\""));
        assert!(html.contains("height=\"720\""));
        assert!(html.contains("Archived text &lt;&amp;&gt;"));
        assert!(!html.contains("<video"));
    }

    #[test]
    fn video_has_remote_playlist_local_poster_and_linked_post_timestamp() {
        let mut post = post();
        post.video = Some(BlueskyVideo {
            playlist: "https://video.bsky.app/playlist.m3u8".into(),
            thumbnail: Some(image()),
            alt: "A video <&>".into(),
            width: Some(1280),
            height: Some(720),
        });
        let html = render(&post);
        assert!(html.contains("data-hls=\"https://video.bsky.app/playlist.m3u8\""));
        assert!(html.contains("poster=\"_bluesky/123/image-0.webp\""));
        assert!(html.contains("aria-label=\"A video &lt;&amp;&gt;\""));
        assert!(html.contains("preload=\"none\""));
        assert!(html.contains("controls"));
        assert!(html.contains("playsinline"));
        assert!(html.contains("</video>"));
        assert!(!html.contains("Watch"));
        assert!(html.contains("href=\"https://bsky.app/profile/example.test/post/123\""));
        assert!(html.contains("2026-01-01T00:00:00Z</time>"));
        assert!(!html.contains("src=\"https://video.bsky.app"));
    }

    #[test]
    fn footer_links_the_post_datetime_and_ends_with_the_archive_datetime() {
        let mut post = post();
        post.created_at = "2026-01-01T02:30:45.123+02:00".into();
        post.fetched_at = "2026-01-02T03:04:05.987654321Z".into();
        let html = render(&post);
        let html = html.split_whitespace().collect::<Vec<_>>().join(" ");
        assert!(
            html.contains("<time datetime=\"2026-01-01T00:30:45Z\">2026-01-01T00:30:45Z</time>")
        );
        assert!(html.contains(
            "archived <time datetime=\"2026-01-02T03:04:05Z\">2026-01-02T03:04:05Z</time>"
        ));
        assert!(html.find("3 reposts").unwrap() < html.find("archived <time").unwrap());
        assert_eq!(
            html.matches("href=\"https://bsky.app/profile/example.test/post/123\"")
                .count(),
            1
        );
        assert!(!html.contains("Watch"));
    }

    #[test]
    fn empty_image_alt_keeps_an_accessible_link_name() {
        let mut post = post();
        let mut image = image();
        image.alt.clear();
        post.images.push(image);
        let html = render(&post);
        assert!(html.contains("aria-label=\"View image 1\""));
        assert!(html.contains("alt=\"\""));
    }

    #[test]
    fn old_text_only_cache_renders_without_media() {
        let html = render(&post());
        assert!(html.contains("Archived text &lt;&amp;&gt;"));
        assert!(!html.contains("social-card-images"));
        assert!(!html.contains("<video"));
    }
}
