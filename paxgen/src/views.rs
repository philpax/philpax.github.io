use crate::content::{Collection, Content, Document};

pub trait Views {
    fn post(&self, collection: &Collection, document: &Document) -> paxhtml::Document;
    fn index(&self, content: &Content) -> paxhtml::Document;
    fn tags(&self, content: &Content) -> paxhtml::Document;
    fn tag(&self, content: &Content, tag_id: &str) -> paxhtml::Document;
}

pub fn redirect(to_url: &str) -> paxhtml::Document {
    use paxhtml::builder::*;

    paxhtml::Document::new(html([
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
