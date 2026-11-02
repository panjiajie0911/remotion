import type {CSSProperties, ReactNode} from "react";
import {theme} from "../lib/theme";

export const emphasisStyle: CSSProperties = {
  color: theme.palette.ink,
  fontWeight: theme.typography.weight.semibold,
  textDecorationColor: theme.palette.mark,
  textDecorationLine: "underline",
  textDecorationThickness: "0.07em",
  textUnderlineOffset: "0.14em",
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Splits a line around the approved emphasis words and marks them with the gold rule. */
export const renderEmphasis = (line: string, words?: string[]): ReactNode => {
  const matches = (words ?? []).filter(Boolean);
  if (!matches.length) return line;
  const pattern = new RegExp(`(${matches.map(escapeRegExp).join("|")})`, "g");
  return line.split(pattern).map((part, index) =>
    matches.includes(part) ? (
      <span key={`${part}-${index}`} style={emphasisStyle}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};
