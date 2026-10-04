*Drafted by GLM-5.3-Flash.*

## Abstract

A terminal web browser where the whole page is an image: Servo renders the page offscreen to a bitmap, and the bitmap is displayed in the terminal through a graphics protocol such as kitty's. Unlike a text-mode browser such as w3m, the terminal receives a complete, pixel-exact picture of the web page — a browser's fidelity with none of its convenience. It is a cursed way to browse the web, but it might also be genuinely usable. As motivation, it is a fun way to kick the tires on Servo as an embeddable engine, without the build and behavioural weight of Chromium.

<!-- more -->

## Implementation

A Rust binary embeds Servo via libservo and directs the compositor at an offscreen rendering context (as servoshell does for its minibrowser; headless mode already proves the render-to-image path). A thin terminal frontend wraps the rendered page with a URL bar and status line, and displays the image through a graphics protocol — kitty's is a reasonable default, with the exact encoding mechanism left open, as anyone implementing this will have a preferred solution (ratatui-image already covers kitty, sixel, and iTerm2). A practical variant is also possible: Servo's `--output-image-path` headless mode as a one-shot "render this URL to the terminal" tool, which is the whole idea with no interaction at all.

The page is treated as one full-height image: scrolling falls out of the terminal's own scrollback rather than a pager. Input is forwarded rather than faked — crossterm delivers key and mouse events to Servo's `WebView` API, Servo redraws, and the new frame is displayed. Text input caret fidelity is Servo's problem (it draws the caret into the pixels); the terminal's own cursor should stay hidden.

## Prior art

- [Brow6el](https://github.com/codingismy11to7/brow6el): close to the same idea, using CEF instead of Servo, with sixel and kitty output. Its warnings about kitty over SSH (uncompressed RGBA per frame) quantify the bandwidth problem this idea shares.
- [kittyhtml](https://github.com/kkukshtel/kittyhtml): renders HTML to an image and displays it via the kitty protocol, using Blitz rather than a real engine — a single-shot, non-interactive cousin.
- [webcat](https://github.com/MuscleGear5/webcat): renders pages as text with inline images via chafa; reader-mode output rather than pixel-exact page images.
- [ratatui-image](https://github.com/ratatui/ratatui-image): reusable Rust implementation of the kitty/sixel/iTerm2 encoding side (and, if we skip the TUI overhead, [viuer](https://crates.io/crates/viuer)).
- [Servo offscreen rendering PR](https://github.com/servo/servo/pull/30767) and the [embedding docs](https://book.servo.org/embedding/overview.html): the mechanism that makes this buildable at all.
