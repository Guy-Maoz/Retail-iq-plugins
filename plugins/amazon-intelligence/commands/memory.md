---
description: Browse your analysis history — view past reports, methodology logs, and review results
argument-hint: "[list | show <date-or-command> | review <date-or-command> | clean]"
---

# Memory

Browse and manage your analysis history.

## Workflow

### 0. Resolve target folder

Resolve the **target folder** using the logic in `skills/memory/SKILL.md` → "Resolve target folder". Use the working folder if available, otherwise fall back to the session folder. All paths below (memory/, reports/, CLAUDE.md, BRAND_PROFILE.md) are relative to the target folder.

### 1. Determine action

Based on argument:
- **No argument** or **"list"**: Show analysis history
- **"show \<date-or-command\>"**: Show a specific report's methodology
- **"review \<date-or-command\>"**: Run the review agent on a past report
- **"clean"**: Clean up old reports

### 2A. List analysis history (default)

Load `memory/INDEX.md` from the target folder.

If the file doesn't exist: "No analysis history found. Run any analysis command (e.g., /competitive-report) to start building your history."

If it exists, present the index table. Highlight:
- Total number of analyses
- Date range covered
- Any unreviewed reports
- Any reports with gaps found

### 2B. Show a specific report

Find the matching report folder in `reports/` by date, command name, or both:
- `/memory show 2026-02-26` → finds all reports from that date
- `/memory show competitive-report` → finds the most recent competitive-report
- `/memory show 2026-02-26-competitive-report` → exact match

Load and present the `methodology.md` from the matched folder. If a review section exists, include it.

If multiple matches, list them and ask the user to pick.

### 2C. Review a past report

Find the matching report folder (same matching logic as show).

Load the report's `methodology.md`. Invoke the review agent (`agents/review-agent.md`) on it, passing:
- The methodology.md content
- `BRAND_PROFILE.md` from the target folder
- Review scope from CLAUDE.md settings

The review agent appends its findings to the methodology.md and updates `memory/INDEX.md`.

### 2D. Clean up old reports

Read CLAUDE.md for the "Report retention" setting (default: 6 months).

Scan `reports/` directory for folders older than the retention period. List them and ask the user:
- "Found X reports older than 6 months. Delete them? (yes/no/select specific ones)"

For each deleted report folder, also remove its row from `memory/INDEX.md`.

## Output format

For the list view, present as a formatted table. For show/review, present the full methodology content. Always include actionable suggestions (e.g., "Run `/memory review 2026-02-25` to audit this report").
