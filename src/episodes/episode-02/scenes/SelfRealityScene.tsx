import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import balance from "../assets/img/balance.png";

export const SELF_REALITY_DURATION = 75;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** “自我负责考虑现实”：天平从冲动的一侧回到现实中的平衡。 */
export const SelfRealityScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 18, mass: 0.82, stiffness: 115 } });
  const rise = interpolate(entrance, [0, 1], [250, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const tilt = interpolate(frame, [0, 18, 38, 56], [-4, -4, 1.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const labelOpacity = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const noteOpacity = interpolate(frame, [44, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const exitOpacity = interpolate(frame, [SELF_REALITY_DURATION - 10, SELF_REALITY_DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fff",
        color: "#252A33",
        fontFamily: '"Source Han Sans SC", "思源黑体", "Noto Sans CJK SC", sans-serif',
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <div style={{ backgroundColor: "#527DCE", borderRadius: "50%", height: 18, left: 96, opacity: 0.28, position: "absolute", top: 410, width: 18 }} />

      <div style={{ left: 80, opacity: labelOpacity, position: "absolute", right: 80, top: 154 }}>
        <div style={{ color: "#527DCE", fontSize: 28, fontWeight: 700, letterSpacing: 7 }}>自我</div>
        <div style={{ color: "#252A33", fontSize: 62, fontWeight: 800, letterSpacing: 2, marginTop: 22 }}>考虑现实</div>
        <div style={{ backgroundColor: "#C3A66B", height: 5, marginTop: 28, opacity: 0.8, transformOrigin: "left center", scale: interpolate(frame, [10, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }), width: 172 }} />
      </div>

      <Img
        src={balance}
        style={{
          height: 1140,
          left: "50%",
          objectFit: "contain",
          opacity: entrance,
          position: "absolute",
          top: 480,
          transform: `translate(-50%, ${rise}px) rotate(${tilt}deg)`,
          transformOrigin: "50% 31%",
        }}
      />

      <div style={{ bottom: 164, color: "#788394", fontSize: 34, fontWeight: 600, left: 80, opacity: noteOpacity, position: "absolute", right: 80, textAlign: "center" }}>
        先停一下，再做决定
      </div>
    </AbsoluteFill>
  );
};

