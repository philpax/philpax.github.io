use super::*;
use crate::util;

pub fn index(context: ViewContext) -> paxhtml::Document {
    let mut tag_keys = context.content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(
        context,
        html! {
            <article>
                <header>
                    {h2_with_id(html!{<a href="/tags">"Tags"</a>})}
                </header>
                <div>
                    <ul>
                    {
                        Element::from_iter(tag_keys.iter().map(|tag| {
                            let post_count = context.content.tags[*tag].len();
                            html! {
                                <li>
                                    <a href={format!("/tags/{tag}")}>{format!("#{tag}")}</a>
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
    layout(
        context,
        html! {
            <article>
                <header>
                    {h2_with_id(html!{<a href="/tags">"Tags"</a>})}
                </header>
                <div>
                    <ul>
                    {
                        Element::from_iter(context.content.tags[tag_id].iter().map(|t| {
                            let collection = &context.content.collections[&t.0];
                            let document = collection.document_by_id(&t.1).unwrap();
                            html! {
                                <li>
                                    <a href={document.route_path(collection).url_path()}>
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
