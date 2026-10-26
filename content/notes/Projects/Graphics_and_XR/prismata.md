+++
status = { kind = "abandoned", year = 2025 }
[taxonomies]
tags = ["prismata"]
+++

[prismata](https://github.com/philpax/prismata) is an AI-assisted voxel-sculpting research prototype, developed during my time at [Ambient](../Games_and_modding/Ambient.md) and later released publicly with the company's consent.

<!-- more -->

Specifically, I was exploring creating worlds through synthesising 2D imagery, projecting it into 3D space through depth estimation, and "filling in the blanks" by repeating this process from different angles and perspectives. Construction through photography, in a sense.

The models of the time couldn't make this work - the estimations were wrong and the image models struggled to produce consistent geometry - but I do sometimes wonder about picking it up and trying again. Much has changed since 2024, after all!

The last web build is theoretically accessible [here](/experimental/prismata/), but changes to the WebGPU spec have since broken it. (It also doesn't include any of the fun AI stuff: that required dedicated inference. Again, though, advancements in WebGPU inference can probably change this...)
