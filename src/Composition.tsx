import { AbsoluteFill, CalculateMetadataFunction, Composition, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { ProgressBar } from "./components";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={270}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180}><IntroScene /></Sequence>
      <Sequence from={180} durationInFrames={90}><OutroScene /></Sequence>
      <ProgressBar />
    </AbsoluteFill>
  );
};
