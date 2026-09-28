# paxsite

A custom SSG backed by `paxhtml`, a HTML templating library.

Use

    cargo watch -x clippy -x 'test --workspace' -x 'run -F serve' --poll

to develop. (The `--poll` flag is needed as change detection sometimes detects changes to `contents` when they're read.)

Consider turning on fast mode by adding `-- --fast` to `run -F serve` to skip a few slow steps.
This may lead to inconsistencies in the output, so this should be used with caution and only during iteration.

## Flags

- `--fast`: Skips directory cleaning and OG image generation.
