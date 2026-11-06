import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {CaptionScrim} from "../../../design-system";
import s04 from "../assets/video/s04.mp4";
import s03Tail from "../assets/img/s03-tail.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S04_DURATION_IN_FRAMES = 90;

const DISSOLVE = 8;

export const S04Scene = () => {
  const frame = useCurrentFrame();
  const dissolve = interpolate(frame, [0, DISSOLVE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <Video muted src={s04} style={{height: "100%", width: "100%", objectFit: "cover"}} />
      <Img
        src={s03Tail}
        style={{
          height: "100%",
          left: 0,
          maxWidth: "none",
          opacity: dissolve,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      />
      <CaptionScrim />
      <SubtitleTrack from={10} until={86} lines={["又被要求在教室门外罚站"]} />
    </AbsoluteFill>
  );
};
