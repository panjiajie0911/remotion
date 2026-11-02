import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {theme} from "../lib/theme";
import {CaptionCue, findCue} from "./captions";
import {ChapterCard, ChapterCardProps} from "./ChapterCard";
import {CaptionScrim, VideoCaption} from "./VideoCaption";

export type FootageSceneProps = {
  src: string;
  cues: CaptionCue[];
  /** Scene clock compression, matching the narration timeline. */
  timeScale?: number;
  playbackRate?: number;
  /** Negative values pre-roll the footage into a dissolve from the previous scene. */
  videoOffset?: number;
  objectFit?: "contain" | "cover";
  chapter?: ChapterCardProps;
  /** Rendered between the footage and the caption scrim, e.g. a dissolve. */
  underlay?: ReactNode;
  /** Rendered above the caption, e.g. a closing card. */
  children?: ReactNode;
  style?: CSSProperties;
};

/** The recurring "footage + scrim + caption + optional chapter" scene. */
export const FootageScene = ({
  src,
  cues,
  timeScale = 1,
  playbackRate = 1,
  videoOffset = 0,
  objectFit = "contain",
  chapter,
  underlay,
  children,
  style,
}: FootageSceneProps) => {
  const frame = useCurrentFrame() / timeScale;
  const cue = findCue(cues, frame);
  const video = (
    <Video
      muted
      src={src}
      playbackRate={playbackRate}
      objectFit={objectFit}
      style={{height: "100%", width: "100%"}}
    />
  );

  return (
    <AbsoluteFill style={{backgroundColor: theme.palette.night, ...style}}>
      {videoOffset ? (
        <Sequence from={videoOffset} layout="none">
          {video}
        </Sequence>
      ) : (
        video
      )}
      {underlay}
      <CaptionScrim />
      {chapter ? <ChapterCard {...chapter} /> : null}
      {cue ? (
        <VideoCaption
          from={cue.from}
          text={cue.text}
          secondLine={cue.secondLine}
          until={cue.until}
          emphasisWords={cue.emphasis ? [cue.emphasis] : undefined}
          timeScale={timeScale}
        />
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
