import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import child from "../assets/img/confused.png";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const cue = captions.find(c => c.text.startsWith("所以，孩子所谓的"));
if (!cue) throw new Error("未找到非单一因素字幕");
export const MULTIPLE_CAUSES_START = 90 + Math.round(cue.start * 30);
export const MULTIPLE_CAUSES_DURATION = Math.round(cue.end * 30) - Math.round(cue.start * 30);
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const factors = [
  {label: "年龄", x: 65, y: 750, delay: 0.22, path: "M335 803 Q385 803 410 900"},
  {label: "家庭环境", x: 745, y: 750, delay: 0.38, path: "M745 803 Q695 803 670 900"},
  {label: "气质", x: 65, y: 1190, delay: 0.52, path: "M335 1243 Q385 1243 410 1160"},
  {label: "情绪调节", x: 745, y: 1190, delay: 0.64, path: "M745 1243 Q695 1243 670 1160"},
];

export const MultipleCausesScene = () => {
  const p = useCurrentFrame() / (MULTIPLE_CAUSES_DURATION - 1);
  const enter = (start: number) => interpolate(p, [start, start + 0.09], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{backgroundColor: "#fff", fontFamily: theme.fonts.sans, color: theme.colors.text}}>
    <div style={{position: "absolute", top: 275, left: 60, right: 60, textAlign: "center", fontSize: 62, fontWeight: 700, opacity: enter(0.65)}}>
      多种因素，<span style={{color: theme.colors.primary}}>共同影响</span>
    </div>
    <div style={{position: "absolute", top: 545, left: 0, right: 0, textAlign: "center", fontSize: 75, fontWeight: 700,
      opacity: interpolate(p,[0,.05,.15,.24],[0,1,1,0],clamp)}}>“熊”</div>
    <svg width="1080" height="1920" style={{position: "absolute", inset: 0}}>
      {factors.map(f => <path key={f.label} d={f.path} fill="none" stroke={theme.colors.primary} strokeWidth="3" strokeLinecap="round"
        opacity={enter(f.delay)} pathLength="1" strokeDasharray="1" strokeDashoffset={1-enter(f.delay + .035)} />)}
    </svg>
    <Img src={child} style={{position: "absolute", left: 390, top: 765, width: 300, height: 570, objectFit: "contain", opacity: enter(0)}} />
    {factors.map(f => <div key={f.label} style={{position: "absolute", left: f.x, top: f.y, width: 270, height: 106,
      border: `3px solid ${theme.colors.primary}`, borderRadius: 20, backgroundColor: "#F0F4FC", color: theme.colors.primary,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, fontWeight: 700,
      opacity: enter(f.delay), translate: `0 ${(1-enter(f.delay))*18}px`}}>{f.label}</div>)}
  </AbsoluteFill>;
};
