use chrono::Timelike;
use paxhtml::DefaultIn;
use paxhtml::builder::Builder;
use paxhtml::bumpalo::Bump;

#[allow(dead_code)]
pub struct IsoDateProps<'bump> {
    pub date: chrono::NaiveDate,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for IsoDateProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            date: Default::default(),
            children: None,
        }
    }
}

#[allow(non_snake_case, dead_code)]
pub fn IsoDate<'bump>(bump: &'bump Bump, props: IsoDateProps<'bump>) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    let date = props.date.to_string();
    b.time([
        b.attr(("datetime", date.as_str())),
        b.attr(("title", date.as_str())),
    ])(b.text(&date))
}

#[allow(dead_code)]
pub struct IsoDatetimeProps<'bump> {
    pub datetime: chrono::DateTime<chrono::Utc>,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for IsoDatetimeProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            datetime: Default::default(),
            children: None,
        }
    }
}

#[allow(non_snake_case, dead_code)]
pub fn IsoDatetime<'bump>(
    bump: &'bump Bump,
    props: IsoDatetimeProps<'bump>,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    b.time([
        b.attr(("datetime", props.datetime.to_rfc3339())),
        b.attr(("title", props.datetime.to_rfc2822())),
    ])(b.text(&props.datetime.with_nanosecond(0).unwrap().to_rfc3339()))
}

#[allow(dead_code)]
pub struct MonthDayDateProps<'bump> {
    pub date: String,
    pub noyear: bool,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for MonthDayDateProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            date: String::new(),
            noyear: false,
            children: None,
        }
    }
}

#[allow(non_snake_case, dead_code)]
pub fn MonthDayDate<'bump>(
    bump: &'bump Bump,
    props: MonthDayDateProps<'bump>,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    let (year, month, day) = parse_date(&props.date);
    let display = if props.noyear {
        format_date(month, day, None)
    } else {
        format_date(month, day, Some(year))
    };
    b.time([
        b.attr(("datetime", props.date.as_str())),
        b.attr(("title", props.date.as_str())),
    ])(b.text(&display))
}

#[allow(dead_code)]
pub struct MonthDayDateRangeProps<'bump> {
    pub start: String,
    pub end: String,
    pub noyear: bool,
    pub children: Option<paxhtml::Element<'bump>>,
}
impl DefaultIn<'_> for MonthDayDateRangeProps<'_> {
    fn default_in(_bump: &Bump) -> Self {
        Self {
            start: String::new(),
            end: String::new(),
            noyear: false,
            children: None,
        }
    }
}

#[allow(non_snake_case, dead_code)]
pub fn MonthDayDateRange<'bump>(
    bump: &'bump Bump,
    props: MonthDayDateRangeProps<'bump>,
) -> paxhtml::Element<'bump> {
    let b = Builder::new(bump);
    let (sy, sm, sd) = parse_date(&props.start);
    let (ey, em, ed) = parse_date(&props.end);

    let cross_year = sy != ey;
    let show_year = !props.noyear || cross_year;

    if sm == em && !cross_year {
        // Same month, same year: "November 8–12" or "November 8–12, 2025"
        let start_display = format_date(sm, sd, None);
        let end_display = if show_year {
            format!("{}, {}", ed, ey)
        } else {
            ed.to_string()
        };
        b.fragment([
            b.time([
                b.attr(("datetime", props.start.as_str())),
                b.attr(("title", props.start.as_str())),
            ])(b.text(&start_display)),
            b.text("\u{2013}"),
            b.time([
                b.attr(("datetime", props.end.as_str())),
                b.attr(("title", props.end.as_str())),
            ])(b.text(&end_display)),
        ])
    } else {
        // Different months or cross-year
        let start_year = if cross_year { Some(sy) } else { None };
        let end_year = if show_year { Some(ey) } else { None };
        let start_display = format_date(sm, sd, start_year);
        let end_display = format_date(em, ed, end_year);
        b.fragment([
            b.time([
                b.attr(("datetime", props.start.as_str())),
                b.attr(("title", props.start.as_str())),
            ])(b.text(&start_display)),
            b.text(" \u{2013} "),
            b.time([
                b.attr(("datetime", props.end.as_str())),
                b.attr(("title", props.end.as_str())),
            ])(b.text(&end_display)),
        ])
    }
}

fn parse_date(s: &str) -> (u32, u32, u32) {
    let parts: Vec<u32> = s
        .split('-')
        .map(|p| p.parse().expect("invalid date component"))
        .collect();
    (parts[0], parts[1], parts[2])
}

fn month_name(month: u32) -> &'static str {
    match month {
        1 => "January",
        2 => "February",
        3 => "March",
        4 => "April",
        5 => "May",
        6 => "June",
        7 => "July",
        8 => "August",
        9 => "September",
        10 => "October",
        11 => "November",
        12 => "December",
        _ => panic!("invalid month: {month}"),
    }
}

fn format_date(month: u32, day: u32, year: Option<u32>) -> String {
    match year {
        Some(y) => format!("{} {}, {}", month_name(month), day, y),
        None => format!("{} {}", month_name(month), day),
    }
}
