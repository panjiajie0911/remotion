import { AbsoluteFill } from "remotion";
import { FadeIn } from "../components";
import { theme } from "../lib/theme";

export const OutroScene = () => (
  <AbsoluteFill style={{ alignItems: "center", backgroundColor: theme.colors.surface, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", textAlign: "center" }}>
    <FadeIn>
      <div style={{ color: theme.colors.accent, fontFamily: theme.fonts.sans, fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>给自己一点理解</div>
    </FadeIn>
    <FadeIn delay={8}>
      <div style={{ color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: 56, fontWeight: 700, lineHeight: 1.25, marginTop: 28 }}>你不是太敏感，<br />你只是曾经受过伤。</div>
    </FadeIn>
  </AbsoluteFill>
);
