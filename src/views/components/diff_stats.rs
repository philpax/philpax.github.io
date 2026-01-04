use paxhtml::bumpalo::Bump;
use paxhtml::html;

/// Renders diff statistics as +add/-sub with colored styling.
pub fn diff_stats<'bump>(bump: &'bump Bump, add: u32, sub: u32) -> paxhtml::Element<'bump> {
    html! { in bump;
        <span class="font-mono text-sm">
            <span class="bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-300 px-1 rounded-l">
                {format!("+{add}")}
            </span>
            <span class="bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-300 px-1 rounded-r">
                {format!("-{sub}")}
            </span>
        </span>
    }
}
