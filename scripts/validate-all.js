#!/usr/bin/env node

/**
 * Validate all plugins in the marketplace.
 * Checks: marketplace.json schema, plugin.json in each plugin, required files.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MARKETPLACE_PATH = path.join(ROOT, ".claude-plugin", "marketplace.json");
const PLUGINS_DIR = path.join(ROOT, "plugins");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  \x1b[31mERROR\x1b[0m ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  \x1b[33mWARN\x1b[0m  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  \x1b[32mOK\x1b[0m    ${msg}`);
}

// 1. Validate marketplace.json
console.log("\nValidating marketplace.json...");

let marketplace;
try {
  const raw = fs.readFileSync(MARKETPLACE_PATH, "utf-8");
  marketplace = JSON.parse(raw);
  ok("Valid JSON");
} catch (e) {
  error(`Invalid JSON: ${e.message}`);
  process.exit(1);
}

if (!marketplace.name) error("Missing required field: name");
else ok(`Marketplace name: ${marketplace.name}`);

if (!marketplace.owner?.name) error("Missing required field: owner.name");
else ok(`Owner: ${marketplace.owner.name}`);

if (!Array.isArray(marketplace.plugins))
  error("Missing required field: plugins (array)");
else ok(`${marketplace.plugins.length} plugin(s) registered`);

if (!marketplace.metadata?.description)
  warn("No marketplace description provided");

// 2. Check for duplicate plugin names
const pluginNames = new Set();
for (const plugin of marketplace.plugins || []) {
  if (pluginNames.has(plugin.name)) {
    error(`Duplicate plugin name: "${plugin.name}"`);
  }
  pluginNames.add(plugin.name);
}

// 3. Validate each plugin entry and its source directory
console.log("\nValidating plugins...");

for (const entry of marketplace.plugins || []) {
  console.log(`\n  Plugin: ${entry.name || "(unnamed)"}`);

  if (!entry.name) {
    error("Plugin entry missing name");
    continue;
  }
  if (!entry.source) {
    error(`${entry.name}: missing source`);
    continue;
  }

  // Resolve source path
  const sourcePath =
    typeof entry.source === "string"
      ? path.resolve(ROOT, entry.source)
      : null;

  if (!sourcePath) {
    ok(`${entry.name}: external source (skipping filesystem checks)`);
    continue;
  }

  if (!fs.existsSync(sourcePath)) {
    error(`${entry.name}: source directory not found: ${entry.source}`);
    continue;
  }
  ok(`Source directory exists`);

  // Check plugin.json
  const pluginJsonPath = path.join(sourcePath, ".claude-plugin", "plugin.json");
  if (fs.existsSync(pluginJsonPath)) {
    try {
      const pluginJson = JSON.parse(
        fs.readFileSync(pluginJsonPath, "utf-8")
      );
      if (!pluginJson.name) error(`${entry.name}: plugin.json missing name`);
      else ok(`plugin.json: name="${pluginJson.name}"`);

      if (!pluginJson.version)
        warn(`${entry.name}: plugin.json missing version`);
      if (!pluginJson.description)
        warn(`${entry.name}: plugin.json missing description`);
    } catch (e) {
      error(`${entry.name}: invalid plugin.json: ${e.message}`);
    }
  } else {
    warn(`${entry.name}: no .claude-plugin/plugin.json found`);
  }

  // Check for README
  const readmePath = path.join(sourcePath, "README.md");
  if (!fs.existsSync(readmePath)) {
    warn(`${entry.name}: no README.md`);
  } else {
    ok("README.md exists");
  }

  // Check for at least one component (commands, skills, agents, hooks)
  const components = ["commands", "skills", "agents", "hooks"];
  const found = components.filter((c) =>
    fs.existsSync(path.join(sourcePath, c))
  );
  if (found.length === 0) {
    warn(
      `${entry.name}: no standard component directories (commands/, skills/, agents/, hooks/)`
    );
  } else {
    ok(`Components: ${found.join(", ")}`);
  }
}

// Summary
console.log("\n" + "=".repeat(50));
if (errors > 0) {
  console.log(
    `\x1b[31mValidation failed: ${errors} error(s), ${warnings} warning(s)\x1b[0m\n`
  );
  process.exit(1);
} else {
  console.log(
    `\x1b[32mValidation passed: ${warnings} warning(s)\x1b[0m\n`
  );
}
