import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import desk from "../assets/img/jin.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S25_DURATION_IN_FRAMES = 165;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

type TagSpec = {
  label: string;
  x: number;
  y: number;
  toX: number;
  toY: number;
  rot: number;
  rotEnd: number;
  appear: number;
  leave: number;
};

const TAGS: TagSpec[] = [
  {label: "集体荣誉", x: 566, y: 986, toX: 736, toY: 356, rot: -9, rotEnd: -19, appear: 44, leave: 76},
  {label: "责任感", x: 700, y: 1112, toX: 892, toY: 238, rot: 7, rotEnd: 15, appear: 56, leave: 90},
];

const Tag = ({spec}: {spec: TagSpec}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [spec.appear, spec.appear + 16], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const leave = interpolate(frame, [spec.leave, spec.leave + 52], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.42, 0, 0.5, 1),
  });
  const opacity = enter * (1 - leave);

  if (opacity <= 0) return null;

  const x = spec.x + (spec.toX - spec.x) * leave;
  const y = spec.y + (spec.toY - spec.y) * leave;
  const rot = spec.rot + (spec.rotEnd - spec.rot) * leave + Math.sin((frame + spec.appear) / 38) * 1.3;
  const scale = 0.94 + enter * 0.06 - leave * 0.08;

  return (
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(180deg, #F8EFDF 0%, #EFE0C8 100%)",
        border: "2px solid rgba(120,42,32,0.42)",
        borderRadius: 5,
        boxShadow: "0 16px 30px rgba(40,16,8,0.4), 0 2px 0 rgba(255,255,255,0.5) inset",
        color: "#6B2B2B",
        display: "flex",
        fontFamily: "inherit",
        fontSize: 34,
        fontWeight: 600,
        justifyContent: "center",
        left: x,
        letterSpacing: 5,
        opacity,
        padding: "18px 26px 16px",
        position: "absolute",
        rotate: `${rot}deg`,
        scale: `${scale}`,
        top: y,
        translate: "-50% -50%",
        whiteSpace: "nowrap",
      }}
    >
      {spec.label}
    </div>
  );
};

export const S25Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S25_DURATION_IN_FRAMES], [1.0, 1.045], {
    ...clamp,
    easing: Easing.bezier(0.26, 0, 0.4, 1),
  });

  const driftX = Math.sin(frame / 46) * 1.6;
  const driftY = Math.cos(frame / 39) * 1.4;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push}`,
          translate: `${driftX}px ${driftY}px`,
        }}
      >
        <Img
          src={desk}
          style={{
            filter: "saturate(0.96) contrast(1.02)",
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

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 62% at 50% 46%, rgba(0,0,0,0) 44%, rgba(12,7,4,0.3) 84%, rgba(10,6,4,0.5) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.11}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={8}
        until={158}
        lines={["“不戴红领巾”是事实", "它和“集体荣誉”", "“责任感”没有关系"]}
      />
    </AbsoluteFill>
  );
};
