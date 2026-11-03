import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../lib/theme";

export type SceneFrameProps = {
  children: ReactNode;
  tone?: "canvas" | "night";
  /** Small label pinned to the top margin, e.g. a chapter or section name. */
  eyebrow?: string;
  /** Small label pinned to the bottom margin, e.g. a source or episode note. */
  footer?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
};

/**
 * Shared full-frame container: one ground colour, one margin system, one
 * type family. Scenes only contribute content inside it.
 */
export const SceneFrame = ({
  children,
  tone = "canvas",
  eyebrow,
  footer,
  style,
  contentStyle,
}: SceneFrameProps) => {
  const isNight = tone === "night";
  const ink = isNight ? theme.palette.surface : theme.palette.ink;
  const faint = isNight ? theme.palette.inkFaint : theme.palette.inkMuted;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isNight ? theme.palette.night : theme.palette.canvas,
        color: ink,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
        ...style,
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
            color: faint,
            fontSize: theme.typography.size.micro,
            fontWeight: theme.typography.weight.medium,
            letterSpacing: theme.typography.tracking.eyebrow,
            lineHeight: 1,
            minHeight: theme.typography.size.micro,
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
            ...contentStyle,
          }}
        >
          {children}
        </div>
        <div
          style={{
            color: faint,
            fontSize: theme.typography.size.micro,
            letterSpacing: theme.typography.tracking.meta,
            lineHeight: 1,
            minHeight: theme.typography.size.micro,
          }}
        >
          {footer ?? ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};
