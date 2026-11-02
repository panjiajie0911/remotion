import { AbsoluteFill, Easing, getStaticFiles, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../lib/theme";
import { Rule } from "../../design-system/Type";

export const SERIES_INTRO_DURATION = 90;

export type SeriesIntroProps = {
  /** One line per visual row. Newline-delimited strings are also supported. */
  title: string | string[];
  /** Which title row receives the accent emphasis treatment. */
  emphasisLine?: number;
  /** Multiple title rows can share the same emphasis treatment. */
  emphasisLines?: number[];
  /** Substrings inside title rows that receive the accent treatment. */
  emphasisWords?: string[];
  /** Second-beat line revealed after the title settles, e.g. a question hook. */
  hook?: string;
  eyebrow?: string;
  footer?: string;
  /** Diameter of the circular portrait. Defaults to the compact 96px mark. */
  avatarSize?: number;
};

/** Shared 3-second opening card for every episode in the series. */
export const SeriesIntro = ({
  title,
  emphasisLine = 1,
  emphasisLines,
  emphasisWords,
  hook,
  eyebrow,
  footer = "",
  avatarSize = theme.layout.avatar,
}: SeriesIntroProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const avatar = getStaticFiles().find((file) => file.name === "shared/avatar.png")?.src;
  const ease = Easing.bezier(...theme.motion.easing);
  const blink = interpolate(
    frame / fps,
    [1.35, 1.45, 1.5, 1.65, 2.15, 2.25, 2.3, 2.45, 4.55, 4.65, 4.7, 4.85, 5.35, 5.45, 5.5, 5.65],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    },
  );
  const lines = (Array.isArray(title) ? title : title.split(/\r?\n/)).filter(Boolean);
  const highlightedLines = emphasisLines ?? (emphasisWords?.length ? [] : [emphasisLine]);
  const renderTitleLine = (line: string) => {
    const word = emphasisWords?.find((candidate) => candidate.length > 0 && line.includes(candidate));
    if (!word) return line;
    const [before, ...rest] = line.split(word);
    return (
      <>
        {before}
        <span
          style={{
            color: theme.palette.ink,
            fontWeight: theme.typography.weight.semibold,
            textDecorationColor: theme.palette.mark,
            textDecorationLine: "underline",
            textDecorationThickness: "0.07em",
            textUnderlineOffset: "0.14em",
          }}
        >
          {word}
        </span>
        {rest.join(word)}
      </>
    );
  };
  const reveal = (start: number, duration = theme.motion.durationSeconds.normal) =>
    interpolate(frame, [start, start + Math.round(duration * fps)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
  // The shared card is three seconds; longer slots earn a second beat at 3s.
  const hookReveal = interpolate(frame, [Math.round(3 * fps), Math.round(3.6 * fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.palette.canvas,
        color: theme.palette.ink,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: `${theme.layout.marginTop}px ${theme.layout.marginX}px ${theme.layout.marginBottom}px`,
        }}
      >
        <div
          style={{
            color: theme.palette.inkMuted,
            fontSize: theme.typography.size.micro,
            fontWeight: theme.typography.weight.medium,
            letterSpacing: theme.typography.tracking.eyebrow,
            lineHeight: 1,
            minHeight: theme.typography.size.micro,
            opacity: reveal(6),
          }}
        >
          {eyebrow ?? ""}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            scale: interpolate(frame, [0, fps * 6], [1, 1.012], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transformOrigin: "left center",
            translate: `0 ${-theme.motion.rise * 2 * hookReveal}px`,
          }}
        >
          <div
            style={{
              marginBottom: theme.spacing.xxl,
              opacity: reveal(8),
              scale: `${interpolate(frame, [8, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })} 1`,
              transformOrigin: "left center",
            }}
          >
            <Rule />
          </div>

          {lines.map((line, index) => {
            const isEmphasis = highlightedLines.indexOf(index) !== -1;
            const start = 14 + index * 3;
            return (
              <div
                key={`${line}-${index}`}
                style={{
                  color: isEmphasis ? theme.palette.accent : theme.palette.ink,
                  fontSize: theme.typography.size.title,
                  fontWeight: isEmphasis ? theme.typography.weight.semibold : theme.typography.weight.medium,
                  letterSpacing: theme.typography.tracking.title,
                  lineHeight: theme.typography.lineHeight.tight,
                  marginTop: index === 0 ? 0 : theme.spacing.xs,
                  opacity: reveal(start),
                  overflowWrap: "anywhere",
                  textWrap: "balance",
                  translate: `0 ${theme.motion.rise * (1 - reveal(start))}px`,
                }}
              >
                {renderTitleLine(line)}
              </div>
            );
          })}

          {hook ? (
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: theme.spacing.md,
                height: theme.typography.size.lead * theme.typography.lineHeight.snug,
                marginTop: theme.spacing.xl,
                opacity: hookReveal,
                translate: `0 ${theme.motion.rise * (1 - hookReveal)}px`,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.palette.mark,
                  flexShrink: 0,
                  height: theme.borderWidth.normal,
                  width: theme.layout.ruleWidth,
                }}
              />
              <div
                style={{
                  color: theme.palette.inkMuted,
                  fontSize: theme.typography.size.lead,
                  fontWeight: theme.typography.weight.medium,
                  letterSpacing: theme.typography.tracking.meta,
                  lineHeight: theme.typography.lineHeight.snug,
                  whiteSpace: "nowrap",
                }}
              >
                {hook}
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: theme.spacing.lg, minHeight: avatarSize }}>
          {avatar ? (
            <div
              style={{
                border: `${theme.borderWidth.thin}px solid ${theme.palette.line}`,
                borderRadius: "50%",
                flexShrink: 0,
                height: avatarSize,
                opacity: reveal(34),
                overflow: "hidden",
                position: "relative",
                width: avatarSize,
              }}
            >
              <Img
                src={avatar}
                style={{
                  height: avatarSize * 1.35 * 1523 / 1204,
                  left: avatarSize * (1 - 1.35) / 2,
                  maxWidth: "none",
                  position: "absolute",
                  top: avatarSize * 0.05,
                  width: avatarSize * 1.35,
                }}
              />
              {blink > 0 ? [454, 685].map((eyeLeft) => {
                const scale = avatarSize * 1.35 / 1204;
                return (
                  <div key={eyeLeft} aria-hidden style={{
                    position: "absolute",
                    left: avatarSize * (1 - 1.35) / 2 + eyeLeft * scale,
                    top: avatarSize * 0.05 + 359 * scale,
                    width: 80 * scale,
                    height: 80 * scale,
                    overflow: "hidden",
                    borderRadius: "35%",
                  }}>
                    <Img
                      src={avatar}
                      style={{
                        height: avatarSize * 1.35 * 1523 / 1204,
                        left: -540 * scale,
                        maxWidth: "none",
                        position: "absolute",
                        top: -350 * scale,
                        width: avatarSize * 1.35,
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      borderRadius: "35%",
                      scale: `1 ${1 - blink * 0.9}`,
                    }}>
                      <Img
                        src={avatar}
                        style={{
                          height: avatarSize * 1.35 * 1523 / 1204,
                          left: -eyeLeft * scale,
                          maxWidth: "none",
                          position: "absolute",
                          top: -359 * scale,
                          width: avatarSize * 1.35,
                        }}
                      />
                    </div>
                  </div>
                );
              }) : null}
            </div>
          ) : null}
          <div
            style={{
              color: theme.palette.inkMuted,
              fontSize: theme.typography.size.micro,
              letterSpacing: theme.typography.tracking.meta,
              lineHeight: 1,
              opacity: reveal(38),
            }}
          >
            {footer}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
