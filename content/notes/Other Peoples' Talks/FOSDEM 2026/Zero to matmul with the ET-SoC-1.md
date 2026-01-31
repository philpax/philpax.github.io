<https://fosdem.org/2026/schedule/event/T3PSFN-zero_to_matmul_with_the_et-soc-1/>

<!-- more -->

- Lots of RISC-V cores, connected to SRAM in "nodes", then connected to regular DRAM
- Should be entirely open-source soon
- 1093 cores; subtract specialised cores and there's 1024 to play with
  - 650 MHz, 8 vector lanes, FMA instructrions is 2 FP32, 10.6 TFLOP/s of FP32?
- Naive matmul runs at 7 MFLOP/s
- `mhartid` is sort of the equivalent of `threadIdx` and `blockIdx` - ranges between 0 to 2047, hardware does two-way hyperhtreading
- Up to 2465 caches, with no coherency between them
- Can use L instructions to talk to L2$ instead of per-hart cache; can use G instructions to talk to L3$
- Parallelising with L instructions gets to 3.4 GFLOP/s
- Adjusting the parallelisation to make better use of the harts gets to >10 GFLOP/s
- Next step is to use 8-wide SIMD with FP32x8. Not currently possible with LLVM, so hand-assembled. That gets to 104 GFLOP/s.
- Getting clever gets to 302 GFLOP/s.
- Manually unrolling some code from 1x8 to 2x16 changes the balance of instructions, allowing for more raw compute throughput - 1.64 TFLOP/s.
- Doing 4x32 changes the balance even more in favour of the FMAs - 2.94 TFLOP/s.
