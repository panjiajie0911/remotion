import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import s12 from "../assets/img/s12-classroom.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S12_DURATION_IN_FRAMES = 180;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const MOTES = Array.from({length: 14}, (_, index) => {
  const seed = Math.sin(index * 12.9898) * 43758.5453;
  const rnd = seed - Math.floor(seed);
  const seed2 = Math.sin(index * 78.233) * 12345.6789;
  const rnd2 = seed2 - Math.floor(seed2);
  return {
    x: 220 + rnd * 640,
    y: 260 + rnd2 * 1180,
    size: 3 + rnd2 * 4,
    drift: 26 + rnd * 46,
    phase: rnd * 6.28,
    speed: 0.6 + rnd2 * 0.9,
  };
});

export const S12Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S12_DURATION_IN_FRAMES], [1.0, 1.038], {
    ...clamp,
    easing: Easing.bezier(0, 0, 0.4, 1),
  });
  const breath = 1 + Math.sin(frame / 46) * 0.012;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <Img
        src={s12}
        style={{
          filter: `brightness(${breath})`,
          height: "100%",
          left: 0,
          maxWidth: "none",
          position: "absolute",
          scale: `${push}`,
          top: 0,
          transformOrigin: "50% 54%",
          width: "100%",
        }}
      />

      {MOTES.map((mote, index) => {
        const progress = (frame / S12_DURATION_IN_FRAMES) * mote.speed;
        const y = mote.y - progress * mote.drift * 6;
        const flicker = 0.18 + Math.abs(Math.sin(frame / 24 + mote.phase)) * 0.28;
        return (
          <div
            key={index}
            style={{
              background: "rgba(255,236,198,0.9)",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(255,226,170,0.55)",
              height: mote.size,
              left: mote.x + Math.sin(frame / 40 + mote.phase) * 8,
              opacity: flicker,
              position: "absolute",
              top: y,
              width: mote.size,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 50% at 50% 62%, rgba(255,226,170,0.05) 0%, rgba(255,226,170,0) 60%)",
        }}
      />

      <CaptionScrim />
      <SubtitleTrack
        from={14}
        until={170}
        emphasisWords={["羞耻"]}
        lines={["并伴随着公开点名", "示众等羞耻教育"]}
      />
    </AbsoluteFill>
  );
};
