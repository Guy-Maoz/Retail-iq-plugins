---
description: Get a full market overview of your Amazon category — size, trends, top brands, top products, and search demand
argument-hint: "[category name]"
---

# Market Overview

Generate a comprehensive market overview for an Amazon category.

## Workflow

### 1. Determine category

If an argument was provided, search for that category. Otherwise, load `BRAND_PROFILE.md` (brand, category, domain) and use the primary category. If neither exists, ask the user.

Use `get-categories-search` with `domain: <domain from BRAND_PROFILE.md>` to resolve the category ID.

### 2. Pull category data

Run these calls in parallel:
- `get-categories-sales-performance-agg` — total revenue, units, growth
- `get-categories-top-brands-agg` with `limit: 15` — brand landscape
- `get-categories-top-products-agg` with `limit: 10` — best sellers
- `get-categories-top-keywords-agg` with `limit: 20` — consumer search demand
- `get-categories-performance-agg` — on-site search volume into category

### 3. Pull trend data

- `get-categories-sales-performance` with `granularity: "monthly"` — is the category growing?
- `get-categories-performance` with `granularity: "monthly"` — is search demand growing?

### 4. Position the user

If `BRAND_PROFILE.md` exists:
- Find user's brand rank in the top brands list
- Calculate user's approximate share of category revenue
- `get-clicks-share-agg` for user's search share in category

### 5. Present the report

Structure the output as:

**Category snapshot**: Size (revenue, units), growth rate, search demand level

**Market structure**: Brand concentration analysis — is it concentrated or fragmented? Who are the top 5?

**Your position**: Where the user's brand ranks, search share, share trend

**Consumer demand**: Top search keywords, trending keywords, keyword themes

**Top products**: Best-selling ASINs in the category with key metrics

**Opportunities**: Gaps between category demand and user's keyword/product coverage

## Output format

Present as a structured briefing. Use tables for brand rankings and product lists. Lead with the market narrative, not raw data.
