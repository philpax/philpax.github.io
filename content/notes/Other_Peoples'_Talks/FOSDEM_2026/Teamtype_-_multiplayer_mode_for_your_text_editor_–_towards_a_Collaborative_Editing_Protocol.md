<https://fosdem.org/2026/schedule/event/CQHN8T-teamtype-towards-a-collaborative-editing-protocol/>

<!-- more -->

- Two parts:
  - Tool we've built over the last two years
  - Pitching on what you can do
- Inspired by etherpad
- Also wanted to code together, but wanted to avoid being bound to one editor
- TeamType is an open-source tool + protocol for editing local files together
- AGPLv3
- Funded by NLnet and Prototype Fund; used to be called EtherSync
- Demo works as expected
- Need to avoid the NxM problem somehow; want to dsomething like what the LSP did for langugae support/DAP/MCP
- Would be really nice to have a collaborative editing protocol
- What is the technical foundation for this?
  - Already have something similar for TeamType
  - Custom JSON-RPC protocol
    - Current prototype
    - Sending open/close/edits over protocol
    - Based on operational transforms; the editor does not do much work, the daemon does all of the work
    - Currently several implementations
  - Inspired by LSP
  - Maybe Braid, HTTP?
  - Please reach out if more ideas available
- Live-preview sync with Hedgedoc is possible
- Open problems:
  - Undo
  - IDE-initiated connections
  - Notifying an editor of file deletion
- Theoretically possible to use LSP, but it's really not intended for this
- Braid: WIP standard for sync over HTTP
