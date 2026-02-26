---
description: Analyze Amazon on-site search keywords — find opportunities, track trends, and identify gaps in your keyword strategy
argument-hint: "[keyword or 'portfolio' or 'gaps']"
---

# Keyword Intel

Analyze Amazon on-site search keywords for strategic opportunities.

## Workflow

### 1. Determine scope

Load `BRAND_PROFILE.md` (brand, category, competitors, domain). Based on argument:
- **Specific keyword** (e.g., "wireless earbuds"): Deep-dive on that keyword
- **"portfolio"** or no argument: Analyze the user's full keyword portfolio
- **"gaps"**: Find keywords the user is missing
- **ASIN** (starts with B0): Keywords driving traffic to that product

### 2A. Keyword deep-dive (specific keyword)

- `get-keywords-performance-agg` with `keyword`, `domain: <domain from BRAND_PROFILE.md>` — volume, clicks, trend
- `get-keywords-top-brands-agg` with `keyword`, `limit: 10` — who dominates this keyword
- `get-keywords-top-products-agg` with `keyword`, `limit: 10` — which products rank highest
- `get-keywords-performance` with `granularity: "monthly"` — demand trend over time
- Assess user's position: is user's brand in the top brands? Are user's ASINs in the top products?

### 2B. Portfolio analysis (all brand keywords)

- `get-brands-top-keywords-agg` with user's `brand`, `category`, `limit: 50`
- Classify: branded vs generic, high-share vs low-share
- For each competitor, `get-brands-top-keywords-agg` — compare keyword portfolios
- Identify user's unique keywords, shared keywords, and competitor-only keywords

### 2C. Gap analysis (quick mode)

Quick keyword gap scan — category vs brand.

- `get-categories-top-keywords-agg` with `category`, `domain: <domain from BRAND_PROFILE.md>`, `limit: 50`, `start_date`, `end_date` — what the market searches for
- `get-brands-top-keywords-agg` with user's `brand`, `category`, `domain: <domain from BRAND_PROFILE.md>`, `limit: 50`, `start_date`, `end_date` — what user is visible for
- Find category keywords where user has no presence — list the top 10 gaps by category rank
- For each gap keyword, `get-keywords-top-brands-agg` with `keyword`, `domain: <domain from BRAND_PROFILE.md>` to assess competition difficulty
- Score and rank opportunities: high demand + low competition = best bets

**For comprehensive gap analysis**: Load `skills/keyword-gap/SKILL.md` and run the full keyword gap analysis. This includes competitor-level gaps, ASIN-level gaps, trend-based scoring, and tiered prioritization. Offer this to the user: "I found X keyword gaps in the quick scan. Would you like me to run a comprehensive keyword gap analysis that also compares against your competitors and maps gaps to specific ASINs?"

### 2D. ASIN keyword drivers

- `get-products-top-keywords` (time-series) with `asin`, `domain: <domain from BRAND_PROFILE.md>`, `start_date`, `end_date`, `limit: 30` for trend data, or `get-products-top-keywords-agg` for an aggregated snapshot.
- Classify by share: owned (>10%), competitive (3-10%), trailing (<3%)
- `get-categories-top-keywords-agg` to find category keywords missing from ASIN
- Recommend keywords to target in listing optimization or advertising

### 3. Present results

**Summary**: Key insight in one sentence

**Data table**: Keywords with metrics (volume, share, rank, trend)

**Opportunities**: Ranked list of actionable keyword opportunities

**Threats**: Keywords where brand is losing share or new competitors are entering

**Recommendations**: Concrete next steps (listing optimization, ad targeting, content)

## Follow-up offers

After presenting keyword intel results, offer relevant deeper analyses:

- **From gap analysis**: "Would you like a comprehensive keyword gap report? This goes deeper with competitor gaps, ASIN-level mapping, and opportunity scoring." → Load `skills/keyword-gap/SKILL.md`
- **From portfolio analysis**: "Want to see where competitors beat you on shared keywords?" → Load `skills/keyword-gap/SKILL.md`, run Analysis 1
- **From keyword deep-dive**: "Should I check if this keyword represents a broader gap in your strategy?" → Load `skills/keyword-gap/SKILL.md`, run Analysis 4 for this keyword in context

## Output format

Use tables for keyword data. Sort by opportunity size. Always include actionable recommendations tied to specific keywords.
