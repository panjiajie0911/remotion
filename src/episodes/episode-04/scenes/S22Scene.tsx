import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import bossFace from "../assets/img/boss.jpg";
import panel from "../assets/img/interview.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S22_DURATION_IN_FRAMES = 180;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const S22Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S22_DURATION_IN_FRAMES], [1.0, 1.07], {
    ...clamp,
    easing: Easing.bezier(0.26, 0, 0.4, 1),
  });

  const driftX = Math.sin(frame / 43) * 1.8;
  const driftY = Math.cos(frame / 37) * 1.4;
  const tilt = Math.sin(frame / 58) * 0.18;

  const cutaway = frame >= 66 && frame < 80;
  const cutawayZoom = interpolate(frame, [66, 80], [2.02, 2.14], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      {cutaway ? (
        <AbsoluteFill>
          <Img
            src={bossFace}
            style={{
              filter: "saturate(0.8) brightness(0.86) contrast(1.04)",
              height: "100%",
              left: 0,
              maxWidth: "none",
              objectFit: "cover",
              position: "absolute",
              scale: `${cutawayZoom}`,
              top: 0,
              transformOrigin: "57% 44%",
              width: "100%",
            }}
          />
        </AbsoluteFill>
      ) : (
        <div
          style={{
            height: 1920,
            left: "50%",
            marginLeft: -540,
            marginTop: -960,
            position: "absolute",
            rotate: `${tilt}deg`,
            scale: `${push}`,
            top: "50%",
            translate: `${driftX}px ${driftY}px`,
            width: 1080,
          }}
        >
          <Img
            src={panel}
            style={{
              filter: "saturate(0.96) contrast(1.02)",
              height: 1920,
              left: 0,
              maxWidth: "none",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              width: 1080,
            }}
          />
        </div>
      )}

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(40% 30% at 50% 40%, rgba(255,214,160,0.34) 0%, rgba(255,196,130,0.1) 46%, rgba(255,180,100,0) 78%)",
          mixBlendMode: "screen",
          opacity: cutaway ? 0.12 : 0.2,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(76% 60% at 50% 48%, rgba(0,0,0,0) 40%, rgba(10,6,4,0.36) 84%, rgba(10,6,4,0.58) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.12}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={172}
        emphasisWords={["老师", "父母", "权威", "公众"]}
        lines={["把过去对老师、父母的恐惧", "带入对权威或公众的评价中"]}
      />
    </AbsoluteFill>
  );
};
