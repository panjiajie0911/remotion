import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import child from "../assets/img/boy-with-toy.png";
import cry from "../assets/img/cry-boy.png";
import fight from "../assets/img/fight-boy.png";
import negative from "../assets/img/negitive-boy.png";
import { theme } from "../../../lib/theme";

export const NOT_BAD_CHILD_DURATION = 90;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** A short reframing beat: a behavior does not define the child. */
export const NotBadChildScene = () => {
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const previous = interpolate(t, [0, 0.55], [1, 0], clamp);
  const label = interpolate(t, [0.2, 0.4, 1.05, 1.35], [0, 1, 1, 0], clamp);
  const reveal = interpolate(t, [1.1, 1.5], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", fontFamily: theme.fonts.sans, color: theme.colors.text }}>
      <AbsoluteFill style={{ opacity: previous }}>
        <div style={{ position: "absolute", left: 80, top: 154, color: theme.colors.primary, fontSize: 28, fontWeight: 700 }}>情绪表达</div>
        <div style={{ position: "absolute", left: 80, top: 214, fontSize: 62, fontWeight: 800 }}>感到不满，直接表现出来</div>
        {[cry, fight, negative].map((src, i) => <div key={src} style={{ position: "absolute", left: 90 + i * 305, top: 580, width: 300, scale: 0.78, translate: "0 -30px" }}>
          <Img src={src} style={{ width: 300, height: 520, objectFit: "contain" }} />
          <div style={{ textAlign: "center", color: theme.colors.primary, fontSize: 42, fontWeight: 700, marginTop: 24 }}>{["哭闹", "抢夺", "顶嘴"][i]}</div>
        </div>)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1610, textAlign: "center", fontSize: 38, color: "#6E7788" }}>哭闹 · 抢夺 · 顶嘴</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 690, left: 260, width: 560, height: 140, textAlign: "center", fontSize: 88, fontWeight: 700, opacity: label }}>
        坏孩子？
        <svg width="560" height="140" style={{ position: "absolute", inset: 0 }}>
          <path d="M 65 105 L 490 30" stroke={theme.colors.primary} strokeWidth="9" strokeLinecap="round" pathLength="1" strokeDasharray="1"
            strokeDashoffset={interpolate(t, [0.6, 0.9], [1, 0], clamp)} />
        </svg>
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: reveal, translate: `0 ${(1 - reveal) * 18}px` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 390, textAlign: "center", fontSize: 61, fontWeight: 700 }}>
          行为 <span style={{ color: theme.colors.primary, fontSize: 80 }}>≠</span> 孩子本身
        </div>
        <Img src={child} style={{ position: "absolute", left: 255, top: 670, width: 570, height: 780, objectFit: "contain" }} />
      </div>
    </AbsoluteFill>
  );
};
