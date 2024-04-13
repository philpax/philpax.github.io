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
            [a(
                &document.url(collection, false),
                Some("Read more"),
                [text("Read more")],
            )],
        ));
    }

    article(
        [],
        [
            header(
                [],
                [
                    h(
                        1,
                        [],
                        [a(
                            &document.url(collection, false),
                            Some(&document.metadata.title),
                            [text(&document.metadata.title)],
                        )],
                    ),
                    document
                        .metadata
                        .datetime()
                        .map(datetime)
                        .unwrap_or_default(),
                ],
            ),
            section([], post_body),
        ],
    )
}
