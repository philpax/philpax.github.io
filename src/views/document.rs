//! One renderer for posts, updates and notes. A note differs in its breadcrumb, has no
//! kind in its meta row, and sits beside the notes rail instead of its own frame.

use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    content::DocumentType,
    markdown::{HeadingHierarchy, MarkdownConverter, document_root},
    views::{
        components::{MetadataLayout, collect_pr_entries, document_meta},
        listings::{gap, inline_markdown, note_folders},
    },
};

/// Heads a document's contents, in the aside, the disclosure and the notes rail.
pub const CONTENTS: &str = "Contents";
/// Marks a draft in its meta row and listings.
pub const DRAFT: &str = "draft";

/// A post or update page: the article beside its contents, in the wide frame.
pub fn page<'a>(context: ViewContext<'a>, document: &Document) -> Element<'a> {
    let bump = context.bump;
    let body = Body::new(context, document);
    let aside = body.toc.clone().map(|toc| {
        html! { in bump;
            <aside>
                <h2 class="aside-heading">{CONTENTS}</h2>
                {toc}
            </aside>
        }
    });
    html! { in bump;
        <div class="frame document-layout">
            {article(context, document, body)}
            {aside}
        </div>
    }
}

/// A document's heading and body, with a contents disclosure between them (narrow pages only).
pub fn article<'a>(
    context: ViewContext<'a>,
    document: &Document,
    mut body: Body<'a>,
) -> Element<'a> {
    let bump = context.bump;
    let toc = body.toc.take().map(|toc| {
        html! { in bump;
            <details class="document-toc">
                <summary>{CONTENTS}</summary>
                {toc}
            </details>
        }
    });
    html! { in bump;
        <article class="document-content">
            {head(context, document)}
            {toc}
            {body.into_prose(bump)}
        </article>
    }
}

/// A document's rendered body and, if it has enough headings, its contents.
pub struct Body<'a> {
    // Private: the blocks only leave through `into_prose`, so no view can render them
    // outside the prose container.
    blocks: Element<'a>,
    pub toc: Option<Element<'a>>,
}
impl<'a> Body<'a> {
    pub fn new(context: ViewContext<'a>, document: &Document) -> Self {
        let root = document_root(document);
        let url = document.route_path().url_path();
        let mut converter =
            MarkdownConverter::new(context, &url).with_source_path(document.source_path.clone());
        if document.document_type != DocumentType::Note {
            converter = converter
                .with_document_base_url(url.clone())
                .with_pr_entries(collect_pr_entries(context.bump, &root));
        }
        Self {
            blocks: converter.convert_blocks(&root),
            toc: toc(context, document, &root, &url),
        }
    }

    /// The body in its prose container, which the prose rules are scoped to.
    pub fn into_prose(self, bump: &'a Bump) -> Element<'a> {
        html! { in bump; <div class="document-body prose">{self.blocks}</div> }
    }
}

/// The document heading: a note's breadcrumb, the title and summary, the meta row,
/// and a post's hero image.
pub fn head<'a>(context: ViewContext<'a>, document: &Document) -> Element<'a> {
    let bump = context.bump;
    let url = document.route_path().url_path();
    let is_note = document.document_type == DocumentType::Note;
    let title = &document.metadata.title;
    let short = document
        .metadata
        .short
        .as_deref()
        .map(|short| html! { in bump; <p>{inline_markdown(context, short, &url)}</p> });
    let hero = document.hero_filename_and_alt.as_ref().map(|(filename, alt)| {
        html! { in bump;
            <img src={document.route_path().with_filename(filename).url_path()} alt={alt.as_str()} />
        }
    });
    html! { in bump;
        <header class="document-header">
            {(is_note && !document.id.is_empty()).then(|| breadcrumb(context, document))}
            <hgroup>
                <h1>{inline_markdown(context, title, &url)}</h1>
                {short}
            </hgroup>
            {document_meta(bump, document, MetadataLayout::Document, vec![])}
            {hero}
        </header>
    }
}

// --- Private implementation details ---

/// The contents: a link to the top of the document, then an outline of every heading.
/// Posts need more than one heading; notes, which have no aside, need one.
fn toc<'a>(
    context: ViewContext<'a>,
    document: &Document,
    root: &markdown::mdast::Node,
    url: &str,
) -> Option<Element<'a>> {
    let bump = context.bump;
    let headings = HeadingHierarchy::from_node(context, root, url);
    let minimum = match document.document_type {
        DocumentType::Note => 1,
        _ => 2,
    };
    (count(&headings) >= minimum).then(|| {
        // Lowercase to match the headings when they're all lowercase.
        let introduction = if headings
            .iter()
            .all(|h| h.heading_text.to_lowercase() == h.heading_text)
        {
            "introduction"
        } else {
            "Introduction"
        };
        let introduction = html! { in bump; <li><a href="#">{introduction}</a></li> };
        html! { in bump;
            <nav ariaLabel="Table of contents" class="toc">
                {toc_list(bump, Some(introduction), &headings)}
            </nav>
        }
    })
}

fn count(headings: &[HeadingHierarchy]) -> usize {
    headings.iter().map(|h| 1 + count(&h.children)).sum()
}

fn toc_list<'a>(
    bump: &'a Bump,
    first: Option<Element<'a>>,
    headings: &[HeadingHierarchy<'a>],
) -> Element<'a> {
    html! { in bump;
        <ol class="stack" style={gap("1")}>
            {first}
            #{headings.iter().map(|h| html! { in bump;
                <li>
                    <a href={format!("#{}", crate::util::slugify(&h.heading_text))}>{h.heading.clone()}</a>
                    {(!h.children.is_empty()).then(|| toc_list(bump, None, &h.children))}
                </li>
            })}
        </ol>
    }
}

/// A note's breadcrumb: the notes, then each parent folder, linking to its page if it has one.
fn breadcrumb<'a>(context: ViewContext<'a>, document: &Document) -> Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <nav ariaLabel="Breadcrumb" class="breadcrumb">
            <ol>
                <li><A href={CurrentPage::Notes.url_path()}>{CurrentPage::Notes.name()}</A></li>
                #{note_folders(context, document).into_iter().map(|(name, route)| html! { in bump;
                    <li>
                        {match route {
                            Some(route) => html! { in bump; <A href={route}>{name}</A> },
                            None => html! { in bump; {name} },
                        }}
                    </li>
                })}
            </ol>
        </nav>
    }
}
