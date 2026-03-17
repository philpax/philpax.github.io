<https://fosdem.org/2026/schedule/event/ZT7TB9-at-the-billion-edge-social-graph/>

<!-- more -->

- Improving documentation
- Not just building higher-level abstractions, but improving the low-level documentations
- PDSes host accounts; if you don't run one, you'll end up on a Bsky-hosted PDS
  - PDS self-hosting is well documented
  - All it really has to do is host your local data
  - Also added [deploy-recipes](https://github.com/bluesky-social/deploy-recipes)
- The firehose is how you get information from the network; it is just the websocket
  - Getting the Twitter firehose was very irritating in 2020i
- Can use `websocat` to listen to the firehose
- One of the core ideas is that you can backfill the entire network with enough time and hard drive space
  - About 30 TB of space to store the Bluesky posts, but other things on the protocol are much smaller
- Dealing with older data was irritating, but `tap` makes it easier (ATProto-specific application, not the generic application)
  - Can use it to consume from the firehose
- `graze.social` is a useful way of building custom feeds
- Microcosm is an effective way of interacting with the AT Protocol
  - Constellation offers an interface for querying all of the links in the protocol - and _everything_ is a link
- pdsls
- XRPC is a thin layer over HTTPS
  - Records are stored as they're sent; there's no magic transformation
- Leaflet
- anisota
- Can mix existing lexicons with new lexicons, as anisota does
- Dan Abramov posts about ATProto / mounting posts via FUSE
- Bridgyfed connects Fediverse and ATProto
