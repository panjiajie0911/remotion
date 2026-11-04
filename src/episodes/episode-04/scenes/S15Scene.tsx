import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import s15Crossing from "../assets/img/s15-crossing.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S15_DURATION_IN_FRAMES = 210;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const pullEase = Easing.bezier(0.33, 0, 0.22, 1);
const dropEase = Easing.bezier(0.6, 0, 0.9, 0.45);

const FRAME_HEIGHT = 1920;
const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = (1376 / 768) * IMAGE_WIDTH;
const IMAGE_TOP = (FRAME_HEIGHT - IMAGE_HEIGHT) / 2;

type TagSpec = {
  label: string;
  latin: string;
  x: number;
  y: number;
  rotate: number;
  start: number;
};

const TAGS: TagSpec[] = [
  {label: "失败", latin: "FAILURE", x: 248, y: 716, rotate: -8, start: 34},
  {label: "羞耻", latin: "SHAME", x: 596, y: 812, rotate: 5, start: 64},
  {label: "品德", latin: "VIRTUE", x: 424, y: 1108, rotate: -3, start: 96},
];

const Tag = ({spec}: {spec: TagSpec}) => {
  const frame = useCurrentFrame();

  const drop = interpolate(frame, [spec.start, spec.start + 16], [0, 1], {
    ...clamp,
    easing: dropEase,
  });
  const opacity = interpolate(frame, [spec.start, spec.start + 6], [0, 1], clamp);
  const settle = interpolate(frame, [spec.start + 16, spec.start + 58], [1, 0], clamp);
  const swing = Math.sin((frame - spec.start - 16) / 6) * 7 * settle;
  const impact = interpolate(frame, [spec.start + 14, spec.start + 17, spec.start + 30], [0, 1, 0], clamp);

  return (
    <div
      style={{
        left: spec.x,
        opacity,
        position: "absolute",
        top: spec.y,
        translate: `0 ${(1 - drop) * -170}px`,
      }}
    >
      <div
        style={{
          background: "rgba(40,32,26,0.35)",
          height: 120,
          left: 38,
          position: "absolute",
          rotate: "-24deg",
          top: -104,
          transformOrigin: "bottom center",
          width: 2,
        }}
      />
      <div
        style={{
          alignItems: "center",
          background: "#F2E8DA",
          border: "2px solid rgba(107,43,43,0.55)",
          borderRadius: 6,
          boxShadow: "0 14px 36px rgba(0,0,0,0.38)",
          display: "flex",
          flexDirection: "column",
          minWidth: 208,
          padding: "18px 24px 14px",
          rotate: `${spec.rotate + swing}deg`,
          scale: `${1 + impact * 0.04}`,
          transformOrigin: "50% 0%",
        }}
      >
        <div
          style={{
            color: "#6B2B2B",
            fontFamily: theme.fonts.sans,
            fontSize: 58,
            fontWeight: 600,
            letterSpacing: 8,
            lineHeight: 1.05,
          }}
        >
          {spec.label}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(107,43,43,0.3)",
            color: "rgba(107,43,43,0.62)",
            fontSize: 18,
            letterSpacing: 5,
            marginTop: 10,
            paddingTop: 8,
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

export const S15Scene = () => {
  const frame = useCurrentFrame();

  const pull = interpolate(frame, [0, S15_DURATION_IN_FRAMES], [1.09, 1.0], {
    ...clamp,
    easing: pullEase,
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${pull}`,
          transformOrigin: "50% 100%",
        }}
      >
        <Img
          src={s15Crossing}
          style={{
            filter: "saturate(0.95) contrast(1.03) brightness(0.97)",
            height: IMAGE_HEIGHT,
            left: 0,
            maxWidth: "none",
            position: "absolute",
            top: IMAGE_TOP,
            width: IMAGE_WIDTH,
          }}
        />

        {TAGS.map((tag) => (
          <Tag key={tag.label} spec={tag} />
        ))}
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(78% 60% at 50% 52%, rgba(0,0,0,0) 45%, rgba(10,7,5,0.26) 82%, rgba(10,7,5,0.44) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.1}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={202}
        emphasisWords={["失败", "羞耻", "品德"]}
        lines={["把人生短暂的停顿，", "强行和“失败”“羞耻”“品德”", "等挂钩。"]}
      />
    </AbsoluteFill>
  );
};
