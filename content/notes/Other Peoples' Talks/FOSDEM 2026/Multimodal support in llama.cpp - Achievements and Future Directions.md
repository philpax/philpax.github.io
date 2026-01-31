<https://fosdem.org/2026/schedule/event/LRZJEH-llama-cpp-multimodal/>

<!-- more -->

- Support timeline for multimodal: initial support in October 2023, removed due to buggy nature in May 2024, hacky touch-and-go implementations until libmtmd in May 2025
- The previous implementation used `libllava`, which interfaced ith `clip.cpp` to produce embeddings, which were then passed to `libllama`
  - This proved troublesome due to having to interface multiple libraries with differen tinstances
- `libmtmd` abstracts all input to be fed to the model
  - Encapsulates all input - including bundling `clip.cpp` - to pass data to `libllama`
  - Does true multimodal input + audio (LFM2.5-Audio), and is extensible
- `mtmd_tokenize` is a single function that can tokenise an input prompt + mixed modality inputs, and match them together (assuming that there are matching markers in the text prompt to correspond to the multimodal inputs)
- Future work:
  - Multimodal output: image and audio generation, by having `libllama` generate embeddings that are then passed to `mtmd`, which can then process that into the specific output format
    - Some models support interleaved text and multimodal output generation, so it's a bidirectional problem, as `mtmd` might need to give control back to `libllama`
    - Actual implementation is non-trivial; multiple ways to implement audio decoders (convolution, transformer, diffusion), and vision requires diffusion
    - There's an existing `diffusion.cpp` implementation, but it's not appropriate; image generation is a long way out
  - Video input: interleaved image and audio.
    - This is complicated by needing memory for all of these frames + audio buffers
    - `libmtmd` is developing a streaming API to deal with this; seems to be a pull interface where `libmtmd` can pull frames from a video decoder?
    - Also, all of the usual packaging concerns: how do you decode video in a portable way? Forced ffmpeg install? Separate versions? How do you deal with the UX hit? Discussion here: <https://github.com/ggml-org/llama.cpp/issues/18389>
- Contributing:
  - Look around the codebase, use what's already there
  - Open a discussion if you want to push significant changes
  - Try to reuse existing functionality
  - Use AI to discover, but not to write code
  - Keep things KISS and model-agnostic
- Question: How long until llama.cpp has a first-working version of multimodal output? No timeline right now, but 1-2 months maybe? Image generation will take more time.
