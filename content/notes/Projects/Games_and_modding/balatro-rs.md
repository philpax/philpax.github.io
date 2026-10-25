+++
[taxonomies]
tags = ["balatro"]
+++

balatro-rs is an LLM-facilitated strongly-statically-typed port of Balatro, intended for use in reinforcement learning. Notably, it departs from the original game in architecture: it is a library designed to be run at scale, and all global state is isolated. It is also strictly turn-based (i.e. any given action resolves to a new observation instantly), unlike the original game, in which actions take time, allowing for other actions to take place during their execution. The code will remain unreleased out of respect to the original game.

<!-- more -->
