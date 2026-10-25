use std::{
    collections::{HashMap, HashSet},
    fs::OpenOptions,
    io::{Read, Write},
    path::{Path, PathBuf},
    time::Duration,
};

use anyhow::Context;
use reqwest::blocking::Client;
use serde::{Deserialize, Serialize};

/// Source-only post archives and their local media live beneath each source directory.
pub const ARCHIVE_DIRECTORY: &str = "_bluesky";

/// The archived fields of a post. Migrating a legacy archive edits the stored JSON in place, so
/// fields a newer version added survive it. Enriching a text-only cache writes this struct
/// instead, which keeps only the fields declared here.
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
    #[serde(default)]
    pub images: Vec<BlueskyImage>,
    #[serde(default)]
    pub video: Option<BlueskyVideo>,
    /// Zero identifies a text-only cache that still needs media enrichment.
    #[serde(default)]
    pub media_version: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct BlueskyImage {
    pub filename: String,
    pub alt: String,
    pub width: Option<u32>,
    pub height: Option<u32>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct BlueskyVideo {
    /// The remote playlist is streamed by the browser and is never downloaded.
    pub playlist: String,
    pub thumbnail: Option<BlueskyImage>,
    pub alt: String,
    pub width: Option<u32>,
    pub height: Option<u32>,
}

impl BlueskyPostData {
    /// Includes assets fetched after the document's associated files are collected.
    pub fn local_asset_filenames(&self) -> impl Iterator<Item = &str> {
        self.author_avatar_filename
            .as_deref()
            .into_iter()
            .chain(self.images.iter().map(|image| image.filename.as_str()))
            .chain(
                self.video
                    .iter()
                    .filter_map(|video| video.thumbnail.as_ref())
                    .map(|image| image.filename.as_str()),
            )
    }
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

pub fn profile_url(did: &str) -> String {
    format!("{BSKY_WEB}/profile/{did}")
}

pub fn hashtag_url(tag: &str) -> String {
    format!("{BSKY_WEB}/hashtag/{tag}")
}

/// Flat `bluesky-<rkey>.json` archives left by the previous layout are excluded from document
/// assets. Avatars, images and video posters are copied. Archive folders hold `post.json`, which
/// this does not match; those are excluded by their directory instead.
pub fn is_legacy_cache_file(path: &Path) -> bool {
    path.file_name().is_some_and(|f| {
        let f = f.to_string_lossy();
        f.starts_with(LEGACY_CACHE_PREFIX) && f.ends_with(".json")
    })
}

/// Ensures each (URL, content directory) has its own cache and local image assets.
/// Returns cached post data keyed by URL and content directory. Legacy caches receive media only.
pub fn ensure_posts_cached(
    posts: &[(String, PathBuf)],
) -> anyhow::Result<HashMap<(String, PathBuf), BlueskyPostData>> {
    let mut client = None;
    ensure_posts_cached_with(posts, |url, content_dir, cached| {
        if client.is_none() {
            client = Some(http_client()?);
        }
        let client = client.as_ref().expect("HTTP client was initialised");
        let (handle, rkey) = parse_bsky_url(url)?;
        let archive_dir = content_dir.join(ARCHIVE_DIRECTORY).join(rkey);
        let did = resolve_handle(client, handle)?;
        let at_uri = format!("at://{did}/app.bsky.feed.post/{rkey}");
        let mut post = get_post(client, url, &at_uri)?;
        let embed = post.embed.take();

        if let Some(mut cached) = cached {
            enrich_media(&mut cached, embed, |embed| {
                cache_media(client, embed, content_dir, rkey)
            })?;
            Ok(cached)
        } else {
            let media = cache_media(client, embed, content_dir, rkey)?;
            let avatar_filename = match &post.author.avatar {
                Some(avatar_url) => {
                    match fetch_image(client, avatar_url, &archive_dir, "avatar", MAX_AVATAR_SIZE) {
                        Ok(filename) => Some(asset_url(rkey, &filename)),
                        Err(error) => {
                            eprintln!("warning: failed to fetch avatar for {handle}: {error:#}");
                            None
                        }
                    }
                }
                None => None,
            };
            Ok(post_data(url, post, avatar_filename, media))
        }
    })
}

const LEGACY_CACHE_PREFIX: &str = "bluesky-";
const BSKY_PUBLIC_API: &str = "https://public.api.bsky.app/xrpc";
const BSKY_WEB: &str = "https://bsky.app";
const MEDIA_VERSION: u32 = 1;
const MAX_IMAGE_SIZE: u64 = 20 * 1024 * 1024;
const MAX_AVATAR_SIZE: u64 = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: [&str; 4] = ["jpg", "png", "webp", "gif"];

fn ensure_posts_cached_with(
    posts: &[(String, PathBuf)],
    mut fetch: impl FnMut(&str, &Path, Option<BlueskyPostData>) -> anyhow::Result<BlueskyPostData>,
) -> anyhow::Result<HashMap<(String, PathBuf), BlueskyPostData>> {
    // Finish every requested layout migration before any fetch can use the network.
    let mut migrations = Vec::new();
    let mut seen = HashSet::new();
    for (url, content_dir) in posts {
        let (_, rkey) = parse_bsky_url(url)?;
        if seen.insert((content_dir, rkey))
            && let Some(migration) = migrate_cache(content_dir, rkey).with_context(|| {
                format!("failed to migrate Bluesky post {url} in {content_dir:?}")
            })?
        {
            migrations.push(migration);
        }
    }

    let mut result = HashMap::new();
    for (url, content_dir) in posts {
        let key = (url.clone(), content_dir.clone());
        if result.contains_key(&key) {
            continue;
        }
        let (_, rkey) = parse_bsky_url(url)?;
        ensure_archive_directory(content_dir, rkey)?;
        let cache_file = cache_path(content_dir, rkey);
        let cached = if path_exists(&cache_file)? {
            let data = read_cache(&cache_file)?;
            validate_cache_assets(content_dir, rkey, &data)?;
            Some(data)
        } else {
            None
        };

        let data = match cached {
            Some(data) if data.media_version >= MEDIA_VERSION => data,
            cached => {
                let upgrading = cached.is_some();
                let data = match cached {
                    Some(mut cached) if !cached.images.is_empty() || cached.video.is_some() => {
                        cached.media_version = MEDIA_VERSION;
                        cached
                    }
                    cached => fetch(url, content_dir, cached).with_context(|| {
                        if upgrading {
                            format!("failed to enrich media for {url} in {content_dir:?}; archived cache is unchanged")
                        } else {
                            format!("failed to cache Bluesky post {url} in {content_dir:?}")
                        }
                    })?,
                };
                validate_cache_assets(content_dir, rkey, &data)?;
                write_cache(&cache_file, &data)?;
                data
            }
        };
        result.insert(key, data);
    }
    cleanup_legacy_archives(&migrations)?;
    Ok(result)
}

struct LegacyArchive {
    content_dir: PathBuf,
    rkey: String,
    original_json: Vec<u8>,
    /// Flat asset files the legacy cache referenced, relative to its source directory.
    legacy_paths: Vec<String>,
}

/// A legacy asset moving into its archive folder. `bytes` is absent when an earlier attempt
/// already wrote the target and stopped before removing the flat archive.
struct MigratedAsset {
    source: String,
    target: String,
    bytes: Option<Vec<u8>>,
}

fn migrate_cache(content_dir: &Path, rkey: &str) -> anyhow::Result<Option<LegacyArchive>> {
    let old_path = legacy_cache_path(content_dir, rkey);
    if !path_exists(&old_path)? {
        return Ok(None);
    }
    let original_json = read_regular_file(&old_path)?;
    let mut json: serde_json::Value = serde_json::from_slice(&original_json)
        .with_context(|| format!("failed to parse cache file {old_path:?}"))?;
    let data: BlueskyPostData = serde_json::from_value(json.clone())?;
    let archive_dir = ensure_archive_directory(content_dir, rkey)?;
    let mut assets = Vec::new();
    let mut prepare = |filename: &str, stem: &str| -> anyhow::Result<String> {
        let ext = asset_extension(filename)?;
        let target = format!("{stem}.{ext}");
        let target_path = archive_dir.join(&target);
        let source_path = content_dir.join(filename);
        let bytes = if path_exists(&source_path)? {
            let bytes = read_regular_file(&source_path)?;
            if path_exists(&target_path)? {
                anyhow::ensure!(
                    read_regular_file(&target_path)? == bytes,
                    "conflicting migration asset {target_path:?}"
                );
            }
            Some(bytes)
        } else {
            // An interrupted cleanup may have removed the flat copy after writing the target.
            anyhow::ensure!(
                path_exists(&target_path)?,
                "missing legacy asset {filename:?} in {content_dir:?}"
            );
            read_regular_file(&target_path)?;
            None
        };
        let url = asset_url(rkey, &target);
        assets.push(MigratedAsset {
            source: filename.to_owned(),
            target,
            bytes,
        });
        Ok(url)
    };
    if let Some(filename) = &data.author_avatar_filename {
        json["author_avatar_filename"] = prepare(filename, "avatar")?.into();
    }
    for (index, image) in data.images.iter().enumerate() {
        json["images"][index]["filename"] =
            prepare(&image.filename, &format!("image-{index}"))?.into();
    }
    if let Some(thumbnail) = data
        .video
        .as_ref()
        .and_then(|video| video.thumbnail.as_ref())
    {
        json["video"]["thumbnail"]["filename"] = prepare(&thumbnail.filename, "poster")?.into();
    }
    let path = cache_path(content_dir, rkey);
    if path_exists(&path)? {
        let existing: serde_json::Value = serde_json::from_slice(&read_regular_file(&path)?)
            .with_context(|| format!("failed to parse migrated cache {path:?}"))?;
        anyhow::ensure!(
            archives_agree(&existing, &json),
            "conflicting migration cache {path:?}: it holds different archived data; remove \
             the flat archive or this file to choose which one to keep"
        );
    }
    for asset in &assets {
        if let Some(bytes) = &asset.bytes {
            write_asset(&archive_dir.join(&asset.target), bytes)?;
        }
    }
    if !path_exists(&path)? {
        write_cache(&path, &json)?;
    }
    validate_cache_assets(content_dir, rkey, &read_cache(&path)?)?;
    Ok(Some(LegacyArchive {
        content_dir: content_dir.to_owned(),
        rkey: rkey.to_owned(),
        original_json,
        legacy_paths: assets.into_iter().map(|asset| asset.source).collect(),
    }))
}

/// True when an existing archive holds the migrated archive's values. A build interrupted
/// between migrating and cleaning up can leave the same archive rewritten with media, so an
/// enrichment step's changes to the media fields are tolerated; media the legacy archive
/// already carried must still match.
fn archives_agree(existing: &serde_json::Value, migrated: &serde_json::Value) -> bool {
    let (mut existing, mut migrated) = (existing.clone(), migrated.clone());
    if !has_media(&migrated) {
        for value in [&mut existing, &mut migrated] {
            if let serde_json::Value::Object(object) = value {
                object.remove("images");
                object.remove("video");
            }
        }
    }
    for value in [&mut existing, &mut migrated] {
        if let serde_json::Value::Object(object) = value {
            object.remove("media_version");
        }
    }
    without_nulls(existing) == without_nulls(migrated)
}

/// A field one writer omits and another writes as `null` describes the same archive.
fn without_nulls(value: serde_json::Value) -> serde_json::Value {
    match value {
        serde_json::Value::Object(object) => serde_json::Value::Object(
            object
                .into_iter()
                .filter(|(_, value)| !value.is_null())
                .map(|(key, value)| (key, without_nulls(value)))
                .collect(),
        ),
        serde_json::Value::Array(items) => {
            serde_json::Value::Array(items.into_iter().map(without_nulls).collect())
        }
        value => value,
    }
}

fn has_media(json: &serde_json::Value) -> bool {
    json.get("images")
        .and_then(serde_json::Value::as_array)
        .is_some_and(|images| !images.is_empty())
        || json.get("video").is_some_and(|video| !video.is_null())
}

fn cleanup_legacy_archives(migrations: &[LegacyArchive]) -> anyhow::Result<()> {
    let completed: HashSet<_> = migrations
        .iter()
        .map(|migration| legacy_cache_path(&migration.content_dir, &migration.rkey))
        .collect();
    let mut candidates = HashSet::new();
    let mut remaining = HashSet::new();
    let mut keep_directories = HashSet::new();
    let mut directories = HashSet::new();
    // Inspect all remaining flat archives before removing anything, including shared avatars.
    for migration in migrations {
        let old_path = legacy_cache_path(&migration.content_dir, &migration.rkey);
        anyhow::ensure!(
            read_regular_file(&old_path)? == migration.original_json,
            "legacy archive changed during migration: {old_path:?}"
        );
        validate_cache_assets(
            &migration.content_dir,
            &migration.rkey,
            &read_cache(&cache_path(&migration.content_dir, &migration.rkey))?,
        )?;
        candidates.extend(
            migration
                .legacy_paths
                .iter()
                .map(|name| migration.content_dir.join(name)),
        );
        if directories.insert(&migration.content_dir) {
            for entry in std::fs::read_dir(&migration.content_dir)? {
                let path = entry?.path();
                if is_legacy_cache_file(&path)
                    && !completed.contains(&path)
                    && !remaining_assets(&path, &migration.content_dir, &mut remaining)
                {
                    keep_directories.insert(migration.content_dir.clone());
                }
            }
        }
    }
    let keep = |path: &Path| {
        path.parent()
            .is_some_and(|parent| keep_directories.contains(parent))
    };
    // Assets go first. A failure then leaves the flat archive in place, and the next build
    // picks the cleanup up again instead of orphaning assets nothing refers to.
    let mut failure = None;
    for path in candidates.difference(&remaining) {
        if !keep(path)
            && let Err(error) = remove_migrated_file(path)
        {
            failure.get_or_insert(error);
        }
    }
    if failure.is_none() {
        for path in completed {
            if !keep(&path)
                && let Err(error) = remove_migrated_file(&path)
            {
                failure.get_or_insert(error);
            }
        }
    }
    failure.map_or(Ok(()), Err)
}

/// Records the assets a flat archive that is not being migrated still references. Returns
/// false when the archive cannot be attributed, so its directory keeps its legacy assets.
fn remaining_assets(path: &Path, content_dir: &Path, remaining: &mut HashSet<PathBuf>) -> bool {
    let data = match read_cache(path) {
        Ok(data) => data,
        Err(error) => {
            eprintln!("warning: keeping this folder's legacy Bluesky assets: {error:#}");
            return false;
        }
    };
    for name in data.local_asset_filenames() {
        if let Err(error) = asset_extension(name) {
            eprintln!("warning: keeping this folder's legacy Bluesky assets: {error:#}");
            return false;
        }
        remaining.insert(content_dir.join(name));
    }
    true
}

/// Removal is idempotent: a file an earlier attempt already deleted is not a failure.
fn remove_migrated_file(path: &Path) -> anyhow::Result<()> {
    match std::fs::remove_file(path) {
        Ok(()) => Ok(()),
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => Ok(()),
        Err(error) => {
            Err(error).with_context(|| format!("failed to remove migrated legacy file {path:?}"))
        }
    }
}

fn read_cache(path: &Path) -> anyhow::Result<BlueskyPostData> {
    serde_json::from_slice(&read_regular_file(path)?)
        .with_context(|| format!("failed to parse cache file {path:?}"))
}

fn path_exists(path: &Path) -> anyhow::Result<bool> {
    match std::fs::symlink_metadata(path) {
        Ok(_) => Ok(true),
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => Ok(false),
        Err(error) => Err(error).with_context(|| format!("failed to inspect {path:?}")),
    }
}

fn read_regular_file(path: &Path) -> anyhow::Result<Vec<u8>> {
    anyhow::ensure!(
        std::fs::symlink_metadata(path)
            .with_context(|| format!("failed to inspect {path:?}"))?
            .is_file(),
        "not a regular archive file: {path:?}"
    );
    std::fs::read(path).with_context(|| format!("failed to read archive file {path:?}"))
}

fn ensure_archive_directory(content_dir: &Path, rkey: &str) -> anyhow::Result<PathBuf> {
    let mut path = content_dir.to_owned();
    for component in [ARCHIVE_DIRECTORY, rkey] {
        path.push(component);
        match std::fs::create_dir(&path) {
            Ok(()) => {}
            Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => {
                anyhow::ensure!(
                    std::fs::symlink_metadata(&path)?.is_dir(),
                    "not an archive directory: {path:?}"
                );
            }
            Err(error) => return Err(error).with_context(|| format!("failed to create {path:?}")),
        }
    }
    Ok(path)
}

fn asset_extension(filename: &str) -> anyhow::Result<&str> {
    anyhow::ensure!(
        !filename.is_empty()
            && filename
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || matches!(c, b'.' | b'-' | b'_' | b'~')),
        "unsafe archive asset filename: {filename}"
    );
    let (stem, ext) = filename
        .rsplit_once('.')
        .context("archive asset has no extension")?;
    anyhow::ensure!(
        !stem.is_empty() && stem != "." && stem != ".." && IMAGE_EXTENSIONS.contains(&ext),
        "unsupported archive asset filename: {filename}"
    );
    Ok(ext)
}

fn asset_url(rkey: &str, filename: &str) -> String {
    format!("{ARCHIVE_DIRECTORY}/{rkey}/{filename}")
}

fn validate_cache_assets(
    content_dir: &Path,
    rkey: &str,
    data: &BlueskyPostData,
) -> anyhow::Result<()> {
    for filename in data.local_asset_filenames() {
        let local = filename
            .strip_prefix(&format!("{ARCHIVE_DIRECTORY}/{rkey}/"))
            .with_context(|| format!("unsafe archive asset path: {filename}"))?;
        asset_extension(local)?;
        read_regular_file(&content_dir.join(filename))?;
    }
    Ok(())
}

fn write_asset(path: &Path, bytes: &[u8]) -> anyhow::Result<()> {
    match OpenOptions::new().write(true).create_new(true).open(path) {
        Ok(mut file) => {
            if let Err(error) = file.write_all(bytes).and_then(|()| file.sync_all()) {
                drop(file);
                let _ = std::fs::remove_file(path);
                return Err(error).with_context(|| format!("failed to write image {path:?}"));
            }
        }
        Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => {
            anyhow::ensure!(
                read_regular_file(path)? == bytes,
                "conflicting archive asset {path:?}"
            );
        }
        Err(error) => {
            return Err(error).with_context(|| format!("failed to create image {path:?}"));
        }
    }
    Ok(())
}

fn write_cache(path: &Path, data: &impl Serialize) -> anyhow::Result<()> {
    use std::sync::atomic::{AtomicU64, Ordering};

    static NEXT_FILE: AtomicU64 = AtomicU64::new(0);
    let json = serde_json::to_vec_pretty(data)?;
    let (temporary_path, mut file) = loop {
        let temporary_path = path.with_extension(format!(
            "json.{}-{}.tmp",
            std::process::id(),
            NEXT_FILE.fetch_add(1, Ordering::Relaxed)
        ));
        match OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&temporary_path)
        {
            Ok(file) => break (temporary_path, file),
            Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => continue,
            Err(error) => {
                return Err(error).with_context(|| {
                    format!("failed to create temporary cache {temporary_path:?}")
                });
            }
        }
    };
    let result = (|| {
        file.write_all(&json)?;
        file.sync_all()?;
        drop(file);
        std::fs::rename(&temporary_path, path)
    })();
    if result.is_err() {
        let _ = std::fs::remove_file(&temporary_path);
    }
    result.with_context(|| format!("failed to replace cache file {path:?}"))
}

fn http_client() -> anyhow::Result<Client> {
    Client::builder()
        .connect_timeout(Duration::from_secs(10))
        .timeout(Duration::from_secs(60))
        .build()
        .context("failed to construct Bluesky HTTP client")
}

/// Parses a bsky.app URL into (handle, rkey), both safe for query and file names.
fn parse_bsky_url(url: &str) -> anyhow::Result<(&str, &str)> {
    let path = url
        .strip_prefix(&profile_url(""))
        .with_context(|| format!("invalid Bluesky URL: {url}"))?;
    let (handle, rkey) = path
        .split_once("/post/")
        .with_context(|| format!("invalid Bluesky URL: {url}"))?;
    anyhow::ensure!(
        !handle.is_empty()
            && handle
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || matches!(c, b'.' | b'-' | b':' | b'_'))
            && !rkey.is_empty()
            && rkey != "."
            && rkey != ".."
            && rkey
                .bytes()
                .all(|c| c.is_ascii_alphanumeric() || matches!(c, b'.' | b'-' | b'_' | b'~')),
        "invalid Bluesky URL: {url}"
    );
    Ok((handle, rkey))
}

fn cache_path(content_dir: &Path, rkey: &str) -> PathBuf {
    content_dir
        .join(ARCHIVE_DIRECTORY)
        .join(rkey)
        .join("post.json")
}

fn legacy_cache_path(content_dir: &Path, rkey: &str) -> PathBuf {
    content_dir.join(format!("{LEGACY_CACHE_PREFIX}{rkey}.json"))
}

/// Resolves a handle to a DID. DID-based post URLs need no resolution.
fn resolve_handle(client: &Client, handle: &str) -> anyhow::Result<String> {
    if handle.starts_with("did:") {
        return Ok(handle.to_string());
    }
    #[derive(Deserialize)]
    struct Response {
        did: String,
    }

    let response: Response = client
        .get(format!(
            "{BSKY_PUBLIC_API}/com.atproto.identity.resolveHandle"
        ))
        .query(&[("handle", handle)])
        .send()
        .with_context(|| format!("failed to resolve handle {handle}"))?
        .error_for_status()?
        .json()?;
    Ok(response.did)
}

/// Fetches a single post by AT-URI.
fn get_post(client: &Client, display_url: &str, at_uri: &str) -> anyhow::Result<PostView> {
    #[derive(Deserialize)]
    struct Response {
        posts: Vec<PostView>,
    }

    let response: Response = client
        .get(format!("{BSKY_PUBLIC_API}/app.bsky.feed.getPosts"))
        .query(&[("uris", at_uri)])
        .send()
        .with_context(|| format!("failed to fetch post {display_url}"))?
        .error_for_status()?
        .json()?;

    response
        .posts
        .into_iter()
        .next()
        .with_context(|| format!("no post returned for {display_url}"))
}

/// Only media fields change during an upgrade. Failed downloads leave the version unchanged.
fn enrich_media(
    cached: &mut BlueskyPostData,
    embed: Option<ApiEmbed>,
    cache: impl FnOnce(Option<ApiEmbed>) -> anyhow::Result<CachedMedia>,
) -> anyhow::Result<()> {
    if cached.media_version >= MEDIA_VERSION {
        return Ok(());
    }
    if !cached.images.is_empty() || cached.video.is_some() {
        cached.media_version = MEDIA_VERSION;
        return Ok(());
    }
    let media = cache(embed)?;
    if cached.images.is_empty() {
        cached.images = media.images;
    }
    if cached.video.is_none() {
        cached.video = media.video;
    }
    cached.media_version = MEDIA_VERSION;
    Ok(())
}

#[derive(Default)]
struct CachedMedia {
    images: Vec<BlueskyImage>,
    video: Option<BlueskyVideo>,
}

fn cache_media(
    client: &Client,
    embed: Option<ApiEmbed>,
    content_dir: &Path,
    rkey: &str,
) -> anyhow::Result<CachedMedia> {
    let archive_dir = ensure_archive_directory(content_dir, rkey)?;
    cache_media_with(embed, |url, stem| {
        fetch_image(client, url, &archive_dir, stem, MAX_IMAGE_SIZE)
            .map(|filename| asset_url(rkey, &filename))
    })
}

fn cache_media_with(
    embed: Option<ApiEmbed>,
    mut fetch: impl FnMut(&str, &str) -> anyhow::Result<String>,
) -> anyhow::Result<CachedMedia> {
    let media = match embed {
        Some(ApiEmbed::Images { images }) => ApiMedia::Images { images },
        Some(ApiEmbed::Video(video)) => ApiMedia::Video(video),
        Some(ApiEmbed::RecordWithMedia { media }) => media,
        Some(ApiEmbed::Unknown) | None => ApiMedia::Unknown,
    };
    match media {
        ApiMedia::Images { images } => {
            let images = images
                .into_iter()
                .enumerate()
                .map(|(index, image)| {
                    let filename = fetch(&image.fullsize, &format!("image-{index}"))
                        .with_context(|| format!("failed to cache attached image {}", index + 1))?;
                    let (width, height) = dimensions(image.aspect_ratio);
                    Ok(BlueskyImage {
                        filename,
                        alt: image.alt,
                        width,
                        height,
                    })
                })
                .collect::<anyhow::Result<_>>()?;
            Ok(CachedMedia {
                images,
                video: None,
            })
        }
        ApiMedia::Video(video) => {
            let (width, height) = dimensions(video.aspect_ratio);
            let thumbnail = video
                .thumbnail
                .map(|url| {
                    Ok::<_, anyhow::Error>(BlueskyImage {
                        filename: fetch(&url, "poster")
                            .context("failed to cache video thumbnail")?,
                        alt: video.alt.clone(),
                        width,
                        height,
                    })
                })
                .transpose()?;
            Ok(CachedMedia {
                images: Vec::new(),
                video: Some(BlueskyVideo {
                    playlist: video.playlist,
                    thumbnail,
                    alt: video.alt,
                    width,
                    height,
                }),
            })
        }
        ApiMedia::Unknown => Ok(CachedMedia::default()),
    }
}

fn dimensions(aspect_ratio: Option<ApiAspectRatio>) -> (Option<u32>, Option<u32>) {
    aspect_ratio
        .map(|ratio| (Some(ratio.width), Some(ratio.height)))
        .unwrap_or_default()
}

/// Fetches only allowlisted image MIME types and reads at most limit + 1 bytes.
fn fetch_image(
    client: &Client,
    url: &str,
    archive_dir: &Path,
    stem: &str,
    limit: u64,
) -> anyhow::Result<String> {
    asset_extension(&format!("{stem}.jpg"))?;
    for ext in IMAGE_EXTENSIONS {
        let filename = format!("{stem}.{ext}");
        let path = archive_dir.join(&filename);
        if path_exists(&path)? {
            read_regular_file(&path)?;
            return Ok(filename);
        }
    }

    let response = client
        .get(url)
        .send()
        .with_context(|| format!("failed to fetch image {url}"))?
        .error_for_status()
        .with_context(|| format!("failed to fetch image {url}"))?;
    let content_type = response
        .headers()
        .get(reqwest::header::CONTENT_TYPE)
        .context("image response has no Content-Type")?
        .to_str()
        .context("invalid image Content-Type")?;
    // Bluesky's video CDN serves some JPEG posters as application/octet-stream.
    let binary = content_type
        .split(';')
        .next()
        .unwrap_or("")
        .trim()
        .eq_ignore_ascii_case("application/octet-stream");
    let declared_extension = (!binary)
        .then(|| image_extension(content_type))
        .transpose()?;
    anyhow::ensure!(
        response.content_length().is_none_or(|len| len <= limit),
        "image at {url} exceeds {limit} bytes"
    );
    let bytes =
        read_image_body(response, limit).with_context(|| format!("failed to read image {url}"))?;
    let ext = match declared_extension {
        Some(ext) => ext,
        None => image_signature_extension(&bytes)?,
    };
    let filename = format!("{stem}.{ext}");
    let path = archive_dir.join(&filename);
    write_asset(&path, &bytes)?;
    Ok(filename)
}

fn image_extension(content_type: &str) -> anyhow::Result<&'static str> {
    let mime = content_type.split(';').next().unwrap_or("").trim();
    match mime.to_ascii_lowercase().as_str() {
        "image/jpeg" => Ok("jpg"),
        "image/png" => Ok("png"),
        "image/webp" => Ok("webp"),
        "image/gif" => Ok("gif"),
        _ => anyhow::bail!("unsupported image Content-Type: {content_type}"),
    }
}

fn image_signature_extension(bytes: &[u8]) -> anyhow::Result<&'static str> {
    if bytes.starts_with(&[0xff, 0xd8, 0xff]) {
        Ok("jpg")
    } else if bytes.starts_with(b"\x89PNG\r\n\x1a\n") {
        Ok("png")
    } else if bytes.starts_with(b"GIF87a") || bytes.starts_with(b"GIF89a") {
        Ok("gif")
    } else if bytes.starts_with(b"RIFF") && bytes.get(8..12) == Some(b"WEBP") {
        Ok("webp")
    } else {
        anyhow::bail!("binary image response has no supported image signature")
    }
}

fn read_image_body(reader: impl Read, limit: u64) -> anyhow::Result<Vec<u8>> {
    let mut bytes = Vec::new();
    reader.take(limit + 1).read_to_end(&mut bytes)?;
    anyhow::ensure!(bytes.len() as u64 <= limit, "image exceeds {limit} bytes");
    anyhow::ensure!(!bytes.is_empty(), "image response is empty");
    Ok(bytes)
}

fn post_data(
    url: &str,
    post: PostView,
    avatar_filename: Option<String>,
    media: CachedMedia,
) -> BlueskyPostData {
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

    BlueskyPostData {
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
        images: media.images,
        video: media.video,
        media_version: MEDIA_VERSION,
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct PostView {
    author: PostAuthor,
    record: PostRecord,
    like_count: Option<u64>,
    reply_count: Option<u64>,
    repost_count: Option<u64>,
    quote_count: Option<u64>,
    embed: Option<ApiEmbed>,
}

#[derive(Deserialize)]
#[serde(tag = "$type")]
enum ApiEmbed {
    #[serde(rename = "app.bsky.embed.images#view")]
    Images { images: Vec<ApiImage> },
    #[serde(rename = "app.bsky.embed.video#view")]
    Video(ApiVideo),
    #[serde(rename = "app.bsky.embed.recordWithMedia#view")]
    RecordWithMedia { media: ApiMedia },
    #[serde(other)]
    Unknown,
}

#[derive(Deserialize)]
#[serde(tag = "$type")]
enum ApiMedia {
    #[serde(rename = "app.bsky.embed.images#view")]
    Images { images: Vec<ApiImage> },
    #[serde(rename = "app.bsky.embed.video#view")]
    Video(ApiVideo),
    #[serde(other)]
    Unknown,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiImage {
    fullsize: String,
    #[serde(default)]
    alt: String,
    aspect_ratio: Option<ApiAspectRatio>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiVideo {
    playlist: String,
    thumbnail: Option<String>,
    #[serde(default)]
    alt: String,
    aspect_ratio: Option<ApiAspectRatio>,
}

#[derive(Deserialize)]
struct ApiAspectRatio {
    width: u32,
    height: u32,
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

#[cfg(test)]
mod tests {
    use std::{
        io::Cursor,
        net::TcpListener,
        sync::atomic::{AtomicUsize, Ordering},
        thread,
    };

    use serde_json::{Value, json};

    use super::*;

    const POST_URL: &str = "https://bsky.app/profile/example.test/post/3test";

    fn old_cache_json() -> Value {
        json!({
            "url": POST_URL,
            "author_display_name": "Archived author",
            "author_handle": "example.test",
            "author_avatar_filename": "bluesky-did-plc-test.jpg",
            "text": "Archived post text",
            "facets": [{
                "byte_start": 0,
                "byte_end": 8,
                "features": [{"Link": {"uri": "https://example.test/archived"}}]
            }],
            "created_at": "2025-01-01T00:00:00Z",
            "like_count": 7,
            "reply_count": 3,
            "repost_count": 2,
            "quote_count": 1,
            "fetched_at": "2025-01-02T00:00:00Z"
        })
    }

    fn old_cache() -> BlueskyPostData {
        serde_json::from_value(old_cache_json()).unwrap()
    }

    fn archive_cache() -> BlueskyPostData {
        let mut cached = old_cache();
        cached.author_avatar_filename = Some(asset_url("3test", "avatar.jpg"));
        cached
    }

    fn save_archive(dir: &Path, cached: &BlueskyPostData) -> PathBuf {
        ensure_archive_directory(dir, "3test").unwrap();
        for name in cached.local_asset_filenames() {
            std::fs::write(dir.join(name), name.as_bytes()).unwrap();
        }
        let path = cache_path(dir, "3test");
        write_cache(&path, cached).unwrap();
        path
    }

    fn flat_cache(dir: &Path, rkey: &str, image: bool) -> Value {
        let mut json = old_cache_json();
        json["url"] = POST_URL.replace("3test", rkey).into();
        json["media_version"] = MEDIA_VERSION.into();
        json["images"] = if image {
            json!([{
                "filename": format!("bluesky-{rkey}-0.webp"),
                "alt": "Preserved image alt",
                "width": 1234,
                "height": 567
            }])
        } else {
            json!([])
        };
        json["video"] = json!({
            "playlist": "https://video.test/preserved.m3u8",
            "thumbnail": {
                "filename": format!("bluesky-{rkey}-poster.png"),
                "alt": "Preserved poster alt",
                "width": 1920,
                "height": 1080
            },
            "alt": "Preserved video alt",
            "width": 1920,
            "height": 1080
        });
        json["fetched_at"] = "2025-01-02T01:02:03.123456789+00:00".into();
        json["future_archive_field"] = json!({"nested": [null, true, 123, "unchanged"]});
        let cached: BlueskyPostData = serde_json::from_value(json.clone()).unwrap();
        for filename in cached.local_asset_filenames() {
            std::fs::write(dir.join(filename), format!("original bytes: {filename}\0")).unwrap();
        }
        write_cache(&legacy_cache_path(dir, rkey), &json).unwrap();
        json
    }

    /// A cache from before media support: no images, no video and no media version, so the
    /// build that migrates it also upgrades it.
    fn flat_text_only_cache(dir: &Path, rkey: &str) -> Value {
        let mut json = old_cache_json();
        json["url"] = POST_URL.replace("3test", rkey).into();
        json["images"] = json!([]);
        json["video"] = Value::Null;
        let cached: BlueskyPostData = serde_json::from_value(json.clone()).unwrap();
        for filename in cached.local_asset_filenames() {
            std::fs::write(dir.join(filename), format!("original bytes: {filename}\0")).unwrap();
        }
        write_cache(&legacy_cache_path(dir, rkey), &json).unwrap();
        json
    }

    fn image_embed() -> Value {
        json!({
            "$type": "app.bsky.embed.images#view",
            "images": [
                {
                    "thumb": "https://media.test/small.jpg",
                    "fullsize": "https://media.test/full.png",
                    "alt": "An image with descriptive text",
                    "aspectRatio": {"width": 1600, "height": 900}
                },
                {
                    "fullsize": "https://media.test/second.gif",
                    "alt": "Second image"
                }
            ]
        })
    }

    fn video_embed() -> Value {
        json!({
            "$type": "app.bsky.embed.video#view",
            "cid": "test-cid",
            "playlist": "https://video.test/stream/playlist.m3u8",
            "thumbnail": "https://media.test/poster.jpg",
            "alt": "Video description",
            "aspectRatio": {"width": 1920, "height": 1080}
        })
    }

    fn wrapped_embed(media: Value) -> Value {
        json!({
            "$type": "app.bsky.embed.recordWithMedia#view",
            "media": media,
            "record": {
                "$type": "app.bsky.embed.record#view",
                "record": {"arbitraryQuotedPost": "ignored"}
            }
        })
    }

    fn post_view(embed: Value) -> PostView {
        serde_json::from_value(json!({
            "uri": "at://did:plc:test/app.bsky.feed.post/3test",
            "author": {"handle": "changed.test", "displayName": "Current author"},
            "record": {
                "text": "Current text must not replace the archive",
                "createdAt": "2025-02-01T00:00:00Z"
            },
            "likeCount": 999,
            "embed": embed
        }))
        .unwrap()
    }

    struct TestDir(PathBuf);

    impl TestDir {
        fn new() -> Self {
            static NEXT_DIR: AtomicUsize = AtomicUsize::new(0);
            let path = std::env::temp_dir().join(format!(
                "paxsite-bluesky-test-{}-{}-{}",
                std::process::id(),
                chrono::Utc::now().timestamp_nanos_opt().unwrap(),
                NEXT_DIR.fetch_add(1, Ordering::Relaxed)
            ));
            std::fs::create_dir(&path).unwrap();
            Self(path)
        }
    }

    impl Drop for TestDir {
        fn drop(&mut self) {
            let _ = std::fs::remove_dir_all(&self.0);
        }
    }

    fn serve_once(response: String) -> (String, thread::JoinHandle<()>) {
        let listener = TcpListener::bind("127.0.0.1:0").unwrap();
        let url = format!("http://{}/image", listener.local_addr().unwrap());
        let thread = thread::spawn(move || {
            let (mut stream, _) = listener.accept().unwrap();
            stream
                .set_read_timeout(Some(Duration::from_secs(5)))
                .unwrap();
            let mut request = Vec::new();
            let mut byte = [0];
            while stream.read_exact(&mut byte).is_ok() {
                request.push(byte[0]);
                if request.ends_with(b"\r\n\r\n") {
                    break;
                }
            }
            let _ = stream.write_all(response.as_bytes());
        });
        (url, thread)
    }

    fn test_client() -> Client {
        Client::builder()
            .no_proxy()
            .timeout(Duration::from_secs(5))
            .build()
            .unwrap()
    }

    #[test]
    fn direct_and_wrapped_images_preserve_metadata_and_fetch_fullsize() {
        for embed in [image_embed(), wrapped_embed(image_embed())] {
            let mut fetched = Vec::new();
            let media = cache_media_with(post_view(embed).embed, |url, stem| {
                fetched.push(url.to_owned());
                Ok(asset_url("3test", &format!("{stem}.png")))
            })
            .unwrap();
            assert_eq!(
                fetched,
                [
                    "https://media.test/full.png",
                    "https://media.test/second.gif"
                ]
            );
            assert_eq!(media.images.len(), 2);
            assert_eq!(
                media.images[0],
                BlueskyImage {
                    filename: "_bluesky/3test/image-0.png".into(),
                    alt: "An image with descriptive text".into(),
                    width: Some(1600),
                    height: Some(900)
                }
            );
            assert_eq!(media.images[1].alt, "Second image");
            assert_eq!(media.images[1].width, None);
            assert_eq!(media.images[1].height, None);
            assert!(media.video.is_none());
        }
    }

    #[test]
    fn direct_and_wrapped_videos_fetch_only_thumbnail() {
        for embed in [video_embed(), wrapped_embed(video_embed())] {
            let mut fetched = Vec::new();
            let media = cache_media_with(post_view(embed).embed, |url, stem| {
                assert_eq!(stem, "poster");
                fetched.push(url.to_owned());
                Ok(asset_url("3test", "poster.jpg"))
            })
            .unwrap();
            assert_eq!(fetched, ["https://media.test/poster.jpg"]);
            assert!(media.images.is_empty());
            let video = media.video.unwrap();
            assert_eq!(video.playlist, "https://video.test/stream/playlist.m3u8");
            assert_eq!(video.alt, "Video description");
            assert_eq!((video.width, video.height), (Some(1920), Some(1080)));
            let thumbnail = video.thumbnail.unwrap();
            assert_eq!(thumbnail.filename, "_bluesky/3test/poster.jpg");
            assert_eq!(thumbnail.alt, "Video description");
            assert_eq!(
                (thumbnail.width, thumbnail.height),
                (Some(1920), Some(1080))
            );
        }
    }

    #[test]
    fn video_without_thumbnail_or_optional_metadata_never_fetches() {
        let embed = json!({
            "$type": "app.bsky.embed.video#view",
            "playlist": "https://video.test/playlist.m3u8"
        });
        let media = cache_media_with(post_view(embed).embed, |_, _| {
            panic!("playlist must not be downloaded")
        })
        .unwrap();
        let video = media.video.unwrap();
        assert!(video.thumbnail.is_none());
        assert!(video.alt.is_empty());
        assert_eq!((video.width, video.height), (None, None));
    }

    #[test]
    fn unknown_and_quote_embeds_are_ignored() {
        for embed in [
            Value::Null,
            json!({"$type": "app.bsky.embed.future#view", "unknown": {"nested": true}}),
            json!({"$type": "app.bsky.embed.record#view", "record": image_embed()}),
            wrapped_embed(json!({"$type": "app.bsky.embed.future#view"})),
        ] {
            let media = cache_media_with(post_view(embed).embed, |_, _| {
                panic!("unknown and quoted embeds must not fetch assets")
            })
            .unwrap();
            assert!(media.images.is_empty());
            assert!(media.video.is_none());
        }
    }

    #[test]
    fn old_cache_defaults_and_enrichment_preserve_archived_fields() {
        let mut cached = old_cache();
        assert_eq!(cached.media_version, 0);
        assert!(cached.images.is_empty());
        assert!(cached.video.is_none());
        enrich_media(
            &mut cached,
            post_view(wrapped_embed(image_embed())).embed,
            |embed| {
                cache_media_with(embed, |_, stem| {
                    Ok(asset_url("3test", &format!("{stem}.png")))
                })
            },
        )
        .unwrap();
        assert_eq!(cached.media_version, MEDIA_VERSION);
        assert_eq!(cached.images.len(), 2);
        let mut enriched = serde_json::to_value(&cached).unwrap();
        for field in ["images", "video", "media_version"] {
            enriched.as_object_mut().unwrap().remove(field);
        }
        assert_eq!(enriched, old_cache_json());

        enrich_media(&mut cached, None, |_| panic!("upgraded cache refetched")).unwrap();
        let roundtrip: BlueskyPostData =
            serde_json::from_str(&serde_json::to_string(&cached).unwrap()).unwrap();
        assert_eq!(roundtrip.images, cached.images);
    }

    #[test]
    fn failed_enrichment_leaves_all_cached_fields_unchanged() {
        let mut cached = old_cache();
        let before = serde_json::to_value(&cached).unwrap();
        let error =
            enrich_media(&mut cached, None, |_| anyhow::bail!("image unavailable")).unwrap_err();
        assert!(error.to_string().contains("image unavailable"));
        assert_eq!(serde_json::to_value(&cached).unwrap(), before);
    }

    #[test]
    fn no_media_cache_is_still_marked_upgraded() {
        let mut cached = old_cache();
        enrich_media(&mut cached, None, |embed| {
            cache_media_with(embed, |_, _| panic!("post has no attached media"))
        })
        .unwrap();
        assert_eq!(cached.media_version, MEDIA_VERSION);
        assert!(cached.images.is_empty());
        assert!(cached.video.is_none());
        enrich_media(&mut cached, None, |_| {
            panic!("text-only post upgraded twice")
        })
        .unwrap();
    }

    #[test]
    fn enrichment_preserves_existing_media_metadata() {
        let mut cached = old_cache();
        cached.images.push(BlueskyImage {
            filename: "archived.png".into(),
            alt: "Archived alt".into(),
            width: Some(12),
            height: Some(34),
        });
        let images = cached.images.clone();
        enrich_media(&mut cached, post_view(image_embed()).embed, |_| {
            panic!("existing media must not be downloaded again")
        })
        .unwrap();
        assert_eq!(cached.images, images);
    }

    #[test]
    fn local_asset_filenames_include_avatar_images_and_video_poster() {
        let mut cached = archive_cache();
        cached.images = cache_media_with(post_view(image_embed()).embed, |_, stem| {
            Ok(asset_url("3test", &format!("{stem}.png")))
        })
        .unwrap()
        .images;
        cached.video = cache_media_with(post_view(video_embed()).embed, |_, _| {
            Ok(asset_url("3test", "poster.jpg"))
        })
        .unwrap()
        .video;
        assert_eq!(
            cached.local_asset_filenames().collect::<Vec<_>>(),
            [
                "_bluesky/3test/avatar.jpg",
                "_bluesky/3test/image-0.png",
                "_bluesky/3test/image-1.png",
                "_bluesky/3test/poster.jpg"
            ]
        );
        cached.author_avatar_filename = None;
        cached.images.clear();
        cached.video.as_mut().unwrap().thumbnail = None;
        assert_eq!(cached.local_asset_filenames().count(), 0);
    }

    #[test]
    fn legacy_cache_json_is_excluded_but_media_assets_are_not() {
        assert!(is_legacy_cache_file(Path::new(
            "content/post/bluesky-3test.json"
        )));
        for filename in [
            "bluesky-3test-0.jpg",
            "bluesky-3test-1.png",
            "bluesky-3test-2.webp",
            "bluesky-3test-3.gif",
            "bluesky-did-plc-test.jpg",
            "other.json",
            "bluesky-3test.json.jpg",
            "content/post/_bluesky/3test/post.json",
        ] {
            assert!(!is_legacy_cache_file(Path::new(filename)), "{filename}");
        }
    }

    #[test]
    fn old_cache_is_upgraded_on_disk_once_without_replacing_text() {
        let dir = TestDir::new();
        let cache_file = save_archive(&dir.0, &archive_cache());
        let posts = [(POST_URL.into(), dir.0.clone())];
        let mut calls = 0;
        let result = ensure_posts_cached_with(&posts, |_, dir, cached| {
            calls += 1;
            let mut cached = cached.unwrap();
            enrich_media(&mut cached, post_view(image_embed()).embed, |embed| {
                cache_media_with(embed, |_, stem| {
                    let filename = asset_url("3test", &format!("{stem}.png"));
                    std::fs::write(dir.join(&filename), b"image")?;
                    Ok(filename)
                })
            })?;
            Ok(cached)
        })
        .unwrap();
        assert_eq!(calls, 1);
        assert_eq!(
            result[&(POST_URL.to_owned(), dir.0.clone())].text,
            "Archived post text"
        );
        let on_disk: BlueskyPostData =
            serde_json::from_str(&std::fs::read_to_string(&cache_file).unwrap()).unwrap();
        assert_eq!(on_disk.media_version, MEDIA_VERSION);
        assert_eq!(on_disk.like_count, 7);
        assert_eq!(on_disk.images.len(), 2);
        ensure_posts_cached_with(&posts, |_, _, _| panic!("cache upgraded twice")).unwrap();
    }

    #[test]
    fn existing_media_metadata_is_reused_without_network() {
        let dir = TestDir::new();
        let mut cached = archive_cache();
        cached.video = cache_media_with(post_view(video_embed()).embed, |_, _| {
            Ok(asset_url("3test", "poster.jpg"))
        })
        .unwrap()
        .video;
        let cache_file = save_archive(&dir.0, &cached);
        let result = ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| {
            panic!("existing media metadata must not trigger a request")
        })
        .unwrap();
        let key = (POST_URL.to_owned(), dir.0.clone());
        assert_eq!(result[&key].media_version, MEDIA_VERSION);
        assert_eq!(result[&key].video, cached.video);
        let on_disk: BlueskyPostData =
            serde_json::from_str(&std::fs::read_to_string(cache_file).unwrap()).unwrap();
        assert_eq!(on_disk.media_version, MEDIA_VERSION);
        assert_eq!(on_disk.text, cached.text);
    }

    #[test]
    fn failed_upgrade_keeps_original_file_and_reports_context() {
        let dir = TestDir::new();
        let cache_file = save_archive(&dir.0, &archive_cache());
        let original = std::fs::read_to_string(&cache_file).unwrap();
        let error = ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| {
            anyhow::bail!("poster download failed")
        })
        .unwrap_err();
        let error = format!("{error:#}");
        assert!(error.contains(POST_URL));
        assert!(error.contains("archived cache is unchanged"));
        assert!(error.contains("poster download failed"));
        assert_eq!(std::fs::read_to_string(cache_file).unwrap(), original);
    }

    #[test]
    fn repeated_url_gets_distinct_cached_posts_and_assets_in_each_directory() {
        let first = TestDir::new();
        let second = TestDir::new();
        let posts = [
            (POST_URL.into(), first.0.clone()),
            (POST_URL.into(), second.0.clone()),
            (POST_URL.into(), first.0.clone()),
        ];
        let mut calls = 0;
        let result = ensure_posts_cached_with(&posts, |_, dir, _| {
            calls += 1;
            let mut cached = old_cache();
            cached.text = format!("Archived post text {calls}");
            let avatar_filename = asset_url("3test", "avatar.jpg");
            let image_filename = asset_url("3test", "image-0.png");
            std::fs::write(dir.join(&avatar_filename), b"avatar").unwrap();
            std::fs::write(dir.join(&image_filename), b"image").unwrap();
            cached.author_avatar_filename = Some(avatar_filename);
            cached.images.push(BlueskyImage {
                filename: image_filename,
                alt: "alt".into(),
                width: None,
                height: None,
            });
            cached.media_version = MEDIA_VERSION;
            Ok(cached)
        })
        .unwrap();
        assert_eq!(calls, 2);
        assert_eq!(result.len(), 2);

        for (index, dir) in [&first.0, &second.0].into_iter().enumerate() {
            let key = (POST_URL.to_owned(), dir.clone());
            let post = &result[&key];
            assert_eq!(post.text, format!("Archived post text {}", index + 1));
            assert_eq!(
                post.author_avatar_filename.as_deref(),
                Some("_bluesky/3test/avatar.jpg")
            );
            assert_eq!(post.images[0].filename, "_bluesky/3test/image-0.png");
            assert_eq!(std::fs::read_dir(dir).unwrap().count(), 1);
            assert_eq!(
                std::fs::read_dir(dir.join("_bluesky/3test"))
                    .unwrap()
                    .count(),
                3
            );
            assert!(cache_path(dir, "3test").is_file());
            for filename in post.local_asset_filenames() {
                assert!(
                    dir.join(filename).is_file(),
                    "{filename} missing from {dir:?}"
                );
            }
        }
        ensure_posts_cached_with(&posts, |_, _, _| panic!("cached post fetched again")).unwrap();
    }

    #[test]
    fn migration_preserves_raw_json_and_asset_bytes_without_network_and_is_idempotent() {
        let dir = TestDir::new();
        let nested = dir.0.join("notes/nested/source");
        std::fs::create_dir_all(&nested).unwrap();
        let original = flat_cache(&nested, "3test", true);
        let original_data: BlueskyPostData = serde_json::from_value(original.clone()).unwrap();
        let old_bytes: Vec<_> = original_data
            .local_asset_filenames()
            .map(|name| std::fs::read(nested.join(name)).unwrap())
            .collect();
        // An unrelated file with the same old prefix must never be swept up.
        let unrelated = nested.join("bluesky-unrelated.jpg");
        std::fs::write(&unrelated, b"unrelated").unwrap();
        let posts = [(POST_URL.into(), nested.clone())];
        let result =
            ensure_posts_cached_with(&posts, |_, _, _| panic!("migration used network")).unwrap();
        let post = &result[&(POST_URL.to_owned(), nested.clone())];
        assert_eq!(
            post.local_asset_filenames().collect::<Vec<_>>(),
            [
                "_bluesky/3test/avatar.jpg",
                "_bluesky/3test/image-0.webp",
                "_bluesky/3test/poster.png"
            ]
        );
        for (name, bytes) in post.local_asset_filenames().zip(&old_bytes) {
            assert_eq!(std::fs::read(nested.join(name)).unwrap(), *bytes);
        }
        let path = cache_path(&nested, "3test");
        let saved = std::fs::read(&path).unwrap();
        let mut migrated: Value = serde_json::from_slice(&saved).unwrap();
        migrated["author_avatar_filename"] = original["author_avatar_filename"].clone();
        migrated["images"][0]["filename"] = original["images"][0]["filename"].clone();
        migrated["video"]["thumbnail"]["filename"] =
            original["video"]["thumbnail"]["filename"].clone();
        assert_eq!(migrated, original);
        assert!(!legacy_cache_path(&nested, "3test").exists());
        for name in original_data.local_asset_filenames() {
            assert!(!nested.join(name).exists());
        }
        assert_eq!(std::fs::read(&unrelated).unwrap(), b"unrelated");
        ensure_posts_cached_with(&posts, |_, _, _| panic!("repeat migration used network"))
            .unwrap();
        assert_eq!(std::fs::read(path).unwrap(), saved);
        assert_eq!(std::fs::read_dir(nested).unwrap().count(), 2);
    }

    #[test]
    fn shared_legacy_avatar_remains_until_last_flat_archive_is_migrated() {
        let dir = TestDir::new();
        flat_cache(&dir.0, "3test", true);
        flat_cache(&dir.0, "second", false);
        let avatar = dir.0.join("bluesky-did-plc-test.jpg");
        let bytes = std::fs::read(&avatar).unwrap();
        ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| {
            panic!("network")
        })
        .unwrap();
        assert_eq!(std::fs::read(&avatar).unwrap(), bytes);
        assert!(legacy_cache_path(&dir.0, "second").is_file());
        assert!(!legacy_cache_path(&dir.0, "3test").exists());
        let second_url = POST_URL.replace("3test", "second");
        ensure_posts_cached_with(&[(second_url, dir.0.clone())], |_, _, _| panic!("network"))
            .unwrap();
        assert!(!avatar.exists());
        for key in ["3test", "second"] {
            assert_eq!(
                std::fs::read(dir.0.join(asset_url(key, "avatar.jpg"))).unwrap(),
                bytes
            );
            assert!(!legacy_cache_path(&dir.0, key).exists());
        }
    }

    #[test]
    fn failed_migration_preserves_all_legacy_files_and_can_be_retried() {
        for failure in ["missing", "asset conflict", "json conflict"] {
            let dir = TestDir::new();
            flat_cache(&dir.0, "3test", true);
            flat_cache(&dir.0, "second", true);
            let originals: Vec<_> = ["3test", "second"]
                .into_iter()
                .map(|rkey| {
                    let path = legacy_cache_path(&dir.0, rkey);
                    let bytes = std::fs::read(&path).unwrap();
                    (path, bytes)
                })
                .collect();
            let old_asset = dir.0.join("bluesky-second-0.webp");
            let old_bytes = std::fs::read(&old_asset).unwrap();
            let archive_dir = ensure_archive_directory(&dir.0, "second").unwrap();
            let conflict = match failure {
                "missing" => {
                    std::fs::remove_file(&old_asset).unwrap();
                    old_asset.clone()
                }
                "asset conflict" => archive_dir.join("image-0.webp"),
                "json conflict" => archive_dir.join("post.json"),
                _ => unreachable!(),
            };
            if failure == "asset conflict" {
                std::fs::write(&conflict, b"conflicting bytes").unwrap();
            } else if failure == "json conflict" {
                std::fs::write(&conflict, b"{}").unwrap();
            }
            let posts = [
                (POST_URL.into(), dir.0.clone()),
                (POST_URL.replace("3test", "second"), dir.0.clone()),
            ];
            assert!(
                ensure_posts_cached_with(&posts, |_, _, _| panic!(
                    "network before migrations finished"
                ))
                .is_err()
            );
            // The first new archive may be complete, but nothing old is removed on failure.
            assert!(cache_path(&dir.0, "3test").is_file());
            for (path, bytes) in &originals {
                assert_eq!(std::fs::read(path).unwrap(), *bytes);
            }
            assert!(dir.0.join("bluesky-did-plc-test.jpg").is_file());
            assert!(dir.0.join("bluesky-3test-0.webp").is_file());
            if failure == "missing" {
                std::fs::write(&old_asset, &old_bytes).unwrap();
            } else {
                assert_eq!(std::fs::read(&old_asset).unwrap(), old_bytes);
                assert_eq!(
                    std::fs::read(&conflict).unwrap(),
                    if failure == "asset conflict" {
                        &b"conflicting bytes"[..]
                    } else {
                        &b"{}"[..]
                    }
                );
                std::fs::remove_file(&conflict).unwrap();
            }
            ensure_posts_cached_with(&posts, |_, _, _| panic!("retry used network")).unwrap();
            for (path, _) in originals {
                assert!(!path.exists());
            }
            assert!(!dir.0.join("bluesky-did-plc-test.jpg").exists());
        }
    }

    #[test]
    fn legacy_text_only_archive_is_migrated_and_upgraded_in_one_build() {
        let dir = TestDir::new();
        let original = flat_text_only_cache(&dir.0, "3test");
        let posts = [(POST_URL.into(), dir.0.clone())];
        let upgrade = |_: &str, _: &Path, cached: Option<BlueskyPostData>| {
            let mut data = cached.context("the migrated cache reaches the upgrade")?;
            data.media_version = MEDIA_VERSION;
            Ok(data)
        };
        let result = ensure_posts_cached_with(&posts, upgrade).unwrap();
        assert_eq!(
            result[&(POST_URL.to_owned(), dir.0.clone())].media_version,
            MEDIA_VERSION
        );
        assert!(!legacy_cache_path(&dir.0, "3test").exists());
        assert!(!dir.0.join("bluesky-did-plc-test.jpg").exists());
        let saved = std::fs::read(cache_path(&dir.0, "3test")).unwrap();
        let mut migrated: Value = serde_json::from_slice(&saved).unwrap();
        migrated["author_avatar_filename"] = original["author_avatar_filename"].clone();
        // The upgrade this build performed is the only change beyond the asset paths.
        let mut expected = original.clone();
        expected["media_version"] = MEDIA_VERSION.into();
        assert_eq!(migrated, expected);
        ensure_posts_cached_with(&posts, |_, _, _| panic!("second build used network")).unwrap();
        assert_eq!(std::fs::read(cache_path(&dir.0, "3test")).unwrap(), saved);
    }

    #[test]
    fn interrupted_build_after_upgrade_does_not_block_the_next_migration() {
        let dir = TestDir::new();
        flat_text_only_cache(&dir.0, "3test");
        flat_text_only_cache(&dir.0, "second");
        let posts = [
            (POST_URL.into(), dir.0.clone()),
            (POST_URL.replace("3test", "second"), dir.0.clone()),
        ];
        let upgrade = |url: &str, _: &Path, cached: Option<BlueskyPostData>| {
            let mut data = cached.context("the migrated cache reaches the upgrade")?;
            data.media_version = MEDIA_VERSION;
            anyhow::ensure!(url.ends_with("3test"), "stop the build before cleanup");
            Ok(data)
        };
        assert!(ensure_posts_cached_with(&posts, upgrade).is_err());
        // The first archive was upgraded before the build stopped, and its flat archive is
        // still there; the next build must finish the migration rather than call it a conflict.
        assert!(cache_path(&dir.0, "3test").is_file());
        assert!(legacy_cache_path(&dir.0, "3test").is_file());
        ensure_posts_cached_with(&posts[..1], |_, _, cached| {
            let mut data = cached.context("the upgraded cache is reused")?;
            data.media_version = MEDIA_VERSION;
            Ok(data)
        })
        .unwrap();
        assert!(!legacy_cache_path(&dir.0, "3test").exists());
        // The shared avatar is still referenced by the second, unmigrated archive.
        assert!(dir.0.join("bluesky-did-plc-test.jpg").is_file());
        assert!(legacy_cache_path(&dir.0, "second").is_file());
    }

    #[test]
    fn unreadable_unrelated_flat_archive_keeps_its_directorys_legacy_assets() {
        let dir = TestDir::new();
        flat_cache(&dir.0, "3test", true);
        std::fs::write(dir.0.join("bluesky-unrelated.json"), b"{ not json").unwrap();
        ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| {
            panic!("network")
        })
        .unwrap();
        // Nothing in the directory can be attributed, so no legacy file is removed.
        assert!(legacy_cache_path(&dir.0, "3test").is_file());
        assert!(dir.0.join("bluesky-3test-0.webp").is_file());
        assert!(dir.0.join("bluesky-did-plc-test.jpg").is_file());
    }

    #[test]
    fn interrupted_cleanup_is_finished_by_the_next_build() {
        let dir = TestDir::new();
        flat_cache(&dir.0, "3test", true);
        // A cleanup that copied the asset, removed the flat copy and then stopped.
        std::fs::remove_file(dir.0.join("bluesky-did-plc-test.jpg")).unwrap();
        ensure_archive_directory(&dir.0, "3test").unwrap();
        std::fs::write(
            dir.0.join(asset_url("3test", "avatar.jpg")),
            b"original bytes: bluesky-did-plc-test.jpg\0",
        )
        .unwrap();
        ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| {
            panic!("network")
        })
        .unwrap();
        assert!(!legacy_cache_path(&dir.0, "3test").exists());
        assert!(!dir.0.join("bluesky-3test-0.webp").exists());
        assert!(dir.0.join(asset_url("3test", "image-0.webp")).is_file());
    }

    #[test]
    fn missing_first_legacy_asset_never_creates_a_new_cache_or_calls_network() {
        let dir = TestDir::new();
        flat_cache(&dir.0, "3test", true);
        let original = std::fs::read(legacy_cache_path(&dir.0, "3test")).unwrap();
        std::fs::remove_file(dir.0.join("bluesky-did-plc-test.jpg")).unwrap();
        assert!(
            ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| panic!(
                "network"
            ))
            .is_err()
        );
        assert!(!cache_path(&dir.0, "3test").exists());
        assert_eq!(
            std::fs::read(legacy_cache_path(&dir.0, "3test")).unwrap(),
            original
        );
        assert!(dir.0.join("bluesky-3test-0.webp").is_file());
    }

    #[test]
    fn unsafe_legacy_and_nested_asset_paths_are_rejected_without_network() {
        for name in [
            "../outside.png",
            "/tmp/outside.png",
            "C:\\outside.png",
            "nested/image.png",
            "image.svg",
            "image.mp4",
            "image.PNG",
            "_bluesky/other/image.png",
        ] {
            for legacy in [true, false] {
                let dir = TestDir::new();
                let mut cached = archive_cache();
                cached.media_version = MEDIA_VERSION;
                cached.author_avatar_filename = Some(name.into());
                let path = if legacy {
                    legacy_cache_path(&dir.0, "3test")
                } else {
                    ensure_archive_directory(&dir.0, "3test").unwrap();
                    cache_path(&dir.0, "3test")
                };
                write_cache(&path, &cached).unwrap();
                let original = std::fs::read(&path).unwrap();
                assert!(
                    ensure_posts_cached_with(
                        &[(POST_URL.into(), dir.0.clone())],
                        |_, _, _| panic!("unsafe cache used network")
                    )
                    .is_err(),
                    "{name}"
                );
                assert_eq!(std::fs::read(&path).unwrap(), original);
            }
        }
    }

    #[cfg(unix)]
    #[test]
    fn migration_rejects_symlink_directories_and_assets() {
        use std::os::unix::fs::symlink;
        for linked in ["directory", "source", "source with target", "target"] {
            let dir = TestDir::new();
            let outside = TestDir::new();
            flat_cache(&dir.0, "3test", true);
            let original = std::fs::read(legacy_cache_path(&dir.0, "3test")).unwrap();
            match linked {
                "directory" => symlink(&outside.0, dir.0.join(ARCHIVE_DIRECTORY)).unwrap(),
                "source" => {
                    let path = dir.0.join("bluesky-3test-0.webp");
                    std::fs::rename(&path, outside.0.join("image.webp")).unwrap();
                    symlink(outside.0.join("image.webp"), path).unwrap();
                }
                "source with target" => {
                    let path = dir.0.join("bluesky-3test-0.webp");
                    let bytes = std::fs::read(&path).unwrap();
                    std::fs::rename(&path, outside.0.join("image.webp")).unwrap();
                    symlink(outside.0.join("image.webp"), &path).unwrap();
                    let archive_dir = ensure_archive_directory(&dir.0, "3test").unwrap();
                    std::fs::write(archive_dir.join("image-0.webp"), bytes).unwrap();
                }
                "target" => {
                    let archive_dir = ensure_archive_directory(&dir.0, "3test").unwrap();
                    std::fs::write(outside.0.join("image.webp"), b"untouched").unwrap();
                    symlink(
                        outside.0.join("image.webp"),
                        archive_dir.join("image-0.webp"),
                    )
                    .unwrap();
                }
                _ => unreachable!(),
            }
            assert!(
                ensure_posts_cached_with(&[(POST_URL.into(), dir.0.clone())], |_, _, _| panic!(
                    "network"
                ))
                .is_err()
            );
            assert_eq!(
                std::fs::read(legacy_cache_path(&dir.0, "3test")).unwrap(),
                original
            );
            assert!(!outside.0.join("3test").exists());
            if linked == "target" {
                assert_eq!(
                    std::fs::read(outside.0.join("image.webp")).unwrap(),
                    b"untouched"
                );
            }
        }
    }

    #[test]
    fn fresh_media_fetches_write_only_inside_archive_with_semantic_filenames() {
        for (embed, stem) in [
            (image_embed(), "image-0"),
            (wrapped_embed(video_embed()), "poster"),
        ] {
            let dir = TestDir::new();
            let (url, server) = serve_once("HTTP/1.1 200 OK\r\nContent-Type: image/webp\r\nContent-Length: 4\r\nConnection: close\r\n\r\ndata".into());
            let mut embed = embed;
            if stem == "image-0" {
                embed["images"].as_array_mut().unwrap().truncate(1);
                embed["images"][0]["fullsize"] = url.into();
            } else {
                embed["media"]["thumbnail"] = url.into();
            }
            let posts = [(POST_URL.into(), dir.0.clone())];
            let result = ensure_posts_cached_with(&posts, |url, source, cached| {
                assert!(cached.is_none());
                let mut post = post_view(embed.clone());
                let media = cache_media(&test_client(), post.embed.take(), source, "3test")?;
                Ok(post_data(url, post, None, media))
            })
            .unwrap();
            server.join().unwrap();
            let post = &result[&(POST_URL.to_owned(), dir.0.clone())];
            assert_eq!(
                post.local_asset_filenames().collect::<Vec<_>>(),
                [asset_url("3test", &format!("{stem}.webp"))]
            );
            assert_eq!(std::fs::read_dir(&dir.0).unwrap().count(), 1);
            assert_eq!(
                std::fs::read_dir(dir.0.join("_bluesky/3test"))
                    .unwrap()
                    .count(),
                2
            );
            assert!(cache_path(&dir.0, "3test").is_file());
            assert!(!legacy_cache_path(&dir.0, "3test").exists());
        }
    }

    #[test]
    fn bounded_reader_checks_actual_size_and_empty_body() {
        assert_eq!(read_image_body(Cursor::new(b"1234"), 4).unwrap(), b"1234");
        assert!(read_image_body(Cursor::new(b"12345"), 4).is_err());
        assert!(read_image_body(Cursor::new(b""), 4).is_err());
        struct CountReads(usize);
        impl Read for CountReads {
            fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
                self.0 += buf.len();
                buf.fill(0);
                Ok(buf.len())
            }
        }
        let mut reader = CountReads(0);
        assert!(read_image_body(&mut reader, 4).is_err());
        assert_eq!(reader.0, 5);
    }

    #[test]
    fn image_mime_allowlist_accepts_parameters_and_rejects_other_types() {
        for (mime, ext) in [
            ("image/jpeg", "jpg"),
            ("image/png; charset=binary", "png"),
            ("IMAGE/WEBP ; parameter=value", "webp"),
            ("image/gif", "gif"),
        ] {
            assert_eq!(image_extension(mime).unwrap(), ext);
        }
        for mime in [
            "text/html",
            "image/svg+xml",
            "video/mp4",
            "",
            "application/octet-stream",
        ] {
            assert!(image_extension(mime).is_err(), "{mime}");
        }
    }

    #[test]
    fn binary_responses_require_a_supported_image_signature() {
        for (bytes, extension) in [
            (&b"\xff\xd8\xff\xe0"[..], "jpg"),
            (&b"\x89PNG\r\n\x1a\n"[..], "png"),
            (&b"GIF87a"[..], "gif"),
            (&b"GIF89a"[..], "gif"),
            (&b"RIFF1234WEBP"[..], "webp"),
        ] {
            assert_eq!(image_signature_extension(bytes).unwrap(), extension);
        }
        for bytes in [
            &b"<svg>"[..],
            &b"0000ftypmp42"[..],
            &b"RIFF1234WAVE"[..],
            &b""[..],
        ] {
            assert!(image_signature_extension(bytes).is_err());
        }

        let dir = TestDir::new();
        let (url, server) = serve_once(
            "HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: 6\r\nConnection: close\r\n\r\nGIF89a".into(),
        );
        let filename = fetch_image(&test_client(), &url, &dir.0, "bluesky-3test-0", 10).unwrap();
        server.join().unwrap();
        assert_eq!(filename, "bluesky-3test-0.gif");
        assert_eq!(std::fs::read(dir.0.join(filename)).unwrap(), b"GIF89a");
    }

    #[test]
    fn image_fetch_saves_mime_extension_and_reuses_existing_asset_without_network() {
        let dir = TestDir::new();
        let (url, server) = serve_once(
            "HTTP/1.1 200 OK\r\nContent-Type: image/png; charset=binary\r\nContent-Length: 4\r\nConnection: close\r\n\r\ndata".into(),
        );
        let client = test_client();
        let filename = fetch_image(&client, &url, &dir.0, "bluesky-3test-0", 10).unwrap();
        server.join().unwrap();
        assert_eq!(filename, "bluesky-3test-0.png");
        assert_eq!(std::fs::read(dir.0.join(&filename)).unwrap(), b"data");
        let filename = fetch_image(&client, "not a URL", &dir.0, "bluesky-3test-0", 10).unwrap();
        assert_eq!(std::fs::read(dir.0.join(filename)).unwrap(), b"data");
    }

    #[test]
    fn image_fetch_rejects_invalid_or_oversized_responses_without_files() {
        for response in [
            "HTTP/1.1 200 OK\r\nContent-Type: image/png\r\nContent-Length: 11\r\nConnection: close\r\n\r\n",
            "HTTP/1.1 200 OK\r\nContent-Type: image/png\r\nConnection: close\r\n\r\n12345678901",
            "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: 4\r\nConnection: close\r\n\r\noops",
            "HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: 4\r\nConnection: close\r\n\r\noops",
            "HTTP/1.1 200 OK\r\nContent-Length: 4\r\nConnection: close\r\n\r\ndata",
        ] {
            let dir = TestDir::new();
            let (url, server) = serve_once(response.into());
            assert!(fetch_image(&test_client(), &url, &dir.0, "bluesky-3test-0", 10).is_err());
            server.join().unwrap();
            assert_eq!(std::fs::read_dir(&dir.0).unwrap().count(), 0);
        }
    }

    #[test]
    fn cache_replacement_is_complete_and_failed_replacement_cleans_up() {
        let dir = TestDir::new();
        let path = dir.0.join("bluesky-3test.json");
        std::fs::write(&path, "archived cache").unwrap();
        let data = old_cache();
        write_cache(&path, &data).unwrap();
        let saved: BlueskyPostData =
            serde_json::from_slice(&std::fs::read(&path).unwrap()).unwrap();
        assert_eq!(saved.text, data.text);
        assert_eq!(std::fs::read_dir(&dir.0).unwrap().count(), 1);

        let blocked = dir.0.join("blocked.json");
        std::fs::create_dir(&blocked).unwrap();
        assert!(write_cache(&blocked, &data).is_err());
        assert!(blocked.is_dir());
        assert_eq!(std::fs::read_dir(&dir.0).unwrap().count(), 2);
        assert_eq!(
            std::fs::read(&path).unwrap(),
            serde_json::to_vec_pretty(&data).unwrap()
        );
    }

    #[test]
    fn invalid_post_keys_cannot_write_outside_content_directory() {
        assert_eq!(parse_bsky_url(POST_URL).unwrap(), ("example.test", "3test"));
        assert!(parse_bsky_url("https://bsky.app/profile/did:plc:test/post/3test").is_ok());
        for url in [
            "https://bsky.app/profile/example.test/post/../outside",
            "https://bsky.app/profile/example.test/post/..",
            "https://bsky.app/profile/example.test/post/",
            "https://bsky.app/profile/example.test/post/key?query",
        ] {
            assert!(parse_bsky_url(url).is_err(), "{url}");
        }
    }
}
