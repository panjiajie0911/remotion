import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import quiet from "../assets/img/quite.png";
import lively from "../assets/img/noisy.png";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const first = captions.findIndex(c => c.text.startsWith("但，即使是双胞胎"));
const last = captions.findIndex((c, i) => i >= first && c.text.includes("性格和行为也可能很不一样"));
if (first < 0 || last < first) throw new Error("未找到双胞胎段落字幕");
export const TWINS_START = 90 + Math.round(captions[first].start * 30);
export const TWINS_DURATION = Math.round(captions[last].end * 30) - Math.round(captions[first].start * 30);
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const TwinsContrastScene = () => {
  const {fps} = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const reveal = interpolate(t, [0.9, 2.1], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{backgroundColor: "#fff", fontFamily: theme.fonts.sans, color: theme.colors.text}}>
  
    {[{src: quiet, label: "安静探索", left: 70}, {src: lively, label: "主动互动", left: 585}].map((item, index) => <div key={item.label} style={{position: "absolute", left: item.left, top: 620, width: 425}}>
      <div style={{position: "relative", width: 425, height: 340 + reveal * 360, overflow: "hidden", borderRadius: 32}}>
        <Img src={item.src} style={{position: "absolute", width: 425, height: 650, objectFit: "contain", objectPosition: "center top",
          scale: 1.35 - reveal * .35, transformOrigin: "35% 0%", translate: `${(index === 0 ? 5 : -5) * (1-reveal)}px 0`}} />
      </div>
      <div style={{textAlign: "center", fontSize: 44, fontWeight: 700, color: theme.colors.primary, marginTop: 15,
        opacity: interpolate(t,[2.15+index*.25,2.5+index*.25],[0,1],clamp)}}>{item.label}</div>
    </div>)}
    <div style={{position: "absolute", left: 539, top: 700, height: 540, width: 2, backgroundColor: "#DFE6F2", opacity: reveal}} />
  </AbsoluteFill>;
};
