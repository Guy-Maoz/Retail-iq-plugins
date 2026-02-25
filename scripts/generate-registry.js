#!/usr/bin/env node

/**
 * Generate a registry.json summary of all plugins for quick browsing.
 * Reads marketplace.json + each plugin's plugin.json and outputs a flat registry.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MARKETPLACE_PATH = path.join(ROOT, ".claude-plugin", "marketplace.json");
const OUTPUT_PATH = path.join(ROOT, "registry.json");

const marketplace = JSON.parse(fs.readFileSync(MARKETPLACE_PATH, "utf-8"));

const registry = {
  name: marketplace.name,
  generated: new Date().toISOString(),
  total_plugins: marketplace.plugins.length,
  plugins: [],
};

for (const entry of marketplace.plugins) {
  const plugin = {
    name: entry.name,
    description: entry.description || "",
    version: entry.version || "0.0.0",
    category: entry.category || "uncategorized",
    keywords: entry.keywords || [],
    author: entry.author?.name || marketplace.owner.name,
    source: entry.source,
    commands: [],
    skills: [],
  };

  // Read components from source directory if local
  const sourcePath =
    typeof entry.source === "string"
      ? path.resolve(ROOT, entry.source)
      : null;

  if (sourcePath && fs.existsSync(sourcePath)) {
    // Commands
    const commandsDir = path.join(sourcePath, "commands");
    if (fs.existsSync(commandsDir)) {
      plugin.commands = fs.readdirSync(commandsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""));
    }

    // Skills
    const skillsDir = path.join(sourcePath, "skills");
    if (fs.existsSync(skillsDir)) {
      plugin.skills = fs.readdirSync(skillsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    }

    // Agents
    const agentsDir = path.join(sourcePath, "agents");
    if (fs.existsSync(agentsDir)) {
      plugin.agents = fs.readdirSync(agentsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""));
    }
  }

  registry.plugins.push(plugin);
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2) + "\n");
console.log(`Registry generated: ${OUTPUT_PATH}`);
console.log(`  ${registry.total_plugins} plugin(s) indexed`);
