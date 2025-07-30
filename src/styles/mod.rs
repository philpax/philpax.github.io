use crate::ViewContext;

pub struct GenerateOutput {
    pub css: String,
    pub dark_mode_icon: String,
    pub light_mode_icon: String,
}

pub fn generate(
    context: ViewContext,
    fast: bool,
    use_global_tailwind: bool,
) -> anyhow::Result<GenerateOutput> {
    let tailwind_css = "src/styles/tailwind.css";
    let tailwind_output = if use_global_tailwind {
        paxhtml_tailwind::run_with_global(tailwind_css)
    } else {
        paxhtml_tailwind::download_and_run(
            paxhtml_tailwind::RECOMMENDED_VERSION,
            fast,
            tailwind_css,
        )
    }?;

    let (property_sets, remaining) =
        paxcss::extract_prefixed_property_sets(include_str!("website.css"));
    let dark_mode = property_sets.get(paxcss::DARK_MODE).unwrap();
    let light_mode = property_sets.get(paxcss::LIGHT_MODE).unwrap();
    let syntax = context.syntax.theme_css();
    let css = format!(
        r#"
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

/* --- TAILWIND --- */
{tailwind_output}

/* --- SYNTAX HIGHLIGHTING --- */
{syntax}
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
        dark_mode_icon,
        light_mode_icon,
    })
}
