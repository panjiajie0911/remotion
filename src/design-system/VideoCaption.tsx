import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../lib/theme";

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

/** Stable bottom gradient so captions never sit directly on busy footage. */
export const CaptionScrim = () => (
  <AbsoluteFill aria-hidden style={{ background: theme.overlay.scrim, pointerEvents: "none" }} />
);

export type VideoCaptionProps = {
  text: string;
  secondLine?: string;
  /** Frame in the scaled scene clock at which this cue becomes visible. */
  from: number;
  /** Scene clock compression, matching the narration timeline. */
  timeScale?: number;
};

/**
 * Burned-in caption for footage: one ground scrim, one type size, no outline.
 * Each line stays a block element so long lines wrap instead of collapsing.
 */
export const VideoCaption = ({ text, secondLine, from, timeScale = 1 }: VideoCaptionProps) => {
  const frame = useCurrentFrame() / timeScale;
  const progress = interpolate(frame - from, [0, theme.motion.frames.captionIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutCubic,
  });
  const style = theme.captions.onVideo;

  return (
    <div
      style={{
        bottom: style.bottom,
        left: theme.layout.marginX,
        opacity: progress,
        pointerEvents: "none",
        position: "absolute",
        right: theme.layout.marginX,
        textAlign: "center",
        translate: `0 ${theme.motion.rise * (1 - progress)}px`,
      }}
    >
      <div
        style={{
          color: style.color,
          fontFamily: theme.fonts.sans,
          fontSize: style.size,
          fontWeight: style.weight,
          letterSpacing: style.tracking,
          lineHeight: style.lineHeight,
          margin: "0 auto",
          maxWidth: style.maxWidth,
          overflowWrap: "anywhere",
          textShadow: style.shadow,
          textWrap: "balance",
          whiteSpace: "pre-line",
        }}
      >
        <div>{text}</div>
        {secondLine ? <div>{secondLine}</div> : null}
      </div>
    </div>
  );
};
