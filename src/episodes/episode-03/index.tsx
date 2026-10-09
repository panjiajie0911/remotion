import {AbsoluteFill} from "remotion";
import {theme} from "../../lib/theme";

export const EPISODE03_ID = "Episode03EatingHabits";
export const EPISODE03_FPS = 30;
// Temporary title-card duration; update when narration and scenes are ready.
export const EPISODE03_DURATION = 6 * EPISODE03_FPS;

/** Main episode timeline. Add narration and illustration scenes here. */
export const Episode03 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: theme.fonts.sans,
      justifyContent: "center",
      padding: 100,
    }}
  >
    
    <div style={{fontSize: 88, fontWeight: 700, lineHeight: 1.35}}>
      你的吃饭习惯，
      <br />
      <span style={{color: theme.colors.primary}}>暴露了你的心理</span>
    </div>
  </AbsoluteFill>
);

export default Episode03;
