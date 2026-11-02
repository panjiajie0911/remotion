import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, "node_modules", ".cache", "notosanssc");
const baseFont = process.env.NOTOSANSSC_TTF ?? path.join(cacheDir, "NotoSansSC-VF.ttf");
const charsFile = path.join(cacheDir, "glyphs.txt");
const output = path.join(root, "src", "assets", "font", "NotoSansSC-VF-subset.woff2");
const sourceUrl =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf";

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|css|md|txt)$/.test(entry.name)) files.push(full);
  }
  return files;
};

const chars = new Set(
  Array.from({length: 95}, (_, index) => String.fromCharCode(32 + index)),
);
for (const file of walk(path.join(root, "src"))) {
  for (const char of fs.readFileSync(file, "utf8")) chars.add(char);
}
for (const char of "，。！？：；“”‘’、（）《》…—·　") chars.add(char);

fs.mkdirSync(cacheDir, {recursive: true});
fs.mkdirSync(path.dirname(output), {recursive: true});
fs.writeFileSync(charsFile, Array.from(chars).sort().join(""), "utf8");

if (!fs.existsSync(baseFont)) {
  console.log("Downloading the Noto Sans SC variable font...");
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Font download failed (${response.status}). Set NOTOSANSSC_TTF to a local file.`);
  }
  fs.writeFileSync(baseFont, Buffer.from(await response.arrayBuffer()));
}

const python = process.env.PYTHON ?? "python";
const result = spawnSync(
  python,
  [
    "-m",
    "fontTools.subset",
    baseFont,
    `--text-file=${charsFile}`,
    "--flavor=woff2",
    `--output-file=${output}`,
    "--layout-features=*",
    "--notdef-glyph",
    "--recommended-glyphs",
  ],
  {stdio: "inherit"},
);

if (result.error?.code === "ENOENT") {
  console.error("Python was not found. Install Python plus `fonttools` and `brotli`, then retry.");
  process.exit(1);
}
if (result.status !== 0) process.exit(result.status ?? 1);

const size = (fs.statSync(output).size / 1024).toFixed(0);
console.log(`Subset ${chars.size} characters -> src/assets/font/NotoSansSC-VF-subset.woff2 (${size} KB)`);
