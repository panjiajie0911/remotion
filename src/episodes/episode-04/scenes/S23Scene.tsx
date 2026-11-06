import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CardChapter03} from "./cards";

export const S23_DURATION_IN_FRAMES = 75;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const S23Scene = () => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 9], [1, 0], clamp);
  const card = interpolate(frame, [0, 22], [0, 1], {...clamp, easing: ease});
  const settle = interpolate(frame, [22, 56], [1.035, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          opacity: card,
          scale: `${settle}`,
          translate: `0 ${(1 - card) * 64}px`,
        }}
      >
        <CardChapter03 durationInFrames={S23_DURATION_IN_FRAMES} />
      </AbsoluteFill>

      <AbsoluteFill style={{backgroundColor: "#FFF6E8", opacity: enter}} />
    </AbsoluteFill>
  );
};
