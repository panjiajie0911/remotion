import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import bossTalk from "../assets/img/boss.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S20_DURATION_IN_FRAMES = 210;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const SWEEPS = [
  {from: 34, to: 108},
  {from: 146, to: 208},
];

const TeacherShadow = ({progress}: {progress: number}) => {
  const scale = 1 + progress * 0.18;
  const opacity = 0.26 + progress * 0.3;

  return (
    <g
      filter="url(#s20-shadowBlur)"
      opacity={opacity}
      transform={`translate(286 640) scale(${scale}) translate(-286 -640)`}
    >
      <circle cx={272} cy={382} fill="url(#s20-shadow)" r={52} />
      <path
        d="M 240 448 C 200 470 176 528 170 604 L 156 838 C 154 918 162 968 176 1004 L 392 1004 C 404 968 412 918 410 838 L 396 604 C 390 528 366 470 326 448 Z"
        fill="url(#s20-shadow)"
      />
      <path
        d="M 330 520 C 372 486 414 432 440 388"
        fill="none"
        stroke="#2A0E0A"
        strokeLinecap="round"
        strokeWidth={34}
      />
      <path
        d="M 440 388 L 520 300"
        fill="none"
        stroke="#2A0E0A"
        strokeLinecap="round"
        strokeWidth={12}
      />
      <path
        d="M 206 1000 L 196 1148"
        fill="none"
        stroke="#2A0E0A"
        strokeLinecap="round"
        strokeWidth={54}
      />
      <path
        d="M 358 1000 L 372 1148"
        fill="none"
        stroke="#2A0E0A"
        strokeLinecap="round"
        strokeWidth={54}
      />
    </g>
  );
};

export const S20Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S20_DURATION_IN_FRAMES], [1.02, 1.075], {
    ...clamp,
    easing: Easing.bezier(0.24, 0, 0.4, 1),
  });

  const warp = interpolate(frame, [0, S20_DURATION_IN_FRAMES], [4, 30], {
    ...clamp,
    easing: Easing.bezier(0.42, 0, 0.6, 1),
  });
  const frequency = interpolate(frame, [0, S20_DURATION_IN_FRAMES], [0.0035, 0.012], clamp);

  const shadowProgress = interpolate(frame, [10, 190], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.5, 1),
  });

  const breath = 1 + Math.sin(frame / 46) * 0.0035;
  const driftX = Math.sin(frame / 39) * 2.4;
  const driftY = Math.cos(frame / 33) * 1.8;

  const redWash = 0.08 + Math.sin(frame / 44) * 0.03 + shadowProgress * 0.06;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0706", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          transform: `translate(${driftX}px, ${driftY}px) scale(${breath}, ${2 - breath})`,
          transformOrigin: "50% 50%",
        }}
      >
        <svg height="100%" viewBox="0 0 1080 1920" width="100%">
          <defs>
            <filter id="s20-warp" height="130%" width="130%" x="-15%" y="-15%">
              <feTurbulence
                baseFrequency={frequency}
                numOctaves={2}
                seed={11}
                type="fractalNoise"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={warp}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="s20-shadowBlur" height="140%" width="140%" x="-20%" y="-20%">
              <feGaussianBlur stdDeviation={9} />
            </filter>
            <linearGradient id="s20-shadow" x1="0" x2="0" y1="300" y2="1160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3A1410" />
              <stop offset="60%" stopColor="#220B08" />
              <stop offset="100%" stopColor="#150705" />
            </linearGradient>
          </defs>

          <g filter="url(#s20-warp)">
            <g transform={`translate(540 960) scale(${push * 1.05}) translate(-540 -960)`}>
              <image
                height={1920}
                href={bossTalk}
                preserveAspectRatio="xMidYMid slice"
                width={1080}
                x={0}
                y={0}
              />

              <TeacherShadow progress={shadowProgress} />
            </g>
          </g>
        </svg>
      </div>

      {SWEEPS.map((sweep, index) => {
        const progress = interpolate(frame, [sweep.from, sweep.to], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        });
        const x = 118 - progress * 158;
        const opacity = Math.sin(progress * Math.PI) * 0.85;

        return (
          <div
            key={index}
            style={{
              background:
                "linear-gradient(90deg, rgba(190,40,30,0) 0%, rgba(206,54,36,0.42) 44%, rgba(255,126,84,0.34) 56%, rgba(190,40,30,0) 100%)",
              filter: "blur(22px)",
              height: "170%",
              left: `${x}%`,
              mixBlendMode: "screen",
              opacity,
              position: "absolute",
              rotate: "-13deg",
              top: "-35%",
              width: "58%",
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          background: `radial-gradient(90% 70% at 50% 46%, rgba(150,34,22,${redWash}) 0%, rgba(120,22,16,${redWash * 0.55}) 62%, rgba(60,10,8,${redWash * 0.4}) 100%)`,
          mixBlendMode: "overlay",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(74% 58% at 50% 48%, rgba(0,0,0,0) 38%, rgba(12,6,4,0.38) 82%, rgba(10,5,3,0.62) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.13}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={12}
        until={200}
        emphasisWords={["羞耻", "恐惧", "灾难感"]}
        lines={["影响未必严重，", "但是却让你产生了远超事情本身的", "羞耻，恐惧和灾难感。"]}
      />
    </AbsoluteFill>
  );
};
