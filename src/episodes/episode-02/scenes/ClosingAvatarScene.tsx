import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import avatar from "../../../assets/img/avatar.png";
import {captions} from "../script/captions";

const firstIndex = captions.findIndex((cue) => cue.text.startsWith("看懂行为背后的需要"));
if (firstIndex < 0) throw new Error("未找到收尾段落字幕");
export const CLOSING_AVATAR_AUDIO_START = Math.round(captions[firstIndex].start * 30);
// Follow the existing estimated subtitle range through the final sentence.
export const CLOSING_AVATAR_DURATION = Math.round(captions[captions.length - 1].end * 30) - CLOSING_AVATAR_AUDIO_START;

export const ClosingAvatarScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", overflow: "hidden"}}>
    <AbsoluteFill style={{opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), translate: interpolate(frame, [0, 24], ["0px 32px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)})}}>
      <Img name="收尾 · 头像占位" src={avatar} style={{position: "absolute", left: 40, top: 220, width: 1000, height: 1320, objectFit: "contain"}} />
    </AbsoluteFill>
  </AbsoluteFill>;
};
