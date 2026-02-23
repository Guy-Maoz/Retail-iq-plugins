---
description: Analyze Amazon on-site search keywords — find opportunities, track trends, and identify gaps in your keyword strategy
argument-hint: "[keyword or 'portfolio' or 'gaps']"
---

# Keyword Intel

Analyze Amazon on-site search keywords for strategic opportunities.

## Workflow

### 1. Determine scope

Load `BRAND_PROFILE.md`. Based on argument:
- **Specific keyword** (e.g., "wireless earbuds"): Deep-dive on that keyword
- **"portfolio"** or no argument: Analyze the user's full keyword portfolio
- **"gaps"**: Find keywords the user is missing
- **ASIN** (starts with B0): Keywords driving traffic to that product

### 2A. Keyword deep-dive (specific keyword)

- `get-keywords-performance-agg` with `keyword`, `domain: "amazon.com"` — volume, clicks, trend
- `get-keywords-top-brands-agg` with `keyword`, `limit: 10` — who dominates this keyword
- `get-keywords-top-products-agg` with `keyword`, `limit: 10` — which products rank highest
- `get-keywords-performance` with `granularity: "monthly"` — demand trend over time
- Assess user's position: is user's brand in the top brands? Are user's ASINs in the top products?

### 2B. Portfolio analysis (all brand keywords)

- `get-brands-top-keywords-agg` with user's `brand`, `category`, `limit: 50`
- Classify: branded vs generic, high-share vs low-share
- For each competitor, `get-brands-top-keywords-agg` — compare keyword portfolios
- Identify user's unique keywords, shared keywords, and competitor-only keywords

### 2C. Gap analysis

- `get-categories-top-keywords-agg` with `category`, `limit: 50` — what the market searches for
- `get-brands-top-keywords-agg` with user's `brand` — what user is visible for
- Find category keywords where user has no presence
- For each gap keyword, `get-keywords-top-brands-agg` to assess competition difficulty
- Score and rank opportunities: high demand + low competition = best bets

### 2D. ASIN keyword drivers

- `get-products-top-keywords` (time-series) with `asin`, `domain: "amazon.com"`, `start_date`, `end_date`, `limit: 30`. **Do NOT use `-agg` variant** — it returns 404 errors.
- Classify by share: owned (>10%), competitive (3-10%), trailing (<3%)
- `get-categories-top-keywords-agg` to find category keywords missing from ASIN
- Recommend keywords to target in listing optimization or advertising

### 3. Present results

**Summary**: Key insight in one sentence

**Data table**: Keywords with metrics (volume, share, rank, trend)

**Opportunities**: Ranked list of actionable keyword opportunities

**Threats**: Keywords where brand is losing share or new competitors are entering

**Recommendations**: Concrete next steps (listing optimization, ad targeting, content)

## Output format

Use tables for keyword data. Sort by opportunity size. Always include actionable recommendations tied to specific keywords.
