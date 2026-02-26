---
description: Deep-dive competitive analysis against your Amazon competitors — sales, search share, keywords, and products
argument-hint: "[competitor brand name]"
---

# Competitive Report

Generate a competitive intelligence report against one or all tracked competitors.

## Workflow

### 1. Scope the analysis

Load `BRAND_PROFILE.md` (brand, category, competitors, domain). If an argument was provided, focus on that specific competitor. Otherwise, analyze all competitors from the profile.

Ask the user:
- "Do you want a full competitive landscape or a deep-dive on a specific competitor?"

If competitor isn't in the profile, use `get-brands-search` with `domain: <domain from BRAND_PROFILE.md>` to find them.

### 2. Competitive landscape (all competitors)

For user's brand and each competitor, pull in parallel:
- `get-brands-sales-performance-agg` with `category`, `domain: <domain from BRAND_PROFILE.md>` — revenue, units
- `get-clicks-share-agg` with `category`, `domain: <domain from BRAND_PROFILE.md>` — search share

Build a comparison table: brand, revenue, units, search share, avg price.

### 3. Trend comparison

- `get-brands-sales-performance` with `granularity: "monthly"` for each brand
- `get-clicks-share` with `granularity: "monthly"` for each brand
- Identify who is gaining momentum and who is losing ground

### 4. Keyword battleground

- `get-brands-top-keywords-agg` for user and each competitor
- Cross-reference to find: shared keywords (contested), competitor-only keywords (gaps), user-only keywords (advantages)
- For the top 5 contested keywords, `get-keywords-top-brands-agg` for detailed rankings

### 5. Product comparison

- `get-brands-top-products-agg` for each brand with `limit: 5`
- Compare portfolio breadth and best-seller strength
- For head-to-head products, compare `get-products-top-keywords` (time-series for trend data) or `get-products-top-keywords-agg` (for aggregated snapshots) to see keyword strategy differences.

### 6. Competitive discovery

- `get-brands-top-competitors-agg` for user's brand
- Flag any high-affinity brands NOT in the competitor list
- Briefly size them with `get-brands-sales-performance-agg`

### 7. Present the report

**Executive summary**: One paragraph on the competitive situation

**Market share table**: All brands, revenue, search share, trend

**Key battlegrounds**: Where competition is fiercest (keywords, products)

**Competitor profiles**: For each competitor — strengths, weaknesses, strategy signals

**Keyword gaps**: Where competitors win and you don't (ranked by opportunity)

**Threats & opportunities**: What to watch, what to act on

### Save to memory

1. Read CLAUDE.md settings. If "Auto-save reports" is true:
   a. Load the memory skill (`skills/memory/SKILL.md`)
   b. Run Save Report — resolve the target folder (working folder preferred, session folder as fallback), create `reports/YYYY-MM-DD-competitive-report/`, save `report.html` and `methodology.md`, update `memory/INDEX.md`
2. If auto-save is false, skip.

### Review (conditional)

1. Read CLAUDE.md "Review mode" setting.
2. If "always": invoke the review agent (`agents/review-agent.md`) on the `methodology.md` just created.
3. If "ask": prompt the user "Would you like me to review this analysis for methodology gaps?"
4. If "off": skip.

## Follow-up offers

- Generate a one-page competitive brief for leadership
- Deep-dive on a specific competitor
- Keyword gap analysis with action plan
- Product-level competitive comparison
