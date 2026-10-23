import {SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
export const EPISODE03_FPS = 30;
export const EPISODE03_OPENING_DURATION = 122;

// Draft timing, pending recorded narration. Text remains in words.txt.
export const episode03Chapters = [
  {id: "save-best", seconds: 24, title: "最喜欢的食物\n留到最后", visual: "餐盘留的一口、人物内心活动", narration: "words.txt 第 3–5 行", beats: ["呈现吃饭习惯", "展开家庭经历的解释", "回到成年后的感受"]},
  {id: "eat-fast", seconds: 33, title: "吃得很快\n狼吞虎咽", visual: "人物快速进食，延展至情绪与食物", narration: "words.txt 第 6–8 行", beats: ["快速进食的行为", "精神匮乏的解释", "食物慰藉与愉悦感"]},
  {id: "picky", seconds: 13, title: "对食物\n格外挑剔", visual: "人物挑选食物，对颜色、味道、口感逐一审视", narration: "words.txt 第 9–10 行", beats: ["呈现挑剔的行为", "展开控制与不确定性的话题"]},
  {id: "closing", seconds: 14, title: "少一点自我评判\n多留意自己的感受", visual: "回到安静的餐桌，人物放松用餐", narration: "words.txt 第 11–13 行", beats: ["吃饭习惯不能直接证明心理创伤", "关注自己的感受", "事已至此，先吃饭吧"]},
] as const;

let cursor = SERIES_INTRO_DURATION + EPISODE03_OPENING_DURATION;
export const episode03Timeline = episode03Chapters.map((chapter) => {
  const from = cursor;
  const durationInFrames = chapter.seconds * EPISODE03_FPS;
  cursor += durationInFrames;
  return {...chapter, from, durationInFrames};
});
export const EPISODE03_DURATION = cursor;
