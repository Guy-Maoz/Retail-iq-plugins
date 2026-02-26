---
name: competitive-intelligence
description: Analyze Amazon competitors using SimilarWeb Shopper Intelligence. Compare brand sales performance, search share of voice, keyword overlap, and product positioning against direct competitors. Use when the user asks about competitors, competitive landscape, market share, share of voice, who is winning a category, or competitive threats on Amazon.
---

# Competitive Intelligence

Analyze competitive dynamics on Amazon using SimilarWeb Shopper Intelligence data. Always load `BRAND_PROFILE.md` first to get the user's brand, category, competitor list, and domain.

## Core analyses

### Share of voice comparison

Compare on-site search clicks share for the user's brand vs competitors within their primary category.

1. Read `BRAND_PROFILE.md` for brand, category, competitor list, and domain
2. For each brand (user + competitors), call `get-clicks-share-agg` with `brand`, `category`, `domain: <domain from BRAND_PROFILE.md>`
3. Present a comparison table: brand, clicks share %, change vs prior period
4. Highlight who is gaining/losing search share

### Competitor sales benchmarking

Compare sales performance across brands in the same category.

1. For each brand, call `get-brands-sales-performance-agg` with `brand`, `category`, `domain: <domain from BRAND_PROFILE.md>`
2. Compare: units sold, revenue, average selling price
3. For time-series trends, use `get-brands-sales-performance` (non-agg) with `granularity: "monthly"`
4. Flag competitors growing faster than the user's brand

### Competitor discovery

Find new or emerging competitors the user may not be tracking.

1. Call `get-brands-top-competitors-agg` with the user's brand and category
2. Compare results against the competitor list in `BRAND_PROFILE.md`
3. Highlight any high-affinity brands NOT in the user's competitor list
4. For each new competitor, pull `get-brands-sales-performance-agg` to show their scale

### Keyword battleground analysis

Identify keyword overlap and gaps between the user and competitors.

1. Call `get-brands-top-keywords-agg` for user's brand and each competitor (same category)
2. Cross-reference to find: shared keywords (battleground), keywords competitors own that user doesn't (gaps), keywords user owns that competitors don't (advantages)
3. For contested keywords, call `get-keywords-top-brands-agg` to see full competitive ranking

### Competitor product teardown

Analyze a specific competitor's top-performing products.

1. Call `get-brands-top-products-agg` for the competitor brand in category
2. For each top product, call `get-products-top-keywords` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date` for trend data, or `get-products-top-keywords-agg` for an aggregated snapshot, to understand what search terms drive traffic.
3. Compare against the user's ASINs competing in the same space

## Presentation guidelines

- Always frame insights relative to the user's brand ("You are #3 in search share, behind X and Y")
- Highlight actionable gaps and opportunities, not just data
- Use tables for multi-brand comparisons
- Flag any significant changes (>5% swing in share, new entrant in top 5)

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Component mapping for competitive intelligence

| Analysis | Primary components |
|---|---|
| Share of voice comparison | Share bar (all brands), data table (brand, clicks share %, change), Chart.js horizontal bar chart |
| Competitor sales benchmarking | Data table (brand, revenue, units, ASP with change indicators), KPI cards (user brand vs #1 competitor), Chart.js line chart (monthly trends) |
| Competitor discovery | Alert banner (new competitors found), data table (new brands with affinity score + revenue), classification badges (threat level) |
| Keyword battleground | Two-column layout (user keywords vs competitor keywords), data table (shared keywords with rankings), classification badges (battleground / gap / advantage) |
| Competitor product teardown | Data table (competitor top products + keyword drivers), insight box (strategic takeaways) |

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-brands-top-competitors` / `get-brands-top-competitors-agg`
- `get-brands-sales-performance` / `get-brands-sales-performance-agg`
- `get-clicks-share` / `get-clicks-share-agg`
- `get-brands-top-keywords` / `get-brands-top-keywords-agg`
- `get-brands-top-products` / `get-brands-top-products-agg`
- `get-keywords-top-brands` / `get-keywords-top-brands-agg`
- `get-products-top-keywords` / `get-products-top-keywords-agg` — time-series for trends, `-agg` for aggregated snapshots
