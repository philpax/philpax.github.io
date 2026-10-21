_Drafted by Claude Opus 5.5._

## Abstract

A TypeScript runtime written entirely in Rust, for embedding in Rust applications as a scripting and plugin language. TypeScript's types are normally stripped before code reaches a JavaScript engine, which then infers what it can at runtime; this runtime would instead keep the type checker's output and use it to compile programs at load time to code in which objects have fixed layouts and values have fixed types.

Applications embedding it would get a familiar typed language and a Rust-native sandbox without embedding V8 or another C++ engine. Unlike AssemblyScript, which compiles a TypeScript-like variant, every program the runtime accepts would be ordinary TypeScript, checked by a conforming compiler.

<!-- more -->

## Implementation

The frontend would be [tsrs](https://github.com/oxc-project/tsrs), the Rust port of the TypeScript compiler [announced by Cloudflare](https://blog.cloudflare.com/typescript-rust-port), built with VoidZero and targeting full conformance with TypeScript 7. Using the real checker means the runtime reports the same type errors as the tools TypeScript developers already use, and because tsrs is written in Rust, the whole pipeline runs inside the host process without a Node or Go toolchain.

The backend follows the approach of Bun's AOT compiler, listed under [Prior art](#prior-art), which lowers checked TypeScript to a typed IR, enforces the types where values enter typed code, and compiles the result to machine code at build time. This runtime would do the same at load time inside the host, so a plugin runs directly from source.

TypeScript's types are unsound, so the runtime accepts only a strict subset in which they hold: it rejects `any`, `as` casts that narrow a type, non-null assertions and similar escape hatches, and treats the remaining types as guarantees. The host application can permit dynamic, checked fallbacks for specific operations, such as parsing JSON into a declared type with a check at the boundary.

The runtime lowers the checked AST to a typed IR in which each value has a concrete representation, such as an unboxed float, a pointer to an object of known shape, or a tagged dynamic value, so that a property read on a known shape becomes a load at a fixed offset. Compiling at load time also leaves room for a speculative JIT: the types provide the baseline specialisation, and runtime profiles refine it where a type does not determine a representation, such as a union, an interface-typed parameter, or a `number` that holds only integers in practice.

There are three candidate backends:

- [Cranelift](https://cranelift.dev/), generating machine code directly, which gives full control over object layout, calling conventions, host calls and deoptimisation.
- [WebAssembly](https://webassembly.org/) on [wasmtime](https://wasmtime.dev/), which gives up some of that control in exchange for memory isolation, the ability to interrupt long-running code, and resource limits, all of which untrusted plugins need.
- The [CLR](https://learn.microsoft.com/en-us/dotnet/standard/clr), which is designed to run typed bytecode with a tiered JIT, a garbage collector and runtime-specialised generics, though using it would give up the fully-Rust host. SharpTS, listed under [Prior art](#prior-art), already compiles TypeScript to .NET, but it preserves JavaScript semantics where this runtime would restrict the language so that the types always hold.

The runtime implements the TypeScript language and its standard built-ins rather than the Node or browser APIs. The host application supplies whatever APIs its scripts can call, described to them as `.d.ts` declarations, so that calls across the boundary compile to direct typed calls with no marshalling through dynamic values. Running npm packages would be a bonus rather than a goal, since untyped dependencies run into the same unsoundness problem.

## Challenges

TypeScript's types are structural, so an interface lists properties rather than a layout, and two objects that satisfy `{ x: number; y: number }` can hold different extra fields in different orders. Classes and object literals can have fixed layouts, but code written against an interface needs indirection, such as per-shape lookup tables passed alongside the value, inline caches, or monomorphisation per concrete shape.

Generics pose a similar choice: erasure is simple, while monomorphisation is faster but increases code size and compile time. Unions and optional properties also need representation choices, and integer arithmetic on `number` needs range analysis or speculation.

Compiling at load time puts compile time on the startup path. Cranelift compiles quickly, but large plugins may still need a cheaper first tier, a cache of compiled code keyed by source, or lazy per-function compilation.

Both backends need a garbage collector. With Cranelift, that means stack maps and a collector written for the runtime's object model; with WebAssembly, it means either a collector in linear memory or WebAssembly GC types, which suit fixed shapes but constrain the representation. Speculation is also harder on WebAssembly, because deoptimisation requires recompiling and swapping modules instead of patching code in place.

Closures, generators and `async` functions need lowering to state machines or coroutines, and the built-ins (UTF-16 strings, `Array`, `Map`, `Promise`, regular expressions) need Rust implementations that match the specification closely enough for the checker's types to hold.

tsrs is an end-to-end port of the compiler rather than a library, so using it as a frontend means modifying its internals to expose resolved types to the lowering pass, and maintaining that fork against upstream.

## Prior art

- [Bun `--compile --aot`](https://github.com/oven-sh/bun/pull/45631): a draft that compiles TypeScript to machine code at build time, using Bun's own checker and a typed SSA IR lowered through JavaScriptCore. A value that does not match its type throws a `TypeError` where it enters typed code, `as` converts instead of relabelling, and code absent at build time runs in the interpreter.
- [Static Hermes](https://speakerdeck.com/tmikov2023/optimizing-with-static-hermes-chain-react-2024): Meta's AOT compiler, which enforces Flow and TypeScript annotations by changing some JS semantics, emits bytecode or native code, and interoperates with untyped JS.
- [scriptc](https://github.com/vercel-labs/scriptc): type-checks with tsc and compiles a subset of TypeScript through LLVM to native code or wasm32-wasi, emitting typed IR on request. Code using `any` compiles to dynamic-tier functions that check types and look up properties at runtime.
- [Perry](https://github.com/PerryTS/perry): a TypeScript-to-native compiler written in Rust, using SWC and LLVM. It runs its own inference, treats annotations as optimisation hints instead of guarantees, and NaN-boxes values it cannot specialise.
- [SharpTS](https://github.com/nickna/SharpTS): a TypeScript interpreter and AOT compiler written in C# for .NET 10, in which one parser and type checker feed a tree-walking interpreter and an IL compiler, and can compile in memory when embedded. Compiled classes become .NET classes, and optimisations may use static type facts where they preserve JavaScript semantics; an unboxed `number[]` representation is a selected design direction but is not yet implemented.
- [Porffor](https://github.com/CanadaHonk/porffor): a fully AOT JS/TS engine that compiles to WebAssembly or C and targets JS semantics without an interpreter or JIT, but does not use types to drive compilation.
- [AssemblyScript](https://www.assemblyscript.org/introduction.html): compiles a TypeScript variant to WebAssembly through Binaryen, and does not plan to support full TypeScript.
