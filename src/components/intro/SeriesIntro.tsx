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
  eyebrow?: string;
  footer?: string;
};

/** Shared 3-second opening card for every episode in the series. */
export const SeriesIntro = ({
  title,
  emphasisLine = 1,
  emphasisLines,
  eyebrow,
  footer = "",
}: SeriesIntroProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const avatar = getStaticFiles().find((file) => file.name === "shared/avatar.png")?.src;
  const ease = Easing.bezier(...theme.motion.easing);
  const lines = (Array.isArray(title) ? title : title.split(/\r?\n/)).filter(Boolean);
  const highlightedLines = emphasisLines ?? [emphasisLine];
  const reveal = (start: number, duration = theme.motion.durationSeconds.normal) =>
    interpolate(frame, [start, start + Math.round(duration * fps)], [0, 1], {
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

        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center" }}>
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
                {line}
              </div>
            );
          })}
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: theme.spacing.lg, minHeight: theme.layout.avatar }}>
          {avatar ? (
            <div
              style={{
                border: `${theme.borderWidth.thin}px solid ${theme.palette.line}`,
                borderRadius: "50%",
                height: theme.layout.avatar,
                opacity: reveal(34),
                overflow: "hidden",
                width: theme.layout.avatar,
              }}
            >
              <Img src={avatar} style={{ height: "100%", objectFit: "cover", width: "100%" }} />
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
