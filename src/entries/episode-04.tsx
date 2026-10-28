import "../episodes/episode-04/index.css";
import {Composition, registerRoot} from "remotion";
import {Episode04, EPISODE04_DURATION, EPISODE04_FPS, EPISODE04_ID} from "../episodes/episode-04";

const Root = () => (
  <Composition
    id={EPISODE04_ID}
    component={Episode04}
    durationInFrames={EPISODE04_DURATION}
    fps={EPISODE04_FPS}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
