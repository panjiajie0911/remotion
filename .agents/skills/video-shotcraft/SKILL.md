---
name: video-shotcraft
description: Design and implement cinematic Remotion product videos using shot recipes, product-grounded visual direction, beat-synced timelines, deterministic rendering, and staged quality review.
---

# Video Shotcraft

Use this skill when creating a cinematic product video, product demo, launch film, or a single Remotion shot.

## Modes

Choose one mode before production:

1. **Template mode** — reuse an existing shot structure and swap in the product's screenshots, copy, and branding.
2. **Autonomous creative mode** — independently drive product understanding, visual direction, shot mapping, storyboard, asset capture, and final cut.
3. **Collaborative mode** — propose direction and pause for user confirmation at brief, decisions, visual direction, shot mapping, and storyboard checkpoints.
4. **Single shot mode** — adapt one shot recipe without producing a full video.

## Production rules

- Grow the visual language from the product's actual design system: type, spacing, color, materials, and UI patterns. Motion recipes provide timing and movement grammar, not a borrowed look.
- For product UI reproduction, use real captured screenshots at 2x resolution when available. Use hand-drawn UI only when the brief explicitly calls for illustration or abstraction.
- Give each shot one dominant motion idea. After the key information lands, hold the frame instead of adding constant motion.
- Drive all Remotion animation with `useCurrentFrame()`, `interpolate()`, `spring()`, `Sequence`, and related timeline primitives. Do not rely on CSS animation or browser scroll state for rendered motion.
- If music is used, determine its true BPM and phase, map events to beats, and verify sync within 3 frames. Export a music-scored version and, when requested, an SFX-only version.
- Use fixed-seed PRNGs for any randomization. Never use `Date.now()` or unseeded `Math.random()` in rendered visuals.
- Verify important shots incrementally with `npx remotion still` before rendering the complete video.
- Perform an independent final review for visual consistency, completeness, product fidelity, timing, and data safety.

## Remotion implementation guidance

- Keep shot components self-contained and parameterized by props such as copy, colors, screenshot paths, start frame, and duration.
- Use `staticFile()` for assets in `public/`.
- Prefer `@remotion/media` for video and audio layers, and use Remotion timing primitives for trimming and sequencing.
- For screenshot camera moves, animate `scale`, `translate`, and `rotate` from frame-based values. Avoid non-deterministic DOM measurements during rendering.
- For captions, preserve the spoken timing and keep one clear visual hierarchy per shot.
- Use the project's installed packages and existing components before adding dependencies.

## Asset checklist

Before implementation, identify:

- product screenshots or screen recordings;
- copy, captions, and brand fonts;
- logo and icons;
- music and sound effects with licensing notes;
- target aspect ratio, fps, duration, and output codec.

If the original upstream repository is unavailable, do not claim that its original recipe cards, Ink Press template, components, or audio library are present. Recreate only the requested shot using the rules above and assets actually available in the project.

## Useful references

- Remotion shot preview: `npx remotion still <composition-id> --frame <frame>`
- Remotion Studio: `npx remotion studio --no-open`
- Public inspiration gallery: https://vincentwei1021.github.io/video-shotcraft/
