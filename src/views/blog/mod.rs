use super::*;
use crate::{markdown, util};

pub mod partials;
pub mod tags;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let all_posts = context
        .content
        .blog
        .documents
        .iter()
        .map(|doc| partials::post(context, doc, partials::PostBody::Description));
    layout(
        context,
        html! {
            <fragment>
                <a href={Route::BlogTags.url_path()}>"Tags"</a>
                #{all_posts}
            </fragment>
        },
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Document {
    let article = partials::post(context, document, partials::PostBody::Full);
    let view = if let Some(hierarchy_list) = document_to_html_list(document) {
        paxhtml::Element::from_iter([
            article,
            html! {
                <aside>
                    {h2_with_id("Contents")}
                    <ul>
                        {hierarchy_list}
                    </ul>
                </aside>
            },
        ])
    } else {
        article
    };

    layout(context, view)
}

fn document_to_html_list(document: &Document) -> Option<paxhtml::Element> {
    let heading_hierarchy = markdown::HeadingHierarchy::from_node(&document.content);

    fn build_list_recursively(children: &[markdown::HeadingHierarchy]) -> paxhtml::Element {
        if children.is_empty() {
            return paxhtml::Element::Empty;
        }

        html! {
            <ul>
                {children.iter().map(build_list_item_recursively).into_element()}
            </ul>
        }
    }

    fn build_list_item_recursively(
        markdown::HeadingHierarchy { heading, children }: &markdown::HeadingHierarchy,
    ) -> paxhtml::Element {
        html! {
            <li>
                <a href={format!("#{}", util::slugify(heading))}>{heading}</a>
                {build_list_recursively(children)}
            </li>
        }
    }

    Some(build_list_recursively(&heading_hierarchy)).filter(|e| !e.is_empty())
}
