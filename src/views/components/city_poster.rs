use paxhtml::{bumpalo::Bump, html};

/// A picture beside its caption (stacked when narrow). The picture is a preview linking
/// to the original; the caption is the Markdown between the tags.
pub fn city_poster<'bump>(
    bump: &'bump Bump,
    image_url: &str,
    small_preview_url: &str,
    body: paxhtml::Element<'bump>,
) -> paxhtml::Element<'bump> {
    html! { in bump;
        <figure class="city-poster">
            <a href={image_url}>
                <img src={small_preview_url} alt="" />
            </a>
            <figcaption>{body}</figcaption>
        </figure>
    }
}
