use super::*;

pub fn post(
    context: ViewContext,
    collection: &Collection,
    document: &Document,
) -> paxhtml::Document {
    layout(
        context,
        partials::post(context, collection, document, partials::PostBody::Full),
    )
}
