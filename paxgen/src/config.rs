use std::sync::OnceLock;

#[derive(Debug, Clone)]
pub struct Config {
    pub base_url: String,

    pub rss_title: String,
    pub rss_author: String,
    pub rss_description: String,
}
static INSTANCE: OnceLock<Config> = OnceLock::new();
impl Config {
    pub fn initialize(config: Config) {
        INSTANCE.set(config).unwrap();
    }

    pub fn get() -> &'static Config {
        INSTANCE.get().unwrap()
    }
}
