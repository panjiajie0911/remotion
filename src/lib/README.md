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

The font stack does not download Source Han Sans. Supply and load licensed local
font files before requiring identical output across machines.

Audio volumes are linear multipliers, not dB or LUFS targets. Music is disabled
by default; recordings still need individual level checks.
