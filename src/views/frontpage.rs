use super::*;

use crate::{markdown, views::blog::partials};

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
                #{
                    blog.documents
                        .iter()
                        .take(5)
                        .map(|doc| partials::post(context, doc, partials::PostBody::Short))
                }
                <span>
                    <a href={Route::Blog.url_path()}>"All posts"</a>
                    " · "
                    <a href={Route::BlogTags.url_path()}>"Tags"</a>
                </span>
                </div>
            </div>
        },
    )
}
