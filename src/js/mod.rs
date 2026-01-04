#[cfg(feature = "serve")]
fn reload() -> anyhow::Result<String> {
    Ok(include_str!("reload.js").to_string())
}

pub fn generate() -> anyhow::Result<String> {
    Ok([
        #[cfg(feature = "serve")]
        reload()?,
        include_str!("website.js").to_string(),
    ]
    .join("\n"))
}
