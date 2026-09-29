//! The music library as exported by `music-export` and read by the site.
//!
//! The exporter writes a [`MusicLibrary`] to `assets/baked/music.json`; the SSG
//! reads it back for the `<MusicLibrary />` component and the front page.
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// The number of days before the export that count towards [`Album::recent_plays`].
pub const RECENT_PLAYS_DAYS: i64 = 30;

/// Where cover art is kept: a directory under `assets/baked/static`, and so
/// the same path from the site's root. [`Album::cover`] names a file in it.
pub const COVERS_DIR: &str = "music-covers";

/// How many albums the front page shows, and so how many have covers.
pub const MOST_LISTENED: usize = 5;

/// The whole exported library.
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct MusicLibrary {
    /// When the export was made. [`Album::recent_plays`] counts the
    /// [`RECENT_PLAYS_DAYS`] days before this.
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
    /// Scrobbles of this album's tracks in the [`RECENT_PLAYS_DAYS`] days
    /// before [`MusicLibrary::exported_at`].
    #[serde(skip_serializing_if = "is_zero", default)]
    pub recent_plays: u64,
    /// The file in [`COVERS_DIR`] holding the album's cover art. Only the
    /// albums the front page shows have one.
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub cover: Option<String>,
}

/// A single track of an [`Album`].
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
    /// Lifetime play count, as reported by the server.
    #[serde(skip_serializing_if = "is_optional_zero", default)]
    pub play_count: Option<u64>,
    #[serde(skip_serializing_if = "is_false", default)]
    pub starred: bool,
}

impl MusicLibrary {
    /// An empty library, for builds that skip reading the export.
    pub fn empty() -> Self {
        Self {
            exported_at: DateTime::<Utc>::UNIX_EPOCH,
            albums: vec![],
        }
    }

    /// Whether any album was played in the [`RECENT_PLAYS_DAYS`] before the export.
    pub fn has_recent_plays(&self) -> bool {
        self.albums.iter().any(|a| a.recent_plays > 0)
    }

    /// The `n` most listened albums: by [`Album::recent_plays`] (ties broken by
    /// lifetime plays), considering only albums played recently. If nothing was
    /// played recently, falls back to lifetime plays across the whole library;
    /// [`Self::has_recent_plays`] says which applies.
    pub fn most_listened(&self, n: usize) -> Vec<&Album> {
        let mut albums: Vec<&Album> = if self.has_recent_plays() {
            self.albums.iter().filter(|a| a.recent_plays > 0).collect()
        } else {
            self.albums.iter().filter(|a| a.play_count() > 0).collect()
        };
        // Stable sort, so equal albums keep library order.
        albums.sort_by_key(|a| std::cmp::Reverse((a.recent_plays, a.play_count())));
        albums.truncate(n);
        albums
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
