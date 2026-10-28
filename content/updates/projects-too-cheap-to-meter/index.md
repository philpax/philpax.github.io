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

- Selecting an account shows its Bluesky profile and incoming and outgoing vouches; nodes, edges and labels gained connectivity-based colouring.
- Added search, handle anchoring, mobile support, graph fitting, hover previews and highlighting.
- Added Bluesky OAuth and flows for finding accounts and vouching or unvouching.
- A user’s own vouch actions trigger a rebuild; the view can fit and follow the affected accounts. Other incoming changes still accumulate for a rerender.
- Added avatars, profile caching, navigation history and selected handles in page titles.

# paxboard

[paxboard](../../notes/Projects/Personal_software/paxboard.md)

- Added a canvas background with twinkling stars and occasional shooting stars.
- Replaced large-model-proxy status with [ananke](#ananke) integration, showing service tiles and device resource usage.

# maptoposter

<!-- image -->

https://github.com/philpax/maptoposter

- The postcard note describes the project and its use: [every city that I’ve visited as a postcard](../../notes/Personal/Every_city_that_I've_visited_as_a_postcard/index.md).
- The fork builds on Olaren’s transit-oriented fork, which already included rail, bicycle paths and transit themes.
- Added custom font selection, including font files, and configurable print sizes and DPI.
- Fixed ocean fetching and rendering; added configurable output filenames and opening the result in the default viewer.
- Added a Nix shell and moved Python dependencies to uv.

# niriad

- A vibefork of niri towards sway-style window tiling. It builds on 0WD0's vertical-layout branch, which made the scroll axis configurable.
- Replaced the flat column layout with a recursive tree, allowing horizontal and vertical splits and tabbed or stacked containers within niri's scrollable strip.
- Added split and layout commands, directional focus and movement, resizing, tree simplification, tab bars and stacked title rows. Existing layout operations needed to handle nested subtrees rather than assuming every column child was a window.
- Developed drag-and-drop interactions with swaps, a translucent ghost, drop indicators, tab-header targets and cross-workspace and cross-output movement.
- New windows normally open in a new section; a pending split puts the next window into the focused section. The pending state has no visual or IPC indication.
- The resulting model is not identical to sway: it lacks parent/child container selection, and directional moves swap with siblings rather than reparenting windows. IPC exposes window paths but not the container layout or pending split state.
- Added layout fuzzing covering split layouts, scaling and mode changes, maximization and drop operations; follow-up fixes addressed focus, nested resizing, tab visibility and fullscreen restoration.
- Made good progress, but resolving the UX problems became frustrating. A shift towards a primarily zellij-based workflow also reduced the need for window tiling.

# paxhtml

[paxhtml](../../notes/Projects/Personal_software/paxhtml.md)

- Added typed attribute values for strings, integers, floats and booleans across parsing, macros and rendering.
- Fixed macro-generated code to use bumpalo through paxhtml.
- Changed slugification to collapse consecutive spaces and dashes; accented characters are removed rather than transliterated.
- Added separate opening-tag parsing so a parsed tag can be combined with separately supplied children.

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

- The Stardust client did not reach the fidelity I wanted, so I parked the project.
- I may revisit it as a [lunette](#lunette) plugin, with a recorded VR performance as the goal; this remains a proposal.

# veldera

<!-- videos -->

[veldera](../../notes/Projects/Games_and_modding/veldera.md)

- Ported Rocktree fetching and decoding to Rust and streamed Google Earth data into Bevy, with LOD, culling, a floating origin, geocoding and a web build.
- Added first-person exploration, terrain-aware teleportation, projectiles and an experimental hovercraft, with headless simulation and telemetry-based tuning.
- Expanded the sky into an Earth-aware weather system with atmospheric lighting, volumetric clouds, terrain shadows and climate simulation.
- Improved physics streaming and experimented with a physical first-person body, locomotion, charged launches and ragdolls; split the code into engine, extras and game crates.
- Replaced the hovercraft with raycast cars and investigated terrain collision using LOD changes, off-thread builds, OpenStreetMap road ribbons and alternative terrain extraction.
- Paused the project because inconsistent photogrammetry colliders remained unsuitable for reliable driving.

# rucomfyui

[rucomfyui](../../notes/Projects/AI/rucomfyui.md)

- Updated object-info parsing and generated typed nodes for newer ComfyUI versions.
- Added execution events through HTTP polling and optional WebSocket streaming; WebSockets can provide previews, unlike polling.
- Displayed execution state and previews on the node graph.
- Added external-crate node generation with a configurable base crate path, tested alongside built-in typed nodes.
- Added Lua event callbacks and made WebSockets the default.
- Released versions 1.0.0, 1.1.0 and 1.1.1; the July announcement says the library reached crates.io.

# Disco Diffusion Studio

[Disco Diffusion Studio](../../notes/Projects/AI/Disco_Diffusion_Studio.md)

- Modernised the 2022 Disco Diffusion notebook with Claude, retaining still-image generation while removing animation, video, turbo and VR modes.
- Converted the notebook into a typed Python library and CLI with a uv environment and vendored research dependencies; model weights remain runtime downloads.
- Added a stepwise API that encodes prompts once and changes their weighted mix between diffusion steps.
- Built an interactive studio with live guidance and prompt-weight changes, latent painting, regional rerolls and checkpoint preview, revert and branching.
- Added regional tile prompting, persistence, worker integration and grid editing.
- The project reports a warm 1280x768, 250-step sampling loop improving from roughly 124 to 59 seconds on an RTX 5090, excluding first-run compilation; this is not an independently verified benchmark.
- cadaeix contributed Windows Triton support, studio input fixes and advanced controls.

- Latent painting noises strokes and injects them into the latent during generation. Checkpoint history supports preview, revert and continuation from an earlier state.
- Studio controls include guidance schedules, Perlin and eta settings, model selection and recipe presets.
- For regional prompts, overview cutouts use global prompts; inner cutouts select a tile by crop centre and fall back to global prompts when the tile has no override.
- Added CLI tile configuration and a Studio grid for selecting tiles, overriding and resetting prompts, and adjusting strength live.
- The Studio feature and studio-sauce work were merged into main. The current interactive-studio branch has later refactoring commits that remain branch-only.

# paxcord

[paxcord](../../notes/Projects/Personal_software/paxcord.md)

- Added autocomplete, translation, attachments, paintover, image description and OCR.
- Integrated [ananke](#ananke) model metadata and added startup retries when model discovery races service startup.
- Replaced naive Discord message splitting with Markdown-aware chunking that preserves formatting and handles long lists and quotes.
- Added streamed ComfyUI sampler progress and live previews to paint commands, with throttled updates and the final image replacing the preview.
- Added a clear error when a model recovered from an old message footer no longer exists.

# beat-subsonic

[beat-subsonic](../../notes/Projects/Games_and_modding/beat-subsonic.md)

- Built a browser-side BeatSaver catalogue with a compressed-dump decoder, SQLite WASM import in a worker and a searchable table with OneClick links.
- Connected OpenSubsonic authentication and library fetching, cached tracks locally and grouped duplicate tracks with their matching maps.
- Developed music-specific fuzzy matching for artists, titles, swapped fields, collaborators and remixes; added indexing, caching and worker sharding.
- Added OPFS persistence, background dump refresh, routed tabs, pagination and rating filters.
- Added installed-map detection from a user-selected BSManager CustomLevels folder and session-only Sent markers. Sent means handed to the protocol handler, not confirmed installed.
- Browser CORS, mixed-content and secure-context rules constrain use.

# zuihitsu

[zuihitsu](../../notes/Projects/AI/zuihitsu.md)

- Built an append-only event log and rebuildable memory graph and search index, with Lua turns and generation and embedding endpoints.
- Added transactional Lua execution, provenance-aware reads, session compaction, semantic search and scheduled wake-ups.
- Added real-model scenario evaluation and a web console that materialises conversations, events and state in WebAssembly.
- Worked on attribution and conflicts, recurring events, Discord identity and memory references.
- Added content-addressed attachments, Discord relay, console composition and model-input budgeting.
- Developed a more ambitious knowledge-representation and provenance design; this is research and specification, not a shipped successor.

- Memory entries carry teller, context and visibility information through reads and search; identity resolution and cross-platform identity work address attribution.
- Added a scenario-based evaluation harness and a console using the server materializer compiled to WebAssembly as a read replica.
- Added a Discord connector, attachment support and a read-only boot mode for inspection.
- The proposed successor starts from a new genesis rather than migrating existing agents. Its design distinguishes propositions, assertions, attestations, perceptions and artefacts.
- The successor design also proposes model-call context manifests and accounting for influence and restrictions. These are specification concepts, not claims about the running system.
- The research coverage register distinguishes structural answers from evidence of correct extraction, policy or model behaviour. Identity resolution, belief settlement and retrieval remain open questions.

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

- Built a strongly typed, headless Rust port for reinforcement learning, including poker evaluation, scoring, a LuaJIT-compatible RNG and a Lua oracle.
- Expanded randomized parity testing and built an action-observation protocol, terminal client and rule-based agent. One test configuration reported 3,000 of 3,000 seeds passing.
- Investigated parity failures involving event ordering, RNG consumption and card sorting; one case required modelling UI Node allocations because their IDs affected ordering even in the headless port.
- Ran a 100,000-seed oracle sweep, finding real divergences and a JSON floating-point precision false positive. The closeout reported no known open parity gaps, not proof of complete parity.
- Built a playable WASM interface and a wall of autonomous games, moving the showcase to a standalone native-and-WASM macroquad application.
- Improved agent determinism and showcase performance with compact observations, worker scheduling and a new WebGL renderer.
- The project note says the implementation is intended to remain unreleased; the showcase is distinct from releasing the game code.

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

- Co-developed a hard fork of maki with lun-4, moving functionality into Lua plugins and changing the architecture and UI. Maki already had Lua plugins, plan mode and subagents.
- Built a shared agent actor and per-session manager for turn outcomes, queues and execution limits; Lua task tools expose delegation and a plan-reviewer specialization.
- Added output truncation and offloading, and implementation-model selection.
- Open work on authorized Lua agents and exact-turn orchestration is on a branch, not merged at the audited snapshot.
- Alternate interfaces, XR and a web multiplexer remain aspirations rather than delivered features.

- The fork continued to integrate upstream maki releases, including a selective 0.5.5 sync; a shared Git history does not mean all upstream-only commits are missing features.
- The agent system evolved from asynchronous subagents to a shared actor and agent graph, with session-level turn management and execution limits.
- The open agent API branch develops Lua agent handles, tickets, subscriptions, exact-turn orchestration and authority boundaries. It contains work by both Philpax and Luna and should not be attributed wholesale to either.
- The same branch includes work on concurrent input and cancellation across the TUI, SDK and ACP, as well as plugin commands across frontends and subagents.
- Planning work includes plan submission and implementation-model selection; output handling gained offloading for oversized tool results and protection around writing them back.

# tsurezure

[tsurezure](../../notes/Projects/Personal_software/tsurezure.md)

- Started with a design record and built an Obsidian importer, event log and fold; imports are events supporting correction and supersession.
- Added the tszr CLI to inspect SQLite logs and materialised state. It stops at the readable prefix when it encounters an event from a newer build.
- Built a loopback-only daemon with a read API and viewer; the log is captured at startup and later appends require a restart.
- Built a SvelteKit viewer that can run standalone against a selected log through WebAssembly, with pages, notes, tasks, period views, queries and record-time history.
- Added persistent projection and snapshot startup, handling for unreadable future events and convergence tests across device arrival schedules.
- Peer-to-peer sync and editing are design ambitions; verify their implementation before describing them as shipped.

- The model distinguishes mutable page blocks from timestamped notes, and recorded time from the user-controlled time an event occurred.
- The Rust workspace separates domain and event handling, log persistence, relational projection, read DTOs, the application and browser WebAssembly.
- The projector derives rebuildable SQLite state from the CBOR event log; native and browser-memory variants share a schema and typed read boundary.
- Snapshots are retained at a documented 10,000-row cadence; late arrivals and erasures can require replay or invalidation.
- The viewer is read-only, whether served by the daemon or running standalone in the browser. A separate CLI policy command is an append path, not browser editing.
- Import reruns and corrections are represented as events; the import design distinguishes recoverable history from details that cannot be inferred precisely from snapshots.
- The design also discusses iroh sync, pairing, encryption, blob replication, rich-text CRDT editing and mobile integration; these were not established as shipped.

# genresin.space

<!-- image -->

[genresin.space](../../notes/Projects/Websites/genresin.space.md)

- Replaced Cosmograph v1 with a custom graph renderer using precalculated positions; the initial change recorded remaining interaction and layout bugs.
- Added camera inertia and zoom, curved edges, degree-weighted colours and mobile pinch-zoom fixes.
- Added pathfinding URL state, label actions, cursor-proximity highlighting and selected-node highlighting.
- Replaced quadratic Dijkstra pathfinding with BFS, switched to on-demand rendering and replaced React graph components with an imperative GraphView.
- Disabled and then removed light mode. A glassmorphic redesign was followed by a star-atlas design; the static celestial backdrop was later removed.
- Added redirect-derived aliases and redirect-aware inbound-link counts. Search became a two-slot route planner with alias-aware results, a path timeline and disconnected-path indication.
- Added no-JavaScript and WebGL-initialisation fallbacks; search and the sidebar remain usable if WebGL initialization fails.
- Switched the default graph layout to a LinLog/ForceAtlas2 energy model for more distinct clusters.
- Refreshed Wikipedia data monthly and corrected templates and individual edges; made label selection deterministic for a viewport and selected node.

# jc3vr

[jc3vr](../../notes/Projects/Games_and_modding/jc3vr.md)

- The earlier VR post ended with a first-person camera and debugging tools, with stereo, OpenXR, UI and motion controls still ahead.
- Experimented with rendering the scene twice, eye offsets and per-eye projection; fixed render-list rotation so geometry appeared in the second eye.
- Captured the game HUD for a floating per-eye panel, with world-space following and projection compensation. A more ambitious depth-layer split was parked and defaulted off.
- Added OpenXR session and frame handling, tracked poses, eye rendering and compositor submission; corrected eye poses and canted-headset orientation.
- Added a floating debug panel and static foveated rendering.
- Reworked stereo rendering into a single geometry walk instead of drawing the entire scene twice.
- Renamed jc3vrs to jc3vr. Main remains explicitly unfinished and asks people not to repackage early builds.
- The following work is on the unmerged controllers branch. Its integrated live and headset acceptance remains unverified.
- Added OpenXR controller grip and aim poses, haptics, Index and Touch bindings, input-edge handling and control schemes.
- Added wrist IK and late-render correction for tracked hands and weapons; hand-based rays drive weapon and grapple aiming.
- Handled lost or stale controller input, requiring neutral input before affected hands resume, and added arbitration between gameplay, UI and replay.
- Adapted native menus and the map for controller pointers; added VR body calibration, controls, comfort and display settings.
- Made the debug panel an in-world tool with controller pointing, play-space positioning and input ownership.
- Added roomscale floor height, crouch, movement and seat transitions, followed by head-following body movement and procedural torso, pelvis and leg posing.
- Worked on planted feet, gait and arm solving, with handover to game animation for ledges, scripts and hit reactions; added poses for crouching, kneeling, sitting, swimming, wingsuit and parachute.
- Connected a temporal body estimator and terrain observations; the integrated body-fitting work remains unverified in play.
- Selectively combined authored camera motion with tracked head movement for takeoff, landing, recovery, pickups and hanging.
- Added physical hand capsules, contact haptics and character interaction; joint-based object grabbing was initially disabled over lifecycle concerns and later enabled by default.
- Developed hand climbing, flinging and mantling, later adding moving-body and vehicle grips. The branch explicitly requires headset testing.
- Added a shared nearest-target resolver for physical interactions, including continuous acquisition while grip is held.
- Added vehicle interactions including steering wheels, handlebars, flight controls, parachute handles, doors, mounted guns and stunt holds.
- Developed holsters, foregrips, physical reloads, magazine wells, slides, bolts and pumps; later work connected magazine detachment and preserved chambered rounds.
- Rebuilt two-handed inventory around item identity and exclusive hand, socket or world locations, with the game slots projected from the loadout table.
- Added spatial weapon interactions including taking guns, drawing and holstering, handing weapons between hands and supporting long guns.
- Added hand-driven grapple reeling, yanking and swing pumping, and remote snatching of weapons and carryable objects.
- Replaced an earlier grenade representation with native physical grenade actors: deliberate throws arm them, incidental release remains inert and live catches retain their fuse.
- Added tracking recording, headsetless replay, scenario assertions and synthetic tracking. Replay helps reproduce regressions but does not establish headset comfort or native physics behaviour.
- The branch records isolated headset observations, but no verified integrated live or headset result. The last reported integrated build checkpoint predates the final gameplay commits.

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
- The standalone library JSON export moved from blackbird to [paxsite](#paxsite).

# lunette

[lunette](../../notes/Projects/Graphics_and_XR/lunette.md)

- Booted LÖVR from Rust and ported WayVR’s Smithay compositor, with DMA-BUF/Vulkan imports, a shared-memory fallback and an OpenXR overlay.
- Built an initial workspace with window and monitor panels, two-handed laser interaction, a virtual keyboard and saved layouts.
- Added portal-based monitor capture, host input injection, per-hand Wayland seats and clipboard bridging.
- Made the workspace reloadable and scriptable without disturbing clients, added a control socket and lunctl, and switched to statically checked Luau.
- Reorganised desktop behaviour into configurable plugins and services; restored Wayland protocols and added popup, subsurface and drag handling.
- Built an audio-reactive aurora using PipeWire capture, shared audio analysis and VR controls.
- Built a spatial UI toolkit with layout, text, React-like authoring, controls and a widget gallery; added curved panels, themes, accessibility and saved arrangements.
- Worked on Steam Frame performance with an in-headset performance panel, tiered Luau compilation and reduced frame allocations.

- Connected the compositor to the frame loop with bounded communication and skipped layer blits for undamaged surfaces.
- Worked on retaining the compositor and its Wayland clients across Lua reloads and hard restarts, including GPU quiescence and buffer re-import.
- Reconciled the compositor against a WayVR baseline and restored protocols, popup and subsurface rendering and drag-and-drop behaviour.
- Added safe mode and an integrated Luau checker; checking does not run plugin initializers.
- The plugin runtime tracks dependencies, capabilities, services and owned effects, with rollback and cleanup quarantine. Plugins share a Lua state and native API, so this is not a security boundary.
- Added schema-derived configuration, a runtime manager, saved settings and a recovery plugin.
- Added workspace tags, arc layout, placement rules and saved arrangements; panels gained two-handed resizing and pushing, and the wrist menu gained grouping and tear-off placement.
- The spatial UI toolkit gained text fields, dialogs, notifications, images and Markdown, plus curved panels, near-touch interaction and plugin-owned 3D volumes.
- Added accessibility semantics, options and contrast checks, along with persistent theme, panel and menu settings.
- Explored OpenXR overlays, OpenVR lifecycle support, Steam Frame bindings and desktop-simulator fallbacks. These changes are not independent hardware validation.
- Added offscreen graphics and logic-headless tests; these do not establish headset presentation, controller behaviour or comfort.

# paxsite

[paxsite](../../notes/Projects/Personal_software/paxsite.md)

- Added standard.site publication and document records, OAuth publishing, backfill and a pre-push stale-record check; the website remains the content source.
- Added link and anchor validation as a content-phase pass, with a check mode that does not write a site build.
- Iterated on the design: a June lava-lamp and frosted-panel design was replaced by a September redesign.
- Built a collapsible notes tree usable without JavaScript, with scripted filtering; restored a follow-system theme setting.
- Moved the music exporter from [blackbird](#blackbird) into the website and added export timestamps and recent per-album scrobble counts. Added album covers linking to the music library on the front page.
- Extended generated previews to non-document pages and used document hero images as preview backgrounds.
- Added note tags, grouped summaries, automatic folder indexes, tag aliases and redirects, author credits and project-status metadata.
- Updated Arborium and added regex fences; added local caching for Bluesky images and video posters while video streams on demand.
- Added standalone pages as a document type.
