use paxhtml::bumpalo::Bump;

use super::*;

use crate::{
    markdown::MarkdownConverter,
    views::{
        components::{Link, LinkProps, Section, SectionProps, SectionTag},
        posts,
    },
};

/// Vertical/horizontal gap between the segments on the home page.
const SECTION_GAP: &str = "gap-3";

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;
    let list_88x31 = [
        ("philpax.png", "https://philpax.me"),
        ("ackwell.png", "https://ackwell.au"),
        ("arcanedisgea.png", "https://arcanedisgea.com"),
        ("blooym.webp", "https://blooym.dev"),
        ("lun4.gif", "https://l4.pm"),
        ("notnite.png", "https://notnite.com"),
        ("goatcorp.png", "https://goatcorp.github.io"),
        ("88x31.png", "https://eightyeightthirty.one"),
    ];

    layout(
        context,
        SocialMeta {
            title: None,
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Index.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_modified_time: None,
            article_tag: None,
            noindex: false,
            standard_site_uri: None,
        },
        CurrentPage::Home,
        html! { in bump;
            <div class={format!("flex flex-col {SECTION_GAP}")} id="home-page-columns">
                // about — serif prose
                <Section tag={SectionTag::Article} label={"about".to_string()} body_class={"post-body *:mb-4 break-words hyphens-auto".to_string()}>
                    {MarkdownConverter::new(context, Route::Index.url_path()).convert(&content.about.description, None)}
                </Section>

                <div class={format!("grid grid-cols-1 md:grid-cols-2 {SECTION_GAP}")}>
                    // posts — serif title links + mono daterows
                    <Section label={"posts".to_string()} body_class={"flex flex-col gap-5".to_string()}>
                        #{
                            content
                                .blog
                                .documents
                                .iter()
                                .filter(|d| !d.metadata.draft)
                                .take(5)
                                .map(|doc| posts::post(context, doc, posts::PostBody::Short))
                        }
                        <div class={format!("pt-1 text-sm {CODE_FONT_STYLE}")}>
                            <Link underline target={Route::Blog.url_path()}>"› all posts"</Link>
                        </div>
                    </Section>

                    // updates — dense mono changelog
                    <Section label={"updates".to_string()}>
                        <ul class={format!("list-none m-0 p-0 space-y-2 text-sm {CODE_FONT_STYLE}")}>
                        #{
                            content
                                .updates
                                .documents
                                .iter()
                                .filter(|d| !d.metadata.draft)
                                .map(|doc| update_doc_item(bump, doc))
                        }
                        </ul>
                        <div class={format!("pt-3 text-sm {CODE_FONT_STYLE}")}>
                            <Link underline target={Route::Updates.url_path()}>"› all updates"</Link>
                        </div>
                    </Section>
                </div>

                // links — 88x31 button wall
                <Section label={"links".to_string()} body_class={"flex flex-wrap items-center gap-1 [image-rendering:pixelated] justify-center md:justify-start".to_string()}>
                #{
                    list_88x31.iter().map(|(img, url)| html! { in bump;
                        <a href={url} class="block border border-wire">
                            <img src={format!("/88x31/{img}")} alt={img} class="block" />
                        </a>
                    })
                }
                </Section>
            </div>
        },
    )
}

fn update_doc_item<'bump>(bump: &'bump Bump, doc: &Document) -> paxhtml::Element<'bump> {
    let date_str = doc
        .metadata
        .datetime
        .map(|dt| dt.date_naive().to_string())
        .unwrap_or_default();
    html! { in bump;
        <li class="flex gap-2 items-baseline">
            <span class="text-dim flex-shrink-0">{date_str}</span>
            <Link underline target={doc.route_path().url_path()}>
                {doc.metadata.title.clone()}
            </Link>
        </li>
    }
}
