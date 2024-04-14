use crate::{content, html, markdown};

pub fn post(
    collection: &content::Collection,
    document: &content::Document,
    use_description: bool,
) -> html::Element {
    use html::builder::*;

    let mut post_body = markdown::convert_to_html(
        document
            .description
            .as_ref()
            .filter(|_| use_description)
            .unwrap_or(&document.content),
    );

    if use_description {
        post_body.push(p(
            [],
            [a_simple(&document.url(collection, false), "Read more")],
        ));
    }

    let tag_list = match document.metadata.taxonomies.as_ref().map(|t| &t.tags) {
        Some(tags) => ul(
            [("class".into(), Some("tags".into()))],
            tags.iter()
                .map(|tag| li([], [text(format!("#{tag}"))]))
                .collect::<Vec<_>>(),
        ),
        None => html::Element::Empty,
    };

    article(
        [],
        [
            header(
                [],
                [
                    h(
                        2,
                        [],
                        [a_simple(
                            &document.url(collection, false),
                            &document.metadata.title,
                        )],
                    ),
                    document
                        .metadata
                        .datetime()
                        .map(datetime)
                        .unwrap_or_default(),
                    tag_list,
                ],
            ),
            div([], post_body),
        ],
    )
}
