import "../episodes/episode-03/index.css";
import {Composition, registerRoot} from "remotion";
import {Episode03, EPISODE03_DURATION, EPISODE03_FPS, EPISODE03_ID} from "../episodes/episode-03";
const Root = () => <>
      {/* 参考上传的图片，生成一个4s的9:16的视频。镜头中还在坐在餐桌上，面前摆着2个餐盘，盘子里分别摆着美味的食物和不美味的食物。美味的食物在盘子里闪闪发光，不美味的食物黯淡无光。孩子把装有美味的食物的盘子拿起，放在一边，然后再次拿起筷子，先吃起了不美味的食物 */}
      <Composition id={EPISODE03_ID} component={Episode03} durationInFrames={EPISODE03_DURATION} fps={EPISODE03_FPS} width={1080} height={1920} />
</>;
registerRoot(Root);
