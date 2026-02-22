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

Of course, I kept going; throughout December, while I was on holiday, I snuck in PRs, reviewed old PRs, and continued to indulge my madness. This update includes that work, too, but the majority of the big swings were during November.

# Takeaways
Given how long it has taken me to write this post, I have largely forgotten a lot of the minute-to-minute takeaways I had from the experience, but here follows a high-level overview of my thoughts. I'm frontloading these as the remaining five thousand words are largely not of interest to the casual reader, outside of acting as proof that I did what I said I did.

It is worth noting that it took me two months to write this post up: the sheer amount of work done required a similarly sheer amount of work to document, and I found myself putting it off as to avoid confronting it. Nonetheless, we persist.

## Waiter, This Claude Code Web Is Raw
Claude Code Web was insanely buggy, and still is (at least from having tried it again over the last few weeks). It will frequently stop responding to you, lose your messages, require prodding to continue and will break down after a certain number of commits. It has a limited understanding of its own environment, and frequently requires handholding around more unconventional toolchains.

Functionality-wise, you cannot easily work _with_ it - it's very much aimed as an in-and-out endeavour, and working on the same branch that it is working on can often lead to pain. Speaking of branches, you can't control which branch it'll use; it will always instantiate a new branch from your main branch, which means you can't easily continue existing branches. This is especially irritating given the commit-breakage from above; continuing long-lived work is quite tedious.

That being said, there is certainly an appeal to the interaction model, which is why I've continued to use it on and off. Being able to kick off work while doing something else is compelling _if_ you know that it will do what you expect it to do. One's sense of its capabilities grows with use, but you can never be sure; I suspect that the ability for it to learn from its operators' sensibilities, something certain to ship this year, will improve this.

## Context Is King
This is something that I failed to internalise until much later, and is better covered in [karashiiro's Coding Agents Are Easy, Actually](https://karashiiro.leaflet.pub/3mbfapvdvss2b) (disclosure: I proof-read and edited this post), but the idea is simple: the easier you make your agent's life, the happier both of you will be.

What this means is that you should be paying attention to where it stumbles, and _writing documentation_ (or having it do it for you!) to capture that pain point and how to resolve it. If it's chafing against the CI, tell it what to check ahead of time. If it's repeatedly making the same kinds of code style mistakes, write down the specific nuances it's getting wrong. If it doesn't know what to test against, let it know.

Not only will this benefit your agent, it'll also benefit _you_, as well as other human developers. I've always considered myself a proponent of good documentation, but an agent finally gives me a way to model how other developers might consume the paltry documentation that I've put together, and boy, have I found my codebases wanting in places. Fixing this really does pay off.

As per karashiiro, I would suggest putting this documentation in a `CONTRIBUTING.md` and, only if necessary, using agent-specific documentation (e.g. `CLAUDE.md`) to direct your agent to that file. To the greatest possible extent, you want to make sure that the context that your human programmers and your agents share are identical. Any drift will make at least one of those parties unhappy.

## Token Anxiety
I hesitate to say this out loud, given how the linked post was received, but [token anxiety](https://bsky.app/profile/timkellogg.me/post/3mevhhd4lbs2b) is real. When you have the ability to affect major changes across software with just a few keystrokes, your own volition becomes the bottleneck, and you will find yourself chafing at the bit to issue more and more work to make the most of your resources.

This was especially exacerbated by the numerical value attached to the credits. I saw the number and felt driven to bring it to zero by dispatching as much work as humanly possible - and in some cases, beyond humanly possible - and it led to rather unhealthy use practices. During the worst of it in November, I found myself sleeping extremely late - sometimes, not at all - so that I could send off more work to be done, review it, and test it. It may have been one of the most productive months of my life, but it was also profoundly self-destructive. This breadth of work led me to experience what I'd describe as mini-burnout, where I was unable to engage with anything I'd touched as a result of the anxiety.

I cut down on the amount of work I was doing on my own projects during this period - especially as I was meant to be on holiday! - and took some time to recover. For the most part, I'm fine now - back to a healthier rhythm, in touch with my network, engaging in other hobbies - but, if left unchecked, I could see myself (and others who share my personality type) slipping right back into it again.

## The End of Coding?
I have written a single-digit percentage of code by hand since November. [This is not an uncommon sentiment](https://simonwillison.net/2026/Jan/4/inflection/), but I want to emphasise it: our profession _has_ fundamentally changed, and the aftershocks from this will rumble throughout as the industry catches up.

This doesn't apply for all domains to the same degree: there are many tasks and languages for which the models do not perform at the same standard, or for which they make novice mistakes. I'm not convinced that bulwark will hold forever, but even if it does: the rest of the industry does _not_ consist of these domains, and I very strongly suspect that fewer people per company will be required to do the same amount of work in most areas of programming endeavour.

The optimist may suggest that a thousand flowers will bloom as a result of this: after all, if everyone has much more leverage available to them, at least a few of those people will be industrious enough to strike it out on their own and build their own futures. I'd like to say that I believe in this - that there will be something for everyone in some form - but I fear things will not be so neat.

I don't know. More thought is necessary here. What does an optimistic version of the future look like, and how do we get there? What does it mean to be a programmer? What does this mean for white-collar work as a whole? What does it mean for _work_ as a whole? These are questions that I'm still pondering, and am certainly not equipped to answer in this particular post. But you should start thinking about them, too.

# Projects

## [ferrobrew/pyxis](https://github.com/ferrobrew/pyxis)

Pyxis is a schema language for memory structures that I have been working on on-and-off for the last few years. The process of modding games (and other applications) starts with reverse-engineering: using a variety of techniques and tools, one comes to understand behaviours of interest in the application, and how data flows through to enable those behaviours, and how that data is structured.

Once you have that understanding, you need to be able to use it within your mod to affect some change in the game. Modifying code is a relatively-solved problem: you can "detour" functions such that, when they are executed, they will instead execute your code, through which you can intervene and change the game's behaviour. Combine enough of these detours - or patches[^patches] - and you can direct the game as you wish.

[^patches]: Instead of detouring functions and replacing their behaviour/the arguments with which they are called, you can instead patch individual instructions for isolated behavioural changes. You can go surprisingly far with this: disabling a single condition and making it always-on or always-off can radically alter a game: after all, all God Mode does is disable your ability to take damage.

However, as part of this, you need to be able to represent and manipulate the game's data structures. Because we're relying on a reverse-engineered representation, we do not have a complete picture of these structures, and even when we do, they are not guaranteed to match the representation of the language our mod is written in. Additionally, not all mods are written in the same language. This makes representing these structures challenging and often language-specific.[^clientstructs]

[^clientstructs]: As an example of such a solution, [FFXIVClientStructs](https://github.com/aers/FFXIVClientStructs) documents Final Fantasy XIV's internal structures for C# and the IDA decompiler. The latter effort is supported through a Python script that ingests a [monster YAML file](https://github.com/aers/FFXIVClientStructs/blob/main/ida/data.yml), which works, but, well, look at it...

Pyxis is an effort to solve this: these structures are defined separately from your implementation language, and then compiled to a byte-perfect representation of that structure for your language. It has been in use in a few projects - none truly released, as it were - but, being a side project of a side project, I have never dedicated the time to fill in the potholes and address the features you'd come to expect from a modern language.

Of course, these last two months have allowed me to address that. Let us begin.

- [Add associated functions support to enums](https://github.com/ferrobrew/pyxis/pull/42) (November 6, <DiffStats add=128 sub=1 />)
- [Update repository with small changes](https://github.com/ferrobrew/pyxis/pull/43) (November 6, <DiffStats add=1 sub=4 />)
- [Add free-standing function support to Pyxis compiler](https://github.com/ferrobrew/pyxis/pull/44) (November 6, <DiffStats add=219 sub=22 />)
- [Implement `min_size` attribute](https://github.com/ferrobrew/pyxis/pull/45) (November 6, <DiffStats add=298 sub=7 />)
- [Replace `syn` parser with `chumsky`](https://github.com/ferrobrew/pyxis/pull/46) (November 8-12, <DiffStats add=3130 sub=876 />, **closed**)
- [feat: add JSON documentation backend](https://github.com/ferrobrew/pyxis/pull/51) (November 11, <DiffStats add=3916 sub=11 />)
- [Token-based parser](https://github.com/ferrobrew/pyxis/pull/52) (November 11-16, <DiffStats add=5056 sub=749 />)
- [Build JSON backend API](https://github.com/ferrobrew/pyxis/pull/53) (November 12, <DiffStats add=51 sub=1 />)
- [Pyxis viewer](https://github.com/ferrobrew/pyxis/pull/54) (November 13, <DiffStats add=3366 sub=1 />)
- [Add pyxis fmt command for formatting files](https://github.com/ferrobrew/pyxis/pull/56) (November 16-17, <DiffStats add=594 sub=152 />)
- [Improve semantic layer error reporting with spans](https://github.com/ferrobrew/pyxis/pull/57) (November 16-27, <DiffStats add=6550 sub=4011 />)
- [Fix formatter and add tests](https://github.com/ferrobrew/pyxis/pull/58) (November 17, <DiffStats add=393 sub=31 />)
- [Better mobile support for viewer](https://github.com/ferrobrew/pyxis/pull/59) (November 17-24, <DiffStats add=290 sub=88 />)
- [Remove `Located<T>`](https://github.com/ferrobrew/pyxis/pull/62) (December 4, <DiffStats add=1610 sub=1326 />)
- [Implement braced imports](https://github.com/ferrobrew/pyxis/pull/63) (December 4, <DiffStats add=696 sub=35 />)
- [Add support for type aliases](https://github.com/ferrobrew/pyxis/pull/64) (December 4-14, <DiffStats add=943 sub=5 />, **closed**)
- [Refactor store creation and sharing across phases](https://github.com/ferrobrew/pyxis/pull/67) (December 12, <DiffStats add=443 sub=365 />)
- [fix: prevent parser panics from out-of-bounds token access](https://github.com/ferrobrew/pyxis/pull/68) (December 12, <DiffStats add=294 sub=87 />)
- [chore: update ariadne from 0.4 to 0.6.0](https://github.com/ferrobrew/pyxis/pull/69) (December 12, <DiffStats add=59 sub=28 />)
- [refactor: convert LexError from struct to enum](https://github.com/ferrobrew/pyxis/pull/70) (December 12, <DiffStats add=129 sub=76 />)
- [Type aliases support](https://github.com/ferrobrew/pyxis/pull/71) (December 14, <DiffStats add=855 sub=74 />)
- [feat(viewer): add nested memory layout view for types](https://github.com/ferrobrew/pyxis/pull/72) (December 14, <DiffStats add=310 sub=3 />)
- [feat(json): add source file paths and line numbers to JSON output](https://github.com/ferrobrew/pyxis/pull/73) (December 14, <DiffStats add=1171 sub=204 />)
- [fix(semantic): improve error diagnostics for unresolved types](https://github.com/ferrobrew/pyxis/pull/74) (December 14, <DiffStats add=492 sub=125 />)
- [Add generic type support to Pyxis](https://github.com/ferrobrew/pyxis/pull/75) (December 17, <DiffStats add=5271 sub=1071 />)
- [Refactor code to remove duplication](https://github.com/ferrobrew/pyxis/pull/76) (December 17, <DiffStats add=176 sub=331 />)
- [Build proc macros for location traits](https://github.com/ferrobrew/pyxis/pull/77) (December 17, <DiffStats add=505 sub=885 />)
- [Add semantic tests for privacy level access](https://github.com/ferrobrew/pyxis/pull/78) (December 18, <DiffStats add=524 sub=8 />)
- [Add enum for predefined backend types](https://github.com/ferrobrew/pyxis/pull/79) (December 18, <DiffStats add=43 sub=11 />)
- [Add Pyxis CI build validation script](https://github.com/ferrobrew/pyxis/pull/80) (December 18, <DiffStats add=43 sub=0 />)
- [Add atomic integers and bools support](https://github.com/ferrobrew/pyxis/pull/81) (December 18, <DiffStats add=697 sub=210 />)
- [Add transitive verification of copyable/cloneable](https://github.com/ferrobrew/pyxis/pull/82) (December 18, <DiffStats add=574 sub=1 />)
- [Refactor test assertions to use exact structural matching](https://github.com/ferrobrew/pyxis/pull/83) (December 18, <DiffStats add=515 sub=547 />)
- [Organize semantic tests into category-based modules](https://github.com/ferrobrew/pyxis/pull/84) (December 18, <DiffStats add=3373 sub=3223 />)

## [philpax/perchance-interpreter](https://github.com/philpax/perchance-interpreter)
[Perchance](https://perchance.org/welcome) is

> a platform for creating and sharing random generators

but if you search for it now, the top results are the free AI image and text generators it offers, which I find to be a shame, because Perchance-proper is a fascinating project in itself.

In exploring its generators, you will find a vibrant community - and ecosystem - defining procedural generators that span all kinds of interests and fandoms. Generators can be used from other generators, enabling a beautiful amount of emergent complexity. Any fan of procedural - not generated - text should play around with it: alongside [Tracery](https://tracery.io/), you will find some of the best examples of the medium.

Unfortunately, the Perchance interpreter and language is much like MediaWiki and Wikitext: it was implemented as an ad-hoc wrapper around its implementation language (in this case, JavaScript) that is impossible to decouple from its operating environment. For a variety of reasons, I have been interested in running Perchance generators outside of the Perchance website - but that's just not possible.[^perchancerec]

[^perchancerec]: Perchance's solutions for this involve [making requests to an API](https://perchance.org/api-tutorial) or [downloading an all-inclusive HTML file for the generator](https://perchance.org/api-tutorial). Regrettably, neither of these options allows for a generator to be embedded in an offline, non-web application. I mean, I suppose you could use something like [Lightpanda](https://lightpanda.io/) to run the latter, but you deserve what you get if you do that.

I've wanted to address this for a long, long time. I - [and others](https://github.com/utoxin/PyChance) - have attempted to do this in the past, but the scope of the task is just too large to do without a few weeks of time dedicated to the task, which I was unable to offer.

I assume you can see where this is going. I extracted the base documentation for Perchance as a Markdown document, raised my Claude Code hammer, and then I proceeded to [Build Rust interpreter for Perchance template language](https://github.com/philpax/perchance-interpreter/pull/1) (November 11-12, <DiffStats add=5102 sub=2 />).

- [Add multiline string tests to project](https://github.com/philpax/perchance-interpreter/pull/2) (November 12, <DiffStats add=480 sub=8 />)
- [Fix multiline list selection test failure](https://github.com/philpax/perchance-interpreter/pull/3) (November 12, <DiffStats add=80 sub=15 />)
- [Learn Perchance text generator basics](https://github.com/philpax/perchance-interpreter/pull/4) (November 12, <DiffStats add=219 sub=22 />)
- [Fix tests](https://github.com/philpax/perchance-interpreter/pull/5) (November 12, <DiffStats add=310 sub=54 />)
- [Fix test failing due to parsing issue](https://github.com/philpax/perchance-interpreter/pull/6) (November 12, <DiffStats add=2 sub=0 />)
- [Build Perchance Interpreter Frontend with Live Preview](https://github.com/philpax/perchance-interpreter/pull/7) (November 12, <DiffStats add=5432 sub=0 />)
- [Deploy frontend builds to GitHub Pages](https://github.com/philpax/perchance-interpreter/pull/8) (November 12, <DiffStats add=134 sub=60 />)
- [Use ./ base for Vite](https://github.com/philpax/perchance-interpreter/pull/9) (November 12, <DiffStats add=1 sub=0 />)
- [Import and export generators in Perchance](https://github.com/philpax/perchance-interpreter/pull/10) (November 12-13, <DiffStats add=14599 sub=616 />)
- [Add joinLists plugin support with hardcoded implementation](https://github.com/philpax/perchance-interpreter/pull/11) (November 13, <DiffStats add=460 sub=14 />)
- [Debug color import and consumableList access](https://github.com/philpax/perchance-interpreter/pull/12) (November 13, <DiffStats add=211 sub=23 />)
- [Update README](https://github.com/philpax/perchance-interpreter/pull/13) (November 15, <DiffStats add=127 sub=261 />)
- [Implement missing README features](https://github.com/philpax/perchance-interpreter/pull/14) (November 16, <DiffStats add=731 sub=60 />)
- [Add Ariadne diagnostics for all error types](https://github.com/philpax/perchance-interpreter/pull/15) (November 16-17, <DiffStats add=1701 sub=578 />)
- [Replace span fields with Spanned wrapper type](https://github.com/philpax/perchance-interpreter/pull/16) (November 17, <DiffStats add=569 sub=517 />)
- [Implement missing functionality from README](https://github.com/philpax/perchance-interpreter/pull/17) (November 19, <DiffStats add=639 sub=25 />)
- [Add generator execution tracing debugger](https://github.com/philpax/perchance-interpreter/pull/18) (November 19, <DiffStats add=1512 sub=85 />)
- [Refactor evaluator into multiple modules](https://github.com/philpax/perchance-interpreter/pull/19) (November 19, <DiffStats add=3394 sub=3089 />)
- [refactor: remove non-functional tree view from trace display](https://github.com/philpax/perchance-interpreter/pull/20) (November 23, <DiffStats add=17 sub=374 />)

## [philpax/paxcord](https://github.com/philpax/paxcord)
`paxcord` is my personal Discord bot, optimised for my own use cases. Notably, I am a fan of the Lua programming language, and I've carried that into this here bot by giving it fairly extensive Lua scripting capabilities. The work here was primarily in extending that capability to the point of near-absurdity.

- [Add Perchance Interpreter as Lua Dependency](https://github.com/philpax/paxcord/pull/3) (November 12, <DiffStats add=58 sub=0 />)
- [Add Lua currency conversion function](https://github.com/philpax/paxcord/pull/4) (November 12, <DiffStats add=702 sub=19 />)
- [Convert Discord commands to slash commands](https://github.com/philpax/paxcord/pull/5) (November 16 - December 3, <DiffStats add=1208 sub=844 />)
- [Integrate rucomfyui](https://github.com/philpax/paxcord/pull/6) (December 3, <DiffStats add=554 sub=29 />)
- [feat: add reply handler for interaction responses](https://github.com/philpax/paxcord/pull/7) (December 16-17, <DiffStats add=815 sub=72 />)
- [Check if Lua accesses first message in chain](https://github.com/philpax/paxcord/pull/8) (December 17, <DiffStats add=5 sub=0 />)

## [philpax/jc2mp.github.io](https://github.com/philpax/jc2mp.github.io) / [jc2mp/jc2mp.github.io](https://github.com/jc2mp/jc2mp.github.io)
A decade ago, I was a developer on the [multiplayer mod for Just Cause 2](https://jc-mp.com/). I slowly phased out my involvement over the years - what with university and employment obligations - and primarily remained as an occasional community presence, helping people out where I could and whatnot (ask me sometime about the follies of achievements).

In 2021, a [OVH datacentre](https://www.datacenterdynamics.com/en/analysis/ovhcloud-fire-france-data-center/) burnt down. Unfortunately, that also happened to be the datacentre in which the JC2-MP website and all of the surrounding infrastructure was hosted; we had backups, but they were out of date, and the other members of the team were as similarly detached as me, which meant that our website remained down for the next few years.

Some time after that, we were able to restore a static version of the website through GitHub Pages, and that has served its informational role well. However, it was lacking a fairly significant piece: the wiki, which documented how to use our scripting API, among other details. Community members passed their copies of the docs around, and I hosted our (very out of date) backup of the raw Wikitext up on GitHub, but it was clear that it wasn't really a sustainable solution.

The only way to get the wiki in a human-digestible form would have been to stand up a MediaWiki instance, which none of us were willing to do, and so the problem lingered for some time. During 2025, though, I had a realisation: I had built a relatively robust library for parsing Wikitext (for [genresin.space](#genresinspacegenresinspacegithubio)), as well as infrastructure for generating static websites in Rust ([paxhtml](#philpaxpaxhtml), originally built for this very website). One thought led to another, and I found myself building a SSG to resurrect our MediaWiki dump.

This SSG was effectively "done" months ago, but I couldn't deploy it due to a persistent issue with the tables resulting from template evaluation. I'd bashed my head against it a few times, but resolving it would have required a level of debugging and experimentation that I was unwilling to commit, and so it languished in an undeployable state.

- [Fix table templates](https://github.com/philpax/jc2mp.github.io/pull/1) (November 12, <DiffStats add=417 sub=87 />)
- [feat: improve Bootstrap usage and add syntax highlighting](https://github.com/philpax/jc2mp.github.io/pull/2) (November 12, <DiffStats add=532 sub=18 />)
- [feat: migrate from Bootstrap to Tailwind CSS](https://github.com/philpax/jc2mp.github.io/pull/3) (November 12, <DiffStats add=86 sub=82 />)
- [Generate missing index pages](https://github.com/philpax/jc2mp.github.io/pull/4) (November 13, <DiffStats add=184 sub=3 />)
- [Wiki SSG](https://github.com/jc2mp/jc2mp.github.io/pull/1) (November 13, <DiffStats add=26982 sub=2 />)
- [Update wikitext parsing functionality](https://github.com/jc2mp/jc2mp.github.io/pull/3) (November 18, <DiffStats add=49 sub=27 />)
- [Add basic search to MediaWiki static site generator](https://github.com/jc2mp/jc2mp.github.io/pull/4) (November 18, <DiffStats add=568 sub=21 />)

## [philpax/blackbird](https://github.com/philpax/blackbird)
blackbird is my personal music player software, optimised for my own tastes in what a music player should do and how it should operate. I grew up using foobar2000 in a very specific way - library view only - and as I started using other operating systems more regularly, I wanted a way to both carry that experience with me and to be able to stream my music from my own server, regardless of where I was.

The latter was easy enough to solve with [Navidrome](https://www.navidrome.org/), which implements the (Open)Subsonic protocol, but the former showed itself to be much more difficult: the majority of existing Subsonic clients optimised for iTunes / Spotify-like music libraries, which are heavily playlist-oriented and do not present your entire library in a single linear list. After much hemming and hawing, and after being goaded by a friend building their own client, I embarked upon the process of developing my own.

I'd say that this has generally gone [quite well](/tags/blackbird/), but the thing about building software for yourself is that you will grow to be bothered by its deficiencies and seek to address them. I was doing this where I could, but these things take time and effort.

- [Add menu to tray icon with track info](https://github.com/philpax/blackbird/pull/27) (November 12, <DiffStats add=162 sub=25 />)
- [Add track like to tray menu](https://github.com/philpax/blackbird/pull/28) (November 15, <DiffStats add=32 sub=4 />)
- [Add heart buttons to now-playing view](https://github.com/philpax/blackbird/pull/29) (November 15-16, <DiffStats add=75 sub=4 />)
- [Scrobble playback](https://github.com/philpax/blackbird/pull/30) (November 16, <DiffStats add=181 sub=3 />)
- [Make tray icon support optional feature](https://github.com/philpax/blackbird/pull/31) (November 16, <DiffStats add=38 sub=16 />)
- [Make rodio and souvlaki dependencies optional](https://github.com/philpax/blackbird/pull/32) (November 16, <DiffStats add=32 sub=4 />)
- [Add liked track and album shuffle modes](https://github.com/philpax/blackbird/pull/33) (November 17-18, <DiffStats add=265 sub=59 />)
- [Gapless playback](https://github.com/philpax/blackbird/pull/34) (November 17-18, <DiffStats add=173 sub=5 />)
- [Add album art caching with configurable resize](https://github.com/philpax/blackbird/pull/35) (November 17-18, <DiffStats add=128 sub=14 />)
- [Add lyrics view](https://github.com/philpax/blackbird/pull/36) (November 18, <DiffStats add=388 sub=34 />)
- [Type-to-search](https://github.com/philpax/blackbird/pull/37) (November 18, <DiffStats add=187 sub=4 />)
- [Letter scrollbar display](https://github.com/philpax/blackbird/pull/38) (November 18, <DiffStats add=129 sub=0 />)
- [Fix letter display conflict resolution](https://github.com/philpax/blackbird/pull/39) (November 18, <DiffStats add=101 sub=48 />)
- [Preload album art around next track](https://github.com/philpax/blackbird/pull/40) (November 18-19, <DiffStats add=118 sub=34 />)
- [Add global keybind for search and playback window](https://github.com/philpax/blackbird/pull/41) (November 19, <DiffStats add=223 sub=155 />)
- [Move keybindings to configuration file](https://github.com/philpax/blackbird/pull/42) (November 19, <DiffStats add=228 sub=25 />)
- [Refactor UI module structure into submodules](https://github.com/philpax/blackbird/pull/43) (November 19, <DiffStats add=1336 sub=1234 />)
- [Fix track shuffle algorithm seed issue](https://github.com/philpax/blackbird/pull/44) (November 19, <DiffStats add=30 sub=3 />)
- [Display track playcount next to heart icon](https://github.com/philpax/blackbird/pull/45) (November 19-20, <DiffStats add=54 sub=14 />)
- [feat: add track position indicator to alphabet scroll](https://github.com/philpax/blackbird/pull/46) (November 20, <DiffStats add=77 sub=7 />)
- [Blackbird name for application in media controls](https://github.com/philpax/blackbird/pull/47) (November 22, <DiffStats add=182 sub=0 />, **closed**)
- [nix-shell fixes](https://github.com/philpax/blackbird/pull/48) (November 23, <DiffStats add=8 sub=0 />)
- [Add GTK initialization for Linux tray icon](https://github.com/philpax/blackbird/pull/49) (November 23, <DiffStats add=21 sub=3 />)


## [philpax/paxboard](https://github.com/philpax/paxboard)
paxboard is my personal self-hosted home page. I am pathologically afraid of YAML, so existing solutions like [homepage](https://gethomepage.dev/) didn't sit right with me; additionally, I wanted to be able to easily display custom information, like the status of my AI models. My initial version of this was written in Rust and was entirely server-rendered using [paxhtml](#philpaxpaxhtml), as I was in a particularly `paxhtml`-y mood.

I'd grown to reconsider this, especially because I wanted cleanly-delivered live updates, so one of the first things I did was to [rewrite the codebase in TypeScript and React](https://github.com/philpax/paxboard/pull/11) (November 14, <DiffStats add=4521 sub=2515 />), making it much easier to iterate (including live edits to the "deployed" version). I then proceeded to [add world clocks for major cities](https://github.com/philpax/paxboard/pull/12) (November 14-15, <DiffStats add=160 sub=0 />) and make it possible to [copy the times of those world clocks to  theclipboard](https://github.com/philpax/paxboard/pull/13) (November 16, <DiffStats add=81 sub=1 />).

I then rounded things out by adding [weather displays for Stockholm and Melbourne](https://github.com/philpax/paxboard/pull/14) (November 16, <DiffStats add=295 sub=2 />) and [a system stats view for monitoring the state of my server](https://github.com/philpax/paxboard/pull/15) (November 23, <DiffStats add=1724 sub=20 />).

This is a relatively small bit of bespoke software, but it's something that I would have otherwise given up on if it weren't for the ease of maintenance. Of course, one could argue that the correct thing to do would be to use the existing software - but like with blackbird, I want something that fits _me_.

## [philpax/rucomfyui](https://github.com/philpax/rucomfyui)
[ComfyUI](https://www.comfy.org/) is an open-source node-based program for composing AI synthesis workflows (image generation, video generation, etc). The user composes a graph of nodes that describes the flow of data through the various steps in a synthesis pipeline, and then runs this graph to produce an output.

To help external users make use of the wide ecosystem, it offers an API that can be used to run these workflows. Unfortunately, this API is poorly-designed and even more poorly documented, so using it correctly is both troublesome and tedious. In late 2024, I developed a Rust library for interfacing with this API with a _very_ strongly typed API in mind, as befitting the Rust ethos: the goal was to make it difficult to "hold it wrong", while guiding users along the happy path.

To achieve this, it uses code generation to create strong representations of the dataflow types (the types of the data being transmitted between nodes), as well as of the nodes themselves. This means that a full ComfyUI workflow can be composed from Rust types and be statically checked by the compiler for correctness before being run; in addition, these representations also appear in autocompletion, making it much easier to discover nodes.

I have yet to release it to [crates.io](https://crates.io), as I wanted to complete some polish work on it first. I made a few steps towards that in this period.

- [Fix issue #6 in rucomfyui repository](https://github.com/philpax/rucomfyui/pull/12) (November 16, <DiffStats add=918 sub=639 />)
- [Port nodegraph code to egui-snarl library](https://github.com/philpax/rucomfyui/pull/13) (November 17 - December 23, <DiffStats add=586 sub=363 />)
- [Add Lua interface for ComfyUI nodes](https://github.com/philpax/rucomfyui/pull/14) (December 3, <DiffStats add=1103 sub=1 />)
- [Format code + formatting CI](https://github.com/philpax/rucomfyui/pull/15) (December 3, <DiffStats add=192 sub=70 />)
- [Build API workflow to Rust/Lua converter](https://github.com/philpax/rucomfyui/pull/16) (December 7-11, <DiffStats add=2712 sub=0 />)

## [ferrobrew/ida-c-splitter](https://github.com/ferrobrew/ida-c-splitter)
While working on [my VR mod for Just Cause 3](../one-day-ill-finish-a-vr-mod/index.md), I found myself wanting to traverse the entirety of IDA's decompilation output for the debug build of the game: the primary benefit of this is that searching for references to class fields between functions, something which is very difficult in IDA proper, becomes a mere text search.

Unfortunately, the file that IDA produces for JC3 is 500MB, which the vast majority of text editors will break down on, and it's hardly an ideal experience in the ones that _do_ survive. After staring at the output for a while in Sublime Text, I realised that it was well-structured enough to build a tool that split the output into a hierarchical folder structure, organised by classes and such, making it significantly more legible to traditional code navigation tools.

My first step was to start [parsing function signatures](https://github.com/ferrobrew/ida-c-splitter/pull/1) (November 17-18, <DiffStats add=3910 sub=5 />), using test cases extracted from the binary itself. Actual [file tree generation](https://github.com/ferrobrew/ida-c-splitter/pull/2) (November 18, <DiffStats add=132 sub=3 />) was pretty straightforward after that, but both the code and the output were still quite messy.

To help with that, I tasked Claude with [making it a bit more production-ready](https://github.com/ferrobrew/ida-c-splitter/pull/3) (November 18, <DiffStats add=525 sub=105 />) (consisting of reshaping it into something a bit closer to a typical Rust CLI application, adding parallelisation, and generally documenting things).

I then started looking a bit closer at the output, and noticed that it was misbehaving around function pointers, calling conventions, and templated parameters (the usual nightmares associated with the C++ grammar). These were relatively quick to fix [here](https://github.com/ferrobrew/ida-c-splitter/pull/4) (November 19, <DiffStats add=23 sub=5 />) and [there](https://github.com/ferrobrew/ida-c-splitter/pull/5) (November 19, <DiffStats add=169 sub=20 />) once I'd identified what the correct behaviour should be.

The next problem was with typedefs, which required a slightly more complete type parser. Again, [pretty straightforward](https://github.com/ferrobrew/ida-c-splitter/pull/6) (November 20, <DiffStats add=12292 sub=438 />). Finally, to close things out, I cleaned things up with [another refactoring PR](https://github.com/ferrobrew/ida-c-splitter/pull/7) (November 20-21, <DiffStats add=414 sub=742 />) and [setting up CI](https://github.com/ferrobrew/ida-c-splitter/pull/10) (November 21, <DiffStats add=89 sub=0 />).

I'd like to say that this helped me continue my work on JC3, but as you can see, I was preoccupied by other matters.[^jc3]

[^jc3]: Also, Square Enix released a patch to de-Denuvo the game, which I would appreciate in any other context, but it would have required me to rework all of my existing reverse engineering work to support the clean binary, which I haven't been able to motivate myself to do. I would quite like to return to this some day.

## [philpax/paxhtml](https://github.com/philpax/paxhtml)
paxhtml is a Rust library for generating HTML, used primarily by my website. The existing solutions that I found for this were incomplete, not pragmatic enough, or not really amenable to use in a SSG. It offers both a builder API and a proc macro for building trees of elements, which are then processed into "render elements" that represent the actual HTML to be generated.

I have updated the library as required to accomodate the needs of its consumers.

- [Add custom component interpolation to HTML macro](https://github.com/philpax/paxhtml/pull/1) (November 17, <DiffStats add=334 sub=32 />)
- [feat: extract HTML parser into runtime-callable library](https://github.com/philpax/paxhtml/pull/2) (November 22, <DiffStats add=860 sub=314 />)
- [Use bumpalo allocator for everything](https://github.com/philpax/paxhtml/pull/3) (December 30-31, <DiffStats add=1171 sub=532 />)
- [refactor: remove mlua support + owned elements](https://github.com/philpax/paxhtml/pull/4) (December 31, <DiffStats add=1 sub=744 />)

## [philpax/philpax.github.io](https://github.com/philpax/philpax.github.io)
This very here website. A long, long time ago, I hosted a Ruby/[Sinatra](https://sinatrarb.com/) server for my website that was completely unreproducible, but was fully hackable; a less-long time ago, I switched this over to a [Zola](https://getzola.org/)-generated static site, which was fully reproducible, but completely unhackable.

In an effort to thread the needle and set up a reproducible _and_ hackable solution, I developed my own Rust SSG. As with many of these things, I didn't do it because it was easy; I did it because I thought it would be easy. It took me the better part of a year to put together a design and structure I was happy with, which was largely an unforced error - turns out that people pre-design their websites in Figma for a reason.

With that being said, though, it's done, and it works, so the only thing that remained was to make it better, which I did.

- [Add custom components support ](https://github.com/philpax/philpax.github.io/pull/13) (November 17-18, <DiffStats add=122 sub=78 />)
- [Add custom social media preview image generation](https://github.com/philpax/philpax.github.io/pull/14) (November 22-23, <DiffStats add=755 sub=48 />)
- [feat(styles): improve light mode color palette](https://github.com/philpax/philpax.github.io/pull/15) (November 23, <DiffStats add=4 sub=4 />)
- [Add light mode support to code blocks](https://github.com/philpax/philpax.github.io/pull/16) (November 23, <DiffStats add=148 sub=8 />)
- [refactor: replace syntect with arborium for syntax highlighting](https://github.com/philpax/philpax.github.io/pull/18) (December 30 - January 3, <DiffStats add=383 sub=1659 />)
- [Use paxhtml with bumpalo allocator](https://github.com/philpax/philpax.github.io/pull/19) (December 31, <DiffStats add=479 sub=302 />)
- [Performance optimisations](https://github.com/philpax/philpax.github.io/pull/20) (December 31 - January 1, <DiffStats add=490 sub=215 />)
- [feat: switch to gitoxide for commit date lookups](https://github.com/philpax/philpax.github.io/pull/21) (January 7, <DiffStats add=1805 sub=157 />, **closed**)

## [philpax/nixos-configuration](https://github.com/philpax/nixos-configuration)
The majority of my systems run on NixOS. Without LLMs, I would have given up on Nix almost immediately: but they have freed me to overlook its incredibly ugly language and focus on the substance. The changes I made here were relatively straightforward refactoring changes, but I appreciated being able to tick them off my to-do list while working on other things.

- [Organize dotfiles config by machine](https://github.com/philpax/nixos-configuration/pull/14) (November 17-18, <DiffStats add=16 sub=9 />)
- [Add automatic lock and sleep timers](https://github.com/philpax/nixos-configuration/pull/15) (November 20, <DiffStats add=42 sub=2 />)
- [Set up SSH agent for all operations](https://github.com/philpax/nixos-configuration/pull/16) (November 20, <DiffStats add=19 sub=7 />)
- [Extract shared developer services for reuse](https://github.com/philpax/nixos-configuration/pull/17) (November 20, <DiffStats add=36 sub=34 />)

## [philpax/prismata](https://github.com/philpax/prismata)
Prismata is a research prototype that I built out at one of my former employers, with the intention of experimenting with an AI co-creation workflow in a voxel world. After receiving permission, I open-sourced it and did some minor cleanup work to make it usable once again.

The first step was to [set up a frontend deployment workflow](https://github.com/philpax/prismata/pull/8) (November 17-18, <DiffStats add=91 sub=0 />); unfortunately, in doing so, I discovered that the version of Bevy/wgpu it was targeting used experimental rendering features that were no longer supported in modern browsers.

Normally, I would have given up about here, but on a lark, I decided I'd give it a try: I tasked Claude with [porting it to the then-latest Bevy version](https://github.com/philpax/prismata/pull/9) (November 18, <DiffStats add=3484 sub=2527 />, **closed**). And it was actually making decent headway! Unfortunately, Claude Code Web broke down and refused to accept any more prompts, which forced me to create [a new PR to complete the migration](https://github.com/philpax/prismata/pull/10) (November 18 - December 25, <DiffStats add=4112 sub=3444 />).

I had to go in there towards the end to restore some of the behaviour that had broken between ports, but given that I was jumping this across three versions of Bevy and through several major changes to the ECS, I'm quite happy with how everything worked out. Not sure if I'm emotionally ready to queue up the update to Bevy 0.18, though.[^bevyupdate]

[^bevyupdate]: Truth be told, this would not be that difficult. The most frustrating part is that I had to fork several dependencies to update them to Bevy 0.17, so I'd have to do the same thing again for 0.18. Not difficult, just annoying.

## [philpax/wikitext_simplified](https://github.com/philpax/wikitext_simplified)
As part of my work for [genresin.space](#genresinspacegenresinspacegithubio), I needed a way to reliably parse wikitext within Rust. I use [a fork](https://github.com/philpax/parse-wiki-text-2) of [parse-wiki-text-2](https://github.com/soerenmeier/parse-wiki-text-2), which is itself a fork of [parse_wiki_text](https://crates.io/crates/parse_wiki_text) (wherever you are, Fredrik, thank you for your service 🫡). However, PWT produces a stream of nodes: it does not actually produce a tree, at least not in the sense you'd expect from a traditional parser.

I believe that this was an intentional decision, as anyone who has worked with wikitext can tell you that it is a demonic format that will accept all kinds of malformed input and keep trucking. For my purposes, I needed something that could take the tag soup and pull it into an AST that I could then render or process as required; from this, `wikitest_simplified` was born, and it has been evolved since to support more and more of the madness that permeates the wikitext of both Wikipedia and [the JC2-MP wiki](#philpaxjc2mpgithubio-jc2mpjc2mpgithubio).

The first change that I tasked Claude with completing was to propagate the start and end positions of every node through [Span and Spanned types](https://github.com/philpax/wikitext_simplified/pull/1) (November 17-18, <DiffStats add=510 sub=457 />), allowing for better downstream handling.

Some time after this, I realised it would be beneficial to demonstrate what the library actually does, so I had a [React frontend](https://github.com/philpax/wikitext_simplified/pull/2) (December 25, <DiffStats add=5710 sub=1 />) built. It is subject to the Pure Vibe Code aesthetic, much like [the Perchance interpreter](#philpaxperchance-interpreter), but I'm okay with that: it's just a demo, after all.[^design]

[^design]: That being said, I'd be lying if I said I wasn't considering setting up a unified design language and using it across all of my tools.

## [genresinspace/genresinspace.github.io](https://github.com/genresinspace/genresinspace.github.io)
[genresin.space](https://genresin.space/) is a project I've been noodling on for the last year. Using `wikitext_simplified` and a lot of machinery, it extracts information about every music genre with an infobox from the English Wikipedia (offline - I'm not hitting the live website!), and then renders it as an explorable graph (as in graph theory, not charts), so that you can explore how genres influence and are influenced by each other.

It has been functionally complete for some time, but polishing it to the point where it captures what I'm going for and works well on every platform has proven to be troublesome. Thankfully, Worker Claude has been able to unblock some of the more pernicious work. The first change was purely procedural: [splitting the build and deploy CI workflows](https://github.com/genresinspace/genresinspace.github.io/pull/36) (November 20, <DiffStats add=23 sub=44 />).

Claude's intervention began to pay off with something that had been bothering me for a long time: mobile support. I'd designed GiS with desktop in mind, but still wanted to provide a decent experience on mobile. Unfortunately, there was a particularly troubling issue that had me tearing my hair out: after a few seconds, the graph would crash Safari on iOS, and without a Mac, I had no way of debugging the problem, outside of disabling things at random. To my pleasure - and I'll admit, to some degree, annoynace - Claude was able to resolve this by [tweaking a few parameters](https://github.com/genresinspace/genresinspace.github.io/pull/35) (November 20, <DiffStats add=223 sub=51 />).

The next steps were to improve the UI on mobile by [making it properly responsive, including handling a vertical layout](https://github.com/genresinspace/genresinspace.github.io/pull/37) (November 20-21, <DiffStats add=195 sub=52 />), and by adding [snap positions for the sidebar](https://github.com/genresinspace/genresinspace.github.io/pull/38) (November 21, <DiffStats add=41 sub=10 />).

Finally, I'd been unhappy with the colour scheme in use for some time _and_ wanted to support light mode, so I [let Claude take a crack at that](https://github.com/genresinspace/genresinspace.github.io/pull/39) (November 23-24, <DiffStats add=282 sub=110 />). It wasn't perfect, but it was certainly an improvement, and one that I have continued to develop. (But that's for the next update.)

## [philpax/openxrs](https://github.com/philpax/openxrs)
[openxrs](https://github.com/Ralith/openxrs) is a Rust library (not mine!) for interacting with OpenXR, the standard for interfacing with XR hardware. As part of my work on the VR mod for JC3, I wanted a D3D11 integration example for `openxrs`, so I used my pre-existing fork and produced such [an example](https://github.com/philpax/openxrs/pull/1) (November 21, <DiffStats add=914 sub=0 />, **closed**), which worked beautifully.

I then closed this PR and extracted the example into an [independent repo](https://github.com/philpax/d3d11-openxr-example). I would have preferred to skip directly to this step, but I wanted to make sure Claude had the necessary context to navigate `openxrs` without having to look up individual files.

## [philpax/dwarf-c-reconstructor](https://github.com/philpax/dwarf-c-reconstructor)
After completing [ida-c-splitter](#ferrobrewida-c-splitter), I posted about it in a reverse-engineering-related Discord, and someone messaged me to ask if I could vibe-code something for them with my credits. As I found myself with a need to exhaust these credits, I took them up on their request, and started piping their prompts and test files directly into Claude.

This essentially makes this a vibe-vibe-coded project: not only was the actual programming delegated, the task of issuing the delegation was itself delegated. I find this amusing.

In any case, I won't detail the PRs here - there were nearly 40 of them, and it involved a significant amount of back and forth between all three parties involved. It exists now and it works, but I haven't personally used it, and I couldn't tell you how any of it works. How do I feel about that? Unsure; I certainly don't claim any ownership over it, despite it being under my username.

## [ferrobrew/egui-directx10](https://github.com/ferrobrew/egui-directx10)
[egui-directx11](https://github.com/NekomaruQwQ/egui-directx11) is a DirectX 11 renderer for the [egui](https://egui.rs) immediate UI library. I have a project for Just Cause 2 that I wanted to use `egui` for, but unfortunately, JC2 uses DirectX 10 (one of the few games to do so!). A friend and I backported `egui-directx11` to DirectX 10 some time ago, and that served us well.

However, I found myself wanting to update that project to the latest version of its dependencies, and that included `egui`, which meant I'd have to update `egui-directx10`. I was well within my hammer-swinging phase by this point, so [swing away I did](https://github.com/ferrobrew/egui-directx10/pull/2) (November 23-24, <DiffStats add=1662 sub=773 />). This was largely successful, but there remains a persistent bug with the text rendering that neither Claude or I were able to figure out.

Luckily, this project is non-essential, and I'm pretty sure that we're the only people on this planet who want to use `egui` with DirectX 10, so I'm content with leaving it as-is.

## [ferrobrew/re-utilities](https://github.com/ferrobrew/re-utilities)
`re-utilities` is a library that a friend and I created to house, you'll never believe this, Utilities for Reverse Engineering. (Honestly, I can't stand the name, but we have yet to choose a better one.)

The first port of call was maintenance, in [updating windows-rs to version 0.62](https://github.com/ferrobrew/re-utilities/pull/11) (November 26, <DiffStats add=73 sub=27 />). The second was to make it a better library by [replacing anyhow with custom error enums](https://github.com/ferrobrew/re-utilities/pull/12)[^anyhow] (November 26, <DiffStats add=610 sub=129 />). Nothing too difficult, but certainly not without tedium for a human.

[^anyhow]: `anyhow` is a Rust library for catch-all errors that makes it easy to handle any kind of error at the cost of removing specificity as to what the error was. The general guidance is to "use `anyhow` for applications, use `thiserror` for libraries", where `thiserror` is a library that offers code generation for structured errors through a procedural macro. With the power of LLMs, it is now trivial to manually maintain these errors, and one fewer proc macro reduces compile times, even if only slightly.

## [ferrobrew/bevy-headless-console](https://github.com/ferrobrew/bevy-headless-console)
As part of the JC2 work mentioned [above](#ferrobrewegui-directx10), I also had to update `bevy-headless-console` (our fork of `bevy-console` to remove all UI integration) to Bevy 0.17. Not to beat a dead horse, but [this was one prompt](https://github.com/ferrobrew/bevy-headless-console/pull/2) (November 26, <DiffStats add=65 sub=53 />).

## [ferrobrew/pyxis-defs](https://github.com/ferrobrew/pyxis-defs)
As part of the work done for [pyxis](#ferrobrewpyxis), I introduced a monorepo of all known Pyxis definitions for use in the viewer and to make it easier to test and develop sweeping changes to Pyxis itself.

The biggest change was to switch our existing definitions over to use [real generics](https://github.com/ferrobrew/pyxis-defs/pull/1) (December 17, <DiffStats add=2472 sub=2570 />), as was implemented the same day. Watching all of the redundancy disappear brought a tear to my eye.
