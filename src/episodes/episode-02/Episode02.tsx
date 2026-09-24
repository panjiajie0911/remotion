import { PermissiveParentScene, PERMISSIVE_PARENT_DURATION } from "./scenes/PermissiveParentScene";
import { EmotionBoundaryScene, EMOTION_BOUNDARY_DURATION } from "./scenes/EmotionBoundaryScene";
import { GoodEnoughEnvironmentScene, GOOD_ENOUGH_ENVIRONMENT_DURATION } from "./scenes/GoodEnoughEnvironmentScene";
import { SeekingAttentionScene, SEEKING_ATTENTION_DURATION } from "./scenes/SeekingAttentionScene";
import { UnspokenFeelingsScene, UNSPOKEN_FEELINGS_DURATION } from "./scenes/UnspokenFeelingsScene";
import { LearningPauseScene, LEARNING_PAUSE_DURATION } from "./scenes/LearningPauseScene";
import { NotBadChildScene, NOT_BAD_CHILD_DURATION } from "./scenes/NotBadChildScene";
import { DirectReactionsScene, DIRECT_REACTIONS_DURATION } from "./scenes/DirectReactionsScene";
import { ImpulseGrabScene, IMPULSE_GRAB_DURATION } from "./scenes/ImpulseGrabScene";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CaptionTrack, ProgressBar, SeriesIntro, SERIES_INTRO_DURATION } from "../../components";
import { KindergartenContrastScene, KINDERGARTEN_CONTRAST_DURATION } from "./scenes/KindergartenContrastScene";
import { PsychologyStructureScene, PSYCHOLOGY_STRUCTURE_DURATION } from "./scenes/PsychologyStructureScene";
import { IdImpulseScene, ID_IMPULSE_DURATION } from "./scenes/IdImpulseScene";
import { SelfRealityScene, SELF_REALITY_DURATION } from "./scenes/SelfRealityScene";
import { SuperegoValuesScene, SUPEREGO_VALUES_DURATION } from "./scenes/SuperegoValuesScene";
import { CommonCausesScene, COMMON_CAUSES_START, COMMON_CAUSES_DURATION } from "./scenes/CommonCausesScene";
import { captions } from "./script/captions";

// 第三镜头对应旁白“弗洛伊德把人的心理活动分为……”的起始位置。
// 时间以音频开始后计，再加上片头的 3 秒。
export const PSYCHOLOGY_STRUCTURE_START = SERIES_INTRO_DURATION + Math.round(34.39 * 30);
// 三句台词拆开后，分别从音频 40.42s、42.68s、44.94s 开始。
export const ID_IMPULSE_START = SERIES_INTRO_DURATION + Math.round(40.4 * 30);
export const SELF_REALITY_START = SERIES_INTRO_DURATION + Math.round(42.68 * 30);
export const SUPEREGO_VALUES_START = SERIES_INTRO_DURATION + Math.round(44.94 * 30);

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
    <Sequence from={COMMON_CAUSES_START} durationInFrames={COMMON_CAUSES_DURATION} name="常见归因 · 15–21s">
      <CommonCausesScene />
    </Sequence>
    <Sequence from={PSYCHOLOGY_STRUCTURE_START} durationInFrames={PSYCHOLOGY_STRUCTURE_DURATION}>
      <PsychologyStructureScene />
    </Sequence>
    <Sequence from={ID_IMPULSE_START} durationInFrames={ID_IMPULSE_DURATION}>
      <IdImpulseScene />
    </Sequence>
    <Sequence from={SELF_REALITY_START} durationInFrames={SELF_REALITY_DURATION}>
      <SelfRealityScene />
    </Sequence>
    <Sequence from={SUPEREGO_VALUES_START} durationInFrames={SUPEREGO_VALUES_DURATION}>
      <SuperegoValuesScene />
    </Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION} durationInFrames={IMPULSE_GRAB_DURATION} name="自我控制 · 立刻拿取"><ImpulseGrabScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION} durationInFrames={DIRECT_REACTIONS_DURATION} name="直接情绪反应"><DirectReactionsScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION} durationInFrames={NOT_BAD_CHILD_DURATION} name="行为不等于孩子本身"><NotBadChildScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION} durationInFrames={LEARNING_PAUSE_DURATION} name="学习管理冲动"><LearningPauseScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION + LEARNING_PAUSE_DURATION} durationInFrames={UNSPOKEN_FEELINGS_DURATION} name="说不清的感受"><UnspokenFeelingsScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION + LEARNING_PAUSE_DURATION + UNSPOKEN_FEELINGS_DURATION} durationInFrames={SEEKING_ATTENTION_DURATION} name="寻求关注 · 拥抱"><SeekingAttentionScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION + LEARNING_PAUSE_DURATION + UNSPOKEN_FEELINGS_DURATION + SEEKING_ATTENTION_DURATION} durationInFrames={GOOD_ENOUGH_ENVIRONMENT_DURATION} name="足够好的环境"><GoodEnoughEnvironmentScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION + LEARNING_PAUSE_DURATION + UNSPOKEN_FEELINGS_DURATION + SEEKING_ATTENTION_DURATION + GOOD_ENOUGH_ENVIRONMENT_DURATION} durationInFrames={EMOTION_BOUNDARY_DURATION} name="理解感受 · 稳定边界"><EmotionBoundaryScene /></Sequence>
    <Sequence from={SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION + IMPULSE_GRAB_DURATION + DIRECT_REACTIONS_DURATION + NOT_BAD_CHILD_DURATION + LEARNING_PAUSE_DURATION + UNSPOKEN_FEELINGS_DURATION + SEEKING_ATTENTION_DURATION + GOOD_ENOUGH_ENVIRONMENT_DURATION + EMOTION_BOUNDARY_DURATION} durationInFrames={PERMISSIVE_PARENT_DURATION} name="放任 · 缺少规则引导"><PermissiveParentScene /></Sequence>
    <CaptionTrack
      hiddenIntervals={[{ start: SUPEREGO_VALUES_START / 30, end: (SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION) / 30 }]}
      captions={captions.map((cue) => ({
        ...cue,
        start: cue.start + SERIES_INTRO_DURATION / 30,
        end: cue.end + SERIES_INTRO_DURATION / 30,
      }))}
   
    />
    <ProgressBar />
  </AbsoluteFill>
);










