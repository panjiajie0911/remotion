import {Easing, interpolate, useCurrentFrame} from "remotion";
import {theme} from "../lib/theme";

export type ChapterCardProps = {
  /** Two-digit chapter number, e.g. "01". */
  index: string;
  label: string;
  detail: string;
  /** Scene frame where the card enters. */
  from?: number;
  /** Scene frame where the card starts leaving. */
  holdUntil?: number;
  /** Scene frame where the card has fully left. */
  exitUntil?: number;
};

/** Top-edge chapter marker that never competes with the bottom captions. */
export const ChapterCard = ({
  index,
  label,
  detail,
  from = 0,
  holdUntil = 62,
  exitUntil = 80,
}: ChapterCardProps) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  if (local < 0) return null;

  const ease = Easing.bezier(...theme.motion.easing);
  const enter = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const exit = interpolate(local, [holdUntil - from, exitUntil - from], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * exit;
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(10,12,16,0.62) 0%, rgba(10,12,16,0.26) 58%, rgba(10,12,16,0) 100%)",
        left: 0,
        opacity,
        padding: `${theme.layout.marginTop}px ${theme.layout.marginX}px ${theme.spacing.section}px`,
        pointerEvents: "none",
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          gap: theme.spacing.lg,
          translate: `0 ${theme.motion.rise * (1 - enter)}px`,
        }}
      >
        <div
          style={{
            color: theme.palette.mark,
            fontSize: theme.typography.size.display,
            fontWeight: theme.typography.weight.light,
            letterSpacing: theme.typography.tracking.display,
            lineHeight: 1,
          }}
        >
          {index}
        </div>
        <div style={{paddingTop: theme.spacing.sm}}>
          <div
            style={{
              backgroundColor: theme.palette.mark,
              height: theme.borderWidth.normal,
              marginBottom: theme.spacing.md,
              width: theme.layout.ruleWidth,
            }}
          />
          <div
            style={{
              color: theme.palette.surface,
              fontSize: theme.typography.size.heading,
              fontWeight: theme.typography.weight.semibold,
              letterSpacing: theme.typography.tracking.heading,
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: theme.palette.surface,
              fontSize: theme.typography.size.label,
              fontWeight: theme.typography.weight.regular,
              letterSpacing: theme.typography.tracking.meta,
              marginTop: theme.spacing.sm,
              opacity: 0.72,
            }}
          >
            {detail}
          </div>
        </div>
      </div>
    </div>
  );
};
