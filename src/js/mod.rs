#[cfg(feature = "fonts")]
fn style_debugger() -> anyhow::Result<String> {
    let style_debugger = include_str!("style-debugger.js");
    Ok(style_debugger.replace(
        "/*FONTS*/",
        &crate::fonts::FONTS
            .iter()
            .map(|f| format!("\"{f}\""))
            .collect::<Vec<_>>()
            .join(", "),
    ))
}

pub fn generate() -> anyhow::Result<String> {
    Ok([
        #[cfg(feature = "fonts")]
        style_debugger()?,
    ]
    .join("\n"))
}
