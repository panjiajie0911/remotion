import {AbsoluteFill, Easing, Img, Interactive, Sequence, interpolate, useCurrentFrame} from "remotion";
import type {ReactNode} from "react";
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
const observe = wordFrame("重要的是观察");
const when = wordFrame("这个行为");
const meaning = wordFrame("孩子想表达什么");
const ease = {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)} as const;

const CloudEntrance = ({children, origin}: {children: ReactNode; origin: string}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{transformOrigin: origin, opacity: interpolate(frame, [0, 12], [0, 1], ease), scale: interpolate(frame, [0, 12, 20], [0.75, 1.04, 1], ease), translate: interpolate(frame, [0, 20], ["0px 30px", "0px 0px"], ease)}}>
    {children}
  </AbsoluteFill>;
};

export const ThinkingObservationScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", fontFamily: theme.fonts.sans, color: "#252A33", overflow: "hidden"}}>
    <div style={{position: "absolute", top: 210, left: 80, right: 80, textAlign: "center", opacity: interpolate(frame, [0, 18], [0, 1], ease)}}>
      <Sequence durationInFrames={observe} layout="none"><Interactive.Div name="开场标题" style={{fontSize: 76, fontWeight: 800, color: "#527DCE"}}>先别急着贴标签</Interactive.Div></Sequence>
      <Sequence from={observe} layout="none"><Interactive.Div name="观察标题" style={{fontSize: 76, fontWeight: 800, color: "#527DCE"}}>重要的是观察</Interactive.Div></Sequence>
      <div style={{width: 150, height: 5, backgroundColor: "#C3A66B", margin: "30px auto"}} />
    </div>
    <div style={{position: "absolute", left: 80, right: 80, top: 500, textAlign: "center", fontSize: 48, lineHeight: 1.7, opacity: interpolate(frame, [when, when + 15, clouds[0].start - 16, clouds[0].start], [0, 1, 1, 0], ease)}}>
      <Sequence durationInFrames={meaning} layout="none"><Interactive.Div name="观察问题 · 发生时间">这个行为在什么时候发生？</Interactive.Div></Sequence>
      <Sequence from={meaning} layout="none"></Sequence>
    </div>
    <div style={{position: "absolute", left: 270, top: 930, width: 540, height: 990, overflow: "hidden", opacity: interpolate(frame, [0, 18], [0, 1], ease), translate: `0 ${interpolate(frame, [0, 24], [40, 0], ease)}px`}}>
      <Img name="思考人物" src={thinking} style={{width: 540, height: "auto", display: "block"}} />
    </div>
    <Sequence from={clouds[0].start} layout="none" name="不会表达 · 入场">
      <CloudEntrance origin="215px 730px">
        <Interactive.Div name="不会表达 · 整组位置" style={{position: "absolute", left: 65, top: 560, width: 300, height: 340}}>
          <Img name="不会表达 · 云朵图片" src={thoughtCloud} style={{position: "absolute", left: -30, top: 0, width: 360, maxWidth: "none", height: "auto"}} />
          <Interactive.Div name="不会表达 · 文字" style={{position: "absolute", left: 19, top: 76, width: 240, height: 90, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1, fontSize: 49, fontWeight: 800, color: "#527DCE"}}>不会表达</Interactive.Div>
        </Interactive.Div>
      </CloudEntrance>
    </Sequence>
    <Sequence from={clouds[1].start} layout="none" name="控制不住 · 入场">
      <CloudEntrance origin="540px 610px">
        <Interactive.Div name="控制不住 · 整组位置" style={{position: "absolute", left: 390, top: 440, width: 300, height: 340}}>
          <Img name="控制不住 · 云朵图片" src={thoughtCloud} style={{position: "absolute", left: -30, top: 0, width: 360, maxWidth: "none", height: "auto"}} />
          <Interactive.Div name="控制不住 · 文字" style={{position: "absolute", left: 19, top: 76, width: 240, height: 90, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1, fontSize: 49, fontWeight: 800, color: "#527DCE"}}>控制不住</Interactive.Div>
        </Interactive.Div>
      </CloudEntrance>
    </Sequence>
    <Sequence from={clouds[2].start} layout="none" name="试探边界 · 入场">
      <CloudEntrance origin="865px 730px">
        <Interactive.Div name="试探边界 · 整组位置" style={{position: "absolute", left: 715, top: 560, width: 300, height: 340}}>
          <Img name="试探边界 · 云朵图片" src={thoughtCloud} style={{position: "absolute", left: -30, top: 0, width: 360, maxWidth: "none", height: "auto"}} />
          <Interactive.Div name="试探边界 · 文字" style={{position: "absolute", left: 19, top: 76, width: 240, height: 90, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1, fontSize: 49, fontWeight: 800, color: "#527DCE"}}>试探边界</Interactive.Div>
        </Interactive.Div>
      </CloudEntrance>
    </Sequence>
  </AbsoluteFill>;
};
