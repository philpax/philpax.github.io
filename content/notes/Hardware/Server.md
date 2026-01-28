This is my personal server for services, AI, and more.

<!-- more -->

| **Component**      | **Model**                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _CPU_              | [AMD Ryzen Threadripper 3960X](https://www.amd.com/en/products/cpu/amd-ryzen-threadripper-3960x)                                                                                                                                                                                                                                                     |
| _CPU Cooler_       | A 360mm TR4 AIO whose name eludes me at this time                                                                                                                                                                                                                                    |
| _Motherboard_      | [Gigabyte TRX40 AORUS XTREME](https://www.gigabyte.com/Motherboard/TRX40-AORUS-XTREME-rev-10)                                                                                                                                                                                        |
| _Memory_           | [Corsair Vengeance RGB PRO 128GB (4x32GB) DDR4-3200](https://www.corsair.com/us/en/p/memory/cmw128gx4m4e3200c16/vengeancea-rgb-pro-128gb-4-x-32gb-ddr4-dram-3200mhz-c16-memory-kit-a-black-cmw128gx4m4e3200c16)<br/>(complete with irritating RGB that can't be turned off in Linux) |
| _GPU 1_            | [MSI GeForce RTX 3090 SUPRIM X 24G](https://www.msi.com/Graphics-Card/GeForce-RTX-3090-SUPRIM-X-24G)                                                                                                                                                                                 |
| _GPU 2_            | [Alienware OEM RTX 3090 24G](https://www.techpowerup.com/gpu-specs/alienware-rtx-3090-oem.b8257)                                                                                                                                                                                     |
| _SSD 0_            | [Samsung SSD 990 EVO Plus 4TB](https://www.samsung.com/us/computing/memory-storage/solid-state-drives/990-evo-plus-gen5-pcie-nvmetm-ssd-4tb-mz-v9s4t0b-am/)                                                                                                                          |
| _SSD 1_            | [Samsung SSD 970 EVO Plus 2TB](https://www.samsung.com/us/business/computing/memory-storage/solid-state-drives/970-evo-plus-2tb-mz-v7s2t0b-am/)                                                                                                                                      |
| _SSD 2_            | [Samsung SSD 970 EVO Plus 2TB](https://www.samsung.com/us/business/computing/memory-storage/solid-state-drives/970-evo-plus-2tb-mz-v7s2t0b-am/)                                                                                                                                      |
| _ZFS Pool_         | [4x Seagate Exos 24 TB (ST24000NM000C)](https://datablocks.dev/products/seagate-exos-24-tb-sata-recertified-hard-drive-st24000nm000c)                                                                                                                                                |
| _External HDD_     | [WD Elements 18TB](https://www.westerndigital.com/products/external-drives/wd-elements-desktop-usb-3-0-hdd?sku=WDBWLG0180HBK-NESN)                                                                                                                                                   |
| _Case_             | [Corsair Obsidian 750D](https://www.corsair.com/us/en/p/pc-cases/cc-9011035-ww/obsidian-series-750d-full-tower-atx-case-cc-9011035-ww)                                                                                                                                               |
| _Power Supply_     | [Be Quiet! Dark Power Pro 13 1300W](https://www.bequiet.com/en/powersupply/4394)                                                                                                                                                                                                     |
| _Operating System_ | [NixOS 25.11](https://nixos.org/download/) ([configuration](https://github.com/philpax/nixos-configuration))                                                                                                                                                                         |

# Motivation

My goal was to replace my existing home server while keeping a few constraints in mind: future upgradability, the ability to run CPU compute workloads, installing as many GPUs as possible, and - given I'm fitting this into an apartment - a tower form factor to keep noise down. I wanted my server to be able to serve all of my needs, including being able to play with LLMs of useful size.

I was initially targeting second-generation Epyc, which is readily available on eBay and AliExpress; this would let me upgrade to third-generation Epyc down the line, and motherboards with a great many PCIe 4.0 x16 slots are readily available. I aimed for a single-CPU system to avoid any potential headaches with RAM or PCIe slot distribution across NUMA nodes.

And then I ended up going with none of this at all.

An Epyc system would have cost around $2,500 USD. I was able to get a Threadripper 3960X system for around $1,500 USD off Blocket (Swedish Craigslist, let's say), and a 3090 for around $570 USD. This met my requirements and let me reallocate the extra cost towards GPUs.

I later installed a second 3090 - also around $600 USD - which has enabled me to run larger LLMs and to run multiple AI workloads simultaneously through [large-model-proxy](https://github.com/perk11/large-model-proxy).

The two-GPU setup has proven to be quite effective, but it lands on a specific point in the capability-speed-efficiency triangle: it's fast, but I'm limited to models that can be sharded across 48GB of VRAM (or that can take advantage of CPU offload, but that is brutally slow), and when in use, it is both drawing and emitting 600W of power.

Still, I'm pretty happy with it, and I may augment it with something that sits at another point on the triangle: perhaps a Mac Mini, DGX Spark, or a Strix Halo machine, all of which are slower, but offer more VRAM and run cooler. I'm sure there's interesting hybrid configurations to find!

Over time, I swapped out the original hard drives for a 4x 24TB ZFS pool and installed a 4TB SSD. This has solved my storage needs for the immediate - and probably not so immediate - future, but it's still not quite as low-touch as I would like; in an ideal world, I'd be able to set up the HDDs in a pool with the SSD acting as a transparent cache, so data that I access frequently is always fast. I think `bcachefs` might be able to offer something like this, but the status of that project scares me.

Administering this machine through NixOS was challenging at first, but has gotten easier over time, especially after ceding most of the actual configuration maintenance to Claude Code. A declarative configuration is tedious to set up at first, but it is genuinely pretty nice to be able to control the vast majority of my system's state from one versioned folder that I can reconfigure as required.

On the whole, I'd say this server is going pretty well for me. It did have a pretty nasty noise problem, but tweaking the fan curves has mostly fixed that, and now I get to enjoy a gentle hum in the background. If I was still sleeping in the same room as it, I'd have no need for a white noise generator.

Sadly, I have not found a way to kill the RGB LEDs embedded into the RAM,[^openrgb] and given the current pricing of RAM, a more permanent fix would require me to sacrifice a kidney.

[^openrgb]: I am using OpenRGB to kill _some_ of the RGB in the machine, but the RAM remains inaccessible to it. My solution has been to push the server against my couch so that as little light leaks out as possible. As a side benefit, it also helps dampen the resonance from the HDDs.
