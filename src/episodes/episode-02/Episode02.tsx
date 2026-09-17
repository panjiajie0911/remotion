import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CaptionTrack, ProgressBar, SeriesIntro, SERIES_INTRO_DURATION } from "../../components";
import { KindergartenContrastScene, KINDERGARTEN_CONTRAST_DURATION } from "./scenes/KindergartenContrastScene";
import { PsychologyStructureScene, PSYCHOLOGY_STRUCTURE_DURATION } from "./scenes/PsychologyStructureScene";
import { captions } from "./script/captions";

// 第三镜头对应旁白“弗洛伊德把人的心理活动分为……”的起始位置。
// 时间以音频开始后计，再加上片头的 3 秒。
export const PSYCHOLOGY_STRUCTURE_START = SERIES_INTRO_DURATION + Math.round(34.39 * 30);

/** 第 2 期《你的孩子的“熊”来自哪里》时间线入口。字幕由 TXT 文稿在后期手动加入。 */
export const Episode02 = () => (
  <AbsoluteFill style={{ backgroundColor: "#fff" }}>
    <Sequence durationInFrames={SERIES_INTRO_DURATION}>
      <SeriesIntro
        emphasisLines={[1]}
        title={["你的孩子的", "“熊”", "来自哪里"]}
      />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={5400}>
      <Audio src={staticFile("episodes/episode-02/2.m4a")} />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={KINDERGARTEN_CONTRAST_DURATION}>
      <KindergartenContrastScene />
    </Sequence>
    <Sequence from={PSYCHOLOGY_STRUCTURE_START} durationInFrames={PSYCHOLOGY_STRUCTURE_DURATION}>
      <PsychologyStructureScene />
    </Sequence>
    <CaptionTrack
      captions={captions.map((cue) => ({
        ...cue,
        start: cue.start + SERIES_INTRO_DURATION / 30,
        end: cue.end + SERIES_INTRO_DURATION / 30,
      }))}
   
    />
    <ProgressBar />
  </AbsoluteFill>
);
