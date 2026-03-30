use paxhtml::bumpalo::Bump;
use paxhtml::html;

use super::{MonthDayDate, MonthDayDateProps, MonthDayDateRange, MonthDayDateRangeProps};

pub struct PrMetaProps {
    pub date: Option<String>,
    pub start: Option<String>,
    pub end: Option<String>,
    pub add: u32,
    pub sub: u32,
    pub closed: bool,
}

pub fn pr_meta<'bump>(bump: &'bump Bump, props: PrMetaProps) -> paxhtml::Element<'bump> {
    let date_element = if let (Some(start), Some(end)) = (&props.start, &props.end) {
        MonthDayDateRange(
            bump,
            MonthDayDateRangeProps {
                start: start.clone(),
                end: end.clone(),
                noyear: true,
                short: true,
            },
        )
    } else if let Some(date) = &props.date {
        MonthDayDate(
            bump,
            MonthDayDateProps {
                date: date.clone(),
                noyear: true,
                short: true,
            },
        )
    } else {
        panic!("PrMeta requires either 'date' or 'start'+'end' attributes");
    };

    let closed_element = props.closed.then(|| {
        html! { in bump;
            <span>", closed"</span>
        }
    });

    html! { in bump;
        <span class="text-stone-500 dark:text-stone-400">
            "("
            {date_element}
            ", "
            <span class="text-emerald-700 dark:text-emerald-400">{format!("+{}", props.add)}</span>
            " "
            <span class="text-rose-700 dark:text-rose-400">{format!("-{}", props.sub)}</span>
            {closed_element}
            ")"
        </span>
    }
}
