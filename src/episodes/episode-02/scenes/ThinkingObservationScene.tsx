import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import thinking from "../assets/img/thinking.png";
import thoughtCloud from "../assets/img/rough-thought-cloud.svg";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const firstIndex = captions.findIndex((cue) => cue.text.startsWith("所以，比起简单地说"));
const lastIndex = captions.findIndex((cue, index) => index >= firstIndex && cue.text.includes("试探边界"));
if (firstIndex < 0 || lastIndex < firstIndex) throw new Error("未找到观察行为段落字幕");
const cues = captions.slice(firstIndex, lastIndex + 1);
export const THINKING_OBSERVATION_AUDIO_START = Math.round(cues[0].start * 30);
export const THINKING_OBSERVATION_DURATION = Math.round(cues[cues.length - 1].end * 30) - THINKING_OBSERVATION_AUDIO_START;
// Word timings inherit the existing character-based estimates, not audio alignment.
const wordFrame = (word: string) => {
  const cue = cues.find((item) => item.text.includes(word));
  if (!cue) throw new Error(`未找到观察关键词：${word}`);
  return Math.round((cue.start + (cue.end - cue.start) * cue.text.indexOf(word) / cue.text.length) * 30) - THINKING_OBSERVATION_AUDIO_START;
};
const clouds = [
  {text: "不会表达", left: 65, top: 560},
  {text: "控制不住", left: 390, top: 440},
  {text: "试探边界", left: 715, top: 560},
].map((cloud) => ({...cloud, start: wordFrame(cloud.text)}));
const observe = wordFrame("更重要的是观察");
const when = wordFrame("这个行为");
const meaning = wordFrame("孩子想表达什么");
const ease = {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)} as const;

export const ThinkingObservationScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", fontFamily: theme.fonts.sans, color: "#252A33", overflow: "hidden"}}>
    <div style={{position: "absolute", top: 210, left: 80, right: 80, textAlign: "center", opacity: interpolate(frame, [0, 18], [0, 1], ease)}}>
      <div style={{fontSize: 76, fontWeight: 800, color: "#527DCE"}}>{frame < observe ? "先别急着贴标签" : "更重要的是观察"}</div>
      <div style={{width: 150, height: 5, backgroundColor: "#C3A66B", margin: "30px auto"}} />
    </div>
    <div style={{position: "absolute", left: 80, right: 80, top: 500, textAlign: "center", fontSize: 48, lineHeight: 1.7, opacity: interpolate(frame, [when, when + 15, clouds[0].start - 16, clouds[0].start], [0, 1, 1, 0], ease)}}>
      {frame < meaning ? "这个行为在什么时候发生？" : "孩子想表达什么？"}
    </div>
    <div style={{position: "absolute", left: 270, top: 930, width: 540, height: 990, overflow: "hidden", opacity: interpolate(frame, [0, 18], [0, 1], ease), translate: `0 ${interpolate(frame, [0, 24], [40, 0], ease)}px`}}>
      <Img src={thinking} style={{width: 540, height: "auto", display: "block"}} />
    </div>
    {clouds.map((cloud) => <div key={cloud.text} style={{position: "absolute", left: cloud.left, top: cloud.top, width: 300, height: 340, opacity: interpolate(frame, [cloud.start, cloud.start + 12], [0, 1], ease), scale: interpolate(frame, [cloud.start, cloud.start + 12, cloud.start + 20], [0.75, 1.04, 1], ease), translate: `0 ${interpolate(frame, [cloud.start, cloud.start + 20], [30, 0], ease)}px`}}>
      <Img src={thoughtCloud} style={{position: "absolute", left: -30, top: 0, width: 360, maxWidth: "none", height: "auto"}} />
      {/* Center within the cloud body (SVG center near 300, 215), excluding its trailing bubbles. */}
      <div style={{position: "absolute", left: 19, top: 76, width: 240, height: 90, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1, fontSize: 49, fontWeight: 800, color: "#527DCE"}}>{cloud.text}</div>
    </div>)}
  </AbsoluteFill>;
};
