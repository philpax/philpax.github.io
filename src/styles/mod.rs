use std::collections::HashMap;

use crate::ViewContext;

pub fn generate(context: ViewContext) -> anyhow::Result<String> {
    const RESET: &str = include_str!("reset.css");
    let (dark_mode, light_mode, remaining) = extract_css_modes(include_str!("website.css"));
    let syntax = context.syntax.theme_css();
    Ok(format!(
        r#"
{RESET}

/* --- THEMES --- */
:root {{
{dark_mode}
}}
:root.dark-theme {{
{dark_mode}
}}

@media (prefers-color-scheme: light) {{
:root {{
{light_mode}
}}
}}
:root.light-theme {{
{light_mode}
}}

/* --- WEBSITE --- */
{remaining}

/* --- SYNTAX HIGHLIGHTING --- */
{syntax}
"#,
    )
    .trim()
    .to_string())
}

fn extract_css_modes(css: &str) -> (String, String, String) {
    let mut property_sets: HashMap<String, String> = HashMap::new();
    let mut remaining_css = String::new();

    let mut current_set: Option<String> = None;
    let mut brace_count = 0;
    let mut current_block = String::new();

    for line in css.lines() {
        let trimmed = line.trim();

        // Count braces
        brace_count += trimmed.chars().filter(|&c| c == '{').count();
        brace_count -= trimmed.chars().filter(|&c| c == '}').count();

        // Check for new property set
        if trimmed.starts_with("--") && trimmed.contains('{') {
            let set_name = trimmed.split('{').next().unwrap().trim().to_string();
            current_set = Some(set_name);
            continue;
        }

        if let Some(ref set_name) = current_set {
            if brace_count == 0 {
                // End of block
                property_sets.insert(set_name.clone(), current_block.trim_end().to_string());
                current_block.clear();
                current_set = None;
            } else {
                current_block.push_str(line);
                current_block.push('\n');
            }
        } else {
            remaining_css.push_str(line);
            remaining_css.push('\n');
        }
    }

    let dark_mode = property_sets.remove("--dark-mode").unwrap_or_default();
    let light_mode = property_sets.remove("--light-mode").unwrap_or_default();

    (dark_mode, light_mode, remaining_css.trim().to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_css_modes() {
        let input = r#"--dark-mode {
  --color: white;
  --color-secondary: #CCC;
  --background-color: #3C2954;
}

--light-mode {
  --color: black;
  --color-secondary: #333;
  --background-color: #C5B4DB;
}

:root {
  --header-height: 64px;
}

body {
  max-width: 1100px;
  margin: auto;
  color: var(--color);
  background-color: var(--background-color);
}"#;

        let expected_dark_mode = r#"  --color: white;
  --color-secondary: #CCC;
  --background-color: #3C2954;"#;

        let expected_light_mode = r#"  --color: black;
  --color-secondary: #333;
  --background-color: #C5B4DB;"#;

        let expected_remaining = r#":root {
  --header-height: 64px;
}

body {
  max-width: 1100px;
  margin: auto;
  color: var(--color);
  background-color: var(--background-color);
}"#;

        let (dark_mode, light_mode, remaining) = extract_css_modes(input);

        assert_eq!(dark_mode, expected_dark_mode);
        assert_eq!(light_mode, expected_light_mode);
        assert_eq!(remaining, expected_remaining);
    }
}
