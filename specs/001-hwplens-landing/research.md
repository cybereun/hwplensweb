# Research: HwpLens Product Landing Site

## Decision 1: Keep wheel interaction progressive, not hijacked

**Decision**: Use native document scrolling with `scroll-snap-type: y proximity`,
`IntersectionObserver`-driven reveal states, and a small progress indicator. Do not intercept the
wheel event or translate the entire page with a custom scroll engine.

**Rationale**: Native scrolling preserves touch input, keyboard navigation, browser find, deep
links, and the user's expected scroll speed. Scroll-snap proximity adds the requested chapter feel
without trapping a visitor in an animation. IntersectionObserver keeps work bounded to visible
content and supports a graceful no-script experience.

**Alternatives considered**:

- Full-page wheel hijacking: rejected because it can cause motion sickness, break trackpads and
  assistive technology, and make the download CTA harder to reach.
- A heavy animation library: rejected because the site is a small static page and the extra
  dependency would conflict with the static-first principle.

## Decision 2: Use verified release data with a safe fallback

**Decision**: Render the page with a static v1.0.3 release configuration verified against the
`cybereun/hwplens` GitHub API. After load, attempt a short-timeout request to
`https://api.github.com/repos/cybereun/hwplens/releases/latest`; update the version and installer
link only when the response contains a valid version, GitHub release URL, and `.exe` asset. On any
failure, retain the static v1.0.3 values and point visitors to the official release page if the
asset cannot be verified.

**Rationale**: The visitor always has a working path to a trustworthy release. The release page is
safer than guessing a future filename, and the static fallback prevents a rate limit, offline
preview, or content-blocker from disabling the primary CTA.

**Verified source snapshot**:

- Release: `v1.0.3`, published 2026-06-15
- Installer: `HwpLens.Setup.1.0.3.exe`, 83,700,332 bytes
- Release page: `https://github.com/cybereun/hwplens/releases/tag/v1.0.3`
- Installer URL: `https://github.com/cybereun/hwplens/releases/download/v1.0.3/HwpLens.Setup.1.0.3.exe`

**Alternatives considered**:

- Hard-code only the asset URL forever: rejected because a future release would require a code edit
  before the site can reflect the latest release.
- Make the GitHub API the only source: rejected because a failed network request would break the
  main user journey.

## Decision 3: Reuse official product assets

**Decision**: Copy the source repository's `public/assets/logo.png`,
`public/assets/hwplens_icon.png`, and `public/icons/favicon.png` into the site's local `assets/`
directory.

**Rationale**: The assets are already part of the product identity and visually match the release
being promoted. Keeping local copies avoids a third-party image dependency and preserves the page
when the source repository is unavailable.

**Alternatives considered**:

- Generate a new brand illustration: rejected because it could diverge from the app identity and
  introduce unnecessary production work.
- Link images directly from the app repository: rejected because external image requests are less
  reliable and make static hosting less self-contained.

## Decision 4: Make motion a user-controlled enhancement

**Decision**: Honor `prefers-reduced-motion: reduce`, add a visible motion toggle, and persist the
  user's choice locally. In reduced mode, reveal content immediately and remove decorative
  transforms while keeping all content and navigation intact.

**Rationale**: The requested visual style depends on motion, but the download journey and product
  information must not depend on it. A user-controlled toggle makes the choice discoverable.

**Alternatives considered**:

- Motion-only design with no opt-out: rejected by the accessibility and direct-control principles.
- Disable all CSS animations for everyone: rejected because subtle motion is a core part of the
  requested contemporary scroll experience.
