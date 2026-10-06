import {VideoMaskShot} from "./components/VideoMaskShot";
import {Series} from "remotion";

const SHOT_DURATION = 240;
export const EPISODE03_DURATION = SHOT_DURATION * 2;

export const Episode03 = () => (
  <Series>
  <Series.Sequence durationInFrames={SHOT_DURATION}>
  <VideoMaskShot
    video="episode-03-anxious.mp4"
    videoFrames={120}
    freezeFrames={12}
    durationInFrames={SHOT_DURATION}
    kicker="过度警觉"
    title={<>你不是太敏感，<br />而是一直在等待出问题。</>}
    description={<>
      职场过度警觉，就是长期处在“随时可能出问题”的紧张状态，对领导、同事和工作消息过度敏感，容易反复检查、担心犯错，甚至下班后也无法放松。
      <span style={{display: "block", marginTop: 24}}>它通常是长期压力、职场冲突或不安全感造成的应激反应。</span>
    </>}
  />
  </Series.Sequence>
  <Series.Sequence durationInFrames={SHOT_DURATION}>
    <VideoMaskShot
      video="episode-03-house.mp4"
      videoFrames={120}
      freezeFrames={12}
      durationInFrames={SHOT_DURATION}
      kicker="预期性焦虑"
      title="预期性焦虑"
      description={<>
        在休息时间，一想到星期一要上班，就莫名出现心慌、胸闷、烦躁、失眠或胃部不适，心理学称之为“星期一焦虑”或者“周日恐惧（Sunday Scaries）”。
        <span style={{display: "block", marginTop: 24}}>这是职场的压力，不确定感和倦怠导致大脑提前进入警戒状态。</span>
      </>}
    />
  </Series.Sequence>
  </Series>
);
