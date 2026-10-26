+++
status = { kind = "active" }
[taxonomies]
tags = ["pyxis"]
+++

[pyxis](https://github.com/ferrobrew/pyxis) is a domain-specific language for describing the existing in-memory types and structures of a given application. The compiler takes these definitions - containing the layouts, virtual tables, and functions - and then generates Rust, JSON, or C++ output for using and manipulating these items.

Pyxis decouples these definitions from the consuming code, allowing them to be reused. These consumers can then focus on using the definitions rather than writing language-specific boilerplate.

<!-- more -->

Supporting repositories include the [Tree-sitter grammar](https://github.com/ferrobrew/tree-sitter-pyxis) and the [definitions monorepo](https://github.com/ferrobrew/pyxis-defs).

## Media

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mptynvey2s2i" />
