use crate::ViewContext;

pub struct GenerateOutput {
    pub css: String,
    pub syntax_dark_css: String,
    pub syntax_light_css: String,
    pub dark_mode_icon: String,
    pub light_mode_icon: String,
}

pub fn generate(context: ViewContext) -> anyhow::Result<GenerateOutput> {
    const RESET: &str = include_str!("reset.css");
    let (property_sets, remaining) =
        paxcss::extract_prefixed_property_sets(include_str!("website.css"));
    let dark_mode = property_sets.get(paxcss::DARK_MODE).unwrap();
    let light_mode = property_sets.get(paxcss::LIGHT_MODE).unwrap();
    let css = format!(
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
"#,
    )
    .trim()
    .to_string();

    let dark_mode_icon = std::fs::read_to_string("assets/source/phosphor/moon.svg")?.replace(
        r##"fill="#000000""##,
        &format!(
            r##"fill="{}""##,
            paxcss::parse_rules(dark_mode)
                .get("--background-color")
                .unwrap()
        ),
    );
    let light_mode_icon = std::fs::read_to_string("assets/source/phosphor/sun.svg")?.replace(
        r##"fill="#000000""##,
        &format!(
            r##"fill="{}""##,
            paxcss::parse_rules(light_mode)
                .get("--background-color")
                .unwrap()
        ),
    );

    Ok(GenerateOutput {
        css,
        syntax_dark_css: context.syntax.theme_dark_css(),
        syntax_light_css: context.syntax.theme_light_css(),
        dark_mode_icon,
        light_mode_icon,
    })
}
