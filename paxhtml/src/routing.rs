use std::path::{Path, PathBuf};

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct RoutePath {
    segments: Vec<String>,
}
impl RoutePath {
    pub fn new<'a>(segments: impl IntoIterator<Item = &'a str>) -> Self {
        Self {
            segments: segments.into_iter().map(|s| s.to_string()).collect(),
        }
    }
    pub fn dir_path(&self, out_dir: &Path) -> PathBuf {
        let mut path = out_dir.to_path_buf();
        for segment in &self.segments {
            path.push(segment);
        }
        path
    }
    pub fn index_path(&self, out_dir: &Path) -> PathBuf {
        self.dir_path(out_dir).join("index.html")
    }
    /// Always starts and ends with a `/`
    pub fn url_path(&self) -> String {
        let mut path = format!("/{}", self.segments.join("/"));
        if !path.ends_with('/') {
            path.push('/');
        }
        path
    }
}
