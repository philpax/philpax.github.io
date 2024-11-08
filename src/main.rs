use std::path::Path;

#[cfg(feature = "fonts")]
mod fonts;
mod js;
mod styles;
mod views;

fn main() -> anyhow::Result<()> {
    #[cfg(feature = "fonts")]
    fonts::download_if_required()?;

    paxgen::run(
        paxgen::Config {
            output_directory: Path::new("public").into(),
            static_directory: Path::new("static").into(),
            #[cfg(feature = "serve")]
            port: 8192,

            base_url: "https://philpax.me".into(),

            rss_title: "Philpax's Blog".into(),
            rss_author: "Philpax".into(),
            rss_description: "The blog of Philpax, your friendly neighbourhood polyglot programmer/engineer, cursed with more projects than time.".into(),
        },
        views::Views,
        |output| {
            // Write out bundled styles
            let styles = styles::generate()?;
            std::fs::write(output.join("styles.css"), styles)?;

            // Write out bundled JavaScript
            let js = js::generate()?;
            std::fs::write(output.join("scripts.js"), js)?;

            Ok(())
        },
    )
}
