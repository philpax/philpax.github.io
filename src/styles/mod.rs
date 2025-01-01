use crate::ViewContext;

pub fn generate(context: ViewContext) -> anyhow::Result<String> {
    const RESET: &str = include_str!("reset.css");
    let (property_sets, remaining) =
        paxcss::extract_prefixed_property_sets(include_str!("website.css"));
    let dark_mode = property_sets.get(paxcss::DARK_MODE).unwrap();
    let light_mode = property_sets.get(paxcss::LIGHT_MODE).unwrap();
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
