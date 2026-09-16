import { AbsoluteFill, Audio, staticFile } from "remotion";

/** 第 2 期《你的孩子的“熊”来自哪里》时间线入口。字幕由 TXT 文稿在后期手动加入。 */
export const Episode02 = () => (
  <AbsoluteFill>
    <Audio src={staticFile("episodes/episode-02/2.m4a")} />
  </AbsoluteFill>
);
