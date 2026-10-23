import "../episodes/episode-03/index.css";
import {Composition, registerRoot} from "remotion";
import {Episode03, EPISODE03_DURATION, EPISODE03_FPS, EPISODE03_ID} from "../episodes/episode-03";
const Root = () => <>
      {/* 参考上传的图片，生成一个4s的9:16的视频。孩子坐在餐桌前，看着桌上的一小块蛋糕，想伸手又收回来。孩子把一张画或作业递过去，抬头观察大人的反应。镜头保持在孩子视线高度，大人只露出手和身体。大人检查后点头，把蛋糕推给孩子，顺手摸摸他的头。孩子紧绷的肩膀才放松下来。*/}
      <Composition id={EPISODE03_ID} component={Episode03} durationInFrames={EPISODE03_DURATION} fps={EPISODE03_FPS} width={1080} height={1920} />
</>;
registerRoot(Root);
