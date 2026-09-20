import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import angel from "../assets/img/angel.png";
import cloud from "../assets/img/cloud.png";

export const SUPEREGO_VALUES_DURATION = 76;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** “超我代表规则和道德”：天使落在云朵上，温和地作出提醒。 */
export const SuperegoValuesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cloudEntrance = spring({ frame, fps, config: { damping: 20, mass: 0.85, stiffness: 100 } });
  const angelEntrance = spring({ frame: frame - 12, fps, config: { damping: 18, mass: 0.78, stiffness: 115 } });
  const cloudRise = interpolate(cloudEntrance, [0, 1], [210, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const angelDrop = interpolate(angelEntrance, [0, 1], [-260, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const floatY = frame > 50 ? Math.sin((frame - 50) * 0.1) * 7 : 0;
  const labelOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const ruleProgress = interpolate(frame, [42, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const moralProgress = interpolate(frame, [52, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const exitOpacity = interpolate(frame, [SUPEREGO_VALUES_DURATION - 10, SUPEREGO_VALUES_DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F7F4EE",
        color: "#252A33",
        fontFamily: '"Source Han Sans SC", "思源黑体", "Noto Sans CJK SC", sans-serif',
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.82), rgba(247,244,238,0.24) 56%, rgba(221,216,207,0.2) 100%)" }} />
      <div style={{ backgroundColor: "rgba(195,166,107,0.18)", borderRadius: "50%", filter: "blur(24px)", height: 390, left: "50%", position: "absolute", top: 500, translate: "-50% 0", width: 390 }} />

      <div style={{ left: 80, opacity: labelOpacity, position: "absolute", right: 80, top: 154 }}>
        <div style={{ color: "#527DCE", fontSize: 28, fontWeight: 700, letterSpacing: 7 }}>超我</div>
        <div style={{ color: "#252A33", fontSize: 62, fontWeight: 800, letterSpacing: 2, marginTop: 22 }}>代表规则和道德</div>
        <div style={{ backgroundColor: "#C3A66B", height: 5, marginTop: 28, opacity: 0.8, transformOrigin: "left center", scale: interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }), width: 172 }} />
      </div>

      <div style={{ height: 1050, left: "50%", position: "absolute", top: 465, translate: `-50% ${floatY}px`, width: 920 }}>
        <Img
          src={angel}
          style={{
            height: 800,
            left: "50%",
            objectFit: "contain",
            opacity: angelEntrance,
            position: "absolute",
            top: 0,
            translate: `-50% ${angelDrop}px`,
            width: 640,
          }}
        />
        <Img
          src={cloud}
          style={{
            bottom: 0,
            height: 410,
            left: "50%",
            objectFit: "contain",
            opacity: cloudEntrance,
            position: "absolute",
            translate: `-50% ${cloudRise}px`,
            width: 900,
          }}
        />
      </div>

      
    </AbsoluteFill>
  );
};
