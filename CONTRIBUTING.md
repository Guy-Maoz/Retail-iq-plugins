# Contributing a Plugin

This marketplace follows the official [Claude Code plugin format](https://code.claude.com/docs/en/plugins). Here's how to add a new plugin.

## Plugin Structure

Every plugin lives in its own directory under `plugins/`:

```
plugins/your-plugin-name/
  .claude-plugin/
    plugin.json               # Required: plugin manifest
  .mcp.json                   # Optional: MCP server connections
  commands/                   # Optional: slash command definitions
    your-command.md
  skills/                     # Optional: skill definitions
    your-skill/
      SKILL.md
  agents/                     # Optional: sub-agent definitions
    your-agent.md
  hooks/                      # Optional: event hooks
  references/                 # Optional: reference docs
  README.md                   # Recommended: plugin documentation
```

## Step by Step

### 1. Create the plugin directory

```bash
mkdir -p plugins/your-plugin-name/.claude-plugin
mkdir -p plugins/your-plugin-name/commands
mkdir -p plugins/your-plugin-name/skills/your-skill
```

### 2. Create plugin.json

```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "What your plugin does in one sentence.",
  "author": {
    "name": "Your Name"
  }
}
```

Save this to `plugins/your-plugin-name/.claude-plugin/plugin.json`.

### 3. Add commands

Commands are markdown files in the `commands/` directory. Each file becomes a slash command (e.g., `commands/analyze.md` becomes `/analyze`).

```markdown
---
description: Analyze something useful
---

# /analyze

Analyze the user's request using the following approach:

1. Step one
2. Step two
3. Step three
```

### 4. Add skills

Skills are `SKILL.md` files inside named directories under `skills/`. The directory name becomes the skill name.

```markdown
---
description: Expert at doing a specific thing
---

You are an expert at [domain]. When asked about [topic], follow these guidelines:

- Guideline 1
- Guideline 2
```

### 5. Add MCP connections (optional)

If your plugin needs external data sources, create `.mcp.json`:

```json
{
  "mcpServers": {
    "your-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

### 6. Register in the marketplace

Add your plugin to `.claude-plugin/marketplace.json` in the `plugins` array:

```json
{
  "name": "your-plugin-name",
  "source": "./plugins/your-plugin-name",
  "description": "What your plugin does",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  },
  "keywords": ["relevant", "keywords"],
  "category": "analytics"
}
```

### 7. Validate

```bash
npm run validate
```

Fix any errors before submitting.

## Plugin Categories

Use one of these categories in your marketplace entry:

| Category | For |
|----------|-----|
| `analytics` | Data analysis, reporting, dashboards |
| `productivity` | Workflow tools, automation |
| `development` | Code quality, testing, CI/CD |
| `security` | Security scanning, compliance |
| `integrations` | Third-party service connectors |

## Guidelines

- **Self-contained**: Plugins can't reference files outside their directory (they get copied to a cache on install)
- **Kebab-case names**: Use `my-plugin-name`, not `myPluginName`
- **Versioning**: Use semver (`1.0.0`, `1.1.0`, `2.0.0`)
- **Document everything**: Add a README.md to your plugin explaining what it does and how to use it
- **Test locally**: Use `/plugin marketplace add ./` to test the full marketplace locally before submitting
