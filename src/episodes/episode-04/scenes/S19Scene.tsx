import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import bossTalk from "../assets/img/boss.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S19_DURATION_IN_FRAMES = 150;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const S19Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S19_DURATION_IN_FRAMES], [1.0, 1.045], {
    ...clamp,
    easing: Easing.bezier(0.26, 0, 0.36, 1),
  });

  const shiftX = Math.sin(frame / 34) * 2.1 + Math.sin(frame / 13) * 0.6;
  const shiftY = Math.cos(frame / 29) * 1.6 + Math.sin(frame / 17) * 0.45;
  const tilt = Math.sin(frame / 52) * 0.2;

  const lampFlicker = 0.12 + Math.sin(frame / 31) * 0.02 + Math.sin(frame / 9) * 0.006;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          rotate: `${tilt}deg`,
          scale: `${push * 1.05}`,
          transformOrigin: "50% 48%",
          translate: `${shiftX}px ${shiftY}px`,
        }}
      >
        <Img
          src={bossTalk}
          style={{
            filter: "saturate(0.94) contrast(1.03)",
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          backdropFilter: "blur(2px)",
          maskImage: "radial-gradient(44% 40% at 22% 60%, #000 0%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0) 74%)",
          WebkitMaskImage:
            "radial-gradient(44% 40% at 22% 60%, #000 0%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0) 74%)",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(36% 28% at 69% 55%, rgba(255,206,140,0.5) 0%, rgba(255,190,110,0.15) 46%, rgba(255,180,90,0) 78%)",
          mixBlendMode: "screen",
          opacity: lampFlicker,
        }}
      />

      <AbsoluteFill
        style={{
          background: "linear-gradient(200deg, rgba(90,58,32,0.16) 0%, rgba(90,58,32,0) 52%)",
          mixBlendMode: "multiply",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(78% 60% at 50% 48%, rgba(0,0,0,0) 42%, rgba(10,7,5,0.3) 84%, rgba(10,7,5,0.5) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.11}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={8}
        until={144}
        lines={["长大后领导的一句批评", "或者一次上班迟到"]}
      />
    </AbsoluteFill>
  );
};
