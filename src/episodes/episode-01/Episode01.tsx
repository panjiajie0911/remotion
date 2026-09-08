import { AbsoluteFill, Sequence } from "remotion";
import { IntroScene } from "../../scenes/IntroScene";
import { OutroScene } from "../../scenes/OutroScene";
import { ProgressBar } from "../../components";

/** 第 1 期视频时间线。后续每一期复制本目录并独立维护时间线。 */
export const Episode01 = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={180}>
      <IntroScene />
    </Sequence>
    <Sequence from={180} durationInFrames={90}>
      <OutroScene />
    </Sequence>
    <ProgressBar />
  </AbsoluteFill>
);
