---

description: "Task list for the HwpLens product landing site"

---

# Tasks: HwpLens Product Landing Site

**Input**: Design documents from `specs/001-hwplens-landing/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, and
`quickstart.md`

**Tests**: Smoke and validation checks are included because release-link fallback, accessibility,
and responsive behavior are explicit quality gates in the plan.

**Organization**: Tasks are grouped by user story so each story can be validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase when files do not overlap.
- **[Story]**: User story mapping (`US1`, `US2`, or `US3`).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the dependency-free static site and local preview surface.

- [X] T001 Create the root static-site file structure in `index.html`, `styles.css`, `app.js`,
  `assets/`, `scripts/`, and `tests/`.
- [X] T002 [P] Add dependency-free preview and test scripts in `package.json` and implement the
  local static server in `server.cjs`.
- [X] T003 [P] Copy the official product visuals into `assets/hwplens-logo.png`,
  `assets/hwplens-icon.png`, and `assets/favicon.png`.
- [X] T004 [P] Add page metadata, favicon references, and a no-script fallback notice in
  `index.html`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared semantic shell, visual tokens, and verified release state that every
user story depends on.

- [X] T005 Define the document landmarks, header, navigation anchors, main content container, and
  footer shell in `index.html`.
- [X] T006 [P] Define color tokens, typography, spacing, focus states, responsive breakpoints, and
  reduced-motion CSS states in `styles.css`.
- [X] T007 [P] Add the verified v1.0.3 fallback release record and GitHub URL validation helpers in
  `app.js` according to `contracts/github-release-metadata.md`.
- [X] T008 [P] Add the static content/release/link contract checks in `scripts/validate.mjs` and
  `tests/smoke.test.mjs`.

**Checkpoint**: The page has a valid static shell, a trustworthy release fallback, and a runnable
local validation command before story-specific polish begins.

---

## Phase 3: User Story 1 - Understand the product in one scroll (Priority: P1) — MVP

**Goal**: Let a first-time visitor understand HwpLens through a clear, wheel-friendly chapter
narrative on desktop and mobile.

**Independent Test**: Scroll from the hero to the capability section with a mouse wheel, touchpad,
touch gesture, or keyboard and confirm the core story, progress cue, and responsive content remain
available with reduced motion enabled.

### Implementation for User Story 1

- [X] T009 [US1] Add the hero, problem, workflow, and capability chapters with Korean-first copy,
  stable anchor IDs, and descriptive product-image alt text in `index.html`.
- [X] T010 [P] [US1] Style chapter layouts, scroll-snap proximity, reveal states, mock explorer
  preview, progress rail, and mobile stacking in `styles.css`.
- [X] T011 [US1] Implement chapter intersection tracking, active progress state, scroll-reveal
  classes, and anchor navigation enhancement in `app.js` without hijacking wheel events.
- [X] T012 [US1] Add content and interaction assertions for chapter anchors, key copy, and reduced
  motion hooks in `tests/smoke.test.mjs`.

**Checkpoint**: A visitor can understand the app without opening another page or completing a
forced animation.

---

## Phase 4: User Story 2 - Download the current Windows release (Priority: P1)

**Goal**: Make the official installer and release page easy to reach from both the opening screen
and the final conversion chapter.

**Independent Test**: Activate either download CTA with the live release lookup available and with
it blocked; verify a valid installer or official release-page fallback is always used.

### Implementation for User Story 2

- [X] T013 [US2] Add the hero CTA, release chapter, release facts, GitHub repository link, release
  notes link, and fallback status text in `index.html`.
- [X] T014 [US2] Implement the short-timeout latest-release lookup, asset selection, fallback
  transition, CTA synchronization, version/date/size formatting, and source status label in
  `app.js`.
- [X] T015 [P] [US2] Style the download card, installer CTA, release facts, external-link labels,
  and loading/fallback states in `styles.css`.
- [X] T016 [US2] Extend release assertions for the v1.0.3 asset name, official GitHub host, fallback
  release page, and no-fabricated-URL rule in `tests/smoke.test.mjs`.

**Checkpoint**: The primary product outcome works even when GitHub API enrichment is unavailable.

---

## Phase 5: User Story 3 - Verify fit and safety before installing (Priority: P2)

**Goal**: Give cautious visitors compact proof points and a usable answer for the documented setup
issue before they install.

**Independent Test**: Find Windows 11, HWP/HWPX, v1.0.3, the latest USB fix, license signal, and
the port-conflict FAQ using scroll, keyboard, and an accessible disclosure control.

### Implementation for User Story 3

- [X] T017 [US3] Add the platform/format/version/release-fix fact grid, license note, and port
  conflict FAQ disclosure in `index.html`.
- [X] T018 [P] [US3] Style the fact grid, FAQ details/summary states, motion-control button, and
  visible keyboard focus treatment in `styles.css`.
- [X] T019 [US3] Implement the motion preference toggle, local preference persistence, FAQ-safe
  behavior, and `aria-pressed`/status updates in `app.js`.
- [X] T020 [US3] Add assertions for FAQ copy, focusable controls, reduced-motion attribute handling,
  and 320px-safe content hooks in `tests/smoke.test.mjs`.

**Checkpoint**: Visitors can verify fit and handle the documented port issue without leaving the
site.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete experience and document the simplest handoff path.

- [X] T021 [P] Add shared content strings, external-link safety attributes, and final SEO/social
  metadata in `index.html`.
- [X] T022 [P] Add image sizing, lazy-loading where safe, contrast-safe decorative gradients, and
  reduced-motion overrides in `styles.css`.
- [X] T023 Run the static checks and JavaScript syntax checks from `scripts/validate.mjs` and
  `tests/smoke.test.mjs`; fix any contract or content failures in the referenced source files.
- [X] T024 Run the local preview from `server.cjs` and complete the manual scenarios in
  `specs/001-hwplens-landing/quickstart.md`, recording any final fixes in the source files.
- [X] T025 Document local preview, static deployment, release-link update behavior, and asset
  provenance in `README.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the static project surface.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on T005–T008; delivers the MVP narrative.
- **User Story 2 (Phase 4)**: Depends on T007–T008 and the shared shell; can proceed after the
  release contract is in place.
- **User Story 3 (Phase 5)**: Depends on T005–T008; can proceed independently from US2.
- **Polish (Phase 6)**: Depends on all desired stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories after foundational work.
- **US2 (P1)**: Uses the shared release model from foundational work; does not depend on US1's
  scroll code.
- **US3 (P2)**: Uses the shared shell and motion primitives; does not depend on US2's live lookup.

### Parallel Opportunities

- T002–T004 can run in parallel after the root structure exists.
- T006–T008 can run in parallel once the setup files exist.
- After Phase 2, the HTML, CSS, and JavaScript tasks within each story can be coordinated by file
  ownership; T010 and T015/T018 are parallel only when they touch separate CSS sections.
- T021, T022, and T025 can run in parallel after the story checkpoints.

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete User Story 1 and validate the scroll narrative independently.
3. Add User Story 2 to make the official download path production-ready.
4. Add User Story 3 and then complete cross-cutting polish.

### Delivery Notes

- Keep the direct GitHub release-page fallback in the initial HTML so the page remains useful before
  JavaScript initializes.
- Never replace a verified URL with a value that has not passed the release contract validation.
- Keep motion additive: every story must remain readable and navigable when motion is reduced.
