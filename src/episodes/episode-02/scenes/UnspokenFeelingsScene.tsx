import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import confused from "../assets/img/confused.png";
import ignored from "../assets/img/igrone.png";
import jealous from "../assets/img/jes.png";
import afraid from "../assets/img/afraid.png";
import sad from "../assets/img/sad.png";
import {theme} from "../../../lib/theme";

export const UNSPOKEN_FEELINGS_DURATION = 270;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const feelings = [
  {label: "被忽视", src: ignored, start: 2, end: 3.5, width: 650},
  {label: "嫉妒", src: jealous, start: 3.5, end: 5, width: 610},
  {label: "害怕", src: afraid, start: 5, end: 6.5, width: 330},
  {label: "委屈", src: sad, start: 6.5, end: 8, width: 330},
];

/** Thoughts have detail while the spoken bubble remains wordless. */
export const UnspokenFeelingsScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const fade = (a: number, b: number) => interpolate(t, [a, b], [0, 1], clamp);
  return <AbsoluteFill style={{backgroundColor: "#fff", fontFamily: theme.fonts.sans, color: theme.colors.text}}>
    <div style={{position: "absolute", top: 165, width: "100%", textAlign: "center", opacity: fade(0, 0.4)}}>
      <div style={{color: theme.colors.primary, fontSize: 28, fontWeight: 700}}>有感受，却难以表达</div>
      <div style={{fontSize: 60, fontWeight: 700, marginTop: 20}}>还说不清心里的感受</div>
    </div>
    <svg width="900" height="790" viewBox="0 0 900 790" style={{position: "absolute", left: 90, top: 345, opacity: fade(1.5, 2)}}>
      <rect x="8" y="8" width="884" height="655" rx="105" fill="white" stroke={theme.colors.primary} strokeWidth="5" />
      <circle cx="320" cy="699" r="20" fill="white" stroke={theme.colors.primary} strokeWidth="4" />
      <circle cx="347" cy="751" r="11" fill="white" stroke={theme.colors.primary} strokeWidth="4" />
    </svg>
    {feelings.map(f => t >= f.start && t < f.end ? <div key={f.label} style={{position: "absolute", left: 145, top: 390, width: 790, height: 570, opacity: fade(f.start, f.start + 0.18)}}>
      <div style={{height: 465, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Img src={f.src} style={{width: f.width, height: 440, objectFit: "contain"}} />
      </div>
      <div style={{textAlign: "center", color: theme.colors.primary, fontSize: 54, fontWeight: 700, marginTop: 15}}>{f.label}</div>
    </div> : null)}
    <div style={{position: "absolute", left: 200, top: 545, width: 680, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "55px 35px", textAlign: "center", fontSize: 58, color: theme.colors.primary, fontWeight: 700, opacity: fade(8, 8.25)}}>
      {feelings.map(f => <div key={f.label}>{f.label}</div>)}
    </div>
    <Img src={confused} style={{position: "absolute", left: 315, top: 1120, width: 310, height: 560, objectFit: "contain", opacity: fade(0, 0.4)}} />
    <div style={{position: "absolute", left: 655, top: 1200, width: 245, height: 130, opacity: fade(0.4, 0.65)}}>
      <svg width="245" height="150" viewBox="0 0 245 150" style={{position: "absolute", inset: 0}}>
        <path d="M32 5 H212 Q239 5 239 32 V88 Q239 114 212 114 H70 L25 142 L32 114 Q5 114 5 88 V32 Q5 5 32 5Z" fill="white" stroke="#252A33" strokeWidth="5" strokeLinejoin="round" />
      </svg>
      <div style={{position: "absolute", top: 47, left: 66, display: "flex", gap: 19}}>{[0, 1, 2].map(i => <div key={i} style={{width: 17, height: 17, borderRadius: "50%", backgroundColor: "#252A33", opacity: fade(0.65 + i * 0.25, 0.8 + i * 0.25)}} />)}</div>
    </div>
  </AbsoluteFill>;
};
