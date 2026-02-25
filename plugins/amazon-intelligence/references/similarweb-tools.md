# SimilarWeb MCP Tools Reference

Quick reference for all SimilarWeb Amazon Intelligence MCP tools used by this plugin. All tools use `domain: "amazon.com"` for the US marketplace.

## Critical rules

1. **Always provide `start_date` and `end_date`** in `YYYY-MM` format. Default to last 6 months.
2. **Category must be a numeric ID** (e.g., `"679255011"`), not a name. Use `get-categories-search` to find it.
3. **Product `-agg` endpoints are broken** — `get-products-sales-performance-agg` and `get-products-top-keywords-agg` return 500/404 errors. Always use the time-series variants instead.
4. **Brand tools require `category`** — it's a required parameter (numeric ID) for sales performance, top products, top competitors, top keywords, and clicks share.

## Tool naming convention

Each tool has two variants:
- **Time-series** (e.g., `get-brands-sales-performance`): Returns data points over time. Use with `granularity: "monthly"` or `"weekly"`.
- **Aggregated** (e.g., `get-brands-sales-performance-agg`): Returns a single summary for the period. Use for snapshots and comparisons.

Use the aggregated variant for dashboards and comparisons. Use the time-series variant for trend analysis.

**Exception**: For product (ASIN) tools, only use time-series variants — the `-agg` variants are broken.

## Brand tools

| Tool | Purpose | Key parameters | Notes |
|------|---------|---------------|-------|
| `get-brands-search` | Find a brand by name | `search_term`, `domain` | Works without category |
| `get-brands-sales-performance[-agg]` | Brand revenue, units, price | `brand`, `category` (ID), `domain` | `category` required |
| `get-brands-top-competitors[-agg]` | Brands with highest audience overlap | `brand`, `category` (ID), `domain` | `category` required |
| `get-brands-top-keywords[-agg]` | Top on-site search keywords for brand | `brand`, `category` (ID), `domain` | `category` required |
| `get-brands-top-products[-agg]` | Top products for a brand | `brand`, `category` (ID), `domain` | `category` required |
| `get-clicks-share[-agg]` | Brand's on-site search clicks share | `brand`, `category` (ID), `domain` | `category` required |

## Category tools

| Tool | Purpose | Key parameters | Notes |
|------|---------|---------------|-------|
| `get-categories-search` | Find a category by name | `search_term`, `domain` | Returns `category_id` |
| `get-categories-sales-performance[-agg]` | Category revenue, units | `category` (ID), `domain` | |
| `get-categories-top-brands[-agg]` | Top brands in a category | `category` (ID), `domain` | |
| `get-categories-top-keywords[-agg]` | Top search keywords in category | `category` (ID), `domain` | |
| `get-categories-top-products[-agg]` | Top products in category | `category` (ID), `domain` | |
| `get-categories-performance[-agg]` | On-site search metrics for category | `category` (ID), `domain` | |

## Keyword tools

| Tool | Purpose | Key parameters | Notes |
|------|---------|---------------|-------|
| `get-keywords-performance[-agg]` | Keyword search volume and trends | `keyword`, `domain` | |
| `get-keywords-top-brands[-agg]` | Top brands for a keyword | `keyword`, `domain` | |
| `get-keywords-top-products[-agg]` | Top products for a keyword | `keyword`, `domain` | |

## Product tools

| Tool | Purpose | Key parameters | Notes |
|------|---------|---------------|-------|
| `get-products-sales-performance` | ASIN revenue, units, price | `asin`, `domain`, `start_date`, `end_date`, `granularity` | **Time-series only** — `-agg` variant broken |
| `get-products-top-keywords` | Top keywords driving traffic to ASIN | `asin`, `domain`, `start_date`, `end_date` | **Time-series only** — `-agg` variant broken |

## Common parameters

| Parameter | Values | Notes |
|-----------|--------|-------|
| `domain` | `"amazon.com"` | Always use for US marketplace |
| `granularity` | `"daily"`, `"weekly"`, `"monthly"` | Monthly recommended for trends |
| `limit` | 1-100 | Number of results to return |
| `offset` | 0+ | For pagination |
| `sort` | Varies by endpoint | Sort field for ranked results |
| `asc` | `true`/`false` | Sort direction |
| `start_date`, `end_date` | `"YYYY-MM"` | Date range — always provide these |
| `category` | Numeric ID string | e.g., `"679255011"` — never a name |

## Recommended patterns

**Compare brands**: Call `get-brands-sales-performance-agg` and `get-clicks-share-agg` for each brand in parallel. Always pass `category` as numeric ID.

**Keyword gap analysis**: Call `get-brands-top-keywords-agg` for user's brand, then `get-categories-top-keywords-agg` for category. Diff the two lists.

**Product competitive set**: Call `get-products-top-keywords` (time-series, with dates) for user's ASIN, then `get-keywords-top-products-agg` for the top keywords to find competing ASINs.

**Category sizing**: Call `get-categories-sales-performance-agg` for total market, then `get-brands-sales-performance-agg` for user's brand to calculate share.

**ASIN validation**: Use `get-products-sales-performance` (time-series) with `start_date`, `end_date`, `granularity: "monthly"`. Never use the `-agg` variant.

**Auto-discover brand products**: Use `get-brands-top-products-agg` with brand + category ID. This returns ASINs with revenue, units, price, rating — much better than asking users to paste ASINs manually.
