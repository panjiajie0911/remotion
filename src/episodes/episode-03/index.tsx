import type {CSSProperties} from "react";
import {AbsoluteFill, Easing, Sequence, Series, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
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
import {EPISODE03_FINAL_DURATION, EPISODE03_CLOSING_START} from "./timeline";
import {EPISODE03_EAT_DURATION, EPISODE03_DISAPPOINT_DURATION, EPISODE03_FULL_DURATION, EPISODE03_PICK_DURATION} from "./timeline";
import {SeriesIntro} from "../../components/intro/SeriesIntro";
import {EPISODE03_INTRO_DURATION} from "./timeline";
import {EPISODE03_FPS} from "./timeline";
import {theme} from "../../lib/theme";
import {CaptionScrim, Rule, VideoCaption} from "../../design-system";
import {EPISODE03_OPENING_DURATION, EPISODE03_DELICIOUS_DURATION as DELICIOUS_DURATION, EPISODE03_REVERSE_DURATION as REVERSE_DURATION, EPISODE03_ADULT_DURATION} from "./timeline";
export {EPISODE03_FPS, EPISODE03_DURATION} from "./timeline";
export {Episode03Cover} from "./Cover";

export const EPISODE03_ID = "Episode03EatingHabits";
export const EPISODE03_BACKGROUND = theme.palette.night;

type Cue = {from: number; text: string; emphasis?: string; next?: string; until?: number};

const DISSOLVE_FRAMES = 8;
// Prepare hidden videos before cuts to avoid pausing the shared audio clock.
const VIDEO_PREMOUNT_FRAMES = 2 * EPISODE03_FPS;
// Include the incoming pre-roll in playback length, preserving all narration boundaries.
const ADULT_PLAYBACK_RATE = 10.100680 * EPISODE03_FPS / (EPISODE03_ADULT_DURATION + DISSOLVE_FRAMES);
const FULL_PLAYBACK_RATE = 11.041667 * EPISODE03_FPS / (EPISODE03_FULL_DURATION + DISSOLVE_FRAMES);

// Footage sits on the night ground so letterboxing reads as a deliberate frame.
const SCENE_STYLE: CSSProperties = {backgroundColor: theme.palette.night};
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

const ChapterMarker = ({index, label, detail}: {index: string; label: string; detail: string}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(...theme.motion.easing);
  const enter = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const exit = interpolate(frame, [62, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * exit;
  if (opacity <= 0) return null;

  return (
    <div style={{
      background: "linear-gradient(180deg, rgba(10,12,16,0.62) 0%, rgba(10,12,16,0.26) 58%, rgba(10,12,16,0) 100%)",
      left: 0,
      opacity,
      padding: `${theme.layout.marginTop}px ${theme.layout.marginX}px ${theme.spacing.section}px`,
      pointerEvents: "none",
      position: "absolute",
      right: 0,
      top: 0,
    }}>
      <div style={{
        alignItems: "flex-start",
        display: "flex",
        gap: theme.spacing.lg,
        translate: `0 ${theme.motion.rise * (1 - enter)}px`,
      }}>
        <div style={{
          color: theme.palette.mark,
          fontSize: theme.typography.size.display,
          fontWeight: theme.typography.weight.light,
          letterSpacing: theme.typography.tracking.display,
          lineHeight: 1,
        }}>
          {index}
        </div>
        <div style={{paddingTop: theme.spacing.sm}}>
          <div style={{
            backgroundColor: theme.palette.mark,
            height: theme.borderWidth.normal,
            marginBottom: theme.spacing.md,
            width: theme.layout.ruleWidth,
          }} />
          <div style={{
            color: theme.palette.surface,
            fontSize: theme.typography.size.heading,
            fontWeight: theme.typography.weight.semibold,
            letterSpacing: theme.typography.tracking.heading,
            lineHeight: theme.typography.lineHeight.tight,
          }}>
            {label}
          </div>
          <div style={{
            color: theme.palette.surface,
            fontSize: theme.typography.size.label,
            fontWeight: theme.typography.weight.regular,
            letterSpacing: theme.typography.tracking.meta,
            marginTop: theme.spacing.sm,
            opacity: 0.72,
          }}>
            {detail}
          </div>
        </div>
      </div>
    </div>
  );
};

const OpeningScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  const captions: Cue[] = [
    {from: 0, text: "几乎所有不健全家庭长大的孩子"},
    {from: 76, text: "都存在进食障碍", emphasis: "进食障碍"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={forbiddenVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={EPISODE03_TIME_SCALE} />
    </AbsoluteFill>
  );
};

const DeliciousScene = () => {
  const timeScale = DELICIOUS_DURATION / 134;
  const frame = useCurrentFrame() / timeScale;
  const captions: Cue[] = [
    {from: 0, text: "习惯把最喜欢的食物"},
    {from: 44, text: "留到最后吃的人"},
    {from: 82, text: "潜意识中存在“不配得感”", emphasis: "不配得感"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted src={deliciousVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <ChapterMarker index="01" label="留到最后" detail="把最喜欢的食物留到最后" />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const ConditionalLoveScene = () => {
  const timeScale = REVERSE_DURATION / 303;
  const frame = useCurrentFrame() / timeScale;
  const captions: Cue[] = [
    {from: 0, text: "这样的人，从小生活在"},
    {from: 72, text: "“有条件的爱”的家庭里", emphasis: "有条件的爱"},
    {from: 153, text: "只有表现得好"},
    {from: 216, text: "才能获得奖励和鼓励"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted playbackRate={1 / timeScale} src={reverseVideo} objectFit="contain" style={VIDEO_STYLE} />
      <Sequence from={REVERSE_DURATION - DISSOLVE_FRAMES} durationInFrames={DISSOLVE_FRAMES} premountFor={VIDEO_PREMOUNT_FRAMES} name="童年到成年：短叠化">
        <DissolvePicture src={adultVideo} playbackRate={ADULT_PLAYBACK_RATE} />
      </Sequence>
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const AdultScene = () => {
  const timeScale = EPISODE03_ADULT_DURATION / 304;
  const frame = useCurrentFrame() / timeScale;
  // Draft caption timing; adjust against the final narration recording.
  const captions: Cue[] = [
    {from: 0, text: "潜意识中存在深深的"},
    {from: 65, text: "对安全感的失控的恐惧", emphasis: "失控"},
    {from: 146, text: "因此成年后形成了"},
    {from: 217, text: "隐忍，自律的性格", emphasis: "隐忍"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Sequence from={-DISSOLVE_FRAMES} layout="none">
        <Video muted playbackRate={ADULT_PLAYBACK_RATE} src={adultVideo} objectFit="contain" style={VIDEO_STYLE} />
      </Sequence>
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const EatFastScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  // Draft timing, pending alignment with the final voiceover.
  const captions: Cue[] = [
    {from: 0, text: "吃饭吃得很快"},
    {from: 38, text: "习惯狼吞虎咽的人"},
    {from: 87, text: "对外界充满了不信任感", emphasis: "不信任感"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted src={eatVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <ChapterMarker index="02" label="狼吞虎咽" detail="吃饭很快，不信任外界" />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={EPISODE03_TIME_SCALE} />
    </AbsoluteFill>
  );
};

const DisappointScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  // Draft timing, pending alignment with the final voiceover.
  const captions: Cue[] = [
    {from: 0, text: "这种人一般生长在"},
    {from: 40, text: "匮乏的家庭里"},
    {from: 74, text: "这里的匮乏"},
    {from: 106, text: "指的是精神匮乏", emphasis: "精神匮乏"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={disappointVideo} objectFit="contain" style={VIDEO_STYLE} />
      <Sequence from={EPISODE03_DISAPPOINT_DURATION - DISSOLVE_FRAMES} durationInFrames={DISSOLVE_FRAMES} premountFor={VIDEO_PREMOUNT_FRAMES} name="精神匮乏到慰藉：短叠化">
        <DissolvePicture src={fullVideo} playbackRate={FULL_PLAYBACK_RATE} />
      </Sequence>
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={EPISODE03_TIME_SCALE} />
    </AbsoluteFill>
  );
};

const FullScene = () => {
  const timeScale = EPISODE03_FULL_DURATION / 123;
  const frame = useCurrentFrame() / timeScale;
  // Caption timing stays independent of the regenerated video's duration.
  const captions: Cue[] = [
    {from: 0, text: "食物的饱腹感为人提供了", next: "最早的精神慰藉", emphasis: "精神慰藉"},
    {from: 45, text: "当精神缺乏爱和关注时", next: "孩子就会把注意力"},
    {from: 89, text: "集中在身体的生长上", next: "", emphasis: "身体的生长"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Sequence from={-DISSOLVE_FRAMES} layout="none">
        <Video muted playbackRate={FULL_PLAYBACK_RATE} src={fullVideo} objectFit="contain" style={VIDEO_STYLE} />
      </Sequence>
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} secondLine={caption.next} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const AnxiousScene = () => {
  const timeScale = EPISODE03_ANXIOUS_DURATION / 150;
  const frame = useCurrentFrame() / timeScale;
  const captions: Cue[] = [
    {from: 0, text: "而食物焦虑的人"},
    {from: 33, text: "更容易食物上瘾", emphasis: "食物上瘾"},
    {from: 66, text: "因为糖和脂肪"},
    {from: 99, text: "能带来更多的愉悦感", emphasis: "愉悦感"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted src={anxiousVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={timeScale} />
    </AbsoluteFill>
  );
};

const PickyScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  const captions: Cue[] = [
    {from: 0, text: "吃饭挑剔的人"},
    {from: 37, text: "往往在孩童时期"},
    {from: 75, text: "也是被父母挑剔的人", emphasis: "被父母挑剔"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={pickVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <ChapterMarker index="03" label="挑剔" detail="被挑剔的人，学会挑剔" />
      <VideoCaption from={caption.from} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={EPISODE03_TIME_SCALE} />
    </AbsoluteFill>
  );
};

const ClosingCard = ({start, end}: {start: number; end: number}) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const total = end - start;
  const fadeStart = total - 18;
  const ease = Easing.bezier(...theme.motion.easing);
  const reveal = (from: number, duration = 12) =>
    interpolate(local - from, [0, duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
  const veil = interpolate(local, [0, 18, fadeStart, total], [0, 0.78, 0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentOut = interpolate(local, [fadeStart, total - 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(local, [0, total], [1, 1.015], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <AbsoluteFill style={{backgroundColor: theme.palette.night, opacity: veil}} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        inset: 0,
        justifyContent: "center",
        opacity: contentOut,
        padding: `0 ${theme.layout.marginX}px`,
        position: "absolute",
      }}>
        <div style={{scale: drift, transformOrigin: "left center"}}>
          <div style={{
            color: theme.palette.inkFaint,
            fontSize: theme.typography.size.meta,
            fontWeight: theme.typography.weight.medium,
            letterSpacing: theme.typography.tracking.eyebrow,
            lineHeight: 1,
            opacity: reveal(15),
          }}>
            一个习惯，不能定义你
          </div>
          <div style={{
            marginBottom: theme.spacing.xl,
            marginTop: theme.spacing.xl,
            opacity: reveal(24),
            scale: `${reveal(24)} 1`,
            transformOrigin: "left center",
            width: theme.layout.ruleWidth,
          }}>
            <Rule />
          </div>
          <div style={{
            color: theme.palette.surface,
            fontSize: theme.typography.size.display,
            fontWeight: theme.typography.weight.semibold,
            letterSpacing: theme.typography.tracking.display,
            lineHeight: theme.typography.lineHeight.tight,
          }}>
            <div style={{opacity: reveal(33), translate: `0 ${theme.motion.rise * (1 - reveal(33))}px`}}>事已至此</div>
            <div style={{opacity: reveal(40), translate: `0 ${theme.motion.rise * (1 - reveal(40))}px`}}>先吃饭吧。</div>
          </div>
        </div>
      </div>
      <div style={{
        bottom: theme.layout.safeBottom,
        color: theme.palette.inkFaint,
        fontSize: theme.typography.size.micro,
        left: theme.layout.marginX,
        letterSpacing: theme.typography.tracking.meta,
        opacity: reveal(60) * contentOut,
        position: "absolute",
      }}>
        第 03 期 · 心理观察
      </div>
    </AbsoluteFill>
  );
};

const FoodControlScene = () => {
  const frame = useCurrentFrame() / EPISODE03_TIME_SCALE;
  const captions: Cue[] = [
    {from: 0, text: "他们通过挑剔食物的色香味"},
    {from: 70, text: "来满足控制欲", emphasis: "控制欲"},
    {from: 110, text: "消除内心的不确定性", until: 158},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  return (
    <AbsoluteFill style={SCENE_STYLE}>
      <Video muted playbackRate={1 / EPISODE03_TIME_SCALE} src={finalVideo} objectFit="contain" style={VIDEO_STYLE} />
      <CaptionScrim />
      <VideoCaption from={caption.from} until={caption.until} emphasisWords={caption.emphasis ? [caption.emphasis] : undefined} text={caption.text} timeScale={EPISODE03_TIME_SCALE} />
      <ClosingCard start={EPISODE03_CLOSING_START} end={EPISODE03_FINAL_DURATION} />
    </AbsoluteFill>
  );
};

/** Play the intro and videos consecutively without chapter placeholders. */
export const Episode03 = () => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: EPISODE03_BACKGROUND, color: theme.palette.ink, fontFamily: theme.fonts.sans}}>
    <Series>
      <Series.Sequence durationInFrames={EPISODE03_INTRO_DURATION} name="统一片头">
        <SeriesIntro
          eyebrow="第 03 期 · 心理观察"
          title={["你的吃饭习惯", "暴露了你的心理"]}
          emphasisWords={["吃饭习惯"]}
          hook="你知道吗？"
          avatarSize={theme.layout.avatarLarge}
        />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_OPENING_DURATION} name="家庭与进食">
        <OpeningScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={DELICIOUS_DURATION} name="喜欢的食物留到最后">
        <DeliciousScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={REVERSE_DURATION} name="有条件的爱">
        <ConditionalLoveScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_ADULT_DURATION} name="成年后的隐忍与自律">
        <AdultScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_EAT_DURATION} name="狼吞虎咽">
        <EatFastScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_DISAPPOINT_DURATION} name="精神匮乏">
        <DisappointScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_FULL_DURATION} name="饱腹与精神慰藉">
        <FullScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_ANXIOUS_DURATION} name="食物焦虑与愉悦感">
        <AnxiousScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_PICK_DURATION} name="挑食与被挑剔">
        <PickyScene />
      </Series.Sequence>
      <Series.Sequence premountFor={VIDEO_PREMOUNT_FRAMES} durationInFrames={EPISODE03_FINAL_DURATION} name="挑剔食物与控制感">
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
