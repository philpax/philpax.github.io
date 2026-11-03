//! The gardens in the margins of wide pages: two plants per section, grown and drawn by
//! cadaeix's Églantine (https://github.com/cadaeix/eglantine-marginalia), in its copperplate
//! manner.
//!
//! The library is TypeScript, so the bake fetches it at a pinned commit, strips its types with
//! oxc and runs it in QuickJS. Each garden is written with white ink on black paper, so the sheet
//! can use it as a luminance mask over the section's accent: the lines take the accent and the
//! paper lets the page through, still hiding whatever lies behind a leaf.

use std::{collections::BTreeMap, io::Read, path::Path};

use anyhow::Context as _;

pub fn build(output_dir: &Path) -> anyhow::Result<()> {
    let output_dir = output_dir.join("margins");
    std::fs::create_dir_all(&output_dir)?;

    let modules = fetch_library()?
        .into_iter()
        .map(|(path, source)| Ok((path.replace(".ts", ".js"), strip_types(&path, &source)?)))
        .collect::<anyhow::Result<BTreeMap<_, _>>>()?;

    for (file, svg) in grow(modules)? {
        std::fs::write(output_dir.join(format!("{file}.svg")), svg)?;
    }
    Ok(())
}

/// The Églantine commit the gardens are grown from.
const COMMIT: &str = "ec2a6d9c27cdb1069a39243258b20938e60f40c8";

/// The library's TypeScript sources at `COMMIT`, keyed by their path from the repository root.
fn fetch_library() -> anyhow::Result<BTreeMap<String, String>> {
    let url = format!("https://codeload.github.com/cadaeix/eglantine-marginalia/tar.gz/{COMMIT}");
    let response = reqwest::blocking::get(&url)?.error_for_status()?;
    let mut archive = tar::Archive::new(flate2::read::GzDecoder::new(response));

    let mut sources = BTreeMap::new();
    for entry in archive.entries()? {
        let mut entry = entry?;
        // Paths start with the archive's top folder, `eglantine-marginalia-<commit>/`.
        let path = entry.path()?.to_string_lossy().into_owned();
        let Some((_, path)) = path.split_once('/') else {
            continue;
        };
        if path.starts_with("src/") && path.ends_with(".ts") && !path.ends_with(".d.ts") {
            let path = path.to_string();
            let mut source = String::new();
            entry.read_to_string(&mut source)?;
            sources.insert(path, source);
        }
    }
    anyhow::ensure!(!sources.is_empty(), "no sources in {url}");
    Ok(sources)
}

/// One module's TypeScript as JavaScript, with nothing else lowered.
fn strip_types(path: &str, source: &str) -> anyhow::Result<String> {
    use oxc::{
        allocator::Allocator,
        codegen::Codegen,
        parser::Parser,
        semantic::SemanticBuilder,
        span::SourceType,
        transformer::{TransformOptions, Transformer},
    };

    let allocator = Allocator::default();
    let source_type = SourceType::from_path(path)?;
    let parsed = Parser::new(&allocator, source, source_type).parse();
    if let Some(error) = parsed.diagnostics.first() {
        anyhow::bail!("{path}: {error}");
    }
    let mut program = parsed.program;

    let scoping = SemanticBuilder::new()
        .build(&program)
        .semantic
        .into_scoping();
    let transformed = Transformer::new(&allocator, Path::new(path), &TransformOptions::default())
        .build_with_scoping(scoping, &mut program);
    if let Some(error) = transformed.diagnostics.first() {
        anyhow::bail!("{path}: {error}");
    }

    Ok(Codegen::new().build(&program).code)
}

/// Each garden: the file it's written to, and the plant it grows, by its name in the library's
/// calendar (which carries the form and the variant that tune it to that plant).
const GARDENS: &[(&str, &str)] = &[
    // The front page.
    ("ancolie", "de l'ancolie"),
    ("lilas", "du lilas"),
    // Posts.
    ("vesce", "de la vesce"),
    ("pensee", "de la pensée"),
    // Updates.
    ("barbeau", "du barbeau"),
    ("jasmin", "du jasmin"),
    // Notes.
    ("fougere", "de la fougère"),
    ("pervenche", "de la pervenche"),
    // Tags.
    ("rose", "de la rose"),
    ("pavot", "du pavot"),
    // Credits.
    ("lierre", "du lierre"),
    ("trefle", "du trèfle"),
];

/// Runs the library and draws every garden in `GARDENS`.
fn grow(modules: BTreeMap<String, String>) -> anyhow::Result<Vec<(&'static str, String)>> {
    use rquickjs::{
        CatchResultExt as _, Context, Function, Module, Runtime,
        loader::{BuiltinLoader, BuiltinResolver},
    };

    let runtime = Runtime::new()?;
    let (resolver, loader) = modules.into_iter().fold(
        (BuiltinResolver::default(), BuiltinLoader::default()),
        |(resolver, loader), (path, source)| {
            (
                resolver.with_module(&path),
                loader.with_module(path, source),
            )
        },
    );
    runtime.set_loader(resolver, loader);
    let context = Context::full(&runtime)?;

    context.with(|ctx| {
        Module::evaluate(ctx.clone(), "bake.js", DRIVER)
            .catch(&ctx)
            .map_err(|e| anyhow::anyhow!("{e}"))?
            .finish::<()>()
            .catch(&ctx)
            .map_err(|e| anyhow::anyhow!("{e}"))?;
        let draw: Function = ctx.globals().get("draw")?;

        GARDENS
            .iter()
            .map(|&(file, plant)| {
                let svg: String = draw
                    .call((plant, file))
                    .catch(&ctx)
                    .map_err(|e| anyhow::anyhow!("{e}"))
                    .with_context(|| format!("drawing {plant}"))?;
                Ok((file, svg))
            })
            .collect()
    })
}

/// Grows a plant from the calendar, in a column 6 by 28 centimetres (longer than the library's
/// 6 by 22, so it trails further down the margin; the sheet's `aspect-ratio` matches), and draws
/// it in bloom, about two-thirds into its leaves, in white ink on black paper. Every ink is white,
/// so the hatching and the pistils both show.
const DRIVER: &str = r##"
import { growGarden, renderGarden, withInks } from "src/index.js";
import { PLANTS } from "src/calendar/plants.js";

globalThis.draw = (name, id) => {
  const plant = PLANTS.find(p => p.name === name);
  if (!plant) throw new Error(`no plant named ${name}`);
  const garden = growGarden({ seed: 1793, form: plant.form, variant: plant.variant, width: 6, height: 28 });
  const svg = renderGarden(garden, { t: 0.55, fullness: 0.6 }, { manner: "taille-douce", id, scale: 30 });
  return withInks(svg, { ink: "#fff", paper: "#000", accent: "#fff", wash: "#fff" });
};
"##;
