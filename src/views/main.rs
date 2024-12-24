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
                        .take(5)
                        .map(|doc| {
                            blog::partials::frontpage_post(context, doc)
                        })
                        .into_element()
                }
                <a href={Route::Blog.url_path()}>"View all posts"</a>
                </div>
            </div>
        },
    )
}
