+++
title = "the big claude down"
short = "two months, a holiday, and a lot of Claude: a terrifying predicament"
datetime = 2026-02-22T18:00:00Z

[taxonomies]
tags=["ai", "pyxis", "website", "genresinspace", "blackbird", "perchanceinterpreter", "paxcord", "jc2mp", "paxboard", "rucomfyui", "idacsplitter", "paxhtml", "nixos", "prismata", "wikitextsimplified", "reutilities"]
+++

Prior to this update, I was attempting to maintain a cadence of one to two weeks, sometimes slipping to three, between updates.

Unfortunately, in early November, I received this email:

IMAGEHERE

And being the industrious individual that I am, I endeavoured to drain those credits before they expired. I apologise in advance for what you're about to see.

<!-- more -->

# The Primer

I started off relatively slow; the Claude Code Web interface was buggy and crude - as I'll detail in a bit - but, once I found my cadence, it grabbed me and didn't let go. Days turned to nights turned to days, all while attending to my day job, but the siren call of Claude credits kept calling to me.

Around halfway through this period (they extended it to ~~collect more training data~~ as mea culpa for the bugginess of CCW), I found myself in the position of mending some of the more complex PRs with Claude Code locally. In exercising this, I was exhausting my regular Claude credits - being a mere Pro peon, of course - so, just for a little bit, I thought I'd upgrade to Max and 5x my limits.

Regrettably, that increased the amount of free credits I had from 250 USD to 1000 USD. This posed a much, much more intractable barrier to overcome, but try I did. Every project I could think of, that belonged to me, and that I was willing to submit sloppy PRs to, received sloppy PRs.

By now, you have seen the length of this post and its table of contents. I want you to know that, despite all of my efforts, despite the hundreds of PRs I submitted to dozens of projects, I was only able to get down to ~460 USD of credit in the time period.

Of course, I kept going; throughout December, while I was on holiday, I snuck in PRs, reviewed old PRs, and continued to indulge my madness. This update includes that work, too, but the majority of my "big swings" were during November.

# Takeaways

Given how long it has taken me to write this post, I have largely forgotten a lot of the minute-to-minute takeaways I had from the experience, but here follows a high-level explanation of my thoughts. Worth noting that it took me two months to write this post up: the sheer amount of work done required a similarly sheer amount of work to document, and I found myself putting it off as to avoid confronting it. Nonetheless, we persist.

## Claude Code Web
Claude Code Web was insanely buggy, and still is (at least from having tried it again over the last few weeks). It will frequently stop responding to you, lose your messages, require prodding to continue and will break down after a certain number of commits. It has a limited understanding of its own environment, and frequently requires handholding around more unconventional toolchains.

Functionality-wise, you cannot easily work _with_ it - it's very much aimed as an in-and-out endeavour, and working on the same branch that it is working on can often lead to pain. Speaking of branches, you can't control which branch it'll use; it will always instantiate a new branch from your main branch, which means you can't easily continue existing branches. This is especially irritating given the commit-breakage from above; continuing long-lived work is quite tedious.

That being said, there is certainly an appeal to the interaction model, which is why I've continued to use it on and off. Being able to kick off work while doing something else is compelling _if_ you know that it will do what you expect it to do. One's sense of its capabilities grows with use, but you can never be sure; I suspect that the ability for it to learn from its operators' sensibilities, something certain to ship this year, will improve this.

## Token Anxiety
I hesitate to say this out loud, given its initial reception, but [token anxiety](https://bsky.app/profile/timkellogg.me/post/3mevhhd4lbs2b) is real. When you have the ability to affect major changes across software with just a few keystrokes, your own volition becomes the bottleneck, and you will find yourself chafing at the bit to issue more and more work to make the most of your resources.

This was especially exacerbated by the numerical value attached to the credits. I saw the number and felt driven to bring it to zero by dispatching as much work as humanly possible - and in some cases, beyond humanly possible - and it led to rather unhealthy use practices. During the worst of it in November, I found myself sleeping extremely late - sometimes, not at all - so that I could send off more work to be done, review it, and test it. It may have been one of the most productive months of my life, but it was also profoundly self-destructive. This breadth of work led me to experience what I'd describe as mini-burnout, where I was unable to engage with anything I'd touched as a result of the anxiety.

I cut down on the amount of work I was doing on my own projects during this period - especially as I was meant to be on holiday! - and took some time to recover. For the most part, I'm fine now - back to a healthier rhythm, in touch with my network, engaging in other hobbies - but, if left unchecked, I could see myself (and others who share my personality type) slipping right back into it again.

## The End of Coding?
I have written a single-digit percentage of code by hand since November. [This is not an uncommon sentiment](https://simonwillison.net/2026/Jan/4/inflection/), but I want to emphasise it: our profession _has_ fundamentally changed, and the aftershocks from this will rumble throughout as the industry catches up.

This doesn't apply for all domains to the same degree: there are many tasks and languages for which the models do not perform at the same standard, or for which they make novice mistakes. I'm not convinced that bulwark will hold forever, but even if it does: the rest of the industry does _not_ consist of these domains, and I very strongly suspect that fewer people per company will be required to do the same amount of work in most areas of programming endeavour.

The optimist may suggest that a thousand flowers will bloom as a result of this: after all, if everyone has much more leverage available to them, at least a few of those people will be industrious enough to strike it out on their own and build their own futures. I'd like to say that I believe in this - that there will be something for everyone in some form - but I fear things will not be so neat.

I don't know. More thought is necessary here. What does an optimistic version of the future look like, and how do we get there?

# [ferrobrew/pyxis](https://github.com/ferrobrew/pyxis)

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

# [philpax/perchance-interpreter](https://github.com/philpax/perchance-interpreter)
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

# [philpax/paxcord](https://github.com/philpax/paxcord)
`paxcord` is my personal Discord bot, optimised for my own use cases. Notably, I am a fan of the Lua programming language, and I've carried that into this here bot by giving it fairly extensive Lua scripting capabilities. The work here was primarily in extending that capability to the point of near-absurdity.

- [Add Perchance Interpreter as Lua Dependency](https://github.com/philpax/paxcord/pull/3) (November 12, <DiffStats add=58 sub=0 />)
- [Add Lua currency conversion function](https://github.com/philpax/paxcord/pull/4) (November 12, <DiffStats add=702 sub=19 />)
- [Convert Discord commands to slash commands](https://github.com/philpax/paxcord/pull/5) (November 16 - December 3, <DiffStats add=1208 sub=844 />)
- [Integrate rucomfyui](https://github.com/philpax/paxcord/pull/6) (December 3, <DiffStats add=554 sub=29 />)
- [feat: add reply handler for interaction responses](https://github.com/philpax/paxcord/pull/7) (December 16-17, <DiffStats add=815 sub=72 />)
- [Check if Lua accesses first message in chain](https://github.com/philpax/paxcord/pull/8) (December 17, <DiffStats add=5 sub=0 />)

# [philpax/jc2mp.github.io](https://github.com/philpax/jc2mp.github.io) / [jc2mp/jc2mp.github.io](https://github.com/jc2mp/jc2mp.github.io)
A decade ago, I was a developer on the [multiplayer mod for Just Cause 2](https://jc-mp.com/). I slowly phased out my involvement over the years - what with university and employment obligations - and primarily remained as an occasional community presence, helping people out where I could and whatnot (ask me sometime about the follies of achievements).

In 2021, a [OVH datacentre](https://www.datacenterdynamics.com/en/analysis/ovhcloud-fire-france-data-center/) burnt down. Unfortunately, that also happened to be the datacentre in which the JC2-MP website and all of the surrounding infrastructure was hosted; we had backups, but they were out of date, and the other members of the team were as similarly detached as me, which meant that our website remained down for the next few years.

Some time after that, we were able to restore a static version of the website through GitHub Pages, and that has served its informational role well. However, it was lacking a fairly significant piece: the wiki, which documented how to use our scripting API, among other details. Community members passed their copies of the docs around, and I hosted our (very out of date) backup of the raw Wikitext up on GitHub, but it was clear that it wasn't really a sustainable solution.

The only way to get the wiki in a human-digestible form would have been to stand up a MediaWiki instance, which none of us were willing to do, and so the problem lingered for some time. During 2025, though, I had a realisation: I had built a relatively robust library for parsing Wikitext (for [genresin.space](#genresinspacegenresinspacegithubio)), as well as infrastructure for generating static websites in Rust (this very website). One thought led to another, and I found myself building a SSG to resurrect our MediaWiki dump.

This SSG was effectively "done" months ago, but I couldn't deploy it due to a persistent issue with the tables resulting from template evaluation. I'd bashed my head against it a few times, but resolving it would have required a level of debugging and experimentation that I was unwilling to commit, and so it languished in an undeployable state.

- [Fix table templates](https://github.com/philpax/jc2mp.github.io/pull/1) (November 12, <DiffStats add=417 sub=87 />)
- [feat: improve Bootstrap usage and add syntax highlighting](https://github.com/philpax/jc2mp.github.io/pull/2) (November 12, <DiffStats add=532 sub=18 />)
- [feat: migrate from Bootstrap to Tailwind CSS](https://github.com/philpax/jc2mp.github.io/pull/3) (November 12, <DiffStats add=86 sub=82 />)
- [Generate missing index pages](https://github.com/philpax/jc2mp.github.io/pull/4) (November 13, <DiffStats add=184 sub=3 />)
- [Wiki SSG](https://github.com/jc2mp/jc2mp.github.io/pull/1) (November 13, <DiffStats add=26982 sub=2 />)
- [Update wikitext parsing functionality](https://github.com/jc2mp/jc2mp.github.io/pull/3) (November 18, <DiffStats add=49 sub=27 />)
- [Add basic search to MediaWiki static site generator](https://github.com/jc2mp/jc2mp.github.io/pull/4) (November 18, <DiffStats add=568 sub=21 />)

# [philpax/blackbird](https://github.com/philpax/blackbird)
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


# [philpax/paxboard](https://github.com/philpax/paxboard)
- [Rewrite the codebase](https://github.com/philpax/paxboard/pull/11) (November 14, <DiffStats add=4521 sub=2515 />)
- [Add world clocks for major cities](https://github.com/philpax/paxboard/pull/12) (November 14-15, <DiffStats add=160 sub=0 />)
- [Copy world clock times to clipboard](https://github.com/philpax/paxboard/pull/13) (November 16, <DiffStats add=81 sub=1 />)
- [Display weather for Stockholm and Melbourne](https://github.com/philpax/paxboard/pull/14) (November 16, <DiffStats add=295 sub=2 />)
- [Add system stats view to dashboard monitoring.](https://github.com/philpax/paxboard/pull/15) (November 23, <DiffStats add=1724 sub=20 />)

# [philpax/rucomfyui](https://github.com/philpax/rucomfyui)
- [Fix issue #6 in rucomfyui repository](https://github.com/philpax/rucomfyui/pull/12) (November 16, <DiffStats add=918 sub=639 />)
- [Port nodegraph code to egui-snarl library](https://github.com/philpax/rucomfyui/pull/13) (November 17 - December 23, <DiffStats add=586 sub=363 />)
- [Add Lua interface for ComfyUI nodes](https://github.com/philpax/rucomfyui/pull/14) (December 3, <DiffStats add=1103 sub=1 />)
- [Format code + formatting CI](https://github.com/philpax/rucomfyui/pull/15) (December 3, <DiffStats add=192 sub=70 />)
- [Build API workflow to Rust/Lua converter](https://github.com/philpax/rucomfyui/pull/16) (December 7-11, <DiffStats add=2712 sub=0 />)

# [ferrobrew/ida-c-splitter](https://github.com/ferrobrew/ida-c-splitter)
- [Parse function signatures](https://github.com/ferrobrew/ida-c-splitter/pull/1) (November 17-18, <DiffStats add=3910 sub=5 />)
- [Add file tree generation](https://github.com/ferrobrew/ida-c-splitter/pull/2) (November 18, <DiffStats add=132 sub=3 />)
- [Make it a bit more production-ready](https://github.com/ferrobrew/ida-c-splitter/pull/3) (November 18, <DiffStats add=525 sub=105 />)
- [Fix parse_signature tests for function pointers](https://github.com/ferrobrew/ida-c-splitter/pull/4) (November 19, <DiffStats add=23 sub=5 />)
- [Fix signature parser to pass tests](https://github.com/ferrobrew/ida-c-splitter/pull/5) (November 19, <DiffStats add=169 sub=20 />)
- [Create type parser with tests](https://github.com/ferrobrew/ida-c-splitter/pull/6) (November 20, <DiffStats add=12292 sub=438 />)
- [Refactor code and update documentation](https://github.com/ferrobrew/ida-c-splitter/pull/7) (November 20-21, <DiffStats add=414 sub=742 />)
- [Set up CI for automatic GitHub releases](https://github.com/ferrobrew/ida-c-splitter/pull/10) (November 21, <DiffStats add=89 sub=0 />)

# [philpax/paxhtml](https://github.com/philpax/paxhtml)
- [Add custom component interpolation to HTML macro](https://github.com/philpax/paxhtml/pull/1) (November 17, <DiffStats add=334 sub=32 />)
- [feat: extract HTML parser into runtime-callable library](https://github.com/philpax/paxhtml/pull/2) (November 22, <DiffStats add=860 sub=314 />)
- [Use bumpalo allocator for everything](https://github.com/philpax/paxhtml/pull/3) (December 30-31, <DiffStats add=1171 sub=532 />)
- [refactor: remove mlua support + owned elements](https://github.com/philpax/paxhtml/pull/4) (December 31, <DiffStats add=1 sub=744 />)

# [philpax/philpax.github.io](https://github.com/philpax/philpax.github.io)
- [Add custom components support ](https://github.com/philpax/philpax.github.io/pull/13) (November 17-18, <DiffStats add=122 sub=78 />)
- [Add custom social media preview image generation](https://github.com/philpax/philpax.github.io/pull/14) (November 22-23, <DiffStats add=755 sub=48 />)
- [feat(styles): improve light mode color palette](https://github.com/philpax/philpax.github.io/pull/15) (November 23, <DiffStats add=4 sub=4 />)
- [Add light mode support to code blocks](https://github.com/philpax/philpax.github.io/pull/16) (November 23, <DiffStats add=148 sub=8 />)
- [refactor: replace syntect with arborium for syntax highlighting](https://github.com/philpax/philpax.github.io/pull/18) (December 30 - January 3, <DiffStats add=383 sub=1659 />)
- [Use paxhtml with bumpalo allocator](https://github.com/philpax/philpax.github.io/pull/19) (December 31, <DiffStats add=479 sub=302 />)
- [Performance optimisations](https://github.com/philpax/philpax.github.io/pull/20) (December 31 - January 1, <DiffStats add=490 sub=215 />)
- [feat: switch to gitoxide for commit date lookups](https://github.com/philpax/philpax.github.io/pull/21) (January 7, <DiffStats add=1805 sub=157 />, **closed**)

# [philpax/nixos-configuration](https://github.com/philpax/nixos-configuration)
- [Organize dotfiles config by machine](https://github.com/philpax/nixos-configuration/pull/14) (November 17-18, <DiffStats add=16 sub=9 />)
- [Add automatic lock and sleep timers](https://github.com/philpax/nixos-configuration/pull/15) (November 20, <DiffStats add=42 sub=2 />)
- [Set up SSH agent for all operations](https://github.com/philpax/nixos-configuration/pull/16) (November 20, <DiffStats add=19 sub=7 />)
- [Extract shared developer services for reuse](https://github.com/philpax/nixos-configuration/pull/17) (November 20, <DiffStats add=36 sub=34 />)

# [philpax/prismata](https://github.com/philpax/prismata)
- [Set up frontend deployment workflow](https://github.com/philpax/prismata/pull/8) (November 17-18, <DiffStats add=91 sub=0 />)
- [Port project to latest Bevy version](https://github.com/philpax/prismata/pull/9) (November 18, <DiffStats add=3484 sub=2527 />, **closed**)
- [Migrate to Bevy 0.17](https://github.com/philpax/prismata/pull/10) (November 18 - December 25, <DiffStats add=4112 sub=3444 />)

# [philpax/wikitext_simplified](https://github.com/philpax/wikitext_simplified)
- [Add Span and Spanned types for tracking positions](https://github.com/philpax/wikitext_simplified/pull/1) (November 17-18, <DiffStats add=510 sub=457 />)
- [Build React frontend for wikitext parser](https://github.com/philpax/wikitext_simplified/pull/2) (December 25, <DiffStats add=5710 sub=1 />)

# [genresinspace/genresinspace.github.io](https://github.com/genresinspace/genresinspace.github.io)
- [Debug iOS crash issue deep dive](https://github.com/genresinspace/genresinspace.github.io/pull/35) (November 20, <DiffStats add=223 sub=51 />)
- [Optimize CI to separate build and deploy](https://github.com/genresinspace/genresinspace.github.io/pull/36) (November 20, <DiffStats add=23 sub=44 />)
- [Make graph UI responsive for mobile and tablet](https://github.com/genresinspace/genresinspace.github.io/pull/37) (November 20-21, <DiffStats add=195 sub=52 />)
- [Add sidebar snap positions for mobile drag](https://github.com/genresinspace/genresinspace.github.io/pull/38) (November 21, <DiffStats add=41 sub=10 />)
- [Add light mode and harmonize colors](https://github.com/genresinspace/genresinspace.github.io/pull/39) (November 23-24, <DiffStats add=282 sub=110 />)

# [philpax/openxrs](https://github.com/philpax/openxrs)
- [Add D3D11 triangle example with spinning RGB triangle](https://github.com/philpax/openxrs/pull/1) (November 21, <DiffStats add=914 sub=0 />, **closed**)

# [philpax/dwarf-c-reconstructor](https://github.com/philpax/dwarf-c-reconstructor)
- [Parse DWARF debug info to reconstruct C files](https://github.com/philpax/dwarf-c-reconstructor/pull/1) (November 22, <DiffStats add=3149 sub=3 />)
- [Refactor code and add argument parsing](https://github.com/philpax/dwarf-c-reconstructor/pull/2) (November 22, <DiffStats add=2840 sub=2854 />)
- [Look up byte size from parsed types](https://github.com/philpax/dwarf-c-reconstructor/pull/3) (November 22, <DiffStats add=67 sub=9 />)
- [More functionality](https://github.com/philpax/dwarf-c-reconstructor/pull/4) (November 23, <DiffStats add=891 sub=129 />)
- [More features and fixes](https://github.com/philpax/dwarf-c-reconstructor/pull/5) (November 23, <DiffStats add=575 sub=114 />)
- [More fixes](https://github.com/philpax/dwarf-c-reconstructor/pull/6) (November 26-27, <DiffStats add=207 sub=34 />)
- [Verify reconstructor output on all samples](https://github.com/philpax/dwarf-c-reconstructor/pull/7) (November 27, <DiffStats add=140 sub=34 />)
- [Fix memory function hook declaration](https://github.com/philpax/dwarf-c-reconstructor/pull/8) (November 30, <DiffStats add=416 sub=143 />)
- [Sort labels in drawing function](https://github.com/philpax/dwarf-c-reconstructor/pull/9) (December 2, <DiffStats add=233 sub=145 />)
- [Fix function body brace wrapping regression](https://github.com/philpax/dwarf-c-reconstructor/pull/10) (December 6, <DiffStats add=42 sub=6 />)
- [Fix spacing around pointer asterisks in type generation](https://github.com/philpax/dwarf-c-reconstructor/pull/11) (December 6, <DiffStats add=3 sub=4 />)
- [Remove duplicate typedef definitions from compilation units](https://github.com/philpax/dwarf-c-reconstructor/pull/12) (December 6, <DiffStats add=60 sub=36 />)
- [Fix class method parameter extraction and definition generation](https://github.com/philpax/dwarf-c-reconstructor/pull/13) (December 6, <DiffStats add=669 sub=349 />)
- [Add workflow dispatch for release automation](https://github.com/philpax/dwarf-c-reconstructor/pull/14) (December 6, <DiffStats add=50 sub=0 />)
- [Add workflow_call and workflow_dispatch to release workflow](https://github.com/philpax/dwarf-c-reconstructor/pull/15) (December 6, <DiffStats add=26 sub=2 />)
- [Fix pointer and reference formatting style](https://github.com/philpax/dwarf-c-reconstructor/pull/16) (December 7, <DiffStats add=14 sub=6 />)
- [Fix class definition generation in facebin CU](https://github.com/philpax/dwarf-c-reconstructor/pull/17) (December 7, <DiffStats add=128 sub=2 />)
- [Refactor long tuples into struct types](https://github.com/philpax/dwarf-c-reconstructor/pull/18) (December 7, <DiffStats add=209 sub=293 />)
- [Fix deduplication for namespaced types](https://github.com/philpax/dwarf-c-reconstructor/pull/19) (December 7, <DiffStats add=115 sub=24 />)
- [Remove empty braces from forward declared classes](https://github.com/philpax/dwarf-c-reconstructor/pull/20) (December 7, <DiffStats add=20 sub=0 />)
- [Fix workflow dispatch trigger in release workflow](https://github.com/philpax/dwarf-c-reconstructor/pull/21) (December 7, <DiffStats add=2 sub=0 />)
- [Generate nested types with correct file placement](https://github.com/philpax/dwarf-c-reconstructor/pull/22) (December 7, <DiffStats add=73 sub=5 />)
- [Add verbose class usage option](https://github.com/philpax/dwarf-c-reconstructor/pull/23) (December 7, <DiffStats add=59 sub=24 />)
- [Fix namespace and typedef code generation](https://github.com/philpax/dwarf-c-reconstructor/pull/24) (December 7, <DiffStats add=25 sub=0 />)
- [Add default public accessibility to class members](https://github.com/philpax/dwarf-c-reconstructor/pull/25) (December 7, <DiffStats add=6 sub=14 />)
- [Fix missing arguments in generated header declarations](https://github.com/philpax/dwarf-c-reconstructor/pull/26) (December 8, <DiffStats add=16 sub=4 />)
- [Skip unnamed forward declared structs](https://github.com/philpax/dwarf-c-reconstructor/pull/27) (December 8, <DiffStats add=5 sub=0 />)
- [Fix namespace scope in class definitions](https://github.com/philpax/dwarf-c-reconstructor/pull/28) (December 8, <DiffStats add=125 sub=27 />)
- [Add option to skip namespace indentation](https://github.com/philpax/dwarf-c-reconstructor/pull/29) (December 8, <DiffStats add=19 sub=4 />)
- [Add verbose class usage option to compiler](https://github.com/philpax/dwarf-c-reconstructor/pull/30) (December 24, <DiffStats add=31 sub=24 />)
- [Fix duplicate namespace declarations in code generation](https://github.com/philpax/dwarf-c-reconstructor/pull/31) (December 24, <DiffStats add=70 sub=7 />)
- [Add empty lines around namespace brackets](https://github.com/philpax/dwarf-c-reconstructor/pull/32) (December 24, <DiffStats add=12 sub=0 />)
- [Fix missing base class declaration generation](https://github.com/philpax/dwarf-c-reconstructor/pull/33) (December 24, <DiffStats add=114 sub=38 />)
- [Remove class prefix from inheritance declarations](https://github.com/philpax/dwarf-c-reconstructor/pull/34) (December 24, <DiffStats add=12 sub=2 />)
- [Refactor code for better maintainability](https://github.com/philpax/dwarf-c-reconstructor/pull/35) (December 24, <DiffStats add=3453 sub=3276 />)
- [Add line numbers to forward declared elements](https://github.com/philpax/dwarf-c-reconstructor/pull/36) (December 26, <DiffStats add=4 sub=0 />)
- [Fix duplicate namespace declarations in generated code](https://github.com/philpax/dwarf-c-reconstructor/pull/37) (December 26, <DiffStats add=90 sub=6 />)
- [Fix duplicate enum definitions in generated file anonymous types](https://github.com/philpax/dwarf-c-reconstructor/pull/38) (December 26, <DiffStats add=326 sub=14 />)
- [Fix duplicate typedef for mpColor struct logic](https://github.com/philpax/dwarf-c-reconstructor/pull/39) (December 26, <DiffStats add=37 sub=62 />)

# [ferrobrew/egui-directx10](https://github.com/ferrobrew/egui-directx10)
- [Merge upstream](https://github.com/ferrobrew/egui-directx10/pull/2) (November 23-24, <DiffStats add=1662 sub=773 />)

# [ferrobrew/re-utilities](https://github.com/ferrobrew/re-utilities)
- [Update windows-rs to version 0.62](https://github.com/ferrobrew/re-utilities/pull/11) (November 26, <DiffStats add=73 sub=27 />)
- [Replace anyhow with custom error enums](https://github.com/ferrobrew/re-utilities/pull/12) (November 26, <DiffStats add=610 sub=129 />)

# [ferrobrew/bevy-headless-console](https://github.com/ferrobrew/bevy-headless-console)
- [feat: upgrade to Bevy 0.17](https://github.com/ferrobrew/bevy-headless-console/pull/2) (November 26, <DiffStats add=65 sub=53 />)

# [ferrobrew/pyxis-defs](https://github.com/ferrobrew/pyxis-defs)
- [Real generics](https://github.com/ferrobrew/pyxis-defs/pull/1) (December 17, <DiffStats add=2472 sub=2570 />)
