import {AbsoluteFill} from "remotion";
import {Closing05} from "./cards";

export const S30_DURATION_IN_FRAMES = 150;

export const S30Scene = () => (
  <AbsoluteFill>
    <Closing05 durationInFrames={S30_DURATION_IN_FRAMES} />
  </AbsoluteFill>
);
