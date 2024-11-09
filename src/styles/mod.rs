const RESET: &str = include_str!("reset.css");

const DARK_MODE: &str = r#"
--color: white;
--background-color: #3C2954;
"#;

const LIGHT_MODE: &str = r#"
--color: black;
--background-color: #C5B4DB;
"#;

const WEBSITE: &str = include_str!("website.css");

pub fn generate() -> anyhow::Result<String> {
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
{WEBSITE}
"#,
        dark_mode = DARK_MODE.trim(),
        light_mode = LIGHT_MODE.trim()
    )
    .trim()
    .to_string())
}
