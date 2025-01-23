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
            <>
                {partials::header(partials::HeaderFocus::AllPosts)}
                #{all_posts}
            </>
        },
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Document {
    let toc = document_to_html_list(document).map(|hierarchy_list| {
        html! {
            <aside id="toc">
                <h3>"Table of Contents"</h3>
                {hierarchy_list}
            </aside>
        }
    });
    layout(
        context,
        partials::post(context, document, partials::PostBody::Full { toc }),
    )
}

fn document_to_html_list(document: &Document) -> Option<paxhtml::Element> {
    let heading_hierarchy =
        markdown::HeadingHierarchy::from_node(document.rest_of_content.as_ref()?);

    fn build_list_recursively(children: &[markdown::HeadingHierarchy]) -> paxhtml::Element {
        if children.is_empty() {
            return paxhtml::Element::Empty;
        }

        html! {
            <ul>
                #{children.iter().map(build_list_item_recursively)}
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
