import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import corridor from "../assets/img/grow.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S29_DURATION_IN_FRAMES = 195;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const ease = Easing.bezier(0.3, 0, 0.36, 1);

const MOTES = Array.from({length: 18}, (_, index) => {
  const seed = Math.sin(index * 21.913 + 3.7) * 43758.5453;
  const rand = (offset: number) => {
    const value = Math.sin(seed + offset) * 10000;
    return value - Math.floor(value);
  };
  return {
    x: 70 + rand(1) * 940,
    y: 240 + rand(2) * 780,
    size: 2 + rand(3) * 4.5,
    speed: 0.35 + rand(4) * 0.95,
    phase: rand(5) * Math.PI * 2,
  };
});

const RAYS = [
  {left: 330, top: 260, width: 210, rotate: 16, opacity: 0.5, delay: 0},
  {left: 430, top: 250, width: 300, rotate: 4, opacity: 0.42, delay: 14},
  {left: 520, top: 268, width: 200, rotate: -14, opacity: 0.36, delay: 26},
];

export const S29Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S29_DURATION_IN_FRAMES], [1.02, 1.11], {
    ...clamp,
    easing: Easing.bezier(0.22, 0, 0.3, 1),
  });
  const lift = interpolate(frame, [0, S29_DURATION_IN_FRAMES], [0, -16], {
    ...clamp,
    easing: Easing.bezier(0.22, 0, 0.3, 1),
  });
  const swayX = Math.sin(frame / 58) * 1.6;
  const swayY = Math.cos(frame / 71) * 1.2;

  const bright = interpolate(frame, [0, 168], [0.8, 1.06], {...clamp, easing: ease});

  const bloom = interpolate(frame, [12, 160], [0.12, 0.52], {...clamp, easing: ease});
  const pulse = 0.94 + Math.sin(frame / 34) * 0.06;

  const veil = interpolate(frame, [S29_DURATION_IN_FRAMES - 42, S29_DURATION_IN_FRAMES], [0, 0.2], {
    ...clamp,
    easing: ease,
  });
  const enter = interpolate(frame, [0, 16], [0.34, 0], {...clamp, easing: ease});

  return (
    <AbsoluteFill style={{backgroundColor: "#0C0806", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          translate: `${swayX}px ${lift + swayY}px`,
        }}
      >
        <Img
          src={corridor}
          style={{
            filter: `brightness(${bright}) saturate(1.03) contrast(1.03)`,
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />

        {RAYS.map((ray, index) => {
          const grow = interpolate(frame, [18 + ray.delay, 130 + ray.delay], [0, 1], {
            ...clamp,
            easing: ease,
          });
          const breathe = 0.86 + Math.sin(frame / 38 + index * 1.4) * 0.14;

          return (
            <div
              key={index}
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,240,200,0.6) 0%, rgba(255,226,170,0.26) 42%, rgba(255,214,150,0) 88%)",
                filter: "blur(22px)",
                height: 760,
                left: ray.left,
                mixBlendMode: "screen",
                opacity: ray.opacity * grow * breathe,
                position: "absolute",
                rotate: `${ray.rotate}deg`,
                top: ray.top,
                transformOrigin: "50% 0%",
                width: ray.width,
              }}
            />
          );
        })}

        {MOTES.map((mote, index) => {
          const y = mote.y - ((frame * mote.speed) % 760);
          const x = mote.x + Math.sin(frame / 44 + mote.phase) * 15;
          const opacity = 0.12 + Math.abs(Math.sin(frame / 32 + mote.phase)) * 0.42;

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,234,190,0.9)",
                borderRadius: "50%",
                boxShadow: "0 0 8px rgba(255,220,160,0.65)",
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
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(42% 27% at 52% 31%, rgba(255,244,214,0.9) 0%, rgba(255,226,172,0.3) 44%, rgba(255,210,150,0) 74%)",
          mixBlendMode: "screen",
          opacity: bloom * pulse,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(84% 60% at 50% 46%, rgba(0,0,0,0) 42%, rgba(14,8,5,0.28) 82%, rgba(10,6,4,0.46) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(16,10,6,0.32) 0%, rgba(16,10,6,0) 28%)",
        }}
      />

      <AbsoluteFill style={{background: "#FFF4DC", mixBlendMode: "screen", opacity: veil}} />

      <AbsoluteFill style={{background: "#FFF0D2", mixBlendMode: "screen", opacity: enter}} />

      <AbsoluteFill style={{opacity: 0.09}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={8}
        until={188}
        emphasisWords={["恐惧"]}
        lines={["你今天恐惧的事情", "不过都只是3年级那次没戴的红领巾", "仅此而已"]}
      />
    </AbsoluteFill>
  );
};
