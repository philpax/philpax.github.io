+++
title = "Reflections on six months of agentic programming"
short = "Since November, I have written a single-digit percentage of code by hand. What does that mean for me? What does that mean for all of us?"
datetime = 2026-05-10T18:00:00Z
draft = true

[taxonomies]
tags=["ai", "ethics"]
+++

- follow-up post to my experiences in [the big claude down](../../updates/the-big-claude-down/index.md), among other things
- actively changing over time, especially as new things keep happening
- six months of 95-99% of code written by agents. hard to put an exact percentage on it, but I have spent the equivalent of tens of thousands of dollars of API-priced tokens in this period
- context: I'm a senior engineer, I've been writing code for nearly two decades, but I also consider myself to be a creative and someone in the business of creating things, not for profit, but for edification of the self and of the public. I consider myself to be someone with a great many ideas and with the skill and taste to execute upon those ideas - or at least, learn how to - but, crucially, without the time required to see them through
- that, of course, has changed with AI, just as many things have, and many things are going to
- so let me take a moment, or a few, to discuss how I'm feeling as the fourth year of the AI boom - dare I say, revolution - plays out, and as the agents come online

<!-- TODO: add a hero image (a nondescript silhouette falling down amongst a sea of Claude Code crabs?), general edit pass, punch up introduction -->

<!-- more -->

The following reflections are structured into two sections: technical, where I discuss the practical aspects of working with agents, and philosophical, where I interrogate the wider-ranging impacts of their use upon their users, the field, and upon society as a whole. There is not a clear division between these; the microscale can affect the macroscale, but there are some topics that clearly fall on either side of the line.

# Technical
## Waiter, This Claude Code Web Is Raw
<!-- TODO: refactor to discuss how the design of and interaction with coding agents is still unsettled -->

Claude Code Web was insanely buggy. I say "was" as it has been significantly improved since my use of it in anger; I would consider most of the feedback here to no longer be relevant.

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

## Codebase Amnestics
- the more you lean on AI, the less you build a memory for what the codebase actually looks like at both the structural and ground level
- reviewing the diffs is fine, yes, you can make sure that it isn't making any mistakes and that it fits into the vision you have
- but you won't actually build up an understanding of the codebase as a whole, and you will find yourself having to ask the AI to find you things
- the problem can compound if you do not build this memory and let the AI produce as it sees fit, as now it will produce duplicates of existing functionality - neither party involved here has the ambient awareness required to maintain codebase hygiene
- having the AI write documentation, as well as engaging in periodic refactoring passes, as mentioned above, can help with this
- but fundamentally, you need to actually be looking at what's being produced at closer-than-review frequencies, and building that mental model
- as with the quality, I will freely admit that I did not do this for all of these projects: it simply does not matter, as the codebases are small enough or the scope constrained enough that loading the codebase into your own context on demand is sufficient
- however, for larger projects, you must be careful about this. do not let yourself be blinded by the ease of creation: you must also eventually pay the cost of comprehension, lest you create a singularity of code that will tear your project apart
- see [this post by Lalit Maganti](https://lalitm.com/post/building-syntaqlite-ai/) for another account of this problem, among others

## The Siren Call of The Slop Stack
- the agents will pull you towards [their preferred stacks](https://amplifying.ai/research/claude-code-picks), where preferred comes from the common folklore of the internet, RLHF on data from [underpaid and exploited data workers](https://cwa-union.org/ghost-workers-ai-machine), RLHF on data from [less underpaid data workers](https://builtin.com/articles/train-ai-side-hustle), or RLHF on the taste of whichever employee was processing the data that day
- most of the time, this choice is fine, and honestly, I've given into the call much of the time
- this means I've doubled down on React + TypeScript + Tailwind as my frontend stack, for example
- however, you should be aware that this is not always the right choice, and that there are other solutions worth considering, too
- as a somewhat dire example - I had a passing interest in Svelte(Kit), but never engaged that interest because it didn't seem beneficial enough to do
- now that the agents are especially good at the SlopStack™️, I'm just not that inclined to spend time on SK. at the same time, I could just be growing too old and employed to spend my free time learning new frameworks to do the same thing
- however, I do think it could go the other way: for example, you could use an AI to help you learn these lesser-known frameworks with more reactive feedback
- even if their inherent knowledge is wrong or out of date, they're excellent at consulting reference documentation, and can thus self-correct reasonably well

- conversely, however: there's no excuse for making _bad_ choices in favour of expediency
- I am a [certified Python-hater](../../notes/Programming/Reasons_I_do_not_like_Python.md), and now there's _really_ no reason to use it past the one-thousand line mark, assuming that you are not subject to ecosystem constraints (and even those too are weakening as more and more people discover the power of `claude -p "rewrite it in Rust"`)
- prototype in whatever language you like, do whatever sins you need to do, but you have the tools to rapidly make your code production-ready (which I note is a different thing to productionizing!), so you should bloody well use them
- that's right. I am no longer asking. Rewrite It In Rust. (bernie meme)

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

## Are We All Anthropic's Serfs Now?
- to do this, I needed a Claude Code subscription
- in the process of doing it, I upgraded my subscription
- I am paying an AI company to do work: and even though I generally like that company's vibes, there's no denying that, to maintain this amount of leverage, I will need to keep paying
- so far, we are largely in the industry's growth phase: your money can take you reasonably far
- this has shifted in some ways: over the month of April, the amount of tokens you get for your quota has significantly diminished, likely because they either cannot offer to subsidise as much, or because their demand overwhelms their supply
- nonetheless, it is not lost on me that we are now operating at Anthropic or OpenAI's whims; their outages, denials of service, or other such disruptions can and will have a material impact on what you can do
- whenever I lose access - whether that be due to outages or to running out of quota - it is troublesome, especially if I am in the middle of something intensive. the best analogy I can give you is that it feels like a hyperdrive failure: I can still get to where I'm going, but it's going to be much, _much_ slower, and I'll need to figure out where the hell I am first
- this is likely to be the case for the frontier, and will continue to be the case going forward, right until they run out of juice - if they do
- but if you're willing to relax your desire to be at the frontier, options open up
- the Chinese models are fast-followers, a few months behind, and have competitive rates
- some of them, although perhaps a decreasing amount, are even open-weights
- and that's where I think things will go. at the time of writing, Qwen 3.6 has recently come out, and do you know what? both 27B and 35B-A3B both work as coding agents. they're not as smart as Claude, they make more mistakes, and they're not nearly as worldly: but by God, they can write code autonomously with guidance
- something that required me to pay $20/month minimum to a provider who can rugpull me at any moment now runs on [my server](../../notes/Hardware/Server.md), and I have already started to use it in lieu of Claude for the tasks that don't require frontier intelligence
- this is something I intend on writing more about in future, once I've had more experience with it all
- it may be jagged, it may be rough, it may require an investment to run: but, at least for now, we are not beholden to the fate of serfs

# Philosophical
## You Really Can Just Build Things, But...
- should you?
- need to apply discernment in what you choose to build and how you choose to build it
- I'm happy with what I've built here, but I was definitely stretching myself towards the end of the credits to find literally anything that I could point the Claude Code Cannon at
- I ended up using it as an opportunity to update old code, instead: it doesn't necessarily have to be feature work you do, even though that's fun and exciting, but long-overdue maintenance
- you still need to have good product sense, I'm afraid, although the agents do have some degree of taste, especially if you bring your own to the table

## Token Anxiety
I hesitate to say this out loud, given how the linked post was received, but [token anxiety](https://bsky.app/profile/timkellogg.me/post/3mevhhd4lbs2b) is real. When you have the ability to affect major changes across software with just a few keystrokes, your own volition becomes the bottleneck, and you will find yourself chafing at the bit to issue more and more work to make the most of your resources.

This was especially exacerbated by the numerical value attached to the credits. I saw the number and felt driven to bring it to zero by dispatching as much work as humanly possible - and in some cases, beyond humanly possible - and it led to rather unhealthy use practices. During the worst of it in November, I found myself sleeping extremely late - sometimes, not at all - so that I could send off more work to be done, review it, and test it. It may have been one of the most productive months of my life, but it was also profoundly self-destructive. This breadth of work led me to experience what I'd describe as mini-burnout, where I was unable to engage with anything I'd touched as a result of the anxiety.

- not the only one to describe this, see Yegge of Gas Town fame[^yegge]: <https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163>

[^yegge]: and other famous works, of course, but Gas Town is what he is known for this year

I cut down on the amount of work I was doing on my own projects during this period - especially as I was meant to be on holiday! - and took some time to recover. For the most part, I'm fine now - back to a healthier rhythm, in touch with my network, engaging in other hobbies - but, if left unchecked, I could see myself (and others who share my personality type) slipping right back into it again.

With that being said, I suspect that at least a significant portion of _my_ particular display here was a result of the behaviour described in this post by Ethan Mollick:

<BlueskyPost post="https://bsky.app/profile/emollick.bsky.social/post/3mhg6h2jnzk2v" />

It's out of my system now, and I don't think it'll come back, at least not to the same extent. I hope, anyway!

## Did You Create This?
- there is an unending debate in the artistic(-adjacent) world as to whether AI art is art.
- for what it's worth, I think it is, and it would be hard for you to convince me otherwise. it's not usually _great_, nor does it usually ascend to the annals of Art&tm;, but there is no definition of art that would exclude AI art that would not exclude an extant form of art. I'm not fully in agreement with [Masley's argument](https://blog.andymasley.com/p/a-defense-of-ai-art), but it's close enough to my view that I'm willing to cite it
- the reason I bring this up is because a topic of discussion in both that debate, and this debate, is "did _you_ really create this if you asked an AI to do it for you?"
- this has been less of an issue to date as LLMs were not good enough to "take the wheel" for long enough to result in a meaningful dispute of ownership
- but now they are, or are to a first-pass approximation: it is quite possible for you to amplify one prompt into an application that works, even if buggy
- and there's an interesting parallel here in the AI art debate: one of the common refrains is that prompting for an artwork is more akin to commissioning an artwork than creating it yourself
- I categorically reject this across both domains with an equally trite counter-argument: [Duchamp's _Fountain_](https://en.wikipedia.org/wiki/Fountain_(Duchamp)) demonstrates that found objects can be recontextualised into art and accepted as such, which trivially satisfies the base case for both art and code: merely finding something and presenting it can be sufficient for notability, and prompting _starts_ from there and gets more involved
- even if you didn't write any of the code or lay down paint strokes yourself, it still reflects _your_ authorial intent, and what you present can be taken to be what you intended, even if you have delegated almost all of it away: because in doing so, you have made a decision in itself
- similarly, there are plenty of artists who have delegated much of their work to their disciples, underlings, or employees, and are still considered the primary author of the work (i.e. auteurs). I won't deny that this is without controversy, but it is largely taken as a given by the majority of audiences and critics alike
- there are reams and reams of words that can be produced, and the art and code is not entirely isomorphic in this argument-space, but there are more similarities than there are differences
- it's for this reason that I also categorically reject half-in arguments, like [this post by Annie Sexton](https://annies-brain.offprint.app/a/3ml6zdf5f5f23-stuck-in-the-middle-being-an-engineer-artist-in-the-ai-era) (who I generally find agreeable): the solution to finding AI art objectionable and AI code acceptable isn't to reject the possibility of code being art to allow you to justify the use of AI for code, it's to accept that they are two sides of the same coin, with many of the same problems, and to own your own position <!-- TODO: make stronger -->
- so yes: when I direct an agent in creating an application, or produce an artwork through iteration, I am responsible for its creation and I take ownership of it. these works would not exist without my hand, and the choices I made in their creation inform them. even if I use one prompt and send it out into the world, I am still making any number of choices: what led me to prompt this work here and now? how did I word my prompt? how much detail am I including? what AI am I using? how many alternatives did I consider? how am I presenting the work?
- the answers to these questions belong to me, and so does the work

## If You Don't Think About It, It Can't Hurt You: Ethics
- of course, the ethics of the industry could have its own post written about it, or several
- there is nuance here - it's not an ethical black hole - but I'm also not going to pretend that it's entirely rosy, either; it's far from it
- there's no shortage of issues: the mass-reallocation of resources, the training of people's replacements using their own work, the shoehorned-in haphazard deployments, the mass-production of violating imagery, the destruction of recorded truth, etc
- even the "good" companies, like Anthropic, are prone to making missteps: [their willingness to work with a US government subject to democratic backsliding](https://www.cnbc.com/2026/05/01/pentagon-anthropic-blacklist-mythos-michael.html), their [using of the xAI Colossus datacenter](www.anthropic.com/news/higher-limits-spacex), and more
- many, but not all, of these problems are a consequence of capitalism: but that doesn't help us when we all live in capitalist societies
- I am insulated from the worst of the consequences: my employment is not tremendously precarious, I have savings, and I have a family I can fall back on: but this is not true for everyone, and a lot of people
- I am also somewhere between an IP abolitionist and an IP minimalist: I don't think you should be able to own ideas or representations of them, at least not in the way that you currently can
- however, I recognise that that IP is a lifeline for many; even in its vulturous, corporate-dominated form, it still offers individual practitioners a chance at pushing back against total misuse
- at the very least, we will need to start developing a solution for redistributing wealth from those it will naturally accummulate to (i.e. AI companies, their shareholders, and those whose fortunes are tied to that of the industry) to everyone else, and to ensure that we are not left for dead. the exact specifics of this are beyond me, but we need to start figuring out a way forward _now_, not later
- it is something to think about as we use these services, but I also believe the cat is firmly out of the bag and the best thing we can do is to push for less-harmful choices
- Anthropic have shown themselves to be the least ethically compromised of the major providers, but I'm under no illusions that this will remain the case forever, especially given their allegiance to the US
- my hope is that local models will catch up, and the hardware to run them will get cheaper
- at the same time, our societies are not well-placed to handle a world in which everyone has informational (super)weaponry

## The End of Coding?
I have written a single-digit percentage of code by hand since November. [This is not an uncommon sentiment](https://simonwillison.net/2026/Jan/4/inflection/), but I want to emphasise it: our profession _has_ fundamentally changed, and the aftershocks from this will rumble throughout as the industry catches up.

- the agents really have improved. I've been using them for the last few years in progressive increments, from asking ChatGPT to produce a function for me in 2023, to using Copilot to autocomplete code, to using Cursor to generate code in-place in 2024, to using Cursor to do more agentic work with the Claudes, to using Claude Code directly in 2025, to now
- the step change at each stage has been noticeable, but Sonnet/Opus 4.5 are more like a hill change
- far more autonomous, far more capable of Doing What You Want at scale, especially on greenfield
- within this period, CC wrote [a complete interpreter from scratch with a vague spec](../../updates/the-big-claude-down/index.md#philpaxperchance-interpreter), [refactored and rebuilt much of an existing (albeit small) compiler to extend its functionality and improve its robustness](../../updates/the-big-claude-down/index.md#ferrobrewpyxis), [significantly improved my music player](../../updates/the-big-claude-down/index.md#philpaxblackbird), etc
- these are not trivial tasks! most junior / intermediate programmers would struggle with managing the complexity here

- I also specifically used the word "coding", not "programming", in this heading
- for now, "programming", the art of understanding and autonomously solving problems on the computer, is safe: you need to understand the domain in which you're operating, and the space of potential solutions
- however, code monkeys - in all that pejorative captures - are probably going to struggle
- that is: people who take very specific specifications and translate them to code, with limited room for creativity. a machine now exists that can do their job at much lower cost and at scale
- this is unfortunate, in the sense that all job loss is unfortunate: but this has always seemed to me a likely development
- I hope we invent a way for them to land on their feet

This doesn't apply for all domains to the same degree: there are many tasks and languages for which the models do not perform at the same standard, or for which they make novice mistakes. I'm not convinced that bulwark will hold forever, but even if it does: the rest of the industry does _not_ consist of these domains, and I very strongly suspect that fewer people per company will be required to do the same amount of work in most areas of programming endeavour.

- it's also not clear to me what will happen to the industry pipeline here
- it was already very hard to justify hiring juniors when seniors were readily available and can be almost immediately useful
- it's going to be so much worse when seniors can use LLMs to replace the output of all of the juniors that they would have otherwise tasked
- the forward-thinking thing to do is to invest in juniors to keep the pipeline alive, and to enjoy the fuzzy feelings of mentoring the next generation and such
- but we all know that's not how things work, and I don't have any clear answers here
- perhaps juniors can push further and faster with LLMs themselves? perhaps they can blaze their own path? but that's not going to be for everyone, and these services cost money

The optimist may suggest that a thousand flowers will bloom as a result of this: after all, if everyone has much more leverage available to them, at least a few of those people will be industrious enough to strike it out on their own and build their own futures. I'd like to say that I believe in this - that there will be something for everyone in some form - but I fear things will not be so neat.

I don't know. More thought is necessary here. What does an optimistic version of the future look like, and how do we get there? What does it mean to be a programmer? What does this mean for white-collar work as a whole? What does it mean for _work_ as a whole? These are questions that I'm still pondering, and am certainly not equipped to answer in this particular post. But you should start thinking about them, too.

- and of course, this is assuming the agents don't continue to move further up the stack
- I am still necessary because I provide ideas, relevant context, and act as a constraining force to ensure that the agents do not wallow in their own slop
- but there's no reason to believe that this will be the case forever: I already consult with Claude whenever I embark on a new endeavour to scope out the problem space and to find any potential blockers
- in due time, all of this will be made autonomous
- I say this all the time, with varying levels of fear attached, but it is worth internalising: at this rate, the vast majority of the profession will be unemployable in due time, and this contagion is likely to spread to other professions, even if their work is not as easy to automate
- so let's do our best to figure out how we survive in a world that looks like that!
