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
    description={<>对领导、同事和工作消息过度敏感，反复检查，担心犯错，<br />甚至下班后也无法真正放松。</>}
    cause="长期压力、职场冲突或不安全感，可能让身体一直停留在警报状态。"
  />
);
