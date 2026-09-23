import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import child from "../assets/img/boy-with-toy.png";
import {theme} from "../../../lib/theme";

export const LEARNING_PAUSE_DURATION = 120;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

/** Impulse arrives first; the ability to pause is still developing. */
export const LearningPauseScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const fade = (start: number, end: number) => interpolate(t, [start, end], [0, 1], clamp);
  return <AbsoluteFill style={{backgroundColor: "#fff", color: theme.colors.text, fontFamily: theme.fonts.sans}}>
    <div style={{position: "absolute", left: 0, right: 0, top: 390, textAlign: "center", fontSize: 61, fontWeight: 700,
      opacity: interpolate(t, [0, 0.35], [1, 0], clamp)}}>
      行为 <span style={{color: theme.colors.primary, fontSize: 80}}>≠</span> 孩子本身
    </div>
    <div style={{position: "absolute", left: 0, right: 0, top: 355, textAlign: "center", fontWeight: 700, opacity: fade(0.35, 0.75)}}>
      <div style={{fontSize: 66, color: theme.colors.primary}}>还在学习</div>
      <div style={{fontSize: 52, marginTop: 18, opacity: fade(2.7, 3.05)}}>如何停一停</div>
    </div>
    <Img src={child} style={{position: "absolute", left: 255, top: 670, width: 570, height: 780, objectFit: "contain"}} />
    <div style={{position: "absolute", left: 695, top: 635, width: 265, height: 185, opacity: fade(0.8, 0.95),
      scale: interpolate(t, [0.8, 1.03, 1.2], [0.75, 1.08, 1], clamp), transformOrigin: "0% 100%"}}>
      <svg width="265" height="185" viewBox="0 0 265 185" style={{position: "absolute", inset: 0}}>
        <path d="M35 7 H225 Q258 7 258 40 V114 Q258 146 225 146 H84 L40 176 L46 146 H35 Q7 146 7 114 V40 Q7 7 35 7 Z" fill="#F0F4FC" stroke={theme.colors.primary} strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <div style={{position: "absolute", left: 0, right: 0, top: 42, textAlign: "center", fontSize: 47, fontWeight: 700, color: theme.colors.primary}}>想要！</div>
    </div>
    <svg width="180" height="180" viewBox="0 0 180 180" style={{position: "absolute", left: 742, top: 900, opacity: fade(2, 2.35),
      translate: `0 ${interpolate(t, [2, 2.4], [16, 0], {...clamp, easing: Easing.out(Easing.cubic)})}px`}}>
      <circle cx="90" cy="90" r="72" fill="none" stroke={theme.colors.primary} strokeWidth="7" strokeLinecap="round" pathLength="1"
        strokeDasharray="0.78 1" strokeDashoffset={interpolate(t, [2.1, 2.65], [0.78, 0], clamp)} transform="rotate(-65 90 90)" />
      <path d="M75 69 V111 M105 69 V111" stroke={theme.colors.primary} strokeWidth="12" strokeLinecap="round" />
    </svg>
  </AbsoluteFill>;
};
