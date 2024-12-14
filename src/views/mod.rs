use crate::{content::Document, elements::*, Route, ViewContext};

pub mod blog;
pub mod main;

fn layout(_context: ViewContext, inner: Element) -> paxhtml::Document {
    let links = [
        (Route::Blog.url_path(), "Blog"),
        (Route::BlogTags.url_path(), "Tags"),
    ];

    paxhtml::Document::new([
        paxhtml::builder::doctype(["html".into()]),
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
                                Element::from_iter(links.iter().map(|(url, label)| { html! {
                                    <li>
                                        <a href={url}>{*label}</a>
                                    </li>
                                }}))
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

pub fn redirect(to_url: &str) -> paxhtml::Document {
    paxhtml::Document::new([
        paxhtml::builder::doctype(["html".into()]),
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
