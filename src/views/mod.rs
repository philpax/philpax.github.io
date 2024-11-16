use crate::{
    content::{Collection, Content, Document},
    elements::*,
    syntax::SyntaxHighlighter,
    util,
};

mod partials;

fn layout(inner: paxhtml::Element) -> paxhtml::Document {
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
                    <script src="/scripts.js"></script>
                </head>
                <body>
                    <header>
                        <img src="/icon.png" alt="Philpax icon" />
                        <h1><a href="/">"Philpax"</a></h1>
                        <nav>
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
        collection: &Collection,
        document: &Document,
        syntax_highlighter: &SyntaxHighlighter,
    ) -> paxhtml::Document {
        layout(partials::post(
            collection,
            document,
            partials::PostBody::Full,
            syntax_highlighter,
        ))
    }
}

pub mod blog {
    use super::*;

    pub fn index(content: &Content, syntax_highlighter: &SyntaxHighlighter) -> paxhtml::Document {
        let blog = content.collections.get("blog").unwrap();
        layout(
            blog.documents
                .iter()
                .map(|doc| {
                    partials::post(
                        blog,
                        doc,
                        partials::PostBody::Description,
                        syntax_highlighter,
                    )
                })
                .collect::<Vec<_>>()
                .into(),
        )
    }
}

pub fn index(content: &Content, syntax_highlighter: &SyntaxHighlighter) -> paxhtml::Document {
    let blog = content.collections.get("blog").unwrap();
    layout(
        blog.documents
            .iter()
            .map(|doc| partials::post(blog, doc, partials::PostBody::Short, syntax_highlighter))
            .collect::<Vec<_>>()
            .into(),
    )
}

pub fn tags(content: &Content) -> paxhtml::Document {
    let mut tag_keys = content.tags.keys().collect::<Vec<_>>();
    tag_keys.sort();

    layout(html! {
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
                                let post_count = content.tags[*tag].len();
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
    })
}

pub fn tag(content: &Content, tag_id: &str) -> paxhtml::Document {
    layout(html! {
        <article>
            <header>
                {h2_with_id(html!{<a href="/tags">"Tags"</a>})}
            </header>
            <div>
                <ul>
                    {
                        content.tags[tag_id]
                            .iter()
                            .map(|t| {
                                let collection = &content.collections[&t.0];
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
    })
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
