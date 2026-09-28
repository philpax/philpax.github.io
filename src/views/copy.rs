//! Every word the site's chrome uses, in one place. Mirrors the redesign's
//! `copy.ts`: anything taking a number or a name is a function, so
//! pluralisation and interpolation stay with the wording.

use crate::util;

/// Under the wordmark, heading the front page.
pub const TAGLINE: &str = "I've seen things you people wouldn't believe...";

/// Section names, used by every nav, heading and label.
pub mod nav {
    pub const HOME: &str = "Home";
    pub const BLOG: &str = "Writing";
    pub const UPDATES: &str = "Updates";
    pub const NOTES: &str = "Notes";
    pub const TAGS: &str = "Tags";
    pub const CREDITS: &str = "Credits";
}

pub mod home {
    /// The heading over a few recent posts.
    pub const RECENT_WRITING: &str = "Recent writing";
    /// The link to the rest of a section.
    pub const ALL_SHORT: &str = "All →";
    /// A section's feed, beside the link to the rest of it.
    pub const FEED: &str = "RSS";
    pub const ELSEWHERE: &str = "Elsewhere";
    /// The listening block's heading: plays over the last month when the
    /// export has them, lifetime plays when it does not.
    pub const LISTENING_RECENT: &str = "Most listened this month";
    pub const LISTENING_LIFETIME: &str = "Most played";

    pub fn plays(n: u64) -> String {
        format!("{n} plays")
    }
}

pub mod blog {
    pub const TITLE: &str = "Writing";
    pub const LEDE: &str = "slightly more thought-out pieces";
}

pub mod updates {
    pub const TITLE: &str = "Updates";
    pub const LEDE: &str = "what I've been up to";
}

pub mod tags {
    pub const TITLE: &str = "Tags";
    pub const LEDE: &str = "all tags across the 'site";

    pub fn count(n: usize) -> String {
        format!("{n} {}", super::util::pluralize("tag", n))
    }
}

pub mod tag {
    pub const ALL_TAGS: &str = "All tags →";
}

pub mod credits {
    /// Under the title, where every other page of the family has one.
    pub const LEDE: &str = "who’s to blame for this, then?";
}

/// Furniture around a document.
pub mod doc {
    pub const DRAFT: &str = "draft";
}

pub mod empty {
    pub const INDEX: &str = "nothing here yet";
    pub const TAG: &str = "nothing has this tag";
}

/// Small furniture labels: kickers, column heads, section names in margins.
pub mod labels {
    /// The first link on every page, for keyboard and screen reader users.
    pub const SKIP: &str = "Skip to content";
    pub const TAGGED: &str = "Tagged";
    pub const SUBJECTS: &str = "Subjects";
    pub const INTRODUCTION: &str = "Introduction";
}
