import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S18_DURATION_IN_FRAMES = 255;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const BODY_SHAPES = (
  <>
    <ellipse cx={540} cy={418} rx={96} ry={116} />
    <path d="M 500 500 L 580 500 L 584 596 L 496 596 Z" />
    <path d="M 540 545 C 455 545 390 585 368 665 L 352 995 C 348 1120 362 1210 382 1270 L 698 1270 C 718 1210 732 1120 728 995 L 712 665 C 690 585 625 545 540 545 Z" />
    <path d="M 392 690 C 358 822 338 980 332 1110" fill="none" stroke="#1A0F0B" strokeLinecap="round" strokeWidth={62} />
    <path d="M 688 690 C 722 822 742 980 748 1110" fill="none" stroke="#1A0F0B" strokeLinecap="round" strokeWidth={62} />
    <circle cx={332} cy={1136} r={33} />
    <circle cx={748} cy={1136} r={33} />
    <path d="M 458 1240 C 444 1400 434 1580 430 1730" fill="none" stroke="#1A0F0B" strokeLinecap="round" strokeWidth={94} />
    <path d="M 622 1240 C 636 1400 646 1580 650 1730" fill="none" stroke="#1A0F0B" strokeLinecap="round" strokeWidth={94} />
    <ellipse cx={420} cy={1762} rx={58} ry={28} />
    <ellipse cx={660} cy={1762} rx={58} ry={28} />
  </>
);

const STRINGS = [
  {x1: 540, y1: -60, x2: 540, y2: 304},
  {x1: 432, y1: -60, x2: 404, y2: 650},
  {x1: 648, y1: -60, x2: 676, y2: 650},
  {x1: 330, y1: -60, x2: 308, y2: 1128},
  {x1: 750, y1: -60, x2: 772, y2: 1128},
];

export const S18Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S18_DURATION_IN_FRAMES], [1.0, 1.055], {
    ...clamp,
    easing: Easing.bezier(0.25, 0, 0.35, 1),
  });

  const sway = Math.sin(frame / 95) * 0.7;
  const bob = Math.sin(frame / 70) * 2;

  const breath = 1 + Math.sin(frame / 42) * 0.008;
  const stringOpacity = 0.38 + Math.abs(Math.sin(frame / 36)) * 0.18;
  const childGlow = 0.22 + Math.sin(frame / 24) * 0.04;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(76% 60% at 50% 42%, #2A1712 0%, #170D0A 52%, #0A0706 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          transformOrigin: "50% 48%",
        }}
      >
        <svg height="100%" viewBox="0 0 1080 1920" width="100%">
          <defs>
            <linearGradient id="s18-body" x1="0" x2="0" y1="280" y2="1800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#241611" />
              <stop offset="60%" stopColor="#150C08" />
              <stop offset="100%" stopColor="#0A0604" />
            </linearGradient>
            <radialGradient id="s18-glow">
              <stop offset="0%" stopColor="rgba(201,162,39,0.18)" />
              <stop offset="55%" stopColor="rgba(201,162,39,0.06)" />
              <stop offset="100%" stopColor="rgba(201,162,39,0)" />
            </radialGradient>
            <radialGradient id="s18-cavity">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="56%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.66)" />
            </radialGradient>
            <radialGradient id="s18-child">
              <stop offset="0%" stopColor="#FBF1DE" />
              <stop offset="70%" stopColor="#EFD9B6" />
              <stop offset="100%" stopColor="#D8BB8F" />
            </radialGradient>
            <radialGradient id="s18-childGlow">
              <stop offset="0%" stopColor="rgba(255,224,168,0.5)" />
              <stop offset="60%" stopColor="rgba(255,206,132,0.16)" />
              <stop offset="100%" stopColor="rgba(255,196,110,0)" />
            </radialGradient>
          </defs>

          <ellipse cx={540} cy={920} fill="url(#s18-glow)" rx={400} ry={660} />

          <g transform={`translate(0 ${bob}) rotate(${sway} 540 -60)`}>
            <g fill="url(#s18-body)">
              <g transform="translate(0 0)">{BODY_SHAPES}</g>
            </g>

            <ellipse cx={540} cy={900} fill="url(#s18-cavity)" rx={214} ry={232} />
            <ellipse cx={540} cy={892} fill="url(#s18-childGlow)" opacity={childGlow} rx={166} ry={180} />

            <g
              transform={`translate(540 900) scale(${breath}) translate(-540 -900)`}
              fill="url(#s18-child)"
            >
              <circle cx={540} cy={790} r={44} />
              <path d="M 540 834 C 504 834 478 864 470 902 C 462 940 470 972 496 986 L 584 986 C 610 972 618 940 610 902 C 602 864 576 834 540 834 Z" />
              <circle cx={492} cy={958} r={35} />
              <circle cx={588} cy={958} r={35} />
              <ellipse cx={508} cy={1002} rx={42} ry={17} />
              <ellipse cx={572} cy={1002} rx={42} ry={17} />
              <path d="M 506 872 C 492 900 488 928 492 950" fill="none" stroke="#EFD9B6" strokeLinecap="round" strokeWidth={20} />
              <path d="M 574 872 C 588 900 592 928 588 950" fill="none" stroke="#EFD9B6" strokeLinecap="round" strokeWidth={20} />
            </g>

            {STRINGS.map((line, index) => (
              <g key={index}>
                <line
                  opacity={stringOpacity * 0.35}
                  stroke="#E4C873"
                  strokeWidth={4}
                  x1={line.x1}
                  x2={line.x2}
                  y1={line.y1}
                  y2={line.y2}
                />
                <line
                  opacity={stringOpacity}
                  stroke="#C9A227"
                  strokeWidth={1.4}
                  x1={line.x1}
                  x2={line.x2}
                  y1={line.y1}
                  y2={line.y2}
                />
                <circle cx={line.x2} cy={line.y2} fill="#E4C873" opacity={0.72} r={4} />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 62% at 50% 50%, rgba(0,0,0,0) 46%, rgba(8,5,4,0.3) 82%, rgba(8,5,4,0.5) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.12}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={16}
        until={246}
        emphasisWords={["恐吓式教育"]}
        lines={["尽管身体已经长大了", "但是这种“恐吓式教育”造成的", "情绪模式能在潜意识中操纵我们"]}
      />
    </AbsoluteFill>
  );
};
