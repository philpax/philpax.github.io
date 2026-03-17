I wanted to use Jellyfin on my Steam Deck while it was docked for HTPC purposes, but found the controller wouldn't respond. It is possible to make the controller work, but note that the support is extremely basic: the D-pad doesn't work (all navigation is through the left stick), and it's generally not a very responsive experience (the inputs have some latency).

<!-- more -->

- Go into Desktop Mode
- Install Jellyfin Media Player (JMP) via Flatpak (e.g. through Discover).
- Install Flatseal, open it for JMP, and add `/run/udev:ro` under Filesystem -> Other files, so that the sandbox can see your inputs
- Launch JMP and connect to your server, verify everything works, then close JMP
- In Steam, add JMP to your non-Steam games
- Return to Game Mode, and launch JMP
- Verify that your controls, as limited as they are, work as expected. You may need to explicitly enable both Gamepad Input and Fullscreen in JMP's settings.

You may want to consider using a third-party application (like Decky Loader) to add an icon/art for the JMP entry. You can also consider using Steam Input to bind the rest of the gamepad to make sure you're getting as much out of it as possible - existing custom layouts may also work for this.
