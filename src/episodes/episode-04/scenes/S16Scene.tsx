import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import s16Child from "../assets/img/s07-child.png";
import s16Adult from "../assets/img/s16-adult.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S16_DURATION_IN_FRAMES = 255;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const growEase = Easing.bezier(0.38, 0, 0.24, 1);

type TagSpec = {
  label: string;
  latin: string;
  x: number;
  y: number;
  rotate: number;
  phase: number;
};

const TAGS: TagSpec[] = [
  {label: "失败", latin: "FAILURE", x: 352, y: 792, rotate: -8, phase: 0},
  {label: "羞耻", latin: "SHAME", x: 578, y: 862, rotate: 6, phase: 14},
  {label: "品德", latin: "VIRTUE", x: 430, y: 1000, rotate: -4, phase: 26},
];

const Tag = ({spec}: {spec: TagSpec}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin((frame + spec.phase) / 48) * 1.4;

  return (
    <div style={{left: spec.x, position: "absolute", top: spec.y}}>
      <div
        style={{
          background: "rgba(40,32,26,0.32)",
          height: 84,
          left: 24,
          position: "absolute",
          rotate: "-22deg",
          top: -74,
          transformOrigin: "bottom center",
          width: 2,
        }}
      />
      <div
        style={{
          alignItems: "center",
          background: "#F2E8DA",
          border: "2px solid rgba(107,43,43,0.55)",
          borderRadius: 5,
          boxShadow: "0 10px 24px rgba(0,0,0,0.36)",
          display: "flex",
          flexDirection: "column",
          minWidth: 136,
          padding: "12px 16px 10px",
          rotate: `${spec.rotate + sway}deg`,
          transformOrigin: "50% 0%",
        }}
      >
        <div
          style={{
            color: "#6B2B2B",
            fontFamily: theme.fonts.sans,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: 6,
            lineHeight: 1.05,
          }}
        >
          {spec.label}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(107,43,43,0.3)",
            color: "rgba(107,43,43,0.62)",
            fontSize: 12,
            letterSpacing: 3,
            marginTop: 7,
            paddingTop: 6,
            textAlign: "center",
            width: "100%",
          }}
        >
          {spec.latin}
        </div>
      </div>
    </div>
  );
};

export const S16Scene = () => {
  const frame = useCurrentFrame();

  const adultOpacity = interpolate(frame, [40, 150], [0, 1], {
    ...clamp,
    easing: growEase,
  });
  const childOpacity = 1 - adultOpacity;

  const push = interpolate(frame, [0, S16_DURATION_IN_FRAMES], [1.0, 1.035], {
    ...clamp,
    easing: Easing.bezier(0.25, 0, 0.4, 1),
  });

  const bloom = interpolate(frame, [36, 96, 156], [0.02, 0.15, 0.04], {
    ...clamp,
    easing: growEase,
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          transformOrigin: "50% 54%",
        }}
      >
        <Img
          src={s16Child}
          style={{
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            opacity: childOpacity,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />

        <div style={{inset: 0, opacity: adultOpacity, position: "absolute"}}>
          <Img
            src={s16Adult}
            style={{
              height: "100%",
              left: 0,
              maxWidth: "none",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          />

          {TAGS.map((tag) => (
            <Tag key={tag.label} spec={tag} />
          ))}
        </div>
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(62% 46% at 50% 36%, rgba(255,214,150,0.9) 0%, rgba(255,196,120,0.22) 46%, rgba(255,180,90,0) 76%)",
          mixBlendMode: "screen",
          opacity: bloom,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 62% at 50% 50%, rgba(0,0,0,0) 46%, rgba(10,7,5,0.26) 82%, rgba(10,7,5,0.44) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.11}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={246}
        emphasisWords={["惊吓", "自卑", "害怕犯错"]}
        lines={["导致孩子从小在惊吓中长大", "成年后养成自卑敏感", "害怕犯错的性格"]}
      />
    </AbsoluteFill>
  );
};
