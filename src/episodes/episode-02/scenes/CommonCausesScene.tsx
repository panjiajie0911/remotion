import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import person from "../assets/img/person-clean.png";
import age from "../assets/img/line2-clean.png";
import family from "../assets/img/family-clean.png";
import chat from "../assets/img/chat-box-clean.png";
import { theme } from "../../../lib/theme";

// Absolute episode time, including the three-second series intro.
export const COMMON_CAUSES_START = 15 * 30;
export const COMMON_CAUSES_DURATION = 6 * 30;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 15–21s: common explanations, deliberately leaving the question open. */
export const CommonCausesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const enter = (start: number) => interpolate(t, [start, start + 0.4], [0, 1], {
    ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const settle = interpolate(t, [5, 5.65], [0, 22], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const causes = [
    { label: "年龄", src: age, start: 1.5, left: 65, direction: 1, imageWidth: 240, imageHeight: 70 },
    { label: "家庭教育", src: family, start: 3.5, left: 715, direction: -1, imageWidth: 190, imageHeight: 199 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", color: "#171717", fontFamily: theme.fonts.sans, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 325, width: "100%", textAlign: "center", color: theme.colors.primary,
        fontSize: 34, fontWeight: 600, letterSpacing: 5, opacity: enter(0.15) }}>常见归因</div>
      <div style={{ position: "absolute", left: 458, top: 555, fontFamily: "Arial, sans-serif", fontSize: 250,
        fontWeight: 700, lineHeight: 1, color: theme.colors.primary, opacity: enter(0.2) * 0.16 }}>?</div>
      <Img src={person} style={{ position: "absolute", left: 390, top: 820, width: 300, height: 352,
        objectFit: "contain", opacity: enter(0), translate: `0 ${interpolate(enter(0), [0, 1], [20, 0])}px` }} />
      {[
        { left: 238, top: 635, width: 135, delay: 0.25, flip: false },
        { left: 738, top: 682, width: 125, delay: 0.5, flip: true },
        { left: 680, top: 455, width: 105, delay: 0.75, flip: true },
      ].map((bubble, i) => (
        <Img key={i} src={chat} style={{ position: "absolute", left: bubble.left, top: bubble.top, width: bubble.width,
          opacity: enter(bubble.delay) * interpolate(t, [1.35, 1.85], [1, 0], clamp),
          translate: `0 ${interpolate(enter(bubble.delay), [0, 1], [16, 0])}px`, scale: bubble.flip ? "-1 1" : "1 1" }} />
      ))}
      {causes.map((cause) => {
        const progress = enter(cause.start);
        const movement = cause.direction * (settle - (1 - progress) * 55);
        return (
          <div key={cause.label} style={{ position: "absolute", left: cause.left, top: 755, width: 300,
            opacity: progress, translate: `${movement}px 0` }}>
            <div style={{ height: 225, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={cause.src} style={{ width: cause.imageWidth, height: cause.imageHeight, objectFit: "contain" }} />
            </div>
            <div style={{ height: 88, border: `3px solid ${theme.colors.primary}`, borderRadius: 18,
              backgroundColor: "#F0F4FC", color: theme.colors.primary, fontSize: 43, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", marginTop: 25 }}>{cause.label}</div>
            <svg width="62" height="12" style={{ position: "absolute", top: 282,
              ...(cause.direction === 1 ? { left: 302 } : { right: 302 }), overflow: "visible" }}>
              <line x1={cause.direction === 1 ? 0 : 62} y1="6" x2={cause.direction === 1 ? 62 : 0} y2="6"
                stroke="#99A9C4" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1"
                strokeDashoffset={1 - enter(cause.start + 0.2)} />
            </svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
