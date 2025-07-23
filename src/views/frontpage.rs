use super::*;

use crate::{
    markdown::MarkdownConverter,
    views::{components, posts},
};

pub fn index(context: ViewContext) -> paxhtml::Document {
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
            image: Some(Route::Icon.route_path().abs_url(context.website_base_url)),
            url: Some(Route::Index.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: None,
            twitter_image: None,
            article_published_time: None,
            article_tag: None,
        },
        html! {
            <div class="block md:grid md:grid-cols-2 md:auto-rows-fr md:gap-0 md:items-stretch" id="home-page-columns">
                <article class="border-b border-dotted border-[var(--color)] md:border-r md:border-b-0 md:pr-4 md:pb-0 md:mb-0 break-words hyphens-auto h-full">
                    <div class="post-body p-0 *:mb-4">
                        {MarkdownConverter::new(context.syntax).convert(&content.about.description, None)}
                    </div>
                </article>
                <div class="h-full md:pl-4 *:mb-6 mt-4 md:mt-0">
                    <div>
                        <h3 class="text-3xl font-bold mb-2 italic">
                            {components::link(false, None, Route::Blog.url_path(), "", "posts".into())}
                        </h3>
                        <div class="*:mb-6">
                        #{
                            content
                                .blog
                                .documents
                                .iter()
                                .take(5)
                                .map(|doc| posts::post(context, doc, posts::PostBody::Short))
                        }
                        </div>
                    </div>

                    <div class="mt-4 border-t border-dotted border-[var(--color)] pt-4">
                        <h3 class="text-3xl font-bold mb-2 italic">
                            {components::link(false, None, Route::Updates.url_path(), "", "updates".into())}
                        </h3>
                        <ul class="list-none m-0 p-0 space-y-1">
                        #{
                            content
                                .updates
                                .documents
                                .iter()
                                .take(5)
                                .map(update_doc_item)
                        }
                        </ul>
                    </div>

                    <div class="mt-4 border-t border-dotted border-[var(--color)] pt-4 flex flex-wrap gap-1 [image-rendering:pixelated] justify-center md:justify-start" id="list-88x31">
                    #{
                        list_88x31.iter().map(|(img, url)| html! {
                            <a href={url}>
                                <img src={format!("/88x31/{img}")} alt={img} />
                            </a>
                        })
                    }
                    </div>
                </div>
            </div>
        },
    )
}

fn update_doc_item(doc: &Document) -> paxhtml::Element {
    let date_str = doc
        .metadata()
        .datetime()
        .map(|dt| dt.date_naive().to_string())
        .unwrap_or_default();
    html! {
        <li>
            <span class="text-[var(--color-secondary)]">{date_str}": "</span>
            {components::link(false, None, doc.route_path().url_path(), "", doc.metadata().title.clone().into())}
        </li>
    }
}
