use super::*;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let blog = context.content.collections.get("blog").unwrap();
    layout(
        context,
        blog.documents
            .iter()
            .map(|doc| partials::post(context, blog, doc, partials::PostBody::Description))
            .into_element(),
    )
}
