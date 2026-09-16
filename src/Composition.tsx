import { CalculateMetadataFunction, Composition } from "remotion";
import { Episode01 } from "./episodes/episode-01/Episode01";
import { Episode02 } from "./episodes/episode-02/Episode02";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <>
      <Composition id="MyComp" component={Episode01} durationInFrames={270} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02" component={Episode02} durationInFrames={5400} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
    </>
  );
};

