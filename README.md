# paxsite

Use

    cargo watch -x clippy -x 'test --workspace' -x 'run -F development' --poll

to develop. (The `--poll` flag is needed as change detection sometimes detects changes to `contents` when they're read.)