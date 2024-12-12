use super::*;

use crate::markdown;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let blog = &context.content.blog;
    let about_body = markdown::convert_to_html(context.syntax, &context.content.about.content);

    layout(
        context,
        html! {
            <div>
                <div>
                    <h3><small>"Hi, I'm "</small>"Philpax"<small>"."</small></h3>
                    {about_body}
                </div>
                <div>
                {
                    blog.documents
                        .iter()
                        .map(|doc| {
                            blog::partials::post(
                                context,
                                doc,
                                blog::partials::PostBody::Short,
                            )
                        })
                        .into_element()
                }
                </div>
            </div>
        },
    )
}
