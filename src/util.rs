use std::path::Path;

pub use paxhtml::util::slugify;

pub fn pluralize(s: &str, count: usize) -> String {
    if count == 1 {
        s.to_string()
    } else {
        format!("{s}s")
    }
}

// massively inefficient but who cares
pub fn number_to_comma_separated_string(number: usize) -> String {
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
        }
        output.push_str(&n.to_string());
    }
    output
}

pub fn copy_dir(source: &Path, destination: &Path) -> std::io::Result<()> {
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
            copy_dir(&path, &destination)?;
        } else {
            std::fs::copy(&path, &destination)?;
        }
    }

    Ok(())
}
