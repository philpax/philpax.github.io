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
        &(match post_body {
            PostBody::Full => None,
            PostBody::Description => document.description.clone(),
            PostBody::Short => document.metadata.short(),
        })
        .unwrap_or(document.content.clone()),
    );

    if post_body == PostBody::Description {
        post_body_html.push(p(a_simple(document.url(collection, None), "Read more")));
    }

    let tag_list = match document.metadata.taxonomies.as_ref().map(|t| &t.tags) {
        Some(tags) => ul(tags
            .iter()
            .map(|tag| li(a_simple(format!("/tags/{tag}"), format!("#{tag}"))))
            .collect::<Vec<_>>())
        .with_attrs([("class".into(), Some("tags".into()))]),
        None => paxhtml::Element::Empty,
    };

    let article = article([
        header([
            h2(
                false,
                a_simple(
                    document.url(collection, None),
                    document.metadata.title.clone(),
                ),
            ),
            tag_list,
            document
                .metadata
                .datetime()
                .map(|dt| dt.date_naive())
                .map(date)
                .unwrap_or_default(),
        ]),
        div(post_body_html).with_class("post-body"),
    ])
    .with_class("post");

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

            li(if children.is_empty() {
                vec![link]
            } else {
                let children = children.iter().map(build_list).collect::<Vec<_>>();
                vec![link, ul(children)]
            })
        }

        let aside = aside([
            h2(false, text("Contents")),
            ul(heading_hierarchy.iter().map(build_list).collect::<Vec<_>>()),
        ]);

        vec![article, aside]
    }
}
