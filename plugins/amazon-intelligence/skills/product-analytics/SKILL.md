---
name: product-analytics
description: Amazon product-level (ASIN) analytics using SimilarWeb Shopper Intelligence. Track ASIN sales performance, identify keyword drivers, benchmark against competitive products, and analyze portfolio performance. Use when the user asks about a specific ASIN, product performance, product comparison, best-selling products, or product-level trends on Amazon.
---

# Product Analytics

Analyze Amazon products at the ASIN level using SimilarWeb Shopper Intelligence. Always load `BRAND_PROFILE.md` first for the user's tracked ASINs and domain.

## Important API rules

1. **Product endpoints support both variants** — use time-series (`get-products-sales-performance`, `get-products-top-keywords`) with `start_date`, `end_date`, and `granularity: "monthly"` for trend data, or use the `-agg` variants for aggregated snapshots.
2. **Always provide date ranges** — use `start_date` and `end_date` in `YYYY-MM` format. Default to the last 6 months.
3. **Category must be a numeric ID** — never pass a category name. Use `get-categories-search` to resolve it.
4. **Brand tools require `category`** — pass the numeric category ID for all brand-level calls.

## Core analyses

### ASIN performance dashboard

Sales and traffic overview for a specific product.

1. Read `BRAND_PROFILE.md` for tracked ASINs, category ID, and domain
2. Call `get-products-sales-performance` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `granularity: "monthly"` — get revenue, units, price over time; use latest month as snapshot
3. Call `get-products-top-keywords` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `limit: 20` — keyword drivers
4. Present: revenue, units sold, average price, top search keywords driving traffic

### ASIN trend analysis

Track how a product's performance changes over time.

1. Call `get-products-sales-performance` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `granularity: "monthly"`
2. Identify: growth/decline trajectory, seasonal patterns, price changes
3. Call `get-products-top-keywords` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `granularity: "monthly"` to see if keyword mix is shifting
4. Flag: revenue growth decoupled from unit growth (price effect), new keywords appearing, keywords losing share

### Portfolio overview

Analyze all tracked ASINs together.

1. Use `get-brands-top-products-agg` with `brand`, `category` (numeric ID), `domain: <domain from BRAND_PROFILE.md>`, `limit: 20` — this returns all products with revenue, units, price, rating in one call
2. For deeper per-ASIN trends, call `get-products-sales-performance` (time-series) with explicit dates for each priority ASIN
3. Rank by revenue, units, growth rate
4. Classify: Stars (high revenue + growing), Cash cows (high revenue + flat/declining), Rising stars (low revenue + growing fast), Underperformers (low revenue + declining)

### Competitive product comparison

Compare the user's ASIN against competitor products.

1. Identify competing ASINs via `get-keywords-top-products-agg` for the user's top keywords
2. For each competing ASIN, call `get-products-sales-performance` (time-series) with `start_date`, `end_date`, `granularity: "monthly"` for sales comparison
3. Call `get-products-top-keywords` (time-series) with `start_date`, `end_date` for both ASINs to compare keyword strategies
4. Highlight: keywords competitor wins that user doesn't index for, price positioning differences

### Product keyword optimization

Find keyword gaps and opportunities for a specific ASIN.

1. Call `get-products-top-keywords` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date` for current keyword portfolio
2. Call `get-categories-top-keywords-agg` for category-level demand
3. Find category keywords with high volume where the ASIN has no presence
4. For each gap keyword, call `get-keywords-top-products-agg` to assess competition difficulty
5. Score opportunities: high volume + low competition = best opportunities

## Presentation guidelines

- For portfolio views, use tables with clear ranking and classification
- Always include trend direction (arrow up/down) alongside absolute numbers
- When comparing products, normalize by price tier — a $10 product and $100 product have different benchmarks
- Link ASIN insights back to keyword strategy recommendations

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Component mapping for product analytics

| Analysis | Primary components |
|---|---|
| ASIN performance dashboard | KPI cards (revenue, units, avg price, keyword count), data table (top 20 keywords with clicks share), Chart.js doughnut chart (keyword traffic sources) |
| ASIN trend analysis | Chart.js line chart (monthly revenue + units + price), alert banner (if price effect detected), insight box (keyword mix shifts), classification badges (new / lost keywords) |
| Portfolio overview | Data table (all ASINs with revenue, units, growth, classification), classification badges (Star / Cash Cow / Rising Star / Underperformer), Chart.js bar chart (revenue by ASIN) |
| Competitive product comparison | Two-column layout (user ASIN vs competitor ASIN), data table (keyword overlap with share comparison), KPI cards (side-by-side metrics), insight box (positioning gaps) |
| Product keyword optimization | Data table (gap keywords with volume + competition score), classification badges (best opportunity / moderate / hard), share bar (current keyword coverage), alert banner (top opportunities) |

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-products-sales-performance` / `get-products-sales-performance-agg` — time-series for trends, `-agg` for aggregated snapshots
- `get-products-top-keywords` / `get-products-top-keywords-agg` — time-series for trends, `-agg` for aggregated snapshots
- `get-brands-top-products` / `get-brands-top-products-agg` — for portfolio-level data (works fine)
- `get-keywords-top-products` / `get-keywords-top-products-agg` — for competitive product discovery
- `get-categories-top-keywords` / `get-categories-top-keywords-agg` — for category keyword demand
