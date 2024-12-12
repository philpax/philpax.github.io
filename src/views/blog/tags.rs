use super::*;
use crate::util;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let mut tag_keys = context.content.blog.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(
        context,
        html! {
            <article>
                <header>
                    {h2_with_id(html!{<a href={Route::BlogTags.route_path().url_path()}>"Tags"</a>})}
                </header>
                <div>
                    <ul>
                    {
                        Element::from_iter(tag_keys.iter().map(|tag| {
                            let post_count = context.content.blog.tags[*tag].len();
                            html! {
                                <li>
                                    <a href={Route::BlogTag { tag_id: tag }.route_path().url_path()}>{format!("#{tag}")}</a>
                                    {format!(
                                        " ({} {})",
                                        post_count,
                                        util::pluralize("post", post_count)
                                    )}
                                </li>
                            }
                        }))
                    }
                    </ul>
                </div>
            </article>
        },
    )
}

pub fn tag(context: ViewContext, tag_id: &str) -> paxhtml::Document {
    let blog = &context.content.blog;
    layout(
        context,
        html! {
            <article>
                <header>
                    {h2_with_id(html!{<a href={Route::BlogTags.route_path().url_path()}>"Tags"</a>})}
                </header>
                <div>
                    <ul>
                    {
                        Element::from_iter(blog.tags[tag_id].iter().map(|t| {
                            let document = blog.document_by_id(t).unwrap();
                            html! {
                                <li>
                                    <a href={blog.route_path(document).url_path()}>
                                        {document.metadata.title.clone()}
                                    </a>
                                </li>
                            }
                        }))
                    }
                    </ul>
                </div>
            </article>
        },
    )
}
