---
name: category-intelligence
description: Amazon category-level market intelligence using SimilarWeb Shopper Intelligence. Analyze category size, growth trends, top brands, top products, search demand, and seasonal patterns. Use when the user asks about market size, category trends, market overview, who leads a category, what's trending, or seasonal demand patterns on Amazon.
---

# Category Intelligence

Analyze Amazon categories using SimilarWeb Shopper Intelligence. Always load `BRAND_PROFILE.md` first for category and domain context.

## Core analyses

### Category overview

Full snapshot of a category's health and dynamics.

1. Read `BRAND_PROFILE.md` for primary category and domain
2. Call `get-categories-sales-performance-agg` with `category`, `domain: <domain from BRAND_PROFILE.md>` for total category size (revenue, units)
3. Call `get-categories-top-brands-agg` with `limit: 10` for brand concentration
4. Call `get-categories-top-products-agg` with `limit: 10` for best-selling products
5. Call `get-categories-performance-agg` for on-site search metrics (search volume into category)
6. Present: total market size, growth rate, top brands with share, top products, search demand

### Category trend analysis

Track category performance over time.

1. Call `get-categories-sales-performance` (non-agg) with `granularity: "monthly"` for time-series
2. Identify: growth/decline trends, seasonal patterns, acceleration/deceleration
3. Call `get-categories-performance` (non-agg) for search demand trends over time
4. Correlate search demand with sales — is demand growing faster than conversions?

### Brand concentration & market structure

Understand how consolidated or fragmented the category is.

1. Call `get-categories-top-brands-agg` with `limit: 20`
2. Calculate: top 3 brands' combined share, top 10 brands' combined share, long-tail share
3. Assess market structure: concentrated (top 3 > 60%), moderate (30-60%), fragmented (<30%)
4. Flag if user's brand share is growing or shrinking relative to the market

### Consumer demand signals

Analyze what shoppers search for within the category.

1. Call `get-categories-top-keywords-agg` with `limit: 30`
2. Classify keywords: branded vs generic, product-type vs feature-based, problem-based
3. Call `get-categories-top-keywords` (non-agg) with `granularity: "monthly"` for trending keywords
4. Identify emerging search terms (new in top 30) and declining terms

### Category adjacent opportunities

Discover related categories for expansion.

1. Use `get-categories-search` with related terms to find adjacent categories
2. For each adjacent category, call `get-categories-sales-performance-agg` to size the opportunity
3. Check if user's competitors are present via `get-categories-top-brands-agg`

## Presentation guidelines

- Lead with the "so what" — is this a growing market, shrinking, or flat?
- Frame the user's brand position within the category context
- Use the brand profile to show where the user stands vs the category leaders
- Seasonal patterns are critical for inventory and ad planning — always call them out

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Component mapping for category intelligence

| Analysis | Primary components |
|---|---|
| Category overview | KPI cards (total revenue, units, growth rate, search volume), data table (top 10 brands with share), data table (top 10 products), share bar (brand concentration) |
| Category trend analysis | Chart.js line chart (monthly revenue + units), Chart.js line chart (search demand vs sales), insight box (demand-conversion correlation), alert banner (if demand outpacing sales) |
| Brand concentration | Share bar (top 3 / top 10 / long-tail), classification badge (concentrated / moderate / fragmented), data table (top 20 brands with share), insight box (user brand position) |
| Consumer demand signals | Data table (top 30 keywords with classification badges: branded / generic / feature / problem), Chart.js line chart (trending keywords over time), alert banner (emerging terms) |
| Adjacent opportunities | Data table (related categories with revenue + growth), classification badges (competitors present / white space), two-column layout (current category vs adjacent) |

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-categories-search`
- `get-categories-sales-performance` / `get-categories-sales-performance-agg`
- `get-categories-top-brands` / `get-categories-top-brands-agg`
- `get-categories-top-products` / `get-categories-top-products-agg`
- `get-categories-top-keywords` / `get-categories-top-keywords-agg`
- `get-categories-performance` / `get-categories-performance-agg`
