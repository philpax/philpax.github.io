use crate::{
    content::{DocumentFolderNode, DocumentNode},
    markdown::MarkdownConverter,
    util,
};

use super::*;

pub fn note(context: ViewContext, note: &Document) -> paxhtml::Document {
    let display_path = &note.display_path;

    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::Notes.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        CurrentPage::Notes,
        html! {
            <div class="flex flex-col md:flex-row">
                <div class="mb-2 md:pb-0 md:mb-0 md:w-48 md:min-w-48 md:max-w-48">
                    {notes_hierarchy(context, note)}
                </div>
                <div class="md:pl-4">
                    <h2 class="text-3xl font-bold">
                        {{
                            let mut elements = vec![];
                            for (index, component) in display_path.iter().enumerate() {
                                if index != 0 {
                                    elements.push(html! { <span class="text-[var(--color-secondary)]">{" · "}</span> });
                                }
                                let class = if index == display_path.len() - 1 {
                                    "italic"
                                } else {
                                    "text-[var(--color-secondary)]"
                                };
                                elements.push(html! { <span class={class}>{component}</span> });
                            }
                            elements
                        }}
                    </h2>
                    <div class="text-[var(--color-secondary)] text-sm mb-2">
                        {datetime_with_chrono(note.metadata.datetime.unwrap())}
                    </div>
                    <div class={posts::POST_BODY_MARGIN_CLASS}>
                        {MarkdownConverter::new(context.syntax).convert(&note.description, None)}
                    </div>
                </div>
            </div>
        },
    )
}

fn notes_hierarchy(context: ViewContext, active_document: &Document) -> paxhtml::Element {
    html! {
        <ul class="list-none m-0 p-0 break-words overflow-hidden">
            {build_tree(&context.content.notes.documents, active_document, 0)}
        </ul>
    }
}

fn build_tree(
    folder_node: &DocumentFolderNode,
    active_document: &Document,
    depth: usize,
) -> paxhtml::Element {
    let checkbox_id = format!(
        "folder-{}-{}",
        depth,
        util::slugify(&folder_node.folder_name)
    );

    let render_document = |document: &Document| {
        components::link(
            false,
            None,
            document.route_path().url_path(),
            if active_document.id == document.id {
                "font-bold italic"
            } else {
                ""
            },
            document.metadata.title.clone().into(),
        )
    };

    let index_item = folder_node
        .index_document
        .as_ref()
        .map(render_document)
        .unwrap_or_else(|| {
            html! {
                <span class="text-[var(--color-secondary)]">{folder_node.folder_name.clone()}</span>
            }
        });

    html! {
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
                        build_tree(folder_node, active_document, depth + 1)
                    }
                    DocumentNode::Document { document } => {
                        html! {
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
