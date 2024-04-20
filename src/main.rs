use std::path::Path;

mod styles;
mod views;

fn main() -> anyhow::Result<()> {
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
            Ok(())
        },
    )
}
