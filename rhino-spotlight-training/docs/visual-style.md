# Visual Style Guide (PROPOSED)

Goal: clean technical illustration. Every visual element either explains something or is removed.

## Canvas

- 1920×1080, 30 fps. Title-safe area: 96 px left/right, 54 px top/bottom (5%).
- Lower 160 px reserved for captions if burned in (Q-006).

## The three camera views (reused in every lesson)

| View | Description | Used for |
|---|---|---|
| **House Section** | Side elevation (orthographic) of stage + house: stage deck, proscenium/trim line, audience floor, balcony, spot booth, overhead truss with spot chair | Where things are; beam path from position to stage |
| **Operator POV** | From behind the fixture, looking down the house at the stage. Fixture's rear and handles in the foreground | Cue execution, aiming, tracking |
| **Fixture Elevation** | Side elevation of the generic followspot, ~1400 px long | Anatomy and controls |

Camera moves: 2D pan/zoom only, ease-in-out over ≥ 20 frames. No rotation, no shake, no 3D orbit.

## Shared geometry (single source: `src/lib/geometry.ts`)

Defined once in world units (1 unit = 1 ft, scaled at render), so beam angles and pool sizes are consistent between shots:

- Stage deck height 4 ft; stage depth 40 ft; downstage edge at x = 0.
- House floor 110 ft deep; balcony rail at 25 ft high, 70 ft from stage edge.
- Spot booth at 35 ft high, 105 ft from stage edge.
- Truss at 30 ft high, 20 ft from stage edge; spot chair hangs below.
- Performer height 5.75 ft; neutral silhouette, no gender/costume detail.

These dimensions are illustrative, not a real venue. They must not change between lessons.

## Light behavior rules

1. Beam originates at the lens, always.
2. Pool on the deck is an ellipse whose elongation follows the beam angle.
3. **Dowser** changes beam and pool opacity only (0 → 1).
4. **Iris** changes cone angle and pool size; pool brightness stays constant in the illustration (simplification, noted for instructor).
5. **Color** tints beam and pool; frame change is a quick crossfade (6 frames).
6. **Focus** changes pool edge softness (blur radius) only.
7. Beam in air: faint linear gradient (haze), max 18% opacity. No lens flares, glows, or particles.
8. Other stage lighting: flat, dim wash so the spot reads as the brightest element.

## Color tokens (placeholders until Rhino brand guide — D-009)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0F1216` | Background / house darkness |
| `structure` | `#3A414B` | Stage, walls, truss (line work) |
| `structureFill` | `#1B2027` | Solid fills |
| `fixture` | `#C9CED6` | Followspot body |
| `beam` | `#FFF4DE` | White light |
| `highlight` | `#F2B233` | Active callout / emphasized part |
| `text` | `#F2F4F7` | Labels |
| `textMuted` | `#8B95A3` | Secondary labels, inactive callouts |
| `caution` | `#E5484D` | Safety note marker only |

Gel colors in demos: use neutral examples (e.g., light blue, amber) — don't name brand gel numbers.

## Typography

- Inter (via `@remotion/google-fonts`, loaded at scaffold) — one family only.
- Title 72 px semibold · Section header 48 px · Labels 34 px medium · Notes 28 px (minimum size on screen).
- Sentence case. No all-caps body text.

## Callouts

- Leader line 3 px from part to label; label box `structureFill` with 1 px `structure` border.
- One active (`highlight`) callout at a time; previously introduced labels drop to `textMuted`.
- Appear: 8-frame fade + 12 px slide. No bounce.

## Required on-screen notes

- Fixture Elevation: "Generic followspot — control layout varies by model."
- Example cue calls: "Example call — wording varies by show."

## Transitions

- Default: hard cut. Between views: 10-frame crossfade. Nothing else (no wipes, zooms-through, or spins).
