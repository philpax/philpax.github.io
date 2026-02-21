<https://fosdem.org/2026/schedule/event/CZSPSC-llama-cpp-vulkan/>

<!-- more -->

- Vulkan: not just graphics, can use compute shaders
- Added Vulkan backend to llama.cpp - static graph structure that gets executed with a given backend on your hardware
- llama.cpp has backends for basically everything
- Flash Attention
  - Custom shader; big performance increase with long context
  - Required cooperative matrix extensions - abstraction for tensor cores
  - Work ongoing for AMD port; people reporting 4x performance increases
- DP4A - dot product over int8 to int32 - can execute in one cycle, and can be used for quantised matrix multiplication (q4 * q8)
  - Pays off for Intel Alchemist / AMD Vega20 / Nvidia Pascal
- Operator fusion
  - Find cases where big operations are run sequentially with short operations with intermediate memory load/stores, then delete the load/stores to reduce memory pressure
  - Not clear how this could be done in a dynamic way, some work is being done, but it's currently manually fused
- Lots of small fixes and improvements that accumulate: BFloat16, reducing CPU overhead, proper fencing, adding operations for Stable Diffusion, etc
- Benchmarks: CUDA still pulls ahead on NVIDIA, but Vulkan is competitive/sometimes beats ROCm on AMD
- Vulkan is very driver-sensitive; all kinds of behavioural discrepancies and incompatibilities
  - Some drivers are worse than others
- How do you optimise shaders?
  - Vulkan doesn't have any tooling on the same level of Nvidia NSight
  - Lots of trial and error required
- A vendor API is easier to work with and can give you ideal performance, but Vulkan can give you better compatability and smaller binary sizes
