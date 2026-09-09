import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../lib/theme";

export type CaptionCue = {
  start: number;
  end: number;
  text: string;
  emphasis?: string[];
};

type CaptionTrackProps = {
  captions: CaptionCue[];
  position?: "center" | "bottom";
};

const renderText = (text: string, emphasis: string[] = []) => {
  const parts = text.split(new RegExp(`(${emphasis.map((item) => item.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")).join("|")})`, "g"));
  return parts.map((part, index) => emphasis.includes(part) ? <span key={`${part}-${index}`} style={{ color: theme.colors.accent }}>{part}</span> : part);
};

const Caption = ({ cue }: { cue: CaptionCue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entranceFrames = Math.min(12, Math.round(0.3 * fps));
  const opacity = interpolate(frame, [0, entranceFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...theme.motion.easing) });
  const translateY = interpolate(frame, [0, entranceFrames], [theme.motion.enterOffset, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...theme.motion.easing) });

  return (
    <div style={{ opacity, textAlign: "center", translate: `0 ${translateY}px` }}>
      <span style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", borderRadius: theme.radius.md, boxShadow: theme.shadow.soft, color: theme.colors.text, display: "inline", fontFamily: theme.fonts.sans, fontSize: theme.typography.size.caption, fontWeight: theme.typography.weight.medium, lineHeight: theme.typography.lineHeight.normal, padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{renderText(cue.text, cue.emphasis)}</span>
    </div>
  );
};

export const CaptionTrack = ({ captions, position = "bottom" }: CaptionTrackProps) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill pointerEvents="none" style={{ justifyContent: position === "bottom" ? "flex-end" : "center", padding: `0 ${theme.video.safeArea.left}px ${position === "bottom" ? theme.video.safeArea.bottom + 72 : 0}px` }}>
      {captions.map((cue) => <Sequence key={`${cue.start}-${cue.end}-${cue.text}`} from={Math.round(cue.start * fps)} durationInFrames={Math.max(1, Math.round((cue.end - cue.start) * fps))}><Caption cue={cue} /></Sequence>)}
    </AbsoluteFill>
  );
};
