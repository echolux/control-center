# Rhino Spotlight Training — Project Instructions

Code-generated instructional video course for live-event stagehands, built with
Remotion (React/TypeScript). This folder is self-contained. The Next.js notes in the
repository-root `AGENTS.md` do **not** apply here.

## Read before working

| File | Purpose |
|---|---|
| `docs/decisions.md` | Approved and proposed decisions. **Check before redesigning anything.** |
| `docs/curriculum.md` | Course structure and lesson scope |
| `docs/technical-reference.md` | Terminology, verification status, review flags, sources |
| `docs/visual-style.md` | Geometry, colors, type, beam behavior, animation rules |
| `docs/implementation-plan.md` | Build phases, file layout, render process, gates |
| `storyboards/NN-*.md` | Per-lesson narration, timing, shots, verification items |

## Current phase

**Phase 1 — planning. Awaiting review.** Do not scaffold Remotion, install
dependencies, or write animation code until `docs/decisions.md` records Phase 1 as
APPROVED.

## Rules

1. **Accuracy over completeness.** Never invent Rhino policies, venue rules,
   manufacturer-specific controls, or safety instructions. If a fact is needed and
   unverified, mark it `REVIEW` in `technical-reference.md` and keep it generic on screen.
2. **Every technical claim in narration** must map to a row in
   `technical-reference.md` with a status (`GENERIC-VERIFIED`, `VARIES`, `REVIEW`, `UNKNOWN`).
3. **No final render ships** until every `REVIEW` item for that lesson is signed off by a
   qualified instructor (name + date recorded in the storyboard's sign-off table).
4. **Don't redesign approved scenes.** If a change to an APPROVED item seems necessary,
   propose it and log the reason in `decisions.md`; don't silently change it.
5. **Shared geometry only.** Stage, house, and fixture drawings come from shared
   components/constants (see `visual-style.md`). Never hand-place a one-off stage.
6. **Storyboard is the source of truth for timing.** Scene frame ranges in code are
   generated from, or checked against, the storyboard table.
7. Output spec: 1920×1080, 30 fps, H.264 MP4, plus SRT captions.
8. Show the generic-fixture disclaimer whenever a fixture's controls are labeled.
