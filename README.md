# SimilarWeb Plugins for Claude Code

A plugin marketplace for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — SimilarWeb intelligence tools for ecommerce, competitive analysis, and market research.

## Quick Start

```bash
# Add the SimilarWeb marketplace
/plugin marketplace add <your-org>/similarweb-plugins

# Browse available plugins
/plugin search @similarweb-plugins

# Install a plugin
/plugin install amazon-intelligence@similarweb-plugins
```

## Available Plugins

| Plugin | Description | Commands | Skills |
|--------|-------------|----------|--------|
| **[amazon-intelligence](plugins/amazon-intelligence/)** | Amazon category trends, competitive landscape, keyword opportunities, product performance, and brand health | 7 | 8 |

## Plugin Categories

### Analytics
- **amazon-intelligence** — Full Amazon Shopper Intelligence suite powered by SimilarWeb data. Competitive benchmarking, keyword strategy, keyword gap analysis, category analysis, ASIN tracking, brand monitoring, and analysis memory management with methodology audit trails for ecommerce teams.

## Installation Options

### Option 1: Plugin Marketplace (Recommended)

```bash
# Add marketplace
/plugin marketplace add <your-org>/similarweb-plugins

# Install specific plugins
/plugin install amazon-intelligence@similarweb-plugins
```

### Option 2: Local Development

```bash
# Clone repository
git clone <repo-url>
cd similarweb-plugins

# Install locally for testing
/plugin marketplace add ./
/plugin install amazon-intelligence@similarweb-plugins
```

## Adding a New Plugin

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. In short:

1. Create a directory under `plugins/your-plugin-name/`
2. Add `.claude-plugin/plugin.json` with name, version, description
3. Add commands, skills, agents, or hooks
4. Register it in `.claude-plugin/marketplace.json`
5. Run `npm run validate` to check everything

## Validation

```bash
# Validate marketplace structure and all plugins
npm run validate

# Deep-validate plugin contents
npm run validate:plugins

# Generate registry.json summary
npm run generate:registry
```

## Repository Structure

```
similarweb-plugins/
  .claude-plugin/
    marketplace.json          # Plugin catalog (the marketplace registry)
  plugins/
    amazon-intelligence/      # Each plugin is a self-contained directory
      .claude-plugin/
        plugin.json           # Plugin manifest
      .mcp.json               # MCP server connections
      commands/               # Slash commands
      skills/                 # Skills (domain knowledge)
      agents/                 # Sub-agents (e.g., review-agent)
      references/             # Reference docs for the plugin
      README.md               # Plugin documentation
  scripts/
    validate-all.js           # Marketplace + plugin validation
    validate-plugins.js       # Deep plugin content validation
    generate-registry.js      # Generate registry.json for browsing
  CONTRIBUTING.md             # Guide for plugin authors
  package.json                # npm scripts for validation
  registry.json               # Auto-generated plugin index
```

## Data Sources

All plugins in this marketplace connect to the **SimilarWeb MCP** server for data. Plugins may also integrate with optional connectors like Slack for sharing reports.

## License

MIT
