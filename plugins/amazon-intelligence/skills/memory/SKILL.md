---
name: memory
description: Memory management for Amazon Intelligence. Handles saving analysis reports with methodology audit trails, managing the analysis index, and reading/writing plugin settings in the working folder's CLAUDE.md. Use when any command needs to save results, log methodology, read past analyses, or manage settings. Also use when the user asks about past reports, analysis history, or plugin settings.
---

# Memory Management

Manage analysis reports, methodology logs, the analysis index, and plugin settings. All runtime data lives in the **working folder** (the Cowork project directory), never in the plugin itself.

## File layout (in the working folder)

```
working-folder/
  CLAUDE.md                          # Project settings (already exists in Cowork)
  BRAND_PROFILE.md                   # Brand identity (written by /setup)
  memory/
    INDEX.md                         # Analysis run log (newest first)
  reports/
    YYYY-MM-DD-<command-name>/       # One folder per analysis run
      report.html                    # The dashboard output
      methodology.md                 # Audit trail: scope, API calls, findings, gaps
```

## Settings management (CLAUDE.md)

The working folder's CLAUDE.md is loaded automatically by Cowork each session. The plugin manages an `## Amazon Intelligence Settings` section within it.

### Settings block format

```markdown
## Amazon Intelligence Settings

### Memory
- **Auto-save reports**: true
- **Report retention**: 6 months

### Review Agent
- **Review mode**: ask
- **Review scope**: methodology, data-coverage, assumptions

### Analysis Defaults
- **Default date range**: last 6 months
- **Granularity**: monthly
```

### Read settings

1. Load the working folder's `CLAUDE.md`
2. Find the `## Amazon Intelligence Settings` section
3. Parse values from the markdown list items
4. If the section doesn't exist, use defaults: auto-save true, review mode ask, retention 6 months

### Write settings

During `/setup`, append or update the `## Amazon Intelligence Settings` section in CLAUDE.md. If the section already exists, replace it. If CLAUDE.md has other content, preserve it — only touch the settings section.

### Update a single setting

To change one value (e.g., review mode from "ask" to "always"), read CLAUDE.md, find the specific line, update the value, write back. Do not alter other sections.

## Save Report operation

Called at the end of every analysis command when auto-save is true.

### Steps

1. Read CLAUDE.md settings — check if "Auto-save reports" is true. If false, skip entirely.
2. Determine the report folder name: `reports/YYYY-MM-DD-<command-name>/`
   - If the folder already exists (same command run twice today), append a counter: `-2`, `-3`, etc.
3. Create the report folder in the working directory.
4. Save the HTML dashboard as `report.html` in that folder.
5. Generate `methodology.md` in that folder (see format below).
6. Append an entry to `memory/INDEX.md` (create the `memory/` directory and INDEX.md if they don't exist — see Initialize memory).
7. Present the user with a confirmation: "Report saved to `reports/YYYY-MM-DD-<command>/`"

### methodology.md format

```markdown
# Methodology: <Command Name>

**Date**: YYYY-MM-DD | **Command**: /<command-name> | **Arguments**: <any arguments>
**Brand**: <brand name> | **Period**: <start_date> to <end_date> | **Marketplace**: <domain>

## Scope & Assumptions

- <Why this scope was chosen — e.g., "User requested full competitive analysis" or "Default: all tracked competitors">
- <Date range rationale — e.g., "Used default 6-month range from settings" or "User specified Q4 2025">
- <Any data limitations — e.g., "Competitor X returned no data for December 2025">

## API Calls Made

| # | Tool | Key Parameters | Purpose | Result Summary |
|---|------|---------------|---------|----------------|
| 1 | get-brands-sales-performance-agg | brand: Anker, category: 679255011, domain: amazon.com | Brand revenue snapshot | $2.4M revenue, 45K units |
| 2 | get-clicks-share-agg | brand: Anker, category: 679255011 | Search share | 8.7% clicks share |
| ... | ... | ... | ... | ... |

## Data Flow

<Brief narrative of how the data was processed>

- Pulled brand sales data → compared against category growth rate → identified outperformance/underperformance
- Cross-referenced keyword portfolios for brand vs 3 competitors → found 15 gap keywords
- Scored gaps using volume + competition + trend → classified into quick wins / strategic plays / long shots

## Key Findings

1. <Finding that made it into the report>
2. <Finding that made it into the report>
3. <Finding that made it into the report>

## Potential Gaps / Limitations

- <What was NOT analyzed that could be relevant — e.g., "Only top 50 keywords checked; more may exist">
- <Data quality caveats — e.g., "One competitor had incomplete monthly data">
- <Competitors or ASINs not included — e.g., "2 competitors in BRAND_PROFILE.md were not analyzed due to no data">
```

### What each command logs in methodology.md

| Command | Scope section notes | Typical API calls count |
|---------|-------------------|------------------------|
| /market-overview | Category analyzed, brand positioning context | 5-8 calls |
| /competitive-report | Which competitors, head-to-head or full set | 10-20 calls |
| /keyword-intel | Portfolio / specific keyword / gaps / ASIN drivers | 5-15 calls |
| /product-performance | Single ASIN / portfolio / competitor products | 5-12 calls |
| /brand-monitor | Time period, alert thresholds applied | 12-25 calls |

## memory/INDEX.md format

```markdown
# Analysis Index

> Log of all analysis runs in this project. Newest first.

| Date | Command | Scope | Report | Methodology | Review |
|------|---------|-------|--------|-------------|--------|
```

Each row links to the report folder using relative paths:

```markdown
| 2026-02-26 | /competitive-report | All 5 competitors | [report](../reports/2026-02-26-competitive-report/report.html) | [log](../reports/2026-02-26-competitive-report/methodology.md) | Reviewed ✓ |
| 2026-02-25 | /brand-monitor | Last 3 months | [report](../reports/2026-02-25-brand-monitor/report.html) | [log](../reports/2026-02-25-brand-monitor/methodology.md) | Skipped |
```

Review column values:
- `Pending` — report saved but not reviewed
- `Reviewed ✓` — review agent ran and passed
- `Reviewed — gaps found` — review agent found issues
- `Skipped` — review was off or user declined

## Read operations

### Read Index

Load `memory/INDEX.md` to show the user their analysis history. Present as a formatted table.

### Read Methodology

Load a specific report's `methodology.md` by finding the matching folder in `reports/`. Match by date, command name, or both.

### Compare Runs

Load two methodology files side-by-side. Useful for comparing scope, findings, or API coverage between two runs of the same command.

## Initialize memory

When any Save Report operation runs and `memory/INDEX.md` does not exist:

1. Create the `memory/` directory in the working folder
2. Create `memory/INDEX.md` with the empty table header template
3. Proceed with the save operation

This makes the memory system self-bootstrapping — no separate initialization command needed beyond `/setup`.

## Review trigger

After saving a report, check the "Review mode" setting in CLAUDE.md:
- **always**: Automatically invoke the review agent (`agents/review-agent.md`) on the methodology.md just created
- **ask**: Prompt the user: "Would you like me to review this analysis for methodology gaps?"
- **off**: Skip review entirely

## Brand profile template

The brand profile template is stored at `skills/memory/references/brand-profile-template.md`. The `/setup` command reads this template and writes the populated version as `BRAND_PROFILE.md` in the working folder.
