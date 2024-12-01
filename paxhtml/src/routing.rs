use std::path::{Path, PathBuf};

#[derive(Clone, Debug, PartialEq, Eq)]
/// A path for a route in an HTML document.
pub struct RoutePath {
    /// The segments of the path.
    segments: Vec<String>,
}
impl RoutePath {
    /// Create a new route path from a list of segments.
    pub fn new<'a>(segments: impl IntoIterator<Item = &'a str>) -> Self {
        Self {
            segments: segments.into_iter().map(|s| s.to_string()).collect(),
        }
    }
    /// Get the directory path for the route (i.e. the directory for which files
    /// should be written to).
    pub fn dir_path(&self, out_dir: &Path) -> PathBuf {
        let mut path = out_dir.to_path_buf();
        for segment in &self.segments {
            path.push(segment);
        }
        path
    }
    /// Get the index path for the route (i.e. the path to the file that should
    /// be written to the directory).
    pub fn index_path(&self, out_dir: &Path) -> PathBuf {
        self.dir_path(out_dir).join("index.html")
    }
    /// Get the URL path for the route (i.e. the path that should be used in the
    /// URL).
    ///
    /// This always starts and ends with a `/`.
    pub fn url_path(&self) -> String {
        let mut path = format!("/{}", self.segments.join("/"));
        if !path.ends_with('/') {
            path.push('/');
        }
        path
    }
}
