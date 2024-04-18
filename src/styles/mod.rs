const RESET: &str = include_str!("reset.css");

const DARK_MODE: &str = r#"
background-image: url('/backgrounds/dark/20190902_225741.jpg');
color: white;
"#;

const LIGHT_MODE: &str = r#"
background-image: url('/backgrounds/light/20230610_105204.jpg');
color: black;
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
