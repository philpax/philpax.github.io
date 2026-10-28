+++
title = "projects too cheap to meter"
short = "After a terribly busy two months, the following four months had no shortage of things to work on - but nothing quite as intense, thankfully."
datetime = 2026-05-19T00:00:00Z
draft = true

[taxonomies]
tags=["ai", "ananke", "balatro", "beatsubsonic", "blackbird", "cardinal", "discodiffusionstudio", "genresinspace", "jc3vr", "lunette", "makima", "paxboard", "paxcord", "paxhtml", "pyxis", "rucomfyui", "tsurezure", "veldera", "vouchgraph", "website", "zuihitsu"]
+++

Writing [the big claude down](../the-big-claude-down/index.md) took four months to cover a two-month period. To avoid that, I will be rather terse in this update, in which I cover the work I've done from January to today. Perhaps I can be less laconic in future updates.

<!-- more -->

# vouchgraph

<!-- image -->

[vouchgraph](../../notes/Projects/Websites/vouchgraph.md)

- [atvouch](https://atvouch.dev) is an experiment by [luna](https://l4.pm) to create a basic web of trust on atproto for developers
- I helped with some of the initial design, but thought it would be interesting to put together a graph visualisation of the resulting web
- used cosmograph v1 for this, as it was the only library that I could find that would handle the task reasonably well; the other alternatives were deficient, especially in layouting - cosmograph v2 doesn't work on all browsers
- I also wired up live updates as atproto makes that easy; unfortunately, cosmograph v1 - and indeed, all (?) web graph visualisation libraries - do not handle online node additions and removal
- resorted to a bodge where the graph is rebuilt at the user's request when changes occur

# paxboard

[paxboard](../../notes/Projects/Personal_software/paxboard.md)

# maptoposter

<!-- image -->

https://github.com/philpax/maptoposter

# paxhtml

[paxhtml](../../notes/Projects/Personal_software/paxhtml.md)

# cardinal-rs

<!-- image -->

[cardinal-rs](../../notes/Projects/Graphics_and_XR/cardinal-rs.md)

- Cardinal is a fork of VCV Rack that is designed to be used as a plugin in a DAW, and includes a great many modules as a result
- I've been a passive participant in the [Stardust XR](https://stardustxr.org/) ecosystem for years, but never an active participant
- after getting my workstation on Linux with a working PCVR setup, I decided now was the time to rectify that
- so I decided it'd be a fun project to get Cardinal working in Stardust - that is, having the modules floating in 3D space, with wires connecting them
- to do this, I first needed to convert Cardinal into a library that I could use
- this involved quite a few steps:
  - getting Cardinal and all of its included modules building in Rust, which was extraordinarily tedious
  - implementing a wgpu renderer for nanovg, the library that Cardinal uses for vector rendering
    - I initially attempted to keep the original EGL-based renderer and traffic it across into wgpu, but that did not work out, and it ended up being easier to wire up wgpu instead
  - replacing the audio backend with cpal, the standard solution for audio in Rust, and creating a Host Audio module for that cpal output
  - a _lot_ of iteration to get it to actually produce sound
  - building a test UI in egui that reimplements the core UI functionality to verify the library works
- once I had a working 2D UI, the task was then to get it into Stardust
- this took a fair bit of work in itself; to get the modules rendering in real-time, I had to use dmabuf to allow sending the textures off to Stardust to render, which required a kernel upgrade and a minor fix to Stardust
- at the time of writing, I have the modules rendering with some degree of interaction, but there's still some work left to make it all come together
- but it's not far off, and I'm excited to post a video once it's done

# veldera

<!-- videos -->

[veldera](../../notes/Projects/Games_and_modding/veldera.md)

# rucomfyui

[rucomfyui](../../notes/Projects/AI/rucomfyui.md)

# Disco Diffusion Studio

[Disco Diffusion Studio](../../notes/Projects/AI/Disco_Diffusion_Studio.md)

# paxcord

[paxcord](../../notes/Projects/Personal_software/paxcord.md)

# beat-subsonic

[beat-subsonic](../../notes/Projects/Games_and_modding/beat-subsonic.md)

# zuihitsu

[zuihitsu](../../notes/Projects/AI/zuihitsu.md)

# pyxis

[pyxis](../../notes/Projects/Games_and_modding/pyxis.md)

- Expanded parser error tests to cover malformed declarations and separators, and fixed parsing of module-level functions without preceding attributes.
- Added a C++ backend generating types, vtables, calling-convention shims, address bindings, generics and extern bindings. It generates CMake files and dependency ordering, with tests that compile generated C++.
  - Described base types use composition rather than C++ inheritance to preserve layout, at the cost of automatic pointer upcasts.
  - Non-template member definitions moved into `.cpp` files; the backend was made an optional feature.
- Added generic impl blocks, method type parameters and multiple impl blocks.
- Added Rust-style `#[cfg(...)]` for items, impls and functions, as well as backend-specific imports and ABI-mapped `c_char`.
- JSON output gained structured backend splice slots and schema versioning, retaining cfg-gated items and predicates rather than filtering them out.
- Rust generation gained optional public address constants, folder-to-module mapping, generated module-tree wiring, mounting options and an opt-out from glob re-exports.
- Added Rust path bindings for extern types and removed the generated Rust code's bitflags dependency.
- Redesigned the documentation viewer, adding Markdown documentation, source-field views, navigation, version grouping and structured attributes.
- Added source locations and documentation comments to compiler and JSON output. Rustdoc-style links became available in JSON, generated Rust and the viewer.
- Rebuilt semantic analysis around a shared Salsa-backed query pipeline for batch compilation and the language server.
  - Resolution was restructured around per-item queries; an initially recursive approach was changed to avoid Salsa cycles.
  - A separate name index replaced a monolithic declaration dependency that caused edits to re-resolve every item. Per-file source maps and a copy-on-write registry supported incremental analysis.
  - Tests check actual query recomputation, including a case where editing one file only reruns resolution for the affected item. Generated items, generics and error propagation also needed to work through the new pipeline.
- Added `pyxis-lsp`, with workspace discovery, `pyxis.toml` support and multi-project workspaces.
  - Added diagnostics, structure-aware hover and go-to-definition, including size and alignment information.
  - Added references, highlights and rename for symbols, fields, methods and documentation links.
  - Added auto-import actions and completion, semantic tokens, folding, implementation navigation and type hierarchy through `#[base]` fields.
- Added tree-sitter highlighting and a Zed development extension with LSP support and language injection for backend splices. An initial VS Code extension was removed because it was untested.
- Moved the tree-sitter grammar to a separate repository. Zed compatibility required an ABI-14 parser; tooling was added to sync the grammar and pin the Zed extension to a commit.
- Added `#[pinned]` for non-relocatable types: Rust output uses `PhantomPinned` and suppresses Copy/Clone; C++ deletes copy and move operations.
- Added nested item declarations, named constants, nested extern values and explicit `pub use` re-exports.
- Added diagnostics for by-value dependency cycles, zero-sized concrete fields and non-ascending vftable indices.
- Replaced `backend { ... }` wrappers with standalone cfg-gated splice statements, requiring changes across the parser, IR, backends, formatter, LSP and viewer.
- Added a language reference and backend documentation, plus `pyxis check` for validation without code generation.
- Expanded constants with C-string literals, aliases, and struct and array initializers; struct initializers check field coverage and type compatibility.
- Moved resolved documentation-link destinations into semantic analysis for JSON, Rust, C++/Doxygen and LSP consumers; added `Self::` and module-qualified links.
- Added standalone and inline unions. Inline unions desugar to generated sibling items; Rust emits real unions with `ManuallyDrop` members and C++ emits native unions.
- Added function-pointer types with optional argument names and per-pointer calling conventions. C++ declarator handling was also revised for pointer and array const placement.
- Fixed relative multi-segment type-path resolution and reordered nested C++ declarations so parent fields can refer to them.
- Replaced the license text with MIT and added viewer unit tests to CI.
- Introduced disk and in-memory output writers, allowing generation and module-mounting tests to inspect output without staging files on disk.
- Fixed C++ member names that collide with their enclosing type by escaping them with a trailing underscore where needed.

# balatro-rs

<!-- image -->

[balatro-rs](../../notes/Projects/Games_and_modding/balatro-rs.md)

# ananke

<!-- image -->

[ananke](../../notes/Projects/AI/ananke.md)

- Built configuration inheritance, append merging and validation, followed by reload reconciliation for newly configured services.
- Added process supervision, health checks, log capture and orphan recovery.
- Implemented on-demand startup, idle timeouts and OpenAI-compatible model, chat, completion and embedding routes.
- Added streaming proxying and WebSocket upgrades.
- Added lifecycle, configuration and log APIs, event streams, `anankectl` and an embedded dashboard.
- Added CLI chat, model selection, a combined status view and file references in chat.
- Added GGUF reading and shard aggregation, memory estimation and placement, observed-peak tracking, rolling correction and OOM retry.
- Added service eviction and dynamic-service ballooning, then refined accounting using observed VRAM, descendant processes and cgroups.
- Added MTP/NextN and separate draft-model estimation, plus multi-GPU tensor and row splitting.
- Added support for more model architectures and runtime variants, including ik_llama.cpp-specific quantisation and flags.
- Reworked host-memory accounting and separated device footprint from VRAM in placement reports.
- Built a measurement and calibration pipeline, later ported from Python to Rust, with estimator validation and leave-one-model-out cross-validation. The cross-validation commit records limitations, so its results should not be presented as a general accuracy guarantee.
- Added CPU expert offload. Luna contributed the initial MoE expert-offload work; Ava Chaney contributed proportional tensor-split weights for heterogeneous GPUs.
- Added persisted request and device metrics, retention, per-service breakdowns, JSON and Prometheus endpoints.
- Added auto-restart policies and watchdogs for time-to-first-token stalls, generation stalls and speculative-decoding collapse.
- Persisted restart history and exposed it through the API, CLI, charts and Prometheus.
- Rebuilt the frontend with service views, logs, events, streaming chat, charts and configuration editing; later added persistent chat sessions, internationalisation and mobile layout work.
- Extracted estimator and placement crates, then split daemon subsystems into workspace crates.
- Added optional Docker and Podman workloads, including supervision, recovery and combined logs.
- Added llama.cpp-native endpoint passthrough, contributed by Ava Chaney and followed by proxy hardening.
- Added a per-service stop grace period, contributed by Lumi.
- Hardened SQLite defaults and migrations, including locking and migration-digest checks.
- Open draft PR #63 restyles the UI and consolidates live updates on a read-only `/api/live` WebSocket. It also changes lifecycle terminology and removes oneshot services; it is not merely a visual refresh.
- The branch supersedes Lumi's separate UI-redesign proposal by reapplying its visual design to the existing React app. The PR lists visual polish and further real-device and stress testing as remaining.

# makima

[makima](../../notes/Projects/AI/makima.md)

# tsurezure

[tsurezure](../../notes/Projects/Personal_software/tsurezure.md)

# genresin.space

<!-- image -->

[genresin.space](../../notes/Projects/Websites/genresin.space.md)

# jc3vr

[jc3vr](../../notes/Projects/Games_and_modding/jc3vr.md)

# blackbird

<!-- image -->

[blackbird](../../notes/Projects/Personal_software/blackbird.md)

- A Ratatui terminal UI was added alongside the egui client in January. The egui client was removed in August, leaving the terminal UI as the main client.
- The terminal UI initially rendered cover art using half blocks. It later gained Kitty, iTerm2 and Sixel graphics protocol support, retaining half blocks as a fallback. The image cache was reworked to address blanking and image downgrades while scrolling or changing tracks.
- Playback gained a precomputed queue and queue display. Shuffle switched to Fisher-Yates, with new seeds on wraparound, entering shuffle and deliberate track selection. An optional queue sidebar followed.
- ReplayGain normalization was added, with a live toggle and preamp control. A custom playback source replaced `rodio::Player` to address fragile queue reconciliation and rapid skipping.
- The last track can be restored paused on startup, and tracks can be navigated by group.
- Library browsing gained configurable album spacing and a most-played sort based on average track play count. Search became insensitive to punctuation and diacritics, gained Unicode lookalike folding, and gained the ability to reveal a result in the library.
- Inline lyrics were added, followed by a resizable lyrics sidebar with auto-follow and click-to-seek. The sidebar became configurable and gained similar-song support. It uses the sonic-similarity endpoint when the server advertises that extension, falling back to `getSimilarSongs2` otherwise.
- The terminal UI gained config auto-reload, a settings UI, mouse navigation, scrollbar dragging and inertial library scrolling.
- Startup now displays a cached library while refreshing from the server. The cached library can be browsed when the server is unreachable, but playback still requires the server. This work also improved loading and sorting and switched alphabetical ordering to ICU collation. The commit reports approximately 260 ms cached loading and 2 ms sort changes for an 18,500-track library in a dev build.
- Other additions include a configurable terminal background, play count in the now-playing bar and the current track in the terminal title.
- The standalone library JSON export moved from blackbird to the website.

# lunette

[lunette](../../notes/Projects/Graphics_and_XR/lunette.md)

# paxsite

[paxsite](../../notes/Projects/Personal_software/paxsite.md)
