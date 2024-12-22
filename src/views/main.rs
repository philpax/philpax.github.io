use super::*;

use crate::markdown;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let blog = &context.content.blog;
    let about_body = markdown::convert_to_html(context.syntax, &context.content.about.content);

    layout(
        context,
        html! {
            <div id="home-page-columns">
                <article>
                    <div class="post-body">
                        {about_body}
                    </div>
                </article>
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
