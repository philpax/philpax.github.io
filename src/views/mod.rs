use crate::{content::Document, elements::*, Route, ViewContext};
use std::collections::HashMap;

pub mod blog;
pub mod credits;
pub mod frontpage;

pub mod components;

pub const FONT_STYLE: &str = "font-['Literata',serif]";

#[derive(Default)]
/// Metadata for social media platforms like Twitter and OpenGraph
struct SocialMeta {
    /// The title of the page for OpenGraph
    title: Option<String>,
    /// The description of the page for OpenGraph
    description: Option<String>,
    /// The image URL to display for OpenGraph
    image: Option<String>,
    /// The canonical URL of the page for OpenGraph
    url: Option<String>,
    /// The type of content for OpenGraph (e.g. "article", "website")
    type_: Option<String>,
    /// The Twitter card type (e.g. "summary", "summary_large_image")
    twitter_card: Option<String>,
    /// The image URL to display for Twitter
    twitter_image: Option<String>,
    /// When the article was published (for OpenGraph article type)
    article_published_time: Option<chrono::DateTime<chrono::Utc>>,
    /// A tag describing the article (for OpenGraph article type)
    article_tag: Option<String>,
}
impl SocialMeta {
    /// The full title of the page, including the website name
    pub fn full_title(&self, context: ViewContext) -> String {
        let mut title = context.website_name.to_string();
        if let Some(meta_title) = &self.title {
            title = format!("{title}: {meta_title}");
        }
        title
    }

    pub fn into_social_meta(self, context: ViewContext) -> HashMap<String, String> {
        HashMap::from_iter(
            [
                ("og:title", self.title.clone()),
                ("og:description", self.description.clone()),
                ("og:image", self.image),
                ("og:site_name", Some(context.website_name.into())),
                ("og:url", self.url),
                ("og:type", self.type_),
                ("twitter:card", self.twitter_card),
                ("twitter:title", self.title),
                ("twitter:description", self.description),
                ("twitter:image", self.twitter_image),
                (
                    "article:published_time",
                    self.article_published_time.map(|t| t.to_rfc3339()),
                ),
                ("article:author", Some(context.website_author.into())),
                ("article:tag", self.article_tag),
            ]
            .into_iter()
            .filter_map(|(k, v)| Some((k.to_string(), v?))),
        )
    }
}

fn layout(context: ViewContext, meta: SocialMeta, inner: Element) -> paxhtml::Document {
    let links = [
        (Route::Index.url_path(), "Home"),
        (Route::Blog.url_path(), "Blog"),
    ];

    paxhtml::Document::new([
        paxhtml::builder::doctype(["html".into()]),
        html! {
            <html lang="en-AU">
                <head>
                    <title>{meta.full_title(context)}</title>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    #{meta.into_social_meta(context).into_iter().map(|(k, v)| {
                        html! {
                            <meta property={k} content={v} />
                        }
                    })}
                    <link rel="alternate" href={Route::BlogRss.url_path()} r#type="application/rss+xml" title={context.website_name} />
                    <link rel="stylesheet" href={Route::Styles.url_path()} />
                    <script src={Route::Scripts.url_path()}></script>
                </head>
                <body class={format!("max-w-[860px] mx-auto text-[var(--color)] bg-[var(--background-color)] {FONT_STYLE} px-4 py-2 transition-all duration-200")}>
                    <header>
                        <div class="flex flex-col md:flex-row md:items-center md:mt-2">
                            <div id="top-bar" class="flex h-[var(--header-height)] items-center md:mr-4 justify-center md:flex-none">
                                <img src={Route::Icon.url_path()} alt={format!("{} icon", context.website_author)} class="aspect-square inline-block h-full mr-[var(--header-item-spacing)] rounded-full border-2 border-white" />
                                <h1 class="text-3xl font-bold h-full flex items-center leading-[var(--header-height)]">{context.website_author}</h1>
                            </div>
                            <nav class="flex items-center mt-2 md:mt-0 flex-1">
                                <ul id="header-links" class="list-none m-0 p-0 h-full flex w-full">
                                #{
                                    links.iter().map(|(url, label)| { html! {
                                        <li class="flex-1">
                                            <a href={url}>{*label}</a>
                                        </li>
                                    }})
                                }
                                </ul>
                            </nav>
                        </div>
                    </header>
                    <main class="mt-4">{inner}</main>
                    <footer class="mt-4 mb-4 text-center text-xs text-[var(--color-secondary)] leading-relaxed">
                        <div>
                            "generated by "
                            {components::link(true, None, "https://github.com/philpax/philpax.github.io", "paxsite".into())}
                            " on "
                            {datetime_with_chrono(context.generation_date)}
                            "."
                        </div>
                        <div>
                            {components::link(true, Some("Creative Commons 0".into()), "https://creativecommons.org/public-domain/cc0/", "cc0".into())}" / public domain. do whatever you like! "
                            {components::link(true, None, Route::Credits.url_path(), "credits".into())}"."
                        </div>
                    </footer>
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
