use crate::{
    content::{Collection, Content, Document},
    elements::*,
    syntax::SyntaxHighlighter,
    util,
};

mod partials;

#[derive(Copy, Clone)]
pub struct ViewContext<'a> {
    pub syntax: &'a SyntaxHighlighter,
    pub content: &'a Content,
}

fn layout(context: ViewContext, inner: paxhtml::Element) -> paxhtml::Document {
    let links = [("/blog", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    paxhtml::Document::new([
        paxhtml::builder::doctype("html"),
        html! {
            <html lang="en-AU">
                <head>
                    <title>"Philpax"</title>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="alternate" href="/rss/blog.rss" r#type="application/rss+xml" title="Philpax's Blog" />
                    <link rel="stylesheet" href="/styles.css" />
                    <link rel="stylesheet" href="/syntax/base16-ocean.dark.css" id="syntax-theme" />
                    <script src="/scripts.js"></script>
                </head>
                <body>
                    <header>
                        <img src="/icon.png" alt="Philpax icon" />
                        <h1><a href="/">"Philpax"</a></h1>
                        <nav>
                            <select id="syntax-theme-selector" style="visibility: hidden;">
                                {
                                    context.syntax.themes().iter().map(|theme| html! {
                                        <option value={theme}>{theme}</option>
                                    }).collect::<Vec<_>>()
                                }
                            </select>
                            <ul id="header-links">
                                {
                                    links
                                        .iter()
                                        .copied()
                                        .map(|(url, label)| html! {
                                            <li>
                                                <a href={url}>{label}</a>
                                            </li>
                                        })
                                        .collect::<Vec<_>>()
                                }
                            </ul>
                        </nav>
                    </header>
                    <main>{inner}</main>
                </body>
            </html>
        },
    ])
}

pub mod collection {
    use super::*;

    pub fn post(
        context: ViewContext,
        collection: &Collection,
        document: &Document,
    ) -> paxhtml::Document {
        layout(
            context,
            partials::post(context, collection, document, partials::PostBody::Full),
        )
    }
}

pub mod blog {
    use super::*;

    pub fn index(context: ViewContext) -> paxhtml::Document {
        let blog = context.content.collections.get("blog").unwrap();
        layout(
            context,
            blog.documents
                .iter()
                .map(|doc| partials::post(context, blog, doc, partials::PostBody::Description))
                .collect::<Vec<_>>()
                .into(),
        )
    }
}

pub fn index(context: ViewContext) -> paxhtml::Document {
    let blog = context.content.collections.get("blog").unwrap();
    layout(
        context,
        blog.documents
            .iter()
            .map(|doc| partials::post(context, blog, doc, partials::PostBody::Short))
            .collect::<Vec<_>>()
            .into(),
    )
}

pub fn tags(context: ViewContext) -> paxhtml::Document {
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
                            tag_keys
                                .iter()
                                .map(|tag| {
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
                                })
                                .collect::<Vec<_>>()
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
                            context.content.tags[tag_id]
                                .iter()
                                .map(|t| {
                                    let collection = &context.content.collections[&t.0];
                                    let document = collection.document_by_id(&t.1).unwrap();

                                    html! {
                                        <li>
                                            <a href={document.route_path(collection).url_path()}>
                                                {document.metadata.title.clone()}
                                            </a>
                                        </li>
                                    }
                                })
                                .collect::<Vec<_>>()
                        }
                    </ul>
                </div>
            </article>
        },
    )
}

pub fn redirect(to_url: &str) -> paxhtml::Document {
    paxhtml::Document::new([
        paxhtml::builder::doctype("html"),
        html! {
            <html lang="en-AU">
                <head>
                    <title>"Redirecting..."</title>
                    <meta charset="utf-8" />
                    <meta httpEquiv="refresh" content={format!("0; url={to_url}")} />
                </head>
                <body>
                    <p>"Redirecting..."</p>
                    <p>
                        <a href={to_url} title="Click here if you are not redirected">
                            "Click here"
                        </a>
                    </p>
                </body>
            </html>
        },
    ])
}
