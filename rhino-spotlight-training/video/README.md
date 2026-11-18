# Rhino Spotlight Training — Remotion project

Remotion 4.0.544 (pinned exactly), React 19.3.1, TypeScript 5.9.3. Config matches the
official `create-video --blank` template for this Remotion version.

| Path | Purpose |
|---|---|
| `src/index.ts`, `src/Root.tsx` | Entry point and composition registry |
| `src/lib/tokens.ts` | Color/type tokens from `../docs/visual-style.md` (placeholders) |
| `src/lib/geometry.ts` | Shared stage/house world geometry (feet → pixels) |
| `src/tests/RenderTest.tsx` | 5-second pipeline test (`RenderTest`). Not lesson content. |
| `.claude/skills/` | Official Remotion Agent Skills (`npx skills add remotion-dev/skills`), pinned in `skills-lock.json` |
| `out/` | Renders (gitignored) |

`--is-production=false` marks test renders as non-production for Remotion's license
telemetry. Before production renders, settle the license question (Q-001 in
`../docs/decisions.md`) and pass `--license-key` as described in the
`remotion-render` skill.

## Render on a Mac (local)

Requirements: Node.js 20.19+, 22.13+, or 24+ (`node -v`), and Git. Remotion downloads
its own headless browser on first render, which needs internet access to `remotion.media`.

```bash
git clone https://github.com/echolux/control-center.git
cd control-center
git checkout claude/spotlight-training-pilot-b658yk
cd rhino-spotlight-training/video
npm ci
npm run render:test     # -> out/render-test.mp4
npm run still:test      # -> out/render-test-preview.png
npm run studio          # interactive preview at http://localhost:3000
```

## Render in a Claude Code cloud session

Use the `control-center` cloud environment. It allows `remotion.media` (Remotion's
browser download) and `www.remotion.dev` (Remotion docs), and its setup script runs
`npm ci` plus `remotion browser ensure` here when a fresh container starts.

Remotion's browser downloader ignores the container's HTTPS proxy unless Node is told
to use it. If the browser is missing, run:

```bash
NODE_USE_ENV_PROXY=1 npx remotion browser ensure
npm run render:test
npm run still:test
```

Fallback if `remotion.media` is unreachable: use the container's pre-installed
Chromium headless shell (Chrome for Testing 157, one version behind Remotion's 158):

```bash
export REMOTION_BROWSER=$(find /opt/pw-browsers -name chrome-headless-shell -type f | head -1)
npm run render:test:cloud
npm run still:test:cloud
```

## Verified results (2026-11-18, cloud container)

| Render | Browser | Result |
|---|---|---|
| `RenderTest` MP4 | Remotion headless shell 158 (official) | H.264, 1920×1080, 30 fps, 150 frames, 5.00 s, yuv420p, ~7 s wall time |
| `RenderTest` PNG, frame 90 | Remotion headless shell 158 | OK |
| `RenderTest` MP4 + PNG | Pre-installed Chrome 157 (fallback) | OK (yuvj420p pixel format) |

Not yet verified: rendering on a Mac, and the environment setup script in a fresh
session (it was run manually here and worked).
