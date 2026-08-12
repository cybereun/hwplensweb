# Quickstart: HwpLens Product Landing Site

## Prerequisites

- Windows, macOS, or Linux
- A modern browser
- Node.js 18+ for the included local server and smoke checks

## Start a local preview

From `L:\\codex-L\\hwplensweb`:

```powershell
npm start
```

Open `http://localhost:4173`.

## Run checks

```powershell
npm test
node --check app.js
```

Expected results:

- The static checks report the required product copy, GitHub URLs, fallback installer, and motion
  controls.
- The JavaScript syntax check exits with code 0.

## Manual validation scenarios

1. Load the page with the network available. Confirm the hero CTA, release chapter, and version
   facts show HwpLens v1.0.3 and the verified installer path.
2. Disable network access or block the GitHub API. Reload and confirm the CTA still points to the
   verified v1.0.3 installer or release page.
3. Scroll with a mouse wheel, touchpad, and touch screen. Confirm chapters reveal progressively and
   the progress indicator follows the active section.
4. Use Tab/Shift+Tab. Confirm every CTA, navigation link, FAQ control, and motion toggle has a
   visible focus state and can be activated without a pointer.
5. Turn on the motion toggle and enable the browser's reduced-motion preference. Confirm content
   remains visible and the page does not depend on animation.
6. Resize to 320px wide. Confirm no horizontal scrollbar appears and the primary CTA remains
   legible and reachable.
7. Activate the FAQ item for the port conflict. Confirm it recommends updating to the latest
   release and gives a concise next step.
