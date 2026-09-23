import { NotBadChildScene, NOT_BAD_CHILD_DURATION } from "./episodes/episode-02/scenes/NotBadChildScene";
import { DirectReactionsScene, DIRECT_REACTIONS_DURATION } from "./episodes/episode-02/scenes/DirectReactionsScene";
import { ImpulseGrabScene, IMPULSE_GRAB_DURATION } from "./episodes/episode-02/scenes/ImpulseGrabScene";
import { CommonCausesScene, COMMON_CAUSES_DURATION } from "./episodes/episode-02/scenes/CommonCausesScene";
import { CalculateMetadataFunction, Composition } from "remotion";
import { Episode01 } from "./episodes/episode-01/Episode01";
import { Episode02 } from "./episodes/episode-02/Episode02";
import { PsychologyStructureScene, PSYCHOLOGY_STRUCTURE_DURATION } from "./episodes/episode-02/scenes/PsychologyStructureScene";
import { IdImpulseScene, ID_IMPULSE_DURATION } from "./episodes/episode-02/scenes/IdImpulseScene";
import { SelfRealityScene, SELF_REALITY_DURATION } from "./episodes/episode-02/scenes/SelfRealityScene";
import { SuperegoValuesScene, SUPEREGO_VALUES_DURATION } from "./episodes/episode-02/scenes/SuperegoValuesScene";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <>
      <Composition id="Episode02NotBadChild" component={NotBadChildScene} durationInFrames={NOT_BAD_CHILD_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="Episode02DirectReactions" component={DirectReactionsScene} durationInFrames={DIRECT_REACTIONS_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="Episode02ImpulseGrab" component={ImpulseGrabScene} durationInFrames={IMPULSE_GRAB_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="MyComp" component={Episode01} durationInFrames={270} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02" component={Episode02} durationInFrames={5490} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02CommonCauses" component={CommonCausesScene} durationInFrames={COMMON_CAUSES_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="Episode02Scene03" component={PsychologyStructureScene} durationInFrames={PSYCHOLOGY_STRUCTURE_DURATION} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02Scene04Id" component={IdImpulseScene} durationInFrames={ID_IMPULSE_DURATION} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02Scene05Self" component={SelfRealityScene} durationInFrames={SELF_REALITY_DURATION} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
      <Composition id="Episode02Scene06Superego" component={SuperegoValuesScene} durationInFrames={SUPEREGO_VALUES_DURATION} fps={30} width={1080} height={1920} calculateMetadata={calculateMetadata} />
    </>
  );
};





