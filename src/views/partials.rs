use crate::{
    content::{Collection, Document},
    markdown, util,
};

#[derive(Copy, Clone, PartialEq, Eq)]
pub enum PostBody {
    Full,
    Description,
    Short,
}

pub fn post(
    collection: &Collection,
    document: &Document,
    post_body: PostBody,
) -> Vec<paxhtml::Element> {
    use paxhtml::builder::*;

    let mut post_body_html = markdown::convert_to_html(
        &match post_body {
            PostBody::Full => None,
            PostBody::Description => document.description.clone(),
            PostBody::Short => document.metadata.short(),
        }
        .unwrap_or(document.content.clone()),
    );

    if post_body == PostBody::Description {
        post_body_html.push(p([])(a_simple(document.url(collection, None), "Read more")));
    }

    let tag_list = document
        .metadata
        .taxonomies
        .as_ref()
        .map(|t| &t.tags)
        .map(|tags| {
            ul([("class".into(), Some("tags".into()))])(
                tags.iter()
                    .map(|tag| li([])(a_simple(format!("/tags/{tag}"), format!("#{tag}"))))
                    .collect::<Vec<_>>(),
            )
        })
        .unwrap_or_default();

    let article = article([("class".into(), Some("post".into()))])([
        header([])([
            h2(a_simple(
                document.url(collection, None),
                document.metadata.title.clone(),
            )),
            tag_list,
            document
                .metadata
                .datetime()
                .map(|dt| dt.date_naive())
                .map(date)
                .unwrap_or_default(),
        ]),
        div([("class".into(), Some("post-body".into()))])(post_body_html),
    ]);

    if post_body != PostBody::Full {
        vec![article]
    } else {
        let heading_hierarchy = markdown::heading_hierarchy(&document.content);
        if heading_hierarchy.is_empty() {
            return vec![article];
        }

        fn build_list(hierarchy: &markdown::HeadingHierarchy) -> paxhtml::Element {
            let markdown::HeadingHierarchy(text, children) = hierarchy;
            let link = a_simple(format!("#{}", util::slugify(text)), text);

            li([])(if children.is_empty() {
                vec![link]
            } else {
                let children = children.iter().map(build_list).collect::<Vec<_>>();
                vec![link, ul([])(children)]
            })
        }

        let aside = aside([])([
            h2("Contents"),
            ul([])(heading_hierarchy.iter().map(build_list).collect::<Vec<_>>()),
        ]);

        vec![article, aside]
    }
}
