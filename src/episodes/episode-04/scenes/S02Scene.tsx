import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import panPlate from "../assets/img/s02-pan.jpg";
import {SubtitleTrack} from "./SubtitleTrack";

export const S02_DURATION_IN_FRAMES = 135;

const PAN_TRAVEL = 130;

export const S02Scene = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, S02_DURATION_IN_FRAMES], [0, 1], {
    easing: Easing.bezier(0.38, 0, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const offset = interpolate(progress, [0, 1], [0, PAN_TRAVEL]);

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <Img
        src={panPlate}
        style={{
          height: 1920,
          left: -offset,
          maxWidth: "none",
          position: "absolute",
          top: 0,
          width: 1210,
        }}
      />
      <CaptionScrim />
      <SubtitleTrack
        from={8}
        until={128}
        lines={["小学的时候", "学校要求学生要佩戴红领巾"]}
        emphasisWords={["红领巾"]}
      />
    </AbsoluteFill>
  );
};
