import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import desk from "../assets/img/desk.png";
import impulsive from "../assets/img/impulsive-clean.png";
import jimuDown from "../assets/img/jimu-down-clean.png";
import jimu from "../assets/img/jimu-clean.png";
import quiet from "../assets/img/quiet-clean.png";

export const KINDERGARTEN_CONTRAST_DURATION = 225;

const assetStyle = {
  objectFit: "contain" as const,
  position: "absolute" as const,
};

/** 第一镜头：同一间幼儿园里，两种截然不同的行为状态。 */
export const KindergartenContrastScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const entrance = (delay: number) =>
    spring({ frame: frame - delay, fps, config: { damping: 18, mass: 0.8, stiffness: 110 } });
  const exitOpacity = interpolate(frame, [KINDERGARTEN_CONTRAST_DURATION - 15, KINDERGARTEN_CONTRAST_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wobble = frame < 72 ? 0 : Math.sin((frame - 72) * 0.33) * 2.4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fff",
        color: "#1B2533",
        opacity: exitOpacity,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ backgroundColor: "#fff" }} />
      <div
        style={{
          backgroundColor: "#fff",
          bottom: 0,
          height: 570,
          left: 0,
          position: "absolute",
          right: 0,
        }}
      />
      <div
        style={{
          backgroundColor: "#527DCE",
          height: 8,
          left: 0,
          opacity: 0.3,
          position: "absolute",
          right: 0,
          top: 1344,
        }}
      />

      <Img
        src={quiet}
        style={{
          ...assetStyle,
          height: 770,
          left: 12,
          opacity: entrance(5),
          top: 400,
          translate: `${interpolate(entrance(5), [0, 1], [-80, 0], { easing: ease })}px 0`,
          width: 560,
        }}
      />
      <Img
        src={impulsive}
        style={{
          ...assetStyle,
          height: 770,
          opacity: entrance(12),
          right: -10,
          top: 400,
          translate: `${interpolate(entrance(12), [0, 1], [80, 0], { easing: ease })}px 0`,
          width: 570,
        }}
      />

      <Img
        src={desk}
        style={{
          ...assetStyle,
          height: 600,
          left: 15,
          opacity: entrance(22),
          top: 850,
          translate: `0 ${interpolate(entrance(22), [0, 1], [100, 0], { easing: ease })}px`,
          width: 1050,
        }}
      />
      <Img
        src={jimu}
        style={{
          ...assetStyle,
          height: 230,
          left: 142,
          opacity: entrance(38),
          top: 785,
          width: 350,
        }}
      />
      <Img
        src={jimuDown}
        style={{
          ...assetStyle,
          height: 325,
          opacity: entrance(50),
          right: 128,
          rotate: `${wobble}deg`,
          top: 702,
          transformOrigin: "50% 90%",
          width: 330,
        }}
      />
    </AbsoluteFill>
  );
};
