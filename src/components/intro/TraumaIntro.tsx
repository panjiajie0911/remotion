import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import avatar from "../../assets/img/avatar.png";
import { theme } from "../../lib/theme";

/**
 * Episode 01 opening card. The friendly illustration is intentionally kept
 * visible behind the copy: the visual warmth sets up the contrast with the
 * final word, “创伤”.
 */
export const TraumaIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const show = (start: number, duration = 0.55) =>
    interpolate(frame, [start, start + Math.round(duration * fps)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });

  const imageOpacity = interpolate(frame, [0, 26, 150, 180], [0, 0.9, 0.9, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const imageScale = interpolate(frame, [0, 180], [0.92, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const wash = interpolate(frame, [0, 75, 180], [0.98, 0.72, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F3F7FF",
        color: theme.colors.text,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.98) 0%, rgba(232,240,255,0.9) 42%, rgba(210,224,250,0.98) 100%)",
          opacity: wash,
        }}
      />
      <Img
        src={avatar}
        style={{
          bottom: -140,
          height: 1480,
          left: "50%",
          objectFit: "contain",
          opacity: imageOpacity,
          position: "absolute",
          translate: "-50% 0",
          scale: imageScale,
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(243,247,255,0.98) 0%, rgba(243,247,255,0.08) 34%, rgba(243,247,255,0.18) 72%, rgba(243,247,255,0.96) 100%)",
        }}
      />

     

      <div style={{ left: 80, position: "absolute", right: 80, top: 420 }}>
        <div
          style={{
            fontSize: 70,
            fontWeight: 500,
            letterSpacing: 1,
            lineHeight: 1.18,
            opacity: show(24),
            translate: `0 ${interpolate(frame, [24, 42], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}px`,
          }}
        >
          那些你以为是
        </div>
        <div
          style={{
            color: theme.colors.accent,
            fontSize: 102,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginTop: 12,
            opacity: show(48),
            translate: `0 ${interpolate(frame, [48, 68], [28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}px`,
          }}
        >
          正常
        </div>
        <div
          style={{
            color: theme.colors.text,
            fontSize: 50,
            fontWeight: 700,
            letterSpacing: 3,
            marginTop: 30,
            opacity: show(86),
          }}
        >
          其实是创伤
        </div>
      </div>

      <div
        style={{
          bottom: 260,
          color: theme.colors.muted,
          fontSize: 28,
          left: 80,
          opacity: show(112),
          position: "absolute",
          right: 80,
        }}
      >
        先别急着责怪自己，听身体说完。
      </div>
    </AbsoluteFill>
  );
};
