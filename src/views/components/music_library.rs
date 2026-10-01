use paxhtml::{bumpalo::Bump, html};
use paxsite_music::{Album, Track};

use crate::{util, views::ViewContext};

/// The music library, laid out like Blackbird (the player it comes from), with
/// a likes filter. Albums and artists have fragment IDs (`MusicLibrary::anchors`)
/// that the front page links to.
///
/// The per-album and per-track YouTube search links are written by the site's
/// script, not here: there are tens of thousands and they would double the page.
pub fn music_library<'a>(context: ViewContext<'a>) -> paxhtml::Element<'a> {
    let bump = context.bump;
    if context.fast {
        return html! { in bump;
            <section class="music-library" ariaLabel="Music library">
                <p>"Music library (SKIPPED)"</p>
            </section>
        };
    }

    let albums = &context.content.music_library.albums;
    let album_count = albums.len();
    let track_count = albums.iter().map(|g| g.tracks.len()).sum::<usize>();
    let liked_album_count = albums.iter().filter(|g| g.starred).count();
    let liked_track_count = albums
        .iter()
        .flat_map(|g| &g.tracks)
        .filter(|t| t.starred)
        .count();
    let count = util::number_to_comma_separated_string;
    let liked = |n: usize| (n > 0).then(|| format!(" ({} liked)", count(n)));
    let anchors = context.content.music_library.anchors();
    let mut seen_artists = std::collections::HashSet::new();

    html! { in bump;
        <section class="music-library" ariaLabel="Music library">
            <div class="music-header">
                <div class="music-banner">
                    {format!("{} tracks", count(track_count))}
                    {liked(liked_track_count)}
                    " | "
                    {format!("{} albums", count(album_count))}
                    {liked(liked_album_count)}
                </div>
                // Needs script, which reveals it.
                <div class="music-filter" hidden>
                    <label r#for="likes-filter-checkbox">
                        <input r#type="checkbox" id="likes-filter-checkbox" />
                        "Show only liked tracks/albums"
                    </label>
                </div>
            </div>
            <div class="music-surface">
                #{albums.iter().enumerate().map(|(i, g)| {
                    let artist_anchor = seen_artists
                        .insert(g.artist.as_str())
                        .then(|| anchors.artist(&g.artist))
                        .flatten();
                    album(bump, g, anchors.album(i), artist_anchor)
                })}
            </div>
        </section>
    }
}

/// An album with its fragment ID, plus the artist's on their first album.
fn album<'a>(
    bump: &'a Bump,
    album: &Album,
    anchor: &str,
    artist_anchor: Option<&str>,
) -> paxhtml::Element<'a> {
    let starred = album
        .starred
        .then(|| paxhtml::Attribute::boolean(bump, "data-starred"));
    let artist_id = artist_anchor.map(|id| paxhtml::Attribute::new(bump, "id", id));
    html! { in bump;
        <section id={anchor} ariaLabel={album.album.as_str()} {starred}>
            <div class="album-heading">
                <h2 class="artist" style={format!("color: {}", string_to_colour(&album.artist))} {artist_id}>{&album.artist}</h2>
                <div class="album-row">
                    <h3 class="album">
                        <a class="album-link" title={album.album.as_str()}>{&album.album}</a>
                        {album.year.map(|y| html! { in bump; <span class="album-year">{format!(" ({y})")}</span> })}
                    </h3>
                    {length(bump, "album-length", Some(album.duration), album.starred)}
                </div>
            </div>
            <div>
                #{album.tracks.iter().map(|t| track(bump, album, t))}
            </div>
        </section>
    }
}

fn track<'a>(bump: &'a Bump, album: &Album, track: &Track) -> paxhtml::Element<'a> {
    let number = match (track.disc_number, track.track) {
        (Some(disc_number), Some(track_number)) => format!("{disc_number}.{track_number}"),
        (Some(disc_number), None) => format!("{disc_number}.?"),
        (None, Some(track_number)) => format!("{track_number}"),
        (None, None) => "?".to_string(),
    };

    let artist = track
        .artist
        .as_ref()
        .filter(|artist| **artist != album.artist)
        .map(|artist| {
            html! { in bump;
                <span class="artist" style={format!("color: {}", string_to_colour(artist))}>
                    {artist.as_str()}
                </span>
            }
        });

    let play_count = track.play_count.map(|count| {
        html! { in bump; <span class="play-count">{count.to_string()}</span> }
    });
    let starred = track
        .starred
        .then(|| paxhtml::Attribute::boolean(bump, "data-starred"));

    html! { in bump;
        <a class="track" {starred}>
            <span class="number">{number}</span>
            <span class="middle">
                <span class="name-group">
                    <span class="name" title={track.title.as_str()}>{track.title.as_str()}</span>
                    {play_count}
                </span>
                {artist}
            </span>
            {length(bump, "length", track.duration, track.starred)}
        </a>
    }
}

fn length<'a>(
    bump: &'a Bump,
    class: &str,
    seconds: Option<u32>,
    starred: bool,
) -> paxhtml::Element<'a> {
    html! { in bump;
        <span class={class}>
            <span class="duration">{seconds.map(seconds_to_hms_string).unwrap_or_default()}</span>
            <span class="heart" ariaHidden="true">{if starred { "\u{2665}" } else { " " }}</span>
        </span>
    }
}

/// Hashes a string to a colour, matching the player (`blackbird-client-shared`'s
/// `string_to_hsv` and `hsv_to_rgb`).
fn string_to_colour(input: &str) -> String {
    use std::hash::{Hash as _, Hasher as _};

    const DISTINCT_COLOURS: u64 = 36_000;
    let mut hasher = std::collections::hash_map::DefaultHasher::new();
    input.hash(&mut hasher);
    let hue = (hasher.finish() % DISTINCT_COLOURS) as f32 / DISTINCT_COLOURS as f32;
    let [r, g, b] = rgb_from_hsv(hue, 0.75, 0.75).map(gamma_u8_from_linear);
    format!("rgb({r}, {g}, {b})")
}

fn rgb_from_hsv(h: f32, s: f32, v: f32) -> [f32; 3] {
    let h = (h.fract() + 1.0).fract();
    let f = h * 6.0 - (h * 6.0).floor();
    let p = v * (1.0 - s);
    let q = v * (1.0 - f * s);
    let t = v * (1.0 - (1.0 - f) * s);
    match (h * 6.0).floor() as i32 {
        0 => [v, t, p],
        1 => [q, v, p],
        2 => [p, v, t],
        3 => [p, q, v],
        4 => [t, p, v],
        _ => [v, p, q],
    }
}

/// Linear [0, 1] to gamma [0, 255], clamped (mirrors egui).
fn gamma_u8_from_linear(l: f32) -> u8 {
    if l <= 0.0 {
        0
    } else if l <= 0.0031308 {
        (3294.6 * l + 0.5) as u8
    } else if l <= 1.0 {
        (269.025 * l.powf(1.0 / 2.4) - 14.025 + 0.5) as u8
    } else {
        255
    }
}

/// Seconds as `m:ss` or `h:mm:ss`, matching the player.
fn seconds_to_hms_string(seconds: u32) -> String {
    let hours = seconds / 3600;
    let minutes = (seconds % 3600) / 60;
    let seconds = seconds % 60;
    if hours > 0 {
        format!("{hours}:{minutes:02}:{seconds:02}")
    } else {
        format!("{minutes:02}:{seconds:02}")
    }
}
