use chrono::NaiveDate;
use markdown::mdast::Node;
use paxhtml::{bumpalo::Bump, html};

use super::{display_date, month_day};
use crate::markdown::inner_text;

#[derive(Debug, Clone)]
pub struct PrEntry {
    pub url: String,
    pub title: String,
    pub project: String,
    pub start: NaiveDate,
    pub end: NaiveDate,
    pub add: u32,
    pub sub: u32,
    pub closed: bool,
}

impl PrEntry {
    pub fn anchor_id(&self) -> Option<String> {
        pr_id_from_url(&self.url)
    }
    pub fn timeline_id(&self) -> Option<String> {
        tl_id_from_url(&self.url)
    }
    pub fn duration_days(&self) -> u32 {
        ((self.end - self.start).num_days().max(0) as u32) + 1
    }
}

/// Convert a GitHub PR URL into a stable anchor id for the inline mention.
/// `https://github.com/owner/repo/pull/123` → `Some("pr-owner-repo-123")`
pub fn pr_id_from_url(url: &str) -> Option<String> {
    pr_anchor_suffix(url).map(|s| format!("pr-{s}"))
}

/// Anchor id for the timeline row corresponding to this PR.
pub fn tl_id_from_url(url: &str) -> Option<String> {
    pr_anchor_suffix(url).map(|s| format!("tl-{s}"))
}

fn pr_anchor_suffix(url: &str) -> Option<String> {
    let path = url.strip_prefix("https://github.com/")?;
    let mut parts = path.split('/');
    let owner = parts.next()?;
    let repo = parts.next()?;
    if parts.next()? != "pull" {
        return None;
    }
    let number_part = parts.next()?;
    let number: String = number_part
        .chars()
        .take_while(|c| c.is_ascii_digit())
        .collect();
    if number.is_empty() {
        return None;
    }
    Some(format!("{owner}-{repo}-{number}"))
}

/// Walk an mdast tree and collect every Link followed by a `<PrMeta>` HTML node, tagged
/// by the most recent `# heading` for project context.
pub fn collect_pr_entries(bump: &Bump, root: &Node) -> Vec<PrEntry> {
    let mut entries = Vec::new();
    let mut current_project = String::new();
    walk(bump, root, &mut current_project, &mut entries);
    entries
}

/// Every pull request the document mentions, on one timeline: a bar per
/// request across the span the work covered, its dates and diff either side,
/// and the project and title at the end. A row links to the mention in the
/// prose, and the mention's own dates link back here.
pub fn pr_timeline<'bump>(bump: &'bump Bump, entries: &[PrEntry]) -> paxhtml::Element<'bump> {
    if entries.is_empty() {
        return paxhtml::Element::Empty;
    }

    let mut sorted: Vec<&PrEntry> = entries.iter().collect();
    sorted.sort_by_key(|e| (e.start, e.end));

    let timeline_start = sorted.first().unwrap().start;
    let timeline_end = sorted.iter().map(|e| e.end).max().unwrap();
    let total_days = ((timeline_end - timeline_start).num_days() as u32) + 1;

    // The tally counts what landed: a closed request contributed no lines.
    let merged: Vec<&PrEntry> = entries.iter().filter(|e| !e.closed).collect();
    let closed = entries.len() - merged.len();
    let total_add: u64 = merged.iter().map(|e| e.add as u64).sum();
    let total_sub: u64 = merged.iter().map(|e| e.sub as u64).sum();

    let rows = sorted
        .iter()
        .map(|e| pr_row(bump, e, timeline_start, total_days));

    html! { in bump;
        <figure class="timeline">
            <figcaption>
                {format!("timeline \u{b7} {} pull requests \u{b7} ", entries.len())}
                <span class="timeline-add">{format!("+{total_add}")}</span>
                " "
                <span class="timeline-sub">{format!("\u{2212}{total_sub}")}</span>
                {format!(" across {} merged", merged.len())}
                {(closed > 0).then(|| format!(" + {closed} closed"))}
            </figcaption>
            <div class="timeline-rows">
                #{rows}
            </div>
        </figure>
    }
}

fn walk(bump: &Bump, node: &Node, current_project: &mut String, entries: &mut Vec<PrEntry>) {
    if let Node::Heading(h) = node
        && h.depth == 1
    {
        *current_project = inner_text(node, None).trim().to_string();
    }
    if let Some(children) = node.children() {
        let mut i = 0;
        while i < children.len() {
            if let Node::Link(link) = &children[i]
                && let Some(j) = find_following_prmeta(children, i)
                && let Some(entry) = parse_pr_entry(bump, link, &children[j], current_project)
            {
                entries.push(entry);
            }
            walk(bump, &children[i], current_project, entries);
            i += 1;
        }
    }
}

/// Search forward from a Link for a `<PrMeta>` HTML node, allowing trivial inline
/// nodes between them (whitespace, footnote references).
fn find_following_prmeta(children: &[Node], start: usize) -> Option<usize> {
    let mut j = start + 1;
    while j < children.len() {
        match &children[j] {
            Node::Text(t) if t.value.chars().all(|c| c.is_whitespace()) => j += 1,
            Node::FootnoteReference(_) => j += 1,
            Node::Html(h) if h.value.trim_start().starts_with("<PrMeta") => return Some(j),
            _ => return None,
        }
    }
    None
}

fn parse_pr_entry(
    bump: &Bump,
    link: &markdown::mdast::Link,
    prmeta_node: &Node,
    current_project: &str,
) -> Option<PrEntry> {
    let Node::Html(h) = prmeta_node else {
        return None;
    };
    let element = paxhtml::parse_html(bump, h.value.trim()).ok()?;
    if element.tag() != Some("PrMeta") {
        return None;
    }

    let date = element
        .attr("date")
        .and_then(|a| a.value_as_str())
        .map(String::from);
    let start_raw = element
        .attr("start")
        .and_then(|a| a.value_as_str())
        .map(String::from);
    let end_raw = element
        .attr("end")
        .and_then(|a| a.value_as_str())
        .map(String::from);
    let add = element
        .attr("add")
        .and_then(|a| a.value.as_ref())
        .and_then(|v| v.as_int())
        .unwrap_or(0) as u32;
    let sub = element
        .attr("sub")
        .and_then(|a| a.value.as_ref())
        .and_then(|v| v.as_int())
        .unwrap_or(0) as u32;
    let closed = element.attr("closed").is_some();

    let (start, end) = match (date, start_raw, end_raw) {
        (Some(d), _, _) => {
            let d = NaiveDate::parse_from_str(&d, "%Y-%m-%d").ok()?;
            (d, d)
        }
        (None, Some(s), Some(e)) => (
            NaiveDate::parse_from_str(&s, "%Y-%m-%d").ok()?,
            NaiveDate::parse_from_str(&e, "%Y-%m-%d").ok()?,
        ),
        _ => return None,
    };

    pr_anchor_suffix(&link.url)?;

    let title_node = Node::Link(link.clone());
    let title = inner_text(&title_node, None).trim().to_string();

    Some(PrEntry {
        url: link.url.clone(),
        title,
        project: current_project.to_string(),
        start,
        end,
        add,
        sub,
        closed,
    })
}

fn pr_row<'bump>(
    bump: &'bump Bump,
    e: &PrEntry,
    t_start: NaiveDate,
    total_days: u32,
) -> paxhtml::Element<'bump> {
    let day_offset = (e.start - t_start).num_days() as u32;
    let span = e.duration_days();
    let left_pct = (day_offset as f32 / total_days as f32) * 100.0;
    let width_pct = ((span as f32 / total_days as f32) * 100.0).max(0.8);

    let href = format!(
        "#{}",
        e.anchor_id().expect("PR entry should have anchor id")
    );
    let timeline_id = e.timeline_id().expect("PR entry should have timeline id");

    let dates = if e.start == e.end {
        display_date(e.start, true)
    } else {
        format!(
            "{} \u{2192} {}",
            display_date(e.start, true),
            display_date(e.end, true)
        )
    };
    let title_attr = format!(
        "{}: {} ({dates}, +{}, \u{2212}{}{})",
        e.project,
        e.title,
        e.add,
        e.sub,
        if e.closed { ", closed" } else { "" }
    );
    let closed = e
        .closed
        .then(|| paxhtml::Attribute::new(bump, "data-closed", "true"));

    html! { in bump;
        <a id={timeline_id} href={href} class="timeline-row" title={title_attr} {closed}>
            <time class="timeline-date" datetime={e.start.to_string()}>{month_day(e.start)}</time>
            <span class="timeline-track" ariaHidden="true">
                <span style={format!("left: {left_pct:.2}%; width: {width_pct:.2}%;")}></span>
            </span>
            <time class="timeline-date" datetime={e.end.to_string()}>{month_day(e.end)}</time>
            <span class="timeline-add">{format!("+{}", e.add)}</span>
            <span class="timeline-sub">{format!("\u{2212}{}", e.sub)}</span>
            <span class="timeline-title">
                <span class="timeline-project">{format!("{}: ", e.project)}</span>
                {e.title.clone()}
            </span>
        </a>
    }
}
