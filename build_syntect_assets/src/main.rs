use std::{path::Path, str::FromStr};

use syntect::{
    highlighting::ThemeSet,
    parsing::{SyntaxDefinition, SyntaxSet},
};

fn main() -> anyhow::Result<()> {
    let output_dir = Path::new("src/syntax");
    build_syntax_set(output_dir)?;
    build_theme_set(output_dir)?;
    Ok(())
}

fn build_syntax_set(output_dir: &Path) -> anyhow::Result<()> {
    let mut builder = SyntaxSet::load_defaults_newlines().into_builder();
    builder.add(SyntaxDefinition::load_from_str(
        include_str!("Pug.sublime-syntax"),
        true,
        None,
    )?);
    let set = builder.build();
    syntect::dumps::dump_to_file(&set, output_dir.join("syntax_set.packdump"))?;
    Ok(())
}

fn build_theme_set(output_dir: &Path) -> anyhow::Result<()> {
    let mut set = ThemeSet::load_defaults();
    let ayu_dark =
        sublime_color_scheme::ColorScheme::from_str(include_str!("ayu-dark.sublime-color-scheme"))?;
    set.themes
        .insert("ayu-dark".to_string(), ayu_dark.try_into()?);
    syntect::dumps::dump_to_file(&set, output_dir.join("theme_set.packdump"))?;
    Ok(())
}

mod sublime_color_scheme;
