import {AbsoluteFill, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import s07Adult from "../assets/img/s07-adult.png";
import s07Child from "../assets/img/s07-child.png";
import {SubtitleTrack} from "./SubtitleTrack";

export const S07_DURATION_IN_FRAMES = 195;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const S07Scene = () => {
  const frame = useCurrentFrame();

  const pull = interpolate(frame, [0, S07_DURATION_IN_FRAMES], [1.075, 1.0], clamp);
  const childIn = interpolate(frame, [10, 46], [0, 1], clamp);
  const childBreath = interpolate(frame, [0, 70, 140, 195], [0.92, 1.0, 0.94, 0.86], clamp);
  const childScale = interpolate(frame, [0, S07_DURATION_IN_FRAMES], [1.01, 0.975], clamp);
  const childDrift = interpolate(frame, [0, S07_DURATION_IN_FRAMES], [0, -14], clamp);
  const flash = interpolate(frame, [186, 194], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <Img
        src={s07Adult}
        style={{
          height: "100%",
          left: 0,
          maxWidth: "none",
          position: "absolute",
          scale: `${pull}`,
          top: 0,
          transformOrigin: "54% 52%",
          width: "100%",
        }}
      />

      <AbsoluteFill
        style={{
          maskImage:
            "radial-gradient(ellipse 34% 32% at 24% 31%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0) 82%)",
          opacity: 0.62 * childIn * childBreath,
        }}
      >
        <Img
          src={s07Child}
          style={{
            filter: "blur(1.1px) contrast(1.12) brightness(1.08) saturate(0.85)",
            height: "100%",
            left: "-3%",
            maxWidth: "none",
            mixBlendMode: "screen",
            position: "absolute",
            scale: `${0.56 * childScale}`,
            top: "3%",
            transformOrigin: "0% 0%",
            translate: `0 ${childDrift}px`,
            width: "100%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 28%, rgba(255,206,138,0.16) 0%, rgba(255,206,138,0) 60%)",
          mixBlendMode: "screen",
          opacity: childIn,
        }}
      />

      <CaptionScrim />
      <SubtitleTrack
        from={8}
        until={184}
        emphasisWords={["微不足道", "没有丝毫影响"]}
        lines={["我回想起来", "发现那不过只是", "一个微不足道的错误", "对人生没有丝毫影响"]}
      />

      <AbsoluteFill style={{backgroundColor: "#FFF6E8", opacity: flash}} />
    </AbsoluteFill>
  );
};
