import {VideoMaskShot} from "./components/VideoMaskShot";
import {AbsoluteFill, interpolate, Series, useCurrentFrame} from "remotion";
import type {ReactNode} from "react";
import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components";

const SHOT_DURATION = 240;
const INTRO_TRANSITION_DURATION = 15;
export const EPISODE03_DURATION = SERIES_INTRO_DURATION + SHOT_DURATION * 5 - INTRO_TRANSITION_DURATION;

const IntroCrossfade = ({children}: {children: ReactNode}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, INTRO_TRANSITION_DURATION - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const Episode03 = () => (
  <Series>
  <Series.Sequence durationInFrames={SERIES_INTRO_DURATION}>
    <SeriesIntro title={["职场", "应激创伤"]} emphasisLines={[1]} />
  </Series.Sequence>
  <Series.Sequence durationInFrames={SHOT_DURATION} offset={-INTRO_TRANSITION_DURATION}>
  <IntroCrossfade>
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
  </IntroCrossfade>
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
        在休息时间，一想到星期一要上班，就莫名出现心慌、胸闷、烦躁、失眠或胃部不适，心理学称之为“周日恐惧（Sunday Scaries）”。
        <span style={{display: "block", marginTop: 24}}>这是职场的压力，不确定感和倦怠导致大脑提前进入警戒状态。</span>
      </>}
    />
  </Series.Sequence>
  <Series.Sequence durationInFrames={SHOT_DURATION}>
    <VideoMaskShot
      video="episode-03-sleep.mp4"
      videoFrames={120}
      freezeFrames={12}
      durationInFrames={SHOT_DURATION}
      kicker="压力性失眠"
      title="压力性失眠"
      description="大脑在夜间仍处于工作警戒状态，不断回想任务、担心出错或预演明天的情况，因此难以入睡"
    />
  </Series.Sequence>
  <Series.Sequence durationInFrames={SHOT_DURATION}>
    <VideoMaskShot
      video="episode-03-dream.mp4"
      videoFrames={120}
      freezeFrames={12}
      durationInFrames={SHOT_DURATION}
      kicker="梦境反刍"
      title="梦境反刍"
      description="对工作出错的恐惧被延续到睡眠中，“梦中持续工作”象征内在的责任压力，对评价的担忧和难以允许自己休息"
    />
  </Series.Sequence>
  <Series.Sequence durationInFrames={SHOT_DURATION}>
    <VideoMaskShot
      video="episode-03-meeting.mp4"
      videoFrames={120}
      freezeFrames={12}
      durationInFrames={SHOT_DURATION}
      kicker="急性应激反应"
      title="急性应激反应"
      description={<>
        在开会中出现走神和记忆丢失，是工作压力过大导致的注意力短暂“断线”。
        <span style={{display: "block", marginTop: 24}}>如果紧张导致的自主神经系统被激活，同时还会伴随有腹痛，腹泻，恶心，心慌，出汗等。</span>
      </>}
    />
  </Series.Sequence>
  </Series>
);
