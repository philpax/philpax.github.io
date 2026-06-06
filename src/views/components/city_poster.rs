use paxhtml::{bumpalo::Bump, html};

/// Renders a two-column city poster layout: image on the left, text on the right.
/// On mobile, stacks vertically.
pub fn city_poster<'bump>(
    bump: &'bump Bump,
    image_url: &str,
    small_preview_url: &str,
    body: paxhtml::Element<'bump>,
) -> paxhtml::Element<'bump> {
    let body_class = "flex-1 min-w-0 post-body";
    html! { in bump;
        <div class="city-poster flex flex-col md:flex-row gap-4 items-start my-4">
            <a href={image_url} class="shrink-0 self-center md:self-start">
                <img
                    src={small_preview_url}
                    class="w-48 border-2 border-fg block"
                    alt="City poster"
                />
            </a>
            <div class={body_class}>
                {body}
            </div>
        </div>
    }
}
