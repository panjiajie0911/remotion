import type {CaptionCue} from "../../../components";
import {captions} from "./captions";

// Display-only timing in FULL-VIDEO seconds. Do not feed this back into
// scene exports: those are the user's independently calibrated shots.
const source = (prefix: string) => {
  const cue = captions.find(item => item.text.startsWith(prefix));
  if (!cue) throw new Error(`未找到字幕：${prefix}`);
  return cue.text;
};
const fullStart = (prefix: string) => {
  const cue = captions.find(item => item.text.startsWith(prefix));
  if (!cue) throw new Error(`未找到字幕：${prefix}`);
  return (90 + Math.round(cue.start * 30)) / 30;
};

type Section = {start: number; end: number; text: string};
const sections: Section[] = [
  {start: 3, end: fullStart("很多人"), text: "为什么同一家幼儿园里，有的孩子安静守规矩，有的孩子却频繁闯祸？"},
  {start: fullStart("很多人"), end: 14, text: source("很多人")},
  {start: 14, end: 19, text: source("但，即使")},
  {start: 19, end: 25, text: source("所以，孩子")},
  {start: 25, end: 29, text: source("精神分析提供")},
  {start: 29, end: 32, text: source("可能是孩子")},
  {start: 32, end: 37, text: source("弗洛伊德")},
  {start: 37, end: 39, text: source("本我追求")},
  {start: 39, end: 42, text: source("自我负责")},
  {start: 42, end: 44, text: source("超我代表")},
  {start: 44, end: 49, text: source("幼儿的自我")},
  {start: 49, end: 55, text: source("感到不满")},
  {start: 55, end: 58.5, text: source("这不等于") + source("很多时候")},
  {start: 58.5, end: 66, text: source("比如") + source("害怕或者")},
  {start: 66, end: 75.5, text: source("于是") + source("并试图")},
  {start: 75.5, end: 79.5, text: source("需要注意")},
  {start: 79.5, end: 83.5, text: source("心理学家")},
  {start: 83.5, end: 89.5, text: source("当情绪失控") + source("稳定的边界")},
  {start: 89.5, end: 94, text: source("如果父母")},
  {start: 94, end: 99, text: source("如果管教")},
  {start: 99, end: 108, text: source("真正有效") + source("但伤害")},
  {start: 108, end: 112.33, text: source("经典精神分析")},
  {start: 112.33, end: 117, text: source("不过，这只是")},
  {start: 117, end: 131, text: "现代儿童心理学更常从，冲动控制、情绪调节、先天气质，压力和环境模仿等方面，综合理解孩子的攻击或破坏行为"},
  {start: 131, end: 138, text: source("所以，比起") + source("更重要的是") + source("孩子想表达")},
  {start: 138, end: 139, text: "他是不会表达"},
  {start: 139, end: 140, text: "控制不住"},
  {start: 140, end: 141.5, text: "还是在试探边界？"},
  {start: 141.5, end: 151.3755, text: source("看懂行为") + source("再教给孩子") + source("才是帮助")},
];

export const sceneCaptions: CaptionCue[] = sections.flatMap(({start, end, text}) => {
  const parts = text.split(/[，,。.;；：:！？!?]/).map(part => part.trim()).filter(Boolean);
  const lines: string[] = [];
  let prefix = "";
  for (const part of parts) {
    if (/^(但|所以|比如|于是|不过|很多时候|需要注意的是)$/.test(part)) prefix += part;
    else { lines.push(prefix + part); prefix = ""; }
  }
  if (prefix) lines.push(prefix);
  const total = lines.reduce((sum, line) => sum + line.length, 0);
  const firstFrame = Math.round(start * 30);
  const lastFrame = Math.round(end * 30);
  let consumed = 0;
  return lines.map(line => {
    const from = firstFrame + Math.round((lastFrame - firstFrame) * consumed / total);
    consumed += line.length;
    const to = firstFrame + Math.round((lastFrame - firstFrame) * consumed / total);
    return {text: line, start: from / 30, end: to / 30};
  });
});
