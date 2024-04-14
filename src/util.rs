pub fn slugify(s: &str) -> String {
    s.to_lowercase()
        .chars()
        .map(|c| match c {
            'a'..='z' | '0'..='9' => c,
            ' ' | '-' => '-',
            _ => ' ',
        })
        .filter(|c| *c != ' ')
        .collect()
}

pub fn pluralize(s: &str, count: usize) -> String {
    if count == 1 {
        s.to_string()
    } else {
        format!("{}s", s)
    }
}
