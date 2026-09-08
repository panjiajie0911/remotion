import { AbsoluteFill } from "remotion";
import { FadeIn } from "../components";
import { theme } from "../lib/theme";

export const OutroScene = () => (
  <AbsoluteFill style={{ alignItems: "center", backgroundColor: theme.colors.surface, display: "flex", justifyContent: "center" }}>
    <FadeIn><div style={{ color: theme.colors.text, fontFamily: theme.fonts.sans, fontSize: 42, fontWeight: 700 }}>下一条视频，继续复用。</div></FadeIn>
  </AbsoluteFill>
);
