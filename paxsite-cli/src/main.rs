use create::create_content;
use edit::edit_content;
use inquire::Select;
use publish::{
    backfill_standard_site, check_standard_site, publish_content, publish_one_standard_site,
    update_publication,
};
use util::find_project_root;

mod atproto;
mod create;
mod edit;
mod notes;
mod publish;
mod util;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let root = find_project_root()?;

    // Non-interactive subcommand used by the pre-push hook: verifies every
    // non-draft blog/update post has an up-to-date standard.site record, exiting
    // non-zero (without prompting) if any are missing or stale.
    if std::env::args().nth(1).as_deref() == Some("check-standard-site") {
        return check_standard_site();
    }

    const CREATE: &str = "Create new content";
    const EDIT: &str = "Edit existing content";
    const PUBLISH: &str = "Publish a draft";
    const PUBLISH_ONE: &str = "Publish one post to standard.site";
    const BACKFILL: &str = "Backfill standard.site records";
    const UPDATE_PUBLICATION: &str = "Update standard.site publication";

    let action = Select::new(
        "What would you like to do?",
        vec![
            CREATE,
            EDIT,
            PUBLISH,
            PUBLISH_ONE,
            BACKFILL,
            UPDATE_PUBLICATION,
        ],
    )
    .prompt()?;

    match action {
        CREATE => create_content(&root)?,
        EDIT => edit_content(&root)?,
        PUBLISH => publish_content(&root).await?,
        PUBLISH_ONE => publish_one_standard_site(&root).await?,
        BACKFILL => backfill_standard_site(&root).await?,
        UPDATE_PUBLICATION => update_publication(&root).await?,
        _ => unreachable!(),
    }

    Ok(())
}
