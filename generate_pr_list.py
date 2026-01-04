#!/usr/bin/env python3
"""
Generate a Markdown document listing all PRs authored by philpax
from specified GitHub organizations/users.
"""

import json
import re
import subprocess
import sys
from collections import defaultdict
from datetime import datetime

AUTHOR = "philpax"
OWNERS = ["philpax", "jc2mp", "ferrobrew", "genresinspace"]
SINCE_DATE = "2024-11-03"
CACHE_FILE = "PR.json"
OUTPUT_FILE = "PR.md"


def fetch_prs(owner: str) -> list[dict]:
    """Fetch PRs authored by AUTHOR from the given owner."""
    cmd = [
        "gh", "search", "prs",
        f"--author={AUTHOR}",
        f"--owner={owner}",
        f"--created=>={SINCE_DATE}",
        "--limit=200",
        "--json=title,url,createdAt,closedAt,state,repository"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def is_public_repo(repo_name: str) -> bool:
    """Check if a repository is public."""
    cmd = ["gh", "repo", "view", repo_name, "--json=visibility", "-q", ".visibility"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0 and result.stdout.strip().lower() == "public"


def fetch_pr_diff_stats(pr_url: str) -> tuple[int, int]:
    """Fetch additions and deletions for a PR from its URL."""
    # Extract owner/repo and PR number from URL
    match = re.match(r"https://github.com/([^/]+/[^/]+)/pull/(\d+)", pr_url)
    if not match:
        return (0, 0)
    repo, pr_number = match.groups()
    cmd = ["gh", "api", f"repos/{repo}/pulls/{pr_number}", "--jq", "[.additions, .deletions]"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        return (0, 0)
    additions, deletions = json.loads(result.stdout)
    return (additions, deletions)


def parse_date(date_str: str) -> datetime | None:
    """Parse ISO date string to datetime."""
    if not date_str or date_str == "0001-01-01T00:00:00Z":
        return None
    return datetime.fromisoformat(date_str.replace("Z", "+00:00"))


def format_date(dt: datetime) -> str:
    """Format datetime as 'Month Day, Year'."""
    return dt.strftime("%B %-d, %Y")


def format_date_range(created: datetime, closed: datetime | None, state: str) -> str:
    """Format the date range for display, eliding shared components."""
    created_str = format_date(created)

    if state == "open":
        return f"{created_str} - present"

    if closed and closed.date() != created.date():
        if created.year == closed.year:
            if created.month == closed.month:
                # Same month and year: "November 8-12, 2025"
                return f"{created.strftime('%B')} {created.day}-{closed.day}, {created.year}"
            else:
                # Same year, different month: "November 9 - December 14, 2025"
                return f"{created.strftime('%B')} {created.day} - {closed.strftime('%B')} {closed.day}, {created.year}"
        else:
            # Different year: full dates
            return f"{created_str} - {format_date(closed)}"

    return created_str


def fetch_all_pr_data() -> dict[str, list[dict]]:
    """Fetch all PR data from GitHub and return grouped by repo."""
    all_prs = []

    for owner in OWNERS:
        prs = fetch_prs(owner)
        all_prs.extend(prs)

    # Group by repository
    repos: dict[str, list[dict]] = defaultdict(list)
    for pr in all_prs:
        repo_name = pr["repository"]["nameWithOwner"]
        repos[repo_name].append(pr)

    # Filter out private repos
    public_repos = {name: prs for name, prs in repos.items() if is_public_repo(name)}

    # Sort PRs within each repo by creation date (oldest first)
    for repo_prs in public_repos.values():
        repo_prs.sort(key=lambda p: p["createdAt"])

    # Fetch diff stats for all PRs
    total_prs = sum(len(prs) for prs in public_repos.values())
    print(f"Fetching diff stats for {total_prs} PRs...", file=sys.stderr)
    pr_count = 0
    for repo_prs in public_repos.values():
        for pr in repo_prs:
            pr_count += 1
            print(f"\r  {pr_count}/{total_prs}", end="", file=sys.stderr)
            additions, deletions = fetch_pr_diff_stats(pr["url"])
            pr["additions"] = additions
            pr["deletions"] = deletions
    print(file=sys.stderr)

    return public_repos


def load_cached_data() -> dict[str, list[dict]] | None:
    """Load PR data from cache file if it exists."""
    try:
        with open(CACHE_FILE) as f:
            return json.load(f)
    except FileNotFoundError:
        return None


def save_cached_data(data: dict[str, list[dict]]) -> None:
    """Save PR data to cache file."""
    with open(CACHE_FILE, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Cached data to {CACHE_FILE}", file=sys.stderr)


def generate_markdown(repos: dict[str, list[dict]]) -> str:
    """Generate markdown output from PR data."""
    # Sort repos by their first (oldest) PR's creation date
    sorted_repos = sorted(repos.items(), key=lambda x: x[1][0]["createdAt"])

    lines = []
    for repo_name, prs in sorted_repos:
        lines.append(f"# [{repo_name}](https://github.com/{repo_name})")
        for pr in prs:
            title = pr["title"]
            url = pr["url"]
            created = parse_date(pr["createdAt"])
            closed = parse_date(pr["closedAt"])
            state = pr["state"]
            additions = pr["additions"]
            deletions = pr["deletions"]

            date_range = format_date_range(created, closed, state)
            lines.append(f"- [{title}]({url}) ({date_range}, <DiffStats add={additions} sub={deletions} />)")
        lines.append("")

    return "\n".join(lines)


def main():
    refresh = "--refresh" in sys.argv

    # Load from cache or fetch fresh data
    if refresh or (data := load_cached_data()) is None:
        print("Fetching PR data from GitHub...", file=sys.stderr)
        data = fetch_all_pr_data()
        save_cached_data(data)
    else:
        print(f"Using cached data from {CACHE_FILE}", file=sys.stderr)

    # Generate and write markdown
    markdown = generate_markdown(data)
    with open(OUTPUT_FILE, "w") as f:
        f.write(markdown)

    total_prs = sum(len(prs) for prs in data.values())
    print(f"Generated {OUTPUT_FILE} with {total_prs} PRs across {len(data)} public repositories")


if __name__ == "__main__":
    main()
