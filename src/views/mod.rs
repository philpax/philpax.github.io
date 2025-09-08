use crate::{
    content::{Content, Document},
    elements::*,
    syntax::SyntaxHighlighter,
    Route,
};
use std::collections::HashMap;

pub mod blog;
pub mod credits;
pub mod frontpage;
pub mod notes;
pub mod posts;
pub mod tags;
pub mod updates;

pub mod components;

#[derive(Copy, Clone)]
pub struct ViewContext<'a> {
    pub website_author: &'a str,
    pub website_name: &'a str,
    pub website_description: &'a str,
    pub website_base_url: &'a str,
    pub syntax: &'a SyntaxHighlighter,
    pub content: &'a Content,
    pub generation_date: chrono::DateTime<chrono::Utc>,
    pub fast: bool,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum CurrentPage {
    Home,
    Blog,
    Updates,
    Notes,
    Tags,
}
impl CurrentPage {
    pub const ALL_PAGES: &'static [CurrentPage] = &[
        CurrentPage::Home,
        CurrentPage::Blog,
        CurrentPage::Updates,
        CurrentPage::Notes,
        CurrentPage::Tags,
    ];

    pub fn url_path(&self) -> String {
        match self {
            CurrentPage::Home => Route::Index.url_path(),
            CurrentPage::Blog => Route::Blog.url_path(),
            CurrentPage::Updates => Route::Updates.url_path(),
            CurrentPage::Notes => Route::Notes.url_path(),
            CurrentPage::Tags => Route::Tags.url_path(),
        }
    }

    pub fn name(&self) -> &'static str {
        match self {
            CurrentPage::Home => "Home",
            CurrentPage::Blog => "Blog",
            CurrentPage::Updates => "Updates",
            CurrentPage::Notes => "Notes",
            CurrentPage::Tags => "Tags",
        }
    }
}

pub const FONT_STYLE: &str = "font-['Literata',serif]";

#[derive(Default)]
/// Metadata for social media platforms like Twitter and OpenGraph
pub struct SocialMeta {
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
    /// When the article was last modified (for OpenGraph article type)
    article_modified_time: Option<chrono::DateTime<chrono::Utc>>,
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
                (
                    "article:modified_time",
                    self.article_modified_time.map(|t| t.to_rfc3339()),
                ),
                ("article:author", Some(context.website_author.into())),
                ("article:tag", self.article_tag),
            ]
            .into_iter()
            .filter_map(|(k, v)| Some((k.to_string(), v?))),
        )
    }
}

pub fn layout(
    context: ViewContext,
    meta: SocialMeta,
    current_page: CurrentPage,
    inner: Element,
) -> paxhtml::Document {
    paxhtml::Document::new([
        paxhtml::builder::doctype(["html".into()]),
        html! {
            <html lang="en-AU" class="w-[100vw]">
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
                            <div id="top-bar" class="flex h-[var(--header-height)] items-center md:mr-8 justify-center md:flex-none">
                                <img src={Route::Icon.url_path()} alt={format!("{} icon", context.website_author)} class="aspect-square inline-block h-full mr-4 rounded-full border-2 border-white" />
                                <h1 class="text-3xl font-bold h-full flex items-center leading-[var(--header-height)]">{context.website_author}</h1>
                            </div>
                            <nav class="flex items-center mt-2 md:mt-0 flex-1">
                                <div id="header-links" class="grid grid-cols-2 gap-2 md:flex w-full md:flex-row md:gap-0">
                                #{
                                    CurrentPage::ALL_PAGES.iter().map(|page| {
                                        let is_active = *page == current_page;
                                        let bg_class = if is_active { "bg-[var(--color)]" } else { "bg-[var(--color-secondary)]" };
                                        html! {
                                            <a href={page.url_path()} class={format!("text-center {} text-[var(--background-color)] lowercase hover:bg-[var(--color)] py-2 px-4 mr-0 md:mr-2 md:last:mr-0 md:mb-0 transition-colors duration-200 md:flex-1", bg_class)}>{page.name()}</a>
                                        }
                                    })
                                }
                                </div>
                            </nav>
                        </div>
                    </header>
                    <main class="mt-4">{inner}</main>
                    <footer class="mt-4 mb-4 text-center text-xs text-[var(--color-secondary)] leading-relaxed">
                        <div>
                            "rss: "
                            {components::link(true, None, Route::BlogRss.url_path(), "", "blog".into())}
                            " · "
                            {components::link(true, None, Route::UpdatesRss.url_path(), "", "updates".into())}
                        </div>
                        <div>
                            "generated by "
                            {components::link(true, None, "https://github.com/philpax/philpax.github.io", "", "paxsite".into())}
                            " on "
                            {datetime_with_chrono(context.generation_date)}
                            "."
                        </div>
                        <div>
                            {components::link(true, Some("Creative Commons 0".into()), "https://creativecommons.org/public-domain/cc0/", "", "cc0".into())}" / public domain. do whatever you like! "
                            {components::link(true, None, Route::Credits.url_path(), "", "credits".into())}"."
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
