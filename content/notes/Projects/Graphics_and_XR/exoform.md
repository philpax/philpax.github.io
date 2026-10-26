+++
status = { kind = "done", year = 2022 }
[taxonomies]
tags = ["exoform"]
+++

[exoform](https://github.com/philpax/exoform) is an experimental collaborative modelling tool, built on Bevy and egui, where the modelling primitive is the humble signed distance field, composed in a multitude of ways. It uses `opensaft`, described below, and a client-server architecture.

<!-- more -->

## opensaft

[opensaft](https://github.com/philpax/opensaft) is the related fork of Embark Studios' Saft library for compiling, interpreting, discretising, and meshing signed distance fields. The fork makes the source more accessible and replaces `macaw` with `glam`.

## A Hypothetical `exoform2`

`exoform` wasn't particularly fun to model with, and the server made it difficult to quickly get a session going with someone else. Revisiting this, I think I'd go for a Lua-based DSL for construction (where functions generate SDFs that can be composed), with the ability to insert gizmos that can then be tweaked in the interactive view (mapping these within a complex transform chain would be another problem, of course).

Taking this further, I'd want an ecosystem of functions that could be composed to build scenes - being able to assemble a town through procedural instantiations of buildings, which procedurally instantiate their own features, etc. - and to have this facilitated by a public library. Perhaps something like [Unison](https://www.unison-lang.org/), but with as little infrastructure involved as possible. A fun idea I've been noodling around with would be to host functions on ATProto, but that may be problematic in its own way:

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mliy2qgoyc2l" />

Not sure! I started sketching the DSL out, but did not take it any further. (For reference, it would look something like the Lua graph DSL in [rucomfyui](../AI/rucomfyui.md), but with concessions for interactive/procedural use.)

That said, I'm quite interested in [Matt Keeter](https://www.mattkeeter.com/)'s [Halfspace](https://www.mattkeeter.com/projects/halfspace/), which has been exploring the compositional DSL-based geometry design space for much longer.
