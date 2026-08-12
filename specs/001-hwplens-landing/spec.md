# Feature Specification: HwpLens Product Landing Site

**Feature Branch**: `001-hwplens-landing`

**Created**: 2026-08-12

**Status**: Ready for planning

**Input**: User description: "Create a website for HwpLens so people can understand the app and
download the latest release, using a modern mouse-wheel scrolling experience, in a new
`L:\\codex-L\\hwplensweb` folder."

## User Scenarios & Testing

### User Story 1 - Understand the product in one scroll (Priority: P1)

A visitor who has never heard of HwpLens can move through a clear, chapter-based landing page and
quickly understand that it is a Windows 11-style explorer for finding, previewing, and managing
local HWP/HWPX documents without opening a heavy office application for every file.

**Why this priority**: The site must create enough product confidence before asking a new visitor
to download an installer.

**Independent Test**: Starting at the top of the page, scroll through the page with a mouse wheel
or touch gesture and confirm that the core problem, product promise, and three key capabilities are
understandable without opening another page.

**Acceptance Scenarios**:

1. **Given** a first-time visitor at the top of the page, **When** they scroll down one or more
   chapters, **Then** the page reveals the product story in a stable order with visible progress
   cues and no required animation step.
2. **Given** a visitor reading on a narrow screen, **When** they use touch scrolling, **Then** the
   same core story and calls to action remain readable without horizontal overflow.
3. **Given** a visitor who prefers reduced motion, **When** the page loads or they scroll, **Then**
   the narrative remains fully available with motion reduced or removed.

---

### User Story 2 - Download the current Windows release (Priority: P1)

A visitor who decides HwpLens is useful can identify the current release, choose the Windows
installer, and reach the official GitHub download in one obvious action. The page also offers a
route to the release notes and source repository for trust.

**Why this priority**: Download conversion is the primary business outcome of the site.

**Independent Test**: From the first screen and from the final download chapter, activate the main
download CTA and verify that it resolves to the inspected v1.0.3 GitHub release asset or a stable
GitHub release fallback when live metadata is unavailable.

**Acceptance Scenarios**:

1. **Given** the v1.0.3 release is available, **When** a visitor activates a download CTA, **Then**
   the browser opens or downloads `HwpLens.Setup.1.0.3.exe` from the official GitHub release URL.
2. **Given** the release asset cannot be looked up at runtime, **When** a visitor activates a
   download CTA, **Then** the page still provides the v1.0.3 GitHub release page without showing a
   fabricated or broken asset URL.
3. **Given** a visitor wants to inspect changes first, **When** they choose release notes or source
   repository, **Then** the official GitHub destination opens in a clearly labeled external tab.

---

### User Story 3 - Verify fit and safety before installing (Priority: P2)

A cautious visitor can scan supported formats, platform, release date, license signal, and the
latest change summary before downloading. They can also find a concise answer for common setup or
port-conflict questions.

**Why this priority**: Release transparency reduces hesitation and support burden for a desktop
application distributed outside an app store.

**Independent Test**: Scroll to the release and FAQ areas and verify that platform, supported file
types, current version, latest fix, licensing note, and a troubleshooting route are all visible and
legible.

**Acceptance Scenarios**:

1. **Given** a visitor reviews the product details, **When** they scan the facts panel, **Then** they
   can find Windows 11, HWP/HWPX, v1.0.3, and the latest USB volume-name fix without reading a long
   paragraph.
2. **Given** a visitor is unsure about running the app, **When** they open the FAQ item about a
   port conflict, **Then** they receive a concise action-oriented explanation and a recommendation
   to use the latest release.

---

### Edge Cases

- If JavaScript is disabled or fails before initialization, the page MUST retain readable content,
  normal anchor navigation, and a direct GitHub release link.
- If the GitHub release response is slow, blocked, or malformed, the page MUST keep the static
  release fallback and MUST NOT leave the primary CTA disabled indefinitely.
- If the installer asset is renamed in a future release, the page MUST prefer the release page
  fallback rather than guessing an asset filename.
- If viewport height is short, the scroll narrative MUST not hide the CTA behind fixed overlays.
- If a user navigates with a keyboard, focus MUST be visible and all links, FAQ controls, and the
  motion toggle MUST be operable without a pointer.

## Requirements

### Functional Requirements

- **FR-001**: The page MUST present HwpLens as a Windows application for exploring, previewing,
  and managing local HWP/HWPX documents.
- **FR-002**: The page MUST organize the story into scrollable chapters with a visible chapter or
  progress indicator.
- **FR-003**: The page MUST include a primary download CTA in the opening viewport and a repeated
  download CTA near the end of the story.
- **FR-004**: The page MUST identify v1.0.3 as the featured release at implementation time and
  link its installer to the official GitHub release asset
  `HwpLens.Setup.1.0.3.exe`.
- **FR-005**: The page MUST provide a stable GitHub release-page fallback when live asset metadata
  cannot be used, and MUST never construct an unverified asset URL.
- **FR-006**: The page MUST provide clearly labeled links to the GitHub repository and release
  notes.
- **FR-007**: The page MUST communicate at least these capabilities: fast HWP/HWPX preview,
  Windows 11-style file management, and search/sort/view controls.
- **FR-008**: The page MUST show concise release facts for platform, supported formats, current
  version, latest release date, and the v1.0.3 USB volume-name fix.
- **FR-009**: The page MUST include an expandable FAQ item for the documented port-conflict issue
  and recommend updating to v1.0.2 or newer, with v1.0.3 featured.
- **FR-010**: The page MUST provide a visible way to reduce or disable non-essential motion and
  honor the visitor's reduced-motion preference.
- **FR-011**: The page MUST remain usable with mouse wheel, touch scrolling, keyboard navigation,
  and ordinary anchor links.
- **FR-012**: The page MUST be responsive from small mobile widths through large desktop widths
  and MUST avoid horizontal scrolling for core content.
- **FR-013**: The page MUST use descriptive link labels, semantic interactive controls, readable
  contrast, visible focus indicators, and text alternatives for product imagery.
- **FR-014**: External GitHub links MUST be visually identifiable and MUST use safe new-tab behavior
  where appropriate.

### Key Entities

- **Release**: The featured HwpLens version, release date, release notes URL, release page URL, and
  verified installer asset URL.
- **Story Chapter**: A named section in the scroll narrative with a purpose, headline, supporting
  copy, and optional product visual.
- **Download CTA**: A labeled action that points either to the verified installer asset or the
  official release page fallback.
- **FAQ Item**: A question and concise answer about setup or a known issue, initially including the
  port conflict question.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify what HwpLens does and the supported document types
  within 15 seconds of landing on the page.
- **SC-002**: The primary download action is visible without scrolling on desktop and within the
  first two viewport heights on mobile.
- **SC-003**: In manual usability checks, at least 9 of 10 participants can reach the official
  installer or release page from the first screen or final chapter within two interactions.
- **SC-004**: The complete story remains available with reduced motion enabled and with JavaScript
  unavailable, aside from live release metadata enrichment.
- **SC-005**: The page introduces no horizontal scrolling and keeps all primary text and controls
  readable at 320px viewport width.
- **SC-006**: All release-specific claims shown on the page match the inspected GitHub repository or
  release response at the time of handoff.

## Assumptions

- The primary audience is Korean-speaking Windows users who work with HWP/HWPX documents; the
  marketing copy will therefore be Korean-first.
- The website is a static public landing page and does not need accounts, a database, checkout, or
  in-site installer hosting.
- GitHub Releases remains the source of truth for the installer and release notes.
- The current inspected release remains v1.0.3 during implementation; future releases can update
  the release configuration without redesigning the page.
- Product visuals may reuse the official repository's HwpLens logo and icon assets.
- The page will be previewed through a local static server before handoff.
