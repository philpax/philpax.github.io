use paxgen::{
    content::{Collection, Document},
    markdown, util,
};

pub fn post(
    collection: &Collection,
    document: &Document,
    use_description: bool,
) -> Vec<paxhtml::Element> {
    use paxhtml::builder::*;

    let mut post_body = markdown::convert_to_html(
        document
            .description
            .as_ref()
            .filter(|_| use_description)
            .unwrap_or(&document.content),
    );

    if use_description {
        post_body.push(p(a_simple(document.url(collection, false), "Read more")));
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
            h(
                2,
                false,
                a_simple(
                    document.url(collection, false),
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
        div(post_body).with_class("post-body"),
    ])
    .with_class("post");

    if use_description {
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
            h(2, false, text("Contents")),
            ul(heading_hierarchy.iter().map(build_list).collect::<Vec<_>>()),
        ]);

        vec![article, aside]
    }
}
