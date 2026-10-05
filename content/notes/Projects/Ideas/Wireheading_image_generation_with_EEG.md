*Drafted by GLM-5.3-Flash.*

## Abstract

An installation piece where a participant's EEG signals, filtered and analysed in real time, condition a fast image generator, closing a visible loop: the image responds to how the participant reacts to the image. The subject is deliberate wireheading — the participant learning to seek and hold a brain state because the imagery rewards it, staring directly at the reward. Part personal rig, part exhibit piece; the aim is that what starts on a desk could survive strangers.

<!-- more -->

## Implementation

The loop is the design: participant sees a stimulus, reacts, and the generator re-renders within two seconds of the change in brain state. That latency budget is a hard constraint, because the work is about reaction rather than result — anything slower breaks the feedback that makes the wireheading legible. The exact generator is undetermined; the requirement is sub-2-second turnaround, which points at the recent real-time diffusion systems without committing to one. The headset is likewise open, a tradeoff between Muse-class convenience and research-grade signal from OpenBCI-style hardware.

Band powers, event-related responses, or a learned embedding can map onto conditioning signals — prompt fragments or embedding offsets — chosen for whether a layperson can volitionally steer them within minutes; collective neurofeedback work suggests people learn to drive spectral-band metrics that fast. The open question that shapes the piece is the reward structure: if relaxing is trivially rewarded the loop collapses into a screensaver, so the mapping has to make the sought state specific and contestable enough that participants are visibly chasing it.

## Prior art

- [Shared Neural Streams](https://dl.acm.org/doi/10.1145/3803784.3816875): EEG plus participant prompts drive StreamDiffusion visuals in Unreal in real time for paired participants — the closest existing system, but framed as a two-person shared experience, not reward-seeking.
- [Real-Time EEG Data Visualization Using Generative AI Art](https://doi.org/10.3390/designs9010016): Muse → TouchDesigner → Stream Diffusion at roughly 7 fps; abstract visualisation rather than decoded conditioning, with no participant-in-the-loop analysis.
- [Neuro.Flow / ANIMUS · Neuro Sync](https://www.adrianolombardo.art/en/neuro-flow.html): closed-loop aesthetic neurofeedback via inter-brain synchrony driving projections; abstract audiovisual output, not image generation.
- [My Virtual Dream](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130129): 523 laypeople in an immersive art installation learned to drive alpha/beta neurofeedback within about a minute — evidence for the learning-timescale assumption.
- [DreamDiffusion](https://arxiv.org/abs/2306.16934): EEG-to-image via Stable Diffusion and CLIP alignment, entirely offline.
- [Interpretable EEG-to-Image Generation with Semantic Prompts](https://arxiv.org/abs/2507.07157): offline, but its caption-mediated conditioning pipeline is arguably what makes a real-time version feasible.

No verified system combines real-time EEG-conditioned fast image generation with a deliberate reward-seeking loop; the nearest neighbours implement the technical loop without treating it as the subject.
