//! Exports the music library from a Navidrome server to `assets/baked/music.json`
//! (format in `paxsite-music`).
//!
//! Usage: `cargo run -p music-export [-- <output path>]`
//!
//! Server and credentials come from Blackbird's config (`[server]`). The library
//! is fetched over Subsonic; recent plays come from Navidrome's native scrobble
//! API, which needs Navidrome 0.64+. Front page covers are saved to
//! `assets/baked/static/music-covers` as JPEGs.
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
/// Navidrome's album name for files with no album tag.
const UNKNOWN_ALBUM: &str = "[Unknown Album]";
/// Front page covers display at 2.5rem; this covers a 3x screen.
const COVER_SIZE: usize = 128;
/// JPEG quality for the covers.
const COVER_QUALITY: u8 = 85;

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

/// Blackbird's shared config, server settings only. Other sections are ignored.
#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
struct Config {
    server: blackbird_shared::config::Server,
}
impl ConfigFile for Config {}

/// An untagged single-track album is almost always a single, so it takes the
/// track's name.
fn album_name(album: &str, tracks: &[Track]) -> String {
    match tracks {
        [only] if album == UNKNOWN_ALBUM => only.title.clone(),
        _ => album.to_string(),
    }
}

/// Saves front page album covers into `dir` at [`COVER_SIZE`] and removes stale
/// ones. Albums whose cover can't be fetched go without.
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
        let jpeg = match encode_cover(&bytes) {
            Ok(jpeg) => jpeg,
            Err(e) => {
                eprintln!("Failed to re-encode the cover of {name}: {e:?}");
                continue;
            }
        };
        let file = format!("{}.jpg", file_stem(&id.0));
        std::fs::write(dir.join(&file), jpeg)
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

/// The cover as a JPEG. The server has already sized it, so a JPEG is kept as
/// it is, since re-encoding one only loses detail.
fn encode_cover(bytes: &[u8]) -> anyhow::Result<Vec<u8>> {
    if image::guess_format(bytes)? == image::ImageFormat::Jpeg {
        return Ok(bytes.to_vec());
    }
    let cover = image::load_from_memory(bytes)?;
    let mut jpeg = Vec::new();
    image::codecs::jpeg::JpegEncoder::new_with_quality(&mut jpeg, COVER_QUALITY)
        .encode_image(&cover.to_rgb8())?;
    Ok(jpeg)
}

/// A cover art ID as a safe file name.
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

/// Navidrome's native API (not Subsonic), for scrobble history.
mod navidrome {
    use anyhow::Context as _;
    use chrono::{DateTime, Utc};
    use serde::Deserialize;

    #[derive(Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct Scrobble {
        /// Subsonic song ID (`blackbird_state::TrackId`).
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
    fn covers_are_converted_to_jpegs() {
        let mut png = std::io::Cursor::new(Vec::new());
        image::RgbaImage::new(128, 128)
            .write_to(&mut png, image::ImageFormat::Png)
            .unwrap();
        let jpeg = encode_cover(png.get_ref()).unwrap();
        assert_eq!(
            image::guess_format(&jpeg).unwrap(),
            image::ImageFormat::Jpeg
        );
    }

    #[test]
    fn jpegs_are_kept_as_they_are() {
        let mut jpeg = std::io::Cursor::new(Vec::new());
        image::RgbImage::new(128, 128)
            .write_to(&mut jpeg, image::ImageFormat::Jpeg)
            .unwrap();
        assert_eq!(encode_cover(jpeg.get_ref()).unwrap(), *jpeg.get_ref());
    }

    #[test]
    fn covers_are_named_by_a_safe_id() {
        assert_eq!(file_stem("al-1a2b_3c/4d.5e"), "al-1a2b_3c_4d_5e");
    }
}
