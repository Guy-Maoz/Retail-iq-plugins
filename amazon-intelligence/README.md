# Amazon Intelligence Plugin

A SimilarWeb Amazon Intelligence plugin for [Cowork](https://claude.com/product/cowork), Anthropic's agentic desktop application. Built for ecommerce teams managing brands on Amazon — provides competitive intelligence, keyword strategy, category analysis, product performance tracking, and brand health monitoring powered by SimilarWeb Shopper Intelligence data.

## Installation

```
claude plugins add amazon-intelligence
```

## What It Does

This plugin gives ecommerce teams an AI-powered Amazon intelligence partner that can:

- **Competitive Intelligence** — Analyze competitor brands, compare search share of voice, discover keyword battlegrounds, and benchmark sales performance across your competitive set.
- **Keyword Strategy** — Find high-value Amazon search keywords, identify gaps in your keyword coverage, track keyword trends, and see which brands and products win on specific search terms.
- **Category Intelligence** — Analyze category size and growth, understand market structure, identify top brands and products, and spot seasonal demand patterns.
- **Product Analytics** — Track ASIN-level sales performance, identify keyword drivers for each product, classify your portfolio (stars, cash cows, rising stars), and benchmark against competing products.
- **Brand Performance** — Monitor brand health with sales trends, search share tracking, portfolio optimization, and automated competitive alerts.

## Commands

| Command | What It Does |
|---|---|
| `/setup` | Set up your brand profile — ASINs, competitors, and categories |
| `/market-overview` | Full market overview of your Amazon category |
| `/competitive-report` | Deep-dive competitive analysis against your competitors |
| `/keyword-intel` | Keyword opportunity analysis — portfolio, gaps, or single keyword |
| `/product-performance` | ASIN-level performance analysis and portfolio review |
| `/brand-monitor` | Brand health monitoring report with alerts |

## Skills

| Skill | What It Covers |
|---|---|
| `competitive-intelligence` | Share of voice, competitor benchmarking, keyword battlegrounds, competitor discovery |
| `keyword-strategy` | Keyword portfolio, ASIN keyword drivers, category keyword landscape, gap analysis |
| `category-intelligence` | Category sizing, trend analysis, brand concentration, consumer demand signals |
| `product-analytics` | ASIN performance, portfolio classification, competitive product comparison |
| `brand-performance` | Brand health dashboard, trend analysis, search share, portfolio optimization |

## Getting Started

1. Run `/setup` to configure your brand profile
2. Enter your brand name, primary category, tracked ASINs, and competitors
3. The setup wizard auto-discovers competitors using SimilarWeb audience overlap data
4. Start analyzing with any command — all results are personalized to your brand context

## Data Sources

This plugin uses the **SimilarWeb MCP** for Amazon Shopper Intelligence data covering:

- Brand sales performance, search share, top keywords, and top products
- Category sales, top brands, top keywords, and market structure
- On-site search keyword performance, top brands per keyword, top products per keyword
- ASIN-level sales performance and keyword traffic drivers

All data is for the **US marketplace** (amazon.com) by default.

**Optional connectors:**
- Slack — for sharing reports and getting team context
