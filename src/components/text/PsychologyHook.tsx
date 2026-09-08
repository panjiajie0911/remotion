import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../lib/theme";

type PsychologyHookProps = {
  question: string[];
  emphasis?: string;
  series: string;
  author: string;
};

export const PsychologyHook = ({ question, emphasis, series, author }: PsychologyHookProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = Easing.bezier(...theme.motion.easing);
  const reveal = (start: number, duration = theme.motion.durationSeconds.normal) =>
    interpolate(frame, [start, start + Math.round(duration * fps)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: entrance,
    });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background, color: theme.colors.text, fontFamily: theme.fonts.sans }}>
      <div style={{ alignItems: "center", display: "flex", flex: 1, justifyContent: "center", padding: `0 ${theme.video.safeArea.left}px` }}>
        <div style={{ width: "100%" }}>
          <div style={{ color: theme.colors.muted, fontSize: theme.typography.size.label, letterSpacing: 2, marginBottom: theme.spacing.xl, opacity: reveal(10) }}>
            一个值得被看见的心理瞬间
          </div>
          <div style={{ fontSize: theme.typography.size.title, fontWeight: theme.typography.weight.medium, letterSpacing: -2, lineHeight: theme.typography.lineHeight.tight }}>
            {question.map((line, index) => {
              const match = emphasis ? line.split(emphasis) : [line];
              return <div key={`${line}-${index}`} style={{ opacity: reveal(18 + index * 5), translate: `0 ${interpolate(frame, [18 + index * 5, 18 + index * 5 + 18], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: entrance })}px` }}>
                {match.length === 1 ? line : <>{match[0]}<span style={{ color: theme.colors.accent }}>{emphasis}</span>{match.slice(1).join(emphasis)}</>}
              </div>;
            })}
          </div>
        </div>
      </div>
      <div style={{ bottom: theme.video.safeArea.bottom, display: "flex", justifyContent: "space-between", left: theme.video.safeArea.left, opacity: reveal(42), position: "absolute", right: theme.video.safeArea.right }}>
        <span style={{ color: theme.colors.muted, fontSize: theme.typography.size.label }}>{series}</span>
        <span style={{ color: theme.colors.text, fontSize: theme.typography.size.label }}>{author}</span>
      </div>
      <div style={{ backgroundColor: theme.colors.accent, bottom: theme.video.safeArea.bottom - 28, height: 3, left: theme.video.safeArea.left, opacity: reveal(36), position: "absolute", width: 72 }} />
    </AbsoluteFill>
  );
};
