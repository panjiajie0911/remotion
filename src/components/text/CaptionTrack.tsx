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
  const keywords = emphasis.filter(Boolean).sort((a, b) => b.length - a.length);
  if (!keywords.length) return text;
  const escaped = keywords.map((word) => Array.from(word).map((char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`).join(""));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, index) => emphasis.includes(part) ? <span key={`${part}-${index}`} style={{ color: theme.colors.accent }}>{part}</span> : part);
};

const Caption = ({ cue }: { cue: CaptionCue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entranceFrames = Math.max(1, Math.min(Math.round(theme.captions.fadeSeconds * fps), Math.round((cue.end - cue.start) * fps) - 1));
  const opacity = interpolate(frame, [0, entranceFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...theme.motion.easing) });
  const translateY = interpolate(frame, [0, entranceFrames], [theme.motion.enterOffset, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...theme.motion.easing) });

  return (
    <div style={{ opacity, width: "100%", maxWidth: theme.captions.maxWidth, alignSelf: "center", whiteSpace: "pre-line", overflowWrap: "anywhere", textAlign: "center", translate: `0 ${translateY}px` }}>
      <span style={{ color: theme.colors.text, display: "inline", fontFamily: theme.fonts.sans, fontSize: theme.typography.size.caption, fontWeight: theme.typography.weight.medium, lineHeight: theme.typography.lineHeight.normal, maxWidth: theme.captions.maxWidth, padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{renderText(cue.text, cue.emphasis)}</span>
    </div>
  );
};

export const CaptionTrack = ({ captions, position = "bottom" }: CaptionTrackProps) => {
  const { fps } = useVideoConfig();
  captions.forEach((cue, index) => {
    if (!Number.isFinite(cue.start) || !Number.isFinite(cue.end) || cue.start < 0 || Math.round(cue.end * fps) <= Math.round(cue.start * fps) || (index > 0 && cue.start < captions[index - 1].end)) {
      throw new Error(`字幕 ${index + 1} 时间无效：请按顺序填写、不重叠，并至少持续一帧。`);
    }
    if (!cue.text.trim() || cue.text.length > theme.captions.maxCharacters || cue.text.split("\n").length > 2) {
      throw new Error(`字幕 ${index + 1} 请填写 1–32 个字符、最多两行；长句请按语意拆段。`);
    }
  });
  return (
    <AbsoluteFill style={{ justifyContent: position === "bottom" ? "flex-end" : "center", padding: `0 ${theme.video.safeArea.left}px ${position === "bottom" ? theme.captions.bottom : 0}px`, pointerEvents: "none" }}>
      {captions.map((cue) => <Sequence layout="none" key={`${cue.start}-${cue.end}-${cue.text}`} from={Math.round(cue.start * fps)} durationInFrames={Math.round(cue.end * fps) - Math.round(cue.start * fps)}><Caption cue={cue} /></Sequence>)}
    </AbsoluteFill>
  );
};
