//! The music library written by `music-export` to `assets/baked/music.json` and
//! read by the `<MusicLibrary />` component and the front page.
use std::collections::{HashMap, HashSet};

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// Days before the export counted by [`Album::recent_plays`].
pub const RECENT_PLAYS_DAYS: i64 = 30;

/// Cover art directory, under `assets/baked/static` and so the same path from
/// the site root. [`Album::cover`] names a file in it.
pub const COVERS_DIR: &str = "music-covers";

/// Albums shown on the front page; only these get covers.
pub const MOST_LISTENED: usize = 5;

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct MusicLibrary {
    /// When the export was made.
    pub exported_at: DateTime<Utc>,
    /// Every album, in library order (sort artist, year, album name).
    pub albums: Vec<Album>,
}

/// An album (a Blackbird group): the tracks of one album by one artist.
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Album {
    pub artist: String,
    pub album: String,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub year: Option<i32>,
    /// Total duration in seconds.
    pub duration: u32,
    pub tracks: Vec<Track>,
    #[serde(skip_serializing_if = "is_false", default)]
    pub starred: bool,
    /// Scrobbles in the [`RECENT_PLAYS_DAYS`] days before
    /// [`MusicLibrary::exported_at`].
    #[serde(skip_serializing_if = "is_zero", default)]
    pub recent_plays: u64,
    /// File in [`COVERS_DIR`]. Only front page albums have one.
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub cover: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Track {
    pub title: String,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub artist: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub track: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub year: Option<i32>,
    /// Duration in seconds.
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub duration: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub disc_number: Option<u32>,
    /// Lifetime plays, from the server.
    #[serde(skip_serializing_if = "is_optional_zero", default)]
    pub play_count: Option<u64>,
    #[serde(skip_serializing_if = "is_false", default)]
    pub starred: bool,
}

impl MusicLibrary {
    pub fn empty() -> Self {
        Self {
            exported_at: DateTime::<Utc>::UNIX_EPOCH,
            albums: vec![],
        }
    }

    /// Whether any album was played within [`RECENT_PLAYS_DAYS`] of the export.
    pub fn has_recent_plays(&self) -> bool {
        self.albums.iter().any(|a| a.recent_plays > 0)
    }

    /// The `n` most listened albums by [`Album::recent_plays`], ties broken by
    /// lifetime plays. Falls back to lifetime plays if nothing was played
    /// recently; [`Self::has_recent_plays`] says which applies.
    pub fn most_listened(&self, n: usize) -> Vec<&Album> {
        let mut albums: Vec<&Album> = if self.has_recent_plays() {
            self.albums.iter().filter(|a| a.recent_plays > 0).collect()
        } else {
            self.albums.iter().filter(|a| a.play_count() > 0).collect()
        };
        // Stable: ties keep library order.
        albums.sort_by_key(|a| std::cmp::Reverse((a.recent_plays, a.play_count())));
        albums.truncate(n);
        albums
    }

    pub fn anchors(&self) -> Anchors {
        let mut used = HashSet::new();
        let mut unique = |base: String| {
            let mut anchor = base.clone();
            let mut n = 2;
            while !used.insert(anchor.clone()) {
                anchor = format!("{base}-{n}");
                n += 1;
            }
            anchor
        };
        let mut artists = HashMap::new();
        let albums = self
            .albums
            .iter()
            .map(|album| {
                if !artists.contains_key(&album.artist) {
                    let anchor = unique(format!("artist-{}", slug(&album.artist)));
                    artists.insert(album.artist.clone(), anchor);
                }
                unique(format!(
                    "album-{}--{}",
                    slug(&album.artist),
                    slug(&album.album)
                ))
            })
            .collect();
        Anchors { albums, artists }
    }
}
impl Default for MusicLibrary {
    fn default() -> Self {
        Self::empty()
    }
}

impl Album {
    /// Lifetime plays: the sum of the tracks' play counts.
    pub fn play_count(&self) -> u64 {
        self.tracks.iter().filter_map(|t| t.play_count).sum()
    }
}

/// Fragment IDs from [`MusicLibrary::anchors`]: one per album, and one per
/// artist, placed on the artist's first album.
pub struct Anchors {
    albums: Vec<String>,
    artists: HashMap<String, String>,
}
impl Anchors {
    /// The ID of the album at `index` in [`MusicLibrary::albums`].
    pub fn album(&self, index: usize) -> &str {
        &self.albums[index]
    }

    /// The ID of an artist in the library.
    pub fn artist(&self, artist: &str) -> Option<&str> {
        self.artists.get(artist).map(String::as_str)
    }
}

/// Lowercased name keeping letters and digits (any script), with other runs
/// collapsed to a single hyphen.
fn slug(name: &str) -> String {
    let mut slug = String::new();
    for c in name.chars().flat_map(char::to_lowercase) {
        if c.is_alphanumeric() {
            slug.push(c);
        } else if !slug.is_empty() && !slug.ends_with('-') {
            slug.push('-');
        }
    }
    let trimmed = slug.trim_end_matches('-');
    if trimmed.is_empty() {
        "untitled".to_string()
    } else {
        trimmed.to_string()
    }
}

fn is_optional_zero(n: &Option<u64>) -> bool {
    n.is_none_or(|n| n == 0)
}

fn is_zero(n: &u64) -> bool {
    *n == 0
}

fn is_false(b: &bool) -> bool {
    !b
}

#[cfg(test)]
mod tests {
    use super::*;

    fn album(name: &str, recent_plays: u64, play_counts: &[u64]) -> Album {
        Album {
            artist: "Artist".into(),
            album: name.into(),
            year: None,
            duration: 0,
            tracks: play_counts
                .iter()
                .map(|&c| Track {
                    title: "Track".into(),
                    artist: None,
                    track: None,
                    year: None,
                    duration: None,
                    disc_number: None,
                    play_count: Some(c),
                    starred: false,
                })
                .collect(),
            starred: false,
            recent_plays,
            cover: None,
        }
    }

    fn names<'a>(albums: &[&'a Album]) -> Vec<&'a str> {
        albums.iter().map(|a| a.album.as_str()).collect()
    }

    #[test]
    fn most_listened_orders_by_recent_then_lifetime() {
        let library = MusicLibrary {
            exported_at: Utc::now(),
            albums: vec![
                album("a", 3, &[1]),
                album("b", 0, &[100]),
                album("c", 5, &[1]),
                album("d", 3, &[10]),
            ],
        };
        assert!(library.has_recent_plays());
        assert_eq!(names(&library.most_listened(10)), ["c", "d", "a"]);
        assert_eq!(names(&library.most_listened(2)), ["c", "d"]);
    }

    #[test]
    fn most_listened_falls_back_to_lifetime() {
        let library = MusicLibrary {
            exported_at: Utc::now(),
            albums: vec![
                album("a", 0, &[1, 2]),
                album("b", 0, &[0]),
                album("c", 0, &[5]),
            ],
        };
        assert!(!library.has_recent_plays());
        assert_eq!(names(&library.most_listened(5)), ["c", "a"]);
    }

    #[test]
    fn anchors_are_readable_and_unique() {
        let mut albums = vec![
            album("EVO EVO", 0, &[]),
            album("Evo, Evo!", 0, &[]),
            album("白夢の繭", 0, &[]),
        ];
        albums[2].artist = "!!!".into();
        let library = MusicLibrary {
            exported_at: Utc::now(),
            albums,
        };
        let anchors = library.anchors();
        assert_eq!(anchors.album(0), "album-artist--evo-evo");
        assert_eq!(anchors.album(1), "album-artist--evo-evo-2");
        assert_eq!(anchors.album(2), "album-untitled--白夢の繭");
        assert_eq!(anchors.artist("Artist"), Some("artist-artist"));
        assert_eq!(anchors.artist("!!!"), Some("artist-untitled"));
        assert_eq!(anchors.artist("Nobody"), None);
    }

    #[test]
    fn round_trips_and_omits_defaults() {
        let library = MusicLibrary {
            exported_at: DateTime::parse_from_rfc3339("2026-09-28T12:00:00Z")
                .unwrap()
                .to_utc(),
            albums: vec![album("a", 0, &[0])],
        };
        let json = serde_json::to_string(&library).unwrap();
        assert_eq!(
            json,
            r#"{"exported_at":"2026-09-28T12:00:00Z","albums":[{"artist":"Artist","album":"a","duration":0,"tracks":[{"title":"Track"}]}]}"#
        );
        let reparsed: MusicLibrary = serde_json::from_str(&json).unwrap();
        assert_eq!(serde_json::to_string(&reparsed).unwrap(), json);
    }
}
