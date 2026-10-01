//! All the site chrome's wording. Mirrors `copy.ts`; anything taking a number or name
//! is a function, so pluralisation stays with the wording.

use crate::util;

/// Under the wordmark on the front page.
pub const TAGLINE: &str = "I've seen things you people wouldn't believe...";

/// Section names.
pub mod nav {
    pub const HOME: &str = "Home";
    pub const BLOG: &str = "Writing";
    pub const UPDATES: &str = "Updates";
    pub const NOTES: &str = "Notes";
    pub const TAGS: &str = "Tags";
    pub const CREDITS: &str = "Credits";
}

pub mod home {
    /// Heading over recent posts.
    pub const RECENT_WRITING: &str = "Recent writing";
    /// Link to the rest of a section.
    pub const ALL_SHORT: &str = "All →";
    /// A section's feed link.
    pub const FEED: &str = "RSS";
    pub const ELSEWHERE: &str = "Elsewhere";
    /// Listening block heading: last month's plays, or lifetime plays if the export has none.
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
    /// Under the title.
    pub const LEDE: &str = "who’s to blame for this, then?";
}

pub mod not_found {
    pub const TITLE: &str = "The right man in the wrong place…";
    /// Under the title, finishing its sentence.
    pub const LEDE: &str =
        "can make all the difference in the world. But not this world. Alas, there’s nothing here.";
    /// Link home.
    pub const HOME_LINK: &str = "Back to the front page";
}

pub mod notes {
    pub const TITLE: &str = "Notes";
    /// Placeholder for the notes rail filter.
    pub const FILTER_PLACEHOLDER: &str = "title or section";
    /// The filter's accessible name.
    pub const FILTER_DESCRIPTION: &str = "Filter notes by title or section";
    /// Shown when the filter matches nothing.
    pub const FILTER_EMPTY: &str = "nothing by that name";
}

/// Labels around a document.
pub mod doc {
    pub const CONTENTS: &str = "Contents";
    pub const DRAFT: &str = "draft";

    pub fn words(n: usize) -> String {
        format!("{} words", super::util::number_to_comma_separated_string(n))
    }
}

pub mod empty {
    pub const INDEX: &str = "nothing here yet";
    pub const TAG: &str = "nothing has this tag";
}

/// Small labels: kickers, column heads, margin section names.
pub mod labels {
    /// First link on every page, for keyboard and screen reader users.
    pub const SKIP: &str = "Skip to content";
    pub const INDEX: &str = "Index";
    pub const TAGGED: &str = "Tagged";
    pub const SUBJECTS: &str = "Subjects";
    pub const INTRODUCTION: &str = "Introduction";
}
