+++
[taxonomies]
tags = ["rucomfyui"]
+++

[rucomfyui](https://github.com/philpax/rucomfyui) is a strongly-typed Rust client for ComfyUI. It uses metaprogramming to generate typed interfaces and implementations for ComfyUI nodes, enabling compile-time verification of graph soundness. Underlying this is conventional dynamic workflow functionality, which interoperates well with the statically-typed nodes.

In addition to this, `rucomfyui_mlua` exports a similar interface to Lua using the `mlua` library. The same metaprogramming machinery is used to dynamically generate a fluent library of nodes, making workflow construction in Lua both trivial and fun. These bindings were developed for [paxcord](../Personal_software/paxcord.md).

<!-- more -->

## Media

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mpoxsw2vq22h" />
