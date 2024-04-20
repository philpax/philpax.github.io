use crate::{
    content::{Collection, Content, Document},
    html,
};

pub trait Views {
    fn post(&self, collection: &Collection, document: &Document) -> html::Document;
    fn index(&self, content: &Content) -> html::Document;
    fn tags(&self, content: &Content) -> html::Document;
    fn tag(&self, content: &Content, tag_id: &str) -> html::Document;
}

pub fn redirect(to_url: &str) -> html::Document {
    use html::builder::*;

    html::Document::new(html([
        head([
            title("Redirecting..."),
            meta([("charset".into(), Some("utf-8".into()))]),
            meta([
                ("http-equiv".into(), Some("refresh".into())),
                ("content".into(), Some(format!("0; url={}", to_url))),
            ]),
        ]),
        body([
            p(text("Redirecting...")),
            p(a(
                to_url,
                Some("Click here if you are not redirected"),
                text("Click here"),
            )),
        ]),
    ]))
}
