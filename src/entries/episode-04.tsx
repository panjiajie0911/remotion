import "../episodes/episode-04/index.css";
import {Composition, registerRoot} from "remotion";
import {Episode04, Episode04Cover, EPISODE04_DURATION, EPISODE04_FPS, EPISODE04_ID} from "../episodes/episode-04";
import {S01Preview, S01_DURATION_IN_FRAMES} from "../episodes/episode-04/scenes/S01Preview";
import {ShotsPreview, SHOTS_PREVIEW_DURATION} from "../episodes/episode-04/scenes/ShotsPreview";

const Root = () => (
  <>
    <Composition
      id={EPISODE04_ID}
      component={Episode04}
      durationInFrames={EPISODE04_DURATION}
      fps={EPISODE04_FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="Episode04Cover"
      component={Episode04Cover}
      durationInFrames={1}
      fps={EPISODE04_FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="Episode04S01Preview"
      component={S01Preview}
      durationInFrames={S01_DURATION_IN_FRAMES}
      fps={EPISODE04_FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="Episode04Shots"
      component={ShotsPreview}
      durationInFrames={SHOTS_PREVIEW_DURATION}
      fps={EPISODE04_FPS}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(Root);
