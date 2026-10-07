import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import book from "../assets/img/book.png";
import fight from "../assets/img/fight-boy.png";
import blocks from "../assets/img/mess-jimu.png";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const cue = captions.find((item) => item.text.startsWith("经典精神分析还用"));
if (!cue) throw new Error("未找到死本能段落字幕");
// Source cue times are estimates based on script length, before the intro.
export const DEATH_INSTINCT_AUDIO_START = Math.round(cue.start * 30);
export const DEATH_INSTINCT_DURATION = Math.round(cue.end * 30) - DEATH_INSTINCT_AUDIO_START;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const DeathInstinctScene = () => {
  const frame = useCurrentFrame();
  // Normalize choreography to the registered cue duration in both previews.
  const t = frame / DEATH_INSTINCT_DURATION * 6.27;
  const show = (start: number) => interpolate(t, [start, start + 0.45], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const push = interpolate(t, [2.3, 2.5, 2.75], [0, 15, 0], clamp);
  const scatter = interpolate(t, [3.0, 3.55], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", color: "#252A33", fontFamily: theme.fonts.sans, overflow: "hidden"}}>
    <div style={{position: "absolute", left: 60, top: 460, width: 960, height: 490, opacity: show(0.1), translate: `0 ${(1-show(0.1))*35}px`}}>
      <Img src={book} style={{width: "100%", height: "100%", objectFit: "contain"}} />
      <div style={{position: "absolute", top: 130, left: 70, right: 70, textAlign: "center", color: "#527DCE", fontSize: 72, lineHeight: 1.2, fontWeight: 800, letterSpacing: 4, opacity: show(0)}}>精神分析</div>
      <div style={{position: "absolute", top: 235, left: 70, right: 70, textAlign: "center", fontSize: 48, lineHeight: 1.2, fontWeight: 600, letterSpacing: 6, opacity: show(0.85)}}>死本能</div>
      <div style={{position: "absolute", left: 385, top: 315, width: 190, height: 5, backgroundColor: "#C3A66B", scale: `${show(1.2)} 1`}} />
    </div>
    <svg width="1080" height="1920" style={{position: "absolute", inset: 0, pointerEvents: "none"}}>
      <path d="M405 955 Q310 990 285 1065" fill="none" stroke="#788394" strokeWidth="3" strokeDasharray="9 12" opacity={show(1.7)} />
      <path d="M675 955 Q770 990 795 1065" fill="none" stroke="#788394" strokeWidth="3" strokeDasharray="9 12" opacity={show(2.5)} />
    </svg>
    <div style={{position: "absolute", left: 100, top: 1090, width: 380, opacity: show(2)}}>
      <Img src={fight} style={{width: 380, height: 300, objectFit: "contain", translate: `${push}px 0`}} />
      <div style={{textAlign: "center", fontSize: 44, fontWeight: 700, color: "#527DCE", marginTop: 20}}>攻击</div>
    </div>
    <div style={{position: "absolute", right: 100, top: 1090, width: 380, opacity: show(2.8)}}>
      <Img src={blocks} style={{width: 380, height: 300, objectFit: "contain", scale: 0.88 + scatter * 0.12, translate: `0 ${(1-scatter)*-24}px`}} />
      <div style={{textAlign: "center", fontSize: 44, fontWeight: 700, color: "#527DCE", marginTop: 20}}>破坏</div>
    </div>
    <div style={{position: "absolute", left: 0, right: 0, top: 1530, textAlign: "center", fontSize: 29, color: "#788394", opacity: show(4.5)}}>理论概念 · 一种解释视角</div>
  </AbsoluteFill>;
};
