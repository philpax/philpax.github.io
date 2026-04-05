+++
title = "the big claude down"
short = "two months, a holiday, and a lot of Claude: a terrifying predicament"
datetime = 2026-02-22T18:00:00Z

[taxonomies]
tags=["ai", "pyxis", "website", "genresinspace", "blackbird", "perchanceinterpreter", "paxcord", "jc2mp", "paxboard", "rucomfyui", "idacsplitter", "paxhtml", "nixos", "prismata", "wikitextsimplified", "reutilities"]
+++

_With apologies to [Nine Inch Nails](https://www.youtube.com/watch?v=9gg2p7_PnTQ)._

Prior to this update, I was attempting to maintain a cadence of one to two weeks, sometimes slipping to three, between updates.

Unfortunately, in early November, I received this email:

IMAGEHERE

And being the industrious individual that I am, I endeavoured to drain those credits before they expired. I apologise in advance for what you're about to see.

<!-- TODO: move to blog, remove dot-pointed PRs, add subheadings for each section, add images for each section, add a hero image (a nondescript silhouette falling down amongst a sea of Claude Code crabs?), general edit pass, punch up introduction -->

<!-- more -->

# The Primer

I started off relatively slow; the Claude Code Web interface was buggy and crude - as I'll detail in a bit - but, once I found my cadence, it grabbed me and didn't let go. Days turned to nights turned to days, all while attending to my day job, but the siren song of Claude credits kept calling to me.

Around halfway through this period (they extended it ~~to collect more training data~~ as mea culpa for the bugginess of CCW), I found myself in the position of mending some of the more complex PRs with Claude Code locally. In exercising this, I was exhausting my regular Claude credits - being a mere Pro peon, of course - so, just for a little bit, I thought I'd upgrade to Max and 5x my limits.

Regrettably, that increased the amount of free credits I had from 250 USD to 1000 USD. This posed a much, much more intractable barrier to overcome, but try I did. Every project I could think of, that belonged to me, and that I was willing to submit sloppy PRs to, received sloppy PRs.[^sloppy]

[^sloppy]: "sloppy" in the sense that they came straight out of an agent, not that they were, you know, sloppily implemented. I made sure that they did what they were supposed to do, or left the codebase in a state where the work could be continued.

By now, you have seen the length of this post and its table of contents. I want you to know that, despite all of my efforts, despite the hundreds of PRs I submitted to dozens of projects, I was only able to get down to ~460 USD of credit in the time period.

Of course, I kept going; throughout December, while I was on holiday, I snuck in PRs, reviewed old PRs, and continued to indulge my madness. This update includes that work, too, but the majority of the big swings were during November. This post, then, covers the period between <MonthDayDate date="2025-11-06" /> and <MonthDayDate date="2026-01-07" />.

# Takeaways
Given how long it has taken me to write this post, I have largely forgotten a lot of the minute-to-minute takeaways I had from the experience, but here follows a high-level overview of my thoughts. I'm frontloading these as the remaining five thousand words are largely not of interest to the casual reader, outside of acting as proof that I did what I said I did.

It is worth noting that it took me two months to write this post up: the sheer amount of work done required a similarly sheer amount of work to document, and I found myself putting it off as to avoid confronting it. Nonetheless, we persist.

- talk about how some of this is also based on experiences I've had since, but I'll do my best to quarantine it to what I learnt during that two-month period

## Waiter, This Claude Code Web Is Raw
Claude Code Web was insanely buggy. I say "was" as it seems to have been rebuilt in the last few weeks; I would consider most of the feedback here to no longer be relevant.

With that being said, though, it would frequently stop responding to me, lose my messages, would require prodding to continue and would break down after a certain number of commits, with a new session required to get it back on track. It has a limited understanding of its own environment, and frequently requires handholding around more unconventional toolchains.

Functionality-wise, you could not easily work _with_ it - it was very much positioned as an in-and-out endeavour, and working on the same branch that it is working on can often lead to pain. Speaking of branches, you couldn't control which branch it would work from; it would always instantiate a new branch from your main branch, which means you couldn't easily continue existing branches without prompting it. This was especially irritating given the commit-breakage from above; continuing long-lived work was quite tedious. Thankfully, this has been resolved as part of its refresh.

- paradoxically, it also encourages you to continue working on the same PR (because parallel work with the same root is frustrating), but there's no mechanism for queueing up work
- this led me to having to manually feed the agent with work once it was complete with a subtask, which does not seem ideal as a working pattern
- this has improved in the meantime

- the web-based methodology also meant that I had to frequently pull down the changes, try them out locally, and then give next steps
- this is very slow and unpleasant, and I would not have done it if it were not for the free credits
- comparatively, running Claude Code locally is _much_ more freeing: I can dictate my changes, observe the result, and iterate quickly
- this one factor alone would stop me from using web-based agents for anything more than work that I can estimate will be one-shottable, or for work that I'm happy to pick up at a later date
- I would assume the vibe-coding platforms aim to address this by providing live previews, but you will never catch me using Lovable

Despite the shortcomings I experienced, I'd be lying if I didn't admit that there is certainly an appeal to the interaction model. Being able to kick off work while doing something else is compelling _if_ you can be confident that it will produce what you expect it to produce. One's sense of its capabilities grows with use, but you can never be sure, especially with larger tasks. I suspect that the ability for it to learn from its operators' sensibilities, something certain to ship this year, will improve this.

## You Really Can Just Build Things, But...
- should you?
- need to apply discernment in what you choose to build and how you choose to build it
- I'm happy with what I've built here, but I was definitely stretching myself towards the end of the credits to find literally anything that I could point the Claude Code Cannon at
- I ended up using it as an opportunity to update old code, instead: it doesn't necessarily have to be feature work you do, even though that's fun and exciting, but long-overdue maintenance
- you still need to have good product sense, I'm afraid, although the agents do have some degree of taste, especially if you bring your own to the table

## Context Is King
This is something that I failed to internalise until much later, and is better covered in [karashiiro's Coding Agents Are Easy, Actually](https://karashiiro.leaflet.pub/3mbfapvdvss2b) (disclosure: I proof-read and edited this post), but the idea is simple: the easier you make your agent's life, the easier you will make your own life.

What this means is that you should be paying attention to where it stumbles, and _writing documentation_ (or having it do it for you!) to capture that pain point and how to resolve it. If it's chafing against the CI, tell it what to check ahead of time. If it's repeatedly making the same kinds of code style mistakes, write down the specific nuances it's getting wrong. If it doesn't know what to test against, let it know.

Not only will this benefit your agent, it'll also benefit _you_, as well as other human developers. I've always considered myself a proponent of good documentation, but an agent finally gives me a way to model how other developers might consume the paltry documentation that I've put together, and boy, have I found my codebases wanting in places. Fixing this really does pay off.

As per karashiiro, I would suggest putting this documentation in a `CONTRIBUTING.md` and, only if necessary, using agent-specific documentation (e.g. `CLAUDE.md`) to direct your agent to that file. To the greatest possible extent, you want to make sure that the context that your human programmers and your agents share are identical. Any drift will make at least one of those parties unhappy.

## Quality Drops As Much As You're Willing To Let It Drop
- a common sentiment is that AI can and will make the quality of your code worse
- I would agree with this to an extent, but there are nuances to it
- for some of these, I have freely let the quality drop, but that's because it doesn't matter for those projects; I'm willing to tolerate nonoptimality if it gets the job done
- this is especially true for the projects for which the blast radius is limited: misrendering something, for example, is a visual glitch, not a showstopper
- some of these projects have vibe-coded UIs with the vibe-coded aesthetic: purple and green gradients, Inter, etc. but you know, that's fine, they're demos - it doesn't matter if they look like slop if they communicate the concept!
- however, just because it _can_ drag the quality of your project down doesn't mean it _will_; you control the buttons you press
- providing context can help amelioriate this significantly by giving it the information it needs to write code in your codebase's register
- you should be accountable for the code you produce, and that means reviewing the agent's output to make sure it meets standards, including your own personal standards
- deslop freely and frequently: [generating code is cheap](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/), so build up your raw code-matter and [sculpt it](https://eikopf.bearblog.dev/subtractive-synthesis/) until it's actually good
- and of course, the corollary applies: you can use AI to generate all of the rigour that you, as a human, would have been otherwise too effort/time-pressed to do yourself. there's no excuse not to write tests, design more stringent APIs, write better documentation, and push the quality frontier. see what [Oxide have to say about this](https://oxide-and-friends.transistor.fm/episodes/engineering-rigor-in-the-llm-age).

# The Siren Call of The Slop Stack

- the agents will pull you towards [their preferred stacks](https://amplifying.ai/research/claude-code-picks), where preferred comes from the common folklore of the internet, RLHF on data from [underpaid and exploited data workers](https://cwa-union.org/ghost-workers-ai-machine), RLHF on data from [less underpaid data workers](https://builtin.com/articles/train-ai-side-hustle), or RLHF on the taste of whichever employee was processing the data that day
- most of the time, this choice is fine, and honestly, I've given into the call much of the time
- this means I've doubled down on React + TypeScript + Tailwind as my frontend stack, for example
- however, you should be aware that this is not always the right choice, and that there are other solutions worth considering, too
- as a somewhat dire example - I had a passing interest in Svelte(Kit), but never engaged that interest because it didn't seem beneficial enough to do
- now that the agents are especially good at the SlopStack™️, I'm just not that inclined to spend time on SK. at the same time, I could just be growing too old and employed to spend my free time learning new frameworks to do the same thing
- however, I do think it could go the other way: for example, you could use an AI to help you learn these lesser-known frameworks with more reactive feedback
- even if their inherent knowledge is wrong or out of date, they're excellent at consulting reference documentation, and can thus self-correct reasonably well

## Reviewing Is A Bottleneck
- in addition to the above, there's no getting around it: at a certain point, _you_ are the impediment to getting more work done
- it doesn't matter if you can dispatch a thousand agents to do ten thousand units of work if you're still reviewing one unit at a time
- there are three answers to this, all of which I have utilised to some extent:
  - accept that you can only review so much, and pace yourself accordingly
  - accept the slop, either for now (and promise you'll clean it up later), or forever (because it doesn't matter if your one-time-use script is full of holes)
  - enlist other LLMs to help review the changes you've made
- which one is the right answer for you, and in which proportion, is a question that depends on your risk tolerance, what your expected output is, and the blast radius of the software
- in an ideal world, we would not ship more than we can verify, and we would not push ourselves beyond our limits
- but you gotta do what you gotta do, so do what you can to make sure you're being responsible, and ensure your team is, too

## Synchronisation Is A Bottleneck
- the vast majority of these projects are open-source and solo endeavours
- this means I was free to take very, very big swings, and knock out major changes in one go, according to my taste and my schedule
- this... is not generally the case
- at work, where I was also using agents, I was considerably more sedate: I was working on brownfield(-ish) projects with other people, and ensuring that we are all on the same page is more important than raw throughput
- I certainly could have opened up the slop tap, but then I'd have to explain what I did to my coworkers, and then I'd have to go through the same exercise when they spread slop sauce all over my changes
- this also ties into the reviewing bottleneck, and a similar kind of laissez-faire will be necessary to get maximal throughput, which is not necessarily a good thing
- of course, I'm describing _inter_-contributor synchronisation, but _intra_-contributor synchronisation is a problem, too
- for some of these, I had multiple PRs open at the same time for the same project, and making sure they didn't step over each other toes' ended up being quite frustrating
- luckily,

<BlueskyPost post="https://bsky.app/profile/segyges.bsky.social/post/3mdwkxdqjy22z" />

- so it's not as irritating as it might otherwise be. it's also a good chance to explore other paradigms, like [stacked diffs](https://newsletter.pragmaticengineer.com/p/stacked-diffs) or [jujutsu](https://jj-vcs.dev/)
- I expect to see more solutions to this in future. for my sake, I hope they are not [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)-shaped.

## Token Anxiety
I hesitate to say this out loud, given how the linked post was received, but [token anxiety](https://bsky.app/profile/timkellogg.me/post/3mevhhd4lbs2b) is real. When you have the ability to affect major changes across software with just a few keystrokes, your own volition becomes the bottleneck, and you will find yourself chafing at the bit to issue more and more work to make the most of your resources.

This was especially exacerbated by the numerical value attached to the credits. I saw the number and felt driven to bring it to zero by dispatching as much work as humanly possible - and in some cases, beyond humanly possible - and it led to rather unhealthy use practices. During the worst of it in November, I found myself sleeping extremely late - sometimes, not at all - so that I could send off more work to be done, review it, and test it. It may have been one of the most productive months of my life, but it was also profoundly self-destructive. This breadth of work led me to experience what I'd describe as mini-burnout, where I was unable to engage with anything I'd touched as a result of the anxiety.

- not the only one to describe this, see Yegge of Gas Town fame[^yegge]: <https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163>

[^yegge]: and other famous works, of course, but Gas Town is what he is known for this years

I cut down on the amount of work I was doing on my own projects during this period - especially as I was meant to be on holiday! - and took some time to recover. For the most part, I'm fine now - back to a healthier rhythm, in touch with my network, engaging in other hobbies - but, if left unchecked, I could see myself (and others who share my personality type) slipping right back into it again.

With that being said, I suspect that at least a significant portion of _my_ particular display here was a result of the behaviour described in this post by Ethan Mollick:

<BlueskyPost post="https://bsky.app/profile/emollick.bsky.social/post/3mhg6h2jnzk2v" />

It's out of my system now, and I don't think it'll come back, at least not to the same extent. I hope, anyway!

## If You Don't Think About It, It Can't Hurt You: Ethics
- of course, the ethics of the industry could have its own post written about it, or several
- there is nuance here - it's not an ethical black hole - but I'm also not going to pretend that it's entirely rosy, either; it's far from it
- there's no shortage of issues: the mass-reallocation of resources, the training of people's replacements using their own work, the shoehorned-in haphazard deployments, the mass-production of violating imagery, the destruction of recorded truth, etc
- many, but not all, of these problems are a consequence of capitalism: but that doesn't help us when we all live in capitalist societies
- it is something to think about as we use these services, but I also believe the cat is firmly out of the bag and the best thing we can do is to push for less-harmful choices
- Anthropic have shown themselves to be the least ethically compromised of the major providers, but I'm under no illusions that this will remain the case forever, especially given their allegiance to the US
- my hope is that local models will catch up, and the hardware to run them will get cheaper
- at the same time, our societies are not well-placed to handle a world in which everyone has informational (super)weaponry

## The End of Coding?
I have written a single-digit percentage of code by hand since November. [This is not an uncommon sentiment](https://simonwillison.net/2026/Jan/4/inflection/), but I want to emphasise it: our profession _has_ fundamentally changed, and the aftershocks from this will rumble throughout as the industry catches up.

- the agents really have improved. I've been using them for the last few years in progressive increments, from asking ChatGPT to produce a function for me in 2023, to using Copilot to autocomplete code, to using Cursor to generate code in-place in 2024, to using Cursor to do more agentic work with the Claudes, to using Claude Code directly in 2025, to now
- the step change at each stage has been noticeable, but Sonnet/Opus 4.5 are more like a hill change
- far more autonomous, far more capable of Doing What You Want at scale, especially on greenfield
- within this period, CC wrote [a complete interpreter from scratch with a vague spec](#philpaxperchance-interpreter), [refactored and rebuilt much of an existing (albeit small) compiler to extend its functionality and improve its robustness](#ferrobrewpyxis), [significantly improved my music player](#philpaxblackbird), etc
- these are not trivial tasks! most junior / intermediate programmers would struggle with managing the complexity here

This doesn't apply for all domains to the same degree: there are many tasks and languages for which the models do not perform at the same standard, or for which they make novice mistakes. I'm not convinced that bulwark will hold forever, but even if it does: the rest of the industry does _not_ consist of these domains, and I very strongly suspect that fewer people per company will be required to do the same amount of work in most areas of programming endeavour.

- it's also not clear to me what will happen to the industry pipeline here
- it was already very hard to justify hiring juniors when seniors were readily available and can be almost immediately useful
- it's going to be so much worse when seniors can use LLMs to replace the output of all of the juniors that they would have otherwise tasked
- the forward-thinking thing to do is to invest in juniors to keep the pipeline alive, and to enjoy the fuzzy feelings of mentoring the next generation and such
- but we all know that's not how things work, and I don't have any clear answers here
- perhaps juniors can push further and faster with LLMs themselves? perhaps they can blaze their own path? but that's not going to be for everyone, and these services cost money

The optimist may suggest that a thousand flowers will bloom as a result of this: after all, if everyone has much more leverage available to them, at least a few of those people will be industrious enough to strike it out on their own and build their own futures. I'd like to say that I believe in this - that there will be something for everyone in some form - but I fear things will not be so neat.

I don't know. More thought is necessary here. What does an optimistic version of the future look like, and how do we get there? What does it mean to be a programmer? What does this mean for white-collar work as a whole? What does it mean for _work_ as a whole? These are questions that I'm still pondering, and am certainly not equipped to answer in this particular post. But you should start thinking about them, too.

# Projects

## [ferrobrew/pyxis](https://github.com/ferrobrew/pyxis)
IMAGEHERE: Pyxis viewer

Pyxis is a schema language for memory structures that I have been working on on-and-off for the last few years. The process of modding games (and other applications) starts with reverse-engineering: using a variety of techniques and tools, one comes to understand behaviours of interest in the application, and how data flows through to enable those behaviours, and how that data is structured.

Once you have that understanding, you need to be able to use it within your mod to affect some change in the game. Modifying code is a relatively-solved problem: you can "detour" functions such that, when they are executed, they will instead execute your code, through which you can intervene and change the game's behaviour. Combine enough of these detours - or patches[^patches] - and you can direct the game as you wish.

[^patches]: Instead of detouring functions and replacing their behaviour/the arguments with which they are called, you can instead patch individual instructions for isolated behavioural changes. You can go surprisingly far with this: disabling a single condition and making it always-on or always-off can radically alter a game: after all, all God Mode does is disable your ability to take damage.

However, as part of this, you need to be able to represent and manipulate the game's data structures. Because we're relying on a reverse-engineered representation, we do not have a complete picture of these structures, and even when we do, they are not guaranteed to match the representation of the language our mod is written in. Additionally, not all mods are written in the same language. This makes representing these structures challenging and often language-specific.[^clientstructs]

[^clientstructs]: As an example of such a solution, [FFXIVClientStructs](https://github.com/aers/FFXIVClientStructs) documents Final Fantasy XIV's internal structures for C# and the IDA decompiler. The latter effort is supported through a Python script that ingests a [monster YAML file](https://github.com/aers/FFXIVClientStructs/blob/main/ida/data.yml), which works, but, well, look at it...

Pyxis is an effort to solve this: these structures are defined separately from your implementation language, and then compiled to a byte-perfect representation of that structure for your language. It has been in use in a few projects - none truly released, as it were - but, being a side project of a side project, I have never dedicated the time to fill in the potholes and address the features you'd come to expect from a modern language.

Of course, these last two months have allowed me to address that. Let us begin.

- [Add associated functions support to enums](https://github.com/ferrobrew/pyxis/pull/42) <PrMeta date="2025-11-06" add=128 sub=1 />
- [Update repository with small changes](https://github.com/ferrobrew/pyxis/pull/43) <PrMeta date="2025-11-06" add=1 sub=4 />
- [Add free-standing function support to Pyxis compiler](https://github.com/ferrobrew/pyxis/pull/44) <PrMeta date="2025-11-06" add=219 sub=22 />
- [Implement `min_size` attribute](https://github.com/ferrobrew/pyxis/pull/45) <PrMeta date="2025-11-06" add=298 sub=7 />
- [Replace `syn` parser with `chumsky`](https://github.com/ferrobrew/pyxis/pull/46) <PrMeta start="2025-11-08" end="2025-11-12" add=3130 sub=876 closed />
- [feat: add JSON documentation backend](https://github.com/ferrobrew/pyxis/pull/51) <PrMeta date="2025-11-11" add=3916 sub=11 />
- [Token-based parser](https://github.com/ferrobrew/pyxis/pull/52) <PrMeta start="2025-11-11" end="2025-11-16" add=5056 sub=749 />
- [Build JSON backend API](https://github.com/ferrobrew/pyxis/pull/53) <PrMeta date="2025-11-12" add=51 sub=1 />
- [Pyxis viewer](https://github.com/ferrobrew/pyxis/pull/54) <PrMeta date="2025-11-13" add=3366 sub=1 />
- [Add pyxis fmt command for formatting files](https://github.com/ferrobrew/pyxis/pull/56) <PrMeta start="2025-11-16" end="2025-11-17" add=594 sub=152 />
- [Improve semantic layer error reporting with spans](https://github.com/ferrobrew/pyxis/pull/57) <PrMeta start="2025-11-16" end="2025-11-27" add=6550 sub=4011 />
- [Fix formatter and add tests](https://github.com/ferrobrew/pyxis/pull/58) <PrMeta date="2025-11-17" add=393 sub=31 />
- [Better mobile support for viewer](https://github.com/ferrobrew/pyxis/pull/59) <PrMeta start="2025-11-17" end="2025-11-24" add=290 sub=88 />
- [Remove `Located<T>`](https://github.com/ferrobrew/pyxis/pull/62) <PrMeta date="2025-12-04" add=1610 sub=1326 />
- [Implement braced imports](https://github.com/ferrobrew/pyxis/pull/63) <PrMeta date="2025-12-04" add=696 sub=35 />
- [Add support for type aliases](https://github.com/ferrobrew/pyxis/pull/64) <PrMeta start="2025-12-04" end="2025-12-14" add=943 sub=5 closed />
- [Refactor store creation and sharing across phases](https://github.com/ferrobrew/pyxis/pull/67) <PrMeta date="2025-12-12" add=443 sub=365 />
- [fix: prevent parser panics from out-of-bounds token access](https://github.com/ferrobrew/pyxis/pull/68) <PrMeta date="2025-12-12" add=294 sub=87 />
- [chore: update ariadne from 0.4 to 0.6.0](https://github.com/ferrobrew/pyxis/pull/69) <PrMeta date="2025-12-12" add=59 sub=28 />
- [refactor: convert LexError from struct to enum](https://github.com/ferrobrew/pyxis/pull/70) <PrMeta date="2025-12-12" add=129 sub=76 />
- [Type aliases support](https://github.com/ferrobrew/pyxis/pull/71) <PrMeta date="2025-12-14" add=855 sub=74 />
- [feat(viewer): add nested memory layout view for types](https://github.com/ferrobrew/pyxis/pull/72) <PrMeta date="2025-12-14" add=310 sub=3 />
- [feat(json): add source file paths and line numbers to JSON output](https://github.com/ferrobrew/pyxis/pull/73) <PrMeta date="2025-12-14" add=1171 sub=204 />
- [fix(semantic): improve error diagnostics for unresolved types](https://github.com/ferrobrew/pyxis/pull/74) <PrMeta date="2025-12-14" add=492 sub=125 />
- [Add generic type support to Pyxis](https://github.com/ferrobrew/pyxis/pull/75) <PrMeta date="2025-12-17" add=5271 sub=1071 />
- [Refactor code to remove duplication](https://github.com/ferrobrew/pyxis/pull/76) <PrMeta date="2025-12-17" add=176 sub=331 />
- [Build proc macros for location traits](https://github.com/ferrobrew/pyxis/pull/77) <PrMeta date="2025-12-17" add=505 sub=885 />
- [Add semantic tests for privacy level access](https://github.com/ferrobrew/pyxis/pull/78) <PrMeta date="2025-12-18" add=524 sub=8 />
- [Add enum for predefined backend types](https://github.com/ferrobrew/pyxis/pull/79) <PrMeta date="2025-12-18" add=43 sub=11 />
- [Add Pyxis CI build validation script](https://github.com/ferrobrew/pyxis/pull/80) <PrMeta date="2025-12-18" add=43 sub=0 />
- [Add atomic integers and bools support](https://github.com/ferrobrew/pyxis/pull/81) <PrMeta date="2025-12-18" add=697 sub=210 />
- [Add transitive verification of copyable/cloneable](https://github.com/ferrobrew/pyxis/pull/82) <PrMeta date="2025-12-18" add=574 sub=1 />
- [Refactor test assertions to use exact structural matching](https://github.com/ferrobrew/pyxis/pull/83) <PrMeta date="2025-12-18" add=515 sub=547 />
- [Organize semantic tests into category-based modules](https://github.com/ferrobrew/pyxis/pull/84) <PrMeta date="2025-12-18" add=3373 sub=3223 />

## [philpax/perchance-interpreter](https://github.com/philpax/perchance-interpreter)
![Vibe-coded frontend for the Perchance interpreter](./perchance-interpreter-1.png)

[Perchance](https://perchance.org/welcome) is

> a platform for creating and sharing random generators

but if you search for it now, the top results are the free AI image and text generators it offers, which I find to be a shame, because Perchance-proper is a fascinating project in itself.

In exploring its generators, you will find a vibrant community - and ecosystem - defining procedural generators that span all kinds of interests and fandoms. Generators can be used from other generators, enabling a beautiful amount of emergent complexity. Any fan of procedural - not generated - text should play around with it: alongside [Tracery](https://tracery.io/), you will find some of the best examples of the medium.

Unfortunately, the Perchance interpreter and language is much like MediaWiki and Wikitext: it was implemented as an ad-hoc wrapper around its implementation language (in this case, JavaScript) that is impossible to decouple from its operating environment. For a variety of reasons, I have been interested in running Perchance generators outside of the Perchance website - but that's just not possible.[^perchancerec]

[^perchancerec]: Perchance's solutions for this involve [making requests to an API](https://perchance.org/api-tutorial) or [downloading an all-inclusive HTML file for the generator](https://perchance.org/api-tutorial). Regrettably, neither of these options allows for a generator to be embedded in an offline, non-web application. I mean, I suppose you could use something like [Lightpanda](https://lightpanda.io/) to run the latter, but you deserve what you get if you do that.

I've wanted to address this for a long, long time. I - [and others](https://github.com/utoxin/PyChance) - have attempted to do this in the past, but the scope of the task is just too large to do without a few weeks of time dedicated to the task, which I was unable to offer.

I assume you can see where this is going. I extracted the base documentation for Perchance as a Markdown document, raised my Claude Code hammer, and then I proceeded to [build a Rust interpreter for Perchance](https://github.com/philpax/perchance-interpreter/pull/1) <PrMeta start="2025-11-11" end="2025-11-12" add=5102 sub=2 />. I did this by saving the core documentation for Perchance (represented as HTML or as the output of a generator itself), including several test cases, then passing it to Claude to produce a Markdown document, which I then gave to Claude Code. In hindsight, I wish I'd saved this resulting spec to allow Claude to reference it later.

This was not done without some thought, of course. I wanted the interpreter to abide by several restrictions: notably, I wanted it to be as dependency-free as possible, to make it easier to embed in other things, so I elected to roll a custom parser. This would have normally been a very tedious endeavour, but the interesting thing about vibe-coding is that both the easy and the hard route work out to the same amount of time investment - so there's no excuse not to take the hard-for-you, good-for-your-users route.

Of course, that was the start of the journey, not the end. Upon testing the interpreter, I immediately noticed that a variety of generators failed, so I [gave it tests and told it to make them pass](https://github.com/philpax/perchance-interpreter/pull/2) <PrMeta date="2025-11-12" add=480 sub=8 />, then [had it fix indentation issues with the parser](https://github.com/philpax/perchance-interpreter/pull/3) <PrMeta date="2025-11-12" add=80 sub=15 />. As it turns out, I'd given it an incomplete version of the documentation, so [rectifying that gave me more tests and more compliance](https://github.com/philpax/perchance-interpreter/pull/4) <PrMeta date="2025-11-12" add=219 sub=22 />, and then I did that two [more](https://github.com/philpax/perchance-interpreter/pull/5) <PrMeta date="2025-11-12" add=310 sub=54 /> [times](https://github.com/philpax/perchance-interpreter/pull/6) <PrMeta date="2025-11-12" add=2 sub=0 />.

With the interpreter now mostly functional, I needed a way to test it out, so I [built a React frontend (with live preview!)](https://github.com/philpax/perchance-interpreter/pull/7) <PrMeta date="2025-11-12" add=5432 sub=0 />, then [deployed  it to GitHub Pages](https://github.com/philpax/perchance-interpreter/pull/8) <PrMeta date="2025-11-12" add=134 sub=60 /> - specifically, this [very website](https://philpax.me/experimental/perchance/) - and fixed a minor [Vite configuration issue](https://github.com/philpax/perchance-interpreter/pull/9) <PrMeta date="2025-11-12" add=1 sub=0 />.[^perchanceefficiency]

[^perchanceefficiency]: This would have been faster to do by hand, but I was trying to maximise both my parallelism and my use of credits.

At this point, the interpreter was able to execute one generator well. One of Perchance's most notable features, however, is being able to invoke other generators: this lets you reuse existing generators and compose them into your own generator, including other people's generators, which in turn grows the output space for your own generator.

It was thus important that I [implemented the ability to import and export generators](https://github.com/philpax/perchance-interpreter/pull/10) <PrMeta start="2025-11-12" end="2025-11-13" add=14599 sub=616 />. There was some nuance in this, as I had to think about how to implement this within the [pure design](https://en.wikipedia.org/wiki/Purely_functional_programming) I had for the interpreter: running the interpreter with the same state should always produce the same result. In the end, I chose to have the interpreter take an async trait that mediates the sourcing of imported generators. 
hUnfortunately, in doing so, I introduced multiple dependencies - `async-trait`, and worse, `tokio` - but the latter, at least, was optional.

After this, I [added a built-in for `joinLists`](https://github.com/philpax/perchance-interpreter/pull/11) <PrMeta date="2025-11-13" add=460 sub=14 />. This is a little controversial: this is not a built-in in Perchance; it is instead an imported JavaScript plugin. The truth about Perchance is that it is actually all JavaScript - the language can be considered, in some ways, an alternative frontend for JavaScript - but I did not want my interpreter to embed a JavaScript interpreter, so I elected to cheat and hardcode relevant plugins, instead.

The existence of `joinLists` and generator imports allowed me to test out more complex generators, and in doing so, I immediately discovered several issues. Luckily, though, if you can verify it, Claude can fix it, so first I [addressed an issue with `consumableList`](https://github.com/philpax/perchance-interpreter/pull/12) <PrMeta date="2025-11-13" add=211 sub=23 />, then [updated the README to better reflect the state of the project](https://github.com/philpax/perchance-interpreter/pull/13) <PrMeta date="2025-11-15" add=127 sub=261 />, then [implemented the features that were noted to be missing in the README](https://github.com/philpax/perchance-interpreter/pull/14) <PrMeta date="2025-11-16" add=731 sub=60 />. It is a strange way to develop - having your agent document where the gaps are, and then filling those gaps in with the very same agent - but it is effective!

With this, I was approaching a suitable level of completion for the project: it was easy to integrate, and able to run the generators I cared about. However, in the Post-Rust Era™️, there's no excuse for having poor diagnostics, so I integrated [the `ariadne` library for error reporting](https://github.com/philpax/perchance-interpreter/pull/15) <PrMeta start="2025-11-16" end="2025-11-17" add=1701 sub=578 />, and [augmented all code-sourced items with a `Spanned` type that tracked their origin](https://github.com/philpax/perchance-interpreter/pull/16) <PrMeta date="2025-11-17" add=569 sub=517 />. I will admit that this ran counter to the zero-now-low-dependency methodology I was developing with, but in my defence, have you seen `ariadne`'s error reports? Worth it!

I took stock and had Claude look over the current state of the interpreter to [update the README and implement any missing functionality](https://github.com/philpax/perchance-interpreter/pull/17) <PrMeta date="2025-11-19" add=639 sub=25 />. I would have preferred for these to not go out of sync in the first place; in hindsight, I believe that better `CLAUDE.md` authoring would have helped with this, but at this time, I was still very much a newbie to full-send vibe-coding.[^vibecoding]

[^vibecoding]: Of course, in some sense, I still am: I do not generally vibe-code, even at the time of writing. I look over the code being produced, because the output of Opus 4.6, as good as it is, is still prone to making mistakes that can balloon into terrible misadventures if not addressed early. Still, I have some... _limited_... respect for the people building and operating software printers.

With these changes, I now had a fully-functional Perchance interpeter, at least for [the use cases I had in mind](#philpaxpaxcord). At this point, though, I started to wonder - what can I do with this entirely new implementation, not beholden to the same constraints as the original implementation? And then the answer popped into my head, and it was obvious: [add a tracing debugger for generators](https://github.com/philpax/perchance-interpreter/pull/18) <PrMeta date="2025-11-19" add=1512 sub=85 />.

![A trace view / debugger for a given Perchance generation, as part of the frontend](./perchance-interpreter-2.png)

That was particularly inspired, I think. Of course, I'm not wholly happy with how it worked; I ended up later [removing the tree view that I had in the original PR](https://github.com/philpax/perchance-interpreter/pull/20) <PrMeta date="2025-11-23" add=17 sub=374 />, but I think these are resolvable issues. I think it is tremendously cool that this is now possible, and figuring out what your generator is actually doing is now much less tedious than the guess-and-check method that authors previously had to resort to.

Finally, I [refactored the evaluator into multiple modules](https://github.com/philpax/perchance-interpreter/pull/19) <PrMeta date="2025-11-19" add=3394 sub=3089 />. A rather dull note to close out on, but one important to note, I think: left to their own devices, the agents will produce repetitive slop, but you can also use them to unslop by having them refactor the code to a better state, especially if you've actually looked at the code and can see where they're deficient.

As a whole, I'm quite happy with how this turned out. As mentioned at the start, I have always wanted an alternate embeddable implementation for Perchance, and now one exists. I do not think it is perfect: I am sure that there are behavioural differences to the original, and bugs that permeate the codebase that I have not explicitly named and corrected, but these are fixable issues in a way that "an embeddable Perchance interpreter does not exist" was not.

## [philpax/paxcord](https://github.com/philpax/paxcord)
IMAGEHERE: paxcord demonstrating agentic generation through Lua script

`paxcord` is my personal Discord bot, optimised for my own use cases. Notably, I am a fan of the Lua programming language, and I've carried that into this here bot by giving it fairly extensive Lua scripting capabilities. The work here was primarily in extending that capability to the point of near-absurdity.

The first step was to [integrate the above Perchance interpreter](https://github.com/philpax/paxcord/pull/3) <PrMeta date="2025-11-12" add=58 sub=0 />, such that I could test out the generator in a social capacity. Once I had my fun with that, I started to think about a new way to interact with Lua, and decided I'd best prepare for it by [exposing currency conversion to Lua](https://github.com/philpax/paxcord/pull/4) <PrMeta date="2025-11-12" add=702 sub=19 />.

The integration method was simple in concept, but troublesome in execution - it was to [convert our existing Rust commands to Lua](https://github.com/philpax/paxcord/pull/5) <PrMeta start="2025-11-16" end="2025-12-03" add=1208 sub=844 />, making them much easier to iterate on and to add new commands with. This proved to be troublesome within the Claude Code Web framework, as can be seen from the time taken: I had to iterate on the interface and test it extensively.

After that, well, I could finally do what I was working towards. Apologies for [the spoilers](#philpaxrucomfyui), but my end goal for the Lua conversion was always to [integrate rucomfyui](https://github.com/philpax/paxcord/pull/6) <PrMeta date="2025-12-03" add=554 sub=29 />, so that I could combine Perchance (for prompt generation) and an AI image model for social procedural-generative art. And it worked!

Finally, to close out, I added a [Lua reply handler](https://github.com/philpax/paxcord/pull/7) <PrMeta start="2025-12-16" end="2025-12-17" add=815 sub=72 /> to allow continuing generation chains, and fixed [a bug where the first message was not present in the reply handler](https://github.com/philpax/paxcord/pull/8) <PrMeta date="2025-12-17" add=5 sub=0 />.

## [philpax/jc2mp.github.io](https://github.com/philpax/jc2mp.github.io) / [jc2mp/jc2mp.github.io](https://github.com/jc2mp/jc2mp.github.io)
![A screenshot of the JC2-MP wiki, as rendered by this bespoke SSG](./jcmp-wiki.png)

A decade ago, I was a developer on the [multiplayer mod for Just Cause 2](https://jc-mp.com/). I slowly phased out my involvement over the years - what with university and employment obligations - and primarily remained as an occasional community presence, helping people out where I could and whatnot (ask me sometime about the follies of achievements).

In 2021, a [OVH datacentre](https://www.datacenterdynamics.com/en/analysis/ovhcloud-fire-france-data-center/) burnt down. Unfortunately, that also happened to be the datacentre in which the JC2-MP website and all of the surrounding infrastructure was hosted; we had backups, but they were out of date, and the other members of the team were as similarly detached as me, which meant that our website remained down for the next few years.

Some time after that, we were able to restore a static version of the website through GitHub Pages, and that has served its informational role well. However, it was lacking a fairly significant piece: the wiki, which documented how to use our scripting API, among other details. Community members passed their copies of the docs around, and I hosted our (very out of date) backup of the raw Wikitext up on GitHub, but it was clear that it wasn't really a sustainable solution.

The only way to get the wiki in a human-digestible form would have been to stand up a MediaWiki instance, which none of us were willing to do, and so the problem lingered for some time. During 2025, though, I had a realisation: I had built a relatively robust library for parsing Wikitext (for [genresin.space](#genresinspacegenresinspacegithubio)), as well as infrastructure for generating static websites in Rust ([paxhtml](#philpaxpaxhtml), originally built for this very website). One thought led to another, and I found myself building a SSG to resurrect our MediaWiki dump.

I chose to do this because I wanted something that would require no infrastructure, and could be deployed to GitHub Pages. Most of the SSG was effectively "done" months prior to this, but it was undeployable: our pages were heavily reliant on templates containing partial table syntax, which needed to be evaluated in the correct recursive order to render correctly. I'd bashed my head against it a few times, but resolving it would have required a level of debugging and experimentation that I was unwilling to commit to, and so it languished.

Anyway, [Claude one-shotted it](https://github.com/philpax/jc2mp.github.io/pull/1) <PrMeta date="2025-11-12" add=417 sub=87 />. After that, it was off to the races: [improving the Bootstrap styling and adding syntax highlighting support](https://github.com/philpax/jc2mp.github.io/pull/2) <PrMeta date="2025-11-12" add=532 sub=18 />, then giving up on Bootstrap entirely and [migrating to Tailwind CSS](https://github.com/philpax/jc2mp.github.io/pull/3) <PrMeta date="2025-11-12" add=86 sub=82 /> ([why Tailwind?](#the-siren-call-of-the-slop-stack)). I then navigated around the generated wiki, noticed that it was a bit difficult to browse without index pages, and [sorted that out](https://github.com/philpax/jc2mp.github.io/pull/4) <PrMeta date="2025-11-13" add=184 sub=3 />.

Once that was done, I formally [opened and merged the PR for JC2-MP's GitHub Pages repo](https://github.com/jc2mp/jc2mp.github.io/pull/1) <PrMeta date="2025-11-13" add=26982 sub=2 />. It was finally done, and the rest was merely refinement: [updating `wikitext_simplified` to improve error handling](https://github.com/jc2mp/jc2mp.github.io/pull/3) <PrMeta date="2025-11-18" add=49 sub=27 />, and [adding clientside search through a precomputed search index](https://github.com/jc2mp/jc2mp.github.io/pull/4) <PrMeta date="2025-11-18" add=568 sub=21 />.

That last one would have taken me a few days at normal speed, I think: generating the initial index, getting the JavaScript progressive enhancement to work properly, optimising the index, and augmenting the index with the information required for smart-ish retrieval. When iteration is extremely quick, though, it doesn't hurt to try different approaches out and to explore the possibility space.

## [philpax/blackbird](https://github.com/philpax/blackbird)
IMAGEHERE: blackbird

blackbird is my personal music player software, optimised for my own tastes in what a music player should do and how it should operate. I grew up using foobar2000 in a very specific way - library view only - and as I started using other operating systems more regularly, I wanted a way to both carry that experience with me and to be able to stream my music from my own server, regardless of where I was.

The latter was easy enough to solve with [Navidrome](https://www.navidrome.org/), which implements the (Open)Subsonic protocol, but the former showed itself to be much more difficult: the majority of existing Subsonic clients optimised for iTunes / Spotify-like music libraries, which are heavily playlist-oriented and do not present your entire library in a single linear list. After much hemming and hawing, and after being goaded by a friend building their own client, I embarked upon the process of developing my own.

I'd say that this has generally gone [quite well](/tags/blackbird/), but the thing about building software for yourself is that you will grow to be bothered by its deficiencies and seek to address them. I was doing this where I could, but these things take time and effort. My issue list had grown quite large by this point, with two-dozen issues covering common music player functionality like gapless playback, track scrobbling, lyrics, and more.

The first point of order was to [add a tray menu icon](https://github.com/philpax/blackbird/pull/27) <PrMeta date="2025-11-12" add=162 sub=25 /> so that I could interact with my music player from the tray, much as I have with foobar2000 in the past. Unfortunately, this was stymied by two things: Windows's support for tray icons has steadily regressed over the years, and the implementation of the tray icon logic in the library - or perhaps in Windows, it's not entirely clear to me - causes the window's event loop to lock up entirely on Windows until I interact with it again. Still, it works great on Linux! Given that, I added [the ability to like tracks from the menu](https://github.com/philpax/blackbird/pull/28) <PrMeta date="2025-11-15" add=32 sub=4 />.

Next on the agenda was addressing playback - both in operation and in functionality - and so [I added the ability to like tracks from the now-playing section of the UI](https://github.com/philpax/blackbird/pull/29) <PrMeta start="2025-11-15" end="2025-11-16" add=75 sub=4 />, [the scrobbling of tracks](https://github.com/philpax/blackbird/pull/30) <PrMeta date="2025-11-16" add=181 sub=3 />, [liked track/album shuffle playback modes](https://github.com/philpax/blackbird/pull/33) <PrMeta start="2025-11-17" end="2025-11-18" add=265 sub=59 />, and finally, [gapless playback](https://github.com/philpax/blackbird/pull/34) <PrMeta start="2025-11-17" end="2025-11-18" add=173 sub=5 />. I'd been putting that last one off for a while, because it requires queueing up both the current and next track for the playback thread, which is a logic quagmire. Delegating it to the agent got me unstuck.[^gapless]

[^gapless]: Not without trouble, though. Until around mid-March, there was a bug in the playback logic where it would occasionally keep the next track queued up for playback after switching playback modes (which reset the logical queue, which in turn should have reset the gapless playback queue). This one, I'm afraid, took Opus 4.6 to resolve. Still, not irritating enough to spend human time on resolving.

Interleaved amongst the previous changes, I had to [make tray icon support optional feature](https://github.com/philpax/blackbird/pull/31) <PrMeta date="2025-11-16" add=38 sub=16 /> and [make rodio and souvlaki dependencies optional](https://github.com/philpax/blackbird/pull/32) <PrMeta date="2025-11-16" add=32 sub=4 />. This was due to the environmental challenges posed by the Claude Code Web environment: it often struggled to make any forward progress because the system libraries required to build these were not available. I believe that there may be a way to fix this, but I've not used CCW in anger enough since to investigate further.

On startup, blackbird fetches the entire library's metadata from the server, and streams in the album art as you're viewing it, keeping the previously- and currently-viewed arts in a cache. To avoid pop-in, I [added a low-res 16x16 disk-based cache](https://github.com/philpax/blackbird/pull/35) <PrMeta start="2025-11-17" end="2025-11-18" add=128 sub=14 /> that can be displayed immediately while the real art loads. In addition to this, I also [begun preloading album art around the next track](https://github.com/philpax/blackbird/pull/40) <PrMeta start="2025-11-18" end="2025-11-19" add=118 sub=34 /> to assist in mitigating the pop-in when moving to the next track.

I then proceeded to blast through my feature backlog: [adding a lyrics view](https://github.com/philpax/blackbird/pull/36) <PrMeta date="2025-11-18" add=388 sub=34 />, [searching through typing](https://github.com/philpax/blackbird/pull/37) <PrMeta date="2025-11-18" add=187 sub=4 />, an [Apple-style letter display in the scrollbar](https://github.com/philpax/blackbird/pull/38) <PrMeta date="2025-11-18" add=129 sub=0 />, [a fix for that display](https://github.com/philpax/blackbird/pull/39) <PrMeta date="2025-11-18" add=101 sub=48 />, and a [separate search window, openable through a global keybind](https://github.com/philpax/blackbird/pull/41) <PrMeta date="2025-11-19" add=223 sub=155 />.

After this, some cleanup and consolidation was required, so I [moved all of the keybindings to the configuration file](https://github.com/philpax/blackbird/pull/42) <PrMeta date="2025-11-19" add=228 sub=25 />, [refactored the UI code to be more modular](https://github.com/philpax/blackbird/pull/43) <PrMeta date="2025-11-19" add=1336 sub=1234 />, and ["fixed" an issue where the pseudorandom shuffle algorithm would take me to the same tracks](https://github.com/philpax/blackbird/pull/44) <PrMeta date="2025-11-19" add=30 sub=3 />[^shuffle]

[^shuffle]: Another case where I'm not sure it's actually been fixed properly, but it doesn't bother me enough to look further into it. I should do a statistical analysis of where the shuffle algorithm leads me over time, though. Claude! _Claude!_ We have work to do!

Closing out the feature work, I elected to [display the playcount for each track within the library itself](https://github.com/philpax/blackbird/pull/45) <PrMeta start="2025-11-19" end="2025-11-20" add=54 sub=14 />, [add an indicator for the current track within the scroll bar](https://github.com/philpax/blackbird/pull/46) <PrMeta date="2025-11-20" add=77 sub=7 />, and attempted to [make the application name show up in the media controls](https://github.com/philpax/blackbird/pull/47) <PrMeta date="2025-11-22" add=182 sub=0 closed />. As always, Windows made this [annoyingly challenging](https://github.com/Sinono3/souvlaki/issues/67), and I ended up giving up on it.

To close out, I [applied a few fixes to the `nix-shell`](https://github.com/philpax/blackbird/pull/48) <PrMeta date="2025-11-23" add=8 sub=0 /> and made [the tray icon initialize properly under GTK](https://github.com/philpax/blackbird/pull/49) <PrMeta date="2025-11-23" add=21 sub=3 />.

As a whole, I would argue that the use of Claude Code (Web) was worth it for blackbird alone: within a span of a few days, I was able to burn through my entire feature backlog and make it the music player that I wanted - nay, _needed_ - it to be. I'm quite happy with the outcome here.

## [philpax/paxboard](https://github.com/philpax/paxboard)
IMAGEHERE: paxboard, as it looked three months ago

paxboard is my personal self-hosted home page. I am pathologically afraid of YAML, so existing solutions like [homepage](https://gethomepage.dev/) didn't sit right with me; additionally, I wanted to be able to easily display custom information, like the status of my AI models. My initial version of this was written in Rust and was entirely server-rendered using [paxhtml](#philpaxpaxhtml), as I was in a particularly `paxhtml`-y mood.

I'd grown to reconsider this, especially because I wanted cleanly-delivered live updates, so one of the first things I did was to [rewrite the codebase in TypeScript and React](https://github.com/philpax/paxboard/pull/11) <PrMeta date="2025-11-14" add=4521 sub=2515 />, making it much easier to iterate (including live edits to the "deployed" version). I then proceeded to [add world clocks for major cities](https://github.com/philpax/paxboard/pull/12) <PrMeta start="2025-11-14" end="2025-11-15" add=160 sub=0 /> and make it possible to [copy the times of those world clocks to the clipboard](https://github.com/philpax/paxboard/pull/13) <PrMeta date="2025-11-16" add=81 sub=1 />.

I then rounded things out by adding [weather displays for Stockholm and Melbourne](https://github.com/philpax/paxboard/pull/14) <PrMeta date="2025-11-16" add=295 sub=2 /> and [a system stats view for monitoring the state of my server](https://github.com/philpax/paxboard/pull/15) <PrMeta date="2025-11-23" add=1724 sub=20 />.

This is a relatively small bit of bespoke software, but it's something that I would have otherwise given up on if it weren't for the ease of maintenance. Of course, one could argue that the correct thing to do would be to use the existing software - but like with blackbird, I want something that fits _me_.

## [philpax/rucomfyui](https://github.com/philpax/rucomfyui)
IMAGEHERE: rucomfyui node graph

[ComfyUI](https://www.comfy.org/) is an open-source node-based program for composing AI synthesis workflows (image generation, video generation, etc). The user composes a graph of nodes that describes the flow of data through the various steps in a synthesis pipeline, and then runs this graph to produce an output.

To help external users make use of the wide ecosystem, it offers an API that can be used to run these workflows. Unfortunately, this API is poorly-designed and even more poorly documented, so using it correctly is both troublesome and tedious. In late 2024, I developed a Rust library for interfacing with this API with a _very_ strongly typed API in mind, as befitting the Rust ethos: the goal was to make it difficult to "hold it wrong", while guiding users along the happy path.

To achieve this, it uses code generation to create strong representations of the dataflow types (the types of the data being transmitted between nodes), as well as of the nodes themselves. This means that a full ComfyUI workflow can be composed from Rust types and be statically checked by the compiler for correctness before being run; in addition, these representations also appear in autocompletion, making it much easier to discover nodes.

I have yet to release it to [crates.io](https://crates.io), as I wanted to complete some polish work on it first. I made a few steps towards that in this period. (For the record, at the time of writing, I still haven't. I'm pretty sure it's more-or-less ready, though.

The code generator was fairly heavily-coupled to the internals of the library, so my first point of order was to [split the generator out into its own library that could be used externally](https://github.com/philpax/rucomfyui/pull/12) <PrMeta date="2025-11-16" add=918 sub=639 />. In hindsight, I'm not convinced that this fully solved the problem that I wanted it to solve; it's still somewhat unclear how to wire custom nodes in while still using the existing exposed types. With that being said, though, it does get much closer than it was before.

One of the demo application/libraries for the library wires the library's semi-typed representation to an egui-based node graph - in this case, [`egui_node_graph2`](https://github.com/trevyn/egui_node_graph2). Unfortunately, that library is no longer actively maintained, which meant that I'd never see resolutions to some of the bugs that ailed my use case, and I'd be limited to the versions of egui that it would support. I considered working around this by bringing the library up to date, but instead opted to [port the node graph to the actively-maintained egui-snarl](https://github.com/philpax/rucomfyui/pull/13) <PrMeta start="2025-11-17" end="2025-12-23" add=586 sub=363 />. The initial port was straightforward, but getting all of the functionality to work took extra polishing, which I put off until I was done with the easy work.

In the meantime, owing to what [paxcord](#philpaxpaxcord) needed, I [added a Lua interface for ComfyUI nodes](https://github.com/philpax/rucomfyui/pull/14) <PrMeta date="2025-12-03" add=1103 sub=1 />, which proved to be surprisingly easy. Most of the work was in planning out what that interface should look like, and I'm pretty happy with how it turned out - it's a very fluent API.

During the process of getting Lua support in, I noticed that we weren't enforcing formatting at all, so I addressed that with [a PR to add the usual kinds of CI](https://github.com/philpax/rucomfyui/pull/15) <PrMeta date="2025-12-03" add=192 sub=70 />.

Finally, I built [a tool to take an arbitrary API workflow graph and convert it to its equivalent Rust and Lua `rucomfyui` equivalents](https://github.com/philpax/rucomfyui/pull/16) <PrMeta start="2025-12-07" end="2025-12-11" add=2712 sub=0 />. This is something that most other ComfyUI consumer libraries have, and it is very handy to have: you can interactively build up your workflow in the regular ComfyUI UI (or, say, our egui node graph), and then convert that to a programmatic description that can be varied as required.

## [ferrobrew/ida-c-splitter](https://github.com/ferrobrew/ida-c-splitter)
While working on [my VR mod for Just Cause 3](../one-day-ill-finish-a-vr-mod/index.md), I found myself wanting to traverse the entirety of IDA's decompilation output for the debug build of the game: the primary benefit of this is that searching for references to class fields between functions, something which is very difficult in IDA proper, becomes a mere text search.

Unfortunately, the file that IDA produces for JC3 is 500MB, which the vast majority of text editors will break down on, and it's hardly an ideal experience in the ones that _do_ survive. After staring at the output for a while in Sublime Text, I realised that it was well-structured enough to build a tool that split the output into a hierarchical folder structure, organised by classes and such, making it significantly more legible to traditional code navigation tools.

My first step was to start [parsing function signatures](https://github.com/ferrobrew/ida-c-splitter/pull/1) <PrMeta start="2025-11-17" end="2025-11-18" add=3910 sub=5 />, using test cases extracted from the binary itself. Actual [file tree generation](https://github.com/ferrobrew/ida-c-splitter/pull/2) <PrMeta date="2025-11-18" add=132 sub=3 /> was pretty straightforward after that, but both the code and the output were still quite messy.

To help with that, I tasked Claude with [making it a bit more production-ready](https://github.com/ferrobrew/ida-c-splitter/pull/3) <PrMeta date="2025-11-18" add=525 sub=105 /> (consisting of reshaping it into something a bit closer to a typical Rust CLI application, adding parallelisation, and generally documenting things).

I then started looking a bit closer at the output, and noticed that it was misbehaving around function pointers, calling conventions, and templated parameters (the usual nightmares associated with the C++ grammar). These were relatively quick to fix [here](https://github.com/ferrobrew/ida-c-splitter/pull/4) <PrMeta date="2025-11-19" add=23 sub=5 /> and [there](https://github.com/ferrobrew/ida-c-splitter/pull/5) <PrMeta date="2025-11-19" add=169 sub=20 /> once I'd identified what the correct behaviour should be.

The next problem was with typedefs, which required a slightly more complete type parser. Again, [pretty straightforward, with the bulk of the PR being tests](https://github.com/ferrobrew/ida-c-splitter/pull/6) <PrMeta date="2025-11-20" add=12292 sub=438 />. Finally, to close things out, I cleaned things up with [another refactoring PR](https://github.com/ferrobrew/ida-c-splitter/pull/7) <PrMeta start="2025-11-20" end="2025-11-21" add=414 sub=742 /> and [setting up CI](https://github.com/ferrobrew/ida-c-splitter/pull/10) <PrMeta date="2025-11-21" add=89 sub=0 />.

I'd like to say that this helped me continue my work on JC3, but as you can see, I was preoccupied by other matters.[^jc3]

[^jc3]: Also, Square Enix released a patch to de-Denuvo the game, which I would appreciate in any other context, but it would have required me to rework all of my existing reverse engineering work to support the clean binary, which I haven't been able to motivate myself to do. I would quite like to return to this some day.

## [philpax/paxhtml](https://github.com/philpax/paxhtml)
paxhtml is a Rust library for generating HTML, used primarily by my website. The existing solutions that I found for this were incomplete, not pragmatic enough, or not really amenable for use in a SSG. It offers both a builder API and a proc macro for building trees of elements, which are then processed into "render elements" that represent the actual HTML to be generated.

I have updated the library as required to accomodate the needs of its consumers (i.e. my other projects using it). One of the bigger changes was to [add support for interpolating custom components in the macro](https://github.com/philpax/paxhtml/pull/1) <PrMeta date="2025-11-17" add=334 sub=32 />, so that I could easily embed bespoke components into views for this website. This was previously done by interpolating a function call without named arguments or optionals, which led to poor UX; instead, the macro now expands a custom tag into a function call with a struct for args, similar to what other Rust JSX-likes do.

Of course, having empowered my JSX-like with custom components, I now needed a way to use those custom components within the Markdown used within this website. That, too, was a simple matter of [making the HTML parser available at runtime](https://github.com/philpax/paxhtml/pull/2) <PrMeta date="2025-11-22" add=860 sub=314 />. Not too difficult conceptually, but tedious to do, and trivial to vibe out.

Later on, I was doing some performance optimisations on my website - which builds everything per execution, to ensure hermetic builds - and realised that the use of `paxhtml` leads to many small allocations that would no longer be necessary after their corresponding page was written out. In a domain where the memory allocations are numerous and very clearly bounded, there is but one obvious thing to do: [use a bump allocator for everything](https://github.com/philpax/paxhtml/pull/3) <PrMeta start="2025-12-30" end="2025-12-31" add=1171 sub=532 />. I wouldn't have bothered if I were doing this by hand, but Claude made quick work of it.

Finally, as part of the above bump allocator work, I discovered that I had to keep a non-bump-allocated representation around for the Lua bindings I'd produced for `paxhtml` in a [previous edition, for paxboard](../an-even-quieter-week/index.md#paxboard). As I'd already stopped using these bindings in [paxboard](#philpaxpaxboard) in November, I weighed up my options, and came to a conclusion: [it was time for the Lua bindings, and their vestigial owned representation, to go](https://github.com/philpax/paxhtml/pull/4) <PrMeta date="2025-12-31" add=1 sub=744 />. Claude had surfaced this earlier in the planning phase, but I hadn't realised how much I'd hate having two representations until it was laid bare to me.

## [philpax/philpax.github.io](https://github.com/philpax/philpax.github.io)
IMAGEHERE: dark mode and light mode of same article, side by side

This very here website. A long, long time ago, I hosted a Ruby/[Sinatra](https://sinatrarb.com/) server for my website that was completely unreproducible, but was fully hackable; a less-long time ago, I switched this over to a [Zola](https://getzola.org/)-generated static site, which was fully reproducible, but completely unhackable.

In an effort to thread the needle and set up a reproducible _and_ hackable solution, I developed my own Rust SSG. As with many of these things, I didn't do it because it was easy; I did it because I thought it would be easy. It took me the better part of a year to put together a design and structure I was happy with, which was largely an unforced error - turns out that people pre-design their websites in Figma for a reason.

With that being said, though, it's done, and it works, so the only thing that remained was to make it better, which I did.

I introduced custom component support for the compile-time JSX-like syntax in [paxhtml](#philpaxpaxhtml), so it was only natural to [port my existing custom components over to it](https://github.com/philpax/philpax.github.io/pull/13) <PrMeta start="2025-11-17" end="2025-11-18" add=122 sub=78 />. This is omething I should have done much sooner: it made interacting with these custom components much nicer, especially for things like links, which are commonplace within my views.

After I saw one of [Jake Lazaroff](https://jakelazaroff.com/)'s social media preview images (i.e. OpenGraph images, shown when the page is posted to social media), I was suitably inspired, and elected to build my own [preview generator](https://github.com/philpax/philpax.github.io/pull/14) <PrMeta start="2025-11-22" end="2025-11-23" add=755 sub=48 />, the result of which you can see below. As you might expect, Claude Code Web did _not_ execute on the design I'd described in an aesthetically-pleasing way, but it did set up the necessary rendering scaffolding. I iterated on it locally until I had something that I was happy with.

![an example OG image for the last update](/og-images/updates/one-day-ill-finish-a-vr-mod.png)

I've never been truly satisfied with the light mode on my website; it is as perfunctory as it seems. I let Claude [have a go at it](https://github.com/philpax/philpax.github.io/pull/15) <PrMeta date="2025-11-23" add=4 sub=4 />, including [adding support for light mode to code blocks](https://github.com/philpax/philpax.github.io/pull/16) <PrMeta date="2025-11-23" add=148 sub=8 />, and it's better now, but I'm still not sold. I fear a general redesign is in my future, but I will stave that off for as long as I can.

Speaking of code blocks, around this time, [fasterthanlime](https://fasterthanli.me/) published [arborium](https://fasterthanli.me/articles/introducing-arborium), a crate for all-in-one syntax highlighting. To this point, I had been using [syntect](https://github.com/trishume/syntect/), which has served me well, but required supporting infrastructure on my part for the theme and syntax sets that my website required. I saw an opportunity, and decided I'd try it out by having Claude [replace syntect with arborium](https://github.com/philpax/philpax.github.io/pull/18) <PrMeta start="2025-12-30" end="2026-01-03" add=383 sub=1659 />. As you may be able to tell from the diff, this reduced a fair bit of bloat; the only downside is that it slowed down my builds, which gave me a good excuse to do performance optimisations elsewhere.

So that's what I did: I switched [paxhtml](#philpaxpaxhtml) over to use bump allocators, and then I [integrated that work into the website proper](https://github.com/philpax/philpax.github.io/pull/19) <PrMeta date="2025-12-31" add=479 sub=302 />. The time savings were quite significant - we generate quite a lot of garbage in the process of rendering a single page, it turns out - and with that success, I figured I'd let Claude [squeeze out a bit more juice](https://github.com/philpax/philpax.github.io/pull/20) <PrMeta start="2025-12-31" end="2026-01-01" add=490 sub=215 />. This was successful, but not significantly so - but hey, a free improvement's a free improvement!

Finally, my SSG shells out to `git` to get the update dates for each document. I consider this to be inelegant - my generator shouldn't need to run `git` to build properly - so I figured I'd try out an experiment and [use the Rust-native `gitoxide` instead](https://github.com/philpax/philpax.github.io/pull/21) <PrMeta date="2026-01-07" add=1805 sub=157 closed />. Unfortunately, this came with multiple costs: `gitoxide` does not have a convenient operation for getting the last-update-timestamp of a given file (which led to an immense amount of code bloat), and compiling it requires compiling much of a VCS (which led to an immense amount of compile-time bloat). As a result, I chose not to merge this: but I'm glad that it only took me some delegation to discover this, and not the better part of a day!

## [philpax/nixos-configuration](https://github.com/philpax/nixos-configuration)
The majority of my systems run on NixOS. Without LLMs, I would have given up on Nix almost immediately: but they have freed me to overlook its incredibly ugly language and focus on effective administration.

During early November, I acquired [a ThinkPad T480s](../../notes/Hardware/Laptop.md). The changes I made here were relatively straightforward refactoring changes to enable bring-up of NixOS on that laptop, while still sharing configs with my other machines, but I appreciated being able to tick them off my to-do list while working on other things.

My sync script was copying all of my dotfiles over to every machine, which was suboptimal, as not all of them applied - thankfully, that was a [pretty easy fix](https://github.com/philpax/nixos-configuration/pull/14) <PrMeta start="2025-11-17" end="2025-11-18" add=16 sub=9 />. I then added [automatic locking to Niri](https://github.com/philpax/nixos-configuration/pull/15) <PrMeta date="2025-11-20" add=42 sub=2 />, and properly [set up my SSH agent across machines](https://github.com/philpax/nixos-configuration/pull/16) <PrMeta date="2025-11-20" add=19 sub=7 />.

The last thing I did here was to [extract out common developer tooling and services](https://github.com/philpax/nixos-configuration/pull/17) <PrMeta date="2025-11-20" add=36 sub=34 /> so that my laptop could benefit from the same tooling as my server, and vice versa.

## [philpax/prismata](https://github.com/philpax/prismata)
IMAGEHERE: Prismata voxels

Prismata is a research prototype that I built out at one of my former employers, with the intention of experimenting with an AI co-creation workflow in a voxel world. After receiving permission, I open-sourced it and did some minor cleanup work to make it usable once again.

The first step was to [set up a frontend deployment workflow](https://github.com/philpax/prismata/pull/8) <PrMeta start="2025-11-17" end="2025-11-18" add=91 sub=0 />; unfortunately, in doing so, I discovered that the version of Bevy/wgpu it was targeting used experimental rendering features that were no longer supported in modern browsers.

Normally, I would have given up about here, but on a lark, I decided I'd give it a try: I tasked Claude with [porting it to the then-latest Bevy version](https://github.com/philpax/prismata/pull/9) <PrMeta date="2025-11-18" add=3484 sub=2527 closed />. And it was actually making decent headway! Unfortunately, Claude Code Web broke down and refused to accept any more prompts, which forced me to create [a new PR to complete the migration](https://github.com/philpax/prismata/pull/10) <PrMeta start="2025-11-18" end="2025-12-25" add=4112 sub=3444 />.

I had to go in there towards the end to restore some of the behaviour that had broken between ports, but given that I was jumping this across three versions of Bevy and through several major changes to the ECS, I'm quite happy with how everything worked out. Not sure if I'm emotionally ready to queue up the update to Bevy 0.18, though.[^bevyupdate]

[^bevyupdate]: Truth be told, this would not be that difficult. The most frustrating part is that I had to fork several dependencies to update them to Bevy 0.17, so I'd have to do the same thing again for 0.18. Not difficult, just annoying.

## [philpax/wikitext_simplified](https://github.com/philpax/wikitext_simplified)
![A vibe-coded frontend for `wikitext_simplified`](./wikitext-simplified.png)

As part of my work for [genresin.space](#genresinspacegenresinspacegithubio), I needed a way to reliably parse wikitext within Rust. I use [a fork](https://github.com/philpax/parse-wiki-text-2) of [parse-wiki-text-2](https://github.com/soerenmeier/parse-wiki-text-2), which is itself a fork of [parse_wiki_text](https://crates.io/crates/parse_wiki_text) (wherever you are, Fredrik, thank you for your service 🫡). However, PWT produces a stream of nodes: it does not actually produce a tree, at least not in the sense you'd expect from a traditional parser.

I believe that this was an intentional decision, as anyone who has worked with wikitext can tell you that it is a demonic format that will accept all kinds of malformed input and keep trucking. For my purposes, I needed something that could take the tag soup and pull it into an AST that I could then render or process as required; from this, `wikitest_simplified` was born, and it has been evolved since to support more and more of the madness that permeates the wikitext of both Wikipedia and [the JC2-MP wiki](#philpaxjc2mpgithubio-jc2mpjc2mpgithubio).

The first change that I tasked Claude with completing was to propagate the start and end positions of every node through [Span and Spanned types](https://github.com/philpax/wikitext_simplified/pull/1) <PrMeta start="2025-11-17" end="2025-11-18" add=510 sub=457 />, allowing for better downstream handling.

Some time after this, I realised it would be beneficial to demonstrate what the library actually does, so I had a [React frontend](https://github.com/philpax/wikitext_simplified/pull/2) <PrMeta date="2025-12-25" add=5710 sub=1 /> built. It is subject to the Pure Vibe Code aesthetic, much like [the Perchance interpreter](#philpaxperchance-interpreter), but I'm okay with that: it's just [a demo](https://philpax.me/experimental/wikitext/), after all.[^design]

[^design]: That being said, I'd be lying if I said I wasn't considering setting up a unified design language and using it across all of my tools.

## [genresinspace/genresinspace.github.io](https://github.com/genresinspace/genresinspace.github.io)
IMAGEHERE: GiS as it appeared three months ago

[genresin.space](https://genresin.space/) is a project I've been noodling on for the last year. Using `wikitext_simplified` and a lot of machinery, it extracts information about every music genre with an infobox from the English Wikipedia (offline - I'm not hitting the live website!), and then renders it as an explorable graph (as in graph theory, not charts), so that you can explore how genres influence and are influenced by each other.

It has been functionally complete for some time, but polishing it to the point where it captures what I'm going for and works well on every platform has proven to be troublesome. Thankfully, Worker Claude has been able to unblock some of the more pernicious work. The first change was purely procedural: [splitting the build and deploy CI workflows](https://github.com/genresinspace/genresinspace.github.io/pull/36) <PrMeta date="2025-11-20" add=23 sub=44 />.

Claude's intervention began to pay off with something that had been bothering me for a long time: mobile support. I'd designed GiS with desktop in mind, but still wanted to provide a decent experience on mobile. Unfortunately, there was a particularly troubling issue that had me tearing my hair out: after a few seconds, the graph would crash Safari on iOS, and without a Mac, I had no way of debugging the problem, outside of disabling things at random. To my pleasure - and I'll admit, to some degree, annoynace - Claude was able to resolve this by [tweaking a few parameters](https://github.com/genresinspace/genresinspace.github.io/pull/35) <PrMeta date="2025-11-20" add=223 sub=51 />.

The next steps were to improve the UI on mobile by [making it properly responsive, including handling a vertical layout](https://github.com/genresinspace/genresinspace.github.io/pull/37) <PrMeta start="2025-11-20" end="2025-11-21" add=195 sub=52 />, and by adding [snap positions for the sidebar](https://github.com/genresinspace/genresinspace.github.io/pull/38) <PrMeta date="2025-11-21" add=41 sub=10 />.

Finally, I'd been unhappy with the colour scheme in use for some time _and_ wanted to support light mode, so I [let Claude take a crack at that](https://github.com/genresinspace/genresinspace.github.io/pull/39) <PrMeta start="2025-11-23" end="2025-11-24" add=282 sub=110 />. It wasn't perfect, but it was certainly an improvement, and one that I have continued to develop. (But that's for the next update.)

## [philpax/openxrs](https://github.com/philpax/openxrs)
[openxrs](https://github.com/Ralith/openxrs) is a Rust library (not mine!) for interacting with OpenXR, the standard for interfacing with XR hardware. As part of my work on the VR mod for JC3, I wanted a D3D11 integration example for `openxrs`, so I used my pre-existing fork and produced such [an example](https://github.com/philpax/openxrs/pull/1) <PrMeta date="2025-11-21" add=914 sub=0 closed />, which worked beautifully.

I then closed this PR and extracted the example into an [independent repo](https://github.com/philpax/d3d11-openxr-example). I would have preferred to skip directly to this step, but I wanted to make sure Claude had the necessary context to navigate `openxrs` without having to look up individual files.

## [philpax/dwarf-c-reconstructor](https://github.com/philpax/dwarf-c-reconstructor)
![A GitHub screenshot showing *many* PRs for dwarf-c-reconstructor](./dwarf-c-reconstructor.png)

After completing [ida-c-splitter](#ferrobrewida-c-splitter), I posted about it in a reverse-engineering-related Discord, and someone messaged me to ask if I could vibe-code something for them with my credits. As I found myself with a need to exhaust these credits, I took them up on their request, and started piping their prompts and test files directly into Claude.

This essentially makes this a vibe-vibe-coded project: not only was the actual programming delegated, the task of issuing the delegation was itself delegated. I find this amusing.

In terms of methodology, my operator gave me test cases and problems they'd encountered after running the application; I would then ensure the test cases were in the repository, including everything required for complete reproduction, and then I would operate Claude Code Web with the raw problem statements. I was a little foolish in how hands-off I was being, because I found myself constantly having to explain where it could find the tests and what it was working on: spending five minutes writing up a CLAUDE.md immediately paid dividends.

With that being said, I don't think Claude Code Web was quite the right fit for this workflow. Aside from the loss of information involved in the meta-vibe-coding, its limited environment made it difficult for it to retrieve the tools required to further examine failures (e.g. existing decompilers and such). Working on it locally would have also driven me to address the lack-of-context issue much sooner: my reticence to do so was borne out of a desire to touch the codebase as little as possible, but I must admit that was counterproductive in the long run.

I won't detail the PRs here - there were nearly 40 of them, and it involved a significant amount of back and forth between all three parties involved. It exists now and it works, but I haven't personally used it, and I couldn't tell you how any of it works. How do I feel about that? Unsure; I certainly don't claim any ownership over it, despite it being under my username. Indeed, despite this being ostensibly aligned with [ferrobrew](https://ferrobrew.github.io)'s mandate, I explicitly chose not to put it there: I'm not comfortable with associating my comrade with something for which neither of us have looked at the code.

## [ferrobrew/egui-directx10](https://github.com/ferrobrew/egui-directx10)
[egui-directx11](https://github.com/NekomaruQwQ/egui-directx11) is a DirectX 11 renderer for the [egui](https://egui.rs) immediate UI library. I have a project for Just Cause 2 that I wanted to use `egui` for, but unfortunately, JC2 uses DirectX 10 (one of the few games to do so!). A friend and I backported `egui-directx11` to DirectX 10 some time ago, and that served us well.

However, I found myself wanting to update that project to the latest version of its dependencies, and that included `egui`, which meant I'd have to update `egui-directx10`. I was well within my hammer-swinging phase by this point, so [swing away I did](https://github.com/ferrobrew/egui-directx10/pull/2) <PrMeta start="2025-11-23" end="2025-11-24" add=1662 sub=773 />. This was largely successful, but there remains a persistent bug with the text rendering that neither Claude or I were able to figure out.

Luckily, this project is non-essential, and I'm pretty sure that we're the only people on this planet who want to use `egui` with DirectX 10, so I'm content with leaving it as-is.

## [ferrobrew/re-utilities](https://github.com/ferrobrew/re-utilities)
`re-utilities` is a library that a friend and I created to house, you'll never believe this, Utilities for Reverse Engineering. (Honestly, I can't stand the name, but we have yet to choose a better one.)

The first port of call was maintenance, in [updating windows-rs to version 0.62](https://github.com/ferrobrew/re-utilities/pull/11) <PrMeta date="2025-11-26" add=73 sub=27 />. The second was to make it a better library by [replacing anyhow with custom error enums](https://github.com/ferrobrew/re-utilities/pull/12)[^anyhow] <PrMeta date="2025-11-26" add=610 sub=129 />. Nothing too difficult, but certainly not without tedium for a human.

[^anyhow]: `anyhow` is a Rust library for catch-all errors that makes it easy to handle any kind of error at the cost of removing specificity as to what the error was. The general guidance is to "use `anyhow` for applications, use `thiserror` for libraries", where `thiserror` is a library that offers code generation for structured errors through a procedural macro. With the power of LLMs, it is now trivial to manually maintain these errors, and one fewer proc macro reduces compile times, even if only slightly.

## [ferrobrew/bevy-headless-console](https://github.com/ferrobrew/bevy-headless-console)
As part of the JC2 work mentioned [above](#ferrobrewegui-directx10), I also had to update `bevy-headless-console` (our fork of `bevy-console` to remove all UI integration) to Bevy 0.17. Not to beat a dead horse, but [this was one prompt](https://github.com/ferrobrew/bevy-headless-console/pull/2) <PrMeta date="2025-11-26" add=65 sub=53 />.

## [ferrobrew/pyxis-defs](https://github.com/ferrobrew/pyxis-defs)
IMAGEHERE: GitHub file tree, including one of the defs shown

As part of the work done for [pyxis](#ferrobrewpyxis), I introduced a monorepo of all known Pyxis definitions for use in the viewer and to make it easier to test and develop sweeping changes to Pyxis itself.

The biggest change was to switch our existing definitions over to use [real generics](https://github.com/ferrobrew/pyxis-defs/pull/1) <PrMeta date="2025-12-17" add=2472 sub=2570 />, as was implemented the same day. Watching all of the redundancy disappear brought a tear to my eye.

# Conclusion

TODO, but mostly see takeaways. Include a collapsible with the chronological timeline of every PR (where the bars also contain the diff amounts; strongly desaturated if closed), as well as a final tally of +/- lines. Talk about how effective his was, and how much of my backlog I blew away, and how liberating that was for a time... but then point out that I'm still at it, still grasping for total control over dozens of projects, and it's possible that AI is enabling my worst tendencies instead of freeing me from them.
