use std::{
    collections::HashMap,
    path::{Path, PathBuf},
};

use anyhow::Context;
use serde::{Deserialize, Serialize};

// ── Constants ────────────────────────────────────────────────────────────────

const BLUESKY_CACHE_PREFIX: &str = "bluesky-";
const BSKY_PUBLIC_API: &str = "https://public.api.bsky.app/xrpc";
const BSKY_WEB: &str = "https://bsky.app";

pub fn profile_url(did: &str) -> String {
    format!("{BSKY_WEB}/profile/{did}")
}

pub fn hashtag_url(tag: &str) -> String {
    format!("{BSKY_WEB}/hashtag/{tag}")
}

// ── Public types ─────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlueskyPostData {
    pub url: String,
    pub author_display_name: String,
    pub author_handle: String,
    pub author_avatar_filename: Option<String>,
    pub text: String,
    pub facets: Vec<Facet>,
    pub created_at: String,
    pub like_count: u64,
    pub reply_count: u64,
    pub repost_count: u64,
    pub quote_count: u64,
    pub fetched_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Facet {
    pub byte_start: usize,
    pub byte_end: usize,
    pub features: Vec<FacetFeature>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum FacetFeature {
    Link { uri: String },
    Mention { did: String },
    Tag { tag: String },
}

// ── Public functions ─────────────────────────────────────────────────────────

/// Returns true if the given path is a Bluesky cache JSON file that should be
/// excluded from the document's associated files list.
/// Avatar images use the same prefix but are *not* excluded — they need to be
/// copied to output so the rendered post can reference them.
pub fn is_cache_file(path: &Path) -> bool {
    path.file_name().is_some_and(|f| {
        let f = f.to_string_lossy();
        f.starts_with(BLUESKY_CACHE_PREFIX) && f.ends_with(".json")
    })
}

/// Given a list of (url, content_dir) pairs, ensures each post is cached.
/// Returns a map of URL → cached post data.
pub fn ensure_posts_cached(
    posts: &[(String, PathBuf)],
) -> anyhow::Result<HashMap<String, BlueskyPostData>> {
    let mut result = HashMap::new();
    for (url, content_dir) in posts {
        if result.contains_key(url) {
            continue;
        }

        let (_, rkey) = parse_bsky_url(url)?;
        let cache_file = cache_path(content_dir, rkey);

        let data = if cache_file.exists() {
            let json = std::fs::read_to_string(&cache_file)
                .with_context(|| format!("failed to read cache file {cache_file:?}"))?;
            serde_json::from_str(&json)
                .with_context(|| format!("failed to parse cache file {cache_file:?}"))?
        } else {
            let data = fetch_post(url, content_dir)?;
            let json = serde_json::to_string_pretty(&data)?;
            std::fs::write(&cache_file, &json)
                .with_context(|| format!("failed to write cache file {cache_file:?}"))?;
            data
        };

        result.insert(url.clone(), data);
    }
    Ok(result)
}

// ── Private helpers ──────────────────────────────────────────────────────────

/// Parses a bsky.app URL into (handle, rkey).
fn parse_bsky_url(url: &str) -> anyhow::Result<(&str, &str)> {
    // Expected format: https://bsky.app/profile/{handle}/post/{rkey}
    let path = url
        .strip_prefix(&profile_url(""))
        .with_context(|| format!("invalid Bluesky URL: {url}"))?;
    let (handle, rest) = path
        .split_once("/post/")
        .with_context(|| format!("invalid Bluesky URL: {url}"))?;
    Ok((handle, rest))
}

fn cache_path(content_dir: &Path, rkey: &str) -> PathBuf {
    content_dir.join(format!("{BLUESKY_CACHE_PREFIX}{rkey}.json"))
}

fn fetch_post(url: &str, content_dir: &Path) -> anyhow::Result<BlueskyPostData> {
    let (handle, rkey) = parse_bsky_url(url)?;

    let did = resolve_handle(handle)?;
    let at_uri = format!("at://{did}/app.bsky.feed.post/{rkey}");
    let post = get_post(url, &at_uri)?;

    let avatar_filename = match &post.author.avatar {
        Some(avatar_url) => match fetch_avatar(avatar_url, content_dir, &did) {
            Ok(filename) => Some(filename),
            Err(e) => {
                eprintln!("warning: failed to fetch avatar for {handle}: {e}");
                None
            }
        },
        None => None,
    };

    let facets = post
        .record
        .facets
        .unwrap_or_default()
        .into_iter()
        .map(|f| Facet {
            byte_start: f.index.byte_start,
            byte_end: f.index.byte_end,
            features: f
                .features
                .into_iter()
                .filter_map(|feat| match feat {
                    ApiFacetFeature::Link { uri } => Some(FacetFeature::Link { uri }),
                    ApiFacetFeature::Mention { did } => Some(FacetFeature::Mention { did }),
                    ApiFacetFeature::Tag { tag } => Some(FacetFeature::Tag { tag }),
                    ApiFacetFeature::Unknown => None,
                })
                .collect(),
        })
        .collect();

    Ok(BlueskyPostData {
        url: url.to_string(),
        author_display_name: post.author.display_name.unwrap_or_default(),
        author_handle: post.author.handle,
        author_avatar_filename: avatar_filename,
        text: post.record.text,
        facets,
        created_at: post.record.created_at,
        like_count: post.like_count.unwrap_or(0),
        reply_count: post.reply_count.unwrap_or(0),
        repost_count: post.repost_count.unwrap_or(0),
        quote_count: post.quote_count.unwrap_or(0),
        fetched_at: chrono::Utc::now().to_rfc3339(),
    })
}

/// `com.atproto.identity.resolveHandle` — resolves a handle to a DID.
fn resolve_handle(handle: &str) -> anyhow::Result<String> {
    #[derive(Deserialize)]
    struct Response {
        did: String,
    }

    let url = format!("{BSKY_PUBLIC_API}/com.atproto.identity.resolveHandle?handle={handle}");
    let response: Response = ureq::get(&url)
        .call()
        .with_context(|| format!("failed to resolve handle {handle}"))?
        .body_mut()
        .read_json()?;
    Ok(response.did)
}

/// `app.bsky.feed.getPosts` — fetches a single post by AT-URI.
fn get_post(display_url: &str, at_uri: &str) -> anyhow::Result<PostView> {
    #[derive(Deserialize)]
    struct Response {
        posts: Vec<PostView>,
    }

    let url = format!("{BSKY_PUBLIC_API}/app.bsky.feed.getPosts?uris={at_uri}");
    let response: Response = ureq::get(&url)
        .call()
        .with_context(|| format!("failed to fetch post {display_url}"))?
        .body_mut()
        .read_json()?;

    response
        .posts
        .into_iter()
        .next()
        .with_context(|| format!("no post returned for {display_url}"))
}

/// Fetches an avatar image, saves it to `content_dir`, and returns the filename.
fn fetch_avatar(avatar_url: &str, content_dir: &Path, did: &str) -> anyhow::Result<String> {
    const MAX_AVATAR_SIZE: u64 = 5 * 1024 * 1024; // 5 MB

    let response = ureq::get(avatar_url).call()?;
    let content_type = response
        .headers()
        .get("content-type")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("image/jpeg")
        .to_string();
    let ext = match content_type.as_str() {
        "image/png" => "png",
        "image/webp" => "webp",
        _ => "jpg",
    };
    let bytes = response
        .into_body()
        .with_config()
        .limit(MAX_AVATAR_SIZE)
        .read_to_vec()?;

    let sanitised_did = did.replace(':', "-");
    let filename = format!("{BLUESKY_CACHE_PREFIX}{sanitised_did}.{ext}");
    std::fs::write(content_dir.join(&filename), &bytes)?;
    Ok(filename)
}

// ── API response types for getPosts ──────────────────────────────────────────

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct PostView {
    author: PostAuthor,
    record: PostRecord,
    like_count: Option<u64>,
    reply_count: Option<u64>,
    repost_count: Option<u64>,
    quote_count: Option<u64>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct PostAuthor {
    handle: String,
    display_name: Option<String>,
    avatar: Option<String>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct PostRecord {
    text: String,
    created_at: String,
    facets: Option<Vec<ApiFacet>>,
}

#[derive(Deserialize)]
struct ApiFacet {
    index: ApiFacetIndex,
    features: Vec<ApiFacetFeature>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiFacetIndex {
    byte_start: usize,
    byte_end: usize,
}

#[derive(Deserialize)]
#[serde(tag = "$type")]
enum ApiFacetFeature {
    #[serde(rename = "app.bsky.richtext.facet#link")]
    Link { uri: String },
    #[serde(rename = "app.bsky.richtext.facet#mention")]
    Mention { did: String },
    #[serde(rename = "app.bsky.richtext.facet#tag")]
    Tag { tag: String },
    #[serde(other)]
    Unknown,
}
