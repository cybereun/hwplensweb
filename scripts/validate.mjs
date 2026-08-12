import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (file) => readFileSync(join(root, file), "utf8");

const html = read("index.html");
const css = read("styles.css");
const app = read("app.js");

const requiredAssets = [
  "assets/hwplens-logo.png",
  "assets/hwplens-icon.png",
  "assets/favicon.png",
];

requiredAssets.forEach((asset) => {
  const assetPath = join(root, asset);
  assert.ok(existsSync(assetPath), `Missing asset: ${asset}`);
  assert.ok(statSync(assetPath).size > 1000, `Asset is unexpectedly small: ${asset}`);
});

[
  "HwpLens",
  ".hwp",
  ".hwpx",
  "HwpLens.Setup.1.0.3.exe",
  "https://github.com/cybereun/hwplens/releases/download/v1.0.3/HwpLens.Setup.1.0.3.exe",
  "https://github.com/cybereun/hwplens/releases/tag/v1.0.3",
  "motionToggle",
  "data-download-link",
  "data-progress-target",
  "<noscript>",
].forEach((value) => assert.ok(html.includes(value), `index.html is missing: ${value}`));

[
  "scroll-snap-type",
  "prefers-reduced-motion",
  ":focus-visible",
  "@media (max-width: 760px)",
  "html[data-motion=\"reduced\"]",
].forEach((value) => assert.ok(css.includes(value), `styles.css is missing: ${value}`));

[
  "FALLBACK_RELEASE",
  "api.github.com/repos/cybereun/hwplens/releases/latest",
  "AbortController",
  "IntersectionObserver",
  "normaliseRelease",
  "localStorage",
].forEach((value) => assert.ok(app.includes(value), `app.js is missing: ${value}`));

const syntax = spawnSync(process.execPath, ["--check", join(root, "app.js")], { encoding: "utf8" });
assert.equal(syntax.status, 0, syntax.stderr || "app.js syntax check failed");

console.log("Static validation passed: assets, release fallback, accessibility hooks, and motion controls are present.");
