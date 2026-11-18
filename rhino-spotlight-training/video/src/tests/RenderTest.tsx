import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { color, fontFamily } from "../lib/tokens";
import { toPx, world } from "../lib/geometry";

// 5-second render-pipeline test: House Section view, followspot in the booth
// fades up (dowser) on a performer, then the camera pushes in.

const PERFORMER_X = -15; // ft, upstage of the downstage edge
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Performer: React.FC<{ fill: string; opacity?: number }> = ({
  fill,
  opacity = 1,
}) => {
  const feet = toPx(PERFORMER_X, world.deckHeight);
  const h = world.performerHeight * 11; // px
  const headR = h * 0.085;
  // Neutral silhouette: head, torso, legs. No gender or costume detail.
  return (
    <g fill={fill} opacity={opacity}>
      <circle cx={feet.x} cy={feet.y - h + headR} r={headR} />
      <rect
        x={feet.x - h * 0.11}
        y={feet.y - h + headR * 2 + 2}
        width={h * 0.22}
        height={h * 0.42}
        rx={h * 0.06}
      />
      <rect x={feet.x - h * 0.1} y={feet.y - h * 0.46} width={h * 0.085} height={h * 0.46} rx={2} />
      <rect x={feet.x + h * 0.015} y={feet.y - h * 0.46} width={h * 0.085} height={h * 0.46} rx={2} />
    </g>
  );
};

export const RenderTest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeFromBlack = interpolate(frame, [0, 0.5 * fps], [0, 1], clamp);
  const dowser = interpolate(frame, [0.6 * fps, 1.5 * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const push = interpolate(frame, [1.8 * fps, 4.6 * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const lens = toPx(world.booth.x - 1, world.booth.y);
  const feet = toPx(PERFORMER_X, world.deckHeight);
  const top = toPx(PERFORMER_X, world.deckHeight + world.performerHeight + 0.9);
  const bottom = toPx(PERFORMER_X, world.deckHeight - 0.15);

  // Camera: wide section -> 2.2x on the performer.
  const zoom = interpolate(push, [0, 1], [1, 2.2]);
  const focusX = interpolate(push, [0, 1], [960, feet.x]);
  const focusY = interpolate(push, [0, 1], [540, feet.y - 40]);
  const camera = `translate(960 540) scale(${zoom}) translate(${-focusX} ${-focusY})`;

  const deckL = toPx(world.upstageWallX, world.deckHeight);
  const deckR = toPx(0, world.deckHeight);
  const floorR = toPx(world.houseDepth + 5, 0);
  const wallTop = toPx(world.upstageWallX, 16);
  const boothFloor = toPx(world.booth.x - 3, world.booth.y - 3);

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg, fontFamily }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ opacity: fadeFromBlack }}>
        <defs>
          <linearGradient id="beamGrad" gradientUnits="userSpaceOnUse" x1={lens.x} y1={lens.y} x2={feet.x} y2={feet.y}>
            <stop offset="0" stopColor={color.beam} stopOpacity={0.22} />
            <stop offset="1" stopColor={color.beam} stopOpacity={0.1} />
          </linearGradient>
          <radialGradient id="poolGrad">
            <stop offset="0" stopColor={color.beam} stopOpacity={0.9} />
            <stop offset="0.7" stopColor={color.beam} stopOpacity={0.45} />
            <stop offset="1" stopColor={color.beam} stopOpacity={0} />
          </radialGradient>
        </defs>

        <g transform={camera}>
          {/* Structure */}
          <line x1={wallTop.x} y1={wallTop.y} x2={deckL.x} y2={deckL.y} stroke={color.structure} strokeWidth={3} />
          <rect x={deckL.x} y={deckL.y} width={deckR.x - deckL.x} height={4 * 11} fill={color.structureFill} stroke={color.structure} strokeWidth={2} />
          <line x1={deckR.x} y1={toPx(0, 0).y} x2={floorR.x} y2={floorR.y} stroke={color.structure} strokeWidth={3} />
          {/* Booth */}
          <rect x={boothFloor.x} y={boothFloor.y - 70} width={110} height={70} fill="none" stroke={color.structure} strokeWidth={2} />
          <line x1={boothFloor.x} y1={boothFloor.y} x2={boothFloor.x + 110} y2={boothFloor.y} stroke={color.structure} strokeWidth={3} />
          {/* Followspot body (generic) */}
          <g transform={`rotate(${(Math.atan2(feet.y - lens.y, feet.x - lens.x) * 180) / Math.PI} ${lens.x} ${lens.y})`}>
            <rect x={lens.x} y={lens.y - 7} width={42} height={14} rx={3} fill={color.fixture} />
          </g>

          {/* Beam (opacity driven by dowser) */}
          <polygon
            points={`${lens.x},${lens.y} ${top.x},${top.y} ${bottom.x},${bottom.y}`}
            fill="url(#beamGrad)"
            opacity={dowser}
          />
          {/* Pool on the deck at the performer's feet */}
          <ellipse cx={feet.x} cy={feet.y} rx={30} ry={5} fill="url(#poolGrad)" opacity={dowser} />

          {/* Performer: unlit silhouette, then lit version faded in by the dowser */}
          <Performer fill={color.structure} />
          <Performer fill={color.beam} opacity={dowser * 0.92} />
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 70,
          color: color.textMuted,
          fontSize: 34,
          opacity: fadeFromBlack,
        }}
      >
        Render test — not lesson content
      </div>
    </AbsoluteFill>
  );
};
