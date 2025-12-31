use paxhtml::bumpalo::{self, Bump};

use crate::{
    content::{DocumentFolderNode, DocumentNode},
    markdown::MarkdownConverter,
    util,
    views::components::{Link, LinkProps},
};

use super::*;

pub fn note<'a>(
    context: ViewContext<'a>,
    note: &Document,
) -> paxhtml::Document<'a> {
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

    layout(
        context,
        SocialMeta {
            title: Some(display_path.last().unwrap().to_string()),
            description: Some(description),
            image: Some(og_image_url.clone()),
            url: Some(Route::Notes.abs_url(context.website_base_url)),
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
                    "Other Notes"
                </label>

                <div class="absolute left-0 right-0 bg-[var(--background-color)] border-l border-r border-b border-[var(--background-color-secondary)] shadow-lg p-4 z-50 hidden peer-checked:block">
                    {notes_hierarchy(context, note)}
                </div>

                <div class="w-full mt-4">
                    <h2 class="text-3xl font-bold">
                        {{
                            let mut elements = vec![];
                            for (index, component) in display_path.iter().enumerate() {
                                if index != 0 {
                                    elements.push(html! { in bump; <span class="text-[var(--color-secondary)]">{" · "}</span> });
                                }
                                let class = if index == display_path.len() - 1 {
                                    "italic"
                                } else {
                                    "text-[var(--color-secondary)]"
                                };
                                elements.push(html! { in bump; <span class={class}>{component}</span> });
                            }
                            paxhtml::builder::Builder::new(bump).fragment(elements)
                        }}
                    </h2>
                    <div class="text-[var(--color-secondary)] text-sm mb-2">
                        {datetime_with_chrono(bump, note.metadata.datetime.unwrap())}
                    </div>
                    <div class={posts::POST_BODY_MARGIN_CLASS}>
                        {{
                            let mut converter = MarkdownConverter::new(context).with_sidenotes();
                            paxhtml::builder::Builder::new(bump).fragment([
                                converter.convert(&note.description, None),
                                note.rest_of_content.as_ref().map(|content| converter.convert(content, None)).unwrap_or(paxhtml::Element::Empty),
                            ])
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

    html! { in bump;
        <li class="break-words list-none">
            <input r#type="checkbox" id={checkbox_id} class="peer sr-only" checked autocomplete="off" />
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
                #{folder_node.children.values().map(|node| match node {
                    DocumentNode::Folder(folder_node) => {
                        build_tree(bump, folder_node, active_document, depth + 1)
                    }
                    DocumentNode::Document { document } => {
                        html! { in bump;
                            <li class="break-words">
                                {render_document(document)}
                            </li>
                        }
                    }
                })}
            </ul>
        </li>
    }
}
