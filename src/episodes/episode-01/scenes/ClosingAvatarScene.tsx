import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import avatar from "../../../assets/img/avatar.png";
// Audio is 148.3755 seconds; full-video placement includes a 3-second intro.
export const CLOSING_AVATAR_AUDIO_START = Math.round(138.5 * 30);
export const CLOSING_AVATAR_DURATION = Math.ceil(148.3755 * 30) - CLOSING_AVATAR_AUDIO_START;

export const ClosingAvatarScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: "#F7F4EE", overflow: "hidden"}}>
    <AbsoluteFill style={{opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), translate: interpolate(frame, [0, 24], ["0px 32px", "0px 0px"], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)})}}>
      <Img name="收尾 · 头像占位" src={avatar} style={{position: "absolute", left: 40, top: 220, width: 1000, height: 1320, objectFit: "contain"}} />
    </AbsoluteFill>
  </AbsoluteFill>;
};
