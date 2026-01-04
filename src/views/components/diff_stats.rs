use paxhtml::bumpalo::Bump;
use paxhtml::html;

/// Renders diff statistics as +add/-sub with colored styling.
pub fn diff_stats<'bump>(bump: &'bump Bump, add: u32, sub: u32) -> paxhtml::Element<'bump> {
    html! { in bump;
        <span class="font-mono text-sm">
            <span class="bg-green-800/20 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1 rounded-l">
                {format!("+{add}")}
            </span>
            <span class="bg-red-800/20 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-1 rounded-r">
                {format!("-{sub}")}
            </span>
        </span>
    }
}
