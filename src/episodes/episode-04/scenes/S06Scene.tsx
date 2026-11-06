import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import s06Letter from "../assets/img/s06-letter.png";
import s06Office from "../assets/img/s06-office.png";
import s06Street from "../assets/img/s06-street.png";
import s05Tail from "../assets/img/s05-tail.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S06_DURATION_IN_FRAMES = 150;

const CUT_A = 50;
const FADE = 8;
const ENTER = 10;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const shot = (frame: number, index: number) => {
  const start = index * CUT_A;
  const local = frame - start;
  const scale = interpolate(local, [0, CUT_A + FADE], [1, 1.035], clamp);

  let opacity = 1;
  if (index > 0) {
    opacity = Math.min(
      opacity,
      interpolate(frame, [start - FADE / 2, start + FADE / 2], [0, 1], clamp),
    );
  }
  if (index < 2) {
    opacity = Math.min(
      opacity,
      interpolate(frame, [start + CUT_A - FADE / 2, start + CUT_A + FADE / 2], [1, 0], clamp),
    );
  }

  return {opacity, scale};
};

export const S06Scene = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, ENTER], [1, 0], clamp);
  const shots = [
    {src: s06Letter, at: 0},
    {src: s06Office, at: 1},
    {src: s06Street, at: 2},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      {shots.map(({src, at}) => {
        const {opacity, scale} = shot(frame, at);
        return (
          <Img
            key={src}
            src={src}
            style={{
              height: "100%",
              left: 0,
              maxWidth: "none",
              opacity,
              position: "absolute",
              scale: `${scale}`,
              top: 0,
              transformOrigin: "52% 46%",
              width: "100%",
            }}
          />
        );
      })}
      <Img
        src={s05Tail}
        style={{
          height: "100%",
          left: 0,
          maxWidth: "none",
          opacity: enter,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />
      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={146}
        emphasisWords={["大学", "工作"]}
        lines={["多年之后我依然考上了大学", "依然找到了工作"]}
      />
    </AbsoluteFill>
  );
};
