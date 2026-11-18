# Decisions Log

Status values: `PROPOSED` (awaiting review) · `APPROVED` · `REJECTED` · `SUPERSEDED`.
Record who approved and the date. Approved items are not redesigned without a logged reason.

## Phase gate

| Gate | Status | Approved by | Date |
|---|---|---|---|
| Phase 1 planning package | PROPOSED | — | — |
| Pilot storyboard (Lesson 01) | PROPOSED | — | — |
| Lesson 01 technical review | NOT STARTED | — | — |
| Lesson 01 final render | NOT STARTED | — | — |

## Decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| D-001 | Tooling: Remotion 4.x + React + TypeScript; render in the cloud container, review MP4s on iPad | PROPOSED | Latest on npm at planning time: `remotion@4.0.544` (2026-11-18). Pin exact version at scaffold. |
| D-002 | Output: 1920×1080, 30 fps, H.264 MP4 + SRT | PROPOSED | From brief |
| D-003 | Visual approach: flat 2D technical illustration (orthographic views), no free 3D camera | PROPOSED | Keeps geometry consistent and code simple. See `visual-style.md`. |
| D-004 | Three fixed camera views: House Section, Operator POV, Fixture Elevation | PROPOSED | Reused across all lessons |
| D-005 | Fixture drawn as a **generic** followspot, not any manufacturer's model, with on-screen disclaimer | PROPOSED | Avoids implying controls on Rhino's actual equipment |
| D-006 | Pilot scope: what a followspot is, where it's operated, core controls, cue basics. No chopper/trim, lamp, or power-up procedure. | PROPOSED | Those need model-specific and safety review |
| D-007 | Narration: record/ generate a scratch track first to lock timing; final VO chosen after review | PROPOSED | Voice source is an open question (below) |
| D-008 | Project lives in `rhino-spotlight-training/` inside `control-center` for now | PROPOSED | Recommend moving to its own repository before Phase 2 (unrelated to the dashboard app) |
| D-009 | Brand colors/logo are placeholders until Rhino brand guidelines are supplied | PROPOSED | Don't invent Rhino branding |

## Open questions (need owner answers)

| ID | Question | Why it matters |
|---|---|---|
| Q-001 | **Remotion license**: who is the producing entity? | Remotion is free for individuals, for-profit orgs with ≤3 employees, and non-profits; larger for-profit orgs need a paid Company License (verified from the `LICENSE.md` shipped in `remotion@4.0.544`). If Rhino produces or owns this, a license is likely required. |
| Q-002 | Who is the qualified reviewing instructor? | Required sign-off before final render |
| Q-003 | Which followspot models does Rhino actually use? | Determines whether later lessons can be model-specific |
| Q-004 | Narration voice: human (you/instructor), or synthetic TTS? | Cost, quality, licensing, revision speed |
| Q-005 | Is Rhino using this officially (logo, name) or is it an independent course? | Branding, approvals, and whether Rhino policy review is needed |
| Q-006 | Captions: burned in, sidecar SRT only, or both? | Accessibility and distribution platform |
| Q-007 | Separate repository for this project? | Keeps the dashboard repo clean |
