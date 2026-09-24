import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import tower from "../assets/img/complete-jimu.png";
import scattered from "../assets/img/mess-jimu.png";
import father from "../assets/img/playing-father.png";
import child from "../assets/img/push-away.png";
import {theme} from "../../../lib/theme";

export const PERMISSIVE_PARENT_DURATION = 150;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

/** A push, a collapse, then a deliberate pause without a caregiver response. */
export const PermissiveParentScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const push = interpolate(t, [1, 1.5, 2.05], [0, 45, 25], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const fall = interpolate(t, [1.48, 1.95], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  return <AbsoluteFill style={{backgroundColor: "#fff", color: theme.colors.text, fontFamily: theme.fonts.sans}}>
    <div style={{position: "absolute", left: 80, right: 80, top: 180, textAlign: "center", opacity: interpolate(t, [0,.35], [0,1], clamp)}}>
      <div style={{color: theme.colors.primary, fontSize: 30, fontWeight: 700}}>如果一味放任</div>
      <div style={{fontSize: 62, fontWeight: 700, marginTop: 24}}>孩子很难学会规则</div>
    </div>
    <Img src={father} style={{position: "absolute", left: 675, top: 480, width: 260, height: 465, objectFit: "contain"}} />
    <div style={{position: "absolute", left: 90, right: 90, top: 1470, height: 3, backgroundColor: "#E7EAF0"}} />
    <Img src={child} style={{position: "absolute", left: 100 + push, top: 840, width: 370, height: 630, objectFit: "contain"}} />
    {t < 1.95 ? <Img src={tower} style={{position: "absolute", left: 360 + fall * 190, top: 1080 + fall * 90, width: 430, height: 390,
      objectFit: "contain", transformOrigin: "85% 100%", rotate: `${fall * 42}deg`, opacity: interpolate(t, [1.8,1.95], [1,0], clamp)}} /> : null}
    <Img src={scattered} style={{position: "absolute", left: 485, top: 1215, width: 485, height: 255, objectFit: "contain",
      opacity: interpolate(t, [1.8,2.05], [0,1], clamp), translate: `${interpolate(t,[1.8,2.15],[15,0],clamp)}px ${interpolate(t,[1.8,2,2.15],[-18,5,0],clamp)}px`}} />
    <div style={{position: "absolute", left: 70, right: 70, top: 1555, textAlign: "center", fontSize: 39, color: theme.colors.primary,
      opacity: interpolate(t,[3.1,3.5],[0,1],clamp)}}>缺少回应，也缺少规则引导</div>
  </AbsoluteFill>;
};

