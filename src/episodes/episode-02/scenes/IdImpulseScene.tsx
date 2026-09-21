import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import demon from "../assets/img/demon.png";
import candy from "../assets/img/candy.png";
import toy from "../assets/img/toy.png";

// 旁白时间：全片约 43.4s 开始，46.5s 结束，严格收在这句台词内。
export const ID_IMPULSE_DURATION = 93;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** “本我追求立刻满足”：角色被目标吸引，马上冲过去伸手去拿。 */
export const IdImpulseScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 18, mass: 0.8, stiffness: 110 } });
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const targetProgress = interpolate(frame, [7, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const rushProgress = interpolate(frame, [22, 61], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const exitOpacity = interpolate(frame, [ID_IMPULSE_DURATION - 8, ID_IMPULSE_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame * 0.25) * 0.035;
  const targetX = interpolate(rushProgress, [0, 1], [790, 690], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const demonX = interpolate(rushProgress, [0, 1], [-110, 95], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const demonScale = interpolate(entrance, [0, 1], [0.82, 0.98], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const demonBob = Math.sin(frame * 0.22) * 6 * (rushProgress > 0.98 ? 1 : 0);

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

      <div
        style={{
          backgroundColor: "#527DCE",
          borderRadius: "50%",
          height: 18,
          left: 94,
          opacity: 0.28,
          position: "absolute",
          top: 400,
          width: 18,
        }}
      />

      <div style={{ left: 80, opacity: labelOpacity, position: "absolute", right: 80, top: 154 }}>
        <div style={{ color: "#527DCE", fontSize: 28, fontWeight: 700, letterSpacing: 7 }}>本我</div>
        <div style={{ color: "#252A33", fontSize: 62, fontWeight: 800, letterSpacing: 2, marginTop: 22 }}>追求立刻满足</div>
        <div style={{ backgroundColor: "#C3A66B", height: 5, marginTop: 28, opacity: 0.8, transformOrigin: "left center", scale: interpolate(frame, [12, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }), width: 172 }} />
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 26,
          left: targetX,
          opacity: interpolate(targetProgress, [0, 0.2, 1], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          position: "absolute",
          top: 740,
          transform: `translate(-50%, -50%) scale(${pulse})`,
        }}
      >
        <div style={{ alignItems: "center", backgroundColor: "rgba(195,166,107,0.13)", border: "3px solid rgba(195,166,107,0.42)", borderRadius: 34, display: "flex", gap: 24, height: 250, justifyContent: "center", padding: "0 24px", width: 490 }}>
          <Img src={candy} style={{ height: 190, objectFit: "contain", rotate: "-8deg", width: 210 }} />
          <Img src={toy} style={{ height: 205, objectFit: "contain", rotate: "7deg", width: 210 }} />
        </div>
      </div>

      <Img
        src={demon}
        style={{
          bottom: -54,
          height: 930,
          left: demonX,
          objectFit: "contain",
          opacity: entrance,
          position: "absolute",
          rotate: `${interpolate(rushProgress, [0, 1], [-5, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}deg`,
          scale: demonScale,
          translate: `0 ${demonBob}px`,
          transformOrigin: "50% 90%",
        }}
      />

    
    </AbsoluteFill>
  );
};
