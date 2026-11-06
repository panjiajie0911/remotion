import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import s09Parent from "../assets/img/s09-parent.png";
import s09Teacher from "../assets/img/s09-teacher.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S09_DURATION_IN_FRAMES = 180;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const Panel = ({
  src,
  position,
  origin,
  progress,
  delay,
}: {
  src: string;
  position: string;
  origin: string;
  progress: number;
  delay: number;
}) => (
  <div style={{height: "100%", overflow: "hidden", position: "relative", width: 540}}>
    <Img
      src={src}
      style={{
        height: "100%",
        left: 0,
        maxWidth: "none",
        objectFit: "cover",
        objectPosition: position,
        position: "absolute",
        scale: `${progress}`,
        top: 0,
        transformOrigin: origin,
        width: "100%",
      }}
    />
    <AbsoluteFill
      style={{
        background: "linear-gradient(to top, rgba(13,10,9,0.42) 0%, rgba(13,10,9,0) 46%)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          delay > 0
            ? "linear-gradient(to left, rgba(13,10,9,0.55) 0%, rgba(13,10,9,0) 32%)"
            : "linear-gradient(to right, rgba(13,10,9,0.55) 0%, rgba(13,10,9,0) 32%)",
      }}
    />
  </div>
);

export const S09Scene = () => {
  const frame = useCurrentFrame();

  const left = interpolate(frame, [0, S09_DURATION_IN_FRAMES], [1.0, 1.055], clamp);
  const right = interpolate(frame, [0, S09_DURATION_IN_FRAMES], [1.045, 1.0], clamp);
  const seam = interpolate(frame, [0, 14], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <AbsoluteFill style={{flexDirection: "row"}}>
        <Panel
          delay={0}
          origin="56% 36%"
          position="50% 46%"
          progress={left}
          src={s09Parent}
        />
        <Panel
          delay={1}
          origin="44% 32%"
          position="40% 44%"
          progress={right}
          src={s09Teacher}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "linear-gradient(to right, rgba(201,162,39,0) 46%, rgba(201,162,39,0.55) 50%, rgba(201,162,39,0) 54%)",
          opacity: 0.5 * seam,
        }}
      />
      <div
        style={{
          backgroundColor: "#C9A227",
          height: 2,
          left: 539,
          opacity: 0.6 * seam,
          position: "absolute",
          top: 0,
          width: 2,
        }}
      />

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={174}
        emphasisWords={["“威权式教育”"]}
        lines={["上一代的家长和老师中", "普遍存在一种", "“威权式教育”的育儿理念"]}
      />
    </AbsoluteFill>
  );
};
