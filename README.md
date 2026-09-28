# paxsite

A custom SSG backed by `paxhtml`, a HTML templating library.

Use

    cargo watch -x clippy -x 'test --workspace' -x 'run -F serve' --poll

to develop. (The `--poll` flag is needed as change detection sometimes detects changes to `contents` when they're read.)

Consider turning on fast mode by adding `-- --fast` to `run -F serve` to skip a few slow steps.
This may lead to inconsistencies in the output, so this should be used with caution and only during iteration.

## Flags

- `--fast`: Skips directory cleaning and OG image generation, and reuses the last subset of each font rather than cutting new ones.

## Fonts

The faces are cut at build time from the variable originals in `assets/source/fonts/`: each is subset to the characters the built pages set in it and instanced to the weights and optical sizes the stylesheet uses, then served as WOFF2. The results are cached in `.cache/fonts/`, so a build that doesn't change the text reuses them. Building HarfBuzz for this needs a C++ compiler. See CONTRIBUTING.md for details.

## Music library

`assets/baked/music.json` is exported from Navidrome (0.64 or later) with `cargo run -p music-export`, using the server and credentials in Blackbird's config (`~/.config/blackbird/config.toml`). See CONTRIBUTING.md for details.
