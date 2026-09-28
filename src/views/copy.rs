//! Every word the site's chrome uses, in one place. Mirrors the redesign's
//! `copy.ts`: anything taking a number or a name is a function, so
//! pluralisation and interpolation stay with the wording.

/// Section names, used by every nav, heading and label.
pub mod nav {
    pub const HOME: &str = "Home";
    pub const BLOG: &str = "Writing";
    pub const UPDATES: &str = "Updates";
    pub const NOTES: &str = "Notes";
    pub const TAGS: &str = "Tags";
    pub const CREDITS: &str = "Credits";
}

/// Small furniture labels: kickers, column heads, section names in margins.
pub mod labels {
    /// The first link on every page, for keyboard and screen reader users.
    pub const SKIP: &str = "Skip to content";
}
