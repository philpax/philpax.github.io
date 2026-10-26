+++
status = { kind = "active" }
[taxonomies]
tags = ["paxcord"]
+++

[paxcord](https://github.com/philpax/paxcord) is my personal Discord bot, written in Rust, scripted in Lua. It is meant to be low-maintenance (i.e. I don't have to watch out for my Node dependencies making me very sad), and to integrate into my other services.

<!-- more -->

It can make LLM inference calls through [ananke](../AI/ananke.md), and generate visual content through [rucomfyui_mlua](../AI/rucomfyui.md). This, combined with its asynchronous scripting support, enables the creation and execution of procedural-generative workflows on the fly. That's right, it can be used for generative jams!

Now, all I need to do is to have the LLM generate the workflows so that I don't have to remember ComfyUI model names...
