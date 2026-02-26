---
name: brand-performance
description: Amazon brand-level performance monitoring using SimilarWeb Shopper Intelligence. Track brand sales trends, search share of voice, top products, keyword health, and portfolio optimization. Use when the user asks about brand performance, sales trends, brand health, search share, how their brand is doing, or brand-level KPIs on Amazon.
---

# Brand Performance

Monitor and analyze Amazon brand performance using SimilarWeb Shopper Intelligence. Always load `BRAND_PROFILE.md` first for brand, category, and domain context.

## Core analyses

### Brand health dashboard

Comprehensive snapshot of brand performance.

1. Read `BRAND_PROFILE.md` for brand, category, competitors, and domain
2. Call `get-brands-sales-performance-agg` with `brand`, `category`, `domain: <domain from BRAND_PROFILE.md>` for sales metrics
3. Call `get-clicks-share-agg` with `brand`, `category`, `domain: <domain from BRAND_PROFILE.md>` for search share
4. Call `get-brands-top-products-agg` with `brand`, `category`, `limit: 10` for product portfolio
5. Call `get-brands-top-keywords-agg` with `brand`, `category`, `limit: 10` for keyword health
6. Present dashboard: revenue, units, market share, search share, top products, top keywords

### Brand trend analysis

Track brand performance trajectory over time.

1. Call `get-brands-sales-performance` (non-agg) with `granularity: "monthly"` for sales trends
2. Call `get-clicks-share` (non-agg) with `granularity: "monthly"` for search share trends
3. Identify: growth/decline phases, seasonal patterns, inflection points
4. Compare brand growth rate vs category growth rate (from `get-categories-sales-performance`)
5. Flag: brand growing faster than category (gaining share) or slower (losing share)

### Search share of voice

Deep analysis of brand visibility in on-site search.

1. Call `get-clicks-share-agg` for user's brand and each competitor in category
2. Rank all brands by search clicks share
3. Call `get-brands-top-keywords-agg` to identify which keywords drive the user's search share
4. For the top keywords, call `get-keywords-top-brands-agg` to see competitive positioning per keyword
5. Identify: keywords where brand is #1 (defend), keywords where brand is #2-3 (attack), keywords where brand is absent (opportunity)

### Portfolio optimization

Identify best and worst performing products within the brand.

1. Call `get-brands-top-products-agg` with `brand`, `category`, `limit: 20`
2. For each product, call `get-products-sales-performance` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `granularity: "monthly"` for trend data, or `get-products-sales-performance-agg` for an aggregated snapshot.
3. Classify products by contribution: top 20% by revenue, middle, bottom
4. Identify products with declining performance that need attention
5. Cross-reference with keyword data — are underperforming products losing keyword share?

### Brand vs competitor benchmark

Side-by-side comparison on key metrics.

1. For user's brand and each competitor, call:
   - `get-brands-sales-performance-agg` (revenue, units)
   - `get-clicks-share-agg` (search share)
   - `get-brands-top-products-agg` with `limit: 5` (portfolio breadth)
2. Present benchmark table: brand, revenue, units, search share, top product count, avg price
3. Highlight where user leads and where competitors lead

## Key metrics to always track

- **Revenue & units**: From `get-brands-sales-performance`
- **Search clicks share**: From `get-clicks-share` — the most important leading indicator
- **Keyword count**: Number of keywords where brand appears in top results
- **Product concentration**: What % of brand revenue comes from top 3 products

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Component mapping for brand performance

| Analysis | Primary components |
|---|---|
| Brand health dashboard | KPI cards (revenue, units, search share, keyword count), data table (top products), share bar (search share vs competitors) |
| Brand trend analysis | Chart.js line chart (monthly revenue + units), alert banner (if losing share), insight box (growth vs category) |
| Search share of voice | Share bar (brand vs competitors), data table (keyword rankings), classification badges (defend / attack / opportunity) |
| Portfolio optimization | Data table (products with classification badges: Star, Cash Cow, Rising Star, Underperformer), Chart.js bar chart (revenue by product) |
| Brand vs competitor benchmark | Data table (multi-brand comparison), KPI cards (user brand highlights), Chart.js grouped bar chart |

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-brands-sales-performance` / `get-brands-sales-performance-agg`
- `get-brands-top-products` / `get-brands-top-products-agg`
- `get-brands-top-keywords` / `get-brands-top-keywords-agg`
- `get-brands-top-competitors` / `get-brands-top-competitors-agg`
- `get-clicks-share` / `get-clicks-share-agg`
- `get-categories-sales-performance` / `get-categories-sales-performance-agg`
- `get-keywords-top-brands` / `get-keywords-top-brands-agg`
- `get-products-sales-performance` / `get-products-sales-performance-agg` — time-series for trends, `-agg` for aggregated snapshots
