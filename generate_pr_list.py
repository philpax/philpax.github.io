#!/usr/bin/env python3
"""
Generate a Markdown document listing all PRs authored by philpax
from specified GitHub organizations/users.
"""

import json
import subprocess
from collections import defaultdict
from datetime import datetime

AUTHOR = "philpax"
OWNERS = ["philpax", "jc2mp", "ferrobrew", "genresinspace"]
SINCE_DATE = "2024-11-03"
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


def parse_date(date_str: str) -> datetime | None:
    """Parse ISO date string to datetime."""
    if not date_str or date_str == "0001-01-01T00:00:00Z":
        return None
    return datetime.fromisoformat(date_str.replace("Z", "+00:00"))


def format_date(dt: datetime) -> str:
    """Format datetime as 'Month Day, Year'."""
    return dt.strftime("%B %-d, %Y")


def format_date_range(created: datetime, closed: datetime | None, state: str) -> str:
    """Format the date range for display."""
    created_str = format_date(created)

    if state == "open":
        return f"{created_str} - present"

    if closed and closed.date() != created.date():
        return f"{created_str} - {format_date(closed)}"

    return created_str


def main():
    all_prs = []

    for owner in OWNERS:
        prs = fetch_prs(owner)
        all_prs.extend(prs)

    # Group by repository
    repos: dict[str, list[dict]] = defaultdict(list)
    for pr in all_prs:
        repo_name = pr["repository"]["nameWithOwner"]
        repos[repo_name].append(pr)

    # Sort PRs within each repo by creation date (oldest first)
    for repo_prs in repos.values():
        repo_prs.sort(key=lambda p: p["createdAt"])

    # Sort repos by their first (oldest) PR's creation date
    sorted_repos = sorted(repos.items(), key=lambda x: x[1][0]["createdAt"])

    # Generate markdown
    lines = []
    for repo_name, prs in sorted_repos:
        lines.append(f"# {repo_name}")
        for pr in prs:
            title = pr["title"]
            url = pr["url"]
            created = parse_date(pr["createdAt"])
            closed = parse_date(pr["closedAt"])
            state = pr["state"]

            date_range = format_date_range(created, closed, state)
            lines.append(f"- [{title}]({url}) ({date_range})")
        lines.append("")

    # Write output
    with open(OUTPUT_FILE, "w") as f:
        f.write("\n".join(lines))

    print(f"Generated {OUTPUT_FILE} with {len(all_prs)} PRs across {len(repos)} repositories")


if __name__ == "__main__":
    main()
