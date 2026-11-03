import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CardChapter01} from "./cards";

export const S08_DURATION_IN_FRAMES = 75;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const S08Scene = () => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 9], [1, 0], clamp);
  const card = interpolate(frame, [0, 22], [0, 1], {...clamp, easing: ease});
  const loom = interpolate(frame, [4, 44], [0, 1], {...clamp, easing: ease});
  const loomScale = interpolate(frame, [4, 60], [1.14, 1.0], clamp);
  const childIn = interpolate(frame, [18, 46], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0D0A09", overflow: "hidden"}}>
      <AbsoluteFill style={{opacity: enter, backgroundColor: "#FFF6E8"}} />

      <AbsoluteFill
        style={{
          opacity: card,
          translate: `0 ${(1 - card) * 64}px`,
        }}
      >
        <CardChapter01 durationInFrames={S08_DURATION_IN_FRAMES} />

        <AbsoluteFill style={{pointerEvents: "none"}}>
          <svg
            height="1920"
            style={{position: "absolute", top: 0}}
            viewBox="0 0 1080 1920"
            width="1080"
          >
            <defs>
              <filter id="s08-soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <filter id="s08-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="90" />
              </filter>
              <linearGradient id="s08-body" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#080604" stopOpacity="0.96" />
                <stop offset="58%" stopColor="#080604" stopOpacity="0.82" />
                <stop offset="100%" stopColor="#080604" stopOpacity="0" />
              </linearGradient>
            </defs>

            <ellipse
              cx="556"
              cy="352"
              fill="#C9A227"
              filter="url(#s08-glow)"
              opacity={0.16 * loom}
              rx="470"
              ry="300"
            />

            <g
              filter="url(#s08-soft)"
              opacity={0.9 * loom}
              transform={`translate(556 300) scale(${loomScale}) translate(-556 -300)`}
            >
              <circle cx="620" cy="196" fill="#080604" r="106" />
              <path
                d="M186 700 C206 500 330 356 620 356 C910 356 1034 500 1054 700 L1054 760 L186 760 Z"
                fill="url(#s08-body)"
              />
            </g>

            <g opacity={childIn} transform="translate(556 1520) scale(1.14) translate(-612 -1520)">
              <circle cx="612" cy="1408" fill="#0B0806" r="23" />
              <path
                d="M612 1432 C588 1432 574 1448 572 1472 L561 1552 C559 1570 570 1581 588 1581 L636 1581 C654 1581 665 1570 663 1552 L652 1472 C650 1448 636 1432 612 1432 Z"
                fill="#0B0806"
              />
              <path d="M590 1579 L588 1618 L604 1618 L606 1581 Z" fill="#0B0806" />
              <path d="M634 1579 L636 1618 L620 1618 L618 1581 Z" fill="#0B0806" />
              <ellipse cx="612" cy="1624" fill="#0B0806" opacity="0.4" rx="54" ry="9" />
            </g>
          </svg>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
