import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import desk from "../assets/img/cards.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S26_DURATION_IN_FRAMES = 240;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

type LabelSpec = {
  text: string;
  x: number;
  y: number;
  rot: number;
  at: number;
};

const LABELS: LabelSpec[] = [
  {text: "考不上", x: 152, y: 452, rot: -13, at: 54},
  {text: "不会做", x: 342, y: 388, rot: -4, at: 74},
  {text: "没对象", x: 496, y: 260, rot: 4, at: 94},
  {text: "没工作", x: 602, y: 424, rot: 8, at: 114},
];

const Label = ({spec}: {spec: LabelSpec}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [spec.at, spec.at + 16], [0, 1], {...clamp, easing: ease});

  if (p <= 0) return null;

  return (
    <div
      style={{
        color: "#3B2A1D",
        fontFamily: theme.fonts.sans,
        fontSize: 44,
        fontWeight: 600,
        left: spec.x,
        letterSpacing: 4,
        opacity: p,
        position: "absolute",
        rotate: `${spec.rot}deg`,
        scale: `${0.92 + p * 0.08}`,
        textShadow: "0 1px 0 rgba(255,252,244,0.5), 0 4px 10px rgba(56,34,16,0.28)",
        top: spec.y,
        translate: "-50% -50%",
        whiteSpace: "nowrap",
      }}
    >
      {spec.text}
    </div>
  );
};

export const S26Scene = () => {
  const frame = useCurrentFrame();

  const panX = interpolate(frame, [0, S26_DURATION_IN_FRAMES], [26, -38], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.4, 1),
  });
  const panY = interpolate(frame, [0, S26_DURATION_IN_FRAMES], [-10, 8], clamp);
  const push = interpolate(frame, [0, S26_DURATION_IN_FRAMES], [1.03, 1.075], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.4, 1),
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          translate: `${panX}px ${panY}px`,
        }}
      >
        <Img
          src={desk}
          style={{
            filter: "saturate(0.95) contrast(1.03)",
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />

        {LABELS.map((label) => (
          <Label key={label.text} spec={label} />
        ))}
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(78% 62% at 50% 44%, rgba(0,0,0,0) 42%, rgba(12,7,4,0.32) 84%, rgba(10,6,4,0.54) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.11}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={232}
        emphasisWords={["事实"]}
        lines={["“考不上”“不会做”", "“没对象”“没工作”", "是事实"]}
      />
    </AbsoluteFill>
  );
};
