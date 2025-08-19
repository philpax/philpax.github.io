Python is not my favourite language. It's not my second-favourite, and I'm afraid it doesn't qualify for third-favourite, either. No, it's actually well down there in my personal rankings: lower than Elixir, lower than Ruby, lower than Lua, lower than Go, and if we're adjusting by how often I'm forced to interact with it, it's lower than Perl and PHP, too.

<!-- more -->

I freely admit that I am a Rust-primary programmer, and that it's not a fair comparison: Rust is a much newer language that had the chance to learn from its predecessors, its learning curve is much steeper, and it competes in an entirely different market. That being said, I have tasted the forbidden fruit, and because of that, Python ranks as one of the most miserable languages I have to interact with on a regular basis.

The strong efforts to drag it out from the pit in which it resides by old-timers and newcomers alike are helping, but I suspect it will be a long, long time before I consider it a serious language. And yes, I know it's used by serious people for serious codebases, but half of the internet's websites were written in PHP, and that didn't stop us from calling it an unserious language.

This is an incomplete list that I will add to over time, and perhaps reformat; it is not presented in any particular order:

- comprehensions force an inside-out reading order that makes them extraordinarily painful to read when nested
  - they do not compose well; they are effectively syntax sugar for `filter |> map`, which means that `map |> filter` requires a second comprehension
- lambdas are limited to one expression. Not one block, not one line, one expression.
- following from the above, functional programming has been an [explicit anti-target](https://www.artima.com/weblogs/viewpost.jsp?thread=98196), and what exists today is perfunctory
- the ternary syntax, in a fashion similar to comprehensions, requires parsing the code in inside-out order to understand what it will do in both the `True` and `False` cases
- whitespace sensitivity pushes the busywork of formatting onto humans, when autoformatters can do a better, more consistent job while being more amenable to copy-and-paste + code shuffling
- the language can be [hotpatched to be anything you want to be](https://www.youtube.com/watch?v=H2yfXnUb1S4), including, and especially, a language that doesn't work
- the standard library may be batteries-included, but half of those batteries have expired in the last decade, and some of the batteries were malformed to begin with
  - `datetime.datetime`. No. Bad. Do not name your type the same thing as your module. I cannot count the number of times I have gotten got by trying to use `datetime.timedelta` after a `from datetime import datetime`.
- the callstacks are full of irrelevant noise that require you to hunt for the cause of an issue
- package management. It's bad! I don't know what I can say! It's an abomination! It is worse than basically any other language, and the efforts to fix it have only made more of a mess!
  - `uv` is genuinely fixing this, but not everyone is using it, and there is some concern around porting the entirety of the Python ecosystem to VC-ware that has yet to establish its monetisation path[^vcware]
  - explicit `virtualenv`s / global-first installations are insane, as [xkcd has so kindly pointed out](https://xkcd.com/1987/)[^gcs]
  - it is basically impossible to reproduce the environment for codebases that were poorly versioned to begin with; good luck trying to get any ML code from two years ago to work
  - as packages are all dumped into one environment, there is no way to have two dependencies use two different versions of the same sub-dependency. Hope your dependencies can use the same version of Pydantic!
- imports are a mess, and you can make them even more of a mess by patching the import path at runtime
- the typehints are not at all enforced in stock Python, which means you can just lie about what they are and nothing will catch them by default
  - the type-checkers fix this, but they are either slow, incomplete (in the sense of not being done yet), or incomplete (in the sense of not being able to fully capture Python's madness)
- similarly, you just can't hide any code from consumers; _everything_ is public, including internals that you very much do not want to be public, which makes abiding by [Hyrum's Law](https://www.hyrumslaw.com/) basically impossible
- mutable default arguments. Yes, I know why this happens, and while it's cute that everything is an object and the global state associated with the function object is initialized at initial evaluation, it's still just bad from a user's perspective. Sorry.
- the language is inherently hostile to robust software engineering as a result of the above deficiencies
- the relative flexibility of the language allows people who don't know any better (e.g. ML researchers) to write some of the worst, most unmaintainable code you will ever see
- the performance is bad and the GIL is irritating, but that's OK, because you shouldn't be trying to write high-performance software in Python anyway[^ireallyhatepython]
- and while these aren't exclusive to Python by any means, they certainly don't help:
  - no tagged unions / algebraic datatypes. You can make do with a base class and some derived classes, but that's an open set, which means that external users can interfere with it
  - nullable types
  - pass-by-copy-of-mutable-references suggests spooky mutation at a distance, and the only way around this is defensive copying
  - exceptions. Please tell me how your function can fail ahead of time. You don't even have to make me deal with it, just make me aware that it _can_ fail! I don't want a 3AM Runtime Surprise™!
  - late-binding closures; to be fair, Go got this one wrong too, so I'm willing to forgive Python for having made this mistake much earlier
  - neither here nor there, but I prefer RAII to `with`. Not something to fail the language over, though.

[^vcware]: On the other hand, the death of Astral / `uv` in this scenario would also mean the death of Python, which is a sacrifice I'm willing to accept
[^gcs]: I love having to maintain a specific version of Python for the Google Cloud CLI
[^ireallyhatepython]: I mean, you would preferably _never_ reach for Python, but I'll take what concessions I can get

Your average seasoned Python programmer will tell me that I'm holding it wrong, and that I shouldn't expect it to be something that it isn't. I understand that, but I will still categorically refuse to accept this language's sins. We can and should aspire for better things, and while most of these issues can't be fixed, some of them can.

In any case, you will certainly never see me advocate writing a new codebase in Python, unless it's one of the very few domains that actually _need_ it.[^luatorch]

[^luatorch]: LuaTorch should have won, man. At least Lua isn't pretending to be something it's not.
