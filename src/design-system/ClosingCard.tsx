import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {theme} from "../lib/theme";
import {Rule} from "./Type";

export type ClosingCardProps = {
  /** Scene frame where the card starts fading in. */
  start: number;
  /** Scene frame where the episode ends. */
  end: number;
  kicker?: string;
  lines: string[];
  footer?: string;
};

/** Shared end card: veil, kicker, gold rule, sign-off lines, episode note. */
export const ClosingCard = ({start, end, kicker = "", lines, footer = ""}: ClosingCardProps) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const total = end - start;
  const fadeStart = total - 18;
  const ease = Easing.bezier(...theme.motion.easing);
  const reveal = (from: number, duration = 12) =>
    interpolate(local - from, [0, duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
  const veil = interpolate(local, [0, 18, fadeStart, total], [0, 0.78, 0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentOut = interpolate(local, [fadeStart, total - 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(local, [0, total], [1, 1.015], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <AbsoluteFill style={{backgroundColor: theme.palette.night, opacity: veil}} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          inset: 0,
          justifyContent: "center",
          opacity: contentOut,
          padding: `0 ${theme.layout.marginX}px`,
          position: "absolute",
        }}
      >
        <div style={{scale: drift, transformOrigin: "left center"}}>
          <div
            style={{
              color: theme.palette.inkFaint,
              fontSize: theme.typography.size.meta,
              fontWeight: theme.typography.weight.medium,
              letterSpacing: theme.typography.tracking.eyebrow,
              lineHeight: 1,
              opacity: reveal(15),
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              marginBottom: theme.spacing.xl,
              marginTop: theme.spacing.xl,
              opacity: reveal(24),
              scale: `${reveal(24)} 1`,
              transformOrigin: "left center",
              width: theme.layout.ruleWidth,
            }}
          >
            <Rule />
          </div>
          <div
            style={{
              color: theme.palette.surface,
              fontSize: theme.typography.size.display,
              fontWeight: theme.typography.weight.semibold,
              letterSpacing: theme.typography.tracking.display,
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            {lines.map((line, index) => {
              const at = 33 + index * 7;
              return (
                <div
                  key={line}
                  style={{
                    opacity: reveal(at),
                    translate: `0 ${theme.motion.rise * (1 - reveal(at))}px`,
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          bottom: theme.layout.safeBottom,
          color: theme.palette.inkFaint,
          fontSize: theme.typography.size.micro,
          left: theme.layout.marginX,
          letterSpacing: theme.typography.tracking.meta,
          opacity: reveal(60) * contentOut,
          position: "absolute",
        }}
      >
        {footer}
      </div>
    </AbsoluteFill>
  );
};
