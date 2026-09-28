use paxhtml::{bumpalo::Bump, html};
use paxsite_music::{Album, Track};

use crate::{util, views::ViewContext};

/// The music library, mirrored to the player it comes from (Blackbird): each
/// album a section with a coloured artist heading, its title, year, length and
/// heart; each track a row with its number, title, plays, artist where it
/// differs, length and heart. A banner counts the library, and a checkbox
/// filters it down to what is liked.
///
/// Every album and track links to a YouTube search for it. Those links are
/// written by the site's script rather than here: there are tens of thousands
/// of them, and they would double the size of the page.
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
                // The filter needs the script, which reveals it.
                <div class="music-filter" hidden>
                    <label r#for="likes-filter-checkbox">
                        <input r#type="checkbox" id="likes-filter-checkbox" />
                        "Show only liked tracks/albums"
                    </label>
                </div>
            </div>
            <div class="music-surface">
                #{albums.iter().map(|g| album(bump, g))}
            </div>
        </section>
    }
}

fn album<'a>(bump: &'a Bump, album: &Album) -> paxhtml::Element<'a> {
    let starred = album
        .starred
        .then(|| paxhtml::Attribute::boolean(bump, "data-starred"));
    html! { in bump;
        <section ariaLabel={album.album.as_str()} {starred}>
            <div class="album-heading">
                <h2 class="artist" style={format!("color: {}", string_to_colour(&album.artist))}>{&album.artist}</h2>
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

/// A length and the heart beside it.
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

/// Hash a string to a pleasing colour, as the player does, so that a name
/// lands on the same hue wherever it appears.
fn string_to_colour(input: &str) -> String {
    const DISTINCT_COLOURS: u32 = 36_000;
    let mut hash: u32 = 0x811c_9dc5;
    for unit in input.encode_utf16() {
        hash ^= u32::from(unit);
        let rotated = ((hash << 1) as i32) | ((hash as i32) >> 31);
        hash = hash.wrapping_add(rotated as u32);
        let rotated = ((hash << 4) as i32) | ((hash as i32) >> 28);
        hash = hash.wrapping_add(rotated as u32);
    }
    let hue = (hash % DISTINCT_COLOURS) as f64 / DISTINCT_COLOURS as f64;
    let [r, g, b] = rgb_from_hsv(hue, 0.75, 0.75).map(gamma_u8_from_linear);
    format!("rgb({r}, {g}, {b})")
}

fn rgb_from_hsv(h: f64, s: f64, v: f64) -> [f64; 3] {
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

/// Linear [0, 1] to gamma [0, 255], clamped.
fn gamma_u8_from_linear(l: f64) -> u8 {
    if l <= 0.0 {
        0
    } else if l <= 0.0031308 {
        (3294.6 * l).round() as u8
    } else if l <= 1.0 {
        (269.025 * l.powf(1.0 / 2.4) - 14.025).round() as u8
    } else {
        255
    }
}

/// Seconds as `m:ss` or `h:mm:ss`, as the player prints them: minutes are
/// always two digits, hours never padded.
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
