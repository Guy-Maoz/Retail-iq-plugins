---
description: Analyze Amazon product (ASIN) performance — sales trends, keyword drivers, and competitive benchmarks
argument-hint: "<ASIN or 'portfolio'>"
---

# Product Performance

Analyze product-level performance on Amazon.

## Important API rules

1. **Product `-agg` endpoints are broken** — `get-products-sales-performance-agg` and `get-products-top-keywords-agg` return 500/404 errors. **Always use the time-series variants** with explicit `start_date`, `end_date`, and `granularity: "monthly"`.
2. **Always provide date ranges** — use `start_date` and `end_date` in `YYYY-MM` format. Default to the last 6 months.
3. **Category must be a numeric ID** — never pass a category name. Use `get-categories-search` to resolve it.
4. **Brand tools require `category`** — pass the numeric category ID for all brand-level calls.

## Workflow

### 1. Determine scope

Load `BRAND_PROFILE.md`. Based on argument:
- **Specific ASIN** (e.g., B0XXXXXXXXX): Deep-dive on that product
- **"portfolio"** or no argument: Overview of all tracked ASINs
- **Competitor brand name**: Analyze that competitor's top products

### 2A. ASIN deep-dive

- `get-products-sales-performance` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date`, `granularity: "monthly"` — revenue, units, price over time (use latest month as snapshot)
- `get-products-top-keywords` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date`, `limit: 20` — keyword drivers
- For trends: the time-series data already includes monthly data points
- Find competing products: use top keywords to call `get-keywords-top-products-agg`

Present: sales snapshot, trend chart narrative, keyword health, competitive positioning

### 2B. Portfolio review

- Use `get-brands-top-products-agg` with `brand`, `category` (numeric ID), `domain: "amazon.com"`, `limit: 20` — returns all products with revenue, units, price, rating in one call
- For deeper per-ASIN trends, call `get-products-sales-performance` (time-series) with explicit dates for each priority ASIN
- Rank by: revenue, units, growth rate
- Classify each ASIN:
  - **Star**: Top revenue + growing
  - **Cash cow**: Top revenue + flat/declining
  - **Rising star**: Lower revenue + high growth
  - **Needs attention**: Declining revenue + declining keywords

### 2C. Competitor product teardown

- `get-brands-top-products-agg` with competitor `brand`, `category` (numeric ID), `limit: 10`
- For their top 3 products, call `get-products-top-keywords` (time-series) with `asin`, `start_date`, `end_date` — keyword strategy
- Compare against user's products competing in the same space
- Identify what keywords and positioning make competitor products successful

### 3. Present results

**Performance table**: ASINs ranked with revenue, units, price, growth, classification

**Trend insights**: Which products are accelerating, decelerating, or flat

**Keyword health**: Are the right keywords driving traffic? Any keyword losses?

**Competitive context**: How do user's products compare to competitive alternatives?

**Action items**: Specific recommendations per ASIN (optimize listing, increase ad spend, investigate decline)
