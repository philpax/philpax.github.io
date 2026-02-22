Extremely rough notes on how I set up my dual-boot for Windows 11 and NixOS.

<!-- more -->

I'm avoiding `winget` and `scoop` etc because they often do not offer you installation options, and I'm still traumatised from installing an editor and realising that the "Open in Editor" option wasn't added to my right-click menu.

- Produce a Ventoy USB with both Windows 11 and NixOS.
	- After placing the ISOs on the Ventoy partition, generate an auto-attend XML file with <https://schneegans.de/windows/unattend-generator/>. This can be used to debloat out of the box.
		- Here's [mine](./autounattend_win11.xml).
		- Use the Ventoy web configurator to create an autoinstall profile for Windows 11 that uses the very same autoattend.
- Partition the drive with a generous EFI partition and a _very_ generous Windows partition using diskpart in the installer after Shift+F10, leaving the remaining space for the Linux install.
```powershell
diskpart
select disk 0
clean
convert gpt
create partition efi size=2048
format fs=fat32 quick label="EFI"
create partition msr size=16
create partition primary size=1048576
format fs=ntfs quick label="Windows"
exit
```
- Install Windows, going through the usual gauntlet.
	- Open Edge, download Firefox, install Firefox, unpin Edge. Copy over profile.
	- Install latest graphics drivers 
	- Install Tailscale, Discord, Steam, Virtual Desktop Streamer
	- Turn on the BIOS-time-is-UTC setting for Windows: <https://gist.github.com/elreydetoda/d53e11fc0dfc8a017fca549a2347560c>
	- Turn the guest-SMB-share-access option on: <https://gist.github.com/omergorur/369abc366fc7579c566a4a1f2010ec43>
- Install NixOS in the remaining space.
	- Partition the remaining space with `btrfs`.
	- Using manual partitioning in the installer, mark the existing EFI partition as `/boot`, then set the newly created partition to `/`.
	- Install a graphical NixOS installation.
- Reboot into both operating systems and confirm you haven't broken them.
- Reboot into NixOS, copy config over, apply it, hope for the best.
