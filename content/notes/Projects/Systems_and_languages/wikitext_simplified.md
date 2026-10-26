+++
[taxonomies]
tags = ["wikitextsimplified"]
+++

[wikitext_simplified](https://github.com/philpax/wikitext_simplified) is a Rust library that wraps [`parse-wiki-text-2`](https://crates.io/crates/parse-wiki-text-2) with a simplified, nested representation (i.e. an AST) of wikitext (MediaWiki/Wikipedia markup). It provides utilities for extracting text and manipulating nodes.

<!-- more -->

Anyone who has ever worked with wikitext knows that it is demonic. As the `parse-wiki-text` README states, this is a markup format born of and cultivated in the PHP ethos. It is godawful to work with, and woe will befall you if you attempt to extract structured information from it.

Unfortunately, I have attempted to extract structured information from it on several occasions (e.g. [genresin.space](../Websites/genresin.space)). This library is my salve - as limited as it is - against wikitext's perversions.
