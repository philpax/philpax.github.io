use super::*;
use crate::views::document;

pub fn note<'a>(context: ViewContext<'a>, note: &Document) -> paxhtml::Document<'a> {
    let display_path = &note.display_path;

    let description = if note.rest_of_content.is_none() {
        panic!(
            "Can't extract description; no rest of content for {:?}",
            note.id
        )
    } else {
        note.description.to_string()
    };

    let og_image_url = format!("{}{}", context.website_base_url, note.og_image_path());

    layout(
        context,
        SocialMeta {
            title: Some(display_path.last().unwrap().to_string()),
            description: Some(description),
            image: Some(og_image_url.clone()),
            url: Some(Route::Note { note_id: vec![] }.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            twitter_card: Some("summary_large_image".to_string()),
            twitter_image: Some(og_image_url),
            article_modified_time: note.metadata.datetime,
            ..Default::default()
        },
        CurrentPage::Notes,
        document::page(context, note),
    )
}
