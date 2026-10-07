import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import compare from "../assets/img/compare.png";
import education from "../assets/img/education.png";
import child from "../assets/img/confused.png";
import {captions} from "../script/captions";
import {theme} from "../../../lib/theme";

const cue = captions.find((item) => item.text.startsWith("很多人会把原因归结"));
if (!cue) throw new Error("未找到常见归因字幕");
export const COMMON_CAUSES_START = 90 + Math.round(cue.start * 30);
export const COMMON_CAUSES_DURATION = Math.round(cue.end * 30) - Math.round(cue.start * 30);
const cards = [
  {title: "", hint: "年纪还小？", left: 65, start: Math.round(COMMON_CAUSES_DURATION * cue.text.indexOf("年龄") / cue.text.length), src: compare},
  {title: "", hint: "管教方式？", left: 715, start: Math.round(COMMON_CAUSES_DURATION * cue.text.indexOf("家庭教育") / cue.text.length), src: education},
];
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const CommonCausesScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", fontFamily: theme.fonts.sans, color: "#252A33"}}>
   
    <Img name="中央孩子" src={child} style={{position: "absolute", left: 380, top: 780, width: 320, height: 690, objectFit: "contain", opacity: interpolate(frame, [0, 12], [0, 1], clamp)}} />
    {cards.map((item, index) => <div key={item.title} style={{position: "absolute", left: item.left, top: 710, width: 300, opacity: interpolate(frame, [item.start, item.start + 10], [0, 1], clamp), translate: `${interpolate(frame, [item.start, item.start + 12], [index === 0 ? -45 : 45, 0], clamp)}px 0`}}>
      <div style={{height: 365, borderRadius: 28, backgroundColor: "#527DCE", color: "#fff", boxShadow: "0 10px 0 #35579A24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Img name={`${item.title}素材`} src={item.src} style={{width: 240, height: 190, objectFit: "contain"}} />
        <div style={{fontSize: 52, fontWeight: 800, marginTop: 10}}>{item.title}</div>
        <div style={{fontSize: 34, marginTop: 18}}>{item.hint}</div>
      </div>
    
    </div>)}
  </AbsoluteFill>;
};
