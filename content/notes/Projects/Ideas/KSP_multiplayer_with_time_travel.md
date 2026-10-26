+++
authored_by = "GPT-6.1-Sol"
+++

## Abstract

KSP's timewarp lets players skip long stretches of simulated time. The multiplayer timewarp problem arises when one player wants to skip months of interplanetary travel while another needs real-time control for a launch or docking manoeuvre: a shared clock cannot satisfy both requests at once, but separate clocks complicate encounters and agreement on vessel state.

A Kerbal Space Program multiplayer mod could address this by letting players travel through time within one shared history. Players can launch ships, timewarp through their missions, leave vessels on unattended trajectories, and return to other points in the timeline, provided they cannot change anything already observed by another player or themselves.

<!-- more -->

## Implementation

### Observation and committed history

Whenever a player has a vessel loaded at time N, its history from the start of the timeline through N is committed, including its creation and trajectory. This applies to every loaded vessel, not just the one being piloted. The entire preceding history must be fixed: even loading a vessel halfway through its journey could perturb the simulation enough to invalidate its observed endpoint. Returning to an earlier time therefore does not make that vessel editable.

Server predictions of unattended trajectories remain provisional until a player observes them. Players can take control in a vessel's still-unobserved future, or launch new vessels from pads that are unoccupied at the chosen time, without changing committed history. There is one timeline, not alternate histories.

### Shared time bubbles and time ghosts

Players can interact live within a shared "time bubble" when everyone participating is synchronised to that bubble. Other players can view its recorded past as a time-delayed replay. In that replay, committed vessels are "time ghosts": visible and following their recorded trajectories, but impossible to collide with, dock to, control, or otherwise affect. Interaction becomes possible when participants' timelines synchronise again, without rewriting the recorded past.

Players cannot view a bubble's undetermined future. While participants are actively interacting in real time, the bubble's future and the causally affected future of its surroundings are masked. This separates history that can be replayed but not changed from outcomes that cannot yet be shown because players are still determining them.

### Server history

The server records the relevant history and reconstructs the world at any requested time, perhaps by running a copy of KSP backed by a history database. Enforcing committed history and determining the extent of future masking remain implementation questions. Existing multiplayer time-travel games, especially Achron, are worth studying for representing histories and reconciling actions across time, while retaining the observation-based constraint.

## Prior art

- [DarkMultiPlayer](https://github.com/godarklight/DarkMultiPlayer/blob/master/README.md): KSP multiplayer with subspace and master-controlled warp modes. It provides a comparison for coordinating players at different simulation times, rather than freely revisiting unobserved history.
- [LunaMultiplayer's cross-subspace vessel-control issue](https://github.com/LunaMultiplayer/LunaMultiplayer/issues/292): Reports control conflicts involving unattended vessels and players at different times. It illustrates the need to reconcile vessel state across time.
- [Achron](https://store.steampowered.com/app/109700/Achron/): A multiplayer strategy game in which players revise past actions. Its [developer interview](https://www.abc.net.au/technology/archive/articles/2011/05/27/3228611.htm) describes periodic timewaves that propagate changes forward. It is relevant implementation inspiration, but permits rewriting past outcomes rather than preserving them once observed.
