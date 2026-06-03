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
pub mod frontpage;
pub mod notes;
pub mod posts;
pub mod tags;
pub mod updates;

pub mod components;
use components::{IsoDatetime, IsoDatetimeProps, Link, LinkProps};

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
            CurrentPage::Notes => Route::Note { note_id: vec![] }.url_path(),
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
pub const CODE_FONT_STYLE: &str = "font-['Iosevka',monospace]";

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
    let generation_date_element =
        html! { in bump; <IsoDatetime datetime={context.generation_date} /> };
    let standard_site_uri = meta.standard_site_uri.clone();
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
                    <script>{r#"(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.classList.add(t);})()"#}</script>
                    <link rel="stylesheet" href={Route::Styles.url_path()} />
                    <script src={Route::Scripts.url_path()}></script>
                </head>
                <body class={format!("max-w-[var(--body-max-width)] mx-auto text-[var(--color)] {FONT_STYLE} px-[var(--body-padding)] py-2 transition-colors duration-200")}>
                    <header class="my-2">
                        // Status / command bar: mono wordmark + faux readout + bracketed nav.
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-2">
                            <div class="flex items-center gap-3 min-w-0">
                                <img src={Route::Icon.url_path()} alt={format!("{} icon", context.website_author)} class="aspect-square h-8 w-8 border border-[var(--wire)] [image-rendering:auto]" />
                                <span class={format!("wordmark text-xl font-bold {CODE_FONT_STYLE}")}>
                                    <span ariaHidden="true" class="text-[var(--dim)]">"// "</span>
                                    {context.website_author}
                                </span>
                            </div>
                            <nav ariaLabel="Primary">
                                <ul id="header-links" class={format!("list-none m-0 p-0 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-end {CODE_FONT_STYLE}")}>
                                #{
                                    CurrentPage::ALL_PAGES.iter().map(|page| {
                                        let is_active = *page == current_page;
                                        let class = if is_active { "nav-link active text-center" } else { "nav-link text-center" };
                                        let aria_current = is_active.then(|| paxhtml::Attribute::new(bump, "aria-current", "page")).into_iter();
                                        html! { in bump;
                                            <li>
                                                <a href={page.url_path()} class={class} {aria_current}>{page.name().to_lowercase()}</a>
                                            </li>
                                        }
                                    })
                                }
                                </ul>
                            </nav>
                        </div>
                    </header>
                    <main>{inner}</main>
                    <footer class={format!("mt-8 mb-4 pt-3 border-t border-[var(--wire)] text-xs text-[var(--dim)] leading-relaxed {CODE_FONT_STYLE}")}>
                        <div ariaHidden="true" class="text-[var(--phosphor)]">"; EOF"</div>
                        <div>
                            "rss: "
                            <Link underline target={Route::BlogRss.url_path()}>
                                "blog"
                            </Link>
                            " · "
                            <Link underline target={Route::UpdatesRss.url_path()}>
                                "updates"
                            </Link>
                        </div>
                        <div>
                            "generated by "
                            <Link underline target={"https://github.com/philpax/philpax.github.io"}>
                                "paxsite"
                            </Link>
                            " on "
                            {generation_date_element}
                            "."
                        </div>
                        <div>
                            <Link underline title={"Creative Commons 0".to_string()} target={"https://creativecommons.org/public-domain/cc0/"}>
                                "cc0"
                            </Link>" / public domain. do whatever you like! "
                            <Link underline target={Route::Credits.url_path()}>
                                "credits"
                            </Link>"."
                        </div>
                    </footer>
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
