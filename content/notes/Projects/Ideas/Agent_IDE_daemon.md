*Drafted by GLM-5.3-Flash.*

## Abstract

A browser-first IDE for agent-driven work, organised around a daemon: a single Rust daemon owns agent sessions anywhere on your machine, and a web client — later a thin terminal launcher and desktop shell — drives it from any device, so a session can be watched, steered, and picked up again from wherever you are. The harness is its own rather than a shell over other agents', and everything programmable in it — tool integrations, policy, workflows, the promptbox — is Luau, in the manner of a typed notebook wired to an agent where you and the model share one namespace.

<!-- more -->

## Implementation

The daemon spawns sessions anywhere on the machine and exposes them to the web client. Sessions are event-sourced (SQLite and CBOR) and tree-shaped, with the local log canonical and Earendil's session-portability rules applied to what enters it: any provider state that can't be materialised into the log isn't used — `store: false`, client-side compaction only, no hosted multi-agent — and a shared Git repository handles filesystem rollback separately from tree navigation. Agent and serving layer are one vertically integrated system rather than an agent behind an access layer, because the policy and log guarantees have to hold across both.

Each provider integration mimics its native harness's tool shapes, following Armin Ronacher's observation that post-training now skews models toward one dominant harness's schemas: the mimicry is maintained per provider, backed by lenient repair at the model boundary (logged as events), strict decoding where available, and flat schemas. Switching models leaves the old transcript verbatim, projects dead tool calls as self-describing tombstones, and strips thinking blocks only when crossing providers.

Policy is stacked layers of mostly-pure Luau functions, each in an isolated VM, with effects declared and recorded so decisions replay; project layers may only narrow global policy. The promptbox is prose with `@`-prefixed Luau for interpolation, skills and subagents appearing as typed values with intellisense. Tool output renders through a versioned UI DSL that marks what the model actually saw, and a recursive view of subagent trajectories is the core introspection surface. Large values live in a kernel and reach the model's context as handles plus previews, and nesting budgets — depth, cost, time — are capabilities that narrow as they pass to subagents.

## Prior art

- [Paseo](https://paseo.sh): daemon plus web, mobile, desktop, and CLI clients for any agent speaking the [Agent Client Protocol](https://agentclientprotocol.com) — closest structural match for the surfaces, but it wraps other harnesses.
- [pi](https://pi.dev) and Earendil's [session-portability essay](https://earendil.com/posts/session-portability/): pi is a minimal, extensible own harness in TypeScript, terminal-first; the essay's rules — local log canonical, no provider-sealed state, auditable agent communication — are the ones the log design follows.
- [Polytoken Outpost](https://docs.polytoken.dev/reference/outpost/): authenticated remote access to the Polytoken daemon — project registration, session supervision, and a session proxy. The daemon as a separate access layer with the agent independent of it, which is the shape this design deliberately departs from.
- [makima](https://github.com/lun-4/makima) and its [planned multiplexer](https://github.com/lun-4/makima/issues/120): a Lua-plugin-extendable coding agent whose multiplexer spec shares this proposal's goals — persistent browser access, workspaces, retention beyond process lifetime — while keeping agent and multiplexer separate; the Lua plugin design is prior art for the Luau-everywhere extensibility.
- [Goose](https://github.com/block/goose): Rust, own harness, desktop/CLI/API surfaces, not web-first and without programmable policy.
- [Mentu Recipes](https://docs.mentu.ai): workflow runner with capability-scoped write boundaries and a per-run event log — the same pillars, two of three, in a narrower shape.
- [Recursive Language Models](https://alexzhang13.github.io/blog/2025/rlm/) ([arXiv:2512.24601](https://arxiv.org/abs/2512.24601)): models interacting with unbounded context programmatically through a REPL — the grounding for the kernel, handles, and recursive-decomposition design.
- [Better Models, Worse Tools](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/): Armin Ronacher's write-up of newer Claude models regressing on off-distribution tool schemas; the direct justification for per-provider tool mimicry and lenient repair.
