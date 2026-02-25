---
name: keyword-strategy
description: Amazon on-site search keyword intelligence using SimilarWeb Shopper Intelligence. Discover high-value keywords, analyze search trends, find keyword gaps, and identify which brands and products win on specific search terms. Use when the user asks about keywords, search terms, Amazon SEO, search share, keyword opportunities, or what shoppers are searching for.
---

# Keyword Strategy

Analyze Amazon on-site search keywords using SimilarWeb Shopper Intelligence. Always load `BRAND_PROFILE.md` first for brand/category context.

## Core analyses

### Brand keyword portfolio

Map the user's keyword footprint on Amazon.

1. Read `BRAND_PROFILE.md` for brand and category
2. Call `get-brands-top-keywords-agg` with `brand`, `category`, `domain: "amazon.com"`, `limit: 50`
3. Present top keywords ranked by search clicks share
4. Classify keywords: branded (contain brand name) vs generic vs competitor-branded

### ASIN keyword drivers

Understand what search terms drive traffic to specific products.

1. For each ASIN from `BRAND_PROFILE.md`, call `get-products-top-keywords` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date` for trend data, or `get-products-top-keywords-agg` for an aggregated snapshot.
2. Present keywords ranked by clicks share
3. Identify high-volume keywords where the ASIN has low share (optimization opportunities)
4. Identify low-volume long-tail keywords with high share (defend these)

### Category keyword landscape

Discover what shoppers in the category are searching for and spot coverage gaps.

1. Call `get-categories-top-keywords-agg` with `category`, `domain: "amazon.com"`, `limit: 50`, `start_date`, `end_date`
2. Compare against user's brand keywords (from "Brand keyword portfolio" above) — flag keywords where user has no presence
3. Calculate category keyword coverage: what percentage of the top 50 category keywords does the user's brand appear in?
4. List the top 10 gap keywords (category keywords where user has no presence), ranked by category search share

**For deep gap analysis**: This section provides a quick coverage overview. For comprehensive gap analysis including competitor comparisons, ASIN-level gaps, trend scoring, and prioritized action plans, load `skills/keyword-gap/SKILL.md`. Offer the user: "I found [X] category keywords where you have no presence. Want me to run a full keyword gap analysis to prioritize these and also check competitor-specific gaps?"

### Keyword deep-dive

Analyze a specific keyword's competitive landscape.

1. Call `get-keywords-performance-agg` with `keyword`, `domain: "amazon.com"` for volume and trend
2. Call `get-keywords-top-brands-agg` for brand rankings on that keyword
3. Call `get-keywords-top-products-agg` for product rankings on that keyword
4. For trends, use `get-keywords-performance` (non-agg) with `granularity: "weekly"` or `"monthly"`

### Keyword trend monitoring

Track search demand shifts over time.

1. For the user's top keywords, call `get-keywords-performance` with `granularity: "monthly"`
2. Identify rising keywords (growing search volume) and declining keywords
3. Cross-reference with `get-categories-top-keywords` (time-series) for category-level demand shifts
4. Flag any new high-volume keywords entering the category that the user doesn't index for

## Opportunity scoring

When presenting keyword opportunities from the analyses above, include these quick indicators:
- **Search volume signal**: From keyword performance data
- **Current brand presence**: Does user's brand appear in top brands for this keyword?
- **Competition intensity**: How many strong brands compete for this keyword?
- **Relevance**: Is this keyword aligned with the user's product portfolio?

For full opportunity scoring with a 0-100 point system, tier classification (Quick wins / Strategic plays / Long shots), and trend analysis, use the `keyword-gap` skill's Analysis 4.

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Component mapping for keyword strategy

| Analysis | Primary components |
|---|---|
| Brand keyword portfolio | Data table (keywords ranked by clicks share with branded/generic badges), Chart.js pie chart (branded vs generic split), share bar (top 10 keywords) |
| ASIN keyword drivers | Data table (keywords per ASIN with share + volume), classification badges (high-volume-low-share = opportunity, long-tail-high-share = defend), insight box |
| Category keyword landscape | Data table (category keywords with user presence indicator), alert banner (gap keywords found), two-column layout (user keywords vs gaps) |
| Keyword deep-dive | KPI cards (volume, trend, competition), data table (top brands + top products for keyword), Chart.js line chart (monthly volume trend) |
| Keyword trend monitoring | Chart.js multi-line chart (keyword volume over time), alert banner (rising/declining keywords), data table (new category keywords) |

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-brands-top-keywords` / `get-brands-top-keywords-agg`
- `get-products-top-keywords` / `get-products-top-keywords-agg` — time-series for trends, `-agg` for aggregated snapshots
- `get-categories-top-keywords` / `get-categories-top-keywords-agg`
- `get-keywords-performance` / `get-keywords-performance-agg`
- `get-keywords-top-brands` / `get-keywords-top-brands-agg`
- `get-keywords-top-products` / `get-keywords-top-products-agg`
