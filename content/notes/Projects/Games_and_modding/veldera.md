+++
[taxonomies]
tags = ["veldera"]
+++

[veldera](https://github.com/philpax/veldera) is an "Earth game engine", built atop Bevy, that uses Google Earth's 3D data as the game world. On top of this, it layers [Avian Physics](https://github.com/avianphysics/avian), atmospheric rendering, and a basic climate simulation. It is very cool to play with, but the project's currently paused for reasons explained below.

<!-- more -->

The Google Earth data comes from a Rust port and library conversion of [earth-reverse-engineering](https://github.com/retroplasma/earth-reverse-engineering), facilitating its use in other applications.

The fundamental problem with using this data is that it's processed photogrammetry data, and is thus full of inconsistencies, holes, and weird geometry. These are very undesirable for a game world - nobody loves falling through the literal Earth - and complicate its use for anything complex.

As an example, at the time of pausing, I had ground vehicles implemented, but I simply could not get them to work consistently on the terrain and roads: the computed colliders were simply too uneven to enable smooth driving. I iterated on collider construction for weeks, trying to find ways to smooth out local artefacts using surrounding data, and even resorted to using OSM roads to reshape the colliders on the fly.

I couldn't really make it work, and was discouraged at the time. I suspect, however, that coming back to it after a spell - and with smarter agents - would unlock avenues that were previously inaccessible to me. I'm not ruling it out, especially with projects like [BeamNG.Earth](https://github.com/TecnaGamer/BeamNG.Earth) demonstrating the possibility of driving on _some_ form of Earth.

That said, I should point out that "game design at Earth scale" (or even "real-world scale"!) is enormously challenging. As it turns out, there's a reason why game recreations of real cities are scaled down - it's not just a production issue, it's that it is not actually fun to spend an hour driving from one end of a city to another. Another thing that's fixable with some thought, I suspect.

## Media

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mejb4c5hcc23" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3memcbrxeo22s" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3meumikn2g22n" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mmd42zf45s2h" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mmd42zfa2s2h" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mmotsqbjps2d" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mnuts76mr22s" />

<BlueskyPost post="https://bsky.app/profile/philpax.me/post/3mofzbyffck2c" />
