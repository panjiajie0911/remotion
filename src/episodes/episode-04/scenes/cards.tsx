import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {theme} from "../../../lib/theme";

const C = {
  cream: "#F2E8DA",
  gold: "#C9A227",
  olive: "#6B6B47",
  blue: "#7C8B96",
  red: "#6B2B2B",
  ink: "#1A1512",
  night: "#0D0A09",
} as const;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const rise = (frame: number, from: number, duration = 18, distance = 26) => {
  const p = interpolate(frame, [from, from + duration], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {opacity: p, transform: `translateY(${(1 - p) * distance}px)`};
};

export const Grain = ({opacity = 0.16}: {opacity?: number}) => (
  <AbsoluteFill style={{mixBlendMode: "overlay", opacity, pointerEvents: "none"}}>
    <svg height="100%" width="100%">
      <filter id="ep04-grain">
        <feTurbulence baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" type="fractalNoise" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect fill="transparent" filter="url(#ep04-grain)" height="100%" width="100%" />
    </svg>
  </AbsoluteFill>
);

const Eyebrow = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <div
    style={{
      color: C.gold,
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: 10,
      lineHeight: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

const Progress = ({index, color = C.gold, total = 3}: {index: string; color?: string; total?: number}) => (
  <div
    style={{
      alignItems: "center",
      bottom: 236,
      display: "flex",
      gap: 18,
      left: theme.layout.marginX,
      position: "absolute",
    }}
  >
    <div style={{backgroundColor: color, height: 1, opacity: 0.55, width: 56}} />
    <div style={{color, fontSize: 20, fontWeight: 500, letterSpacing: 4, opacity: 0.85}}>
      {index} / 0{total}
    </div>
  </div>
);

const Dark = ({children, hue = "#2B1D15"}: {children: ReactNode; hue?: string}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 85% at 24% 16%, ${hue} 0%, #17100C 58%, ${C.night} 100%)`,
      fontFamily: theme.fonts.sans,
      overflow: "hidden",
    }}
  >
    {children}
    <Grain />
  </AbsoluteFill>
);

export const CardChapter01 = ({durationInFrames}: {durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const rule = interpolate(frame, [8, 34], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame, [0, durationInFrames], [1.02, 1.0]);

  return (
    <Dark hue="#2E1E14">
      <div
        style={{
          color: C.cream,
          fontSize: 640,
          fontWeight: 700,
          letterSpacing: -30,
          lineHeight: 0.8,
          opacity: 0.05,
          position: "absolute",
          right: -40,
          top: 120,
        }}
      >
        01
      </div>
      <div
        style={{
          background: `radial-gradient(60% 40% at 70% 88%, rgba(107,43,43,0.55) 0%, rgba(107,43,43,0) 70%)`,
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          inset: 0,
          opacity: out,
          padding: `0 ${theme.layout.marginX}px`,
          position: "absolute",
          scale: drift,
        }}
      >
        <div style={{position: "absolute", top: 680, width: 900}}>
          <div style={rise(frame, 4, 16)}>
            <Eyebrow>第一章</Eyebrow>
          </div>
          <div
            style={{
              backgroundColor: C.gold,
              height: 2,
              marginTop: 28,
              transform: `scaleX(${rule})`,
              transformOrigin: "left center",
              width: 64,
            }}
          />
          <div
            style={{
              color: C.cream,
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.2,
              marginTop: 34,
              ...rise(frame, 14, 22, 30),
            }}
          >
            在“恐吓”中长大
          </div>
          <div
            style={{
              color: C.cream,
              fontSize: 30,
              letterSpacing: 3,
              lineHeight: 1.6,
              marginTop: 26,
              opacity: 0.5,
              width: 640,
              ...rise(frame, 26, 18),
            }}
          >
            规则被说成道德，后果被说成人生
          </div>
        </div>
        <Progress index="01" />
      </div>
    </Dark>
  );
};

export const CardChapter02 = ({durationInFrames}: {durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const draw = interpolate(frame, [2, 52], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(frame, [0, durationInFrames], [0.55, 1]);

  return (
    <Dark hue="#301618">
      <div
        style={{
          background: `radial-gradient(55% 35% at 50% 62%, rgba(107,43,43,0.62) 0%, rgba(107,43,43,0) 72%)`,
          inset: 0,
          position: "absolute",
        }}
      />
      <svg
        height="1920"
        style={{left: 0, position: "absolute", top: 0}}
        viewBox="0 0 1080 1920"
        width="1080"
      >
        <path
          d="M0 1000 H150 L190 1000 L215 900 L245 1110 L268 1000 H420 L455 1000 L480 940 L510 1064 L534 1000 H700 L735 1000 L760 890 L792 1120 L815 1000 H1080"
          fill="none"
          opacity={0.95 * pulse}
          pathLength={1}
          stroke={C.gold}
          strokeDasharray="1 1"
          strokeDashoffset={1 - draw}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
      <div
        style={{
          inset: 0,
          opacity: out,
          padding: `0 ${theme.layout.marginX}px`,
          position: "absolute",
        }}
      >
        <div style={{position: "absolute", top: 540, width: 900}}>
          <div style={rise(frame, 4, 16)}>
            <Eyebrow>第二章</Eyebrow>
          </div>
          <div
            style={{
              backgroundColor: C.gold,
              height: 2,
              marginTop: 28,
              transform: `scaleX(${interpolate(frame, [8, 30], [0, 1], {
                easing: ease,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })})`,
              transformOrigin: "left center",
              width: 64,
            }}
          />
          <div
            style={{
              color: C.cream,
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.2,
              marginTop: 34,
              ...rise(frame, 14, 22, 30),
            }}
          >
            身体还记得害怕
          </div>
          <div
            style={{
              color: C.cream,
              fontSize: 30,
              letterSpacing: 3,
              lineHeight: 1.6,
              marginTop: 26,
              opacity: 0.5,
              width: 640,
              ...rise(frame, 26, 18),
            }}
          >
            事情过去了，反应没有过去
          </div>
        </div>
        <Progress index="02" />
      </div>
    </Dark>
  );
};

export const CardChapter03 = ({durationInFrames}: {durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const split = interpolate(frame, [10, 40], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const column = (title: string, detail: string, direction: number) => (
    <div
      style={{
        flex: 1,
        opacity: split,
        textAlign: "center",
        transform: `translateX(${direction * (1 - split) * 34}px)`,
      }}
    >
      <div
        style={{
          color: C.ink,
          fontSize: 84,
          fontWeight: 600,
          letterSpacing: 6,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: C.olive,
          fontSize: 26,
          letterSpacing: 3,
          lineHeight: 1.6,
          marginTop: 22,
          opacity: 0.9,
        }}
      >
        {detail}
      </div>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 70% 12%, #FBF3E6 0%, ${C.cream} 58%, #E7D8C4 100%)`,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
      }}
    >
      <div style={{inset: 0, opacity: out, padding: `0 ${theme.layout.marginX}px`, position: "absolute"}}>
        <div style={{position: "absolute", top: 560, width: 904}}>
          <div style={rise(frame, 2, 14)}>
            <Eyebrow>第三章</Eyebrow>
          </div>
          <div
            style={{
              backgroundColor: C.gold,
              height: 2,
              marginTop: 28,
              transform: `scaleX(${interpolate(frame, [6, 28], [0, 1], {
                easing: ease,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })})`,
              transformOrigin: "left center",
              width: 64,
            }}
          />
          <div
            style={{
              color: C.ink,
              fontSize: 100,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.2,
              marginTop: 34,
              ...rise(frame, 12, 20, 30),
            }}
          >
            事实和价值分开
          </div>
          <div
            style={{
              alignItems: "flex-start",
              display: "flex",
              gap: 0,
              marginTop: 120,
            }}
          >
            {column("事实", "发生了什么", -1)}
            <div
              style={{
                alignSelf: "stretch",
                backgroundColor: C.gold,
                opacity: split,
                width: 2,
              }}
            />
            {column("价值", "意味着什么", 1)}
          </div>
        </div>
        <Progress color={C.olive} index="03" />
      </div>
    </AbsoluteFill>
  );
};

export const Closing05 = ({durationInFrames}: {durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const toDark = interpolate(frame, [durationInFrames - 26, durationInFrames - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bowl = interpolate(frame, [0, 22], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(100% 70% at 50% 34%, #FDF6EA 0%, ${C.cream} 55%, #E9D9C3 100%)`,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
      }}
    >
      <Grain opacity={0.12} />
      <div
        style={{
          inset: 0,
          padding: `0 ${theme.layout.marginX}px`,
          position: "absolute",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            opacity: bowl,
            textAlign: "center",
          }}
        >
          <svg height={176} style={{marginBottom: 44}} viewBox="0 0 200 176" width={200}>
            <ellipse cx={100} cy={158} fill="rgba(140,104,58,0.16)" rx={78} ry={13} />
            <ellipse cx={100} cy={154} fill="rgba(255,247,232,0.9)" rx={62} ry={9} />

            <path
              d="M40 96 Q62 66 100 64 Q138 66 160 96 Z"
              fill="#FFFCF4"
              stroke="#D9C7A9"
              strokeWidth={1.6}
            />
            {[62, 78, 94, 110, 126, 138].map((cx, index) => (
              <path
                key={cx}
                d={`M${cx} ${82 + (index % 3) * 6} q5 -4 10 0`}
                fill="none"
                opacity={0.45}
                stroke="#CBB089"
                strokeLinecap="round"
                strokeWidth={2}
              />
            ))}

            <path
              d="M34 96 Q38 146 100 148 Q162 146 166 96"
              fill="#FFFDF8"
              opacity={0.96}
              stroke={C.ink}
              strokeLinecap="round"
              strokeWidth={3.4}
              strokeLinejoin="round"
            />
            <path
              d="M26 96 Q100 78 174 96"
              fill="none"
              opacity={0.5}
              stroke={C.ink}
              strokeLinecap="round"
              strokeWidth={2.4}
            />

            <g opacity={bowl}>
              {[0, 1, 2].map((index) => {
                const phase = (frame * 0.9 + index * 22) % 66;
                const steamOpacity = Math.max(0, 1 - phase / 66) * 0.45;
                return (
                  <path
                    key={index}
                    d={`M${84 + index * 16} ${62 - phase * 0.5} q-9 -12 0 -24 q9 -12 0 -24`}
                    fill="none"
                    opacity={steamOpacity}
                    stroke={C.olive}
                    strokeLinecap="round"
                    strokeWidth={3}
                  />
                );
              })}
            </g>
          </svg>
          <div
            style={{
              color: C.olive,
              fontSize: 26,
              letterSpacing: 8,
              marginBottom: 34,
              opacity: 0.9,
              ...rise(frame, 10, 16),
            }}
          >
            第 04 期 · 心理观察
          </div>
          <div
            style={{
              color: C.ink,
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.28,
            }}
          >
            <div style={rise(frame, 18, 22, 28)}>
              没什么大不了的。
            </div>
          </div>
        </div>
        <div
          style={{
            bottom: 220,
            color: C.olive,
            fontSize: 24,
            left: theme.layout.marginX,
            letterSpacing: 2,
            opacity: 0.6,
            position: "absolute",
            ...rise(frame, 60, 18),
          }}
        >
          今天让你焦虑的事 · 不过是小学三年级忘戴的红领巾
        </div>
      </div>
      <AbsoluteFill style={{backgroundColor: C.night, opacity: toDark}} />
    </AbsoluteFill>
  );
};
