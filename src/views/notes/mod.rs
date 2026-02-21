use paxhtml::bumpalo::Bump;

use crate::{
    content::{DocumentFolderNode, DocumentNode},
    markdown::MarkdownConverter,
    util,
    views::components::{Link, LinkProps},
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

    let breadcrumbs: Vec<(&str, Vec<String>)> = std::iter::once(("Notes", vec![]))
        .chain(
            display_path
                .iter()
                .zip(0..note.id.len())
                .map(|(name, i)| (name.as_str(), note.id[..=i].to_vec())),
        )
        .collect();
    let last = breadcrumbs.len() - 1;
    let elements: Vec<_> = breadcrumbs.into_iter().enumerate().flat_map(|(i, (label, note_id))| {
        let separator = (i != 0).then(|| html! { in bump; <span class="text-[var(--color-secondary)]">{" · "}</span> });
        let additional_classes = if i == last { "italic hover:text-[var(--color)]" } else { "text-[var(--color-secondary)]" };
        let link = html! { in bump;
            <Link target={Route::Note { note_id }.url_path()} additional_classes={additional_classes.to_string()}>
                {label}
            </Link>
        };
        separator.into_iter().chain(std::iter::once(link))
    }).collect();

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
        },
        CurrentPage::Notes,
        html! { in bump;
            <div class="relative">
                <input r#type="checkbox" id="nav-toggle" class="peer sr-only" autocomplete="off" />
                <label r#for="nav-toggle" class="block w-full px-4 py-2 bg-[var(--background-color-secondary)] text-[var(--color)] text-center cursor-pointer hover:bg-[var(--background-color-secondary)] transition-colors duration-200 lowercase select-none">
                    "All Notes"
                </label>

                <div class="absolute left-0 right-0 bg-[var(--background-color)] border-l border-r border-b border-[var(--background-color-secondary)] shadow-lg p-4 z-50 hidden peer-checked:block">
                    {notes_hierarchy(context, note)}
                </div>

                <div class="w-full mt-4">
                    <h2 class="text-3xl font-bold">
                        #{elements}
                    </h2>
                    <div class="text-[var(--color-secondary)] text-sm mb-2">
                        {datetime_with_chrono(bump, note.metadata.datetime.unwrap())}
                        {note.metadata.datetime
                            .zip(note.metadata.last_modified)
                            .filter(|(published, modified)| published.date_naive() != modified.date_naive())
                            .map(|(_, modified)| html! { in bump;
                                <>
                                    " · updated "
                                    {datetime_with_chrono(bump, modified)}
                                </>
                            })}
                    </div>
                    <div class={posts::POST_BODY_MARGIN_CLASS}>
                        {{
                            let error_context = format!("note: {}", note.id.join("/"));

                            // Build TOC from whichever node has the headings
                            let toc = note.rest_of_content
                                .as_ref()
                                .and_then(|node| posts::document_to_html_list(context, node, &error_context))
                                .or_else(|| posts::document_to_html_list(context, &note.description, &error_context));
                            let (toc_sidebar, toc_inline) = posts::toc_elements(bump, toc);

                            let mut content_elements = vec![];

                            content_elements.extend(toc_sidebar);

                            let mut converter = MarkdownConverter::new(context, &error_context)
                                .with_sidenotes()
                                .with_note_id(note.id.clone())
                                .with_source_path(note.source_path.clone());
                            content_elements.push(converter.convert(&note.description, None));

                            content_elements.extend(toc_inline);

                            if let Some(content) = note.rest_of_content.as_ref() {
                                content_elements.push(converter.convert(content, None));
                            }

                            paxhtml::builder::Builder::new(bump).fragment(content_elements)
                        }}
                    </div>
                </div>
            </div>
        },
    )
}

fn notes_hierarchy<'a>(
    context: ViewContext<'a>,
    active_document: &Document,
) -> paxhtml::Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <ul class="list-none m-0 p-0 break-words overflow-hidden">
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
        .index_document
        .as_ref()
        .map(render_document)
        .unwrap_or_else(|| {
            html! { in bump;
                <span class="text-[var(--color-secondary)]">{folder_node.folder_name.clone()}</span>
            }
        });

    let checked_attr = (depth < 2)
        .then(|| paxhtml::Attribute::boolean(bump, "checked"))
        .into_iter();

    html! { in bump;
        <li class="break-words list-none">
            <input r#type="checkbox" id={checkbox_id} class="peer sr-only" {checked_attr} autocomplete="off" />
            <div class="flex items-center gap-0">
                <label r#for={checkbox_id} class="cursor-pointer select-none text-xs text-[var(--color-secondary)] hover:text-[var(--color)] transition-colors w-4">
                    <span class="peer-checked:hidden">{"▶"}</span>
                    <span class="hidden peer-checked:inline">{"▼"}</span>
                </label>
                <div class="flex-1">
                    {index_item}
                </div>
            </div>
            <ul class="list-disc list-inside m-0 hidden peer-checked:block ml-4">
                #{folder_node.children.values().map(|node| {
                    if let DocumentNode::Folder(folder_node) = node && !folder_node.is_leaf() {
                        return build_tree(bump, folder_node, active_document, depth + 1);
                    }
                    let document = match node {
                        DocumentNode::Folder(f) => f.index_document.as_ref().unwrap(),
                        DocumentNode::Document { document } => document,
                    };
                    html! { in bump;
                        <li class="break-words">
                            {render_document(document)}
                        </li>
                    }
                })}
            </ul>
        </li>
    }
}
