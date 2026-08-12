import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = readFileSync(join(root, "index.html"), "utf8");
const app = readFileSync(join(root, "app.js"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");

test("the landing page exposes a primary CTA and official release fallback", () => {
  assert.ok((html.match(/data-download-link/g) || []).length >= 2);
  assert.match(html, /HwpLens\.Setup\.1\.0\.3\.exe/);
  assert.match(html, /github\.com\/cybereun\/hwplens\/releases\/download\/v1\.0\.3/);
  assert.match(html, /github\.com\/cybereun\/hwplens\/releases\/tag\/v1\.0\.3/);
});

test("release enrichment validates the release page and installer before replacing fallback", () => {
  assert.match(app, /RELEASE_API/);
  assert.match(app, /isGithubReleaseUrl/);
  assert.match(app, /isGithubAssetUrl/);
  assert.match(app, /\.exe\$\/i/);
  assert.match(app, /updateReleaseUI\(FALLBACK_RELEASE\)/);
  assert.match(app, /controller\.abort/);
});

test("the story is navigable without relying on wheel hijacking", () => {
  assert.match(html, /href="#problem"/);
  assert.match(html, /href="#workflow"/);
  assert.match(html, /href="#features"/);
  assert.match(html, /href="#release"/);
  assert.match(html, /href="#faq"/);
  assert.doesNotMatch(app, /addEventListener\(["']wheel/);
  assert.match(css, /scroll-snap-type:\s*y proximity/);
});

test("accessibility and reduced-motion escape hatches are present", () => {
  assert.match(html, /aria-label="모션 줄이기"/);
  assert.match(html, /<details>/);
  assert.match(html, /<noscript>/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(app, /hwplens-motion-preference/);
});

test("the fixed navigation is visually separated from light story sections", () => {
  assert.match(css, /\.topbar\s*\{[\s\S]*position:\s*fixed/);
  assert.match(css, /\.topbar\s*\{[\s\S]*background:\s*rgba\(7, 9, 20, 0\.82\)/);
  assert.match(css, /\.topbar\s*\{[\s\S]*backdrop-filter:\s*blur\(18px\)/);
  assert.match(css, /\.chapter--problem,[\s\S]*color:\s*var\(--ink\)/);
});

test("responsive content guardrails exist for a 320px viewport", () => {
  assert.match(css, /min-width:\s*320px/);
  assert.match(css, /@media\s*\(max-width:\s*440px\)/);
  assert.match(css, /overflow-x:\s*hidden/);
});
