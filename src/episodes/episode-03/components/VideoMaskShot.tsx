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
  const { fps, width } = useVideoConfig();
  const titleLength = Math.max(1, Array.from(kicker).length);
  const titleFontSize = Math.min(150, (width * 0.82 * 0.96) / titleLength - 2);
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
        backgroundColor: "#0d1014",
        overflow: "hidden",
        fontWeight:"bold",
        fontFamily: '"幼圆","DingLieHuoBanTi", "Arial", sans-serif',
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
          width: "82%",
          left: "50%",
          top: "50%",
          opacity,
          transform: `translate(-50%, calc(-50% + ${y}px))`,
          textShadow: "0 3px 6px rgba(25, 48, 72, 0.22)",
        }}
      >
        <div style={{fontSize: 20, fontWeight: 600, letterSpacing: 3, color: "#61758a", textAlign: "center", marginBottom: 24}}>
          WORKPLACE STRESS RESPONSE
        </div>
        <div
          style={{
            fontSize: titleFontSize,
            whiteSpace: "nowrap",
            fontWeight: 600,
            letterSpacing: 2,
            color: "#2467a8",
            marginBottom: 56,
            textAlign: "center",
            width: "100%",
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            marginTop: 0,
            fontSize: 34,
            fontWeight: 'bold',
            lineHeight: 1.75,
            color: "#243447",
            textAlign: "left",
            width: "100%",
            background: "rgba(255,255,255,0.45)",
            padding: "30px 36px",
            boxSizing: "border-box",
            borderRadius: 12,
          }}
        >
          {description}
        </div>
        {cause && (
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.75,
              color: "#243447",
            }}
          >
            {cause}
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: "9%",
          width: "70%",
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
