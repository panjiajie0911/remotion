import React from "react";
import {
  AbsoluteFill,
  Freeze,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { loadFont as loadBebasNeue } from "@remotion/google-fonts/BebasNeue";

// Remotion Studio generated Google Font loading
loadBebasNeue("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export type VideoMaskShotProps = {
  video: string;
  kicker: string;
  title: React.ReactNode;
  description: React.ReactNode;
  cause?: React.ReactNode;
  videoFrames?: number;
  freezeFrames?: number;
  durationInFrames?: number;
  accentColor?: string;
};

export const VideoMaskShot = ({
  video,
  kicker,
  description,
  cause,
  videoFrames = 120,
  freezeFrames = 12,
  durationInFrames = 240,
  accentColor = "#ff806f",
}: VideoMaskShotProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blurStart = videoFrames + freezeFrames;
  const blur = interpolate(frame, [blurStart, blurStart + 18], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const veil = interpolate(frame, [blurStart, blurStart + 18], [0, 0.34], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [blurStart + 12, blurStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [blurStart + 12, blurStart + 30], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const src = staticFile(video);
  const style = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    filter: `blur(${blur}px)`,
    transform: "scale(1.035)",
  };
  return (
    <AbsoluteFill
      style={{
        background: "#0d1014",
        overflow: "hidden",
        fontFamily: "Bebas Neue",
      }}
    >
      <OffthreadVideo src={src} muted endAt={videoFrames} style={style} />
      {frame >= videoFrames && (
        <Freeze frame={videoFrames - 1}>
          <OffthreadVideo src={src} muted style={style} />
        </Freeze>
      )}
      <AbsoluteFill style={{ background: `rgba(255,255,255,${veil})` }} />
      <div
        style={{
          position: "absolute",
          width: "80%",
          left: "50%",
          top: "50%",
          opacity,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            fontSize: "11rem",
            letterSpacing: 2,
            color: "#0b84f3",
            marginBottom: 208,
            textAlign: "center",
            width: "100%",
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            marginTop: 26,
            fontSize: "2.35rem",
            fontWeight: "bold",
            lineHeight: 1.8,
            color: "#243447",
            textAlign: "left",
            width: "100%",
          }}
        >
          {description}
        </div>
        {cause && (
          <div
            style={{
              marginTop: 24,
              fontSize: 19,
              lineHeight: 1.5,
              color: "#686c73",
            }}
          >
            {cause}
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 40,
          height: 2,
          background: "rgba(255,255,255,.25)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / (durationInFrames - 1)) * 100}%`,
            background: accentColor,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 128,
          right: 64,
          color: "rgba(245,241,233,.65)",
          font: "18px Arial",
        }}
      >
        {String(Math.floor(frame / fps)).padStart(2, "0")}s
      </div>
    </AbsoluteFill>
  );
};
