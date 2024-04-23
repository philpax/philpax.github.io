use paxgen::{
    content::{Collection, Content, Document},
    html, util,
};

mod partials;

const ENABLE_STYLE_DEBUGGER: bool = true;

pub struct Views;
impl paxgen::Views for Views {
    fn post(&self, collection: &Collection, document: &Document) -> html::Document {
        layout(partials::post(collection, document, false))
    }

    fn index(&self, content: &Content) -> html::Document {
        let blog = content.collections.get("blog").unwrap();
        layout(
            blog.documents
                .iter()
                .flat_map(|doc| partials::post(blog, doc, true))
                .collect::<Vec<_>>(),
        )
    }

    fn tags(&self, content: &Content) -> html::Document {
        use html::builder::*;

        let mut tag_keys = content.tags.keys().collect::<Vec<_>>();
        tag_keys.sort();

        layout(article([
            header(h(2, false, a_simple("/tags", "Tags"))),
            div(ul(tag_keys
                .iter()
                .map(|tag| {
                    let post_count = content.tags[*tag].len();
                    li([
                        a_simple(format!("/tags/{tag}"), format!("#{tag}")),
                        text(format!(
                            " ({} {})",
                            post_count,
                            util::pluralize("post", post_count)
                        )),
                    ])
                })
                .collect::<Vec<_>>())),
        ]))
    }

    fn tag(&self, content: &Content, tag_id: &str) -> html::Document {
        use html::builder::*;

        layout(article([
            header(h(
                2,
                false,
                a_simple(format!("/tags/{tag_id}"), format!("Tags - #{tag_id}")),
            )),
            div(ul(content.tags[tag_id]
                .iter()
                .map(|t| {
                    let collection = &content.collections[&t.0];
                    let document = collection.document_by_id(&t.1).unwrap();

                    li(a_simple(
                        document.url(collection, false),
                        document.metadata.title.clone(),
                    ))
                })
                .collect::<Vec<_>>())),
        ]))
    }
}

fn layout(inner: impl html::builder::ToElements) -> html::Document {
    use html::builder::*;

    let links = [("/", "Blog"), ("/tags", "Tags"), ("/about", "About")];

    html::Document::new(html([
        head([
            title("Philpax"),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("name".into(), Some("viewport".into())),
                (
                    "content".into(),
                    Some("width=device-width, initial-scale=1".into()),
                ),
            ]),
            link("stylesheet", "/styles.css"),
            script("/website.js"),
        ]),
        body([
            header([
                img("/icon.png", "Philpax icon"),
                h(1, false, a_simple("/", "Philpax")),
                nav(ul(links
                    .iter()
                    .copied()
                    .map(|(url, label)| li(a_simple(url, label)))
                    .collect::<Vec<_>>())
                .with_id("header-links")),
            ]),
            main(inner.to_elements()),
            if ENABLE_STYLE_DEBUGGER {
                script("/style-debugger.js")
            } else {
                html::Element::Empty
            },
        ]),
    ]))
}
