import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const VIDEO_FRAMES = 120;
const TOTAL_FRAMES = 240;

export const EPISODE03_DURATION = TOTAL_FRAMES;

export const Episode03 = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const isTextPhase = frame >= VIDEO_FRAMES;
  const blur = interpolate(frame, [VIDEO_FRAMES, VIDEO_FRAMES + 18], [0, 13], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dim = interpolate(frame, [VIDEO_FRAMES, VIDEO_FRAMES + 18], [0, 0.48], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const copyOpacity = interpolate(frame, [VIDEO_FRAMES + 12, VIDEO_FRAMES + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const copyY = interpolate(frame, [VIDEO_FRAMES + 12, VIDEO_FRAMES + 30], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const seconds = Math.floor(frame / fps);

  return (
    <AbsoluteFill style={{backgroundColor: "#0d1014", color: "#f5f1e9", overflow: "hidden"}}>
      <OffthreadVideo
        src={staticFile("episode-03-anxious.mp4")}
        muted
        startFrom={0}
        endAt={VIDEO_FRAMES}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `blur(${blur}px)`,
          transform: "scale(1.035)",
        }}
      />
      <AbsoluteFill style={{background: `rgba(5, 8, 12, ${dim})`}} />

      <div style={{position: "absolute", top: 76, left: 64, right: 64, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Arial, sans-serif", fontSize: 20, letterSpacing: 4, color: "#ff806f"}}>
        <span>WORK / TRAUMA</span>
        <span>01</span>
      </div>

      <div style={{position: "absolute", left: 64, right: 64, bottom: 92, opacity: copyOpacity, transform: `translateY(${copyY}px)`, fontFamily: "Arial, sans-serif"}}>
        <div style={{width: 92, height: 6, marginBottom: 24, background: "#ff806f"}} />
        <div style={{fontSize: 22, letterSpacing: 5, color: "#ff9b8d", marginBottom: 18}}>过度警觉</div>
        <div style={{fontSize: 48, lineHeight: 1.18, fontWeight: 700, maxWidth: 900}}>你不是太敏感，<br />而是一直在等待出问题。</div>
        <div style={{marginTop: 26, maxWidth: 850, fontSize: 25, lineHeight: 1.55, color: "#d2cec7"}}>
          对领导、同事和工作消息过度敏感，反复检查，担心犯错，<br />甚至下班后也无法真正放松。
        </div>
        <div style={{marginTop: 24, fontSize: 19, lineHeight: 1.5, color: "#a8a49d"}}>
          长期压力、职场冲突或不安全感，可能让身体一直停留在警报状态。
        </div>
      </div>

      <div style={{position: "absolute", left: 64, right: 64, bottom: 40, height: 2, background: "rgba(255,255,255,0.25)"}}>
        <div style={{height: "100%", width: `${(frame / (TOTAL_FRAMES - 1)) * 100}%`, background: "#ff806f"}} />
      </div>

      {isTextPhase && <div style={{position: "absolute", top: 128, right: 64, fontFamily: "Arial, sans-serif", fontSize: 18, letterSpacing: 2, color: "rgba(245,241,233,0.65)"}}>{String(seconds).padStart(2, "0")}s</div>}
    </AbsoluteFill>
  );
};


