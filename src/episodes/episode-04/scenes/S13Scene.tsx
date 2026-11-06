import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import s13Gate from "../assets/img/s13-gate.png";
import s13Paper from "../assets/img/s13-paper.png";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S13_DURATION_IN_FRAMES = 105;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const outEase = Easing.bezier(0.16, 1, 0.3, 1);
const dropEase = Easing.bezier(0.6, 0, 0.9, 0.45);

export const S13Scene = () => {
  const frame = useCurrentFrame();

  const paperPush = interpolate(frame, [0, 60], [1.02, 1.07], clamp);
  const gatePush = interpolate(frame, [30, S13_DURATION_IN_FRAMES], [1.06, 1.0], clamp);
  const mix = interpolate(frame, [30, 48], [0, 1], {...clamp, easing: outEase});

  const fall = interpolate(frame, [42, 52], [0, 1], {...clamp, easing: dropEase});
  const stampOpacity = interpolate(frame, [38, 46], [0, 0.94], clamp);
  const stampY = (1 - fall) * -420;
  const stampScale = 1 + (1 - fall) * 0.55;

  const impact = interpolate(frame, [52, 54, 70], [0, 1, 0], {...clamp, easing: outEase});
  const shake = Math.sin((frame - 52) * 2.6) * 10 * impact;
  const flash = interpolate(frame, [52, 54, 64], [0, 0.18, 0], clamp);
  const stampRotate = interpolate(fall, [0, 1], [-22, -13], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <AbsoluteFill style={{translate: `${shake}px 0`}}>
        <Img
          src={s13Paper}
          style={{
            height: "100%",
            left: 0,
            maxWidth: "none",
            opacity: 1 - mix,
            position: "absolute",
            scale: `${paperPush}`,
            top: 0,
            transformOrigin: "50% 48%",
            width: "100%",
          }}
        />
        <Img
          src={s13Gate}
          style={{
            height: "100%",
            left: 0,
            maxWidth: "none",
            opacity: mix,
            position: "absolute",
            scale: `${gatePush}`,
            top: 0,
            transformOrigin: "50% 62%",
            width: "100%",
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: 300,
            justifyContent: "center",
            left: 190,
            opacity: stampOpacity,
            position: "absolute",
            top: 860,
            translate: `0 ${stampY}px`,
            width: 700,
          }}
        >
          <div
            style={{
              alignItems: "center",
              border: "10px solid rgba(206,54,40,0.92)",
              borderRadius: 10,
              boxShadow:
                "0 0 0 4px rgba(206,54,40,0.28), 0 22px 46px rgba(0,0,0,0.5), inset 0 0 34px rgba(206,54,40,0.18)",
              display: "flex",
              height: 240,
              justifyContent: "center",
              padding: "0 30px",
              position: "relative",
              rotate: `${stampRotate}deg`,
              scale: `${stampScale}`,
              width: 620,
            }}
          >
            <div
              style={{
                color: "#E4523A",
                fontFamily: theme.fonts.sans,
                fontSize: 168,
                fontWeight: 700,
                letterSpacing: 8,
                lineHeight: 1,
                opacity: 0.94,
                textShadow: "0 0 24px rgba(228,82,58,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              没出息
            </div>
          </div>
        </div>

        <AbsoluteFill style={{opacity: 0.15}}>
          <Grain opacity={1} />
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={{backgroundColor: "#B23428", opacity: flash}} />
      <CaptionScrim />
      <SubtitleTrack
        from={6}
        until={100}
        emphasisWords={["不会有出息"]}
        lines={["考不上大学", "变成了“以后不会有出息”"]}
      />
    </AbsoluteFill>
  );
};
