import type {CaptionCue} from "../../../design-system/captions";

// Sentence timings aligned against the final narration with whisper token
// timestamps, then corrected to the silencedetect speech intervals. Frames are
// in each scene's scaled clock, matching VideoCaption's timeScale.
export const OPENING_CUES: CaptionCue[] = [
  {from: 28, until: 96, text: "几乎所有不健全家庭长大的孩子"},
  {from: 97, until: 130, text: "都存在进食障碍", emphasis: "进食障碍"},
];

export const DELICIOUS_CUES: CaptionCue[] = [
  {from: 40, until: 68, text: "习惯把最喜欢的食物"},
  {from: 69, until: 101, text: "留到最后吃的人"},
  {from: 107, until: 139, text: "潜意识中存在“不配得感”", emphasis: "不配得感"},
];

export const CONDITIONAL_CUES: CaptionCue[] = [
  {from: 41, until: 102, text: "这样的人，从小生活在"},
  {from: 103, until: 167, text: "“有条件的爱”的家庭里", emphasis: "有条件的爱"},
  {from: 190, until: 232, text: "只有表现得好"},
  {from: 233, until: 295, text: "才能获得奖励和鼓励"},
];

export const ADULT_CUES: CaptionCue[] = [
  {from: 23, until: 77, text: "潜意识中存在深深的"},
  {from: 78, until: 148, text: "对安全感的失控的恐惧", emphasis: "失控"},
  {from: 168, until: 218, text: "因此成年后形成了"},
  {from: 219, until: 277, text: "隐忍，自律的性格", emphasis: "隐忍"},
];

export const EAT_FAST_CUES: CaptionCue[] = [
  {from: 27, until: 55, text: "吃饭吃得很快"},
  {from: 56, until: 92, text: "习惯狼吞虎咽的人"},
  {from: 105, until: 146, text: "对外界充满了不信任感", emphasis: "不信任感"},
];

export const DISAPPOINT_CUES: CaptionCue[] = [
  {from: 13, until: 43, text: "这种人一般生长在"},
  {from: 44, until: 74, text: "匮乏的家庭里"},
  {from: 88, until: 105, text: "这里的匮乏"},
  {from: 106, until: 133, text: "指的是精神匮乏", emphasis: "精神匮乏"},
];

export const FULL_CUES: CaptionCue[] = [
  {
    from: 0,
    until: 39,
    text: "食物的饱腹感为人提供了",
    secondLine: "最早的精神慰藉",
    emphasis: "精神慰藉",
  },
  {
    from: 50,
    until: 97,
    text: "当精神缺乏爱和关注时",
    secondLine: "孩子就会把注意力",
  },
  {
    from: 98,
    until: 115,
    text: "集中在身体的生长上",
    secondLine: "",
    emphasis: "身体的生长",
  },
];

export const ANXIOUS_CUES: CaptionCue[] = [
  {from: 1, until: 31, text: "而食物焦虑的人"},
  {from: 32, until: 57, text: "更容易食物上瘾", emphasis: "食物上瘾"},
  {from: 71, until: 93, text: "因为糖和脂肪"},
  {from: 94, until: 126, text: "能带来更多的愉悦感", emphasis: "愉悦感"},
];

export const PICKY_CUES: CaptionCue[] = [
  {from: 12, until: 24, text: "吃饭挑剔的人"},
  {from: 25, until: 37, text: "往往在孩童时期"},
  {from: 46, until: 116, text: "也是被父母挑剔的人", emphasis: "被父母挑剔"},
];

export const CONTROL_CUES: CaptionCue[] = [
  {from: 10, until: 64, text: "他们通过挑剔食物的色香味"},
  {from: 73, until: 111, text: "来满足控制欲", emphasis: "控制欲"},
  {from: 112, until: 150, text: "消除内心的不确定性"},
];
