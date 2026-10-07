import "../index.css";
import {Composition, registerRoot} from "remotion";
import { Episode01 } from "../episodes/episode-01/Episode01";
const Root = () => <>
      <Composition id="MyComp" component={Episode01} durationInFrames={270} fps={30} width={1080} height={1920} />
</>;
registerRoot(Root);
