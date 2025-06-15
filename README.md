# paxsite

A custom SSG backed by `paxhtml`, a HTML templating library.

Use

    cargo watch -x clippy -x 'test --workspace' -x 'run -F serve' --poll

to develop. (The `--poll` flag is needed as change detection sometimes detects changes to `contents` when they're read.)

Consider turning on fast mode by adding `-- --fast` to `run -F serve` to skip a few slow steps (including verifying the Tailwind version matches).
This may lead to inconsistencies in the output, so this should be used with caution and only during iteration.

If the downloaded Tailwind installation doesn't work (this can happen with macOS ARM64 for reasons that are unclear to me), install a global version of Tailwind (e.g. `brew install tailwindcss`) and use `-- --use-global-tailwind`.

## Flags

- `--fast`: Skips directory cleaning and Tailwind version checking.
- `--use-global-tailwind`: Uses a global `tailwindcss` instead of downloading one.
