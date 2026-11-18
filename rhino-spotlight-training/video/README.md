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

Remotion's browser download host (`remotion.media`) must be allowed in the
environment's network settings. If it isn't, use the Chromium headless shell
pre-installed in the container:

```bash
npm ci
export REMOTION_BROWSER=$(find /opt/pw-browsers -name chrome-headless-shell -type f | head -1)
npm run render:test:cloud
npm run still:test:cloud
```

The fallback browser (Chrome for Testing 157) is one major version behind the one
Remotion 4.0.544 downloads (158). It rendered the test correctly, but the official
Remotion browser is preferred for lesson renders.

## Verified result (2026-11-18, cloud container)

`RenderTest` rendered with the fallback browser: H.264, 1920×1080, 30 fps,
150 frames, 5.00 s, about 10 s wall time. PNG still at frame 90 rendered.
Not yet verified: rendering with Remotion's own downloaded browser, and rendering on a Mac.
