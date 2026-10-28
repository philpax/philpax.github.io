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

# balatro-rs

<!-- image -->

[balatro-rs](../../notes/Projects/Games_and_modding/balatro-rs.md)

# ananke

<!-- image -->

[ananke](../../notes/Projects/AI/ananke.md)

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
