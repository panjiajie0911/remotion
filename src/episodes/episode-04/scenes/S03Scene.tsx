import {AbsoluteFill} from "remotion";
import {Video} from "@remotion/media";
import {CaptionScrim} from "../../../design-system";
import s03 from "../assets/video/s03.mp4";
import {SubtitleTrack} from "./SubtitleTrack";

export const S03_DURATION_IN_FRAMES = 135;

export const S03Scene = () => (
  <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
    <Video muted src={s03} style={{height: "100%", width: "100%", objectFit: "cover"}} />
    <CaptionScrim />
    <SubtitleTrack
      from={6}
      until={128}
      lines={["有一次我忘记戴红领巾", "被老师当着全班的面批评"]}
    />
  </AbsoluteFill>
);
