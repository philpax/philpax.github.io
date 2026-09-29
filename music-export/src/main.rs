//! Exports the music library from a Navidrome server to the JSON the site reads
//! (`assets/baked/music.json`; see `paxsite-music` for the format).
//!
//! Usage: `cargo run -p music-export [-- <output path>]`
//!
//! The server and credentials come from Blackbird's config
//! (`~/.config/blackbird/config.toml`, `[server]`). The library is fetched over
//! the Subsonic API; recent plays come from Navidrome's native scrobble API,
//! which needs Navidrome 0.64 or later. The covers of the albums the front
//! page shows are saved beside it, in `assets/baked/static/music-covers`.
use std::{
    collections::{HashMap, HashSet},
    path::{Path, PathBuf},
};

use anyhow::Context as _;
use blackbird_shared::config::ConfigFile;
use blackbird_state::{CoverArtId, bs};
use chrono::{SubsecRound as _, TimeDelta, Utc};
use paxsite_music::{Album, COVERS_DIR, MOST_LISTENED, MusicLibrary, RECENT_PLAYS_DAYS, Track};
use serde::{Deserialize, Serialize};

const DEFAULT_OUTPUT_PATH: &str = "assets/baked/music.json";
/// Navidrome's name for the album of files that carry no album tag.
const UNKNOWN_ALBUM: &str = "[Unknown Album]";
/// The front page shows covers at 2.5rem; this is enough for a 3x screen.
const COVER_SIZE: usize = 128;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let output_path = std::env::args()
        .nth(1)
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from(DEFAULT_OUTPUT_PATH));
    let server = Config::load().server;
    let exported_at = Utc::now().trunc_subsecs(0);

    let client = blackbird_state::bs::Client::new(
        server.base_url.clone(),
        server.username.clone(),
        server.password.clone(),
        "paxsite-music-export",
    );
    let fetched = blackbird_state::fetch_all(&client, |batch_count, total_count| {
        println!("Fetched {batch_count} tracks, total {total_count} tracks");
    })
    .await
    .map_err(|e| anyhow::anyhow!("Failed to fetch library: {e:?}"))?;
    if !fetched.orphaned_track_ids.is_empty() {
        eprintln!(
            "Skipping {} tracks without a known album",
            fetched.orphaned_track_ids.len()
        );
    }

    let since = exported_at - TimeDelta::days(RECENT_PLAYS_DAYS);
    let scrobbles = navidrome::scrobbles_since(&server, since).await?;
    println!(
        "Fetched {} scrobbles since {}",
        scrobbles.len(),
        since.to_rfc3339()
    );

    let mut plays_by_track: HashMap<&str, u64> = HashMap::new();
    for scrobble in &scrobbles {
        *plays_by_track.entry(&scrobble.media_file_id).or_default() += 1;
    }

    let mut matched_scrobbles = 0;
    let cover_art_ids: Vec<Option<CoverArtId>> = fetched
        .groups
        .iter()
        .map(|group| group.cover_art_id.clone())
        .collect();
    let albums = fetched
        .groups
        .iter()
        .map(|group| {
            let recent_plays = group
                .tracks
                .iter()
                .filter_map(|id| plays_by_track.get(id.0.as_str()))
                .sum();
            matched_scrobbles += recent_plays;
            let tracks: Vec<Track> = group
                .tracks
                .iter()
                .map(|id| {
                    let track = &fetched.track_map[id];
                    Track {
                        title: track.title.to_string(),
                        artist: track.artist.as_ref().map(|a| a.to_string()),
                        track: track.track,
                        year: track.year,
                        duration: track.duration,
                        disc_number: track.disc_number,
                        play_count: track.play_count,
                        starred: track.starred,
                    }
                })
                .collect();
            Album {
                artist: group.artist.to_string(),
                album: album_name(&group.album, &tracks),
                year: group.year,
                duration: group.duration,
                tracks,
                starred: group.starred,
                recent_plays,
                cover: None,
            }
        })
        .collect();
    println!(
        "Ignored {} scrobbles of tracks no longer in the library",
        scrobbles.len() as u64 - matched_scrobbles
    );

    let mut library = MusicLibrary {
        exported_at,
        albums,
    };
    let covers_dir = output_path
        .parent()
        .unwrap_or(Path::new("."))
        .join("static")
        .join(COVERS_DIR);
    save_covers(&client, &mut library, &cover_art_ids, &covers_dir).await?;
    for album in library.most_listened(MOST_LISTENED) {
        println!(
            "{:>5} recent plays: {} - {}",
            album.recent_plays, album.album, album.artist
        );
    }

    let mut json = serde_json::to_string_pretty(&library)?;
    json.push('\n');
    std::fs::write(&output_path, json)
        .with_context(|| format!("Failed to write to {}", output_path.display()))?;
    println!("Wrote {}", output_path.display());

    Ok(())
}

/// Partial view of Blackbird's shared config: only the server settings.
/// Unknown sections written by the clients are ignored on load.
#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
struct Config {
    server: blackbird_shared::config::Server,
}
impl ConfigFile for Config {}

/// An untagged album of one track is almost always a single, so it takes its
/// track's name. Untagged albums of several tracks keep Navidrome's name.
fn album_name(album: &str, tracks: &[Track]) -> String {
    match tracks {
        [only] if album == UNKNOWN_ALBUM => only.title.clone(),
        _ => album.to_string(),
    }
}

/// Saves the covers of the albums the front page shows into `dir`, at
/// [`COVER_SIZE`], and removes the covers of albums it no longer shows. An
/// album whose cover can't be fetched goes without.
async fn save_covers(
    client: &bs::Client,
    library: &mut MusicLibrary,
    cover_art_ids: &[Option<CoverArtId>],
    dir: &Path,
) -> anyhow::Result<()> {
    std::fs::create_dir_all(dir).with_context(|| format!("Failed to create {}", dir.display()))?;
    let shown: Vec<usize> = library
        .most_listened(MOST_LISTENED)
        .into_iter()
        .filter_map(|album| library.albums.iter().position(|a| std::ptr::eq(a, album)))
        .collect();

    let mut kept = HashSet::new();
    for index in shown {
        let Some(id) = &cover_art_ids[index] else {
            continue;
        };
        let name = &library.albums[index].album;
        let bytes = match client.get_cover_art(id.0.as_str(), Some(COVER_SIZE)).await {
            Ok(bytes) => bytes,
            Err(e) => {
                eprintln!("Failed to fetch the cover of {name}: {e:?}");
                continue;
            }
        };
        let Some(extension) = image_extension(&bytes) else {
            eprintln!("The cover of {name} is in a format the site can't show");
            continue;
        };
        let file = format!("{}.{extension}", file_stem(&id.0));
        std::fs::write(dir.join(&file), &bytes)
            .with_context(|| format!("Failed to write the cover of {name}"))?;
        kept.insert(file.clone());
        library.albums[index].cover = Some(file);
    }

    for entry in std::fs::read_dir(dir)? {
        let entry = entry?;
        if !kept.contains(entry.file_name().to_string_lossy().as_ref()) {
            std::fs::remove_file(entry.path())?;
        }
    }
    println!("Saved {} covers to {}", kept.len(), dir.display());
    Ok(())
}

/// The extension for an image, by its first bytes.
fn image_extension(bytes: &[u8]) -> Option<&'static str> {
    match bytes {
        [0xFF, 0xD8, 0xFF, ..] => Some("jpg"),
        [0x89, b'P', b'N', b'G', ..] => Some("png"),
        [
            b'R',
            b'I',
            b'F',
            b'F',
            _,
            _,
            _,
            _,
            b'W',
            b'E',
            b'B',
            b'P',
            ..,
        ] => Some("webp"),
        [b'G', b'I', b'F', b'8', ..] => Some("gif"),
        _ => None,
    }
}

/// A cover art ID made safe for a file name.
fn file_stem(id: &str) -> String {
    id.chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || c == '-' || c == '_' {
                c
            } else {
                '_'
            }
        })
        .collect()
}

/// Navidrome's native API (not Subsonic), used for scrobble history.
mod navidrome {
    use anyhow::Context as _;
    use chrono::{DateTime, Utc};
    use serde::Deserialize;

    /// One play of a track.
    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct Scrobble {
        /// The Subsonic song ID, as carried by `blackbird_state::TrackId`.
        pub media_file_id: String,
        /// Unix seconds.
        pub submission_time: i64,
    }

    /// Every scrobble submitted at or after `since`, newest first.
    pub async fn scrobbles_since(
        server: &blackbird_shared::config::Server,
        since: DateTime<Utc>,
    ) -> anyhow::Result<Vec<Scrobble>> {
        let base_url = server.base_url.trim_end_matches('/');
        let client = reqwest::Client::new();
        let token = login(&client, base_url, server).await?;

        let since = since.timestamp();
        let mut scrobbles = vec![];
        loop {
            let start = scrobbles.len();
            let page: Vec<Scrobble> = client
                .get(format!("{base_url}/api/scrobble"))
                .query(&[
                    ("_start", start.to_string()),
                    ("_end", (start + PAGE_SIZE).to_string()),
                    ("_sort", "submission_time".to_string()),
                    ("_order", "DESC".to_string()),
                ])
                .header("x-nd-authorization", format!("Bearer {token}"))
                .send()
                .await
                .and_then(|r| r.error_for_status())
                .context("Failed to fetch scrobbles (the native API needs Navidrome >= 0.64)")?
                .json()
                .await
                .context("Failed to parse scrobbles")?;

            let page_len = page.len();
            let before = scrobbles.len();
            scrobbles.extend(page.into_iter().take_while(|s| s.submission_time >= since));
            if page_len < PAGE_SIZE || scrobbles.len() - before < page_len {
                return Ok(scrobbles);
            }
        }
    }

    const PAGE_SIZE: usize = 1000;

    #[derive(Deserialize)]
    struct LoginResponse {
        token: String,
    }

    async fn login(
        client: &reqwest::Client,
        base_url: &str,
        server: &blackbird_shared::config::Server,
    ) -> anyhow::Result<String> {
        let response: LoginResponse = client
            .post(format!("{base_url}/auth/login"))
            .json(&serde_json::json!({
                "username": server.username,
                "password": server.password,
            }))
            .send()
            .await
            .and_then(|r| r.error_for_status())
            .context("Failed to log in to Navidrome's native API")?
            .json()
            .await
            .context("Failed to parse Navidrome login response")?;
        Ok(response.token)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn track(title: &str) -> Track {
        Track {
            title: title.to_string(),
            artist: None,
            track: None,
            year: None,
            duration: None,
            disc_number: None,
            play_count: None,
            starred: false,
        }
    }

    #[test]
    fn an_untagged_single_takes_its_tracks_name() {
        assert_eq!(album_name(UNKNOWN_ALBUM, &[track("DIVE")]), "DIVE");
    }

    #[test]
    fn an_untagged_album_of_several_tracks_keeps_its_name() {
        let tracks = [track("MAKE A SCENE!"), track("MOVE IT!")];
        assert_eq!(album_name(UNKNOWN_ALBUM, &tracks), UNKNOWN_ALBUM);
    }

    #[test]
    fn a_tagged_album_of_one_track_keeps_its_name() {
        assert_eq!(album_name("EVO EVO", &[track("EVO EVO")]), "EVO EVO");
    }

    #[test]
    fn covers_are_named_by_their_format_and_a_safe_id() {
        assert_eq!(image_extension(&[0xFF, 0xD8, 0xFF, 0xE0]), Some("jpg"));
        assert_eq!(image_extension(b"RIFF\0\0\0\0WEBPVP8 "), Some("webp"));
        assert_eq!(image_extension(b"<html>"), None);
        assert_eq!(file_stem("al-1a2b_3c/4d.5e"), "al-1a2b_3c_4d_5e");
    }
}
