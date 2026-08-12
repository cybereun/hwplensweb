# Data Model: HwpLens Product Landing Site

The site is static and has no persisted domain database. These entities describe the small data
contracts used by the page and its fallback behavior.

## Release

Represents the featured HwpLens distribution.

| Field | Type | Required | Validation / Meaning |
|---|---|---:|---|
| `tag` | string | yes | Starts with `v`; displayed as the current version. |
| `name` | string | yes | Human-readable release name. |
| `publishedAt` | ISO date string | yes | Used for the release date label. |
| `releaseUrl` | URL string | yes | Must be an `https://github.com/cybereun/hwplens/releases/...` URL. |
| `assetName` | string | no | Verified installer filename when an `.exe` asset exists. |
| `assetUrl` | URL string | no | Must be an HTTPS GitHub release asset URL. |
| `assetSize` | integer bytes | no | Non-negative; formatted for visitors. |
| `source` | enum | yes | `fallback` or `live`; helps show a truthful status label. |

**State rules**:

- The page starts in `fallback` state using the inspected v1.0.3 record.
- A `live` record may replace it only after release URL and installer URL validation passes.
- If live metadata has no valid installer, the release page remains the CTA destination.
- The UI never renders an empty or guessed download URL.

## Story Chapter

Represents one scroll narrative section.

| Field | Type | Required | Validation / Meaning |
|---|---|---:|---|
| `id` | string | yes | Stable anchor id used by navigation. |
| `number` | string | yes | Two-digit progress label. |
| `title` | string | yes | Primary chapter heading. |
| `body` | string | yes | Supporting product explanation. |
| `theme` | enum | yes | Visual treatment selected from the page's defined themes. |

Chapters are ordered in the document and are not fetched from a remote source.

## Download CTA

Represents every installer action in the page.

| Field | Type | Required | Validation / Meaning |
|---|---|---:|---|
| `label` | string | yes | Action label includes the current version when known. |
| `href` | URL string | yes | Release asset URL or official release page fallback. |
| `destination` | enum | yes | `installer` or `release-page`. |
| `external` | boolean | yes | True for GitHub destinations. |

All CTAs are updated together when the release state changes.

## FAQ Item

Represents an accessible disclosure item.

| Field | Type | Required | Validation / Meaning |
|---|---|---:|---|
| `question` | string | yes | Short visitor-facing question. |
| `answer` | string | yes | Concise, action-oriented answer. |
| `defaultOpen` | boolean | no | Defaults false so the FAQ remains scannable. |

The first required item covers the documented `EADDRINUSE` / port 8800 issue and recommends the
latest release.
