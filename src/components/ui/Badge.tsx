import type { CSSProperties, PropsWithChildren } from "react";
import { theme } from "../../lib/theme";

export const Badge = ({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) => (
  <div style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.primary}`, borderRadius: 999, color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: 22, padding: "10px 20px", ...style }}>
    {children}
  </div>
);
