import { AbsoluteFill, Sequence } from "remotion";
import { CaptionTrack, PsychologyHook, ProgressBar } from "../../components";
import { OutroScene } from "../../scenes/OutroScene";
import { captions } from "./script/captions";

/** 第 1 期视频时间线。后续每一期复制本目录并独立维护时间线。 */
export const Episode01 = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={180}>
      <PsychologyHook
        question={["你是不是也经常觉得，", "自己还不够好？"]}
        emphasis="不够好"
        series="心理学 · 第 01 期"
        author="你的名字"
      />
    </Sequence>
    <Sequence from={180} durationInFrames={90}>
      <OutroScene />
    </Sequence>
    <CaptionTrack captions={captions} />
    <ProgressBar />
  </AbsoluteFill>
);
