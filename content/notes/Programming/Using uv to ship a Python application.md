Recently, as part of [some](https://github.com/Wayfarer-Labs/owl-control/pull/53) [work](https://github.com/Wayfarer-Labs/owl-control/pull/55) I did on Wayfarer Labs' OWL Control, I had to figure out how to wire up Astral's `uv` to consistently ship a self-enclosed Python + environment to run Python code on a user's machine. Here's some documentation on that.

<!-- more -->

Before I continue, there are two things I should say:

- please don't use Python for this if you can, at all, avoid it. In fact, just [don't use Python](/notes/programming/reasons-i-do-not-like-python/).
- check [this issue](https://github.com/astral-sh/uv/issues/5802) first; it is possible that by the time you've read this, `uv` has already shipped a first-class solution for this

Anyway, you must first get `uv`, your codebase, its `pyproject.toml`, and its `uv.lock` to the user's machine. An installer will do for this.

Once there, invoke `uv sync` with these environment variables:

```sh
# Do not attempt to update the dependencies
UV_FROZEN='1'
# Always copy deps do not hardlink
UV_LINK_MODE='copy'
# Do not let the user's configuration interfere with our uv
UV_NO_CONFIG='1'
# Mark all dependencies as non-editable
UV_NO_EDITABLE='1'
# Ensure we always use our managed Python
UV_MANAGED_PYTHON='1'
# Update all directories
UV_CACHE_DIR='./.uv/cache'
UV_PYTHON_INSTALL_DIR='./.uv/python_install'
UV_PYTHON_BIN_DIR='./.uv/python_bin'
UV_TOOL_DIR='./.uv/tool'
UV_TOOL_BIN_DIR='./.uv/tool_bin'
```

This will force `uv` to work locally within a `.uv` folder and not pollute / interfere with any existing Python / `uv` installations the user may have.

Once `uv sync` is done, all dependencies have been installed, which means you can then run your script with `uv run` (again, with the same environment variables).

I chose to keep these steps separate so that some form of progress could be shown to the user, but you can also just skip the `uv sync` step entirely if you're OK with `uv run` taking some arbitrary time before it runs your code.

Anyway, I beseech you: please don't ship Python to users' machines. It's no good at it.
