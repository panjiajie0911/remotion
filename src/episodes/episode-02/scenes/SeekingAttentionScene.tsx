import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import boy from "../assets/img/boy-hug.png";
import father from "../assets/img/father-hug.png";
import hug from "../assets/img/hug.png";
import {theme} from "../../../lib/theme";

export const SEEKING_ATTENTION_DURATION = 300;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

/** Running toward a caregiver, then being held; a possible bid for attention. */
export const SeekingAttentionScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const run = interpolate(t, [0.65, 3.2], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const bob = t > 0.65 && t < 3.2 ? Math.sin(run * Math.PI * 10) * 9 : 0;
  const lift = interpolate(t, [3.2, 3.85], [48, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  const fade = (a: number, b: number) => interpolate(t, [a, b], [0, 1], clamp);
  return <AbsoluteFill style={{backgroundColor: "#fff", color: theme.colors.text, fontFamily: theme.fonts.sans, overflow: "hidden"}}>
    <div style={{position: "absolute", left: 80, right: 80, top: 220, textAlign: "center", opacity: fade(0, 0.4) * (1 - fade(6.3, 6.65))}}>
      <div style={{fontSize: 30, color: theme.colors.primary, fontWeight: 700}}>行为背后的需要</div>
      <div style={{fontSize: 60, fontWeight: 700, marginTop: 25}}>表达情绪，试图获得关注</div>
    </div>
    {t < 3.2 ? <>
      <Img src={father} style={{position: "absolute", left: 560, top: 810, width: 450, height: 630, objectFit: "contain", opacity: fade(0, 0.35)}} />
      <Img src={boy} style={{position: "absolute", left: -330 + run * 690, top: 985 + bob, width: 330, height: 435, objectFit: "contain", rotate: `${Math.sin(run * Math.PI * 10) * (t > 0.65 ? 1.5 : 0)}deg`}} />
    </> : <Img src={hug} style={{position: "absolute", left: interpolate(t, [3.2, 4.3], [490, 300], {...clamp, easing: Easing.inOut(Easing.cubic)}), top: 600 + lift, width: 480, height: 870, objectFit: "contain"}} />}
    <div style={{position: "absolute", left: 90, right: 90, top: 250, textAlign: "center", opacity: fade(6.7, 7.1)}}>
      <div style={{fontSize: 30, color: theme.colors.primary, fontWeight: 700}}>需要注意</div>
      <div style={{fontSize: 54, fontWeight: 700, lineHeight: 1.55, marginTop: 22}}>这种行为可能发生在<br/><span style={{color: theme.colors.primary}}>不同家庭</span>中</div>
    </div>
  </AbsoluteFill>;
};
