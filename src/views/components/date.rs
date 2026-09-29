use chrono::NaiveDate;
use paxhtml::{builder::Builder, bumpalo::Bump};

/// `<MonthDayDate date="2025-11-06" />` in the Markdown: `2025-11-06`, or
/// `11-06` with `noyear`.
pub fn month_day_date<'bump>(
    bump: &'bump Bump,
    date: &str,
    noyear: bool,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    let parsed = parse_date(date);
    b.time([b.attr(("datetime", date))])(b.text(&if noyear {
        month_day(parsed)
    } else {
        display_date(parsed)
    }))
}

/// `<MonthDayDateRange start="…" end="…" />` in the Markdown: two dates and a
/// dash between them.
pub fn month_day_date_range<'bump>(
    bump: &'bump Bump,
    start: &str,
    end: &str,
    noyear: bool,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    b.fragment([
        month_day_date(bump, start, noyear),
        b.span([b.attr(("aria-hidden", "true"))])(b.text(" \u{2013} ")),
        month_day_date(bump, end, noyear),
    ])
}

/// A date as the site prints it, in ISO 8601: `2025-09-06`.
pub fn display_date(date: NaiveDate) -> String {
    date.format("%Y-%m-%d").to_string()
}

/// A month and day with no year: `09-06`. Narrow enough to sit either side
/// of a bar.
pub fn month_day(date: NaiveDate) -> String {
    date.format("%m-%d").to_string()
}

/// A timestamp to the minute, for a tooltip: `2026-09-28 21:39 UTC`.
pub fn display_timestamp(datetime: chrono::DateTime<chrono::Utc>) -> String {
    datetime.format("%Y-%m-%d %H:%M UTC").to_string()
}

/// Parse a `YYYY-MM-DD` date written in the Markdown.
pub fn parse_date(date: &str) -> NaiveDate {
    NaiveDate::parse_from_str(date, "%Y-%m-%d")
        .unwrap_or_else(|e| panic!("invalid date '{date}': {e}"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn formats() {
        let date = NaiveDate::from_ymd_opt(2025, 9, 6).unwrap();
        assert_eq!(display_date(date), "2025-09-06");
        assert_eq!(month_day(date), "09-06");
        let at = chrono::DateTime::parse_from_rfc3339("2026-09-28T21:39:00Z")
            .unwrap()
            .to_utc();
        assert_eq!(display_timestamp(at), "2026-09-28 21:39 UTC");
    }
}
