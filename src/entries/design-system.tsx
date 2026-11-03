import {Composition, registerRoot} from "remotion";
import {DesignSystemSheet} from "../design-system/DesignSystemSheet";

const Root = () => (
  <Composition
    id="DesignSystem"
    component={DesignSystemSheet}
    durationInFrames={120}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
