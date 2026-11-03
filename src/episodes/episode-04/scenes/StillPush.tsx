import type {CSSProperties} from "react";
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim, VideoCaption} from "../../../design-system";
import type {CaptionCue} from "../../../design-system";

export type StillPushProps = {
  src: string;
  durationInFrames: number;
  cues?: CaptionCue[];
  /** Total push-in over the shot, e.g. 0.08 for +8%. */
  push?: number;
  /** Breathing amplitude, e.g. 0.004 for 0.4%. */
  breath?: number;
  /** Vertical breathing drift in px at 1080x1920. */
  breathDrift?: number;
  /** Extra horizontal drift in px (parallax on stills). */
  driftX?: number;
  objectPosition?: string;
  style?: CSSProperties;
};

export const StillPush = ({
  src,
  durationInFrames,
  cues = [],
  push = 0.08,
  breath = 0.004,
  breathDrift = 3,
  driftX = 0,
  objectPosition = "50% 50%",
  style,
}: StillPushProps) => {
  const frame = useCurrentFrame();
  const t = frame / durationInFrames;

  const pushScale = 1 + push * interpolate(t, [0, 1], [0, 1], {
    easing: Easing.bezier(0.33, 0, 0.28, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breathe = 1 + breath * Math.sin(t * Math.PI * 2 * 1.1);
  const driftY = breathDrift * Math.sin(t * Math.PI * 2 * 1.1 + 0.9);
  const light = 1 + 0.012 * Math.sin(t * Math.PI * 2 * 0.8 + 0.4);

  const cue = cues.find((item) => frame >= item.from);

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden", ...style}}>
      <Img
        src={src}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          objectPosition,
          maxWidth: "none",
          transform: `scale(${pushScale * breathe}) translate(${driftX * t}px, ${driftY}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 55% at 22% 18%, rgba(255,214,150,0.16) 0%, rgba(255,214,150,0) 70%)",
          mixBlendMode: "screen",
          opacity: light,
          pointerEvents: "none",
        }}
      />
      <CaptionScrim />
      {cue ? (
        <VideoCaption
          from={cue.from}
          text={cue.text}
          secondLine={cue.secondLine}
          until={cue.until}
          emphasisWords={cue.emphasis ? [cue.emphasis] : undefined}
        />
      ) : null}
    </AbsoluteFill>
  );
};
