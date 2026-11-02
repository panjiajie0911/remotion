import fs from "node:fs";
import path from "node:path";

// Directories that must stay on design tokens. Legacy episodes are reported but
// not blocked while they are migrated one at a time.
const enforced = ["episodes/episode-03", "design-system", "components/intro"];
const legacy = ["episodes/episode-01", "episodes/episode-02", "episodes/episode-04", "components/text", "components/ui", "components/animation"];

const root = path.resolve("src");
const files = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) files.push(full);
  }
};

walk(root);

const checks = [
  { label: "raw hex colour", pattern: /#[0-9a-fA-F]{3,8}\b/g },
  { label: "raw font size", pattern: /\bfontSize:\s*\d/g },
];

const relative = (file) => path.relative(root, file).replaceAll("\\", "/");
const blocking = [];
const warnings = [];

for (const file of files) {
  const rel = relative(file);
  const scope = enforced.some((dir) => rel.startsWith(`${dir}/`))
    ? "enforced"
    : legacy.some((dir) => rel.startsWith(`${dir}/`))
      ? "legacy"
      : null;
  if (!scope) continue;

  const source = fs.readFileSync(file, "utf8");
  for (const check of checks) {
    for (const match of source.matchAll(check.pattern)) {
      const line = source.slice(0, match.index).split("\n").length;
      const entry = `${rel}:${line}  ${check.label}  ${match[0]}`;
      if (scope === "enforced") blocking.push(entry);
      else warnings.push(entry);
    }
  }
}

if (warnings.length) {
  console.log(`Legacy files still on hard-coded values: ${warnings.length}`);
}

if (blocking.length) {
  console.error(`Design token violations: ${blocking.length}`);
  for (const entry of blocking) console.error(`  ${entry}`);
  process.exit(1);
}

console.log("Design token check passed for episode-03, design-system and shared intro.");
