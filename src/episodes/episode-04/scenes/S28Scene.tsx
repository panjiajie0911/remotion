import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import hands from "../assets/img/hand.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S28_DURATION_IN_FRAMES = 180;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.3, 0, 0.4, 1);

const TAGS = [
  {label: "价值", x: 236, y: 246, rot: -7, at: 56},
  {label: "道德", x: 512, y: 196, rot: 2, at: 68},
  {label: "品德", x: 770, y: 258, rot: 6, at: 80},
];

const MOTES = Array.from({length: 16}, (_, index) => {
  const seed = Math.sin(index * 12.9898) * 43758.5453;
  const rand = (offset: number) => {
    const value = Math.sin(seed + offset) * 10000;
    return value - Math.floor(value);
  };
  return {
    x: 80 + rand(1) * 920,
    y: 180 + rand(2) * 900,
    size: 2 + rand(3) * 4,
    speed: 0.4 + rand(4) * 1.1,
    phase: rand(5) * Math.PI * 2,
  };
});

const Tag = ({spec}: {spec: (typeof TAGS)[number]}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [spec.at, spec.at + 58], [0, 1], {...clamp, easing: ease});
  const opacity = 1 - fade;
  const blur = fade * 7;
  const rise = fade * 26;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #2C2018 0%, #170F0B 100%)",
        border: "1px solid rgba(201,162,39,0.55)",
        borderRadius: 3,
        boxShadow: "0 18px 34px rgba(0,0,0,0.5), inset 0 1px 0 rgba(228,200,115,0.22)",
        color: "#E8CD92",
        filter: `blur(${blur}px) brightness(${1 + fade * 0.8})`,
        fontFamily: theme.fonts.sans,
        fontSize: 34,
        fontWeight: 600,
        left: spec.x,
        letterSpacing: 7,
        opacity,
        padding: "20px 28px 18px",
        position: "absolute",
        rotate: `${spec.rot + Math.sin((frame + spec.x) / 46) * 0.8}deg`,
        top: spec.y,
        translate: `-50% calc(-50% - ${rise}px)`,
        whiteSpace: "nowrap",
      }}
    >
      {spec.label}
    </div>
  );
};

export const S28Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S28_DURATION_IN_FRAMES], [1.0, 1.05], {
    ...clamp,
    easing: Easing.bezier(0.26, 0, 0.4, 1),
  });
  const driftX = Math.sin(frame / 47) * 1.8;
  const driftY = Math.cos(frame / 41) * 1.4;

  const shaft = interpolate(frame, [20, 150], [0.1, 0.26], {...clamp, easing: ease});
  const bloom = interpolate(frame, [70, 150], [0.08, 0.3], {...clamp, easing: ease});

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          translate: `${driftX}px ${driftY}px`,
        }}
      >
        <Img
          src={hands}
          style={{
            filter: "saturate(0.97) contrast(1.02)",
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />

        <div
          style={{
            background:
              "linear-gradient(140deg, rgba(255,226,170,0.32) 0%, rgba(255,214,150,0.12) 34%, rgba(255,200,130,0) 62%)",
            inset: 0,
            mixBlendMode: "screen",
            opacity: shaft,
            position: "absolute",
          }}
        />

        {MOTES.map((mote, index) => {
          const y = mote.y - ((frame * mote.speed) % 900);
          const x = mote.x + Math.sin(frame / 40 + mote.phase) * 14;
          const opacity = 0.15 + Math.abs(Math.sin(frame / 30 + mote.phase)) * 0.4;

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,232,186,0.9)",
                borderRadius: "50%",
                boxShadow: "0 0 8px rgba(255,220,160,0.6)",
                height: mote.size,
                left: x,
                opacity,
                position: "absolute",
                top: y,
                width: mote.size,
              }}
            />
          );
        })}

        {TAGS.map((tag) => (
          <Tag key={tag.label} spec={tag} />
        ))}
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(34% 24% at 34% 30%, rgba(255,230,180,0.5) 0%, rgba(255,214,150,0.14) 48%, rgba(255,200,130,0) 76%)",
          mixBlendMode: "screen",
          opacity: bloom,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 62% at 50% 48%, rgba(0,0,0,0) 44%, rgba(12,7,4,0.3) 84%, rgba(10,6,4,0.5) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.1}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={172}
        emphasisWords={["犯错", "后果", "道德"]}
        lines={["允许自己犯错", "并适度承担后果", "但不能上升至人格或道德层面"]}
      />
    </AbsoluteFill>
  );
};
