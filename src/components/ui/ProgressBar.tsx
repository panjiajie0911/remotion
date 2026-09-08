import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../lib/theme";

export const ProgressBar = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return <div style={{ backgroundColor: theme.colors.border, bottom: 0, height: 8, left: 0, position: "absolute", right: 0 }}><div style={{ backgroundColor: theme.colors.accent, height: "100%", width: `${progress}%` }} /></div>;
};
