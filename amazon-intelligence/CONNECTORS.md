# Connectors

## How tool references work

This plugin relies on the **SimilarWeb MCP** as its core data source. It provides Amazon Shopper Intelligence data covering brands, categories, keywords, and products on amazon.com.

## Connectors for this plugin

| Category | Placeholder | Included servers | Purpose |
|----------|-------------|-----------------|---------|
| Amazon Intelligence | `similarweb` | SimilarWeb MCP | Brand, category, keyword, and product analytics on Amazon |
| Chat | `~~chat` | Slack | Share reports, get team context |

## SimilarWeb MCP capabilities

The SimilarWeb MCP provides these Amazon Intelligence tool families:

- **Brand tools**: Search brands, sales performance, top competitors, top keywords, top products, clicks share
- **Category tools**: Search categories, sales performance, top brands, top keywords, top products, category performance
- **Keyword tools**: On-site search keyword performance, top brands per keyword, top products per keyword
- **Product tools**: ASIN sales performance, top keywords driving traffic to a product

All data is for **amazon.com** (US marketplace) by default.
