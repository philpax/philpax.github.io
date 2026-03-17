<https://fosdem.org/2026/schedule/event/PN7WCS-decentralized_public_broadcast_with_streamplace/>

<!-- more -->

- Built:
  - Low-latency livestreaming
  - Real-time chat
  - Syndication, BitTorrent-style
  - Traditional streaming features
  - Cryptographic signing of data
- Technologies:
  - Go + Rust + C, very much enabled by Meson
- Decentralised livestream
  - What does this even mean? Bitcoin / IPFS etc make sense, but what does that mean for livestreams? They haven't happened yet, so we can't assign a content ID
  - Public signing key on ATProto, secret key in OBS; OBS doesn't support short-lived keys well, so long-lived key for now
  - Use GStreamer to split up the livestream, then sign each segment with embedded key using CCPA
  - Can pass the MP4s around and verify that you're looking at the user's original content, regardless of where you get
- Also embed segment metadata into each segment - ATProto data etc
  - C2PA supports a bunch of signature algorithms, but not ATProto's most common: SECP256K1; Streamplace wants to use that, so not exactly spec-compliant
  - Adobe wants to make it legally required to use paid certificates, among other things
  - Streamplace is working with the IPFS foundation to standardise DASL S2PA (Simple Standard for Provenance and Authenticity <https://dasl.ing>)
- Help needed:
  - Streamplace requires bframes=0 in OBS; OBS could have a preset for Streamplace some day
  - Deterministic muxing: combining the segments into a concatenated video file that preserves the signatures for each segment, and then enables demuxing that back into individual segments
- Building a video app? <https://docs.stream.place>
- Question: Why mist-server instead of nginx-rtmp etc?
  - Static linking - don't want to link all of nginx in
  - Tried media-ntx, but wasn't suitable at the time; could be made to work, maybe
- Question: How far back does the authentication go in the stack?
  - OBS doesn't have any integration for that, so Streamplace is the current source of truth
  - Very interested in adding C2PA compatibility and/or combining multiple Streamplace streams
  - Matter of instrumention / integration on the support
- Question: Why splitting into 1-second segment? Can't append + rehash and resign?
  - It's nice for syndication to be able to work with segments
  - Especially for the BitTorrent case, where you can support multiple sources for the livestream
- Question: Can anyone with the RTMP key push to the stream?
  - There's an open PR to separate out creating/publishing to separate keys, so you would only be able to stream with two keys
