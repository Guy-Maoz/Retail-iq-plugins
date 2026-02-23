---
description: Set up your brand profile — ASINs, competitors, and categories for personalized Amazon intelligence
argument-hint: "<brand name>"
---

# Setup

Initialize or update the brand profile used by all Amazon Intelligence skills.

## Important API rules

1. **Category must be a numeric ID** — never pass a category name string. Use `get-categories-search` to find the ID first.
2. **Product ASIN endpoints: use time-series, not agg** — `get-products-sales-performance-agg` and `get-products-top-keywords-agg` are unreliable (500/404 errors). Always use the time-series variants (`get-products-sales-performance`, `get-products-top-keywords`) with explicit `start_date`, `end_date`, and `granularity: "monthly"`.
3. **Always provide date ranges** — use `start_date` and `end_date` in `YYYY-MM` format. Default to the last 6 months (e.g., `"2025-07"` to `"2025-12"`).
4. **Brand tools require both `brand` and `category`** — the `category` parameter is a required numeric ID for `get-brands-sales-performance-agg`, `get-brands-top-products-agg`, `get-brands-top-competitors-agg`, `get-clicks-share-agg`, etc.

## Workflow

### 1. Identify the brand

If the user provided a brand name as an argument, use it. Otherwise ask:
- "What is your brand name on Amazon?"

Search for the brand using `get-brands-search` with `domain: "amazon.com"` and the brand name as `search_term`. Present the top matches and ask the user to confirm.

Save the confirmed brand name.

### 2. Identify the primary category

Ask: "What category does your brand primarily compete in?"

Search for the category using `get-categories-search` with `domain: "amazon.com"` and the user's answer as `search_term`. Present matching categories with their full path and **numeric category_id**. Ask the user to confirm.

**Critical**: Save the `category_id` (e.g., `"679255011"`) — this is required for all brand-level API calls.

### 3. Discover ASINs automatically

Instead of asking the user to paste ASINs manually, auto-discover them:

Call `get-brands-top-products-agg` with:
- `brand`: confirmed brand name
- `category`: confirmed category_id (numeric)
- `domain`: `"amazon.com"`
- `limit`: 20

This returns the brand's top products with ASIN, name, revenue, units_sold, price, and rating. Present the list and ask:
- "Here are your top products on Amazon. Which ones do you want to track? Or paste additional ASINs."

For any additional ASINs the user provides, validate them using **time-series** product calls:
```
get-products-sales-performance with:
  asin: "<ASIN>"
  domain: "amazon.com"
  start_date: "<6 months ago, YYYY-MM>"
  end_date: "<current month, YYYY-MM>"
  granularity: "monthly"
```

**Do NOT use `get-products-sales-performance-agg`** — it returns 500 errors.

Build the ASIN table in `BRAND_PROFILE.md` from both auto-discovered and manually-added ASINs.

### 4. Identify competitors

Two approaches — use both:

**Auto-discover**: Call `get-brands-top-competitors-agg` with:
- `brand`: user's brand
- `category`: category_id (numeric)
- `domain`: `"amazon.com"`

Present the top 5-10 brands with highest audience overlap and ask which are direct competitors.

**Manual**: Ask "Any other competitor brands you want to track that weren't in the list?"

Search for manually-added brands via `get-brands-search` to confirm their names.

### 5. Confirm and save

Present a summary of the full brand profile and ask for confirmation. Write the final `BRAND_PROFILE.md` to the plugin directory with this structure:

```markdown
# Brand Profile

## Brand
- **Name**: <brand>
- **Category**: <category name>
- **Category ID**: <numeric category_id>
- **Marketplace**: amazon.com (US)

## My ASINs
| ASIN | Product Name | Revenue | Units | Price | Rating |
|------|-------------|---------|-------|-------|--------|
| ... | ... | ... | ... | ... | ... |

## Direct Competitors
| Brand | Affinity | Notes |
|-------|----------|-------|
| ... | ... | ... |

## Analysis Preferences
- **Default date range**: last 6 months
- **Granularity**: monthly
```

### 6. Quick health check

Run a quick validation using the confirmed category_id:

- `get-brands-sales-performance-agg` with `brand`, `category` (numeric ID), `domain` — confirm data exists and show revenue/units
- `get-categories-top-brands-agg` with `category` (numeric ID), `domain` — show the user where they rank
- `get-clicks-share-agg` with `brand`, `category` (numeric ID), `domain` — show current search share

Present a "Brand snapshot" as a welcome report so the user immediately sees value. Use the `dashboard-ui` skill to render it as a branded HTML dashboard.

## Output

Updated `BRAND_PROFILE.md` in the plugin directory, plus a quick brand snapshot dashboard.
