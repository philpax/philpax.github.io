I'm a hobbyist photographer, and over the last decade and a half, I've taken tens of thousands of photos across a variety of devices (including dedicated cameras, smartphones, and more). I've been moving these between computers in a single folder, roughly and messily categorised with nested folders.

Unfortunately, this system doesn't allow for easy look-up or viewing, and after being frustrated one too many times, I decided to set up my own personal local photo gallery, and I'm disappointed I didn't do it earlier. This is a brief overview of my setup.

<!-- more -->

First, I moved all of my photos (~1TB) to a NVMe SSD within my [home server](https://philpax.me/notes/hardware/server/). I initially had them located on a hard drive, but the performance was unacceptable, especially for larger RAWs (which can approach 100MB). I then did some manual de-duplication, and organised the imagery into several high-level categories:

- _Family Photos_: photos that I didn't personally take, but inherited from my family's photo collection
- _Games_: in-game photography / screenshots. There's some degree of disagreement over whether these should be classified as "photos", but I'm leaning towards "yes"; they serve as memories of things that happened and/or imagery that I purposely composed to achieve some desired effect.
- _Highlights_: Processed / edited / curated photos. I've manually maintained this over the years, but it's messy in its own way: I don't really have a consistent categorisation system (I have both years and subjects as a high-level organisational scheme), and there's no easy way to connect them to the raw images from which they originate. I'd like to fix this at some point, somehow.
- _iCloud_: Automatically synced photos from iCloud. Will explain shortly.
- _Imported_: The main bulk of my photo collection. I should have called it "Main", but I can't be bothered fixing it now. This is where the majority of my photos reside in their raw form.

This folder is the canonical source for all of my photos, except for the iCloud photos, which are automatically unidirectionally synced from iCloud. I would prefer not to rely on Apple's infrastructure, but I must admit that it's nice to have that as a secondary backup of all of my phone photos, and syncing from my phone would be a nightmare in itself.[^apple]

[^apple]: It's an Apple device. It's not meant to interoperate with anything else, especially when the other party isn't Designed By Apple&trade;.

## Immich

For viewing my photos, I use [Immich](https://immich.app/), which I'm quite happy with so far. It's responsive and works as expected; really, the only thing I could want from it is basic photo editing capability, but I can understand why that's not included.

Each of the above libraries - aside from _Family Photos_[^fpexclusion] - is included as an external library within Immich. I wanted to preserve the existing folder structure, as messy as it is, and have Immich merely collate and present the imagery, instead of importing it. I'm not ruling out a full import at some stage, but I need to make sure all of the metadata is as accurate as can be.

[^fpexclusion]: Most of these photos were not taken by me, and are missing significant metadata due to filesystem moves and historic camera weirdness. I could mend these, but I've decided to exclude them for now; my Immich photographic timeline starts in 2010, and that's good enough for now.

On top of Immich, I use [immich-stacker](https://github.com/mattdavis90/immich-stacker), which uses the Immich API to automatically stack photos that match certain regexes on a daily basis. I use this to stack my RAW images (RAW, NEF, DNG, etc) and their processed JPG images together. This will eventually be in Immich itself, but it wasn't too bad to set up, and it means that I can control the behaviour. I'd like to figure out how to stack my highlights + raw images together at some point.[^highlightstack]

[^highlightstack]: Could potentially move the highlights next to the source images with a suffix, and then stack based on that. I'm not sure immich-stacker would support this as-is - it seems to focus on one stack configuration at a time - but I'm guessing it wouldn't be that difficult to extend.

The NixOS configuration for both of these can be found [here](https://github.com/philpax/nixos-configuration/blob/main/nixos/redline/services/immich.nix).

## iCloud sync

My phone photos are automatically synced to iCloud, which acts as the canonical source of truth for them. I sync these locally to my photo library, so that I have a unified view and a backup should something happen to my iCloud account.

To do this, I use [iCloud Photos Downloader](https://github.com/icloud-photos-downloader/icloud_photos_downloader) (`icloudpd`). It runs a sync every day and copies new files into the `iCloud` directory. Immich will then pick them up. Everything seems to work quite well, but we'll see how it holds up over time.

The NixOS configuration for this can be found [here](https://github.com/philpax/nixos-configuration/blob/main/nixos/redline/services/icloud-sync.nix).

## Cleanup

I discovered, to some horror, that a not-inconsiderable amount of my older photos were missing metadata for when they were taken. As it turns out, this information was being stored in their Date Created/Modified date, which had been reset in the last bulk move I did (serves me right for not using `rsync` at the time...)

The first step in fixing this was to go through and remove the non-photos that were polluting my collection. When I imported music into my early-2010s smartphones, they came with album art; when I exported the photos from said smartphones, said album art was carried across. I manually went through and deleted all of these, as well as thumbnails, screenshots, and things of that nature.

After this, I had to deal with the actual photos. Luckily, the bulk of the photos with missing timestamps had _a_ timestamp in their filename: the UNIX timestamp of when they were imported, or processed, or something. They weren't the timestamps of when the photos were taken - they were clustered too closely together for that - but they were good enough to use for a reconstruction.

The next batch of photos had no dates for when they were taken, but they _did_ have a `MetadataDate` EXIF tag; I assume those were inserted by Lightroom at some point. One `exiftool` command was able to restore these.

After this, I had to fix my Steam screenshots, which did not store any EXIF data at all. They stored the date, and a sequence number for that date, in their filenames; I used these to assign them capture dates based on their date and their position within that day's screenshots. The resulting screenshots are spread across the day, which means the timing information is completely wrong, but it's sufficient.

Finally, there's the last category, which I haven't dealt with yet. These photos are entirely missing date information, despite being captured on devices that should absolutely have included them, as evidenced by the photos chronologically _around_ them containing dates.

My plan is to assign dates to them manually for as many as I can, and then for a given year, assign dates automatically by distributing them across the "holes" between photos with dates. It's not going to be pretty - the dates are going to be even more wrong - but as long as they're in the right ballpark, it's fine.

The repository for the tools I used for the fixup can be found [here](https://github.com/philpax/photo-fixup).
