import type {CSSProperties} from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {theme} from "../../../lib/theme";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderEmphasis = (value: string, words?: string[]) => {
  const matches = (words ?? []).filter(Boolean);
  if (!matches.length) return value;
  const pattern = new RegExp(`(${matches.map(escapeRegExp).join("|")})`, "g");
  return value.split(pattern).map((part, index) =>
    matches.includes(part) ? (
      <span key={`${part}-${index}`} style={{color: theme.palette.mark, fontWeight: 600}}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export type SubtitleTrackProps = {
  /** One subtitle line per entry. Only one is ever on screen. */
  lines: string[];
  from: number;
  until: number;
  emphasisWords?: string[];
};

const weightOf = (line: string) => Math.max(4, line.replace(/[，。、；：！？,.;:!?"“”]/g, "").length);

export const SubtitleTrack = ({lines, from, until, emphasisWords}: SubtitleTrackProps) => {
  const frame = useCurrentFrame();
  const span = Math.max(1, until - from);
  const total = lines.reduce((sum, line) => sum + weightOf(line), 0);

  let cursor = from;
  const windows = lines.map((line) => {
    const length = Math.max(10, Math.round((span * weightOf(line)) / total));
    const window = {line, start: cursor, end: cursor + length};
    cursor += length;
    return window;
  });

  const active = windows.find((window) => frame >= window.start && frame < window.end) ?? null;
  if (!active) return null;

  const local = frame - active.start;
  const length = active.end - active.start;
  const fadeIn = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(local, [length - 6, length], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const style = theme.captions.onVideo;

  const container: CSSProperties = {
    bottom: style.bottom,
    left: theme.layout.marginX,
    opacity: Math.min(fadeIn, fadeOut),
    pointerEvents: "none",
    position: "absolute",
    right: theme.layout.marginX,
    textAlign: "center",
    translate: `0 ${10 * (1 - fadeIn)}px`,
  };

  return (
    <div style={container}>
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
        }}
      >
        {renderEmphasis(active.line, emphasisWords)}
      </div>
    </div>
  );
};
