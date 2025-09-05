use blackbird_json_export_types::{OutputGroup, OutputSong};
use paxhtml::html;

use crate::{util, views::ViewContext};

#[allow(dead_code)]
mod colours {
    // courtesy egui; mirroring its colour conversion to ensure consistency
    fn rgb_from_hsv((h, s, v): (f32, f32, f32)) -> [f32; 3] {
        #![allow(clippy::many_single_char_names)]
        let h = (h.fract() + 1.0).fract(); // wrap
        let s = s.clamp(0.0, 1.0);

        let f = h * 6.0 - (h * 6.0).floor();
        let p = v * (1.0 - s);
        let q = v * (1.0 - f * s);
        let t = v * (1.0 - (1.0 - f) * s);

        match (h * 6.0).floor() as i32 % 6 {
            0 => [v, t, p],
            1 => [q, v, p],
            2 => [p, v, t],
            3 => [p, q, v],
            4 => [t, p, v],
            5 => [v, p, q],
            _ => unreachable!(),
        }
    }

    fn hsv_to_string([h, s, v]: [f32; 3]) -> String {
        let [r, g, b] = rgb_from_hsv((h, s, v)).map(gamma_u8_from_linear_f32);
        format!("rgb({}, {}, {})", r, g, b)
    }

    /// linear [0, 1] -> gamma [0, 255] (clamped).
    /// Values outside this range will be clamped to the range.
    fn gamma_u8_from_linear_f32(l: f32) -> u8 {
        if l <= 0.0 {
            0
        } else if l <= 0.0031308 {
            fast_round(3294.6 * l)
        } else if l <= 1.0 {
            fast_round(269.025 * l.powf(1.0 / 2.4) - 14.025)
        } else {
            255
        }
    }

    fn fast_round(r: f32) -> u8 {
        (r + 0.5) as _ // rust does a saturating cast since 1.45
    }

    /// Hashes a string and produces a pleasing colour from that hash.
    pub fn string_to_colour(s: &str) -> String {
        use std::hash::Hash;
        use std::hash::Hasher;

        const DISTINCT_COLOURS: u64 = 36_000;

        let mut hasher = std::collections::hash_map::DefaultHasher::new();
        s.hash(&mut hasher);
        let hash = hasher.finish();
        let hue = (hash % DISTINCT_COLOURS) as f32 / DISTINCT_COLOURS as f32;

        hsv_to_string([hue, 0.75, 0.75])
    }

    macro_rules! style_fields {
        ($(($_hsv:ident, $name:ident, $hsv:tt),)*) => {
            $(
                pub fn $name() -> String {
                    hsv_to_string($hsv)
                }
            )*
        };
    }

    style_fields![
        (background_hsv, background, [0.65, 0.40, 0.01]),
        (text_hsv, text, [0.0, 0.0, 1.0]),
        (album_hsv, album, [0.58, 0.90, 0.60]),
        (album_length_hsv, album_length, [0.0, 0.0, 0.75]),
        (album_year_hsv, album_year, [0.0, 0.0, 0.40]),
        (track_number_hsv, track_number, [0.60, 0.5, 0.90]),
        (track_length_hsv, track_length, [0.60, 0.90, 0.70]),
        (track_name_hsv, track_name, [0.0, 0.0, 1.0]),
        (track_name_hovered_hsv, track_name_hovered, [0.6, 0.6, 1.0]),
        (track_name_playing_hsv, track_name_playing, [0.7, 0.7, 1.0]),
        (track_duration_hsv, track_duration, [0.0, 0.0, 0.5]),
    ];
}

pub fn music_library(context: ViewContext) -> paxhtml::Element {
    let style = format!(
        "
        .music-library {{
            background-color: {background};
            color: {text};
        }}

        .music-library heading {{
            display: flex;
            flex-direction: column;
        }}

        .music-library .album-row {{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .music-library .album {{
            color: {album};
        }}

        .music-library .album-year {{
            color: {album_year};
        }}

        .music-library .album-length {{
            color: {album_length};
            text-align: right;
        }}

        .music-library .track {{
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
        }}

        .music-library .track .left {{
            flex: 1;
            display: flex;
            align-items: center;
            min-width: 0;
        }}

        .music-library .track .right {{
            display: flex;
            align-items: center;
            flex-shrink: 0;
            margin-left: 0.5em;
            text-align: right;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }}

        .music-library .track .right .artist {{
            margin-right: 0.5em;
        }}

        .music-library .track .number {{
            color: {track_number};
            width: 48px;
            display: inline-block;
            text-align: right;
            margin-right: 0.5em;
            flex-shrink: 0;
        }}

        .music-library .track .name {{
            color: {track_name};
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }}

        .music-library .track .name:hover {{
            color: {track_name_hovered};
        }}

        .music-library .track .length {{
            color: {track_length};
        }}

        .music-library .track .duration {{
            color: {track_duration};
        }}
    ",
        background = colours::background(),
        text = colours::text(),
        album = colours::album(),
        album_length = colours::album_length(),
        album_year = colours::album_year(),
        track_number = colours::track_number(),
        track_length = colours::track_length(),
        track_name = colours::track_name(),
        track_name_hovered = colours::track_name_hovered(),
        track_duration = colours::track_duration(),
    );

    let album_count = context.content.music_library.len();

    let track_count = context
        .content
        .music_library
        .iter()
        .map(|g| g.songs.len())
        .sum::<usize>();

    html! {
        <>
            <style>
                {style}
            </style>
            <div>
                <div class="text-xl text-center bg-emerald-950 text-white p-2">
                    {util::number_to_comma_separated_string(track_count)}" tracks | "
                    {util::number_to_comma_separated_string(album_count)}" albums"
                </div>
                <div class="font-sans text-white music-library p-3 flex flex-col gap-8">
                    #{context.content.music_library.iter().map(group)}
                </div>
            </div>
            <script>
                {r#"
                document.addEventListener('DOMContentLoaded', function() {
                    const trackLinks = document.querySelectorAll('.music-library a.track');

                    for (const link of trackLinks) {
                        const nameSpan = link.querySelector('.name');
                        const track = nameSpan ? nameSpan.textContent.trim() : '';

                        // Find the artist from the .artist span in the .right section
                        const rightSection = link.querySelector('.right');
                        const artistSpan = rightSection ? rightSection.querySelector('.artist') : null;
                        const trackArtist = artistSpan ? artistSpan.textContent.trim() : '';

                        // Find the album artist from the parent section's heading
                        const section = link.closest('section');
                        const artistHeading = section ? section.querySelector('heading .artist') : null;
                        const albumArtist = artistHeading ? artistHeading.textContent.trim() : '';

                        // Create the search query
                        const artist = trackArtist || albumArtist;
                        const query = `${artist} - ${track}`;

                        // Set the href to YouTube search
                        link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
                        link.target = '_blank';
                    }
                });
                "#}
            </script>
        </>
    }
}

fn group(group: &OutputGroup) -> paxhtml::Element {
    html! {
        <section>
            <heading>
                <h3 class="artist" style={format!("color: {}", colours::string_to_colour(&group.artist))}>{&group.artist}</h3>
                <div class="album-row">
                    <h4 class="album">
                        {&group.album} {
                            group.year.map(|y| html! { <span class="album-year">{format!(" ({y})")}</span> }).unwrap_or_default()
                        }
                    </h4>
                    <span class="album-length">{seconds_to_hms_string(group.duration, false)}</span>
                </div>
            </heading>
            <div>
                #{group.songs.iter().map(|s| song(group, s))}
            </div>
        </section>
    }
}

fn song(group: &OutputGroup, song: &OutputSong) -> paxhtml::Element {
    let track_number = match (song.disc_number, song.track) {
        (Some(disc_number), Some(track_number)) => format!("{disc_number}.{track_number}"),
        (Some(disc_number), None) => format!("{disc_number}.?"),
        (None, Some(track_number)) => format!("{track_number}"),
        (None, None) => "?".to_string(),
    };

    let artist = song
        .artist
        .as_ref()
        .filter(|artist| **artist != group.artist)
        .map(|artist| {
            html! {
                <span class="artist" style={format!("color: {}", colours::string_to_colour(artist))}>
                    {artist.as_str()}
                </span>
            }
        });

    let duration = song.duration.map(|duration| {
        html! {
            <span>
                {seconds_to_hms_string(duration, false)}
            </span>
        }
    });

    html! {
        <a class="track">
            <span class="left">
                <span class="number">{track_number}</span>
                <span class="name">{song.title.as_str()}</span>
            </span>
            <span class="right">
                {artist}
                <span class="length">{duration}</span>
            </span>
        </a>
    }
}

/// Convert a number of seconds to a string in the format "HH:MM:SS".
/// If the number of hours is 0, it will be omitted.
///
/// # Arguments
/// * `seconds` - The number of seconds to convert
/// * `pad_first` - Whether to zero-pad the first segment (hours when present, or minutes when hours are 0)
pub fn seconds_to_hms_string(seconds: u32, pad_first: bool) -> String {
    let hours = seconds / 3600;
    let minutes = (seconds % 3600) / 60;
    let seconds = seconds % 60;

    #[allow(clippy::collapsible_else_if)]
    if hours > 0 {
        if pad_first {
            format!("{hours:02}:{minutes:02}:{seconds:02}")
        } else {
            format!("{hours}:{minutes:02}:{seconds:02}")
        }
    } else {
        if pad_first {
            format!("{minutes:02}:{seconds:02}")
        } else {
            format!("{minutes}:{seconds:02}")
        }
    }
}
