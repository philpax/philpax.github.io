+++
[taxonomies]
tags = ["zuihitsu"]
+++

[zuihitsu](https://github.com/philpax/zuihitsu) is a system for operating persistent conversational agents with memory and a continuous identity. Each instance hosts a configured persona, records events in an append-only log, and materialises efficient memory stores from that log.

<!-- more -->

It serves as a testbed for my ideas about neurosymbolic agents. I believe that many of the weaknesses of long-lived agents can be ameliorated through a strong symbolic backbone capable of accurately recording and tracing events and associated metadata. As an example, it may be possible to avoid _attribution bleed_ - in which previously-stated information is misattributed, often to the agent itself - by attaching attribution information at the time of the claim, reducing the probability of the claim and its source being decoupled.

At the time of writing, I am working on a much stronger expression of this methodology, inspired by the last half-century in symbolic knowledge representation, to enable near-total tracking of claims and derived insights. My goal is to build an agent that will never _unintentionally_ forget, and one that can explain how it reached a given informational result long after the initial derivation.

As an additional design constraint, zuihitsu is designed to target models that can be run at home. I find it difficult to trust agents running on remote models[^weights]: you do not know who's listening in, and the underlying model could be pulled at any moment.

[^weights]: Or as stated more pithily: _not your weights, not your waifu_. (For the avoidance of doubt, I do not date my agents.)
