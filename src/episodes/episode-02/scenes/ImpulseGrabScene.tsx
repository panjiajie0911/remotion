import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import reaching from "../assets/img/hand-up.png";
import holding from "../assets/img/boy-with-toy.png";
import toy from "../assets/img/toy2.png";
import {theme} from "../../../lib/theme";
export const IMPULSE_GRAB_DURATION = 150;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
export const ImpulseGrabScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const enter = interpolate(t, [0, 0.4], [0, 1], clamp);
  const grab = interpolate(t, [2.65, 3.05], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return <AbsoluteFill style={{backgroundColor: "#fff", fontFamily: theme.fonts.sans, color: theme.colors.text}}>
    <div style={{position: "absolute", left: 80, top: 154, opacity: enter}}>
      <div style={{color: theme.colors.primary, fontSize: 28, fontWeight: 700}}>自我控制</div>
      <div style={{fontSize: 62, fontWeight: 800, marginTop: 22}}>还在发展中</div>
    </div>
    <div style={{position: "absolute", left: 100, top: 600, width: 850, height: 810, opacity: enter}}>
      {t < 3.05 ? <>
        <Img src={reaching} style={{position: "absolute", left: 40 + grab * 25, bottom: 0, height: 800, width: 426, objectFit: "contain"}} />
        <Img src={toy} style={{position: "absolute", left: 610 - grab * 218, top: 315 + grab * 35, width: 180, height: 205, objectFit: "contain", scale: 1 + Math.sin(Math.min(1, Math.max(0, (t - 1.8) / 0.6)) * Math.PI) * 0.1}} />
        <div style={{position: "absolute", left: 620, top: 245, color: theme.colors.primary, fontSize: 34, opacity: interpolate(t, [1.4, 1.7, 2.5, 2.7], [0, 1, 1, 0], clamp)}}>想要</div>
      </> : <Img src={holding} style={{position: "absolute", left: 40, bottom: 0, height: 800, width: 584, objectFit: "contain", scale: interpolate(t, [3.05, 3.17, 3.35], [1, 1.025, 1], clamp), transformOrigin: "50% 100%"}} />}
    </div>
    
  </AbsoluteFill>;
};
