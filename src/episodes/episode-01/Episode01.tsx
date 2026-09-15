import { AbsoluteFill, Sequence } from "remotion";
import { CaptionTrack, ProgressBar, SeriesIntro, SERIES_INTRO_DURATION } from "../../components";
import { OutroScene } from "../../scenes/OutroScene";
import { captions } from "./script/captions";

/** 第 1 期视频时间线。后续每一期复制本目录并独立维护时间线。 */
export const Episode01 = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={SERIES_INTRO_DURATION}>
      <SeriesIntro
  
        title={["那些你以为是", "正常", "其实是创伤"]}
      />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={180}>
      <OutroScene />
    </Sequence>
    <CaptionTrack captions={captions} />
    <ProgressBar />
  </AbsoluteFill>
);
