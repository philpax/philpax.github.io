use std::path::Path;

pub use paxsite_content::slugify;

/// Keep an associated file's source-relative path in its document's output directory.
pub fn document_asset_output_path(
    source_directory: &Path,
    output_directory: &Path,
    asset: &Path,
) -> std::io::Result<std::path::PathBuf> {
    let relative = asset.strip_prefix(source_directory).map_err(|_| {
        std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "asset is outside its document directory",
        )
    })?;
    if relative.as_os_str().is_empty()
        || relative
            .components()
            .any(|component| !matches!(component, std::path::Component::Normal(_)))
    {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "asset path is not a relative file path",
        ));
    }
    Ok(output_directory.join(relative))
}

/// Copy a file, or create a symlink in fast mode
pub fn copy_or_symlink(source: &Path, destination: &Path, fast: bool) -> std::io::Result<()> {
    if fast {
        // Remove existing file/symlink if present
        let _ = std::fs::remove_file(destination);
        // Use absolute path for symlink target
        let source = source.canonicalize()?;
        #[cfg(unix)]
        std::os::unix::fs::symlink(&source, destination)?;
        #[cfg(windows)]
        std::os::windows::fs::symlink_file(&source, destination)?;
        Ok(())
    } else {
        std::fs::copy(source, destination)?;
        Ok(())
    }
}

pub fn pluralize(s: &str, count: usize) -> String {
    if count == 1 {
        s.to_string()
    } else {
        format!("{s}s")
    }
}

// massively inefficient but who cares
pub fn number_to_comma_separated_string(number: usize) -> String {
    if number == 0 {
        return "0".to_string();
    }
    let mut temp = vec![];
    let mut number = number;
    while number > 0 {
        temp.push(number % 1000);
        number /= 1000;
    }
    temp.reverse();
    let mut output = String::new();
    for (i, n) in temp.iter().enumerate() {
        if i > 0 {
            output.push(',');
            output.push_str(&format!("{n:03}"));
        } else {
            output.push_str(&n.to_string());
        }
    }
    output
}

pub fn copy_dir(source: &Path, destination: &Path, fast: bool) -> std::io::Result<()> {
    if !source.is_dir() {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "The source path is not a directory.",
        ));
    }

    if !destination.exists() {
        std::fs::create_dir_all(destination)?;
    }

    for entry in std::fs::read_dir(source)? {
        let entry = entry?;
        let file_type = entry.file_type()?;
        let file_name = entry.file_name();
        let destination = destination.join(file_name);

        let path = entry.path();
        if file_type.is_dir() {
            copy_dir(&path, &destination, fast)?;
        } else {
            copy_or_symlink(&path, &destination, fast)?;
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn document_asset_paths_preserve_post_folders_without_escape() {
        let source = Path::new("content/notes/Projects/AI");
        let output = Path::new("public/notes/projects/ai/makima");
        assert_eq!(
            document_asset_output_path(source, output, &source.join("_bluesky/123/poster.jpg"))
                .unwrap(),
            output.join("_bluesky/123/poster.jpg")
        );
        assert_eq!(
            document_asset_output_path(source, output, &source.join("hero.jpg")).unwrap(),
            output.join("hero.jpg")
        );
        for asset in [
            source.to_path_buf(),
            source.join("../outside.jpg"),
            Path::new("elsewhere/image.jpg").to_path_buf(),
        ] {
            assert!(document_asset_output_path(source, output, &asset).is_err());
        }
    }
}
