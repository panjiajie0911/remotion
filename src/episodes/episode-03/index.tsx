import {AbsoluteFill, Sequence, Series, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Audio, Video} from "@remotion/media";
import forbiddenVideo from "./assets/forbidden.mp4";
import deliciousVideo from "./assets/delicious.mp4";
import reverseVideo from "./assets/reverse.mp4";
import adultVideo from "./assets/adult.mp4";
import eatVideo from "./assets/eat.mp4";
import disappointVideo from "./assets/disappoint.mp4";
import fullVideo from "./assets/full.mp4";
import anxiousVideo from "./assets/anxious.mp4";
import {EPISODE03_ANXIOUS_DURATION} from "./timeline";
import pickVideo from "./assets/pick.mp4";
import finalVideo from "./assets/final.mp4";
import backgroundMusic from "./assets/nop.mp3";
import narration from "./assets/asset.mp3";
import {EPISODE03_TIME_SCALE} from "./timeline";
import {EPISODE03_FINAL_DURATION} from "./timeline";
import {EPISODE03_EAT_DURATION, EPISODE03_DISAPPOINT_DURATION, EPISODE03_FULL_DURATION, EPISODE03_PICK_DURATION} from "./timeline";
import {SeriesIntro} from "../../components/intro/SeriesIntro";
import {EPISODE03_INTRO_DURATION} from "./timeline";
import {theme} from "../../lib/theme";
import {EPISODE03_OPENING_DURATION, EPISODE03_DELICIOUS_DURATION as DELICIOUS_DURATION, EPISODE03_REVERSE_DURATION as REVERSE_DURATION, EPISODE03_ADULT_DURATION} from "./timeline";
export {EPISODE03_FPS, EPISODE03_DURATION} from "./timeline";

export const EPISODE03_ID = "Episode03EatingHabits";
export const EPISODE03_BACKGROUND = "#FFFFF0"; // Ivory white, this episode's main color.

// Whole captions fade in over six frames, including when seeking.
const BottomCaption = ({from, text, secondLine, timeScale = EPISODE03_TIME_SCALE}: {from: number; text: string; secondLine?: string; timeScale?: number}) => {
  const frame = useCurrentFrame() / timeScale;
  return (
    <div style={{
      position: "absolute", left: 80, right: 80, bottom: 160,
      color: "#FFF9F0", fontFamily: '"Noto Sans SC", "Microsoft YaHei", sans-serif',
      fontSize: 44, fontWeight: 500, lineHeight: 1.5, letterSpacing: 2, textAlign: "center",
      WebkitTextStroke: "1px rgba(25, 22, 20, 0.85)", paintOrder: "stroke fill",
      textShadow: "0 3px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.65)", pointerEvents: "none",
      opacity: interpolate(frame - from, [0, 6], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
    }}>
      <div>{text}</div>
      {secondLine && <div>{secondLine}</div>}
    </div>
  );
};

const OpeningCaption = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  const secondStartsAt = 76;
  const text = frame < secondStartsAt
    ? "几乎所有不健全家庭长大的孩子"
    : "都存在进食障碍";
  const localFrame = frame < secondStartsAt ? frame : frame - secondStartsAt;
  return (
    <BottomCaption from={frame - localFrame} text={text} />
  );
};

const DeliciousScene = () => {
  const timeScale = DELICIOUS_DURATION / 134;
  const frame = useCurrentFrame() / timeScale;
  const captions = [
    {from: 0, text: "习惯把最喜欢的食物"},
    {from: 44, text: "留到最后吃的人"},
    {from: 82, text: "潜意识中存在“不配得感”"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / timeScale} src={deliciousVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const ConditionalLoveScene = () => {
  const timeScale = REVERSE_DURATION / 303;
  const frame = useCurrentFrame() / timeScale;
  const captions = [
    {from: 0, text: "这样的人，从小生活在"},
    {from: 72, text: "“有条件的爱”的家庭里"},
    {from: 153, text: "只有表现得好"},
    {from: 216, text: "才能获得奖励和鼓励"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / timeScale} src={reverseVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const AdultScene = () => {
  const timeScale = EPISODE03_ADULT_DURATION / 304;
  const frame = useCurrentFrame() / timeScale;
  // Draft caption timing; adjust against the final narration recording.
  const captions = [
    {from: 0, text: "潜意识中存在深深的"},
    {from: 65, text: "对安全感的失控的恐惧"},
    {from: 146, text: "因此成年后形成了"},
    {from: 217, text: "隐忍，自律的性格"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / timeScale} src={adultVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const EatFastScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  // Draft timing, pending alignment with the final voiceover.
  const captions = [
    {from: 0, text: "吃饭吃得很快"},
    {from: 38, text: "习惯狼吞虎咽的人"},
    {from: 87, text: "对外界充满了不信任感"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={eatVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} />
    </AbsoluteFill>
  );
};

const DisappointScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  // Draft timing, pending alignment with the final voiceover.
  const captions = [
    {from: 0, text: "这种人一般生长在"},
    {from: 40, text: "匮乏的家庭里"},
    {from: 74, text: "这里的匮乏"},
    {from: 106, text: "指的是精神匮乏"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={disappointVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} />
    </AbsoluteFill>
  );
};

const FullScene = () => {
  const timeScale = EPISODE03_FULL_DURATION / 123;
  const frame = useCurrentFrame() / timeScale;
  // Short source clip: provisional captions until the narration is available.
  const captions = [
    {from: 0, text: "食物的饱腹感为人提供了", next: "最早的精神慰藉"},
    {from: 45, text: "当精神缺乏爱和关注时", next: "孩子就会把注意力"},
    {from: 89, text: "集中在身体的生长上", next: ""},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / timeScale} src={fullVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} secondLine={caption.next} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const AnxiousScene = () => {
  const frame = useCurrentFrame();
  const captions = [
    {from: 0, text: "而食物焦虑的人"},
    {from: 33, text: "更容易食物上瘾"},
    {from: 66, text: "因为糖和脂肪"},
    {from: 99, text: "能带来更多的愉悦感"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted src={anxiousVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} timeScale={1} />
    </AbsoluteFill>
  );
};

const PickyScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  const captions = [
    {from: 0, text: "吃饭挑剔的人"},
    {from: 37, text: "往往在孩童时期"},
    {from: 75, text: "也是被父母挑剔的人"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={pickVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} />
    </AbsoluteFill>
  );
};

const FoodControlScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  // Provisional timing until the final narration is aligned.
  const captions = [
    {from: 0, text: "他们通过挑剔食物的色香味"},
    {from: 116, text: "来满足控制欲"},
    {from: 193, text: "消除内心的不确定性"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={finalVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <BottomCaption from={caption.from} text={caption.text} />
    </AbsoluteFill>
  );
};

/** Play the intro and videos consecutively without chapter placeholders. */
export const Episode03 = () => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: EPISODE03_BACKGROUND, color: theme.colors.text, fontFamily: theme.fonts.sans}}>
    <Series>
      <Series.Sequence durationInFrames={EPISODE03_INTRO_DURATION} name="统一片头">
        <SeriesIntro title={["你的吃饭习惯", "暴露了你的心理"]} emphasisLines={[1]} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_OPENING_DURATION} name="家庭与进食">
        <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={forbiddenVideo} objectFit="contain" style={{width: "100%", height: "100%"}} /><OpeningCaption />
      </Series.Sequence>
      <Series.Sequence durationInFrames={DELICIOUS_DURATION} name="喜欢的食物留到最后">
        <DeliciousScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={REVERSE_DURATION} name="有条件的爱">
        <ConditionalLoveScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_ADULT_DURATION} name="成年后的隐忍与自律">
        <AdultScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_EAT_DURATION} name="狼吞虎咽">
        <EatFastScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_DISAPPOINT_DURATION} name="精神匮乏">
        <DisappointScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_FULL_DURATION} name="饱腹与精神慰藉">
        <FullScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_ANXIOUS_DURATION} name="食物焦虑与愉悦感">
        <AnxiousScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_PICK_DURATION} name="挑食与被挑剔">
        <PickyScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={EPISODE03_FINAL_DURATION} name="挑剔食物与控制感">
        <FoodControlScene />
      </Series.Sequence>
    </Series>
      <Sequence name="口播" layout="none">
        <Audio src={narration} volume={1} />
      </Sequence>
      <Audio
        src={backgroundMusic}
        volume={(frame) => interpolate(frame, [0, 24, durationInFrames - 45, durationInFrames], [0, 0.12, 0.12, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}
      />
    </AbsoluteFill>
  );
};

export default Episode03;
