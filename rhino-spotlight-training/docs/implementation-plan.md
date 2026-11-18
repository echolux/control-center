# Implementation Plan (PROPOSED — no code until Phase 1 is approved)

## Phases and gates

| Phase | Output | Gate to pass |
|---|---|---|
| 1. Planning | This doc set | Owner approves `decisions.md` items D-001–D-009; answers Q-001 (license) |
| 2. Scaffold + stills | Remotion project, shared components, one still frame per scene | Owner approves stills (layout, style, geometry) |
| 3. Animated draft | Silent 90 s MP4 with placeholder timing | Owner approves motion and pacing |
| 4. Narration lock | Scratch VO, scene timings snapped to audio, SRT | Owner approves timing |
| 5. Technical review | Draft MP4 + storyboard sign-off table to instructor | All `REVIEW` items signed off |
| 6. Final | Final VO, final render, captions | Owner approves final |
| 7. Skill | `SKILL.md` documenting the repeatable process | Used successfully on Lesson 02 |

## Planned file layout (Phase 2)

```
rhino-spotlight-training/
  CLAUDE.md
  docs/                      # decisions, curriculum, technical-reference, visual-style, this plan
  storyboards/               # NN-lesson-name.md
  video/
    package.json             # exact pinned versions
    remotion.config.ts
    src/
      Root.tsx               # registers compositions
      lessons/
        L01Intro/
          index.tsx          # composition: sequences scenes
          timeline.ts        # scene frame ranges (mirrors storyboard table)
          scenes/S1Title.tsx … S6Wrap.tsx
      components/            # shared across lessons
        HouseSection.tsx  OperatorPOV.tsx  FixtureElevation.tsx
        Beam.tsx  Pool.tsx  Performer.tsx  Callout.tsx  CueCard.tsx  NoteBox.tsx  TitleCard.tsx
      lib/
        geometry.ts          # world coordinates from visual-style.md
        beam.ts              # cone/pool math (iris→angle, dowser→opacity, focus→blur)
        tokens.ts            # colors, type sizes
        timing.ts            # sec↔frame helpers, easing presets
    public/audio/            # narration WAVs (not committed if large; see below)
    out/                     # renders (gitignored)
```

Design choice: scenes are SVG-based React components (crisp at any zoom, easy to keep geometry exact). No Three.js, no Lottie.

## Rendering and review workflow (iPad-friendly)

- Build and render in this cloud container (`npx remotion render`, `npx remotion still`). Chromium is available here; Remotion may also download its own headless browser on first render — if the network blocks it, point it at the pre-installed Chromium.
- Review on iPad: rendered MP4s and PNG stills are sent to you as files or a private review page. You don't need Remotion Studio or a computer.
- A computer is only needed if you want to scrub interactively in Remotion Studio or record VO with a proper microphone setup.

## Narration production (decision Q-004)

| Option | Quality | Cost | Revision speed | Notes |
|---|---|---|---|---|
| Your own recording on iPad (Voice Memos, quiet room) | Medium–good | $0 | Slow | Fine for scratch; OK for final with a decent mic |
| Hired / instructor VO | Best | Varies (not researched) | Slow | Best credibility |
| Synthetic TTS | Good, consistent | Varies by service (not researched) | Fast | Check service's commercial-use terms |

Recommendation: scratch track first (any source) to lock timing; decide final voice after the technical review so you don't pay twice for script changes.

## Quality checks per render

1. Duration 85–95 s; 2,700 ± 150 frames.
2. Spot-check stills at each scene midpoint: text ≥ 28 px, within title-safe, contrast readable.
3. Beam geometry: pool center matches performer position in all views (automated check in `lib/beam.ts` test).
4. Every narration line maps to a claim ID; every `REVIEW` item signed off before Phase 6.
5. Audio peaks ≤ −1 dBFS, narration loudness consistent (target to be decided with VO source).

## Risks

| Risk | Mitigation |
|---|---|
| Remotion Company License needed (Q-001) | Resolve before Phase 2; free tier applies only to individuals, ≤3-employee for-profits, and non-profits |
| Implying a specific manufacturer's layout | Generic fixture + disclaimer (D-005) |
| Narration claims that drift from review | Claim IDs + sign-off table; final renders gated |
| Scope creep in pilot | D-006 limits pilot scope |
| Repo mix with the dashboard app | Move to its own repo (Q-007); folder is self-contained so moving is a copy |

## Phase 2 first step (after approval)

Scaffold `video/` with pinned Remotion, implement `geometry.ts`, `tokens.ts`, `HouseSection`, and render one still of Scene 3 (all three positions on one pool).
**Done when:** that PNG is reviewed and the geometry/style is marked APPROVED in `decisions.md`.
