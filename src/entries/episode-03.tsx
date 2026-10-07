import "../index.css";
import {Composition, registerRoot} from "remotion";
import { Episode03, EPISODE03_DURATION } from "../episodes/episode-03/Episode03";
const Root = () => <>
      <Composition id="Episode03WorkTrauma" component={Episode03} durationInFrames={EPISODE03_DURATION} fps={30} width={1080} height={1920} />
</>;
registerRoot(Root);
