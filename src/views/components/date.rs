use chrono::{Datelike, NaiveDate, Timelike};
use paxhtml::{builder::Builder, bumpalo::Bump};

/// `<MonthDayDate date="2025-11-06" />` in the Markdown: `6 Nov 2025`, or
/// `6 Nov` with `noyear`.
pub fn month_day_date<'bump>(
    bump: &'bump Bump,
    date: &str,
    noyear: bool,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    let parsed = parse_date(date);
    b.time([b.attr(("datetime", date))])(b.text(&if noyear {
        day_month(parsed)
    } else {
        display_date(parsed, false)
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

/// A date as the redesign prints it, in `en-AU`'s short month names:
/// `02 Feb 2025` with `padded` days, `2 Sept 2025` without.
pub fn display_date(date: NaiveDate, padded: bool) -> String {
    let month = en_au_short_month(date.month());
    if padded {
        format!("{:02} {month} {}", date.day(), date.year())
    } else {
        format!("{} {month} {}", date.day(), date.year())
    }
}

/// A day and month with no year: `6 Nov`.
pub fn day_month(date: NaiveDate) -> String {
    format!("{} {}", date.day(), en_au_short_month(date.month()))
}

/// A month and a padded day, month first: `Nov 06`. Narrow enough to sit
/// either side of a bar.
pub fn month_day(date: NaiveDate) -> String {
    format!("{} {:02}", en_au_short_month(date.month()), date.day())
}

/// A timestamp to the minute, for a tooltip: `28 Sept 2026, 09:39 pm` (UTC).
pub fn display_timestamp(datetime: chrono::DateTime<chrono::Utc>) -> String {
    let (pm, hour) = datetime.hour12();
    format!(
        "{}, {hour:02}:{:02} {}",
        display_date(datetime.date_naive(), false),
        datetime.minute(),
        if pm { "pm" } else { "am" }
    )
}

/// Parse a `YYYY-MM-DD` date written in the Markdown.
pub fn parse_date(date: &str) -> NaiveDate {
    NaiveDate::parse_from_str(date, "%Y-%m-%d")
        .unwrap_or_else(|e| panic!("invalid date '{date}': {e}"))
}

/// `Intl.DateTimeFormat('en-AU', { month: 'short' })`, which spells out the
/// short months and writes September as "Sept".
fn en_au_short_month(month: u32) -> &'static str {
    match month {
        1 => "Jan",
        2 => "Feb",
        3 => "Mar",
        4 => "Apr",
        5 => "May",
        6 => "June",
        7 => "July",
        8 => "Aug",
        9 => "Sept",
        10 => "Oct",
        11 => "Nov",
        12 => "Dec",
        _ => panic!("invalid month: {month}"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn formats() {
        let date = NaiveDate::from_ymd_opt(2025, 9, 6).unwrap();
        assert_eq!(display_date(date, true), "06 Sept 2025");
        assert_eq!(display_date(date, false), "6 Sept 2025");
        assert_eq!(day_month(date), "6 Sept");
        assert_eq!(month_day(date), "Sept 06");
        let at = chrono::DateTime::parse_from_rfc3339("2026-09-28T21:39:00Z")
            .unwrap()
            .to_utc();
        assert_eq!(display_timestamp(at), "28 Sept 2026, 09:39 pm");
    }
}
