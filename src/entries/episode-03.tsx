import "../episodes/episode-03/index.css";
import {Composition, registerRoot} from "remotion";
import {Episode03, EPISODE03_DURATION, EPISODE03_FPS, EPISODE03_ID} from "../episodes/episode-03";
const Root = () => <>
      {/* 参考上传的图片，生成一个4s的9:16的视频。*/}
      <Composition id={EPISODE03_ID} component={Episode03} durationInFrames={EPISODE03_DURATION} fps={EPISODE03_FPS} width={1080} height={1920} />
</>;


registerRoot(Root);
