//! Small filesystem and editor helpers shared across the CLI.

use std::{
    path::{Path, PathBuf},
    process::Command,
};

/// Launches `$EDITOR`/`$VISUAL` (falling back to `vi`) on `path`.
pub(crate) fn open_in_editor(path: &Path) {
    let editor = std::env::var("EDITOR")
        .or_else(|_| std::env::var("VISUAL"))
        .unwrap_or_else(|_| "vi".to_string());

    println!("Opening in {editor}...");
    let _ = Command::new(&editor)
        .arg(path)
        .stdin(std::process::Stdio::inherit())
        .stdout(std::process::Stdio::inherit())
        .stderr(std::process::Stdio::inherit())
        .status();
}

/// Walks up from the current directory to the project root — the directory with
/// both a content dir and a `Cargo.toml`.
pub(crate) fn find_project_root() -> anyhow::Result<PathBuf> {
    let mut dir = std::env::current_dir()?;
    loop {
        if dir.join(Path::new(paxsite_content::CONTENT_DIR)).is_dir()
            && dir.join("Cargo.toml").exists()
        {
            return Ok(dir);
        }
        if !dir.pop() {
            anyhow::bail!(
                "Could not find project root (looking for a directory with both a content dir and Cargo.toml)"
            );
        }
    }
}
