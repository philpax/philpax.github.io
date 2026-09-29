use paxhtml::{bumpalo::Bump, html};

use super::{display_date, parse_date};

pub struct PrMetaProps {
    pub date: Option<String>,
    pub start: Option<String>,
    pub end: Option<String>,
    pub add: u32,
    pub sub: u32,
    pub closed: bool,
    pub tl_id: Option<String>,
}

/// The facts that follow a pull request link in the prose: when, and how
/// much. Where the request has a row in the timeline, they link to it.
pub fn pr_meta<'bump>(bump: &'bump Bump, props: PrMetaProps) -> paxhtml::Element<'bump> {
    let date = |date: &str| {
        html! { in bump; <time datetime={date}>{display_date(parse_date(date))}</time> }
    };
    let when = match (&props.start, &props.end, &props.date) {
        (Some(start), Some(end), _) => html! { in bump;
            <>
                {date(start)}
                <span ariaHidden="true">" \u{2013} "</span>
                {date(end)}
            </>
        },
        (_, _, Some(on)) => date(on),
        _ => panic!("PrMeta requires either 'date' or 'start'+'end' attributes"),
    };

    let inner = html! { in bump;
        <>
            {when}
            ", "
            <span class="prmeta-add">{format!("+{}", props.add)}</span>
            " "
            <span class="prmeta-sub">{format!("\u{2212}{}", props.sub)}</span>
            {props.closed.then(|| html! { in bump; ", closed" })}
        </>
    };

    let body = match props.tl_id {
        Some(id) => html! { in bump;
            <a href={format!("#{id}")} title="Jump to timeline entry">{inner}</a>
        },
        None => inner,
    };

    html! { in bump;
        <span class="prmeta">"("{body}")"</span>
    }
}
