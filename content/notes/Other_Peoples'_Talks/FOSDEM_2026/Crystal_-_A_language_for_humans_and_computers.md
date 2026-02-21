<https://fosdem.org/2026/schedule/event/N3AFSF-crystal/>

<!-- more -->

- Manas worked in Ruby, but there were things about Ruby that weren't ideal:
  - Lack of static type system
  - Poor concurrency situation
  - What if we could evolve Ruby to compile statically?
- And thus Crystal was born
- Compiler was initially written in Ruby, and then the language grew into its own ecosystem
- "General-purpose programming language that's object-oriented, garbage-collected, with [...] lots of goodies from Ruby [...] static typing and inference [...] compiles to native code [...] strong native concurrency model"
- Best from Ruby, add more
  - Very dynamic, so you can do lots of stuff
  - You don't get that much flexibility from a static language
    - Crystal moves into the static direction, without losing the dynamic feel of Ruby
- Function without typed arguments will use generic types, so `add(a, b)` can be instantiated with both integers and strings
  - Code is instantiated at compile-time, so you know `add "foo", 2` won't work before you run it

```crystal
message = gets
puts message.upcase
```
will fail because `message` can be `String | Nil`; we have to prove a `message` is a `String`:
```crystal
message = gets
if message.is_a?(String)
  puts message.upcase
end
```

Also supports metaprogramming:
```crystal
macro getter(var)
  @{{ var }}

  def {{ var.var }}: {{ var.type }}
    @{{ var.var.id }}
  end
end

getter foo : Int32 = 0
```

expands to
```crystal
@def : Int32 = 0

def foo : Int32
  @foo
end
```
This example is simplified, so much more is possible.

- Batteries included
  - HTTP server with request-response behaviou, fully-concurrent (tens-of-thousands connections)
- Concurrency
  - Crystal has native support for fibers, so you can spawn fibres and run code in them and send messages to them etc
```crystal
done = Channel(Int32).new

spawn do
  result = do_some_work
  done.send result
end

done.receive
```
Everything here will be scheduled appropriately.

- In the future:
  - Concurrency support is great, but multithreading is not really there yet
    - Multithreading support exists, but was implemented as single-thread schedulers running on independent threads with no movement
    - This is being addressed by execution contexts, which enable more multithreading
    - Multithreading at scale is still largely unsafe, so more work to be done
  - Crystal was designed for thread-safety by default, but the existing code out there is largely targeting single-threaded code, so much work must be done to get it fully multithreading-safe
  - Need to add support for `io_uring`; support is in near-final phase, it's been being worked on for a while, preview might come in the next few weeks
  - Windows support! Has been there for a while, but there are a few tiny things that need to be resolved; almost there. Won't say it's supported until it's fully supported.
- Can learn about Crystal from the language reference/Exercism track
- Question: Compatible with Ruby?
  - Very simple programs could work, but Crystal needs some type annotations here and there.
  - Things have diverged a fair bit
  - There's a library that allows for interacting between Crystal and Ruby; can compile Crystal and make it available to Ruby
