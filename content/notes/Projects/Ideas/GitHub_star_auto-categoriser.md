*Drafted by GLM-5.3-Flash.*

## Abstract

A local CLI that turns hundreds of GitHub stars into a browsable taxonomy: it backs up your stars, embeds each starred repo's README, languages, and metadata, flat-clusters the embeddings, and uses an LLM to name the clusters and sort stragglers. GitHub's own star lists support arbitrary collections, but filling them by hand for hundreds of repos is a chore; this categorises the backlog and stays on call for re-runs whenever new stars accumulate.

<!-- more -->

## Implementation

The pipeline is a local CLI, run on demand with no scheduling or service: pull stars, fetch README plus language breakdown and metadata per repo (first commits and file tree as a fallback for empty READMEs), embed locally or via a cheap embedding API, cluster flat, and present the proposed lists. Approval is the workflow, not an add-on: the tool shows the clusters, you name or rename them and confirm which repos belong where, and only then does it write back — creating lists and assigning stars through the GraphQL API (`createUserList`, `updateUserListsForItem`, the latter being replace-not-append, so assignments require read-modify-write). Nothing runs automatically; the user simply re-runs it when the backlog grows, and re-running can re-cluster the whole set or just a chosen cluster at higher K to split a category that proved too coarse.

Embedding-driven clustering is the point of the design: the taxonomy grows out of what is actually starred rather than being LLM-invented from fixed category names, which keeps categories grounded and handles the long tail of niche repos. Signals are README front matter, language breakdown, and metadata (topics, description, stars), with source-level fallback for README-less repos.

## Prior art

- [gh-stars-organizer](https://github.com/vins13pattar/gh-stars-organizer): fetches stars, LLM-classifies, builds embedding search, and writes GitHub Lists — the full pipeline, but its taxonomy is LLM-classified into preset categories rather than derived from embedding clusters, and it has no approval gate.
- [gh-stars-classifier-skill](https://github.com/catuscio/gh-stars-classifier-skill): an agent skill whose LLM proposes a taxonomy and writes assignments after approval — the same approval loop, but purely LLM-judgment with no embeddings.
- [Startidy](https://github.com/hellosunghyun/Startidy): Gemini analyzes titles, descriptions, and READMEs into a fixed `Major: Minor` category shape; no clustering, no approval gate.
- [starman](https://github.com/morehao/starman): batch AI analysis with summaries, tags, keyword-assisted categories, and embeddings for local semantic search — no GitHub Lists write-back.
- [ghs](https://github.com/webpolis/ghs): README embeddings for semantic search over stars, no clustering or write-back.
- [astral](https://github.com/astralapp/astral): the manual-organiser baseline — tags, filters, no AI.
- GitHub's [GraphQL UserList API](https://docs.github.com/en/graphql/reference/users) (`User.lists`, `createUserList`, `updateUserList`, `updateUserListsForItem`) is the write path; the REST starring API has no list endpoints, and GitHub's own UI offers no auto-categorisation beyond [suggested list names](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars).
