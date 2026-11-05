//! The gardens in the margins of wide pages: two plants per section, grown and drawn by
//! cadaeix's Églantine (https://github.com/cadaeix/eglantine-marginalia), in its copperplate
//! manner.
//!
//! The library is TypeScript, so the bake fetches it at a pinned commit, strips its types with
//! oxc and runs it in QuickJS. Each garden is written with white ink on black paper, so the sheet
//! can use it as a luminance mask over the section's accent: the lines take the accent and the
//! paper lets the page through, still hiding whatever lies behind a leaf. A section may also have
//! an engraved animal visiting its garden or a tool resting at its foot, and each section is
//! drawn at its own moment of the day.

use std::{collections::BTreeMap, io::Read, path::Path};

use anyhow::Context as _;
use base64::{Engine as _, engine::general_purpose::STANDARD};

pub fn build(output_dir: &Path) -> anyhow::Result<()> {
    let output_dir = output_dir.join("margins");
    std::fs::create_dir_all(&output_dir)?;

    let Library { sources, figures } = fetch_library()?;
    let modules = sources
        .into_iter()
        .map(|(path, source)| Ok((path.replace(".ts", ".js"), strip_types(&path, &source)?)))
        .collect::<anyhow::Result<BTreeMap<_, _>>>()?;

    for (file, svg) in grow(modules, &figures)? {
        std::fs::write(output_dir.join(format!("{file}.svg")), svg)?;
    }
    Ok(())
}

/// The Églantine commit the gardens are grown from.
const COMMIT: &str = "30b7820c1310b7bbe5741e45da46b7b87c27c6ef";

/// The parts of the library the bake needs at `COMMIT`.
struct Library {
    /// TypeScript sources, keyed by their path from the repository root.
    sources: BTreeMap<String, String>,
    /// Engraved figures, keyed by their file name without the extension.
    figures: BTreeMap<String, Vec<u8>>,
}

/// The library's sources and figures at `COMMIT`.
fn fetch_library() -> anyhow::Result<Library> {
    let url = format!("https://codeload.github.com/cadaeix/eglantine-marginalia/tar.gz/{COMMIT}");
    let response = reqwest::blocking::get(&url)?.error_for_status()?;
    let mut archive = tar::Archive::new(flate2::read::GzDecoder::new(response));

    let mut sources = BTreeMap::new();
    let mut figures = BTreeMap::new();
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
        } else if path.starts_with("figures/") && path.ends_with(".png") {
            let name = path["figures/".len()..]
                .trim_end_matches(".png")
                .to_string();
            let mut bytes = Vec::new();
            entry.read_to_end(&mut bytes)?;
            figures.insert(name, bytes);
        }
    }
    anyhow::ensure!(!sources.is_empty(), "no sources in {url}");
    Ok(Library { sources, figures })
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

/// A garden to grow.
struct Garden {
    /// The file it's written to.
    file: &'static str,
    /// The plant, by its name in the library's calendar (which carries the form and the variant
    /// that tune it to that plant).
    plant: &'static str,
    /// The width of its column in centimetres, 6 for a garden in the margin.
    width: u32,
    /// A calendar figure visiting the garden or resting at its foot.
    guest: Option<&'static str>,
    /// The time of day, 0 at its start and 1 at its end.
    t: f64,
    /// How full the day is, 0 empty and 1 full.
    fullness: f64,
}

/// Each garden, at its section's moment. Each section keeps one figure, and the wide gardens
/// that stand in for a regular one keep the same moment (and figure, where they replace one
/// that has it).
const GARDENS: &[Garden] = &[
    // The front page.
    Garden {
        file: "ancolie",
        plant: "de l'ancolie",
        width: 6,
        guest: None,
        t: 0.55,
        fullness: 0.65,
    },
    Garden {
        file: "lilas",
        plant: "du lilas",
        width: 6,
        guest: Some("abeille"),
        t: 0.55,
        fullness: 0.65,
    },
    // Posts: later, as the leaves thin.
    Garden {
        file: "vesce",
        plant: "de la vesce",
        width: 6,
        guest: None,
        t: 0.65,
        fullness: 0.55,
    },
    Garden {
        file: "pensee",
        plant: "de la pensée",
        width: 6,
        guest: Some("rossignol"),
        t: 0.65,
        fullness: 0.55,
    },
    // Updates: earlier and full of leaves.
    Garden {
        file: "barbeau",
        plant: "du barbeau",
        width: 6,
        guest: Some("grillon"),
        t: 0.45,
        fullness: 0.8,
    },
    Garden {
        file: "jasmin",
        plant: "du jasmin",
        width: 6,
        guest: None,
        t: 0.45,
        fullness: 0.8,
    },
    // Notes: late, going to seed.
    Garden {
        file: "fougere",
        plant: "de la fougère",
        width: 6,
        guest: Some("pigeon"),
        t: 0.75,
        fullness: 0.7,
    },
    Garden {
        file: "pervenche",
        plant: "de la pervenche",
        width: 6,
        guest: None,
        t: 0.75,
        fullness: 0.7,
    },
    // Tags: full.
    Garden {
        file: "rose",
        plant: "de la rose",
        width: 6,
        guest: None,
        t: 0.6,
        fullness: 0.9,
    },
    Garden {
        file: "pavot",
        plant: "du pavot",
        width: 6,
        guest: Some("caille"),
        t: 0.6,
        fullness: 0.9,
    },
    // Credits: sparse and early.
    Garden {
        file: "lierre",
        plant: "du lierre",
        width: 6,
        guest: Some("greffoir"),
        t: 0.35,
        fullness: 0.35,
    },
    Garden {
        file: "trefle",
        plant: "du trèfle",
        width: 6,
        guest: None,
        t: 0.35,
        fullness: 0.35,
    },
    // For a post, an update or a note with nothing in its side or margin column: each reaches
    // across it as well, so it is grown wider, 14 centimetres.
    Garden {
        file: "vesce-wide",
        plant: "de la vesce",
        width: 14,
        guest: None,
        t: 0.65,
        fullness: 0.55,
    },
    Garden {
        file: "barbeau-wide",
        plant: "du barbeau",
        width: 14,
        guest: Some("grillon"),
        t: 0.45,
        fullness: 0.8,
    },
    Garden {
        file: "gesse",
        plant: "de la gesse",
        width: 14,
        guest: Some("rossignol"),
        t: 0.65,
        fullness: 0.55,
    },
    Garden {
        file: "jasmin-wide",
        plant: "du jasmin",
        width: 14,
        guest: None,
        t: 0.45,
        fullness: 0.8,
    },
    Garden {
        file: "capillaire",
        plant: "du capillaire",
        width: 14,
        guest: None,
        t: 0.75,
        fullness: 0.7,
    },
];

/// Runs the library and draws every garden in `GARDENS`.
fn grow(
    modules: BTreeMap<String, String>,
    figures: &BTreeMap<String, Vec<u8>>,
) -> anyhow::Result<Vec<(&'static str, String)>> {
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
            .map(|garden| {
                let guest = garden.guest.unwrap_or_default();
                let guest_figure = garden
                    .guest
                    .map(|name| {
                        figures
                            .get(name)
                            .map(|bytes| {
                                format!("data:image/png;base64,{}", STANDARD.encode(bytes))
                            })
                            .with_context(|| format!("no figure named {name}"))
                    })
                    .transpose()?
                    .unwrap_or_default();
                let svg: String = draw
                    .call((
                        garden.plant,
                        garden.file,
                        garden.width,
                        guest,
                        guest_figure,
                        garden.t,
                        garden.fullness,
                    ))
                    .catch(&ctx)
                    .map_err(|e| anyhow::anyhow!("{e}"))
                    .with_context(|| format!("drawing {}", garden.plant))?;
                Ok((garden.file, svg))
            })
            .collect()
    })
}

/// Grows a plant from the calendar, in a column 48 centimetres tall (more than twice the
/// library's 22, so it trails down a tall window; the sheet fits the drawing to the garden's width
/// and fades it out where a shorter window ends) and as wide as its garden asks, at its section's moment, with its guest if it has one, in white ink on black
/// paper. Every ink is white, so the hatching and the pistils both show.
const DRIVER: &str = r##"
import { growGarden, renderGarden, withInks } from "src/index.js";
import { PLANTS } from "src/calendar/plants.js";
import { FIGURES, FIGURE_SIZE } from "src/calendar/index.js";

globalThis.draw = (name, id, width, guest, guestFigure, t, fullness) => {
  const plant = PLANTS.find(p => p.name === name);
  if (!plant) throw new Error(`no plant named ${name}`);
  const spec = { seed: 1793, form: plant.form, variant: plant.variant, width, height: 48 };
  if (guest) {
    const figure = FIGURES[guest];
    if (!figure) throw new Error(`no figure named ${guest}`);
    spec.guest = { kind: figure.kind, aspect: figure.aspect, size: FIGURE_SIZE[figure.kind] };
  }
  const garden = growGarden(spec);
  const options = { manner: "taille-douce", id, scale: 30 };
  if (guest) options.guestFigure = guestFigure;
  const svg = renderGarden(garden, { t, fullness }, options);
  return withInks(svg, { ink: "#fff", paper: "#000", accent: "#fff", wash: "#fff" });
};
"##;
