+++
title = "We Need A XROS"
date = 2021-12-21

[taxonomies]
tags=["xr", "xros", "end-of-2021-xr"]
+++

- part 2 of 2, see [xr is the next computing frontier]

- there is soon to be a rapid explosion of standalone or compute-unit-augmented XR headsets on the market
- Meta's short dominance of the market with the Quest lineup is about to end
- these headsets need to run an operating system, but right now they're all running their custom forks of Android
- no hate on Android, but it's just not a good fit
    - restrictions on general purpose computation
    - heavy integration of Java-based software at all levels of the stack, which is no good for a system that can never drop below its target framerate
    - tied to Google, primarily targeted at flat touchscreen systems
    - very difficult to run existing software

- it's simple: we need a free and open-source operating system running a free and open-source xr stack
- it should support every point along the XR spectrum: from completely real to completely virtual
- the sooner this is established, the better the industry will be for it
- we have a small window of opportunity to establish, if not in entirety, a beachhold
- it should make the vision outlined in [part 1] possible
- two problems to attack, both can be tackled at the same time, but should be split eventually:
    - the xr stack
    - a xros using that stack

# the stack

- the collection of software responsible for wiring up the hardware to user software
- from hardware

## components

### kernel

- linux
    - it's proven, it works, Android's using it
    - already has significant momentum and is easily reconfigurable
    - mainline support for much of the popular standalone hardware, including the Adreno chips used in the XR2, the most popular chipset

### openxr runtime

- monado
    - collabora project
    - already made great strides
    - supports several consumer headsets already

### display server

- stardust xr
    - equivalent to your x11/wayland
    - manages what the user can see

### slam

- open-source implementations in or linked to monado if possible
    - see [mateo de mayo's ongoing work](https://mateosss.github.io/blog/monado-slam)
- be prepared to run proprietary vendor code with bridging
    - not foss, but a stepping stone

### hand tracking

- collabora's got you there too
- ultraleap gemini is currently available on windows/x86
    - some vendors have android/arm drivers available
        - even chipset-accelerated (e.g. using xr2 dsp)
        - may need to use proprietary code here too

### user interface

- UI design is hard enough when it's just a 2D screen and kb+m/touch
- spatial UI design is an entirely new skillset, and you don't know what peripherals you'll have available
- I expect much churn in this department
- that being said, we can benefit from being able to run 2D applications on 3D layers
- can kick the can down the road and focus on the other parts of the experience

- still need:
    - headset settings
    - some form of application launcher
    - on-screen keyboard

### web browser

- need to consume normal 2d content of course
- but also need to support webxr
- browsers with webxr very limited
    - primarily just chrome

# the os

- integration of the stack into a cohesive platform that can be shipped on headsets

## proposal

- tentative name: Calvera, in keeping with the North Star naming

- based on arch linux (arm)
    - we're going to need bleeding edge software; nothing we're working on is stabilised
    - popular choice with extensive debugging and support options
    - [valve using it as the base for steamos 3], so there is precedent

- targeting hackable hardware first:
    - project north star + compute unit (x86)
    - project north star + compute unit (arm, raspi)
    - lynx r-1
    - oculus go

- integrates the stack as described above
- should be capable of running any desktop software
- but also capable of running any OpenXR or WebXR application
- keep it simple for now: focus on getting the core experience working well

# next steps

- talking to collabora and restarting fossxr.dev
- creating an organisation to coordinate this development
    - git repositories (likely on github)
        - taken the liberty of creating the fossxr repository
    - discord bridged to other services
    - representatives from each project
- start building and packaging Calvera builds

# recommended reading

- monado
- stardust xr
- atpeak talks
- fossxr.dev
- project north star
- simula / simulaos