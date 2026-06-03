use paxhtml::bumpalo::Bump;
use paxsite_content::bluesky::{BlueskyPostData, Facet, FacetFeature};

use super::{IsoDatetime, IsoDatetimeProps, Link, LinkProps};

pub fn bluesky_post<'bump>(bump: &'bump Bump, post: &BlueskyPostData) -> paxhtml::Element<'bump> {
    let avatar = post.author_avatar_filename.as_ref().map(|filename| {
        paxhtml::html! { in bump;
            <img
                src={filename.as_str()}
                alt=""
                class="w-10 h-10 rounded-full flex-shrink-0"
            />
        }
    });

    let parse_datetime = |s: &str| {
        chrono::DateTime::parse_from_rfc3339(s)
            .ok()
            .map(|dt| dt.with_timezone(&chrono::Utc))
    };

    let posted_at = parse_datetime(&post.created_at)
        .map(|dt| paxhtml::html! { in bump; <IsoDatetime datetime={dt} /> });
    let fetched_at = parse_datetime(&post.fetched_at).map(
        |dt| paxhtml::html! { in bump; <span>"archived "<IsoDatetime datetime={dt} /></span> },
    );

    let body = render_rich_text(bump, &post.text, &post.facets);

    paxhtml::html! { in bump;
        <div class="bg-panel rounded-lg p-4 my-4 max-w-xl not-first:mx-auto">
            <Link external target={paxsite_content::bluesky::profile_url(&post.author_handle)} additional_classes={"flex items-center gap-3 mb-3".to_string()}>
                {avatar}
                <div>
                    <div class="font-semibold text-fg">{&post.author_display_name}</div>
                    <div class="text-sm text-dim">{format!("@{}", post.author_handle)}</div>
                </div>
            </Link>
            <div class="mb-3 text-fg">
                {body}
            </div>
            <div class="flex flex-wrap gap-x-4 text-sm text-dim mb-2">
                <Link external underline target={post.url.clone()}>
                    {posted_at}
                </Link>
                {fetched_at}
            </div>
            <div class="flex gap-4 text-sm text-dim">
                <span>{format!("{} replies", post.reply_count)}</span>
                <span>{format!("{} reposts", post.repost_count)}</span>
                <span>{format!("{} likes", post.like_count)}</span>
                <span>{format!("{} quotes", post.quote_count)}</span>
            </div>
        </div>
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

        text_with_breaks(bump, &text[cursor..start], &mut elements);

        let facet_text = &text[start..end];
        if let Some(feature) = facet.features.first() {
            let href = match feature {
                FacetFeature::Link { uri } => uri.clone(),
                FacetFeature::Mention { did } => paxsite_content::bluesky::profile_url(did),
                FacetFeature::Tag { tag } => paxsite_content::bluesky::hashtag_url(tag),
            };
            let mut inner = Vec::new();
            text_with_breaks(bump, facet_text, &mut inner);
            elements.push(paxhtml::html! { in bump;
                <Link external underline target={href}>#{inner}</Link>
            });
        } else {
            text_with_breaks(bump, facet_text, &mut elements);
        }

        cursor = end;
    }

    if cursor < text.len() {
        text_with_breaks(bump, &text[cursor..], &mut elements);
    }

    paxhtml::html! { in bump; <span>#{elements}</span> }
}

fn text_with_breaks<'bump>(
    bump: &'bump Bump,
    text: &str,
    elements: &mut Vec<paxhtml::Element<'bump>>,
) {
    for (i, line) in text.split('\n').enumerate() {
        if i > 0 {
            elements.push(paxhtml::html! { in bump; <br /> });
        }
        if !line.is_empty() {
            elements.push(paxhtml::html! { in bump; {line} });
        }
    }
}
