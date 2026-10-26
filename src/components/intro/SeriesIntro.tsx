import { AbsoluteFill, Easing, getStaticFiles, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../lib/theme";

export const SERIES_INTRO_DURATION = 90;

export type SeriesIntroProps = {
  /** One line per visual row. Newline-delimited strings are also supported. */
  title: string | string[];
  /** Which title row receives the blue emphasis treatment. */
  emphasisLine?: number;
  /** Multiple title rows can share the same emphasis treatment. */
  emphasisLines?: number[];
  eyebrow?: string;
  footer?: string;
};

/** Shared 3-second opening card for every episode in the series. */
export const SeriesIntro = ({
  title,
  emphasisLine = 1,
  emphasisLines,
  eyebrow,
  footer = ""
}: SeriesIntroProps) => {
  const frame = useCurrentFrame();
  const avatar = getStaticFiles().find((file) => file.name === "shared/avatar.png")?.src;
  const { fps } = useVideoConfig();
  // Coordinates refer to the 1204 × 1523 source avatar; all layers zoom together.
  const avatarRatio = 1480 / 1523;
  const blink = interpolate(frame / fps, [1.35, 1.45, 1.5, 1.65, 2.15, 2.25, 2.3, 2.45], [0, 1, 1, 0, 0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const lines = (Array.isArray(title) ? title : title.split(/\r?\n/)).filter(Boolean);
  const highlightedLines = emphasisLines ?? [emphasisLine];
  const show = (start: number, duration = 0.42) =>
    interpolate(frame, [start, start + Math.round(duration * fps)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
  const imageScale = interpolate(frame, [0, SERIES_INTRO_DURATION], [0.92, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const wash = interpolate(frame, [0, 45, SERIES_INTRO_DURATION], [0.98, 0.72, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F7FF", color: theme.colors.text, fontFamily: theme.fonts.sans, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.98) 0%, rgba(232,240,255,0.9) 42%, rgba(210,224,250,0.98) 100%)", opacity: wash }} />
      {avatar ? (
        <div style={{ bottom: -140, width: 1204 * avatarRatio, height: 1480, left: "50%", opacity: 0.9, position: "absolute", translate: "-50% 0", scale: imageScale }}>
          <Img src={avatar} style={{ width: "100%", height: "100%" }} />
          {blink > 0 ? [454, 685].map((eyeLeft) => (
            <div key={eyeLeft} aria-hidden style={{
              position: "absolute",
              left: eyeLeft * avatarRatio,
              top: 359 * avatarRatio,
              width: 80 * avatarRatio,
              height: 80 * avatarRatio,
              overflow: "hidden",
              borderRadius: "35%",
            }}>
              {/* Sample nearby blank skin from the source to retain its texture. */}
              <Img src={avatar} style={{ position: "absolute", width: 1204 * avatarRatio, height: 1480, maxWidth: "none", left: -540 * avatarRatio, top: -350 * avatarRatio }} />
              <div style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                borderRadius: "35%",
                scale: `1 ${1 - blink * 0.9}`,
              }}>
                <Img src={avatar} style={{ position: "absolute", width: 1204 * avatarRatio, height: 1480, maxWidth: "none", left: -eyeLeft * avatarRatio, top: -359 * avatarRatio }} />
              </div>
            </div>
          )) : null}
        </div>
      ) : null}

      {eyebrow ? (
        <div style={{ color: theme.colors.accent, fontSize: 28, fontWeight: 700, left: 80, letterSpacing: 5, opacity: show(6), position: "absolute", right: 80, top: 112 }}>
          {eyebrow}
        </div>
      ) : null}
      <div style={{ left: 80, position: "absolute", right: 80, top: 175 }}>
        {lines.map((line, index) => {
          const isEmphasis = highlightedLines.indexOf(index) !== -1;
          const start = 12 + index * 18;
          return (
            <div
              key={`${line}-${index}`}
              style={{
                color: isEmphasis ? theme.colors.accent : theme.colors.text,
                fontSize: isEmphasis ? 102 : index === lines.length - 1 ? 50 : 70,
                fontWeight: isEmphasis ? 800 : index === lines.length - 1 ? 700 : 500,
                letterSpacing: isEmphasis ? -2 : index === lines.length - 1 ? 3 : 1,
                lineHeight: 1.18,
                marginTop: index === 0 ? 0 : 12,
                opacity: show(start),
                translate: `0 ${interpolate(frame, [start, start + 18], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}px`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
      {footer ? (
        <div style={{ bottom: 260, color: theme.colors.muted, fontSize: 28, left: 80, opacity: show(66), position: "absolute", right: 80 }}>
          {footer}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
