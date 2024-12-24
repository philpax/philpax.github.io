use super::*;

use crate::markdown;
use crate::views::blog::partials::{date, tags};

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
                            post(context, doc)
                        })
                        .into_element()
                }
                <a href={Route::Blog.url_path()}>"View all posts"</a>
                </div>
            </div>
        },
    )
}

pub fn post(context: ViewContext, document: &Document) -> paxhtml::Element {
    let post_url = document.route_path().url_path();
    let post_body_html = vec![markdown::convert_to_html(
        context.syntax,
        document
            .metadata
            .short()
            .as_ref()
            .unwrap_or(&document.content),
    )];

    html! {
        <article class="post">
            <header>
                {h2_with_id(html! {
                    <a href={post_url}>
                        {document.metadata.title.clone()}
                    </a>
                })}
            </header>
            <span>
                {date(document)}
                " · "
                {tags(document)}
            </span>
            <div class="post-body">
                {post_body_html}
            </div>
        </article>
    }
}
