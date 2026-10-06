import {VideoMaskShot} from "./components/VideoMaskShot";

export const EPISODE03_DURATION = 240;

export const Episode03 = () => (
  <VideoMaskShot
    video="episode-03-anxious.mp4"
    videoFrames={120}
    freezeFrames={12}
    durationInFrames={EPISODE03_DURATION}
    kicker="过度警觉"
    title={<>你不是太敏感，<br />而是一直在等待出问题。</>}
    description={<>
      职场过度警觉，就是长期处在“随时可能出问题”的紧张状态，对领导、同事和工作消息过度敏感，容易反复检查、担心犯错，甚至下班后也无法放松。
      <span style={{display: "block", marginTop: 24}}>它通常是长期压力、职场冲突或不安全感造成的应激反应。</span>
    </>}
  />
);
