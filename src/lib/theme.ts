export const theme = {
  colors: {
    background: "#F7F8FA",
    surface: "#F5F5F7",
    primary: "#527DCE",
    accent: "#527DCE",
    text: "#1D1D1F",
    muted: "#6E6E73",
    border: "#D2D2D7",
    onDark: "#FFF",
    dark: "#1D1D1F",
    transparent: "transparent",
  },
  fonts: {
    // Install or load the font files before rendering on another machine.
    sans: '"Source Han Sans SC", "思源黑体", "Noto Sans CJK SC", sans-serif',
  },
  // Pixel values are authored for a 1080 x 1920 composition.
  typography: {
    size: { label: 28, caption: 40, body: 40, heading: 64, title: 88, display: 120 },
    weight: { regular: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.15, normal: 1.4, relaxed: 1.6 },
    letterSpacing: 0,
  },
  spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64, section: 96 },
  radius: { none: 0, sm: 4, md: 8, pill: 999 },
  borderWidth: { thin: 1, normal: 2 },
  shadow: { none: "none", soft: "0 8px 32px rgba(29, 29, 31, 0.08)" },
  motion: {
    // Seconds: convert with Math.round(seconds * fps) at the call site.
    durationSeconds: { fast: 0.3, normal: 0.45, slow: 0.6 },
    easing: [0.16, 1, 0.3, 1],
    enterOffset: 16,
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
    bottom: 420,
    background: "rgba(255, 255, 255, 0.92)",
    fadeSeconds: 0.15,
    slide: {
      enterOffsetY: 80,
      exitOffsetX: 140,
      exitSeconds: 0.9,
      enterSpring: { damping: 20, stiffness: 120 },
      exitSpring: { damping: 26, stiffness: 100 },
    },
    maxCharacters: 32,
  },
} as const;

export type Theme = typeof theme;
