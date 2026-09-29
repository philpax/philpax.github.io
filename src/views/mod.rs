use paxhtml::bumpalo::Bump;

use crate::{
    Route,
    content::{Content, Document, DocumentMetadataExt},
    elements::*,
    image_store::ImageStore,
    syntax::SyntaxHighlighter,
};
use std::collections::HashMap;

pub mod blog;
pub mod credits;
pub mod document;
pub mod frontpage;
pub mod listings;
pub mod notes;
pub mod tags;
pub mod updates;

pub mod components;
pub mod copy;
use components::{A, AProps, display_date};

/// Base context without bump allocator - can be shared across threads
#[derive(Copy, Clone)]
pub struct ViewContextBase<'a> {
    pub website_author: &'a str,
    pub website_name: &'a str,
    pub website_description: &'a str,
    pub website_base_url: &'a str,
    pub syntax: &'a SyntaxHighlighter,
    pub content: &'a Content,
    pub image_store: &'a ImageStore,
    pub generation_date: chrono::DateTime<chrono::Utc>,
    pub fast: bool,
}
impl<'a> ViewContextBase<'a> {
    /// Create a ViewContext with a bump allocator.
    /// The bump lifetime must be shorter than the base context lifetime.
    pub fn with_bump<'bump>(&self, bump: &'bump Bump) -> ViewContext<'bump>
    where
        'a: 'bump,
    {
        ViewContext { bump, base: *self }
    }
}

/// Full view context with bump allocator
#[derive(Copy, Clone)]
pub struct ViewContext<'a> {
    pub bump: &'a Bump,
    base: ViewContextBase<'a>,
}
impl<'a> std::ops::Deref for ViewContext<'a> {
    type Target = ViewContextBase<'a>;
    fn deref(&self) -> &Self::Target {
        &self.base
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum CurrentPage {
    Home,
    Blog,
    Updates,
    Notes,
    Tags,
    Credits,
}
impl CurrentPage {
    /// The sections the primary nav links to, in order.
    pub const NAV_PAGES: &'static [CurrentPage] = &[
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
            CurrentPage::Notes => Route::Note { note_id: vec![] }.url_path(),
            CurrentPage::Tags => Route::Tags.url_path(),
            CurrentPage::Credits => Route::Credits.url_path(),
        }
    }

    pub fn name(&self) -> &'static str {
        match self {
            CurrentPage::Home => copy::nav::HOME,
            CurrentPage::Blog => copy::nav::BLOG,
            CurrentPage::Updates => copy::nav::UPDATES,
            CurrentPage::Notes => copy::nav::NOTES,
            CurrentPage::Tags => copy::nav::TAGS,
            CurrentPage::Credits => copy::nav::CREDITS,
        }
    }

    /// The section the page belongs to, which picks its accent
    /// (`data-section` on the root). The front page has none.
    pub fn section(&self) -> Option<&'static str> {
        match self {
            CurrentPage::Home => None,
            CurrentPage::Blog => Some("blog"),
            CurrentPage::Updates => Some("updates"),
            CurrentPage::Notes => Some("notes"),
            CurrentPage::Tags => Some("tags"),
            CurrentPage::Credits => Some("credits"),
        }
    }
}

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
    /// Whether to instruct robots not to index this page
    noindex: bool,
    /// AT-URI of the `site.standard.document` record for this page, if it has been
    /// published to the PDS. Emits a `<link rel="site.standard.document">` tag.
    standard_site_uri: Option<String>,
}
impl SocialMeta {
    /// The full title of the page, including the website name
    pub fn full_title(&self, context: &ViewContext) -> String {
        let mut title = context.website_name.to_string();
        if let Some(meta_title) = &self.title {
            title = format!("{title}: {meta_title}");
        }
        title
    }

    pub fn into_social_meta(self, context: &ViewContext) -> HashMap<String, String> {
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

pub fn layout<'a>(
    context: ViewContext<'a>,
    meta: SocialMeta,
    current_page: CurrentPage,
    inner: Element<'a>,
) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let standard_site_uri = meta.standard_site_uri.clone();
    let section = current_page
        .section()
        .map(|section| paxhtml::Attribute::new(bump, "data-section", section));
    paxhtml::Document::new_with_doctype(
        bump,
        html! { in bump;
            <html lang="en-AU">
                <head>
                    <title>{meta.full_title(&context)}</title>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {meta.noindex.then(|| html! { in bump;
                        <meta name="robots" content="noindex, nofollow" />
                    })}
                    #{meta.into_social_meta(&context).into_iter().map(|(k, v)| {
                        html! { in bump;
                            <meta property={k} content={v} />
                        }
                    })}
                    <link rel="alternate" href={Route::BlogRss.url_path()} r#type="application/rss+xml" title={context.website_name} />
                    {standard_site_uri.map(|uri| html! { in bump;
                        <link rel="site.standard.document" href={uri} />
                    })}
                    // Pins a theme the reader chose, as a class on <html>, before
                    // the sheet loads; without one, the system's scheme applies.
                    <script>{r#"(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.classList.add(t);})()"#}</script>
                    <link rel="stylesheet" href={Route::Styles.url_path()} />
                    <script src={Route::Scripts.url_path()}></script>
                </head>
                <body class="site" {section}>
                    <a class="skip-link" href="#content">{copy::labels::SKIP}</a>
                    {header(context, current_page)}
                    <main id="content">{inner}</main>
                    {footer(context)}
                </body>
            </html>
        },
    )
}

pub fn redirect<'bump>(
    bump: &'bump Bump,
    to_url: &str,
    og_image_url: Option<&str>,
) -> paxhtml::Document<'bump> {
    paxhtml::Document::new_with_doctype(
        bump,
        html! { in bump;
            <html lang="en-AU">
                <head>
                    <title>"Redirecting..."</title>
                    <meta charset="utf-8" />
                    <meta httpEquiv="refresh" content={format!("0; url={to_url}")} />
                    {og_image_url.map(|url| html! { in bump;
                        <meta property="og:image" content={url} />
                    })}
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
    )
}

/// The same band on every page: the wordmark, the primary nav, and the shader
/// behind them. The theme switch is added to the nav by script, since it only
/// works with one.
fn header<'a>(context: ViewContext<'a>, current_page: CurrentPage) -> Element<'a> {
    let bump = context.bump;
    html! { in bump;
        <header>
            <canvas class="header-shader" ariaHidden="true"></canvas>
            <div class="frame">
                // The brand is stable chrome, never a heading; each page owns its own.
                <a href={Route::Index.url_path()} class="site-brand">
                    <img src={Route::Icon.url_path()} alt="" width="32" height="32" />
                    {context.website_name.to_lowercase()}
                </a>
                <nav ariaLabel="Primary">
                    <ul>
                        #{CurrentPage::NAV_PAGES.iter().map(|page| html! { in bump;
                            <li>
                                <A href={page.url_path()} current={*page == current_page}>{page.name()}</A>
                            </li>
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    }
}

/// The colophon: what generated the page, when, and under what terms.
fn footer<'a>(context: ViewContext<'a>) -> Element<'a> {
    let bump = context.bump;
    let generated = context.generation_date;
    html! { in bump;
        <footer>
            <div class="frame">
                <p>
                    "generated by "
                    <A href={"https://github.com/philpax/philpax.github.io".to_string()}>"paxsite"</A>
                    " ("
                    <A href={Route::Credits.url_path()}>{copy::nav::CREDITS.to_lowercase()}</A>
                    ") on "
                    <time datetime={generated.to_rfc3339()}>{display_date(generated.date_naive())}</time>
                </p>
                <p>
                    "public domain under "
                    <A href={"https://creativecommons.org/public-domain/cc0/".to_string()} title={"Creative Commons 0".to_string()}>"CC0"</A>
                    ": do whatever you like!"
                </p>
            </div>
        </footer>
    }
}
