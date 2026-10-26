+++
[taxonomies]
tags = ["paxhtml"]
+++

[paxhtml](https://github.com/philpax/paxhtml) is a bespoke Rust library for declaratively constructing HTML. It provides a JSX-like `html!` macro and an arena-backed representation for rendering pages. Its primary consumer is [this very website](./paxsite.md).

<!-- more -->

At the time of creation, the solutions for this were either incomplete or overly complicated (i.e. trying to implement the entire HTML spec). I just needed something ergonomic for use here. Today, something like [topcoat's `rust:view!{}` macro](https://github.com/tokio-rs/topcoat) would suffice.
