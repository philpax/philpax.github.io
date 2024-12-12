use super::*;

pub mod partials;
pub mod tags;

pub fn index(context: ViewContext) -> paxhtml::Document {
    layout(
        context,
        context
            .content
            .blog
            .documents
            .iter()
            .map(|doc| partials::post(context, doc, partials::PostBody::Description))
            .into_element(),
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Document {
    layout(
        context,
        partials::post(context, document, partials::PostBody::Full),
    )
}
