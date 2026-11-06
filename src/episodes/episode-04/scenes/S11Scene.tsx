import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import {theme} from "../../../lib/theme";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S11_DURATION_IN_FRAMES = 225;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const outEase = Easing.bezier(0.16, 1, 0.3, 1);
const dropEase = Easing.bezier(0.55, 0, 0.85, 0.5);

const GOLD = "#C9A227";

export const S11Scene = () => {
  const frame = useCurrentFrame();

  const push = interpolate(frame, [0, S11_DURATION_IN_FRAMES], [1.0, 1.065], {
    ...clamp,
    easing: Easing.bezier(0.3, 0, 0.55, 1),
  });
  const orbit = Math.sin(frame / 78) * 5;

  const light = interpolate(frame, [0, 26], [0, 1], {...clamp, easing: outEase});
  const drop = interpolate(frame, [20, 42], [0, 1], {...clamp, easing: dropEase});
  const scarfY = (1 - drop) * -320;
  const tilt = interpolate(frame, [42, 72], [0, -8], {...clamp, easing: outEase});

  const tagIn = interpolate(frame, [84, 116], [0, 1], {...clamp, easing: outEase});
  const tagBob = Math.sin((frame - 84) / 16) * 6;
  const tagOpacity = interpolate(frame, [84, 100], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: "#0C0A09", overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 56% at 50% 46%, #221A14 0%, #14100D 58%, #0A0807 100%)",
          perspective: 1400,
        }}
      >
          <AbsoluteFill
            style={{
              scale: `${push * 1.14}`,
              translate: "0 -26px",
              transformStyle: "preserve-3d",
            }}
          >
          <AbsoluteFill
            style={{
              transform: `rotateY(${orbit}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
          <AbsoluteFill
            style={{
              background: `radial-gradient(46% 26% at 50% 62%, rgba(201,162,39,0.16) 0%, rgba(201,162,39,0) 70%)`,
              opacity: light,
            }}
          />

          <div
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,238,205,0.16) 0%, rgba(255,238,205,0.05) 52%, rgba(255,238,205,0) 100%)",
              clipPath: "polygon(46% 0%, 54% 0%, 78% 100%, 22% 100%)",
              filter: "blur(26px)",
              inset: 0,
              opacity: light,
              position: "absolute",
            }}
          />

          <AbsoluteFill style={{opacity: 0.9 * light}}>
            <svg height="1920" viewBox="0 0 1080 1920" width="1080">
              <defs>
                <linearGradient id="s11-metal" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E4C873" />
                  <stop offset="55%" stopColor={GOLD} />
                  <stop offset="100%" stopColor="#7A5F17" />
                </linearGradient>
                <linearGradient id="s11-scarf" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#C4463A" />
                  <stop offset="60%" stopColor="#9C3228" />
                  <stop offset="100%" stopColor="#6B2B2B" />
                </linearGradient>
              </defs>

              <ellipse cx="540" cy="1584" fill="#000" opacity="0.55" rx="300" ry="34" />
              <path d="M540 1000 L540 1560" stroke="#B08F1F" strokeWidth="18" />
              <path d="M536 1000 L536 1560" stroke="#E4C873" strokeDasharray="0" strokeWidth="5" opacity="0.7" />
              <path
                d="M420 1568 L660 1568 L700 1596 L380 1596 Z"
                fill="#241C14"
                stroke="rgba(201,162,39,0.4)"
                strokeWidth="2"
              />

              <g transform={`rotate(${tilt} 540 1000)`}>
                <rect
                  fill="url(#s11-metal)"
                  height="14"
                  rx="7"
                  width="700"
                  x="190"
                  y="993"
                />
                <circle cx="540" cy="1000" fill={GOLD} r="26" />
                <circle cx="540" cy="1000" fill="#0C0A09" opacity="0.35" r="11" />

                <path d="M198 1000 L166 1168" stroke="rgba(201,162,39,0.55)" strokeWidth="3" />
                <path d="M242 1000 L274 1168" stroke="rgba(201,162,39,0.55)" strokeWidth="3" />
                <path d="M878 1000 L846 1168" stroke="rgba(201,162,39,0.55)" strokeWidth="3" />
                <path d="M922 1000 L954 1168" stroke="rgba(201,162,39,0.55)" strokeWidth="3" />

                <path
                  d="M150 1168 Q220 1236 290 1168"
                  fill="none"
                  stroke="url(#s11-metal)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M830 1168 Q900 1236 970 1168"
                  fill="none"
                  stroke="url(#s11-metal)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />

                <g transform={`translate(0 ${scarfY})`}>
                  <path
                    d="M150 1156 L300 1156 L225 1030 Z"
                    fill="url(#s11-scarf)"
                    stroke="#7E2A22"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M196 1146 L225 1072 L254 1146"
                    fill="none"
                    opacity="0.5"
                    stroke="#E0776A"
                    strokeWidth="3"
                  />
                  <path
                    d="M150 1156 L300 1156"
                    opacity="0.55"
                    stroke="#8E2F26"
                    strokeWidth="6"
                  />
                </g>
              </g>
            </svg>
          </AbsoluteFill>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>

      <div
        style={{
          left: 660,
          opacity: tagOpacity,
          position: "absolute",
          top: 760 + tagBob + (1 - tagIn) * 60,
        }}
      >
        <div
          style={{
            background: "rgba(10,8,7,0.55)",
            height: 190,
            left: -108,
            position: "absolute",
            rotate: "-34deg",
            top: 150,
            width: 2,
          }}
        />
        <div
          style={{
            background: "#F2E8DA",
            border: "2px solid rgba(107,43,43,0.5)",
            borderRadius: 6,
            boxShadow: "0 18px 44px rgba(0,0,0,0.55)",
            color: "#6B2B2B",
            fontFamily: theme.fonts.sans,
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: 6,
            padding: "22px 26px 20px",
            rotate: "-5deg",
            whiteSpace: "nowrap",
          }}
        >
          人格问题
          <div
            style={{
              borderTop: "1px solid rgba(107,43,43,0.35)",
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: 4,
              marginTop: 12,
              opacity: 0.6,
              paddingTop: 10,
            }}
          >
            CHARACTER
          </div>
        </div>
      </div>

      <AbsoluteFill style={{opacity: 0.14}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={16}
        until={212}
        emphasisWords={["人格", "道德"]}
        lines={["“不戴红领巾”被上升到", "人格或道德问题"]}
      />
    </AbsoluteFill>
  );
};
