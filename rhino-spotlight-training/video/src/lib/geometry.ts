// Shared world geometry from docs/visual-style.md. Units: feet.
// x = 0 is the downstage edge; negative x is upstage, positive x is the house.
export const world = {
  deckHeight: 4,
  upstageWallX: -40,
  houseDepth: 110,
  balcony: { x: 70, y: 25 },
  booth: { x: 105, y: 35 },
  truss: { x: 20, y: 30 },
  performerHeight: 5.75,
} as const;

// House Section view: world feet -> SVG pixels at 1920x1080.
export const section = {
  scale: 11, // px per ft
  originX: 80 + 45 * 11, // world x = 0
  groundY: 860, // world y = 0 (house floor)
};

export const toPx = (x: number, y: number) => ({
  x: section.originX + x * section.scale,
  y: section.groundY - y * section.scale,
});
