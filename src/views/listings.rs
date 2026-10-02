//! Pieces shared by the indexes, tag pages and front page: page heads, index rows,
//! summaries and dated one-line rows.

use std::collections::HashSet;

use chrono::Datelike;
use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    content::{DocumentId, DocumentType},
    markdown::MarkdownConverter,
    views::components::{TagList, TagListProps},
};

/// Whether a post or update appears in the indexes and on the front page: drafts only do
/// in draft builds, where their rows say so.
pub fn listed(doc: &Document) -> bool {
    cfg!(feature = "draft") || !doc.metadata.draft
}

/// The heading that opens every index, tag page and plain page.
pub fn page_head<'a>(bump: &'a Bump, title: Element<'a>, lede: Option<Element<'a>>) -> Element<'a> {
    html! { in bump;
        <header class="page-head">
            <h1>{title}</h1>
            {lede.map(|lede| html! { in bump; <p>{lede}</p> })}
        </header>
    }
}

/// An index row: a margin label, entries in the column.
pub fn index_row<'a>(
    bump: &'a Bump,
    label: Element<'a>,
    note: Option<Element<'a>>,
    children: Element<'a>,
) -> Element<'a> {
    html! { in bump;
        <section class="index-row">
            <header>
                <h2>{label}</h2>
                {note.map(|note| html! { in bump; <p>{note}</p> })}
            </header>
            <div>{children}</div>
        </section>
    }
}

/// Posts or updates grouped into index rows by year, newest first.
pub fn year_groups<'a>(context: ViewContext<'a>, documents: &[&Document]) -> Element<'a> {
    let bump = context.bump;
    let mut years: Vec<i32> = vec![];
    for doc in documents {
        let year = datetime(doc).year();
        if !years.contains(&year) {
            years.push(year);
        }
    }
    html! { in bump;
        <div class="index-groups">
            #{years.into_iter().map(|year| {
                let group = documents.iter().filter(|d| datetime(d).year() == year);
                index_row(
                    bump,
                    html! { in bump; {year.to_string()} },
                    None,
                    summary_list(context, group.copied(), "8"),
                )
            })}
        </div>
    }
}

/// A column of summaries, `step` apart on the spacing scale.
pub fn summary_list<'a, 'd>(
    context: ViewContext<'a>,
    documents: impl Iterator<Item = &'d Document>,
    step: &str,
) -> Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <ul class="stack" style={gap(step)}>
            #{documents.map(|doc| html! { in bump; <li>{summary(context, doc)}</li> })}
        </ul>
    }
}

/// A post or update: title, date, tags and summary.
pub fn summary<'a>(context: ViewContext<'a>, doc: &Document) -> Element<'a> {
    let bump = context.bump;
    let url = doc.route_path().url_path();
    let tags = doc.tags().cloned().unwrap_or_default();
    let short = doc
        .metadata
        .short
        .as_deref()
        .map(|short| inline_markdown(context, short, &url));
    html! { in bump;
        <article class="summary">
            <h3>
                <A href={url.clone()}>
                    <span>{inline_markdown(context, &doc.metadata.title, &url)}</span>
                </A>
                {doc.metadata.draft.then(|| html! { in bump; <em>{copy::doc::DRAFT}</em> })}
            </h3>
            // Only the tag list scrolls, so the date stays put.
            <div class="summary-meta">
                {time(bump, doc)}
                <TagList tags={tags} />
            </div>
            {short.map(|short| html! { in bump; <p>{short}</p> })}
        </article>
    }
}

/// Dated one-liners for updates and notes. A note's parent folders stack under its title.
pub fn dated_list<'a>(context: ViewContext<'a>, documents: &[&Document]) -> Element<'a> {
    let bump = context.bump;
    let note_ids = note_ids(context);
    html! { in bump;
        <ul class="stack" style={gap("2-5")}>
            #{documents.iter().map(|doc| {
                let folders = folders(doc, &note_ids);
                html! { in bump;
                    <li class="dated-row">
                        {time(bump, doc)}
                        <span class="dated-entry">
                            <A href={doc.route_path().url_path()}>{doc.metadata.title.clone()}</A>
                            {doc.metadata.draft.then(|| html! { in bump; <em>{copy::doc::DRAFT}</em> })}
                            {(!folders.is_empty()).then(|| dated_path(bump, folders))}
                        </span>
                    </li>
                }
            })}
        </ul>
    }
}

/// A note's parent folders by name, with each one's page route if it has one.
pub fn note_folders(context: ViewContext<'_>, doc: &Document) -> Vec<(String, Option<String>)> {
    folders(doc, &note_ids(context))
}

/// A `.stack`'s gap, from the spacing scale.
pub fn gap(step: &str) -> String {
    format!("--stack: var(--s-{step})")
}

/// A line of Markdown rendered inline, without a paragraph: titles, summaries, tag descriptions.
pub fn inline_markdown<'a>(
    context: ViewContext<'a>,
    markdown: &str,
    error_context: &str,
) -> Element<'a> {
    MarkdownConverter::new(context, error_context)
        .without_blocking_elements()
        .convert(&crate::content::parse_markdown(markdown), None)
}

// --- Private implementation details ---

fn datetime(doc: &Document) -> chrono::DateTime<chrono::Utc> {
    doc.metadata
        .datetime
        .unwrap_or_else(|| panic!("No datetime for {doc}"))
}

/// Publish date of a post or update, or a note's last touch.
fn time<'a>(bump: &'a Bump, doc: &Document) -> Element<'a> {
    let when = match doc.document_type {
        DocumentType::Note => doc.metadata.last_modified.unwrap_or_else(|| datetime(doc)),
        _ => datetime(doc),
    };
    html! { in bump;
        <time datetime={when.to_rfc3339()}>{display_date(when.date_naive())}</time>
    }
}

/// Every note's id.
fn note_ids<'a>(context: ViewContext<'a>) -> HashSet<&'a DocumentId> {
    context
        .content
        .notes
        .documents
        .all_documents()
        .into_iter()
        .map(|d| &d.id)
        .collect()
}

/// A note's parent folders by name, with each one's page route.
fn folders(doc: &Document, note_ids: &HashSet<&DocumentId>) -> Vec<(String, Option<String>)> {
    if doc.document_type != DocumentType::Note {
        return vec![];
    }
    let depth = doc.display_path.len().saturating_sub(1);
    (0..depth)
        .map(|i| {
            let id = doc.id[..=i].to_vec();
            let route = note_ids
                .contains(&id)
                .then(|| Route::Note { note_id: id }.url_path());
            (doc.display_path[i].clone(), route)
        })
        .collect()
}

fn dated_path<'a>(bump: &'a Bump, folders: Vec<(String, Option<String>)>) -> Element<'a> {
    html! { in bump;
        <span class="dated-path">
            #{folders.into_iter().enumerate().map(|(i, (name, route))| html! { in bump;
                <>
                    {(i > 0).then(|| html! { in bump; <span ariaHidden="true">"·"</span> })}
                    {match route {
                        Some(route) => html! { in bump; <A href={route}>{name}</A> },
                        None => html! { in bump; <span>{name}</span> },
                    }}
                </>
            })}
        </span>
    }
}
