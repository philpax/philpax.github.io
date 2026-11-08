+++
status = { kind = "active" }
[taxonomies]
tags = ["unjustcause2"]
+++

Unjust Cause 2 reconstructs the C++ source of Just Cause 2, one function at a time. A bespoke harness drives local models in parallel to reconstruct each function through a decompile-compare-iterate cycle.

<!-- more -->

I've been working on Just Cause 2 as a modding target since ~2011 (you know, [Just Cause 2: Multiplayer](Just_Cause_2_Multiplayer.md)). Over the years, I have wanted two things: debugging symbols and source code for the game. Unfortunately, the former is almost certainly lost to time, and the latter will remain locked up in a vault. With today's technology, though, it is possible to do the next best thing: a systematic decompilation and reconstruction of the source code, and the fabrication of our very own debug symbols.

There are existing projects for automated decompilation, like [REA](https://github.com/morluto/rea), but I find them to be a little dull. What I wanted was a self-improving automated harness for decompilation at scale with local models, where all dependencies are pinned and readily available (thanks, Nix!), and systematic tracking. I wanted an _engineered_ solution, and that's what I've built.

## How it works

An initial analysis pass is completed with Ghidra to establish the executable's functions, segments, RTTI, and things of a similar nature. The harness creates a queue of function-decompilation tasks from the executable. Each task is handed off to a local model, which receives a system prompt explaining the task, and an evidence packet with the disassembly, Ghidra's decompilation, all relevant metadata and declarations, and whatever else the harness thinks the model might need.

The model then writes a complete C++ translation unit (i.e. something that can be compiled), and this unit is then compiled with the game's compiler and flags[^flags] in a sandbox. The resulting artifact is then made to target the original address, and the result is compared with the original bytes. Mismatches are presented to the model with context and relevant lessons to enable it to iterate. If the result passes the byte-check, it is then linked against the original executable to verify correctness. Otherwise, after it exhausts its attempts, it will be returned to the queue for a more powerful model to take on.

[^flags]: There are actually several flag presets as different TUs seem to have been compiled at different settings, and the third-party libraries use their own bundle of settings.

The majority of the work has been in scheduling and learning from failure cases. The available resources must be used as efficiently as possible: this usually means using the high-concurrency high-throughput small local models, but these models have a ceiling to what they're capable of. Given this, we must estimate the complexity of each task and schedule the use of large models, prioritising functions that are high-value (i.e. share structures with other functions, or provide insight into the surrounding call subgraph).

Once a function's decompilation is available, it is a candidate for harvesting: the most significant types/signatures/variables used by the function are contributed into a shared registry, which is then used to generate headers and inform other decompilations. These will also be reconciled, such that they can be used to inform full type reconstruction.

## Between runs

The harness was/is developed by Claude Opus 5.5, which is also responsible for operating it. This offers an interesting opportunity: the agent can actively improve the harness based on how things are going. And indeed, that's what it does: it runs a failure analysis every few hours, using subagents as required, and finds areas of improvement. Once an improvement has been confirmed, it is either implemented within the harness, raised to my attention for future design input, or fed into the harness's own lessons, which will be presented to the working agents as necessary (e.g. "this is how you solve this particular instruction pattern").

The local models still do the bulk of the recovery. Indeed, even the local models are capable of some knowledge transfer: they can propose their own lessons, and if validated, these are saved. With this, stronger models can transfer knowledge to smaller models: or if you want to be wanky about it, it's teacher-student distillation in promptspace.

## Media

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mz6unpogjk2v" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzbcqymr2k23" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzbgbwlxyk2n" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzduysfvqs2x" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzfyzmfrtk2l" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzgfnsjsr22x" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzjpfsykkc24" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mzny432qos2z" />
