import { TwinsContrastScene, TWINS_START, TWINS_DURATION } from "./scenes/TwinsContrastScene";
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
import { SuppressedNeedScene, SUPPRESSED_NEED_DURATION } from "./scenes/SuppressedNeedScene";
import { captions, displayCaptions } from "./script/captions";
import {ClosingAvatarScene, CLOSING_AVATAR_AUDIO_START, CLOSING_AVATAR_DURATION} from "./scenes/ClosingAvatarScene";
import {DeathInstinctScene, DEATH_INSTINCT_AUDIO_START, DEATH_INSTINCT_DURATION} from "./scenes/DeathInstinctScene";
import {ModernFactorsScene, MODERN_FACTORS_AUDIO_START, MODERN_FACTORS_DURATION} from "./scenes/ModernFactorsScene";
import {ThinkingObservationScene, THINKING_OBSERVATION_AUDIO_START, THINKING_OBSERVATION_DURATION} from "./scenes/ThinkingObservationScene";

// 第三镜头对应旁白“弗洛伊德把人的心理活动分为……”的起始位置。
// 时间以音频开始后计，再加上片头的 3 秒。
export const PSYCHOLOGY_STRUCTURE_START = SERIES_INTRO_DURATION + Math.round(34.39 * 30);
// 三句台词拆开后，分别从音频 40.42s、42.68s、44.94s 开始。
export const ID_IMPULSE_START = 37 * 30;
export const SELF_REALITY_START = SERIES_INTRO_DURATION + Math.round(42.68 * 30);
export const SUPEREGO_VALUES_START = SERIES_INTRO_DURATION + Math.round(44.94 * 30);

// Follow the existing subtitle range, including both chunks of this sentence.
const effectiveApproachFirst = captions.findIndex((cue) => cue.text.startsWith("真正有效的做法"));
const effectiveApproachLast = captions.findIndex((cue, index) => index >= effectiveApproachFirst && cue.text.includes("行为是不对的"));
if (effectiveApproachFirst < 0 || effectiveApproachLast < effectiveApproachFirst) {
  throw new Error("未找到温和而坚定段落的完整字幕范围");
}
export const EFFECTIVE_APPROACH_START = SERIES_INTRO_DURATION + Math.round(captions[effectiveApproachFirst].start * 30);
export const EFFECTIVE_APPROACH_DURATION = SERIES_INTRO_DURATION + Math.round(captions[effectiveApproachLast].end * 30) - EFFECTIVE_APPROACH_START;
const suppressedNeedCue = captions.find((cue) => cue.text.startsWith("如果管教过度严厉"));
if (!suppressedNeedCue) throw new Error("未找到合理需求被压制段落的字幕范围");
export const SUPPRESSED_NEED_START = SERIES_INTRO_DURATION + Math.round(suppressedNeedCue.start * 30);

/** 第 2 期《你的孩子的“熊”来自哪里》时间线入口。字幕由 TXT 文稿在后期手动加入。 */
export const Episode02 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "#fff",
      color: "#aa4242",
    }}
  >
    <Sequence durationInFrames={SERIES_INTRO_DURATION}>
      <SeriesIntro
        emphasisLines={[1]}
        title={["你的孩子的", "“熊”", "来自哪里"]}
      />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={5400}>
      <Audio src={staticFile("episodes/episode-02/2.mp3")} />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={KINDERGARTEN_CONTRAST_DURATION}>
      <KindergartenContrastScene />
    </Sequence>
    <Sequence from={COMMON_CAUSES_START} durationInFrames={COMMON_CAUSES_DURATION} name="常见归因 · 年龄与家庭教育">
      <CommonCausesScene />
    </Sequence>
    <Sequence from={TWINS_START} durationInFrames={TWINS_DURATION} name="双胞胎 · 不同表现"><TwinsContrastScene /></Sequence>
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
    <Sequence from={EFFECTIVE_APPROACH_START} durationInFrames={EFFECTIVE_APPROACH_DURATION} name="温和而坚定 · 复用亲子房屋镜头">
      <GoodEnoughEnvironmentScene />
    </Sequence>
    <Sequence from={SUPPRESSED_NEED_START} durationInFrames={SUPPRESSED_NEED_DURATION} name="管教过度严厉 · 合理需求被压制">
      <SuppressedNeedScene />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION + DEATH_INSTINCT_AUDIO_START} durationInFrames={DEATH_INSTINCT_DURATION} name="经典精神分析 · 死本能">
      <DeathInstinctScene />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION + MODERN_FACTORS_AUDIO_START} durationInFrames={MODERN_FACTORS_DURATION} name="现代儿童心理学 · 多因素卡片">
      <ModernFactorsScene />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION + THINKING_OBSERVATION_AUDIO_START} durationInFrames={THINKING_OBSERVATION_DURATION} name="观察行为 · 三个思考云">
      <ThinkingObservationScene />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION + CLOSING_AVATAR_AUDIO_START} durationInFrames={CLOSING_AVATAR_DURATION} name="建立自我控制 · 头像收尾">
      <ClosingAvatarScene />
    </Sequence>
    <CaptionTrack
      hiddenIntervals={[{ start: SUPEREGO_VALUES_START / 30, end: (SUPEREGO_VALUES_START + SUPEREGO_VALUES_DURATION) / 30 }]}
      captions={displayCaptions.map((cue) => ({
        ...cue,
        start: cue.start + SERIES_INTRO_DURATION / 30,
        end: cue.end + SERIES_INTRO_DURATION / 30,
      }))}
   
    />
    <ProgressBar />
  </AbsoluteFill>
);











