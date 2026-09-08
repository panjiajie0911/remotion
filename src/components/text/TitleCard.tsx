import type { CSSProperties } from "react";
import { theme } from "../../lib/theme";

type TitleCardProps = { eyebrow: string; title: string; subtitle?: string; style?: CSSProperties };

export const TitleCard = ({ eyebrow, title, subtitle, style }: TitleCardProps) => (
  <div style={{ fontFamily: theme.fonts.sans, ...style }}>
    <div style={{ color: theme.colors.accent, fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>{eyebrow}</div>
    <div style={{ color: theme.colors.text, fontSize: 76, fontWeight: 800, lineHeight: 1.08, marginTop: 18 }}>{title}</div>
    {subtitle ? <div style={{ color: theme.colors.muted, fontSize: 28, marginTop: 22 }}>{subtitle}</div> : null}
  </div>
);
