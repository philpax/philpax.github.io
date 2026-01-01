use blackbird_json_export_types::{OutputGroup, OutputTrack};
use paxhtml::bumpalo::{self, Bump};
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

// Note: This component uses ViewContext so it's kept as a regular function
// rather than using the custom component syntax
pub fn music_library<'a>(context: ViewContext<'a>) -> paxhtml::Element<'a> {
    let bump = context.bump;
    if context.fast {
        return html! { in bump;
            <div>
                <p>"Music library (SKIPPED)"</p>
            </div>
        };
    }

    let style = format!(
        "
        .music-library {{
            background-color: {background};
            color: {text};
            max-width: 100%;
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

        .music-library .album .album-link {{
            color: {album};
            cursor: pointer;
            text-decoration: none;
        }}

        .music-library .album .album-link:hover {{
            text-decoration: underline;
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

        .music-library .track .number {{
            color: {track_number};
            width: 48px;
            display: inline-block;
            text-align: right;
            flex-shrink: 0;
        }}

        .music-library .track .middle {{
            flex: 1;
            display: flex;
            align-items: center;
            min-width: 0;
            justify-content: space-between;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0 0.5em;
        }}

        .music-library .track .name-group {{
            display: flex;
            align-items: center;
            white-space: nowrap;
        }}

        .music-library .track .name {{
            color: {track_name};
            white-space: nowrap;
        }}

        .music-library .track .play-count {{
            color: {track_number};
            margin-left: 0.5em;
            white-space: nowrap;
        }}

        .music-library .track .artist {{
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-shrink: 1;
            flex-grow: 0;
            text-align: right;
            margin-left: 0.5em;
        }}

        .music-library .track .length {{
            color: {track_length};
            flex-shrink: 0;
            text-align: right;
        }}
        .music-library .track .name:hover {{
            color: {track_name_hovered};
        }}

        .music-library .track .length {{
            color: {track_length};
            flex-shrink: 0;
        }}

        .music-library .track .duration {{
            color: {track_duration};
            flex-shrink: 0;
        }}

        .music-library .heart {{
            color: red;
            font-size: 1em;
            width: 1em;
            height: 1em;
            display: inline-block;
            text-align: center;
            margin-left: 0.5em;
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

    let music_library = &context.content.music_library;
    let album_count = music_library.len();
    let track_count = music_library.iter().map(|g| g.tracks.len()).sum::<usize>();
    let liked_album_count = music_library.iter().filter(|g| g.starred).count();
    let liked_track_count = music_library
        .iter()
        .flat_map(|g| &g.tracks)
        .filter(|t| t.starred)
        .count();

    html! { in bump;
        <>
            <style>
                {style}
            </style>
            <div>
                <div class="text-xl text-center bg-emerald-900 text-white p-2">
                    {util::number_to_comma_separated_string(track_count)}" tracks"
                    {if liked_track_count > 0 {
                        format!(" ({} liked)", util::number_to_comma_separated_string(liked_track_count))
                    } else {
                        String::new()
                    }}
                    " | "
                    {util::number_to_comma_separated_string(album_count)}" albums"
                    {if liked_album_count > 0 {
                        format!(" ({} liked)", util::number_to_comma_separated_string(liked_album_count))
                    } else {
                        String::new()
                    }}
                </div>
                <div class="text-center bg-emerald-950 text-white p-2">
                    <label style="cursor: pointer; user-select: none;">
                        <input r#type="checkbox" id="likes-filter-checkbox" style="margin-right: 0.5em; cursor: pointer;"/>
                        "Show only liked tracks/albums"
                    </label>
                </div>
                <div class="font-sans text-white music-library p-3 flex flex-col gap-8" id="music-library-container">
                    #{music_library.iter().map(|g| group(bump, g))}
                </div>
            </div>
            <script>
                {paxhtml::Element::raw(bump, r#"
                document.addEventListener('DOMContentLoaded', () => {
                    // Helper: Get album artist from a section
                    const getAlbumArtist = (element) => {
                        const section = element.closest('section');
                        const artistHeading = section ? section.querySelector('heading .artist') : null;
                        return artistHeading ? artistHeading.textContent.trim() : '';
                    };

                    // Helper: Configure a link as a YouTube search
                    const setYouTubeSearch = (link, query) => {
                        link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
                        link.target = '_blank';
                    };

                    // Set up YouTube links for tracks
                    for (const link of document.querySelectorAll('.music-library a.track')) {
                        const nameSpan = link.querySelector('.name');
                        const track = nameSpan ? nameSpan.textContent.trim() : '';

                        const artistSpan = link.querySelector('.artist');
                        const trackArtist = artistSpan ? artistSpan.textContent.trim() : '';

                        const artist = trackArtist || getAlbumArtist(link);
                        const query = `${artist} - ${track}`;

                        setYouTubeSearch(link, query);
                    }

                    // Set up YouTube links for albums
                    for (const link of document.querySelectorAll('.music-library a.album-link')) {
                        const album = link.textContent.trim();
                        const artist = getAlbumArtist(link);
                        const query = `${artist} - ${album} album`;

                        setYouTubeSearch(link, query);
                    }

                    // Likes filter functionality
                    const likesCheckbox = document.getElementById('likes-filter-checkbox');
                    const sections = document.querySelectorAll('.music-library section');
                    const urlParams = new URLSearchParams(window.location.search);

                    // Check for ?likes=1 in URL
                    if (urlParams.get('likes') === '1') {
                        likesCheckbox.checked = true;
                    }

                    const filterByLikes = () => {
                        const showOnlyLikes = likesCheckbox.checked;

                        for (const section of sections) {
                            const albumHeart = section.querySelector('heading .album-length .heart');
                            const albumIsStarred = albumHeart && albumHeart.textContent.trim() === '♥';
                            const tracks = section.querySelectorAll('.track');

                            if (!showOnlyLikes) {
                                // Show all
                                section.style.display = '';
                                for (const track of tracks) {
                                    track.style.display = '';
                                }
                                continue;
                            }

                            // If album is starred, show all tracks
                            if (albumIsStarred) {
                                section.style.display = '';
                                for (const track of tracks) {
                                    track.style.display = '';
                                }
                                continue;
                            }

                            // Filter tracks within non-starred album
                            let hasVisibleTracks = false;
                            for (const track of tracks) {
                                const trackHeart = track.querySelector('.length .heart');
                                const trackIsStarred = trackHeart && trackHeart.textContent.trim() === '♥';

                                track.style.display = trackIsStarred ? '' : 'none';
                                if (trackIsStarred) {
                                    hasVisibleTracks = true;
                                }
                            }

                            section.style.display = hasVisibleTracks ? '' : 'none';
                        }

                        // Update URL parameter
                        if (showOnlyLikes) {
                            urlParams.set('likes', '1');
                        } else {
                            urlParams.delete('likes');
                        }
                        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
                        window.history.replaceState({}, '', newUrl);
                    };

                    // Apply initial filter if needed
                    if (likesCheckbox.checked) {
                        filterByLikes();
                    }

                    likesCheckbox.addEventListener('change', filterByLikes);
                });
                "#)}
            </script>
        </>
    }
}

fn group<'a>(bump: &'a Bump, group: &OutputGroup) -> paxhtml::Element<'a> {
    html! { in bump;
        <section>
            <heading>
                <h3 class="artist" style={format!("color: {}", colours::string_to_colour(&group.artist))}>{&group.artist}</h3>
                <div class="album-row">
                    <h4 class="album">
                        <a class="album-link">
                            {&group.album}
                        </a> {
                            group.year.map(|y| html! { in bump; <span class="album-year">{format!(" ({y})")}</span> }).unwrap_or_default()
                        }
                    </h4>
                    <span class="album-length">{seconds_to_hms_string(group.duration, false)} <span class="heart">{if group.starred { "♥" } else { " " }}</span></span>
                </div>
            </heading>
            <div>
                #{group.tracks.iter().map(|t| track(bump, group, t))}
            </div>
        </section>
    }
}

fn track<'a>(bump: &'a Bump, group: &OutputGroup, track: &OutputTrack) -> paxhtml::Element<'a> {
    let track_number = match (track.disc_number, track.track) {
        (Some(disc_number), Some(track_number)) => format!("{disc_number}.{track_number}"),
        (Some(disc_number), None) => format!("{disc_number}.?"),
        (None, Some(track_number)) => format!("{track_number}"),
        (None, None) => "?".to_string(),
    };

    let artist = track
        .artist
        .as_ref()
        .filter(|artist| **artist != group.artist)
        .map(|artist| {
            html! { in bump;
                <span class="artist" style={format!("color: {}", colours::string_to_colour(artist))}>
                    {artist.as_str()}
                </span>
            }
        });

    let duration = track.duration.map(|duration| {
        html! { in bump;
            <span>
                {seconds_to_hms_string(duration, false)}
            </span>
        }
    });

    let play_count = track.play_count.map(|count| {
        html! { in bump;
            <span class="play-count">
                {count.to_string()}
            </span>
        }
    });

    html! { in bump;
        <a class="track">
            <span class="number">{track_number}</span>
            <span class="middle">
                <span class="name-group">
                    <span class="name">{track.title.as_str()}</span>
                    {play_count}
                </span>
                {artist}
            </span>
            <span class="length">{duration} <span class="heart">{if track.starred { "♥" } else { " " }}</span></span>
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
