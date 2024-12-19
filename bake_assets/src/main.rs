use std::path::Path;

mod icon;
mod syntax;

fn main() -> anyhow::Result<()> {
    syntax::build(Path::new("src/syntax"))?;
    icon::build(Path::new("content/icon.png"), Path::new("static"))?;
    Ok(())
}
