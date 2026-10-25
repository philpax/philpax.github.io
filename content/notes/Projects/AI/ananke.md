+++
[taxonomies]
tags = ["ananke"]
+++

[ananke](https://github.com/philpax/ananke) is a multiplexer daemon for managing AI services that compete for GPU resources. It loads models on demand, routes requests through an OpenAI-compatible API, and unloads idle services to free memory. Its headline feature is dynamic placement: it can automatically distribute models to/between devices, based on the free memory available, through calibrated estimation of the cost of a given model. It has first-class support for [GGUF](./GGUF.md)s.

<!-- more -->
