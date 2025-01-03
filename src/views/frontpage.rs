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
                        .map(|doc| post(context, doc))
                        .into_element()
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

fn post(context: ViewContext, document: &Document) -> paxhtml::Element {
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
                <a href={post_url} class="post-title">
                    <h2>{document.metadata.title.clone()}</h2>
                </a>
                <div class="post-meta">
                    {date(document)}
                    " · "
                    {tags(document)}
                </div>
            </header>
            <div class="post-body">
                {post_body_html}
            </div>
        </article>
    }
}
