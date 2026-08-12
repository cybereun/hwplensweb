# Implementation Plan: HwpLens Product Landing Site

**Branch**: `001-hwplens-landing` | **Date**: 2026-08-12 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `L:\\codex-L\\hwplensweb\\specs\\001-hwplens-landing\\spec.md`

## Summary

Build a Korean-first static product site that introduces HwpLens through an editorial, scroll-led
story and converts visitors through verified GitHub Release download links. The page will use plain
HTML, CSS, and browser JavaScript so it can be opened from any static host. A small release lookup
will enrich the page from GitHub's public latest-release endpoint, while a verified v1.0.3 release
configuration remains the safe fallback.

## Technical Context

**Language/Version**: HTML5, CSS, modern browser JavaScript (ES2020+)

**Primary Dependencies**: None at runtime; browser APIs only

**Storage**: None; optional `localStorage` for the visitor's motion preference

**Testing**: Node.js built-in assertions and syntax checks; local static-server preview; manual
responsive, keyboard, reduced-motion, and fallback checks

**Target Platform**: Modern desktop and mobile browsers; static hosting; primary audience on
Windows 11

**Project Type**: Static web landing page

**Performance Goals**: First meaningful content visible immediately from local/static hosting; the
  first screen must remain lightweight and the scroll narrative must stay responsive at 60 fps on a
  typical laptop when motion is enabled

**Constraints**: No backend, account, analytics, build service, or required third-party CDN; primary
  CTA must work without live API data; no horizontal overflow at 320px viewport width

**Scale/Scope**: One landing page with six story chapters, one release data source, one FAQ group,
  and a small set of product assets

## Constitution Check

*GATE: Pass before Phase 0 research.*

- **I. Download-First Product Story**: Pass. The hero and release chapter both expose a verified
  download CTA; all copy leads toward the product decision.
- **II. Scroll Narrative With Direct Control**: Pass. Intersection-based reveals and scroll snap
  proximity enhance normal scrolling; anchor links, keyboard, touch, and reduced motion remain
  available.
- **III. Trustworthy, Accessible Interface**: Pass. Semantic sections, visible focus states,
  descriptive labels, safe external links, and non-script fallback content are planned.
- **IV. Static-First Simplicity**: Pass. There is no framework, backend, database, or runtime
  dependency; the page is deployable as static files.
- **V. Verifiable Release Communication**: Pass. The static fallback is based on the inspected
  v1.0.3 GitHub release, and runtime enrichment is validated before changing the CTA.

## Phase 0: Research Decisions

Research is recorded in [research.md](research.md). Decisions resolved before implementation:

1. Use non-blocking scroll reveals instead of hijacking the wheel so the experience remains
   accessible and works with touch/keyboard input.
2. Use a verified static release fallback plus a short-timeout latest-release lookup so download
   conversion survives API failure.
3. Reuse the official HwpLens logo/icon assets supplied by the source repository instead of adding
   an unverified visual identity.

## Phase 1: Design & Contracts

- [data-model.md](data-model.md) defines the release, chapter, CTA, and FAQ data used by the page.
- [contracts/github-release-metadata.md](contracts/github-release-metadata.md) defines the external
  GitHub release response fields and validation/fallback rules.
- [quickstart.md](quickstart.md) defines the local preview and validation scenarios.

## Project Structure

### Documentation (this feature)

```text
specs/001-hwplens-landing/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── github-release-metadata.md
└── tasks.md
```

### Source Code (repository root)

```text
hwplensweb/
├── index.html                 # semantic landing page and no-script content
├── styles.css                 # responsive visual system and motion states
├── app.js                     # scroll narrative, motion toggle, release enrichment
├── package.json               # dependency-free preview/test commands
├── server.cjs                 # tiny local static server for validation
├── scripts/
│   └── validate.mjs           # static contract and syntax checks
├── tests/
│   └── smoke.test.mjs         # release/fallback and content smoke checks
└── assets/
    ├── hwplens-logo.png
    ├── hwplens-icon.png
    └── favicon.png
```

**Structure Decision**: Use a single static project at the repository root. The page has no
backend concerns, and keeping all source files flat makes preview/deployment and future release
updates obvious.

## Complexity Tracking

No constitution violations. No additional complexity requires justification.
