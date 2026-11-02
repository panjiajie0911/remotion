import type {ReactNode} from "react";
import {AbsoluteFill, interpolate, Series, useVideoConfig} from "remotion";
import {Audio} from "@remotion/media";
import {theme} from "../lib/theme";

export type EpisodeSceneSpec = {
  name: string;
  durationInFrames: number;
  node: ReactNode;
  /** Pre-mount videos before the cut so the shared audio clock never stalls. */
  premountFor?: number;
};

export type EpisodeShellProps = {
  intro: {
    name: string;
    durationInFrames: number;
    node: ReactNode;
  };
  scenes: EpisodeSceneSpec[];
  narration?: string;
  music?: string;
  background?: string;
};

/** Shared frame shell: intro, consecutive scenes, narration and music levels. */
export const EpisodeShell = ({
  intro,
  scenes,
  narration,
  music,
  background = theme.palette.night,
}: EpisodeShellProps) => {
  const {durationInFrames} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background,
        color: theme.palette.ink,
        fontFamily: theme.fonts.sans,
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={intro.durationInFrames} name={intro.name}>
          {intro.node}
        </Series.Sequence>
        {scenes.map((scene, index) => (
          <Series.Sequence
            key={`${scene.name}-${index}`}
            durationInFrames={scene.durationInFrames}
            name={scene.name}
            premountFor={scene.premountFor}
          >
            {scene.node}
          </Series.Sequence>
        ))}
      </Series>
      {narration ? <Audio src={narration} volume={() => theme.audio.volume.voice} /> : null}
      {music ? (
        <Audio
          src={music}
          volume={(frame) =>
            interpolate(
              frame,
              [0, 24, durationInFrames - 45, durationInFrames],
              [0, theme.audio.volume.music, theme.audio.volume.music, 0],
              {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
            )
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
