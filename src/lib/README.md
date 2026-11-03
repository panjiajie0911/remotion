# Shared design tokens

Import `theme` from `src/lib/theme.ts` using the relative path from your component.

```tsx
import { theme } from "../../lib/theme";

const style = {
  color: theme.colors.text,
  backgroundColor: theme.colors.background,
  fontFamily: theme.fonts.sans,
  fontSize: theme.typography.size.body,
  fontWeight: theme.typography.weight.regular,
  lineHeight: theme.typography.lineHeight.normal,
  padding: theme.spacing.xl,
};
```

Pixel sizes target 1080 x 1920. Existing compositions are not automatically resized.
Safe-area margins are starting values, not platform guarantees.

Motion durations use seconds. Convert with `Math.round(seconds * fps)` from
`useVideoConfig()`. Pass `...theme.motion.easing` to `Easing.bezier()`.

Noto Sans SC ships as an OFL variable subset at
`src/assets/font/NotoSansSC-VF-subset.woff2` and is declared in `src/lib/fonts.css`.
The subset covers the glyphs currently authored in `src/`. If copy gains new
characters, rebuild it with `fonttools` from the upstream `NotoSansSC[wght].ttf`
so those glyphs do not fall back to a system font.

Audio volumes are linear multipliers, not dB or LUFS targets. Music is disabled
by default; recordings still need individual level checks.
