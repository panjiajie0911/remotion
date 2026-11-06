import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import officeTable from "../assets/img/s07-adult.png";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S19_DURATION_IN_FRAMES = 150;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const BOSS_SHOULDER =
  "M 676 1920 C 690 1610 752 1372 876 1276 C 936 1230 1000 1218 1080 1234 L 1080 1920 Z";
const BOSS_NECK = "M 936 1310 L 946 1180 L 1058 1168 L 1068 1318 Z";
const BOSS_RIM = "M 1006 906 C 924 946 878 1034 880 1140 C 882 1200 894 1246 912 1286";

export const S19Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S19_DURATION_IN_FRAMES], [1.0, 1.048], {
    ...clamp,
    easing: Easing.bezier(0.26, 0, 0.36, 1),
  });

  const shiftX = Math.sin(frame / 34) * 2.2 + Math.sin(frame / 13) * 0.7;
  const shiftY = Math.cos(frame / 29) * 1.7 + Math.sin(frame / 17) * 0.5;
  const tilt = Math.sin(frame / 52) * 0.22;

  const bossIn = interpolate(frame, [0, 14], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.4, 1),
  });
  const nod = Math.sin(frame / 44) * 0.5;
  const shoulderBreath = Math.sin(frame / 38) * 0.004;
  const fgBlur = 13 + Math.sin(frame / 47) * 1.6;
  const lampFlicker = 0.1 + Math.sin(frame / 31) * 0.02 + Math.sin(frame / 9) * 0.006;

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <div
        style={{
          inset: 0,
          position: "absolute",
          rotate: `${tilt}deg`,
          scale: `${push}`,
          transformOrigin: "52% 46%",
          translate: `${shiftX}px ${shiftY}px`,
        }}
      >
        <Img
          src={officeTable}
          style={{
            filter: "saturate(0.92) contrast(1.02)",
            height: "100%",
            left: 0,
            maxWidth: "none",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />

        <svg
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={{opacity: bossIn, position: "absolute", inset: 0}}
          viewBox="0 0 1080 1920"
          width="100%"
        >
          <defs>
            <linearGradient id="s19-boss" x1="700" x2="1080" y1="900" y2="1920" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#181009" />
              <stop offset="52%" stopColor="#100A06" />
              <stop offset="100%" stopColor="#080504" />
            </linearGradient>
            <filter id="s19-fg" height="140%" width="140%" x="-20%" y="-20%">
              <feGaussianBlur stdDeviation={fgBlur} />
            </filter>
            <radialGradient id="s19-rim">
              <stop offset="0%" stopColor="rgba(242,193,116,0.5)" />
              <stop offset="100%" stopColor="rgba(242,193,116,0)" />
            </radialGradient>
            <clipPath id="s19-left">
              <rect height="1920" width="1018" x="0" y="0" />
            </clipPath>
          </defs>

          <g filter="url(#s19-fg)">
            <g transform={`translate(0 1920) scale(1 ${1 + shoulderBreath}) translate(0 -1920)`}>
              <g transform={`rotate(${nod} 1006 1180)`}>
                <ellipse cx={1004} cy={1058} fill="url(#s19-boss)" rx={134} ry={154} />
                <path d={BOSS_NECK} fill="url(#s19-boss)" />
              </g>
              <path d={BOSS_SHOULDER} fill="url(#s19-boss)" />
            </g>

            <ellipse cx={866} cy={1010} fill="url(#s19-rim)" opacity={0.4} rx={210} ry={300} />
            <path
              clipPath="url(#s19-left)"
              d={BOSS_RIM}
              fill="none"
              opacity={0.3}
              stroke="#E9C27C"
              strokeLinecap="round"
              strokeWidth={6}
            />
          </g>
        </svg>
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(34% 26% at 74% 52%, rgba(255,206,140,0.55) 0%, rgba(255,190,110,0.16) 46%, rgba(255,180,90,0) 78%)",
          mixBlendMode: "screen",
          opacity: lampFlicker,
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
        emphasisWords={["批评", "迟到"]}
        lines={["长大后，领导的一句批评", "或者一次上班迟到"]}
      />
    </AbsoluteFill>
  );
};
