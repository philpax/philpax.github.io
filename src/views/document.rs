//! One renderer for posts, updates and notes. A note differs in its breadcrumb, has no
//! kind in its meta row, and sits beside the notes rail instead of its own frame.

use paxhtml::bumpalo::Bump;

use super::*;
use crate::{
    content::DocumentType,
    markdown::{HeadingHierarchy, MarkdownConverter, document_root},
    views::{
        components::{TagList, TagListProps, collect_pr_entries},
        listings::{gap, inline_markdown, note_folders},
    },
};

/// A post or update page: the article beside its contents, in the wide frame.
pub fn page<'a>(context: ViewContext<'a>, document: &Document) -> Element<'a> {
    let bump = context.bump;
    let body = Body::new(context, document);
    let aside = body.toc.clone().map(|toc| {
        html! { in bump;
            <aside>
                <h2 class="aside-heading">{copy::doc::CONTENTS}</h2>
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
                <summary>{copy::doc::CONTENTS}</summary>
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
            {meta(bump, document)}
            {hero}
        </header>
    }
}

// --- Private implementation details ---

/// The contents: an outline of every heading. Posts need more than one heading;
/// notes, which have no aside, need one.
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
        html! { in bump;
            <nav ariaLabel="Table of contents" class="toc">
                {toc_list(bump, &headings)}
            </nav>
        }
    })
}

fn count(headings: &[HeadingHierarchy]) -> usize {
    headings.iter().map(|h| 1 + count(&h.children)).sum()
}

fn toc_list<'a>(bump: &'a Bump, headings: &[HeadingHierarchy<'a>]) -> Element<'a> {
    html! { in bump;
        <ol class="stack" style={gap("1")}>
            #{headings.iter().map(|h| html! { in bump;
                <li>
                    <a href={format!("#{}", crate::util::slugify(&h.heading_text))}>{h.heading.clone()}</a>
                    {(!h.children.is_empty()).then(|| toc_list(bump, &h.children))}
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
                <li><A href={CurrentPage::Notes.url_path()}>{copy::nav::NOTES}</A></li>
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

/// Facts separated by slashes, then the tags. The slashes are in the markup so it reads
/// as a row unstyled; the tags have none, as they wrap onto their own line.
fn meta<'a>(bump: &'a Bump, document: &Document) -> Element<'a> {
    let kind = match document.document_type {
        DocumentType::Blog => Some("Post"),
        DocumentType::Update => Some("Update"),
        DocumentType::Note => None,
    };
    // Notes are dated by last touch.
    let when = match document.document_type {
        DocumentType::Note => document
            .metadata
            .last_modified
            .or(document.metadata.datetime),
        _ => document.metadata.datetime,
    }
    .unwrap_or_else(|| panic!("No datetime for {document}"));

    let segments = [
        kind.map(|kind| html! { in bump; <span>{kind}</span> }),
        Some(html! { in bump;
            <time datetime={when.to_rfc3339()}>{display_date(when.date_naive())}</time>
        }),
        Some(html! { in bump; <span>{copy::doc::words(document.word_count)}</span> }),
        document
            .metadata
            .draft
            .then(|| html! { in bump; <em>{copy::doc::DRAFT}</em> }),
    ];
    let tags = document.tags().cloned().unwrap_or_default();
    html! { in bump;
        <div class="document-meta">
            #{segments.into_iter().flatten().enumerate().map(|(i, segment)| html! { in bump;
                <>
                    {(i > 0).then(|| html! { in bump; <span ariaHidden="true">" / "</span> })}
                    {segment}
                </>
            })}
            <TagList tags={tags} />
        </div>
    }
}
