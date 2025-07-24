use crate::{
    content::{DocumentFolderNode, DocumentNode},
    markdown::MarkdownConverter,
};

use super::*;

pub fn note(context: ViewContext, note: &Document) -> paxhtml::Document {
    let display_note_id = if note.id.is_empty() {
        &vec!["Home".to_string()]
    } else {
        &note.id
    };

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
                <div class="border-b border-dotted border-[var(--color)] pb-4 mb-2 md:border-r md:border-b-0 md:pr-4 md:pb-0 md:mb-0 pr-4 md:w-32 md:min-w-32 md:max-w-32">
                    {notes_hierarchy(context, note)}
                </div>
                <div class="md:pl-4">
                    <h2 class="text-3xl font-bold mb-2 italic">
                        {format!("{}", display_note_id.join(" · "))}
                    </h2>
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
            {build_tree(context, &context.content.notes.documents, active_document)}
        </ul>
    }
}

fn build_tree(
    context: ViewContext,
    folder_node: &DocumentFolderNode,
    active_document: &Document,
) -> paxhtml::Element {
    let inactive_color = "text-[var(--color-secondary)]!";

    html! {
        <li class="break-words">
            {folder_node.index_document.as_ref().map(|index| {
                components::link(
                    false,
                    None,
                    index.route_path().url_path(),
                    if active_document.id == index.id { "active" } else { inactive_color },
                    index.metadata.title.clone().into(),
                )
            }).unwrap_or_else(|| html! {
                <span class={inactive_color}>{folder_node.folder_name.clone()}</span>
            })}
            <ul class="list-none m-0 p-0 ml-4">
                #{folder_node.children.iter().map(|(_name, node)|
                    match node {
                        DocumentNode::Folder(folder_node) => {
                            build_tree(context, folder_node, active_document)
                        }
                        DocumentNode::Document { document } => {
                            html! {
                                <li class="break-words">
                                    {components::link(
                                        false,
                                        None,
                                        document.route_path().url_path(),
                                        if active_document.id == document.id { "active" } else { inactive_color },
                                        document.metadata.title.clone().into()
                                    )}
                                </li>
                            }
                        }
                    }
                )}
            </ul>
        </li>

    }
}
