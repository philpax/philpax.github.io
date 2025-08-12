+++
title = "an even quieter week"
short = "A busy work week means a quiet personal week."
datetime = 2025-08-12T23:40:00Z

[taxonomies]
tags=["paxboard", "dalamud"]
+++

Last week was a terribly busy week at work, which left me without a lot of energy to work on my own projects. Things should calm down after this, but nevertheless, I am left without much to show for this week.

<!-- more -->

# paxboard

As I mentioned last week, I wanted to port `paxboard`'s view rendering to Lua to make it easier to iterate on, especially as I was able to design a DSL that works well enough. After a lot of messing about, I was able to wire up `mlua`, `paxhtml`, and a bunch of hacks to successfully port `paxboard` to Lua:

```lua
function render()
    return html { lang = "en-AU" } {
        head {} {
            title {} "paxboard",
            meta { charset = "utf-8" },
            meta { name = "viewport", content = "width=device-width, initial-scale=1" },
            link { rel = "stylesheet", href = "/styles.css" },
        },
        body { class = "max-w-[860px] mx-auto text-[var(--color)] bg-[var(--background-color)] p-4 transition-all duration-200 font-['Literata',serif]" } {
            header { class = "w-full" } {
                h1 { class = "text-3xl font-bold mx-auto text-center border-b border-white border-dotted pb-4 italic" } {
                    "paxboard"
                }
            },
            main { class = "mt-4 space-y-8" } {
                -- Local Services Section
                section {} {
                    h2 { class="text-2xl font-semibold mb-4 text-center" } { "local services" },
                    div { class="grid grid-cols-1 md:grid-cols-2 gap-4" } {
                        iter(local_services):map(function(service)
                            local url = service.url
                            return a {
                                href=url,
                                target="_blank",
                                rel="noopener noreferrer",
                                class="block p-6 bg-[var(--background-color-secondary)] rounded-lg hover:bg-opacity-80 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                            } {
                                div { class="text-xl font-semibold mb-2" } { service.name },
                                div { class="text-[var(--color-secondary)] text-sm" } { url }
                            }
                        end):totable()
                    }
                },

                -- Large Model Proxy Section
                render_large_model_proxy_section()
            }
        }
    }
end
```

The output is more or less exactly the same, outside of some sorting quirks. I'm a little ambivalent about it; it's definitely an improvement over the Rust HTML DSL (by virtue of having better solutions for custom components and interpolation), but it's ergonomically worse in some ways.

The most obvious example of this is iteration: Lua doesn't have native functional transformers, so I'm using a third-party library, [luafun](https://luafun.github.io/), to provide this. It works, as you can see, but it's not as nice as it would be in Rust or Ruby or another functionally-minded language: there's just a bit too much syntax noise to make it read nicely, and a bit too much bookkeeping with having to explicitly construct an iterator that then gets converted back to a table.

Still, I think I will keep this and continue developing `paxboard` with it. I did have some designs around bringing this back into `paxsite`, so that I could have a delightful lil' homegrown Rust + Lua SSG, but the time required to port `paxboard` (even with AI help) has somewhat disincentivised me from doing so. That being said, because the Lua integration de/serializes tables into `paxhtml` types, I think it would be possible to do it piecemeal: the Rust views could be partially swapped out for Lua views, so that I could migrate them over time.

I'm not sure; it's something I'll have to think about. The end form of this is that the Rust SSG would be mere scaffolding that runs Lua code with some integrations for handy features (Markdown parsing, image conversion, syntax highlighting), and everything else would be defined in Lua. I think I've seen this design elsewhere, but it's not quite coming to mind. (Sort of like `premake` or `tundra`, I guess?)

I should address something, though: anyone with any degree of sanity should be asking me why I'm going down this route instead of just slapping something together with a TypeScript framework of some kind (Next, Astro, some small layer over React SSR, etc). Outside of the usual NIH reasons - it is fun to build all of this oneself, and to design it to my exact specifications - the main thing I want to enable is low-effort maintenance.

I want to be able to deploy this ten years from now and have it work just the same without changes, and without getting any pesky deprecation warnings; my previous sojourns with long-lived low-maintenance projects with the Ruby and JS ecosystems have ended poorly, so I'm building around things that I know are low-touch: Rust and Lua.

We'll see if the cost of DIY outweighs the cost of just keeping a more conventional solution going. My gut feeling is that it has already outweighed it by several magnitudes, but the cost has already been paid, so I might as well keep going.

# secret project

Still working on this. Started experimenting with finetuning a LLM to help with knowledge integration and style reproduction, but haven't picked that up from the state it's in because it's not directly relevant to the work that needs to be done. You can go a long way with long-context LLMs and dumping entire documents in, especially with the current generation of LLMs.

I have some doubts about the concept that I'm working on, but at the same time, I'm too committed and too bereft of remaining time to change direction now. No, I must see this through, even if my heart's not fully in it.

I have less than two weeks until my self-appointed deadline, so I need to _dramatically_ pick up the pace. I suspect a few more Discord vacations are in my near-future.

# dalamud plugins

Last week brought Patch 7.3 to Final Fantasy XIV, which in turn brought a new version of Dalamud with changes to the API surface. This meant hundreds of plugins were updated, and I, among others, spent hours reviewing their code before approving them. It's not glamorous work, but it's gotta get done, and it's possible to get into a kind of rhythm that enables clearing away dozens at a time.

The bulk of it is done, and the main impact has been to drive up my GitHub metrics. Yay, I guess?

# furniture

Finally, I would be remiss to not mention another timesink: after months of putting it off, I finally put together another IKEA order. I promptly spent the majority of my weekend assembling, and I now have a separate work desk and chair to show for it.

Remote workers mention this all the time, but I wanted to add to the chorus: you want to physically separate your work and play spaces at home as much as possible. The physical boundary between the two is surprisingly psychologically powerful: even if it's only a small amount of additional friction, being able to physically set aside your work for the day also helps one mentally set the work aside.

Getting all of that sorted out took some time, but I'd say it was worth it; I'm already seeing benefits from having two separate environments, and knowing that "getting to work" involves a change of environment.
