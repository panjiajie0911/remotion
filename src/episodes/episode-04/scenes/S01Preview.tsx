import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim, VideoCaption} from "../../../design-system";
import keyframe from "../assets/img/s01-keyframe.png";

export const S01_DURATION_IN_FRAMES = 180;

export const S01Preview = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S01_DURATION_IN_FRAMES], [0, 1], {
    easing: Easing.bezier(0.32, 0, 0.68, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = 1 + 0.075 * push;
  const shiftY = -16 * push;

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: "clamp"});
  const fadeOut = interpolate(frame, [S01_DURATION_IN_FRAMES - 10, S01_DURATION_IN_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0A09", overflow: "hidden"}}>
      <Img
        src={keyframe}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${shiftY}px)`,
        }}
      />
      <CaptionScrim />
      <VideoCaption
        from={12}
        until={172}
        text={"今天让你焦虑的事，\n不过是小学3年级时忘戴的红领巾"}
        emphasisWords={["红领巾"]}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#0B0A09",
          opacity: Math.max(1 - fadeIn, 1 - fadeOut),
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
