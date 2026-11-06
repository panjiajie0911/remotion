import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {CaptionScrim} from "../../../design-system";
import s05 from "../assets/video/s05.mp4";
import s04Tail from "../assets/img/s04-tail.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S05_DURATION_IN_FRAMES = 210;

const DISSOLVE = 14;

export const S05Scene = () => {
  const frame = useCurrentFrame();
  const dissolve = interpolate(frame, [0, DISSOLVE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <Video muted src={s05} style={{height: "100%", width: "100%", objectFit: "cover"}} />
      <Img
        src={s04Tail}
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
      <SubtitleTrack
        from={18}
        until={200}
        emphasisWords={["错误", "不好的孩子"]}
        lines={["那一天我觉得自己", "犯了一个特别严重的错误。", "好像我是个不好的孩子。"]}
      />
    </AbsoluteFill>
  );
};
