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
