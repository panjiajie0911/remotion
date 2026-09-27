import type { CaptionCue } from "../../../components";

const script = `为什么同一家幼儿园里 有的孩子安静守规矩 有的孩子却频繁闯祸？

很多人会把原因归结为年龄或家庭教育。但，即使是双胞胎，性格和行为也可能很不一样。所以，孩子所谓的“熊”，通常不是由单一因素造成的。

精神分析提供了一种理解角度：有些看似捣乱的行为，可能是孩子把内在冲突“演”了出来。

弗洛伊德把人的心理活动分为“本我、自我和超我”。本我追求立刻满足。自我负责考虑现实 。超我代表规则和道德。幼儿的自我控制能力还没有发展成熟，想要什么会立刻去拿；感到不满，会直接哭闹、抢夺或者顶嘴。

这不等于孩子天生就坏。很多时候，他们只是还不会管理冲动。

比如，年幼的孩子很难说清楚：“我感到被忽视、嫉妒、害怕或者委屈”。于是，他们可能通过捣乱、拒绝配合或争抢来表达情绪，并试图获得关注。需要注意的是，这种行为可能发生在不同家庭中。

心理学家温尼科特提出，孩子需要“足够好的环境”。当情绪失控时，成年人既要理解他的感受，更要提供清晰、稳定的边界。

如果父母一味放任，孩子很难学会规则；如果管教过度严厉，合理需求被压制，可能带来更强烈的反抗。真正有效的做法，是温和而坚定地告诉孩子：情绪可以被理解，但伤害别人、破坏物品的行为是不对的。

经典精神分析还用“死本能”解释人的攻击和破坏倾向。不过，这只是一个理论概念，并不是已经被证实的单一原因。现代儿童心理学更常从冲动控制、情绪调节、先天气质、压力和环境模仿等方面，综合理解孩子的攻击或破坏行为。

所以，比起简单地说“这就是个熊孩子”，更重要的是观察：这个行为在什么时候发生？孩子想表达什么？他是不会表达、控制不住，还是在试探边界？

看懂行为背后的需要，设立稳定的规则，再教给孩子更合适的表达方式，才是帮助他建立自我控制能力的开始。`;

const chunks = script.split(/(?<=[。！？；])/).flatMap((sentence) => {
  const result: string[] = [];
  let rest = sentence.trim();
  while (rest.length > 28) {
    const cut = Math.max(rest.lastIndexOf("，", 27), rest.lastIndexOf("、", 27));
    const splitAt = cut >= 10 ? cut + 1 : 28;
    result.push(rest.slice(0, splitAt));
    rest = rest.slice(splitAt);
  }
  if (rest) result.push(rest);
  return result;
}).filter(Boolean);

const totalCharacters = chunks.reduce((sum, text) => sum + text.length, 0);
let cursor = 0;

export const captions: CaptionCue[] = chunks.map((text) => {
  const start = cursor;
  cursor += Math.max(1.1, (180 * text.length) / totalCharacters);
  return { start, end: Math.min(cursor, 180), text };
});

// Full-video 25s corresponds to audio 22s after the 3-second intro.
// Retain the paragraph's original end so later scenes do not move.
const analysisFirst = captions.findIndex((cue) => cue.text.startsWith("精神分析提供了一种理解角度"));
const analysisLast = captions.findIndex((cue, index) => index >= analysisFirst && cue.text.includes("演”了出来"));
if (analysisFirst >= 0 && analysisLast >= analysisFirst) {
  const originalStart = captions[analysisFirst].start;
  const originalEnd = captions[analysisLast].end;
  const revisedStart = 22;
  const remap = (time: number) => revisedStart + (time - originalStart) / (originalEnd - originalStart) * (originalEnd - revisedStart);
  for (let index = analysisFirst; index <= analysisLast; index++) {
    captions[index] = {...captions[index], start: remap(captions[index].start), end: remap(captions[index].end)};
  }
  // Prevent the preceding caption from hiding the newly advanced paragraph.
  for (let index = 0; index < analysisFirst; index++) {
    if (captions[index].end > revisedStart) {
      captions[index] = {...captions[index], start: Math.min(captions[index].start, revisedStart), end: revisedStart};
    }
  }
}

// Manual subtitle anchor: full-video 29s (audio 26s).
const innerConflictIndex = captions.findIndex((cue) => cue.text.startsWith("可能是孩子把内在冲突"));
if (innerConflictIndex >= 0) {
  captions[innerConflictIndex] = {...captions[innerConflictIndex], start: 26};
  if (innerConflictIndex > 0) {
    captions[innerConflictIndex - 1] = {...captions[innerConflictIndex - 1], end: 26};
  }
}

// Manual subtitle range: full-video 37–38s (audio 34–35s).
const idImpulseIndex = captions.findIndex((cue) => cue.text.startsWith("本我追求立刻满足"));
if (idImpulseIndex >= 0) {
  captions[idImpulseIndex] = {...captions[idImpulseIndex], start: 34, end: 35};
}

// Manual subtitle range: full-video 32–35s (audio 29–32s).
const freudIndex = captions.findIndex((cue) => cue.text.startsWith("弗洛伊德把人的心理活动"));
if (freudIndex >= 0) {
  captions[freudIndex] = {...captions[freudIndex], start: 29, end: 32};
  if (freudIndex > 0) {
    captions[freudIndex - 1] = {...captions[freudIndex - 1], end: 29};
  }
}

// Split the opening question into three consecutive, non-overlapping cues.
// Keep its existing total duration and all later subtitle anchors unchanged.
const openingLast = captions.findIndex((cue) => cue.text.includes("？"));
if (openingLast >= 0 && captions[0].text.startsWith("为什么同一家幼儿园里")) {
  const openingStart = captions[0].start;
  const openingEnd = captions[openingLast].end;
  const lines = ["为什么同一家幼儿园里", "有的孩子安静守规矩", "有的孩子却频繁闯祸？"];
  const totalLength = lines.reduce((sum, text) => sum + text.length, 0);
  let consumed = 0;
  const openingCues = lines.map((text, index) => {
    const start = openingStart + (openingEnd - openingStart) * consumed / totalLength;
    consumed += text.length;
    const end = index === lines.length - 1 ? openingEnd : openingStart + (openingEnd - openingStart) * consumed / totalLength;
    return {text, start, end};
  });
  captions.splice(0, openingLast + 1, ...openingCues);
}

// Full-video 14–19s, excluding the three-second intro in audio-relative cues.
const twinsFirst = captions.findIndex((cue) => cue.text.startsWith("但，即使是双胞胎"));
const twinsLast = captions.findIndex((cue, index) => index >= twinsFirst && cue.text.includes("性格和行为也可能很不一样"));
if (twinsFirst >= 0 && twinsLast >= twinsFirst) {
  const oldStart = captions[twinsFirst].start;
  const oldEnd = captions[twinsLast].end;
  for (let index = twinsFirst; index <= twinsLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: 11 + (cue.start - oldStart) / (oldEnd - oldStart) * 5, end: 11 + (cue.end - oldStart) / (oldEnd - oldStart) * 5};
  }
  if (twinsFirst > 0) captions[twinsFirst - 1] = {...captions[twinsFirst - 1], end: 11};
  if (captions[twinsLast + 1]?.start < 16) captions[twinsLast + 1] = {...captions[twinsLast + 1], start: 16};
}

// Display-only segmentation: scene timing lookups continue to use captions above.
// Keep short connective words with the following clause instead of flashing alone.
export const displayCaptions: CaptionCue[] = captions.flatMap((cue) => {
  const parts = cue.text.split(/[，,。.;；：:]/).map((text) => text.trim().replace(/、$/, "")).filter(Boolean);
  const lines: string[] = [];
  let prefix = "";
  for (const part of parts) {
    if (/^(但|所以|比如|于是|不过|很多时候|需要注意的是)$/.test(part)) {
      prefix += part;
    } else {
      lines.push(prefix + part);
      prefix = "";
    }
  }
  if (prefix) lines.push(prefix);
  const total = lines.reduce((sum, text) => sum + text.length, 0);
  const startFrame = Math.round(cue.start * 30);
  const endFrame = Math.round(cue.end * 30);
  let consumed = 0;
  return lines.map((text, index) => {
    const start = startFrame + Math.round((endFrame - startFrame) * consumed / total);
    consumed += text.length;
    const end = index === lines.length - 1 ? endFrame : startFrame + Math.round((endFrame - startFrame) * consumed / total);
    return {...cue, text, start: start / 30, end: end / 30};
  });
});
