use super::*;

use crate::{markdown, views::blog::partials};

pub fn index(context: ViewContext) -> paxhtml::Document {
    let content = &context.content;
    layout(
        context,
        html! {
            <div id="home-page-columns">
                <article>
                    <div class="post-body">
                        {markdown::convert_to_html(context.syntax, &content.about.description)}
                    </div>
                </article>
                <div>
                #{
                    content
                        .blog
                        .documents
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
