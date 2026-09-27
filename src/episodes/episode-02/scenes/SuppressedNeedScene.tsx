import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import bugging from "../assets/img/bugging.png";
import chatCloud from "../assets/img/chat-cloud.png";

export const SUPPRESSED_NEED_DURATION = 210;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** “管教过度严厉，合理需求被压制”：需求气泡被僵硬边界压扁。 */
export const SuppressedNeedScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const childIn = spring({ frame, fps, config: { damping: 18, mass: 0.82, stiffness: 105 } });
  const bubbleIn = interpolate(t, [0.35, 0.9], [0, 1], { ...clamp, easing: ease });
  const pressure = interpolate(t, [2.4, 3.7], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const afterLine = interpolate(t, [3.7, 4.25], [0, 1], { ...clamp, easing: ease });
  const exit = interpolate(t, [6.35, 7], [1, 0], clamp);
  const bubbleScaleY = interpolate(pressure, [0, 0.65, 1], [1, 0.72, 0.2], clamp);
  const childY = interpolate(childIn, [0, 1], [70, 0], { ...clamp, easing: ease });
  const ruleY = interpolate(pressure, [0, 1], [1040, 1235], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F4EE", color: "#252A33", fontFamily: '"Source Han Sans SC", "思源黑体", "Noto Sans CJK SC", sans-serif', opacity: exit, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.78), rgba(247,244,238,0.18) 58%, rgba(221,216,207,0.22) 100%)" }} />

      <div style={{ left: 80, opacity: interpolate(frame, [0, 16], [0, 1], clamp), position: "absolute", right: 80, textAlign: "center", top: 150 }}>
        <div style={{ color: "#527DCE", fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>管教过度严厉</div>
        <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: 1, marginTop: 22 }}>合理需求被压制</div>
        <div style={{ backgroundColor: "#C3A66B", height: 5, margin: "28px auto 0", opacity: 0.8, scale: interpolate(frame, [12, 30], [0, 1], { ...clamp, easing: ease }), transformOrigin: "center", width: 180 }} />
      </div>

      <Img src={bugging} style={{ bottom: -75, height: 940, left: 75, objectFit: "contain", opacity: childIn, position: "absolute", translate: `0 ${childY}px`, width: 490 }} />

      <div style={{ height: 390, left: 355, opacity: bubbleIn, position: "absolute", top: 610, transform: `scaleY(${bubbleScaleY})`, transformOrigin: "center bottom", width: 650 }}>
        <Img src={chatCloud} style={{ height: "100%", objectFit: "contain", width: "100%" }} />
        <div style={{ color: "#527DCE", fontSize: 38, fontWeight: 600, left: 80, position: "absolute", right: 80, textAlign: "center", top: 142 }}>我想自己试试</div>
      </div>

      <div style={{ backgroundColor: "#252A33", borderRadius: 7, boxShadow: "0 12px 24px rgba(37,42,51,0.16)", height: 22, left: 70, opacity: pressure, position: "absolute", right: 70, top: ruleY, transformOrigin: "center" }} />
      <div style={{ backgroundColor: "#527DCE", height: 7, left: 260, opacity: afterLine, position: "absolute", right: 260, top: 1265, transformOrigin: "center", scale: `1 ${afterLine}` }} />
      <div style={{ bottom: 142, color: "#788394", fontSize: 34, fontWeight: 600, left: 80, opacity: afterLine, position: "absolute", right: 80, textAlign: "center" }}>需求被压住了</div>
    </AbsoluteFill>
  );
};

