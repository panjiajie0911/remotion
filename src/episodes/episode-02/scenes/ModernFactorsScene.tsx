import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const first = captions.find((cue) => cue.text.startsWith("不过，这只是"));
const last = captions.find((cue) => cue.text.includes("综合理解孩子的攻击或破坏行为"));
if (!first || !last) throw new Error("未找到现代儿童心理学段落字幕");
export const MODERN_FACTORS_AUDIO_START = Math.round(first.start * 30);
export const MODERN_FACTORS_DURATION = Math.round(last.end * 30) - MODERN_FACTORS_AUDIO_START;
// Existing captions are character-based estimates, not word-aligned audio timings.
const wordFrame = (word: string) => {
  const cue = captions.find((item) => item.text.includes(word));
  if (!cue) throw new Error(`未找到关键词：${word}`);
  return Math.round((cue.start + (cue.end - cue.start) * cue.text.indexOf(word) / cue.text.length) * 30) - MODERN_FACTORS_AUDIO_START;
};
const factors = [
  {title: "冲动控制", x: 280, y: 530, fill: "#527DCE", ink: "#fff"},
  {title: "情绪调节", x: 800, y: 530, fill: "#527DCE", ink: "#fff"},
  {title: "先天气质", x: 265, y: 1130, fill: "#527DCE", ink: "#fff"},
  {title: "压力", x: 815, y: 1130, fill: "#527DCE", ink: "#fff"},
  {title: "环境模仿", x: 540, y: 1410, fill: "#527DCE", ink: "#fff"},
].map((item) => ({...item, start: wordFrame(item.title)}));
const headingStart = wordFrame("现代儿童心理学");
const summaryStart = wordFrame("综合理解");
const easing = {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic)} as const;

export const ModernFactorsScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", color: "#252A33", fontFamily: theme.fonts.sans, overflow: "hidden"}}>
    <div style={{position: "absolute", top: 650, left: 80, right: 80, textAlign: "center", opacity: interpolate(frame, [0, 15, headingStart - 18, headingStart], [0, 1, 1, 0], easing)}}>
      <div style={{fontSize: 72, fontWeight: 800, color: "#527DCE"}}>一个理论概念</div>
      <div style={{width: 160, height: 5, margin: "38px auto", backgroundColor: "#C3A66B"}} />
      <div style={{fontSize: 44, lineHeight: 1.7}}>并不是已经被证实的<br />单一原因</div>
    </div>
    <div style={{position: "absolute", top: 210, width: "100%", textAlign: "center", opacity: interpolate(frame, [headingStart, headingStart + 18], [0, 1], easing)}}>
      <div style={{fontSize: 62, fontWeight: 800, color: "#527DCE"}}>现代儿童心理学</div>
      <div style={{fontSize: 32, color: "#788394", marginTop: 24}}>从多个方面理解行为</div>
    </div>
    <svg width={1080} height={1920} style={{position: "absolute", inset: 0, opacity: interpolate(frame, [summaryStart + 12, summaryStart + 30], [0, 1], easing)}}>
      {factors.map((item) => <line key={item.title} x1={540} y1={850} x2={item.x} y2={item.y} stroke="#DDD8CF" strokeWidth={3} />)}
    </svg>
    {factors.map((item, index) => {
      const leave = (factors[index + 1]?.start ?? summaryStart) + 6;
      return <div key={item.title} style={{position: "absolute", left: 240, top: 700, width: 600, height: 300, borderRadius: 32, backgroundColor: item.fill, color: item.ink, boxShadow: "0 12px 0 #252A3312, 0 24px 42px #252A3314", border: "2px solid #F7F4EE80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 76, fontWeight: 800, letterSpacing: 3,
        opacity: interpolate(frame, [item.start, item.start + 12], [0, 1], easing),
        scale: interpolate(frame, [item.start, item.start + 16, leave, leave + 22], [0.9, 1, 1, 0.55], easing),
        translate: `${interpolate(frame, [leave, leave + 22], [0, item.x - 540], easing)}px ${interpolate(frame, [item.start, item.start + 16, leave, leave + 22], [45, 0, 0, item.y - 850], easing)}px`,
      }}>{item.title}</div>;
    })}
    <div style={{position: "absolute", top: 765, left: 290, width: 500, textAlign: "center", opacity: interpolate(frame, [summaryStart + 22, summaryStart + 42], [0, 1], easing)}}>
      <div style={{fontSize: 64, fontWeight: 800, color: "#527DCE"}}>综合理解</div>
      <div style={{fontSize: 36, marginTop: 22, lineHeight: 1.6}}>孩子的攻击<br />或破坏行为</div>
    </div>
  </AbsoluteFill>;
};
