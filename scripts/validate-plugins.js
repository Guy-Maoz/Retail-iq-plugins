#!/usr/bin/env node

/**
 * Deep-validate individual plugin structure.
 * Checks command/skill markdown files for valid frontmatter.
 */

const fs = require("fs");
const path = require("path");

const PLUGINS_DIR = path.resolve(__dirname, "..", "plugins");

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

function findMarkdownFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(full));
    } else if (entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

// Iterate plugins
const plugins = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory());

for (const pluginDir of plugins) {
  const pluginPath = path.join(PLUGINS_DIR, pluginDir.name);
  console.log(`\nPlugin: ${pluginDir.name}`);

  // Validate commands
  const commandsDir = path.join(pluginPath, "commands");
  const commandFiles = findMarkdownFiles(commandsDir);
  if (commandFiles.length > 0) {
    ok(`${commandFiles.length} command file(s)`);
    for (const file of commandFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const rel = path.relative(pluginPath, file);
      if (content.trim().length === 0) {
        error(`${rel}: empty file`);
      } else {
        ok(`${rel}`);
      }
    }
  }

  // Validate skills
  const skillsDir = path.join(pluginPath, "skills");
  if (fs.existsSync(skillsDir)) {
    const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    ok(`${skillDirs.length} skill(s)`);
    for (const skill of skillDirs) {
      const skillMd = path.join(skillsDir, skill.name, "SKILL.md");
      if (!fs.existsSync(skillMd)) {
        error(`skills/${skill.name}: missing SKILL.md`);
      } else {
        ok(`skills/${skill.name}/SKILL.md`);
      }
    }
  }

  // Validate .mcp.json if present
  const mcpPath = path.join(pluginPath, ".mcp.json");
  if (fs.existsSync(mcpPath)) {
    try {
      JSON.parse(fs.readFileSync(mcpPath, "utf-8"));
      ok(".mcp.json: valid JSON");
    } catch (e) {
      error(`.mcp.json: invalid JSON: ${e.message}`);
    }
  }
}

// Summary
console.log("\n" + "=".repeat(50));
if (errors > 0) {
  console.log(
    `\x1b[31mPlugin validation failed: ${errors} error(s), ${warnings} warning(s)\x1b[0m\n`
  );
  process.exit(1);
} else {
  console.log(
    `\x1b[32mPlugin validation passed: ${warnings} warning(s)\x1b[0m\n`
  );
}
