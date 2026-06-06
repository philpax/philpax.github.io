use paxhtml::bumpalo::Bump;

use crate::{
    content::{DocumentFolderNode, DocumentLeafNode, DocumentNode},
    markdown::MarkdownConverter,
    util,
    views::components::{
        IsoDatetime, IsoDatetimeProps, Link, LinkProps, Segment, SegmentProps, SegmentTag,
    },
};

use super::*;

pub fn note<'a>(context: ViewContext<'a>, note: &Document) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let display_path = &note.display_path;

    let description = if note.rest_of_content.is_none() {
        panic!(
            "Can't extract description; no rest of content for {:?}",
            note.id
        )
    } else {
        note.description.to_string()
    };

    let og_image_url = format!("{}{}", context.website_base_url, note.og_image_path());

    // Title band, mirroring a post. The breadcrumb trail to the note's parent
    // sits on its own (smaller, desaturated) line above the title; the note's own
    // name is the title proper, so it's dropped from the trail.
    let heading_class = posts::post_body_to_heading_class(posts::PostBody::Full);
    let breadcrumbs: Vec<(&str, Vec<String>)> = std::iter::once(("Notes", vec![]))
        .chain(
            display_path
                .iter()
                .zip(0..note.id.len())
                .map(|(name, i)| (name.as_str(), note.id[..=i].to_vec())),
        )
        .collect();
    let breadcrumb_elements: Vec<_> = breadcrumbs
        .into_iter()
        .take(note.id.len()) // drop the last crumb (the note itself, shown as the title)
        .enumerate()
        .flat_map(|(i, (label, note_id))| {
            let separator = (i != 0).then(|| html! { in bump; <span class="text-dim" ariaHidden="true">{"/"}</span> });
            let link = html! { in bump;
                <Link target={Route::Note { note_id }.url_path()} additional_classes={"text-dim".to_string()}>
                    {label}
                </Link>
            };
            separator.into_iter().chain(std::iter::once(link))
        })
        .collect();

    let updated = note
        .metadata
        .datetime
        .zip(note.metadata.last_modified)
        .filter(|(published, modified)| published.date_naive() != modified.date_naive())
        .map(|(_, modified)| modified);
    let header = html! { in bump;
        <div class="flex flex-col">
            {(!breadcrumb_elements.is_empty()).then(|| html! { in bump;
                <div class={format!("flex flex-wrap items-center gap-x-1 text-base text-dim {CODE_FONT_STYLE} -mb-2")}>
                    #{breadcrumb_elements.into_iter()}
                </div>
            })}
            <h2 class={format!("{heading_class} text-phosphor")}>
                {display_path.last().unwrap().to_string()}
            </h2>
            <div class={format!("post-meta flex items-center gap-2 text-sm text-dim {CODE_FONT_STYLE}")}>
                <span class="text-fg"><IsoDatetime datetime={note.metadata.datetime.unwrap()} /></span>
                {updated.map(|m| html! { in bump; <><span>" · updated "</span><span class="text-fg"><IsoDatetime datetime={m} /></span></> })}
            </div>
        </div>
    };

    layout(
        context,
        SocialMeta {
            title: Some(display_path.last().unwrap().to_string()),
            description: Some(description),
            image: Some(og_image_url.clone()),
            url: Some(Route::Note { note_id: vec![] }.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: Some("summary_large_image".to_string()),
            twitter_image: Some(og_image_url),
            article_published_time: None,
            article_modified_time: note.metadata.datetime,
            article_tag: None,
            noindex: false,
            standard_site_uri: None,
        },
        CurrentPage::Notes,
        html! { in bump;
            <>
                <div class="relative">
                    <input r#type="checkbox" id="nav-toggle" class="peer sr-only" autocomplete="off" />
                    <label r#for="nav-toggle" class={format!("panel-header-surface block w-full px-3 py-2 border border-wire text-phosphor cursor-pointer hover:border-phosphor transition-colors duration-200 select-none text-sm {CODE_FONT_STYLE}")}>
                        <span ariaHidden="true" class="text-dim">"[+] "</span>
                        "index"
                    </label>

                    <div class="absolute left-0 right-0 panel-surface border-l border-r border-b border-wire shadow-lg p-4 z-50 hidden peer-checked:block">
                        {notes_hierarchy(context, note)}
                    </div>
                </div>

                <Segment tag={SegmentTag::Article} header={header} body_class={"post-body measured".to_string()} class={"mt-2".to_string()}>
                    {{
                        let error_context = format!("note: {}", note.id.join("/"));

                        // Build TOC from whichever node has the headings
                        let toc = note.rest_of_content
                            .as_ref()
                            .and_then(|node| posts::document_to_html_list(context, node, &error_context))
                            .or_else(|| posts::document_to_html_list(context, &note.description, &error_context));
                        let (toc_sidebar, toc_inline) = posts::toc_elements(bump, toc);

                        let mut converter = MarkdownConverter::new(context, &error_context)
                            .with_sidenotes()
                            .with_note_id(note.id.clone())
                            .with_source_path(note.source_path.clone());

                        // Block flow: the floated TOC sidebar and sidenotes need it.
                        let mut body_elements = vec![];
                        body_elements.extend(toc_sidebar);
                        body_elements.push(converter.convert_sectioned(&note.description));
                        body_elements.extend(toc_inline);
                        if let Some(content) = note.rest_of_content.as_ref() {
                            body_elements.push(converter.convert_sectioned(content));
                        }

                        paxhtml::builder::Builder::new(bump).fragment(body_elements)
                    }}
                </Segment>
            </>
        },
    )
}

fn notes_hierarchy<'a>(
    context: ViewContext<'a>,
    active_document: &Document,
) -> paxhtml::Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <ul class={format!("list-none m-0 p-0 break-words overflow-hidden text-sm {CODE_FONT_STYLE}")}>
            {build_tree(bump, &context.content.notes.documents, active_document, 0)}
        </ul>
    }
}

fn build_tree<'bump>(
    bump: &'bump Bump,
    folder_node: &DocumentFolderNode,
    active_document: &Document,
    depth: usize,
) -> paxhtml::Element<'bump> {
    let checkbox_id = format!(
        "folder-{}-{}",
        depth,
        util::slugify(&folder_node.folder_name)
    );

    let render_document = |document: &Document| {
        let additional_classes = if active_document.id == document.id {
            Some("font-bold italic".to_string())
        } else {
            None
        };
        html! { in bump;
            <Link target={document.route_path().url_path()} additional_classes={additional_classes}>
                {document.metadata.title.clone()}
            </Link>
        }
    };

    let index_item = folder_node
        .index
        .as_ref()
        .and_then(|n| {
            if let DocumentLeafNode::Document(d) = n {
                Some(d.as_ref())
            } else {
                None
            }
        })
        .map(render_document)
        .unwrap_or_else(|| {
            html! { in bump;
                <span class="text-dim">{folder_node.folder_name.clone()}</span>
            }
        });

    let checked_attr = (depth < 2)
        .then(|| paxhtml::Attribute::boolean(bump, "checked"))
        .into_iter();

    html! { in bump;
        <li class="break-words list-none">
            <input r#type="checkbox" id={checkbox_id} class="peer sr-only" {checked_attr} autocomplete="off" />
            <div class="flex items-center gap-0">
                <label r#for={checkbox_id} class="cursor-pointer select-none text-xs text-dim hover:text-phosphor transition-colors w-4">
                    <span class="peer-checked:hidden">{"▶"}</span>
                    <span class="hidden peer-checked:inline">{"▼"}</span>
                </label>
                <div class="flex-1">
                    {index_item}
                </div>
            </div>
            <ul class="list-none m-0 hidden peer-checked:block ml-2 pl-3 border-l border-wire">
                #{folder_node.children.values().filter_map(|node| {
                    if let DocumentNode::Folder(f) = node && !f.is_leaf() {
                        if !f.has_visible_content() { return None; }
                        return Some(build_tree(bump, f, active_document, depth + 1));
                    }
                    let document = match node {
                        DocumentNode::Folder(f) => match f.index.as_ref().unwrap() {
                            DocumentLeafNode::Document(d) => d.as_ref(),
                            DocumentLeafNode::Redirect(_) => return None,
                        },
                        DocumentNode::Leaf(DocumentLeafNode::Document(d)) => d.as_ref(),
                        DocumentNode::Leaf(DocumentLeafNode::Redirect(_)) => return None,
                    };
                    Some(html! { in bump;
                        <li class="break-words">
                            {render_document(document)}
                        </li>
                    })
                })}
            </ul>
        </li>
    }
}
