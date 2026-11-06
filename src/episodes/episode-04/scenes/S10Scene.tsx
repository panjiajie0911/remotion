import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S10_DURATION_IN_FRAMES = 120;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const dropEase = Easing.bezier(0.6, 0, 0.9, 0.4);
const outEase = Easing.bezier(0.16, 1, 0.3, 1);

const RULES = ["上课必须佩戴红领巾", "迟到要在门外站好", "考试不能掉出前十", "要听话，要懂事"];

export const S10Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S10_DURATION_IN_FRAMES], [1.0, 1.11], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.6, 1),
  });

  const fall = interpolate(frame, [42, 52], [0, 1], {...clamp, easing: dropEase});
  const stampY = (1 - fall) * -560;
  const stampScale = 1 + (1 - fall) * 1.05;
  const stampRotate = interpolate(fall, [0, 1], [-16, -8], clamp);
  const stampOpacity = interpolate(frame, [38, 46], [0, 0.92], clamp);

  const impact = interpolate(frame, [52, 54, 70], [0, 1, 0], {
    ...clamp,
    easing: outEase,
  });
  const shake = Math.sin((frame - 52) * 2.4) * 9 * impact;

  const flash = interpolate(frame, [52, 54, 66], [0, 0.3, 0], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#1A231F", overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 46% 34%, #2C3A32 0%, #202A25 52%, #121815 100%)",
          scale: `${push}`,
          translate: `${shake}px 0`,
        }}
      >
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(58% 30% at 30% 18%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%), radial-gradient(46% 26% at 74% 68%, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0) 70%), radial-gradient(40% 18% at 22% 88%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 72%)",
          }}
        />

        <div
          style={{
            fontFamily: theme.fonts.sans,
            left: 118,
            position: "absolute",
            top: 430,
            width: 820,
          }}
        >
          {RULES.map((rule, index) => {
            const start = 4 + index * 6;
            const reveal = interpolate(frame, [start, start + 16], [0, 1], {
              ...clamp,
              easing: outEase,
            });
            return (
              <div
                key={rule}
                style={{
                  color: "#E9E3D1",
                  clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
                  fontSize: 52,
                  fontWeight: 400,
                  letterSpacing: 3,
                  lineHeight: 1.9,
                  opacity: 0.72,
                  rotate: `${index % 2 === 0 ? -0.5 : 0.4}deg`,
                  textShadow: "0 0 12px rgba(233,227,209,0.22)",
                  whiteSpace: "nowrap",
                }}
              >
                {rule}
              </div>
            );
          })}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: 620,
            justifyContent: "center",
            left: 190,
            position: "absolute",
            top: 680,
            translate: `0 ${stampY}px`,
            width: 620,
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "rgba(213,72,47,0.05)",
              border: "22px solid rgba(226,84,58,0.95)",
              borderRadius: 306,
              boxShadow:
                "0 0 0 6px rgba(213,72,47,0.4), 0 26px 60px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              height: 612,
              justifyContent: "center",
              opacity: stampOpacity,
              position: "relative",
              rotate: `${stampRotate}deg`,
              scale: `${stampScale}`,
              width: 612,
            }}
          >
            <div
              style={{
                border: "4px solid rgba(213,72,47,0.65)",
                borderRadius: 300,
                inset: 22,
                position: "absolute",
              }}
            />
            <div
              style={{
                color: "#F26A50",
                fontFamily: theme.fonts.sans,
                fontSize: 210,
                fontWeight: 700,
                letterSpacing: 18,
                lineHeight: 1,
                opacity: 0.95,
                textShadow: "0 0 26px rgba(242,106,80,0.35)",
                translate: "18px 0",
              }}
            >
              后果
            </div>
            <div
              style={{
                color: "#E4593F",
                fontFamily: theme.fonts.sans,
                fontSize: 30,
                fontWeight: 500,
                letterSpacing: 12,
                marginTop: 14,
                opacity: 0.75,
              }}
            >
              CONSEQUENCE
            </div>
          </div>
        </div>

        <AbsoluteFill style={{opacity: 0.16}}>
          <Grain opacity={1} />
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={{backgroundColor: "#B23428", opacity: flash}} />
      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={112}
        emphasisWords={["道德化", "后果"]}
        lines={["习惯将日常规则道德化", "并夸大其后果"]}
      />
    </AbsoluteFill>
  );
};
