---
description: Set up your brand profile — ASINs, competitors, and categories for personalized Amazon intelligence
argument-hint: "<brand name>"
---

# Setup

Initialize or update the brand profile used by all Amazon Intelligence skills.

## Important API rules

1. **Category must be a numeric ID** — never pass a category name string. Use `get-categories-search` to find the ID first.
2. **Product ASIN endpoints support both variants** — use `get-products-sales-performance` / `get-products-top-keywords` (time-series) with `start_date`, `end_date`, and `granularity: "monthly"` for trend data, or use the `-agg` variants (`get-products-sales-performance-agg`, `get-products-top-keywords-agg`) for aggregated snapshots.
3. **Always provide date ranges** — use `start_date` and `end_date` in `YYYY-MM` format. Default to the last 6 months (e.g., `"2025-07"` to `"2025-12"`).
4. **Brand tools require both `brand` and `category`** — the `category` parameter is a required numeric ID for `get-brands-sales-performance-agg`, `get-brands-top-products-agg`, `get-brands-top-competitors-agg`, `get-clicks-share-agg`, etc.

## Workflow

### 0. Resolve target folder

Before writing any files, resolve the **target folder** using the logic in `skills/memory/SKILL.md` → "Resolve target folder". Use the working folder if available, otherwise fall back to the session folder. All files below (BRAND_PROFILE.md, CLAUDE.md, memory/) are written to the target folder.

### 1. Select marketplace

Ask the user which Amazon marketplace they want to analyze:

| # | Marketplace | Domain |
|---|------------|--------|
| 1 | Amazon US | amazon.com |
| 2 | Amazon UK | amazon.co.uk |
| 3 | Amazon France | amazon.fr |
| 4 | Amazon Germany | amazon.de |
| 5 | Amazon Canada | amazon.ca |
| 6 | Amazon Italy | amazon.it |

"Which Amazon marketplace do you sell on? (Enter 1–6, or type a domain name)"

Default to Amazon US (1) if the user says "US" or does not specify.

Use this mapping to resolve the country code:

| Domain | Country |
|--------|---------|
| amazon.com | us |
| amazon.co.uk | gb |
| amazon.fr | fr |
| amazon.de | de |
| amazon.ca | ca |
| amazon.it | it |

Store the selected domain and country code — use them in **all** API calls below.

> **Note**: If you change your marketplace later, re-run `/setup` because category IDs, brand IDs, and competitor data are marketplace-specific.

### 2. Identify the brand

If the user provided a brand name as an argument, use it. Otherwise ask:
- "What is your brand name on Amazon?"

Search for the brand using `get-brands-search` with `domain: <selected domain>` and the brand name as `search_term`. Present the top matches and ask the user to confirm.

Save the confirmed brand name.

### 3. Identify the primary category

Ask: "What category does your brand primarily compete in?"

Search for the category using `get-categories-search` with `domain: <selected domain>` and the user's answer as `search_term`. Present matching categories with their full path and **numeric category_id**. Ask the user to confirm.

**Critical**: Save the `category_id` (e.g., `"679255011"`) — this is required for all brand-level API calls.

### 4. Discover ASINs automatically

Instead of asking the user to paste ASINs manually, auto-discover them:

Call `get-brands-top-products-agg` with:
- `brand`: confirmed brand name
- `category`: confirmed category_id (numeric)
- `domain`: <selected domain>
- `limit`: 20

This returns the brand's top products with ASIN, name, revenue, units_sold, price, and rating. Present the list and ask:
- "Here are your top products on Amazon. Which ones do you want to track? Or paste additional ASINs."

For any additional ASINs the user provides, validate them using product calls:
```
get-products-sales-performance with:
  asin: "<ASIN>"
  domain: <selected domain>
  start_date: "<6 months ago, YYYY-MM>"
  end_date: "<current month, YYYY-MM>"
  granularity: "monthly"
```

You can also use `get-products-sales-performance-agg` for a quick aggregated snapshot.

Build the ASIN table in `BRAND_PROFILE.md` from both auto-discovered and manually-added ASINs.

### 5. Identify competitors

Two approaches — use both:

**Auto-discover**: Call `get-brands-top-competitors-agg` with:
- `brand`: user's brand
- `category`: category_id (numeric)
- `domain`: <selected domain>

Present the top 5-10 brands with highest audience overlap and ask which are direct competitors.

**Manual**: Ask "Any other competitor brands you want to track that weren't in the list?"

Search for manually-added brands via `get-brands-search` to confirm their names.

### 6. Confirm and save

Present a summary of the full brand profile and ask for confirmation. Read the brand profile template from `skills/memory/references/brand-profile-template.md` and write the populated `BRAND_PROFILE.md` to the **target folder** (not the plugin directory) with this structure:

```markdown
# Brand Profile

## Brand
- **Name**: <brand>
- **Category**: <category name>
- **Category ID**: <numeric category_id>

## Marketplace
- **Domain**: <selected domain>
- **Country**: <selected country code>

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

### 7. Quick health check

Run a quick validation using the confirmed category_id:

- `get-brands-sales-performance-agg` with `brand`, `category` (numeric ID), `domain` — confirm data exists and show revenue/units
- `get-categories-top-brands-agg` with `category` (numeric ID), `domain` — show the user where they rank
- `get-clicks-share-agg` with `brand`, `category` (numeric ID), `domain` — show current search share

Present a "Brand snapshot" as a welcome report so the user immediately sees value. Use the `dashboard-ui` skill to render it as a branded HTML dashboard.

### 8. Configure plugin settings

1. Ask: "Save analyses with methodology logs? (recommended: yes)" → determines auto-save setting
2. Ask: "Review analyses for quality? (Always / Ask me / Off)" → determines review mode
3. Read the target folder's `CLAUDE.md` (create it if it doesn't exist), append or update the `## Amazon Intelligence Settings` section with the chosen values plus marketplace from step 1. Use the settings format defined in `skills/memory/SKILL.md`.
4. Create the `memory/` directory with an empty `INDEX.md` in the target folder (use the index format from `skills/memory/SKILL.md`).

## Output

Updated `BRAND_PROFILE.md` in the target folder, `## Amazon Intelligence Settings` section in `CLAUDE.md`, initialized `memory/INDEX.md`, plus a quick brand snapshot dashboard.
