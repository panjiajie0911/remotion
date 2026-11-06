import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import shoulders from "../assets/img/s21.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S21_DURATION_IN_FRAMES = 165;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const BELLS = [34, 82, 130];

const NERVES = [
  {d: "M 318 545 C 322 606 330 656 350 704", delay: 0},
  {d: "M 350 704 C 402 734 462 748 524 750", delay: 12},
  {d: "M 350 704 C 300 738 242 762 190 772", delay: 12},
  {d: "M 350 704 C 342 760 340 806 336 842", delay: 24},
  {d: "M 462 748 C 470 792 472 826 470 858", delay: 32},
];

const pinchAt = (frame: number) => {
  let value = 0;
  for (const bell of BELLS) {
    const local = frame - bell;
    if (local < 0) continue;
    const attack = Math.min(1, local / 4);
    const decay = Math.exp(-Math.max(0, local - 4) / 11);
    value = Math.max(value, attack * decay);
  }
  return value;
};

const Ring = ({bell}: {bell: number}) => {
  const frame = useCurrentFrame();
  const local = frame - bell;

  if (local < 0 || local > 44) return null;

  const progress = interpolate(local, [0, 44], [0, 1], clamp);
  const opacity = (1 - progress) ** 1.6 * 0.5;

  return (
    <g opacity={opacity}>
      {[0, 0.22, 0.44].map((stagger) => {
        const p = Math.max(0, progress - stagger) / (1 - stagger);
        if (p <= 0) return null;
        return (
          <circle
            key={stagger}
            cx={868}
            cy={286}
            fill="none"
            r={140 + p * 720}
            stroke="rgba(233,200,148,0.7)"
            strokeWidth={2.2}
          />
        );
      })}
    </g>
  );
};

export const S21Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S21_DURATION_IN_FRAMES], [1.0, 1.055], {
    ...clamp,
    easing: Easing.bezier(0.25, 0, 0.38, 1),
  });

  const pinch = pinchAt(frame);
  const driftX = Math.sin(frame / 41) * 1.5;
  const driftY = Math.cos(frame / 35) * 1.2;

  const nerveProgress = interpolate(frame, [6, 76], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.32, 0, 0.42, 1),
  });

  const shimmer = 0.5 + Math.sin(frame / 26) * 0.12 + pinch * 0.25;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0807", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          scale: `${push * (1 + pinch * 0.006)}`,
          transformOrigin: "50% 46%",
          translate: `${driftX}px ${driftY - pinch * 8}px`,
        }}
      >
        <Img
          src={shoulders}
          style={{
            filter: `saturate(${0.92 - pinch * 0.12}) contrast(1.03) brightness(${1 - pinch * 0.03})`,
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

      <svg height="100%" viewBox="0 0 1080 1920" width="100%">
        <defs>
          <filter id="s21-glow" height="200%" width="200%" x="-50%" y="-50%">
            <feGaussianBlur stdDeviation={3.5} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="s21-node">
            <stop offset="0%" stopColor="rgba(255,226,176,0.95)" />
            <stop offset="60%" stopColor="rgba(224,180,110,0.35)" />
            <stop offset="100%" stopColor="rgba(224,180,110,0)" />
          </radialGradient>
        </defs>

        <g filter="url(#s21-glow)">
          {NERVES.map((nerve, index) => {
            const delay = nerve.delay / 100;
            const draw = Math.max(0, Math.min(1, (nerveProgress - delay) / 0.55));

            return (
              <path
                key={index}
                d={nerve.d}
                fill="none"
                opacity={0.25 + shimmer * 0.45}
                pathLength={1}
                stroke="#E4C588"
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
                strokeLinecap="round"
                strokeWidth={2.6}
              />
            );
          })}
        </g>

        <circle cx={350} cy={704} fill="url(#s21-node)" opacity={0.15 + shimmer * 0.25} r={34} />
        <circle cx={524} cy={750} fill="url(#s21-node)" opacity={0.12 + shimmer * 0.2} r={26} />

        {BELLS.map((bell) => (
          <Ring bell={bell} key={bell} />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(36% 30% at 80% 24%, rgba(255,208,148,0.42) 0%, rgba(255,190,120,0.12) 46%, rgba(255,180,100,0) 78%)",
          mixBlendMode: "screen",
          opacity: 0.14 + Math.sin(frame / 29) * 0.02 + pinch * 0.1,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(74% 58% at 50% 48%, rgba(0,0,0,0) 40%, rgba(10,7,5,0.32) 84%, rgba(10,7,5,0.52) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.12}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={158}
        emphasisWords={["惩罚经验", "条件化反应"]}
        lines={["过去的惩罚经验", "让你的身体", "形成了条件化反应"]}
      />
    </AbsoluteFill>
  );
};
