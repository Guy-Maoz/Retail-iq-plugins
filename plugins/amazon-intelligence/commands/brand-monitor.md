---
description: Monitor your brand health on Amazon — sales trends, search share changes, competitive shifts, and alerts
argument-hint: "[time period, e.g., 'last month' or 'Q4']"
---

# Brand Monitor

Generate a brand health monitoring report with key changes and alerts.

## Workflow

### 1. Set time frame

Load `BRAND_PROFILE.md`. If an argument specifies a time period, use it. Default to the last 3 months with monthly granularity.

### 2. Brand performance trends

- `get-brands-sales-performance` with `brand`, `category`, `domain: "amazon.com"`, `granularity: "monthly"` — revenue and unit trends
- `get-clicks-share` with `brand`, `category`, `granularity: "monthly"` — search share trend
- Calculate period-over-period changes for all metrics

### 3. Category context

- `get-categories-sales-performance` with `granularity: "monthly"` — is the category growing or shrinking?
- Compare brand growth rate vs category growth rate
- If brand < category growth: "losing share" alert
- If brand > category growth: "gaining share" positive signal

### 4. Competitive movement

For each competitor in `BRAND_PROFILE.md`:
- `get-clicks-share` with `granularity: "monthly"` — who is gaining/losing search share?
- `get-brands-sales-performance` with `granularity: "monthly"` — sales momentum
- Flag any competitor gaining >2% search share (competitive threat alert)

### 5. Keyword health check

- `get-brands-top-keywords-agg` for current top 20 keywords
- Compare against previous period (if available) to detect keyword gains/losses
- `get-categories-top-keywords-agg` for any new high-volume keywords entering the category

### 6. Product portfolio check

- `get-brands-top-products-agg` with `limit: 10` for portfolio ranking
- For each tracked ASIN in `BRAND_PROFILE.md`, call `get-products-sales-performance` (time-series) with `asin`, `start_date`, `end_date`, `granularity: "monthly"`. **Do NOT use `-agg` variant** — it returns 500 errors.
- Flag: products with >20% revenue decline, products with accelerating growth

### 7. Generate alerts

Automatically flag:
- **Search share loss**: Brand clicks share dropped >1% period over period
- **Competitor surge**: Any competitor gained >2% search share
- **Product decline**: Any tracked ASIN revenue down >20%
- **Category shift**: Category growth rate changed significantly
- **New competitor**: New brand entered top 10 in category

### 8. Present the report

**Brand health scorecard**: Revenue, units, search share — each with trend arrow and period change

**Alerts**: Any triggered alerts from step 7, prioritized by severity

**Competitive landscape**: Share changes across all tracked brands

**Keyword shifts**: Top keyword gains and losses

**Product portfolio**: Performance by ASIN with flags

**Recommended actions**: Specific next steps based on the data

## Follow-up offers

- Deep-dive on any alert
- Full competitive report on a surging competitor
- Keyword gap analysis for lost keywords
- Set up a recurring monitoring schedule
