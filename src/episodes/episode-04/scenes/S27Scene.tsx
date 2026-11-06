import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import desk from "../assets/img/cards.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S27_DURATION_IN_FRAMES = 195;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.2, 0, 0.3, 1);

const FACTS = [
  {text: "考不上", x: 236, y: 748, rot: -17},
  {text: "不会做", x: 305, y: 482, rot: -6},
  {text: "没对象", x: 600, y: 278, rot: 2},
  {text: "没工作", x: 786, y: 588, rot: 4},
];

type TagSpec = {
  label: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
};

const TAGS: TagSpec[] = [
  {label: "价值", fromX: 500, fromY: 760, toX: 328, toY: 1196, delay: 26},
  {label: "道德", fromX: 560, fromY: 800, toX: 540, toY: 1258, delay: 36},
  {label: "品德", fromX: 620, fromY: 760, toX: 752, toY: 1172, delay: 46},
];

const BEAM_Y = 1000;
const BEAM_LEFT = 168;
const BEAM_RIGHT = 912;

const HeavyTag = ({spec}: {spec: TagSpec}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [spec.delay, spec.delay + 44], [0, 1], {...clamp, easing: ease});
  const thread = interpolate(frame, [spec.delay + 18, spec.delay + 52], [0, 1], clamp);

  if (p <= 0) return null;

  const x = spec.fromX + (spec.toX - spec.fromX) * p;
  const y = spec.fromY + (spec.toY - spec.fromY) * p;
  const rot = -7 * (1 - p) + Math.sin((frame + spec.delay) / 52) * 0.8;
  const threadTop = BEAM_Y + 3;
  const threadBottom = threadTop + (y - 42 - threadTop) * thread;

  return (
    <>
      <div
        style={{
          background: "rgba(228,200,115,0.55)",
          height: Math.max(0, threadBottom - threadTop),
          left: x - 0.5,
          position: "absolute",
          top: threadTop,
          width: 1.4,
        }}
      />
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(180deg, #2C2018 0%, #170F0B 100%)",
          border: "1px solid rgba(201,162,39,0.55)",
          borderRadius: 3,
          boxShadow: "0 18px 34px rgba(0,0,0,0.5), inset 0 1px 0 rgba(228,200,115,0.22)",
          color: "#E8CD92",
          display: "flex",
          fontFamily: theme.fonts.sans,
          fontSize: 34,
          fontWeight: 600,
          justifyContent: "center",
          left: x,
          letterSpacing: 7,
          opacity: p,
          padding: "20px 26px 18px",
          position: "absolute",
          rotate: `${rot}deg`,
          top: y,
          translate: "-50% -50%",
          whiteSpace: "nowrap",
        }}
      >
        {spec.label}
      </div>
    </>
  );
};

export const S27Scene = () => {
  const frame = useCurrentFrame();

  const pull = interpolate(frame, [0, 150], [1.09, 1.0], {
    ...clamp,
    easing: Easing.bezier(0.32, 0, 0.4, 1),
  });
  const lift = interpolate(frame, [0, 150], [-34, 0], {...clamp, easing: ease});

  const beam = interpolate(frame, [12, 48], [0, 1], {...clamp, easing: ease});
  const glow = 0.3 + Math.sin(frame / 34) * 0.06;
  const swing = Math.sin(frame / 40) * 1.2 * interpolate(frame, [60, 120], [1, 0.3], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${pull}`,
          translate: `0 ${lift}px`,
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

        {FACTS.map((fact) => (
          <div
            key={fact.text}
            style={{
              color: "#3B2A1D",
              fontFamily: theme.fonts.sans,
              fontSize: 38,
              fontWeight: 600,
              left: fact.x,
              letterSpacing: 4,
              position: "absolute",
              rotate: `${fact.rot}deg`,
              textShadow: "0 1px 0 rgba(255,252,244,0.5), 0 4px 10px rgba(56,34,16,0.28)",
              top: fact.y,
              translate: "-50% -50%",
              whiteSpace: "nowrap",
            }}
          >
            {fact.text}
          </div>
        ))}
      </div>

      <div style={{inset: 0, position: "absolute"}}>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(201,162,39,0) 0%, #C9A227 14%, #F0D89A 50%, #C9A227 86%, rgba(201,162,39,0) 100%)",
            borderRadius: 3,
            boxShadow: "0 0 26px rgba(228,200,115,0.35)",
            height: 6,
            left: BEAM_LEFT,
            opacity: beam,
            position: "absolute",
            top: BEAM_Y,
            transform: `translateX(${swing}px) scaleX(${beam})`,
            transformOrigin: "50% 50%",
            width: BEAM_RIGHT - BEAM_LEFT,
          }}
        />

        <div
          style={{
            background: "radial-gradient(circle, rgba(201,162,39,0.28) 0%, rgba(201,162,39,0) 70%)",
            height: 260,
            left: 410,
            opacity: beam * glow,
            position: "absolute",
            top: 810,
            width: 260,
          }}
        />

        <div
          style={{
            borderBottom: "42px solid rgba(201,162,39,0.85)",
            borderLeft: "30px solid transparent",
            borderRight: "30px solid transparent",
            height: 0,
            left: 540 - swing,
            marginLeft: -30,
            opacity: beam,
            position: "absolute",
            top: BEAM_Y + 4,
            width: 0,
          }}
        />

        {TAGS.map((tag) => (
          <HeavyTag key={tag.label} spec={tag} />
        ))}
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 64% at 50% 46%, rgba(0,0,0,0) 42%, rgba(12,7,4,0.3) 84%, rgba(10,6,4,0.52) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.11}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={186}
        emphasisWords={["价值", "道德", "品德"]}
        lines={["它和“价值”“道德”“品德”", "没有关系，", "不参与价值判断。"]}
      />
    </AbsoluteFill>
  );
};
