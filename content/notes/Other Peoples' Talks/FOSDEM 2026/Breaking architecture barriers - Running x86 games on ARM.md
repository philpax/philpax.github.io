<https://fosdem.org/2026/schedule/event/3ZRNDY-fex/>

<!-- more -->

- Tony has always had an interest in running games in places where they weren't meant to be run
- Professionally, studying physics, but didn't really work out
- Working on graphics drivers, like Vulkan drivers for AMD
- The airport express from Berlin is also called FEX ^_^
- FEX was started by Ryan Houdek seven years ago, Tony joined 4 years ago
- FEX is a translation layer between x86 and ARM to allow people to play games
- By default: game running atop engine atop [...] atop OS atop x86 CPU
- The standard solution is a binary recompiler that translates x86 to ARM
- For eah instruction, emit corresponding intermediate representation that fully specifies the semantics, then optimise that, then compile that to ARM
  - "My mouse cursor died. Linux moment."
- But it's not always that easy
  - A simple loop explodes in complexity
  - Each basic block has some translation overhead to set the stage for the following code
  - The `dec` instruction, for example, translates to three instructions: one to do the actual subtraction, and two for managing the flags before and after it
- There are, by some counts, 6,000 instructions. How do you even manage that?
- The x86 memory model also doesn't match to ARM
  - x86 offers strong consistency between threads; ARM does not
- System call wrappers - relatively straightforward, but there are hundreds, and some of them are quite tricky
- With a reasonably complete kernel compatibility layer + recompiler, everything else above works
- Can take more steps, like replacing the Vulkan x86 interface with a bridge to Vulkan ARM instead, removing a step
- The demo was that the slide was running in x86 Firefox in FEX, but the slides broke by this point, which was a bit awkward
- Yooka Laylee demo
- For Windows, can run x86 WINE atop FEX, but exploring integration with Windows ARM64EC
