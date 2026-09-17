import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PSYCHOLOGY_STRUCTURE_DURATION = 240;

type CardSpec = {
  label: string;
  descriptor?: string;
  accent: string;
  accentDark: string;
  face: string;
  top: number;
  rotation: number;
};

const cards: CardSpec[] = [
  // 以主色 #527DCE 为核心，搭配雾蓝、蓝灰和低饱和蓝绿，保持高级的同色系层次。
  { label: "本我", accent: "#527DCE", accentDark: "#35579A", face: "#EEF3FF", top: 420, rotation: -3 },
  { label: "自我", accent: "#6C88BE", accentDark: "#465F8D", face: "#F1F4FA", top: 790, rotation: 2 },
  { label: "超我", accent: "#6C95A7", accentDark: "#466D7D", face: "#EEF5F7", top: 1160, rotation: -2 },
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const entranceProgress = (frame: number, delay: number, fps: number) =>
  clamp01(
    spring({
      frame: frame - delay,
      fps,
      config: { damping: 18, mass: 0.85, stiffness: 105 },
    }),
  );

/** 第三镜头：弗洛伊德的“本我、自我和超我”三张 3D 卡片依次进入。 */
export const PsychologyStructureScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const exitOpacity = interpolate(frame, [PSYCHOLOGY_STRUCTURE_DURATION - 20, PSYCHOLOGY_STRUCTURE_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ambientDrift = Math.sin(frame * 0.035) * 5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F4F7FC",
        color: "#1B2533",
        fontFamily: '"Source Han Sans SC", "思源黑体", "Noto Sans CJK SC", sans-serif',
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.98) 0%, rgba(244,247,252,0.92) 48%, rgba(221,231,248,0.92) 100%)",
        }}
      />

      <div
        style={{
          border: "2px solid rgba(82,125,206,0.14)",
          borderRadius: "50%",
          height: 880,
          left: "50%",
          opacity: 0.85,
          position: "absolute",
          top: 250,
          translate: `-50% ${ambientDrift}px`,
          width: 880,
        }}
      />
      <div
        style={{
          backgroundColor: "#527DCE",
          borderRadius: "50%",
          filter: "blur(1px)",
          height: 22,
          left: 86,
          opacity: 0.34,
          position: "absolute",
          top: 330 + ambientDrift,
          width: 22,
        }}
      />
      <div
        style={{
          backgroundColor: "#F47D6B",
          borderRadius: "50%",
          height: 16,
          opacity: 0.3,
          position: "absolute",
          right: 92,
          top: 1010 - ambientDrift,
          width: 16,
        }}
      />

      <div style={{ left: 80, position: "absolute", right: 80, top: 150 }}>
        <div
          style={{
            color: "#527DCE",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 7,
            opacity: interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
          }}
        >
          精神分析视角
        </div>
        <div
          style={{
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: 2,
            marginTop: 22,
            opacity: interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
          }}
        >
          心理活动的三种力量
        </div>
        <div
          style={{
            backgroundColor: "#527DCE",
            height: 5,
            marginTop: 28,
            opacity: 0.26,
            transformOrigin: "left center",
            scale: interpolate(frame, [16, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
            width: 190,
          }}
        />
      </div>

      {cards.map((card, index) => {
        const progress = entranceProgress(frame, 22 + index * 42, fps);
        const x = interpolate(progress, [0, 1], [410, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const rotateY = interpolate(progress, [0, 1], [54, card.rotation], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const rotateZ = interpolate(progress, [0, 1], [index % 2 === 0 ? 8 : -8, card.rotation * 0.45], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const scale = interpolate(progress, [0, 1], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const cardFloat = progress > 0.99 ? Math.sin((frame - index * 10) * 0.045) * 2.5 : 0;
        const cardOpacity = interpolate(progress, [0, 0.12, 1], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <div
            key={card.label}
            style={{
              height: 300,
              left: "50%",
              marginLeft: -410,
              opacity: cardOpacity,
              perspective: 1400,
              position: "absolute",
              top: card.top,
              transform: `translate3d(${x}px, ${cardFloat}px, 0) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
              transformOrigin: "50% 50%",
              transformStyle: "preserve-3d",
              width: 820,
            }}
          >
            <div
              style={{
                backgroundColor: card.accentDark,
                borderRadius: 32,
                bottom: -20,
                left: 20,
                position: "absolute",
                right: -20,
                top: 20,
                transform: "translateZ(-22px)",
              }}
            />
            <div
              style={{
                backgroundColor: card.face,
                border: `4px solid ${card.accent}`,
                borderRadius: 32,
                boxShadow: "0 28px 54px rgba(41, 65, 104, 0.18)",
                inset: 0,
                overflow: "hidden",
                position: "absolute",
              }}
            >
              <div style={{ backgroundColor: card.accent, height: 16, left: 0, position: "absolute", right: 0, top: 0 }} />
              <div style={{ alignItems: "center", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "0 54px", textAlign: "center" }}>
                <div style={{ color: card.accentDark, fontSize: 90, fontWeight: 800, letterSpacing: 8, lineHeight: 1 }}>{card.label}</div>
                {card.descriptor ? <div style={{ color: "#667085", fontSize: 32, fontWeight: 500, letterSpacing: 1, marginTop: 20 }}>{card.descriptor}</div> : null}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          bottom: 128,
          color: "#6E7788",
          fontSize: 26,
          letterSpacing: 3,
          left: 80,
          opacity: interpolate(frame, [150, 178], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
          position: "absolute",
          right: 80,
          textAlign: "center",
        }}
      >
        本我 · 自我 · 超我
      </div>
    </AbsoluteFill>
  );
};
