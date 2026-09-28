use paxhtml::bumpalo::Bump;

use super::*;

use crate::{
    content::DocumentType,
    markdown::MarkdownConverter,
    views::listings::{dated_list, summary_list},
};

pub fn index<'a>(context: ViewContext<'a>) -> paxhtml::Document<'a> {
    let bump = context.bump;
    let content = &context.content;
    // The Elsewhere buttons, in order, as `(image in static/88x31, site)`.
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

    let posts = content
        .blog
        .documents
        .iter()
        .filter(|d| !d.metadata.draft)
        .take(3);
    let updates: Vec<&Document> = content
        .updates
        .documents
        .iter()
        .filter(|d| !d.metadata.draft)
        .take(5)
        .collect();
    let notes = recent_notes(content, 5);
    let listening = most_listened(content, 5);

    layout(
        context,
        SocialMeta {
            description: Some(context.website_description.to_string()),
            image: Some(Route::Icon.abs_url(context.website_base_url)),
            url: Some(Route::Index.abs_url(context.website_base_url)),
            type_: Some("website".to_string()),
            ..Default::default()
        },
        CurrentPage::Home,
        html! { in bump;
            <div class="frame-narrow home-page stack">
                <section ariaLabel={copy::labels::INTRODUCTION}>
                    <h1>{copy::TAGLINE}</h1>
                    <div class="prose">
                        {MarkdownConverter::new(context, Route::Index.url_path()).convert_sectioned(&content.about.description)}
                    </div>
                </section>

                {section(bump, Section {
                    title: copy::home::RECENT_WRITING,
                    href: Some(Route::Blog.url_path()),
                    feed: Some(Route::BlogRss.url_path()),
                    section: Some("blog"),
                    tone: None,
                }, summary_list(context, posts, "5"))}

                {section(bump, Section {
                    title: copy::updates::TITLE,
                    href: Some(Route::Updates.url_path()),
                    feed: Some(Route::UpdatesRss.url_path()),
                    section: Some("updates"),
                    tone: None,
                }, dated_list(context, &updates))}

                {section(bump, Section {
                    title: copy::nav::NOTES,
                    href: Some(CurrentPage::Notes.url_path()),
                    feed: None,
                    section: Some("notes"),
                    tone: None,
                }, dated_list(context, &notes))}

                {(!listening.albums.is_empty()).then(|| section(bump, Section {
                    title: listening.title,
                    href: listening.href.clone(),
                    feed: None,
                    section: None,
                    tone: Some("listening"),
                }, listening_list(bump, &listening.albums)))}

                {section(bump, Section {
                    title: copy::home::ELSEWHERE,
                    href: None,
                    feed: None,
                    section: None,
                    tone: Some("elsewhere"),
                }, html! { in bump;
                    <ul class="button-list">
                        #{list_88x31.iter().map(|(img, url)| html! { in bump;
                            <li>
                                <a href={url}>
                                    <img src={format!("/88x31/{img}")} alt={host(url)} width="88" height="31" />
                                </a>
                            </li>
                        })}
                    </ul>
                })}
            </div>
        },
    )
}

// --- Private implementation details ---

/// The notes touched most recently, newest first.
fn recent_notes(content: &Content, count: usize) -> Vec<&Document> {
    let mut notes: Vec<&Document> = content
        .notes
        .documents
        .all_documents()
        .into_iter()
        // The notes section's own page is the index, not a note.
        .filter(|d| !d.id.is_empty())
        .collect();
    notes.sort_by_key(|d| std::cmp::Reverse(d.metadata.last_modified.or(d.metadata.datetime)));
    notes.truncate(count);
    notes
}

struct Listening {
    title: &'static str,
    /// The page the whole library is on.
    href: Option<String>,
    albums: Vec<ListenedAlbum>,
}

struct ListenedAlbum {
    artist: String,
    album: String,
    plays: u64,
}

/// What the listening block shows: the albums listened to most in the month
/// before the library was exported, or over the whole library if the export
/// has no recent plays, and the note that holds the library. All of the
/// block's data access is here.
fn most_listened(content: &Content, count: usize) -> Listening {
    let library = &content.music_library;
    let recent = library.has_recent_plays();
    let albums = library
        .most_listened(count)
        .into_iter()
        .map(|album| ListenedAlbum {
            artist: album.artist.clone(),
            album: album.album.clone(),
            plays: if recent {
                album.recent_plays
            } else {
                album.play_count()
            },
        })
        .collect();
    let title = if recent {
        copy::home::LISTENING_RECENT
    } else {
        copy::home::LISTENING_LIFETIME
    };

    let href = content
        .notes
        .documents
        .all_documents()
        .into_iter()
        .find(|d| {
            d.document_type == DocumentType::Note
                && (d.description_raw.contains("<MusicLibrary")
                    || d.rest_of_content_raw
                        .as_deref()
                        .is_some_and(|r| r.contains("<MusicLibrary")))
        })
        .map(|d| d.route_path().url_path());

    Listening {
        title,
        href,
        albums,
    }
}

struct Section<'s> {
    title: &'s str,
    /// The rest of the section, if it has more than the page shows.
    href: Option<String>,
    /// The section's RSS feed, if it has one.
    feed: Option<String>,
    section: Option<&'static str>,
    tone: Option<&'static str>,
}

/// A block of the front page: a heading in the section's colour, with links
/// to its feed and to the rest of it.
fn section<'a>(bump: &'a Bump, props: Section, children: Element<'a>) -> Element<'a> {
    let attrs = [
        props
            .section
            .map(|s| paxhtml::Attribute::new(bump, "data-section", s)),
        props
            .tone
            .map(|t| paxhtml::Attribute::new(bump, "data-tone", t)),
    ];
    let feed = props.feed;
    html! { in bump;
        <section {attrs.into_iter().flatten()}>
            <header>
                <h2>{props.title}</h2>
                {props.href.map(|href| html! { in bump;
                    <p>
                        {feed.map(|feed| html! { in bump; <a href={feed}>{copy::home::FEED}</a> })}
                        <A href={href}>{copy::home::ALL_SHORT}</A>
                    </p>
                })}
            </header>
            {children}
        </section>
    }
}

/// Stand-ins for cover art: the album's initials on one of the arc's solid
/// hues, so the row reads as a list of albums rather than of text.
const COVER_HUES: [&str; 5] = ["post", "update", "note", "tag", "credits"];

fn listening_list<'a>(bump: &'a Bump, albums: &[ListenedAlbum]) -> Element<'a> {
    html! { in bump;
        <ol class="listening-list">
            #{albums.iter().enumerate().map(|(i, album)| html! { in bump;
                <li>
                    <span class="listening-cover" ariaHidden="true" style={format!("--cover: var(--c-{}-solid)", COVER_HUES[i % COVER_HUES.len()])}>
                        {initials(&album.album)}
                    </span>
                    <span class="listening-album">
                        <span>{album.album.clone()}</span>
                        <span class="listening-artist">{album.artist.clone()}</span>
                    </span>
                    <span class="listening-plays">{copy::home::plays(album.plays)}</span>
                </li>
            })}
        </ol>
    }
}

/// Two letters for a title: the first letters of its first two words, or the
/// first two letters of a one-word title.
fn initials(title: &str) -> String {
    let words: Vec<&str> = title
        .split(|c: char| !c.is_alphanumeric())
        .filter(|w| !w.is_empty())
        .collect();
    let mark: String = match words.as_slice() {
        [] => title.to_string(),
        [word] => word.chars().take(2).collect(),
        [first, second, ..] => first
            .chars()
            .take(1)
            .chain(second.chars().take(1))
            .collect(),
    };
    mark.to_uppercase()
}

/// A site's host name, which is its button's alternative text.
fn host(url: &str) -> &str {
    let rest = url.split_once("://").map_or(url, |(_, rest)| rest);
    rest.split('/').next().unwrap_or(rest)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn initials_of_titles() {
        assert_eq!(initials("The Fragile"), "TF");
        assert_eq!(initials("LOTTERY"), "LO");
        assert_eq!(initials("Balance 020: Deetron"), "B0");
        assert_eq!(initials("Umineko no Naku Koro Ni"), "UN");
    }

    #[test]
    fn hosts_of_urls() {
        assert_eq!(host("https://l4.pm"), "l4.pm");
        assert_eq!(host("https://goatcorp.github.io/x"), "goatcorp.github.io");
    }
}
