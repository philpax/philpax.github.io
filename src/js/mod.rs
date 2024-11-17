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

#[cfg(feature = "serve")]
fn reload() -> anyhow::Result<String> {
    Ok(include_str!("reload.js").to_string())
}

pub fn generate() -> anyhow::Result<String> {
    Ok([
        #[cfg(feature = "fonts")]
        style_debugger()?,
        #[cfg(feature = "serve")]
        reload()?,
        crate::syntax::js(),
        include_str!("website.js").to_string(),
    ]
    .join("\n"))
}
