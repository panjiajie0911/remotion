import { CalculateMetadataFunction, Composition } from "remotion";
import { Episode01 } from "./episodes/episode-01/Episode01";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={Episode01}
      durationInFrames={270}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};

