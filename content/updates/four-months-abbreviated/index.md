+++
title = "four months, abbreviated"
short = "After a terribly busy two months, the following four months had no shortage of things to work on - but nothing quite as intense, thankfully."
datetime = 2026-05-19T00:00:00Z
draft = true

[taxonomies]
tags=["ai", "blackbird", "genresinspace", "pyxis", "website", "ananke", "cardinal", "veldera", "balatro"]
+++

Writing [the big claude down](../the-big-claude-down/index.md) took four months to cover a two-month period. To avoid that, I will be rather terse in this update, in which I cover the work I've done from January to today. Perhaps I can be less laconic in future updates.

<!-- more -->

# vouchgraph

<!-- image -->

https://github.com/philpax/vouchgraph

- [atvouch](https://atvouch.dev) is an experiment by [luna](https://l4.pm) to create a basic web of trust on atproto for developers
- I helped with some of the initial design, but thought it would be interesting to put together a graph visualisation of the resulting web
- used cosmograph v1 for this, as it was the only library that I could find that would handle the task reasonably well; the other alternatives were deficient, especially in layouting - cosmograph v2 doesn't work on all browsers
- I also wired up live updates as atproto makes that easy; unfortunately, cosmograph v1 - and indeed, all (?) web graph visualisation libraries - do not handle online node additions and removal
- resorted to a bodge where the graph is rebuilt at the user's request when changes occur

# cardinal-xr

<!-- image -->

https://github.com/philpax/Cardinal

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

# ananke

<!-- image -->

https://github.com/philpax/ananke

# maptoposter

<!-- image -->

https://github.com/philpax/maptoposter

# veldera

<!-- videos -->

https://github.com/philpax/veldera

# website

https://github.com/philpax/philpax.github.io

# blackbird

<!-- image -->

https://github.com/philpax/blackbird

# balatro-rs

<!-- image -->

Private repo

# genresinspace

<!-- image -->

https://github.com/genresinspace/genresinspace.github.io

# pyxis

https://github.com/ferrobrew/pyxis
