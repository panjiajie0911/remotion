const palette = {
  canvas: "#F5F6F7",
  surface: "#FFFFFF",
  ink: "#15171C",
  inkMuted: "#6C7480",
  inkFaint: "#9BA2AC",
  line: "#E2E5E9",
  accent: "#527DCE",
  accentDeep: "#33539B",
  accentSoft: "#E9EFFA",
  mark: "#C3A66B",
  night: "#0F1115",
  nightRaised: "#171A20",
  danger: "#C4553F",
  transparent: "transparent",
} as const;

export const theme = {
  palette,
  colors: {
    background: palette.canvas,
    surface: palette.surface,
    primary: palette.accent,
    accent: palette.accent,
    text: palette.ink,
    muted: palette.inkMuted,
    border: palette.line,
    onDark: palette.surface,
    dark: palette.night,
    transparent: palette.transparent,
    danger: palette.danger,
  },
  fonts: {
    // Install or load the font files before rendering on another machine.
    sans: '"Source Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  // Pixel values are authored for a 1080 x 1920 composition.
  typography: {
    size: {
      micro: 24,
      meta: 30,
      label: 28,
      caption: 40,
      body: 40,
      lead: 48,
      heading: 64,
      title: 88,
      display: 120,
    },
    weight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1.12, snug: 1.28, normal: 1.4, relaxed: 1.6 },
    // Negative tracking tightens display sizes; positive tracking opens small caps.
    tracking: { display: -3, title: -2, heading: -1, body: 0, meta: 2, eyebrow: 6 },
    letterSpacing: 0,
  },
  // Shared 12-grid rhythm for 1080 x 1920 frames. All values are 8-based.
  layout: {
    width: 1080,
    height: 1920,
    marginX: 88,
    marginTop: 144,
    marginBottom: 208,
    contentWidth: 904,
    safeBottom: 320,
    ruleWidth: 56,
    ruleHeight: 2,
    avatar: 96,
    avatarLarge: 320,
  },
  spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64, section: 96 },
  radius: { none: 0, sm: 4, md: 8, pill: 999 },
  borderWidth: { thin: 1, normal: 2 },
  shadow: { none: "none", soft: "0 8px 32px rgba(21, 23, 28, 0.08)" },
  // Full-frame overlays. Only the scrim is reused; never stack both.
  overlay: {
    scrim:
      "linear-gradient(180deg, rgba(10,12,16,0) 0%, rgba(10,12,16,0.18) 40%, rgba(10,12,16,0.58) 66%, rgba(10,12,16,0.84) 86%, rgba(10,12,16,0.9) 100%)",
    veil:
      "linear-gradient(180deg, rgba(10,12,16,0.58) 0%, rgba(10,12,16,0.12) 40%, rgba(10,12,16,0.70) 100%)",
  },
  motion: {
    // Seconds: convert with Math.round(seconds * fps) at the call site.
    durationSeconds: { fast: 0.3, normal: 0.45, slow: 0.6 },
    easing: [0.16, 1, 0.3, 1],
    enterOffset: 16,
    rise: 14,
    staggerSeconds: 0.06,
    // Frame counts for effects that must stay frame-locked to the edit.
    frames: { captionIn: 8, captionOut: 6 },
  },
  video: {
    width: 1080,
    height: 1920,
    fps: 30,
    // Starting margins only; check against each platform's current overlays.
    safeArea: { top: 160, right: 160, bottom: 320, left: 80 },
  },
  audio: {
    // Caption data is maintained separately from these shared styles.
    // Linear Remotion volume values, not loudness normalization targets.
    volume: { voice: 1, music: 0.12, effect: 0.2 },
    musicEnabled: false,
  },
  captions: {
    maxWidth: 760,
    bottom: 200,
    background: "rgba(255, 255, 255, 0.92)",
    fadeSeconds: 0.15,
    slide: {
      enterOffsetY: 80,
      exitOffsetY: 140,
      exitSeconds: 0.9,
      enterSpring: { damping: 20, stiffness: 120 },
      exitSpring: { damping: 26, stiffness: 100 },
    },
    maxCharacters: 32,
    // Burned-in captions over footage: no outline, only a bottom scrim.
    onVideo: {
      bottom: 208,
      maxWidth: 820,
      size: 48,
      weight: 500,
      lineHeight: 1.5,
      tracking: 1,
      color: "#F7F6F3",
      shadow: "0 2px 18px rgba(6, 8, 12, 0.5)",
    },
  },
} as const;

export type Theme = typeof theme;
