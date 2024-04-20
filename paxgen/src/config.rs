use std::{path::PathBuf, sync::OnceLock};

#[derive(Debug, Clone)]
pub struct Config {
    /// The directory to output the generated content to.
    pub output_directory: PathBuf,
    /// The directory containing static files to copy to the output directory.
    pub static_directory: PathBuf,

    /// The base URL to use for generated links.
    pub base_url: String,

    /// The title of the RSS feed.
    pub rss_title: String,
    /// The author of the RSS feed.
    pub rss_author: String,
    /// The description of the RSS feed.
    pub rss_description: String,
}
static INSTANCE: OnceLock<Config> = OnceLock::new();
impl Config {
    pub(crate) fn initialize(config: Config) {
        INSTANCE.set(config).unwrap();
    }

    pub fn get() -> &'static Config {
        INSTANCE.get().unwrap()
    }
}
