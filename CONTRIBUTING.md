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
- `--check`: Runs the content-phase validation only (every markdown link resolves and every `#anchor` points at a real heading) and exits — no site is built, nothing is written, no dev server starts. Prints one line per broken link and exits non-zero if any are found; otherwise prints `check: all links valid`. Fast, and handy after editing content (e.g. renaming a heading changes its anchor slug and can break links elsewhere):

  ```sh
  cargo run -F serve -F draft -- --check
  ```

  The same validation runs at the start of a normal build, so a broken link fails the build too — `--check` just skips straight to it.

### Tailwind CSS

A Tailwind binary is auto-downloaded to `./tailwind` on first run. This file is gitignored. If it doesn't work (common on macOS ARM64), install globally (`brew install tailwindcss`) and use `--use-global-tailwind`.

## Project Structure

This is a static site generator written in Rust that produces a personal blog/notes website.

### Content Types

Three document types defined in `paxsite-content/src/lib.rs`:

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
| `paxsite-content/src/lib.rs` | Document types, metadata, reading content from disk, Git date retrieval |
| `paxsite-content/src/bluesky.rs` | Bluesky API client, post caching, URL helpers |
| `src/content.rs` | Wraps `paxsite-content` documents with parsed markdown ASTs, Bluesky post loading |
| `src/markdown.rs` | Markdown AST to HTML conversion, custom component dispatch |
| `src/views/posts/mod.rs` | Shared post rendering (header, body, tags) |
| `src/views/blog/mod.rs` | Blog index and individual post pages |
| `src/views/updates/mod.rs` | Updates index and individual update pages |
| `src/views/notes/mod.rs` | Notes hierarchy and individual note pages |
| `src/views/components/` | Reusable UI components (Link, dates, BlueskyPost, etc.) |
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

- Prefer the `html!` macro for all view/component code. The `Builder` API should only be used in `src/markdown.rs` where programmatic element construction is necessary; everywhere else, use `html!` for readability and consistency.

### `paxhtml` `html!` Macro Syntax

The `html!` macro uses JSX-like syntax with some Rust-specific extensions:

- **Arena allocator**: All `html!` invocations require `in bump;` to specify the arena:
  ```rust
  paxhtml::html! { in bump; <div>"hello"</div> }
  ```
- **Attribute values**: Expressions use `{expr}`, which calls `.to_string()` on the value. String literals and booleans work directly:
  ```rust
  <a href={url} class="my-class" disabled>...</a>
  ```
- **Attribute spread**: Use `{expr}` in attribute position (outside a `name={value}` pair) to spread an iterable of `paxhtml::Attribute`:
  ```rust
  let extra_attrs = some_condition.then(|| [
      paxhtml::Attribute::new(bump, "target", "_blank"),
      paxhtml::Attribute::new(bump, "rel", "noopener noreferrer"),
  ]);
  html! { in bump; <a href={url} {extra_attrs.into_iter().flatten()}>...</a> }
  ```
- **Child interpolation**: `{expr}` for single elements/text, `#{iter}` for iterating over collections:
  ```rust
  <ul>#{items.iter().map(|item| html! { in bump; <li>{item}</li> })}</ul>
  ```
- **Components**: PascalCase tags are treated as function calls. The function receives `(bump, Props)` where props are populated from attributes using `DefaultIn` for defaults:
  ```rust
  <Link external underline target={url}>"click me"</Link>
  // Expands to: Link(bump, LinkProps { external: true, underline: true, target: url, ..DefaultIn::default_in(bump) })
  ```
- **Fragments**: Use `<>...</>` for fragment syntax, or `Builder::new(bump).fragment(iter)` programmatically

### Code Organization

Within each module, organize code as follows:
1. **Public API first** - all `pub` structs, enums, and functions at the top
2. **Private implementation below** - constants, helper functions, and internal types
3. **Order by use** - private items should appear in the order they're called/used by the public API (topological order)

### Directory Structure

| Directory | Purpose |
|-----------|---------|
| `public/` | Build output (gitignored, cleared on each non-fast build) |
| `static/` | Static files copied as-is to output (fonts, CNAME, etc.) |
| `assets/source/` | Source assets for processing (e.g., icon.png) |
| `assets/baked/` | Pre-processed assets (generated by `bake_assets`) |
| `content/` | Markdown content (blog/, updates/, notes/) |
| `static/88x31/` | 88x31 button images for the frontpage (must be saved locally, no hotlinking) |

### Custom Components in Markdown

Custom components are written as PascalCase HTML tags in markdown and handled in `src/markdown.rs`:

**Void (self-closing) components:**
- `<MusicLibrary />` — Interactive music library display
- `<NotesIndex />` — Hierarchical notes navigator (only in notes)
- `<PrMeta date="2025-11-06" add=128 sub=1 />` — Inline pill row with date and diff stats (always noyear)
- `<PrMeta start="2025-11-08" end="2025-11-12" add=3130 sub=876 closed />` — Date range variant with optional `closed` badge
- `<MonthDayDate date="2025-11-06" noyear />` — Formatted date
- `<MonthDayDateRange start="2025-11-06" end="2025-12-14" noyear />` — Date range
- `<BlueskyPost post="https://bsky.app/profile/handle/post/rkey" />` — Archived Bluesky post embed (data fetched and cached as JSON next to the markdown file on first build)

**Paired (block) components:**
- `<CityPoster image="path">...content...</CityPoster>` — Two-column layout with image and text

Component implementations live in `src/views/components/`.

### Bluesky Post Embeds

`<BlueskyPost>` tags trigger automatic fetching and caching of post data from the Bluesky API:
- On first encounter, the post data (text, facets, author info, avatar as base64, engagement metrics) is fetched and stored as `bluesky-{rkey}.json` next to the markdown file
- Subsequent builds read from cache and never re-fetch (implicit archiving)
- The fetch runs even in `--fast` mode since it only happens once per post
- Fetching/caching logic lives in `paxsite-content/src/bluesky.rs`; rendering in `src/views/components/bluesky_post.rs`
- All Bluesky URL construction is centralised in the bluesky module (`profile_url()`, `hashtag_url()`)

### Workspace Crates

| Crate | Purpose |
|-------|---------|
| `paxsite` (root) | Main SSG: markdown rendering, views, build orchestration |
| `paxsite-content` | Content layer: document types, disk I/O, frontmatter parsing, Git dates, Bluesky API/caching |
| `paxsite-cli` | CLI tool for creating content and publishing to standard.site (the `atproto` module: OAuth localhost public client + record writes) |
| `paxcss` | CSS parsing utilities for extracting theme variables |
| `bake_assets` | Asset preprocessing tool (run manually: `cargo run -p bake_assets`) |

## standard.site Publishing

The site can mirror its blog/update posts to a PDS as [standard.site](https://standard.site/)
records, making them discoverable on the AT Protocol network while the content stays here.

### How it works

- **Config**: site identity (author/name/description/base URL) and the AT Protocol DID live in
  `paxsite_content::CONFIG` — the single source of truth, from which `ViewContextBase` is derived.
  Standard.site is **disabled** while `CONFIG.atproto_did` is `None`; set it to
  `Some("did:plc:...")` to enable. No on-disk config file is involved.
- **Publication**: a singleton `site.standard.publication` record at a fixed rkey (`self`), so its
  AT-URI is fully derived from the DID — nothing is persisted.
- **Records**: each published post gets a `site.standard.document` record on the PDS. The
  document's AT-URI and a content fingerprint are written back into the post's frontmatter under
  `[standard_site]`. Its `path` and the SSG's output route share one canonical derivation
  (`Document::route_path`), and `textContent` uses the shared `markdown_to_plaintext` — so neither
  can drift from the site.
- **Build output**: the SSG emits `/.well-known/site.standard.publication` (the derived AT-URI)
  and, for any post with a `[standard_site]` URI, a `<link rel="site.standard.document" href="at://…">`
  tag in its `<head>`. Posts without a record emit no link, so unpublished content is never advertised.

### Auth model

Publishing uses a **localhost public OAuth client** (no private key, no hosted client metadata),
scoped to `repo:site.standard.publication repo:site.standard.document` only — a compromised
machine can touch nothing else on the account. The rotating session is cached locally in
`.standard-site-session.json` (gitignored); the repo carries no secrets, so you can pull and
publish from any machine, logging in via the browser when the cached session has expired
(public-client sessions last ~2 weeks).

### Publishing

Run `cargo run -p paxsite-cli`:

- **Publish a draft** — flips the draft to published *and* upserts its standard.site record.
- **Backfill standard.site records** — publishes every non-draft blog/update post that has no
  record yet or whose content has changed since it was last published.

The first publish opens a browser for OAuth login and creates the publication record.

### Pre-push hook

A pre-push check runs `paxsite-cli check-standard-site`, which blocks a push if any non-draft
blog/update post is missing or has a stale record. (No-op when standard.site is disabled, i.e.
`CONFIG.atproto_did` is `None`.) Git won't auto-run committed hooks, so each clone enables it once.

**Git 2.54+** (config-based hooks — the definition lives in `.githooks/hooks.gitconfig`):

```sh
git config --local include.path ../.githooks/hooks.gitconfig
```

**Git < 2.54** (script + `core.hooksPath`, using `.githooks/pre-push`):

```sh
git config --local core.hooksPath .githooks
```

Setting `include.path` is harmless on older Git (the `[hook]` section is ignored) and activates
automatically on upgrade. When you move to 2.54+, unset `core.hooksPath` so the check doesn't run
twice: `git config --local --unset core.hooksPath`.

## CI Requirements

- **Clippy warnings are errors**: CI runs `cargo clippy --all-targets --all-features --all -- -D warnings`
- **All workspace tests must pass**: CI runs `cargo test --workspace`
- Always run `cargo clippy` and `cargo fmt` before committing
