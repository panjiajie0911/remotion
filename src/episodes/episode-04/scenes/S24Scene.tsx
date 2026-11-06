import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S24_DURATION_IN_FRAMES = 105;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const PLATES = [
  {label: "事实", latin: "FACT", detail: "发生了什么", x: 92, tilt: -1.2, from: -70},
  {label: "价值", latin: "VALUE", detail: "意味着什么", x: 604, tilt: 1.2, from: 70},
];

const Plate = ({
  label,
  latin,
  detail,
  x,
  tilt,
  from,
  delay,
}: {
  label: string;
  latin: string;
  detail: string;
  x: number;
  tilt: number;
  from: number;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 26], [0, 1], {...clamp, easing: ease});
  const float = Math.sin((frame + delay) / 47) * 2;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F7EEDF 0%, #EFE2CE 100%)",
        border: "2px solid rgba(26,21,18,0.14)",
        borderRadius: 6,
        boxShadow: "0 26px 48px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.6)",
        height: 452,
        left: x,
        opacity: p,
        padding: "46px 34px 34px",
        position: "absolute",
        top: 700 + float,
        transform: `translateX(${(1 - p) * from}px) rotate(${tilt * (0.4 + p * 0.6)}deg)`,
        width: 384,
      }}
    >
      <div
        style={{
          color: "#B79A5E",
          fontFamily: theme.fonts.sans,
          fontSize: 22,
          letterSpacing: 8,
          textAlign: "center",
        }}
      >
        {latin}
      </div>
      <div
        style={{
          color: "#1A1512",
          fontFamily: theme.fonts.sans,
          fontSize: 104,
          fontWeight: 600,
          letterSpacing: 10,
          lineHeight: 1.24,
          marginTop: 26,
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          backgroundColor: "rgba(26,21,18,0.12)",
          height: 1,
          margin: "30px auto 26px",
          width: 96,
        }}
      />
      <div
        style={{
          color: "#6B6B47",
          fontFamily: theme.fonts.sans,
          fontSize: 30,
          letterSpacing: 2,
          textAlign: "center",
        }}
      >
        {detail}
      </div>
    </div>
  );
};

export const S24Scene = () => {
  const frame = useCurrentFrame();

  const line = interpolate(frame, [4, 32], [0, 1], {...clamp, easing: ease});
  const glow = 0.35 + Math.sin(frame / 30) * 0.08;
  const drift = interpolate(frame, [0, S24_DURATION_IN_FRAMES], [1.0, 1.03], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(70% 56% at 50% 44%, #221812 0%, #150F0B 58%, #090706 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          scale: `${drift}`,
        }}
      >
        {PLATES.map((plate, index) => (
          <Plate key={plate.label} {...plate} delay={18 + index * 6} />
        ))}

        <div
          style={{
            background: "linear-gradient(180deg, rgba(201,162,39,0) 0%, #C9A227 12%, #E4C873 50%, #C9A227 88%, rgba(201,162,39,0) 100%)",
            height: 600,
            left: 538,
            opacity: line,
            position: "absolute",
            top: 626,
            transform: `scaleY(${line})`,
            transformOrigin: "50% 50%",
            width: 4,
          }}
        />

        <div
          style={{
            backgroundColor: "#E4C873",
            boxShadow: "0 0 24px rgba(228,200,115,0.55)",
            height: 14,
            left: 533,
            opacity: line,
            position: "absolute",
            rotate: "45deg",
            top: 919,
            width: 14,
          }}
        />

        <div
          style={{
            background: "radial-gradient(50% 40% at 50% 50%, rgba(201,162,39,0.16) 0%, rgba(201,162,39,0) 70%)",
            height: 900,
            left: 90,
            opacity: glow,
            position: "absolute",
            top: 560,
            width: 900,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(78% 62% at 50% 48%, rgba(0,0,0,0) 44%, rgba(8,5,4,0.34) 84%, rgba(8,5,4,0.56) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.12}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={98}
        emphasisWords={["事实", "价值"]}
        lines={["理解“事实是事实，", "价值是价值”"]}
      />
    </AbsoluteFill>
  );
};
