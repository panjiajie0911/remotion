import type {CSSProperties} from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import forbiddenVideo from "./assets/forbidden.mp4";
import deliciousVideo from "./assets/delicious.mp4";
import reverseVideo from "./assets/reverse.mp4";
import adultVideo from "./assets/adult.mp4";
import eatVideo from "./assets/eat.mp4";
import disappointVideo from "./assets/disappoint.mp4";
import fullVideo from "./assets/full.mp4";
import anxiousVideo from "./assets/anxious.mp4";
import pickVideo from "./assets/pick.mp4";
import finalVideo from "./assets/final.mp4";
import backgroundMusic from "./assets/nop.mp3";
import narration from "./assets/asset-normalized.mp3";
import {SeriesIntro} from "../../components/intro/SeriesIntro";
import {ClosingCard, createEpisodeCover, EpisodeShell, FootageScene} from "../../design-system";
import {theme} from "../../lib/theme";
import {EPISODE03_META} from "./meta";
import {
  ADULT_CUES,
  ANXIOUS_CUES,
  CONDITIONAL_CUES,
  CONTROL_CUES,
  DELICIOUS_CUES,
  DISAPPOINT_CUES,
  EAT_FAST_CUES,
  FULL_CUES,
  OPENING_CUES,
  PICKY_CUES,
} from "./script/cues";
import {
  EPISODE03_ADULT_DURATION,
  EPISODE03_ANXIOUS_DURATION,
  EPISODE03_CLOSING_START,
  EPISODE03_DELICIOUS_DURATION as DELICIOUS_DURATION,
  EPISODE03_DISAPPOINT_DURATION,
  EPISODE03_EAT_DURATION,
  EPISODE03_FINAL_DURATION,
  EPISODE03_FPS,
  EPISODE03_FULL_DURATION,
  EPISODE03_INTRO_DURATION,
  EPISODE03_OPENING_DURATION,
  EPISODE03_PICK_DURATION,
  EPISODE03_REVERSE_DURATION as REVERSE_DURATION,
  EPISODE03_TIME_SCALE,
} from "./timeline";

export {EPISODE03_FPS, EPISODE03_DURATION} from "./timeline";

export const EPISODE03_ID = EPISODE03_META.id;
export const EPISODE03_BACKGROUND = theme.palette.night;
export const Episode03Cover = createEpisodeCover(EPISODE03_META);

const DISSOLVE_FRAMES = 8;
// Prepare hidden videos before cuts to avoid pausing the shared audio clock.
const VIDEO_PREMOUNT_FRAMES = 2 * EPISODE03_FPS;
// Include the incoming pre-roll in playback length, preserving all narration boundaries.
const ADULT_PLAYBACK_RATE = 10.100680 * EPISODE03_FPS / (EPISODE03_ADULT_DURATION + DISSOLVE_FRAMES);
const FULL_PLAYBACK_RATE = 11.041667 * EPISODE03_FPS / (EPISODE03_FULL_DURATION + DISSOLVE_FRAMES);
// The anxious clip is only 5.06s; slow it to fill the 8s narration slot instead of freezing.
const ANXIOUS_PLAYBACK_RATE = 5.061995 * EPISODE03_FPS / EPISODE03_ANXIOUS_DURATION;

const VIDEO_STYLE: CSSProperties = {height: "100%", width: "100%"};

const DissolvePicture = ({src, playbackRate}: {src: string; playbackRate: number}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{
      backgroundColor: theme.palette.night,
      opacity: interpolate(frame, [0, DISSOLVE_FRAMES], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
    }}>
      <Video muted src={src} playbackRate={playbackRate} objectFit="contain" style={VIDEO_STYLE} />
    </AbsoluteFill>
  );
};

const OpeningScene = () => (
  <FootageScene
    src={forbiddenVideo}
    cues={OPENING_CUES}
    timeScale={EPISODE03_TIME_SCALE}
    playbackRate={1 / EPISODE03_TIME_SCALE}
  />
);

const DeliciousScene = () => (
  <FootageScene
    src={deliciousVideo}
    cues={DELICIOUS_CUES}
    timeScale={DELICIOUS_DURATION / 134}
    chapter={{index: "01", label: "留到最后", detail: "把最喜欢的食物留到最后"}}
  />
);

const ConditionalLoveScene = () => (
  <FootageScene
    src={reverseVideo}
    cues={CONDITIONAL_CUES}
    timeScale={REVERSE_DURATION / 303}
    playbackRate={303 / REVERSE_DURATION}
    underlay={
      <Sequence
        from={REVERSE_DURATION - DISSOLVE_FRAMES}
        durationInFrames={DISSOLVE_FRAMES}
        premountFor={VIDEO_PREMOUNT_FRAMES}
        name="童年到成年：短叠化"
      >
        <DissolvePicture src={adultVideo} playbackRate={ADULT_PLAYBACK_RATE} />
      </Sequence>
    }
  />
);

const AdultScene = () => (
  <FootageScene
    src={adultVideo}
    cues={ADULT_CUES}
    timeScale={EPISODE03_ADULT_DURATION / 304}
    playbackRate={ADULT_PLAYBACK_RATE}
    videoOffset={-DISSOLVE_FRAMES}
  />
);

const EatFastScene = () => (
  <FootageScene
    src={eatVideo}
    cues={EAT_FAST_CUES}
    timeScale={EPISODE03_TIME_SCALE}
    chapter={{index: "02", label: "狼吞虎咽", detail: "吃饭很快，不信任外界"}}
  />
);

const DisappointScene = () => (
  <FootageScene
    src={disappointVideo}
    cues={DISAPPOINT_CUES}
    timeScale={EPISODE03_TIME_SCALE}
    playbackRate={1 / EPISODE03_TIME_SCALE}
    underlay={
      <Sequence
        from={EPISODE03_DISAPPOINT_DURATION - DISSOLVE_FRAMES}
        durationInFrames={DISSOLVE_FRAMES}
        premountFor={VIDEO_PREMOUNT_FRAMES}
        name="精神匮乏到慰藉：短叠化"
      >
        <DissolvePicture src={fullVideo} playbackRate={FULL_PLAYBACK_RATE} />
      </Sequence>
    }
  />
);

const FullScene = () => (
  <FootageScene
    src={fullVideo}
    cues={FULL_CUES}
    timeScale={EPISODE03_FULL_DURATION / 123}
    playbackRate={FULL_PLAYBACK_RATE}
    videoOffset={-DISSOLVE_FRAMES}
  />
);

const AnxiousScene = () => (
  <FootageScene
    src={anxiousVideo}
    cues={ANXIOUS_CUES}
    timeScale={EPISODE03_ANXIOUS_DURATION / 150}
    playbackRate={ANXIOUS_PLAYBACK_RATE}
  />
);

const PickyScene = () => (
  <FootageScene
    src={pickVideo}
    cues={PICKY_CUES}
    timeScale={EPISODE03_TIME_SCALE}
    playbackRate={1 / EPISODE03_TIME_SCALE}
    chapter={{index: "03", label: "挑剔", detail: "被挑剔的人，学会挑剔"}}
  />
);

const FoodControlScene = () => (
  <FootageScene
    src={finalVideo}
    cues={CONTROL_CUES}
    timeScale={EPISODE03_TIME_SCALE}
    playbackRate={1 / EPISODE03_TIME_SCALE}
  >
    <ClosingCard
      start={EPISODE03_CLOSING_START}
      end={EPISODE03_FINAL_DURATION}
      kicker={EPISODE03_META.closing?.kicker ?? ""}
      lines={EPISODE03_META.closing?.lines ?? []}
      footer={`${EPISODE03_META.numberLabel} · ${EPISODE03_META.seriesLabel}`}
    />
  </FootageScene>
);

/** Play the intro and videos consecutively without chapter placeholders. */
export const Episode03 = () => (
  <EpisodeShell
    intro={{
      name: "统一片头",
      durationInFrames: EPISODE03_INTRO_DURATION,
      node: (
        <SeriesIntro
          eyebrow={`${EPISODE03_META.numberLabel} · ${EPISODE03_META.seriesLabel}`}
          title={EPISODE03_META.title}
          emphasisWords={EPISODE03_META.emphasisWords}
          hook={EPISODE03_META.hook}
          avatarSize={EPISODE03_META.avatarSize ?? theme.layout.avatar}
        />
      ),
    }}
    scenes={[
      {name: "家庭与进食", durationInFrames: EPISODE03_OPENING_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <OpeningScene />},
      {name: "喜欢的食物留到最后", durationInFrames: DELICIOUS_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <DeliciousScene />},
      {name: "有条件的爱", durationInFrames: REVERSE_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <ConditionalLoveScene />},
      {name: "成年后的隐忍与自律", durationInFrames: EPISODE03_ADULT_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <AdultScene />},
      {name: "狼吞虎咽", durationInFrames: EPISODE03_EAT_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <EatFastScene />},
      {name: "精神匮乏", durationInFrames: EPISODE03_DISAPPOINT_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <DisappointScene />},
      {name: "饱腹与精神慰藉", durationInFrames: EPISODE03_FULL_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <FullScene />},
      {name: "食物焦虑与愉悦感", durationInFrames: EPISODE03_ANXIOUS_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <AnxiousScene />},
      {name: "挑食与被挑剔", durationInFrames: EPISODE03_PICK_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <PickyScene />},
      {name: "挑剔食物与控制感", durationInFrames: EPISODE03_FINAL_DURATION, premountFor: VIDEO_PREMOUNT_FRAMES, node: <FoodControlScene />},
    ]}
    narration={narration}
    music={backgroundMusic}
  />
);

export default Episode03;
