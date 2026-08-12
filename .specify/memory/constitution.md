<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles: replaced all placeholder principles with five product-specific principles
- Added sections: Product Constraints; Quality Gates
- Removed sections: none
- Templates requiring updates: none; generic Spec Kit templates remain compatible
- Follow-up TODOs: none
-->

# HWP Lens Web Constitution

## Core Principles

### I. Download-First Product Story
The page MUST make the current release and its primary download action discoverable within the
first screen, and every major section MUST reinforce why HWP Lens is useful before asking the
visitor to download it. Release metadata and links MUST come from the authoritative GitHub
repository or release page rather than duplicated, unverified claims. The site exists to turn
curiosity into a confident download.

### II. Scroll Narrative With Direct Control
The experience MUST use vertical scrolling and wheel-friendly transitions to reveal the product
story in deliberate chapters. Motion MUST support orientation, not block reading or downloading;
keyboard navigation, reduced-motion preferences, touch scrolling, and ordinary anchor links MUST
remain usable. A visitor MUST be able to reach the download action without completing an animation.

### III. Trustworthy, Accessible Interface
The site MUST use semantic HTML, visible focus states, readable contrast, descriptive labels, and
proper external-link/download affordances. Important content MUST remain available when scripts
fail, a release lookup is unavailable, or motion is disabled. Korean copy is the default for the
product audience, with concise English labels only where they improve technical clarity.

### IV. Static-First Simplicity
The implementation MUST remain a small static web project unless a requirement proves a backend
necessary. It SHOULD prefer plain browser APIs and a minimal dependency surface, with no account,
database, analytics, or build-time service required for the core download journey. The project
MUST be easy to preview locally and deploy to any static host.

### V. Verifiable Release Communication
Every release-specific statement, asset name, version badge, and download URL MUST be traceable to
the GitHub repository or an inspected release response. If live release data cannot be loaded, the
page MUST fail gracefully to a stable GitHub release fallback and MUST NOT invent an asset link.
Changes to release data or interaction behavior MUST be validated with a production-like local
preview before handoff.

## Product Constraints

- The project root is `L:\\codex-L\\hwplensweb`.
- The primary product is the `cybereun/hwplens` desktop application.
- The current featured release is v1.0.3 unless the authoritative repository reports a newer
  release during implementation.
- The initial deliverable is a public-facing, responsive landing/download site; authentication,
  payments, comments, and app telemetry are out of scope.
- All core interactions MUST work on desktop and mobile widths, including touch scrolling.

## Quality Gates

- No unresolved placeholder copy or fake download URL may remain in shipped files.
- The page MUST have a working path to the GitHub release and at least one explicit download CTA.
- A local static-server preview MUST load without console-blocking errors.
- Automated or manual checks MUST cover responsive layout, reduced motion, keyboard focus, and the
  download-link fallback behavior.

## Governance

This constitution governs the landing page implementation and supersedes convenience-based
shortcuts that would weaken the core download journey, accessibility, or release traceability.
Amendments MUST document the affected principle, rationale, and version change in the Sync Impact
Report at the top of this file. Versioning follows semantic versioning: MAJOR for incompatible
governance changes, MINOR for new or materially expanded principles, and PATCH for clarifications.
Every implementation pass MUST re-check these principles before completion, and any justified
exception MUST be recorded in the implementation plan's Complexity Tracking section.

**Version**: 1.0.0 | **Ratified**: 2026-08-12 | **Last Amended**: 2026-08-12
