(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const RELEASE_API = "https://api.github.com/repos/cybereun/hwplens/releases/latest";
  const FALLBACK_RELEASE = Object.freeze({
    tag: "v1.0.3",
    name: "HwpLens v1.0.3",
    publishedAt: "2026-06-15T00:20:19Z",
    releaseUrl: "https://github.com/cybereun/hwplens/releases/tag/v1.0.3",
    assetName: "HwpLens.Setup.1.0.3.exe",
    assetUrl: "https://github.com/cybereun/hwplens/releases/download/v1.0.3/HwpLens.Setup.1.0.3.exe",
    assetSize: 83700332,
    source: "fallback",
  });

  const motionToggle = document.querySelector("#motionToggle");
  const motionLabel = motionToggle?.querySelector(".motion-toggle__label");
  const releaseLinks = [...document.querySelectorAll("[data-download-link]")];
  const versionNodes = [...document.querySelectorAll("[data-release-version]")];
  const dateNodes = [...document.querySelectorAll("[data-release-date]")];
  const sizeNodes = [...document.querySelectorAll("[data-release-size]")];
  const assetNodes = [...document.querySelectorAll("[data-release-asset]")];
  const statusNodes = [...document.querySelectorAll("[data-release-status]")];
  const sourceNodes = [...document.querySelectorAll("[data-release-source]")];
  const labelNodes = [...document.querySelectorAll("[data-download-label]")];
  const releasePageLinks = [...document.querySelectorAll('a[href*="/releases/tag/"]')];

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const motionStorageKey = "hwplens-motion-preference";

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "용량 확인 중";
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "날짜 확인 중";
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(date)
      .replaceAll(" ", "")
      .replaceAll(".", ". ")
      .replace(/\s+$/, "");
  }

  function isGithubReleaseUrl(value) {
    try {
      const url = new URL(value);
      return (
        url.protocol === "https:" &&
        url.hostname === "github.com" &&
        url.pathname.startsWith("/cybereun/hwplens/releases/")
      );
    } catch {
      return false;
    }
  }

  function isGithubAssetUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && url.hostname === "github.com";
    } catch {
      return false;
    }
  }

  function normaliseRelease(payload) {
    if (!payload || typeof payload !== "object") return null;

    const tag = typeof payload.tag_name === "string" ? payload.tag_name : "";
    const releaseUrl = typeof payload.html_url === "string" ? payload.html_url : "";
    const publishedAt = typeof payload.published_at === "string" ? payload.published_at : "";
    const assets = Array.isArray(payload.assets) ? payload.assets : [];
    const installer = assets.find(
      (asset) =>
        asset &&
        typeof asset.name === "string" &&
        /\.exe$/i.test(asset.name) &&
        isGithubAssetUrl(asset.browser_download_url),
    );

    if (!/^v\d+\.\d+\.\d+$/.test(tag) || !isGithubReleaseUrl(releaseUrl) || !publishedAt) {
      return null;
    }

    return {
      tag,
      name: typeof payload.name === "string" && payload.name ? payload.name : `HwpLens ${tag}`,
      publishedAt,
      releaseUrl,
      assetName: installer?.name || "",
      assetUrl: installer?.browser_download_url || "",
      assetSize: Number.isFinite(installer?.size) ? installer.size : null,
      source: "live",
    };
  }

  function updateReleaseUI(release) {
    const hasInstaller = Boolean(release.assetName && release.assetUrl);
    const destination = hasInstaller ? release.assetUrl : release.releaseUrl;
    const sourceCopy = release.source === "live"
      ? "최신 GitHub 릴리즈에서 자동으로 확인됨"
      : "공식 GitHub 릴리즈에서 확인된 버전";
    const sourceDetail = hasInstaller
      ? "공식 릴리즈 자산으로 연결됩니다."
      : "설치 파일을 확인하려면 공식 릴리즈 페이지를 열어 주세요.";

    releaseLinks.forEach((link) => {
      link.href = destination;
      if (hasInstaller) {
        link.setAttribute("download", "");
        link.setAttribute("aria-label", `${release.tag} Windows 설치 파일 다운로드`);
      } else {
        link.removeAttribute("download");
        link.setAttribute("aria-label", `${release.tag} GitHub 릴리즈 페이지 열기`);
      }
    });

    releasePageLinks.forEach((link) => {
      link.href = release.releaseUrl;
    });

    versionNodes.forEach((node) => {
      node.textContent = release.tag;
    });
    dateNodes.forEach((node) => {
      node.textContent = formatDate(release.publishedAt);
    });
    sizeNodes.forEach((node) => {
      node.textContent = formatBytes(release.assetSize);
    });
    assetNodes.forEach((node) => {
      node.textContent = release.assetName || "GitHub 릴리즈 페이지에서 확인";
    });
    labelNodes.forEach((node) => {
      node.textContent = hasInstaller ? `${release.tag} 다운로드` : `${release.tag} 릴리즈 보기`;
    });
    statusNodes.forEach((node) => {
      node.textContent = sourceCopy;
    });
    sourceNodes.forEach((node) => {
      node.textContent = sourceDetail;
    });
    document.body.dataset.releaseSource = release.source;
  }

  async function enrichRelease() {
    if (!window.fetch) return;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 2600);

    try {
      const response = await fetch(RELEASE_API, {
        headers: { Accept: "application/vnd.github+json" },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Release request failed: ${response.status}`);

      const release = normaliseRelease(await response.json());
      if (release) updateReleaseUI(release);
    } catch {
      updateReleaseUI(FALLBACK_RELEASE);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  function getStoredMotion() {
    try {
      const saved = window.localStorage.getItem(motionStorageKey);
      if (saved === "full" || saved === "reduced") return saved;
    } catch {
      // Private browsing or blocked storage: use the OS preference instead.
    }
    return prefersReducedMotion?.matches ? "reduced" : "full";
  }

  function applyMotion(mode, persist = false) {
    root.dataset.motion = mode;
    if (!motionToggle) return;

    const reduced = mode === "reduced";
    motionToggle.setAttribute("aria-pressed", String(reduced));
    motionToggle.setAttribute("aria-label", reduced ? "모션 켜기" : "모션 줄이기");
    if (motionLabel) motionLabel.textContent = reduced ? "모션 켜기" : "모션 줄이기";

    if (persist) {
      try {
        window.localStorage.setItem(motionStorageKey, mode);
      } catch {
        // The preference is still applied for the current visit.
      }
    }
  }

  function setupMotion() {
    applyMotion(getStoredMotion());
    motionToggle?.addEventListener("click", () => {
      applyMotion(root.dataset.motion === "reduced" ? "full" : "reduced", true);
      revealAllIfReduced();
    });

    prefersReducedMotion?.addEventListener?.("change", (event) => {
      try {
        if (window.localStorage.getItem(motionStorageKey)) return;
      } catch {
        // Continue with the system setting when storage is unavailable.
      }
      applyMotion(event.matches ? "reduced" : "full");
      revealAllIfReduced();
    });
  }

  function revealAllIfReduced() {
    if (root.dataset.motion !== "reduced") return;
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
  }

  function setupReveal() {
    const revealNodes = [...document.querySelectorAll(".reveal:not(.is-visible)")];
    if (root.dataset.motion === "reduced" || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    revealNodes.forEach((node) => observer.observe(node));
  }

  function setupProgressRail() {
    const chapters = [...document.querySelectorAll("[data-chapter]")];
    const dots = [...document.querySelectorAll("[data-progress-target]")];
    if (!chapters.length || !dots.length) return;

    const setActive = (id) => {
      dots.forEach((dot) => {
        const active = dot.dataset.progressTarget === id;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "step");
        else dot.removeAttribute("aria-current");
      });
    };

    if (!("IntersectionObserver" in window)) return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
        const current = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (current && current[1] > 0) setActive(current[0]);
      },
      { threshold: [0.2, 0.45, 0.7] },
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    setActive("top");
  }

  function setupYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = year;
    });
  }

  updateReleaseUI(FALLBACK_RELEASE);
  setupMotion();
  setupReveal();
  setupProgressRail();
  setupYear();
  enrichRelease();

  window.HwpLensSite = Object.freeze({
    fallbackRelease: FALLBACK_RELEASE,
    normaliseRelease,
    formatBytes,
    formatDate,
  });
})();
