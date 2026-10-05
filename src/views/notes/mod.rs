//! The notes section: a rail beside every note, doubling as the index. The tree and
//! (on narrow pages) the rail itself open and close without script, via checkboxes;
//! script adds the filter and note ages.

use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    content::{DocumentFolderNode, DocumentId, DocumentLeafNode, DocumentNode},
    views::{
        components::display_timestamp,
        document::{self, Body},
    },
};

pub fn note<'a>(context: ViewContext<'a>, note: &Document) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let is_index = note.id.is_empty();
    let title = note.metadata.title.clone();

    let description = if note.rest_of_content.is_none() {
        panic!(
            "Can't extract description; no rest of content for {:?}",
            note.id
        )
    } else {
        crate::markdown::plain_text(&note.description)
    };

    let og_image_url = format!("{}{}", context.website_base_url, note.og_image_path());

    let body = Body::new(context, note);
    let rail = rail(context, note, body.toc.clone());
    let main = if is_index {
        // The section's introduction, beside the rail.
        html! { in bump;
            <article class="document-content">
                {document::head(context, note)}
                <div class="notes-intro">{body.into_prose(bump)}</div>
            </article>
        }
    } else {
        document::article(context, note, body)
    };

    layout(
        context,
        SocialMeta {
            title: Some(title),
            description: Some(description),
            image: Some(og_image_url.clone()),
            url: Some(Route::Note { note_id: vec![] }.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: Some("summary_large_image".to_string()),
            twitter_image: Some(og_image_url),
            article_modified_time: note.metadata.datetime,
            ..Default::default()
        },
        CurrentPage::Notes,
        html! { in bump;
            <div class="frame notes-layout">
                {rail}
                {main}
            </div>
        },
    )
}

// --- Private implementation details ---

/// The rail: index link, narrow-page toggle, filter, tree and the note's contents.
fn rail<'a>(context: ViewContext<'a>, current: &Document, toc: Option<Element<'a>>) -> Element<'a> {
    let bump = context.bump;
    let tree = branches(&context.content.notes.documents, &[]);
    // A page standing in for the index (`<NotesIndex />`) has the tree open, so narrow pages still list notes.
    let open = indexes_notes(current).then(|| paxhtml::Attribute::boolean(bump, "checked"));
    html! { in bump;
        <nav ariaLabel={CurrentPage::Notes.name()} class="notes-rail stack">
            <div class="rail-heading">
                <A href={CurrentPage::Notes.url_path()}>"Index"</A>
            </div>

            // Narrow pages only; the tree folds behind it.
            <input r#type="checkbox" id="rail-toggle" class="rail-toggle-box sr-only" autocomplete="off" {open} />
            <label r#for="rail-toggle" class="rail-toggle">"Index"</label>

            <div id="notes-tree" class="rail-tree stack">
                // Needs script, which reveals it.
                <label hidden>
                    <span class="sr-only">"Filter notes by title or section"</span>
                    <input r#type="search" placeholder="title or section" class="rail-search" />
                </label>
                {level(bump, &tree, &current.id)}
                // Shown when the filter matches nothing.
                <p class="rail-empty" role="status" hidden>"nothing by that name"</p>
            </div>

            {toc.map(|toc| html! { in bump;
                <div class="notes-rail-toc">
                    // Not a heading: the rail precedes the page's h1.
                    <p class="aside-heading">{document::CONTENTS}</p>
                    {toc}
                </div>
            })}
        </nav>
    }
}

/// Whether a note contains `<NotesIndex />`.
fn indexes_notes(document: &Document) -> bool {
    [
        Some(document.description_raw.as_str()),
        document.rest_of_content_raw.as_deref(),
    ]
    .into_iter()
    .flatten()
    .any(|raw| raw.contains("<NotesIndex"))
}

/// A rail row: a note, or a folder that may have its own page.
struct Branch {
    /// Ids of notes beneath a folder start with this; a note's is its id.
    path: DocumentId,
    label: String,
    route: Option<String>,
    /// Last touch of this note, or of the freshest note under this folder.
    at: Option<chrono::DateTime<chrono::Utc>>,
    children: Vec<Branch>,
}

/// A folder's children as branches: folders first, then notes, each by name.
/// A folder holding only its own page is a note.
fn branches(folder: &DocumentFolderNode, path: &[String]) -> Vec<Branch> {
    let mut branches: Vec<Branch> = folder
        .children
        .values()
        .filter_map(|node| match node {
            DocumentNode::Folder(f) if f.is_leaf() => match f.index.as_ref()? {
                DocumentLeafNode::Document(d) => Some(leaf(d)),
                DocumentLeafNode::Redirect(_) => None,
            },
            DocumentNode::Folder(f) => {
                if !f.has_visible_content() {
                    return None;
                }
                let path: DocumentId = path
                    .iter()
                    .cloned()
                    .chain([crate::util::slugify(&f.folder_name)])
                    .collect();
                let route = match &f.index {
                    Some(DocumentLeafNode::Document(d)) => Some(d.route_path().url_path()),
                    _ => None,
                };
                Some(Branch {
                    label: f.folder_name.clone(),
                    route,
                    at: f.all_documents().into_iter().filter_map(touched).max(),
                    children: branches(f, &path),
                    path,
                })
            }
            DocumentNode::Leaf(DocumentLeafNode::Document(d)) => Some(leaf(d)),
            DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => None,
        })
        .filter(|b| !b.label.trim().is_empty())
        .collect();
    branches.sort_by_cached_key(|b| (b.children.is_empty(), b.label.to_lowercase()));
    branches
}

fn leaf(document: &Document) -> Branch {
    Branch {
        path: document.id.clone(),
        label: document.metadata.title.clone(),
        route: Some(document.route_path().url_path()),
        at: touched(document),
        children: vec![],
    }
}

/// When a note was last touched.
fn touched(document: &Document) -> Option<chrono::DateTime<chrono::Utc>> {
    document
        .metadata
        .last_modified
        .or(document.metadata.datetime)
}

/// One level of the tree. Folders open via the checkbox before them (the label is the
/// chevron); folders leading to the current note start open.
fn level<'a>(bump: &'a Bump, branches: &[Branch], current: &DocumentId) -> Element<'a> {
    html! { in bump;
        <ul class="notes-level stack">
            #{branches.iter().map(|branch| {
                let is_current = branch.route.is_some() && branch.path == *current;
                let folder = !branch.children.is_empty();
                let id = format!("rail-{}", branch.path.join("/"));
                let open = current.starts_with(&branch.path);
                let row = match &branch.route {
                    Some(route) => html! { in bump;
                        <A href={route.clone()} class={"rail-row".to_string()} current={is_current}>
                            {row_inner(bump, branch)}
                        </A>
                    },
                    None => html! { in bump;
                        <label r#for={id.clone()} class="rail-row">{row_inner(bump, branch)}</label>
                    },
                };
                html! { in bump;
                    <li>
                        {folder.then(|| {
                            let checked = open.then(|| paxhtml::Attribute::boolean(bump, "checked"));
                            html! { in bump;
                                <input r#type="checkbox" id={id.clone()} class="rail-branch sr-only" autocomplete="off" {checked} />
                            }
                        })}
                        <div class="rail-row-wrap">
                            // Two controls: the chevron opens the branch, the row opens the page.
                            {folder.then(|| html! { in bump;
                                <label r#for={id.clone()} class="rail-chevron">
                                    <span class="sr-only">{branch.label.clone()}</span>
                                </label>
                            })}
                            {row}
                        </div>
                        {folder.then(|| level(bump, &branch.children, current))}
                    </li>
                }
            })}
        </ul>
    }
}

/// A row's name and age. The age is written as a month, which script turns into a
/// relative time; the full time is the tooltip.
fn row_inner<'a>(bump: &'a Bump, branch: &Branch) -> Element<'a> {
    let age = match branch.at {
        Some(at) => html! { in bump;
            <time datetime={at.to_rfc3339()} title={display_timestamp(at)} class="rail-age">
                {at.format("%Y-%m").to_string()}
            </time>
        },
        None => html! { in bump; <span></span> },
    };
    html! { in bump;
        <>
            <span class="rail-row-label">{branch.label.clone()}</span>
            {age}
        </>
    }
}
