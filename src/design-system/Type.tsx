import type { CSSProperties, ReactNode } from "react";
import { theme } from "../lib/theme";

type TextProps = { children: ReactNode; style?: CSSProperties };

export const Eyebrow = ({ children, style }: TextProps) => (
  <div
    style={{
      color: theme.palette.inkMuted,
      fontFamily: theme.fonts.sans,
      fontSize: theme.typography.size.meta,
      fontWeight: theme.typography.weight.medium,
      letterSpacing: theme.typography.tracking.eyebrow,
      lineHeight: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Headline = ({ children, style }: TextProps) => (
  <div
    style={{
      color: theme.palette.ink,
      fontFamily: theme.fonts.sans,
      fontSize: theme.typography.size.title,
      fontWeight: theme.typography.weight.semibold,
      letterSpacing: theme.typography.tracking.title,
      lineHeight: theme.typography.lineHeight.tight,
      textWrap: "balance",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Meta = ({ children, style }: TextProps) => (
  <div
    style={{
      color: theme.palette.inkMuted,
      fontFamily: theme.fonts.sans,
      fontSize: theme.typography.size.meta,
      fontWeight: theme.typography.weight.regular,
      letterSpacing: theme.typography.tracking.meta,
      lineHeight: theme.typography.lineHeight.relaxed,
      ...style,
    }}
  >
    {children}
  </div>
);

/** The only decorative mark in the system: a 56 x 2 rule. */
export const Rule = ({ tone = "mark", width = theme.layout.ruleWidth }: { tone?: "mark" | "line"; width?: number }) => (
  <div
    aria-hidden
    style={{
      backgroundColor: tone === "mark" ? theme.palette.mark : theme.palette.line,
      height: theme.layout.ruleHeight,
      width,
    }}
  />
);
