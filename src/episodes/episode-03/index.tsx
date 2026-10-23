import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import forbiddenVideo from "./assets/forbidden.mp4";
import deliciousVideo from "./assets/delicious.mp4";
import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
import {theme} from "../../lib/theme";
import {episode03Timeline, EPISODE03_OPENING_DURATION} from "./timeline";
export {EPISODE03_FPS, EPISODE03_DURATION} from "./timeline";

export const EPISODE03_ID = "Episode03EatingHabits";
export const EPISODE03_BACKGROUND = "#FFFFF0"; // Ivory white, this episode's main color.

// Frame-based typing stays deterministic during playback, seeking and rendering.
const OpeningCaption = () => {
  const frame = useCurrentFrame();
  const secondStartsAt = 76;
  const text = frame < secondStartsAt
    ? "几乎所有不健全家庭长大的孩子"
    : "都存在进食障碍";
  const localFrame = frame < secondStartsAt ? frame : frame - secondStartsAt;
  const visibleText = text.slice(0, Math.min(text.length, Math.floor(localFrame / 3) + 1));
  return (
    <div style={{position: "absolute", left: 70, right: 70, bottom: 180, padding: "24px 28px", backgroundColor: "rgba(0, 0, 0, 0.65)", borderRadius: 8, color: "#fff", fontSize: 48, fontWeight: 600, lineHeight: 1.5, textAlign: "center", whiteSpace: "nowrap"}}>
      {visibleText}
    </div>
  );
};

const DELICIOUS_DURATION = 134; // 4.458333 seconds at the composition's 30 fps.
const DeliciousScene = () => {
  const frame = useCurrentFrame();
  const captions = [
    {from: 0, text: "习惯把最喜欢的食物"},
    {from: 44, text: "留到最后吃的人"},
    {from: 82, text: "潜意识中存在“不配得感”"},
  ];
  const caption = [...captions].reverse().find((item) => frame >= item.from)!;
  const visibleText = caption.text.slice(0, Math.floor((frame - caption.from) / 2) + 1);
  return (
    <AbsoluteFill>
      <Video src={deliciousVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <div style={{position: "absolute", left: 70, right: 70, bottom: 180, padding: "24px 28px", backgroundColor: "rgba(0, 0, 0, 0.65)", borderRadius: 8, color: "#fff", fontSize: 48, fontWeight: 600, lineHeight: 1.5, textAlign: "center", whiteSpace: "nowrap"}}>
        {visibleText}
      </div>
    </AbsoluteFill>
  );
};

/** Main episode timeline. Add narration and illustration scenes here. */
export const Episode03 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: EPISODE03_BACKGROUND,
      color: theme.colors.text,
      fontFamily: theme.fonts.sans,
      justifyContent: "center",
      padding: 100,
    }}
  >
    <Sequence durationInFrames={SERIES_INTRO_DURATION} name="统一片头">
      <SeriesIntro
        eyebrow="第 03 期 · 心理观察"
        title={["你的吃饭习惯，", "暴露了你的心理"]}
        emphasisLines={[1]}
      />
    </Sequence>
    <Sequence from={SERIES_INTRO_DURATION} durationInFrames={EPISODE03_OPENING_DURATION} name="家庭与进食">
      <Video src={forbiddenVideo} objectFit="contain" style={{width: "100%", height: "100%"}} />
      <OpeningCaption />
    </Sequence>
    {episode03Timeline.map((chapter) => (
      <Sequence key={chapter.id} from={chapter.from} durationInFrames={chapter.durationInFrames} name={chapter.title.replace("\n", "")}>
        {chapter.id === "save-best" && (
          <Sequence durationInFrames={DELICIOUS_DURATION} name="喜欢的食物留到最后 · 视频">
            <DeliciousScene />
          </Sequence>
        )}
        <Sequence from={chapter.id === "save-best" ? DELICIOUS_DURATION : 0} name="后续内容占位">
        <AbsoluteFill style={{padding: "150px 90px 220px"}}>
          <div style={{fontSize: 30, color: theme.colors.primary, marginBottom: 40}}>{chapter.title.replace("\n", "")}</div>
          <div style={{fontSize: 78, fontWeight: 700, lineHeight: 1.35, whiteSpace: "pre-line"}}>{chapter.title}</div>
          <div style={{height: 560, marginTop: 70, padding: 50, border: "2px dashed #CFC5AC", borderRadius: 32, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30, textAlign: "center", color: theme.colors.muted}}>
            <div style={{fontSize: 32}}>插画动画 · 占位</div>
            <div style={{fontSize: 36, lineHeight: 1.5}}>{chapter.visual}</div>
          </div>
          <div style={{marginTop: 55, fontSize: 36, lineHeight: 1.7}}>{chapter.beats.map((beat) => <div key={beat}>{beat}</div>)}</div>
          <div style={{position: "absolute", bottom: 150, fontSize: 26, color: theme.colors.muted}}>口播位置 · {chapter.narration}</div>
        </AbsoluteFill>
        </Sequence>
      </Sequence>
    ))}
  </AbsoluteFill>
);

export default Episode03;
