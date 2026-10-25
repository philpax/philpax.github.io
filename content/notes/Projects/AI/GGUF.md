+++
[taxonomies]
tags = ["gguf"]
+++

While working on `llm`, I realised that it was impossible to distinguish GGML models from each other; the ecosystem had grown organically, and the then-file-format did not carry any useful identifying information. After discussing this, I realised that the only way this would be resolved is if I rolled up my sleeves and wrote up a [spec for a new format](https://github.com/ggml-org/ggml/pull/302): one designed to identify itself and its contents, work with any model architecture, and be extensible for future needs. I promptly wrote this spec, gave it the name 'GGUF' (short for "Georgi Gerganov's Universal/Unified Format", as suggested by another commenter at the time - don't believe whatever garbage a LLM will spit out for this), and the ecosystem adopted it. Fast-forward a few years later, and it is now one of the most popular, if not *the* most popular, format to share models in. Pretty happy with my success at the brief :)

<!-- more -->
