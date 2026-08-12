# External Contract: GitHub Release Metadata

## Source

`GET https://api.github.com/repos/cybereun/hwplens/releases/latest`

This is a best-effort enrichment request. The page remains fully usable if it fails.

## Fields consumed

```json
{
  "tag_name": "v1.0.3",
  "name": "HwpLens v1.0.3",
  "published_at": "2026-06-15T00:20:19Z",
  "html_url": "https://github.com/cybereun/hwplens/releases/tag/v1.0.3",
  "assets": [
    {
      "name": "HwpLens.Setup.1.0.3.exe",
      "size": 83700332,
      "browser_download_url": "https://github.com/cybereun/hwplens/releases/download/v1.0.3/HwpLens.Setup.1.0.3.exe"
    }
  ]
}
```

## Validation contract

1. `tag_name` MUST match `^v[0-9]+\\.[0-9]+\\.[0-9]+`.
2. `html_url` MUST be an HTTPS URL whose host is `github.com` and whose path starts with
   `/cybereun/hwplens/releases/`.
3. `assets` MUST be an array; the installer candidate MUST have a lowercase `.exe` suffix.
4. `browser_download_url` MUST be HTTPS and hosted on `github.com`.
5. `size`, when present, MUST be a non-negative integer.
6. The request MUST use a short timeout and MUST NOT block initial rendering.

## Fallback contract

- Initial state: verified `v1.0.3` static record.
- Network error, timeout, rate limit, invalid JSON, or failed validation: keep the static record.
- Future release with no `.exe` asset: use its validated release page only; do not synthesize an
  installer URL.
- The CTA must never be disabled solely because enrichment failed.
