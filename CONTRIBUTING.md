## Development Workflow

### Prerequisites

- **Rust**: Install via [rustup](https://rustup.rs/)
- **cargo-watch**: Install with `cargo install cargo-watch`
- **Git**: Required for automatic date retrieval from commit history

### Running the Dev Server

**For humans:** You should have a `cargo-watch` process running as described in the README:

```sh
cargo watch -x clippy -x 'test --workspace' -x 'run -F serve' --poll
```

This automatically rebuilds and runs clippy/tests on file changes. The site is served at `http://localhost:8192`.

The `-F serve` flag enables the `serve` feature, which adds a local dev server that automatically serves the built site. Without this flag, the binary just builds and exits.

**For agents:** Assume the user has this `cargo-watch` process running. This means:
- **Always run** `cargo clippy` and `cargo fmt` after making changes to verify correctness
- **Do NOT run** `cargo build` or `cargo run` - the watch process handles rebuilds automatically
- **NEVER use release mode** (`--release`) - it provides no benefit for this project and significantly slows down iteration

### System Dependencies

On Linux, the project uses `lld` for faster linking (configured in `.cargo/config.toml`). Install with:
```sh
sudo apt-get install lld  # Debian/Ubuntu
```

### Build Flags

- `--fast` / `-f`: Skips output directory clearing, OG image generation, and uses file mtime instead of Git dates for notes. Use during rapid iteration, but note some features may behave differently.
- `--use-global-tailwind` / `-u`: Uses system `tailwindcss` instead of downloading one. Useful if the auto-downloaded binary doesn't work.
- `--verbose` / `-v`: Shows detailed timing for each build step.
- `--public` / `-p`: Binds the dev server to `0.0.0.0` instead of `127.0.0.1`, allowing access from other devices on the network.

### Tailwind CSS

A Tailwind binary is auto-downloaded to `./tailwind` on first run. This file is gitignored. If it doesn't work (common on macOS ARM64), install globally (`brew install tailwindcss`) and use `--use-global-tailwind`.

## Project Structure

This is a static site generator written in Rust that produces a personal blog/notes website.

### Content Types

Three document types defined in `src/content.rs`:

1. **Blog** (`content/blog/`) - Long-form posts with TOML frontmatter
2. **Update** (`content/updates/`) - Shorter updates with TOML frontmatter
3. **Note** (`content/notes/`) - Wiki-style notes, hierarchical folders, NO frontmatter

### Document Metadata

**Blog/Update posts** use TOML frontmatter between `+++` delimiters:
```toml
+++
title = "Hello, again!"
short = "A new beginning."
datetime = 2025-02-02T00:00:00Z

[taxonomies]
tags=["personal", "meta"]
+++
```

**Notes** have NO frontmatter - metadata is auto-generated:
- `title` = filename (without `.md` extension)
- `datetime` = last Git commit date (or file mtime in fast mode)
- Hierarchical path becomes the display path (e.g., "Hardware · Laptop")

### Creating Content

**New blog post:**
```
content/blog/<slug>/index.md
```
Create a folder with your post slug, then add `index.md` with TOML frontmatter. Images and other assets go in the same folder and can be referenced with relative paths.

**New update:**
```
content/updates/<slug>/index.md
```
Same structure as blog posts, but for shorter updates.

**New note:**
```
content/notes/<Category>/<Subcategory>/<Title>.md
```
No frontmatter needed. The directory structure becomes the breadcrumb path. For example, `content/notes/Hardware/Laptop.md` displays as "Hardware · Laptop".

### Key Files

| File | Purpose |
|------|---------|
| `src/content.rs` | Document parsing, metadata structures, Git date retrieval |
| `src/views/posts/mod.rs` | Shared post rendering (header, body, tags) |
| `src/views/blog/mod.rs` | Blog index and individual post pages |
| `src/views/updates/mod.rs` | Updates index and individual update pages |
| `src/views/notes/mod.rs` | Notes hierarchy and individual note pages |
| `src/og_image.rs` | OpenGraph image generation (1200x630 PNG) |
| `src/main.rs` | Build orchestration, output generation |

### View Rendering

- Uses `paxhtml` crate with `html!` macro and `bumpalo` arena allocation
  - `bump` in code examples refers to a `bumpalo::Bump` arena allocator that `paxhtml` uses for efficient memory management
  - Views receive a `ViewContext` which contains a reference to the bump allocator
- `layout()` wraps pages with common structure and social meta tags
- `posts::post()` renders both blog and update posts with different body modes:
  - `PostBody::Full` - complete content with table of contents
  - `PostBody::Description` - intro paragraph + "Read more" link (used on index pages)
  - `PostBody::Short` - just the short description text
- `Option<paxhtml::Element>` resolves to `Element::Empty` when `None`, so use monadic operators instead of if-else:
  ```rust
  // Prefer this:
  {some_option
      .filter(|x| condition)
      .map(|x| html! { in bump; <span>{x}</span> })}

  // Over this:
  {if let Some(x) = some_option {
      if condition {
          html! { in bump; <span>{x}</span> }
      } else {
          paxhtml::Element::Empty
      }
  } else {
      paxhtml::Element::Empty
  }}
  ```

### Directory Structure

| Directory | Purpose |
|-----------|---------|
| `public/` | Build output (gitignored, cleared on each non-fast build) |
| `static/` | Static files copied as-is to output (fonts, CNAME, etc.) |
| `assets/source/` | Source assets for processing (e.g., icon.png) |
| `assets/baked/` | Pre-processed assets (generated by `bake_assets`) |
| `content/` | Markdown content (blog/, updates/, notes/) |

### Workspace Crates

| Crate | Purpose |
|-------|---------|
| `paxsite` (root) | Main static site generator |
| `paxcss` | CSS parsing utilities for extracting theme variables |
| `bake_assets` | Asset preprocessing tool (run manually: `cargo run -p bake_assets`) |

## CI Requirements

- **Clippy warnings are errors**: CI runs `cargo clippy -- -D warnings`
- **All workspace tests must pass**: CI runs `cargo test --workspace`
- Always run `cargo clippy` and `cargo fmt` before committing
