# Amazon Intelligence Plugin

A SimilarWeb Amazon Intelligence plugin for [Cowork](https://claude.com/product/cowork), Anthropic's agentic desktop application. Built for ecommerce teams managing brands on Amazon — provides competitive intelligence, keyword strategy, category analysis, product performance tracking, and brand health monitoring powered by SimilarWeb Shopper Intelligence data.

## Installation

```
claude plugins add amazon-intelligence
```

## What It Does

This plugin gives ecommerce teams an AI-powered Amazon intelligence partner that can:

- **Competitive Intelligence** — Analyze competitor brands, compare search share of voice, discover keyword battlegrounds, and benchmark sales performance across your competitive set.
- **Keyword Strategy** — Find high-value Amazon search keywords, track keyword trends, and see which brands and products win on specific search terms.
- **Keyword Gap Analysis** — Comprehensive keyword gap analysis comparing your brand against competitors and the category. Identifies missing keywords at brand and ASIN level, scores opportunities, and prioritizes with actionable tiers.
- **Category Intelligence** — Analyze category size and growth, understand market structure, identify top brands and products, and spot seasonal demand patterns.
- **Product Analytics** — Track ASIN-level sales performance, identify keyword drivers for each product, classify your portfolio (stars, cash cows, rising stars), and benchmark against competing products.
- **Brand Performance** — Monitor brand health with sales trends, search share tracking, portfolio optimization, and automated competitive alerts.

## Commands

| Command | What It Does |
|---|---|
| `/setup` | Set up your brand profile — ASINs, competitors, categories, and plugin settings |
| `/market-overview` | Full market overview of your Amazon category |
| `/competitive-report` | Deep-dive competitive analysis against your competitors |
| `/keyword-intel` | Keyword opportunity analysis — portfolio, gaps, or single keyword |
| `/product-performance` | ASIN-level performance analysis and portfolio review |
| `/brand-monitor` | Brand health monitoring report with alerts |
| `/memory` | Browse analysis history — past reports, methodology logs, and review results |

## Skills

| Skill | What It Covers |
|---|---|
| `competitive-intelligence` | Share of voice, competitor benchmarking, keyword battlegrounds, competitor discovery |
| `keyword-strategy` | Keyword portfolio, ASIN keyword drivers, category keyword landscape, trend monitoring |
| `keyword-gap` | Competitor keyword gaps, category gaps, ASIN-level gaps, opportunity scoring and prioritization |
| `category-intelligence` | Category sizing, trend analysis, brand concentration, consumer demand signals |
| `product-analytics` | ASIN performance, portfolio classification, competitive product comparison |
| `brand-performance` | Brand health dashboard, trend analysis, search share, portfolio optimization |
| `memory` | Report saving, methodology logging, settings management, analysis index |

## Agents

| Agent | What It Does |
|---|---|
| `review-agent` | Audits completed analyses — checks methodology, data coverage, and assumptions against brand profile |

## Getting Started

1. Run `/setup` to configure your brand profile
2. Select your Amazon marketplace, enter your brand name, primary category, tracked ASINs, and competitors
3. The setup wizard auto-discovers competitors using SimilarWeb audience overlap data
4. Configure analysis settings — auto-save reports and review mode are stored in your project's `CLAUDE.md`
5. Start analyzing with any command — all results are personalized to your brand context
6. Use `/memory` to browse past analyses, review methodology, or clean up old reports

## Data Sources

This plugin uses the **SimilarWeb MCP** for Amazon Shopper Intelligence data covering:

- Brand sales performance, search share, top keywords, and top products
- Category sales, top brands, top keywords, and market structure
- On-site search keyword performance, top brands per keyword, top products per keyword
- ASIN-level sales performance and keyword traffic drivers

Supports 6 Amazon marketplaces: US, UK, France, Germany, Canada, and Italy. Configure your marketplace during `/setup`.

### Supported Marketplaces

| Marketplace | Domain |
|------------|--------|
| Amazon US | amazon.com |
| Amazon UK | amazon.co.uk |
| Amazon France | amazon.fr |
| Amazon Germany | amazon.de |
| Amazon Canada | amazon.ca |
| Amazon Italy | amazon.it |

**Optional connectors:**
- Slack — for sharing reports and getting team context
