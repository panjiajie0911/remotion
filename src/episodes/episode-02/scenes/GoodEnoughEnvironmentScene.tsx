import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import focused from "../assets/img/fouced.png";
import {theme} from "../../../lib/theme";

export const GOOD_ENOUGH_ENVIRONMENT_DURATION = 150;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const GoodEnoughEnvironmentScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const progress = (start: number, end: number) => interpolate(t, [start, end], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{backgroundColor: "#fff", color: theme.colors.text, fontFamily: theme.fonts.sans}}>
    <div style={{position: "absolute", left: 80, right: 80, top: 235, textAlign: "center", opacity: progress(0, 0.45)}}>
      <div style={{fontSize: 30, color: theme.colors.primary, fontWeight: 700}}>孩子需要</div>
      <div style={{fontSize: 68, fontWeight: 700, marginTop: 24}}>“足够好的环境”</div>
    </div>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: "absolute", inset: 0}}>
      <path d="M145 795 L540 515 L935 795" fill="none" stroke={theme.colors.primary} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(0.85, 1.75)} />
      {['M180 810 V1330', 'M900 810 V1330'].map(d => <path key={d} d={d} fill="none" stroke={theme.colors.primary} strokeWidth="6" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(1.65, 2.45)} />)}
      <path d="M160 1430 H920" fill="none" stroke={theme.colors.primary} strokeWidth="8" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(2.5, 3.1)} />
    </svg>
    <Img src={focused} style={{position: "absolute", left: 250, top: 725, width: 580, height: 680, objectFit: "contain", opacity: progress(0, 0.55), translate: `0 ${(1-progress(0, 0.65))*18}px`}} />
    <div style={{position: "absolute", left: 170, right: 170, top: 1490, display: "flex", justifyContent: "space-between", color: theme.colors.primary, fontSize: 46, fontWeight: 700}}>
      <div style={{opacity: progress(2.8, 3.2), translate: `0 ${(1-progress(2.8,3.2))*12}px`}}>理解感受</div>
      <div style={{opacity: progress(3.3, 3.7), translate: `0 ${(1-progress(3.3,3.7))*12}px`}}>稳定边界</div>
    </div>
  </AbsoluteFill>;
};
