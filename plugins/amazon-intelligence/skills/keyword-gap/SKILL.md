---
name: keyword-gap
description: Comprehensive keyword gap analysis for Amazon brands using SimilarWeb Shopper Intelligence. Identifies keyword opportunities by comparing your brand's keyword portfolio against competitors, the category, and at the ASIN level. Scores and prioritizes gaps by volume, competition, and trend direction. Use when the user asks about keyword gaps, missing keywords, keyword opportunities, where competitors are winning on search, or what keywords they should target next on Amazon.
---

# Keyword Gap Analysis

Identify keyword opportunities your brand is missing on Amazon by comparing your keyword portfolio against competitors, the category, and competitor products. Always load `BRAND_PROFILE.md` first for brand, category, competitor, and ASIN context.

## Important API rules

1. **Product `-agg` endpoints are broken** — `get-products-top-keywords-agg` returns 404 errors. **Always use the time-series variant** (`get-products-top-keywords`) with explicit `start_date`, `end_date`.
2. **Always provide `start_date` and `end_date`** in `YYYY-MM` format. Default to the last 6 months.
3. **Category must be a numeric ID** — never pass a category name. Use `get-categories-search` to resolve it if needed.
4. **Brand tools require `category`** — pass the numeric category ID for all brand-level calls.

## Core analyses

### Analysis 1: Brand vs competitors keyword gap

Compare the user's keyword portfolio against each competitor to find gaps, underperformance, and advantages.

1. Read `BRAND_PROFILE.md` for brand, category ID, and competitor list
2. Call `get-brands-top-keywords-agg` with `brand` (user's brand), `category`, `domain: "amazon.com"`, `limit: 100`, `start_date`, `end_date` — collect as `user_keywords`
3. For each competitor in the profile, call `get-brands-top-keywords-agg` with `brand` (competitor), `category`, `domain: "amazon.com"`, `limit: 100`, `start_date`, `end_date` — collect as `competitor_keywords[brand_name]`
4. Cross-reference the keyword lists to classify every keyword:
   - **Competitor-only gaps**: Keywords appearing in any competitor's top keywords but NOT in `user_keywords`. These are the primary gap opportunities.
   - **Underperformance keywords**: Keywords appearing in both `user_keywords` and a competitor's list, but where the user's `clicks_share` is less than half the competitor's `clicks_share`. These are keywords the user competes on but loses.
   - **Brand advantages**: Keywords appearing in `user_keywords` but NOT in any competitor's list. These are defensive positions to protect.
   - **Battleground keywords**: Keywords where both user and at least 2 competitors appear, with shares within 2x of each other. These are highly contested.
5. For the top 15 competitor-only gap keywords (ranked by the competitor's clicks share), enrich with:
   - Call `get-keywords-performance-agg` with `keyword`, `domain: "amazon.com"` — get search volume
   - Call `get-keywords-top-brands-agg` with `keyword`, `domain: "amazon.com"`, `limit: 10` — count how many strong brands compete and confirm user's brand doesn't appear
6. For the top 10 underperformance keywords, call `get-keywords-performance-agg` for volume context
7. Present results:
   - Gap count summary: "X competitor-only keywords found, Y underperformance keywords, Z brand advantages"
   - Gap keywords table: keyword, which competitors own it, competitor's clicks share, search volume, number of competing brands, opportunity score
   - Underperformance table: keyword, user share, best competitor share, share deficit, search volume
   - Advantages table: keyword, user share, search volume (defend these)

### Analysis 2: Brand vs category keyword gap

Identify high-volume category search terms where the brand has zero or minimal presence.

1. Call `get-categories-top-keywords-agg` with `category`, `domain: "amazon.com"`, `limit: 100`, `start_date`, `end_date` — collect as `category_keywords`
2. Use `user_keywords` from Analysis 1 (or call `get-brands-top-keywords-agg` again if running standalone)
3. Cross-reference:
   - **Category gaps**: Keywords in `category_keywords` that do NOT appear in `user_keywords` at all
   - **Low-presence keywords**: Keywords in both lists but where user's share in the keyword is below the category median share
4. For the top 20 category gap keywords (by category-level search share), enrich:
   - Call `get-keywords-top-brands-agg` with `keyword`, `domain: "amazon.com"`, `limit: 10` — identify who owns these keywords and how concentrated ownership is
5. Score each gap keyword:
   - **High opportunity**: High search volume + few dominant brands (< 3 brands hold > 60% share)
   - **Medium opportunity**: High search volume but competitive (> 5 brands with meaningful share)
   - **Niche opportunity**: Lower search volume but very few competitors
6. Present results:
   - Category coverage stat: "Your brand appears in X of the top 100 category keywords (X% coverage)"
   - Gap table: keyword, category rank, search volume, top brand on this keyword, number of competitors, opportunity tier
   - Coverage comparison: user keyword count vs category keyword count

### Analysis 3: ASIN-level keyword gaps

Find keywords driving competitor products that the user's products do not capture.

1. Read `BRAND_PROFILE.md` for user's tracked ASINs
2. For each user ASIN, call `get-products-top-keywords` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date`, `limit: 30` — collect as `user_asin_keywords[asin]`. **Do NOT use `-agg` variant** — it returns 404 errors.
3. Identify competitor top products: call `get-brands-top-products-agg` with each competitor's `brand`, `category`, `domain: "amazon.com"`, `limit: 5` — collect top competitor ASINs
4. For the top 3 competitor products (by revenue), call `get-products-top-keywords` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date`, `limit: 30` — collect as `competitor_asin_keywords[asin]`
5. Cross-reference at the product level:
   - For each competitor product, find keywords that appear in `competitor_asin_keywords` but NOT in any of `user_asin_keywords` — these are ASIN-level gaps
   - For shared keywords, find where competitor product's share is > 2x user product's share — these are ASIN-level underperformance
6. Map gaps to user ASINs: for each gap keyword, determine which user ASIN is the best candidate to target it based on existing keyword overlap (which user ASIN already ranks for the most similar keywords)
7. Present results:
   - ASIN gap matrix: rows = gap keywords, columns = user ASINs, cells = "target" / "already ranks" / "not relevant"
   - Per-competitor product breakdown: competitor ASIN, its top keywords, which are gaps for the user
   - Action items per user ASIN: "ASIN B0XXX should target keywords: [list]"

### Analysis 4: Opportunity scoring and prioritization

Score and rank all gap keywords found in Analyses 1-3 into actionable tiers.

1. Compile a deduplicated list of all gap keywords found across Analyses 1, 2, and 3
2. For any gap keywords not yet enriched, call:
   - `get-keywords-performance-agg` with `keyword`, `domain: "amazon.com"` — search volume and click metrics
   - `get-keywords-top-brands-agg` with `keyword`, `domain: "amazon.com"`, `limit: 10` — competition intensity
3. For the top 20 gap keywords by volume, call `get-keywords-performance` (time-series) with `keyword`, `domain: "amazon.com"`, `granularity: "monthly"`, `start_date`, `end_date` — trend data
4. Calculate an **opportunity score** (0-100) for each keyword:
   - **Volume score** (0-40 points): Normalize search volume relative to the highest-volume keyword in the set. Top 10% get 40 pts, next 20% get 30, next 30% get 20, bottom 40% get 10.
   - **Competition score** (0-30 points): Based on `get-keywords-top-brands-agg` results. Fewer than 3 brands holding >5% share: 30 pts. 3-5 brands: 20 pts. 6-8 brands: 10 pts. 9+ brands: 5 pts.
   - **Trend score** (0-20 points): From time-series data. 3-month volume growing >10%: 20 pts. Growing 0-10%: 15 pts. Flat: 10 pts. Declining: 5 pts.
   - **Relevance score** (0-10 points): Keyword appears in category top keywords: 10 pts. Appears for a competitor in same category: 7 pts. Otherwise: 3 pts.
5. Classify into tiers:
   - **Quick wins** (score 70-100): High volume, low competition, growing trend, category-relevant. Action: target immediately in PPC and listing optimization.
   - **Strategic plays** (score 40-69): Good volume but competitive or requires content/product investment. Action: build a keyword conquest plan over 2-3 months.
   - **Long shots** (score 0-39): Low volume or very competitive or declining. Action: monitor only, revisit quarterly.
   - **Defend** (special tier): Keywords from Analysis 1 "brand advantages" — not gaps but must be protected. Action: maintain PPC presence and listing optimization.
6. Present results:
   - KPI summary: total gaps found, quick wins count, strategic plays count, long shots count
   - Prioritized table: keyword, opportunity score, volume, competition level, trend, tier, recommended action
   - Top 5 quick wins detail: for each, show volume, current competing brands, trend direction, and specific action recommendation
   - Defensive keywords list: brand advantages with their current share and volume

## Cross-analysis workflow

When running the full keyword gap analysis (all 4 analyses together), follow this sequence to minimize redundant API calls:

1. **Step 1 — Collect brand keywords** (shared across Analyses 1 and 2):
   - `get-brands-top-keywords-agg` for user's brand (limit: 100)
   - `get-brands-top-keywords-agg` for each competitor (limit: 100)
   - `get-categories-top-keywords-agg` for the category (limit: 100)

2. **Step 2 — Collect ASIN keywords** (for Analysis 3):
   - `get-products-top-keywords` (time-series) for each user ASIN
   - `get-brands-top-products-agg` for each competitor to get their top ASINs
   - `get-products-top-keywords` (time-series) for top competitor ASINs

3. **Step 3 — Run Analyses 1-3** using data from Steps 1-2, compile all gap keywords, deduplicate

4. **Step 4 — Enrich gap keywords** (for Analysis 4):
   - `get-keywords-performance-agg` for each top gap keyword (top 30 by estimated importance)
   - `get-keywords-top-brands-agg` for each top gap keyword (top 30)
   - `get-keywords-performance` (time-series) for top 20 keywords

5. **Step 5 — Score, classify, and present** the complete dashboard

## Visual output

**Always use the `dashboard-ui` skill for presenting results.** After collecting data from the API calls above, build a single self-contained HTML dashboard and save it to the user's workspace folder.

### Dashboard tab structure

Use tab navigation to organize the full report into sections:

```
[Overview] [Competitor Gaps] [Category Gaps] [ASIN Gaps] [Action Plan]
```

- **Overview tab**: KPI row (total gaps, quick wins, category coverage %) + insight box with executive summary + top 5 quick wins as highlight cards
- **Competitor Gaps tab**: Full Analysis 1 tables and share bars
- **Category Gaps tab**: Full Analysis 2 tables and coverage metrics
- **ASIN Gaps tab**: Full Analysis 3 ASIN matrix with per-competitor breakdowns
- **Action Plan tab**: Full Analysis 4 scored and tiered keyword list + trend charts + recommendations

### Component mapping for keyword gap analysis

| Analysis | Primary components |
|---|---|
| Brand vs competitors gap | KPI cards (total gaps, underperformance count, advantages count), data table (gap keywords with competitor owner, volume, competition, score), data table (underperformance keywords with share comparison), share bar (user vs competitor keyword coverage), classification badges (gap / underperformance / advantage / battleground) |
| Brand vs category gap | KPI card (category coverage %), data table (category gap keywords with rank, volume, top brand, opportunity tier), alert banner (if coverage < 50%), classification badges (high-opportunity / medium / niche) |
| ASIN-level gaps | Data table (gap keywords per competitor ASIN with mapping to user ASINs), two-column layout (competitor ASIN keywords vs user ASIN keywords), classification badges (target / already-ranks / not-relevant) |
| Opportunity scoring | KPI cards (quick wins, strategic plays, long shots, defend), data table (all keywords sorted by opportunity score with tier badges), Chart.js horizontal bar chart (top 15 keywords by opportunity score, color-coded by tier), Chart.js line chart (trend for top 5 quick wins over time), insight box (strategic recommendations), alert banner (top 3 quick wins to act on immediately) |

### Badge mapping

Use existing `dashboard-ui` badge variants for gap tiers:
- Quick win → `badge-cashcow` (green)
- Strategic play → `badge-star` (blue)
- Long shot → `badge-generic` (gray)
- Defend → `badge-branded` (orange)
- Gap → `badge-warning` (red)
- Underperformance → `badge-rising` (purple)

### Output rules

1. Read `skills/dashboard-ui/SKILL.md` for the full component library and CSS
2. Build the HTML using the dashboard shell template
3. Populate all data dynamically from API results — never use placeholder data
4. Save as `.html` to the workspace folder and link with `computer://`

## SimilarWeb tools used

- `get-brands-top-keywords` / `get-brands-top-keywords-agg`
- `get-brands-top-products` / `get-brands-top-products-agg`
- `get-brands-top-competitors` / `get-brands-top-competitors-agg`
- `get-categories-top-keywords` / `get-categories-top-keywords-agg`
- `get-keywords-performance` / `get-keywords-performance-agg`
- `get-keywords-top-brands` / `get-keywords-top-brands-agg`
- `get-keywords-top-products` / `get-keywords-top-products-agg`
- `get-products-top-keywords` — **time-series only** (do NOT use `-agg` variant, it returns 404 errors)
