import { AbsoluteFill, Sequence } from "remotion";
import { CaptionTrack, ProgressBar, TraumaIntro } from "../../components";
import { OutroScene } from "../../scenes/OutroScene";
import { captions } from "./script/captions";

/** 第 1 期视频时间线。后续每一期复制本目录并独立维护时间线。 */
export const Episode01 = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={180}>
      <TraumaIntro />
    </Sequence>
    <Sequence from={180} durationInFrames={90}>
      <OutroScene />
    </Sequence>
    <CaptionTrack captions={captions} />
    <ProgressBar />
  </AbsoluteFill>
);
