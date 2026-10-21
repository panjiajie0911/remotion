import {AbsoluteFill, Sequence} from "remotion";
import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
import {theme} from "../../lib/theme";
import {episode03Timeline} from "./timeline";
export {EPISODE03_FPS, EPISODE03_DURATION} from "./timeline";

export const EPISODE03_ID = "Episode03EatingHabits";
export const EPISODE03_BACKGROUND = "#FFFFF0"; // Ivory white, this episode's main color.

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
    {episode03Timeline.map((chapter) => (
      <Sequence key={chapter.id} from={chapter.from} durationInFrames={chapter.durationInFrames} name={`${chapter.label} · ${chapter.title.replace("\n", "")}`}>
        <AbsoluteFill style={{padding: "150px 90px 220px"}}>
          <div style={{fontSize: 30, color: theme.colors.primary, marginBottom: 40}}>{chapter.label}</div>
          <div style={{fontSize: 78, fontWeight: 700, lineHeight: 1.35, whiteSpace: "pre-line"}}>{chapter.title}</div>
          <div style={{height: 560, marginTop: 70, padding: 50, border: "2px dashed #CFC5AC", borderRadius: 32, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30, textAlign: "center", color: theme.colors.muted}}>
            <div style={{fontSize: 32}}>插画动画 · 占位</div>
            <div style={{fontSize: 36, lineHeight: 1.5}}>{chapter.visual}</div>
          </div>
          <div style={{marginTop: 55, fontSize: 36, lineHeight: 1.7}}>{chapter.beats.map((beat) => <div key={beat}>{beat}</div>)}</div>
          <div style={{position: "absolute", bottom: 150, fontSize: 26, color: theme.colors.muted}}>口播位置 · {chapter.narration}</div>
        </AbsoluteFill>
      </Sequence>
    ))}
  </AbsoluteFill>
);

export default Episode03;
