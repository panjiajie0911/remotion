import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ProgressBar, SeriesIntro, SERIES_INTRO_DURATION } from "../../components";

/** 第 2 期《你的孩子的“熊”来自哪里》时间线入口。字幕由 TXT 文稿在后期手动加入。 */
export const Episode02 = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={SERIES_INTRO_DURATION}>
      <SeriesIntro
        emphasisLines={[1]}
        title={["你的孩子的", "“熊”", "来自哪里"]}
      />
    </Sequence>
    <Audio src={staticFile("episodes/episode-02/2.m4a")} />
    <ProgressBar />
  </AbsoluteFill>
);
