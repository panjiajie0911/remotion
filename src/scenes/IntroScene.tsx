import { AbsoluteFill } from "remotion";
import { Badge, FadeIn, TitleCard } from "../components";
import { theme } from "../lib/theme";

export const IntroScene = () => (
  <AbsoluteFill style={{ backgroundColor: theme.colors.background, padding: "120px 110px" }}>
    <FadeIn><Badge>REUSABLE VIDEO KIT</Badge></FadeIn>
    <FadeIn delay={8} style={{ marginTop: 90 }}>
      <TitleCard eyebrow="REMOTION PROJECT" title="组件化制作" subtitle="把常用的视觉元素，变成可以反复组合的积木。" />
    </FadeIn>
  </AbsoluteFill>
);
