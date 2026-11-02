import type {CaptionCue} from "../../../design-system/captions";

// Draft timings, kept in the scene clock so each scene can compress them to its
// own narration slot. Adjust against the final voiceover before rendering.
export const OPENING_CUES: CaptionCue[] = [
  {from: 0, text: "几乎所有不健全家庭长大的孩子"},
  {from: 76, text: "都存在进食障碍", emphasis: "进食障碍"},
];

export const DELICIOUS_CUES: CaptionCue[] = [
  {from: 0, text: "习惯把最喜欢的食物"},
  {from: 44, text: "留到最后吃的人"},
  {from: 82, text: "潜意识中存在“不配得感”", emphasis: "不配得感"},
];

export const CONDITIONAL_CUES: CaptionCue[] = [
  {from: 0, text: "这样的人，从小生活在"},
  {from: 72, text: "“有条件的爱”的家庭里", emphasis: "有条件的爱"},
  {from: 153, text: "只有表现得好"},
  {from: 216, text: "才能获得奖励和鼓励"},
];

export const ADULT_CUES: CaptionCue[] = [
  {from: 0, text: "潜意识中存在深深的"},
  {from: 65, text: "对安全感的失控的恐惧", emphasis: "失控"},
  {from: 146, text: "因此成年后形成了"},
  {from: 217, text: "隐忍，自律的性格", emphasis: "隐忍"},
];

export const EAT_FAST_CUES: CaptionCue[] = [
  {from: 0, text: "吃饭吃得很快"},
  {from: 38, text: "习惯狼吞虎咽的人"},
  {from: 87, text: "对外界充满了不信任感", emphasis: "不信任感"},
];

export const DISAPPOINT_CUES: CaptionCue[] = [
  {from: 0, text: "这种人一般生长在"},
  {from: 40, text: "匮乏的家庭里"},
  {from: 74, text: "这里的匮乏"},
  {from: 106, text: "指的是精神匮乏", emphasis: "精神匮乏"},
];

export const FULL_CUES: CaptionCue[] = [
  {
    from: 0,
    text: "食物的饱腹感为人提供了",
    secondLine: "最早的精神慰藉",
    emphasis: "精神慰藉",
  },
  {
    from: 45,
    text: "当精神缺乏爱和关注时",
    secondLine: "孩子就会把注意力",
  },
  {
    from: 89,
    text: "集中在身体的生长上",
    secondLine: "",
    emphasis: "身体的生长",
  },
];

export const ANXIOUS_CUES: CaptionCue[] = [
  {from: 0, text: "而食物焦虑的人"},
  {from: 33, text: "更容易食物上瘾", emphasis: "食物上瘾"},
  {from: 66, text: "因为糖和脂肪"},
  {from: 99, text: "能带来更多的愉悦感", emphasis: "愉悦感"},
];

export const PICKY_CUES: CaptionCue[] = [
  {from: 0, text: "吃饭挑剔的人"},
  {from: 37, text: "往往在孩童时期"},
  {from: 75, text: "也是被父母挑剔的人", emphasis: "被父母挑剔"},
];

export const CONTROL_CUES: CaptionCue[] = [
  {from: 0, text: "他们通过挑剔食物的色香味"},
  {from: 70, text: "来满足控制欲", emphasis: "控制欲"},
  {from: 110, text: "消除内心的不确定性", until: 158},
];
