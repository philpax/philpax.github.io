+++
status = { kind = "active" }
[taxonomies]
tags = ["genresinspace"]
+++

[genresin.space](https://github.com/genresinspace/genresinspace.github.io) (actual [website](https://genresin.space)) is an interactive graph of music genres extracted from English Wikipedia. An efficient, multi-threaded Rust program processes entire Wikipedia dumps, using [wikitext_simplified](../Systems_and_languages/wikitext_simplified.md) to extract genres, their connections, and their artists in a format suitable for consumption by the frontend.

<!-- more -->

I've been working on this since early 2025, and it is "done", but I've been afraid to tie the bow on it and release it to the wild. There are a few UX tweaks I've been putting off for the longest time, and I owe the project a lengthy blog post discussing all of the design discussions and technical work involved along the way.

Still, I'm pretty proud of it, and I look forward to reusing its technology for other wiki-parsing projects.
