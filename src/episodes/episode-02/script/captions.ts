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

// Manual boundary: this shot occupies full-video 55–58.5s (audio-relative 52–55.5s).
const notBadShot = captions.findIndex((cue) => cue.text.startsWith("这不等于孩子天生就坏"));
const impulseManage = captions.findIndex((cue) => cue.text.startsWith("很多时候"));
if (notBadShot >= 0) captions[notBadShot] = {...captions[notBadShot], start: 52, end: 54};
if (impulseManage >= 0) captions[impulseManage] = {...captions[impulseManage], start: 54, end: 55.5};
if (notBadShot > 0) captions[notBadShot - 1] = {...captions[notBadShot - 1], end: 52};

// Repair the preceding reaction sequence after the 55–58.5s manual anchor.
const dissatisfied = captions.findIndex((cue) => cue.text.startsWith("感到不满"));
const directAction = captions.findIndex((cue) => cue.text.startsWith("会直接哭闹"));
if (dissatisfied >= 0) captions[dissatisfied] = {...captions[dissatisfied], start: 49, end: 50};
if (directAction >= 0) captions[directAction] = {...captions[directAction], start: 50, end: 52};
if (dissatisfied > 0) captions[dissatisfied - 1] = {...captions[dissatisfied - 1], end: 49};

const unspokenFirst = captions.findIndex((cue) => cue.text.includes("年幼的孩子很难说清楚"));
const unspokenLast = captions.findIndex((cue, index) => index >= unspokenFirst && cue.text.includes("害怕或者委屈"));
if (unspokenFirst >= 0 && unspokenLast >= unspokenFirst) {
  const sourceStart = captions[unspokenFirst].start;
  const sourceEnd = captions[unspokenLast].end;
  for (let index = unspokenFirst; index <= unspokenLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: 55.5 + (cue.start - sourceStart) / (sourceEnd - sourceStart) * 7.5, end: 55.5 + (cue.end - sourceStart) / (sourceEnd - sourceStart) * 7.5};
  }
}

const seekingFirst = captions.findIndex((cue) => cue.text.includes("他们可能通过捣乱"));
const seekingLast = captions.findIndex((cue, index) => index >= seekingFirst && cue.text.includes("并试图获得关注"));
if (seekingFirst >= 0 && seekingLast >= seekingFirst) {
  const sourceStart = captions[seekingFirst].start;
  const sourceEnd = captions[seekingLast].end;
  for (let index = seekingFirst; index <= seekingLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: 63 + (cue.start - sourceStart) / (sourceEnd - sourceStart) * 7.5, end: 63 + (cue.end - sourceStart) / (sourceEnd - sourceStart) * 7.5};
  }
}

const boundaryFirst = captions.findIndex((cue) => cue.text.startsWith("当情绪失控时"));
const boundaryLast = captions.findIndex((cue, index) => index >= boundaryFirst && cue.text.startsWith("稳定的边界"));
if (boundaryFirst >= 0 && boundaryLast >= boundaryFirst) {
  const sourceStart = captions[boundaryFirst].start;
  const sourceEnd = captions[boundaryLast].end;
  const targetStart = 80.5;
  const targetEnd = 86.5;
  for (let index = boundaryFirst; index <= boundaryLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: targetStart + (cue.start - sourceStart) / (sourceEnd - sourceStart) * (targetEnd - targetStart), end: targetStart + (cue.end - sourceStart) / (sourceEnd - sourceStart) * (targetEnd - targetStart)};
  }
  const shift = targetEnd - sourceEnd;
  for (let index = boundaryLast + 1; index < captions.length; index++) captions[index] = {...captions[index], start: captions[index].start + shift, end: captions[index].end + shift};
}

const attentionNotice = captions.findIndex((cue) => cue.text.includes("需要注意的是这种行为"));
if (attentionNotice >= 0) {
  captions[attentionNotice] = {...captions[attentionNotice], start: 75.5};
  if (attentionNotice > 0) captions[attentionNotice - 1] = {...captions[attentionNotice - 1], end: 75.5};
}

const permissiveFirst = captions.findIndex((cue) => cue.text.includes("如果父母一味放任"));
const permissiveLast = captions.findIndex((cue, index) => index >= permissiveFirst && cue.text.includes("孩子很难学会规则"));
if (permissiveFirst >= 0 && permissiveLast >= permissiveFirst) {
  const sourceStart = captions[permissiveFirst].start;
  const targetStart = 86.5;
  for (let index = permissiveFirst; index <= permissiveLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: targetStart + (cue.start - sourceStart), end: targetStart + (cue.end - sourceStart)};
  }
  if (permissiveFirst > 0) captions[permissiveFirst - 1] = {...captions[permissiveFirst - 1], end: targetStart};
}

const effectiveFinal = captions.findIndex((cue) => cue.text.includes("真正有效的做法"));
const effectiveFinalLast = captions.findIndex((cue, index) => index >= effectiveFinal && cue.text.includes("伤害别人"));
if (effectiveFinal >= 0 && effectiveFinalLast >= effectiveFinal) {
  const oldStart = captions[effectiveFinal].start;
  const oldEnd = captions[effectiveFinalLast].end;
  const targetStart = 96;
  for (let index = effectiveFinal; index <= effectiveFinalLast; index++) {
    const cue = captions[index];
    captions[index] = {...cue, start: targetStart + (cue.start - oldStart) / (oldEnd - oldStart) * 9, end: targetStart + (cue.end - oldStart) / (oldEnd - oldStart) * 9};
  }
  if (effectiveFinal > 0) captions[effectiveFinal - 1] = {...captions[effectiveFinal - 1], end: targetStart};
}

// Final anchor for the boundary sentence: audio-relative 80.5–86.5s
// (full-video 83.5–89.5s). Re-apply after all earlier manual anchors.
const boundaryFinal = captions.findIndex((cue) => cue.text.startsWith("当情绪失控时"));
if (boundaryFinal >= 0) {
  const delta = 80.5 - captions[boundaryFinal].start;
  if (boundaryFinal > 0) {
    captions[boundaryFinal - 1] = {...captions[boundaryFinal - 1], start: 73.5, end: 80.5};
    if (boundaryFinal > 1) captions[boundaryFinal - 2] = {...captions[boundaryFinal - 2], end: 73.5};
  }
  for (let index = boundaryFinal; index < captions.length; index++) captions[index] = {...captions[index], start: captions[index].start + delta, end: captions[index].end + delta};
}

// Keep the transition caption immediately before the boundary scene in order.
if (attentionNotice >= 0) captions[attentionNotice] = {...captions[attentionNotice], start: 70.5, end: 73.5};

// Final order correction after all range remaps.
if (attentionNotice >= 0) {
  captions[attentionNotice] = {...captions[attentionNotice], start: 70.5, end: 73.5};
  captions[attentionNotice].start = 70.5;
  if (attentionNotice > 0) captions[attentionNotice - 1] = {...captions[attentionNotice - 1], end: 70.5};
}

// Full-video 108–117s: death instinct and its theoretical limitation.
const deathRangeFirst = captions.findIndex(c => c.text.startsWith("经典精神分析还用"));
const deathRangeNext = captions.findIndex(c => c.text.startsWith("现代儿童心理学"));
if (deathRangeFirst < 0 || deathRangeNext <= deathRangeFirst) throw new Error("未找到死本能完整段落");
const deathOldStart = captions[deathRangeFirst].start;
const deathOldEnd = captions[deathRangeNext - 1].end;
for (let i = deathRangeFirst; i < deathRangeNext; i++) {
  const cue = captions[i];
  captions[i] = {...cue, start: 105 + (cue.start - deathOldStart) / (deathOldEnd - deathOldStart) * 9,
    end: 105 + (cue.end - deathOldStart) / (deathOldEnd - deathOldStart) * 9};
}
if (deathRangeFirst > 0) captions[deathRangeFirst - 1] = {...captions[deathRangeFirst - 1], end: 105};
captions[deathRangeNext] = {...captions[deathRangeNext], start: 114};

// Display-only segmentation: scene timing lookups continue to use captions above.
// Keep short connective words with the following clause instead of flashing alone.
// Finalize the transition caption after all manual remaps so it cannot retain an old start.
if (attentionNotice >= 0) {
  captions[attentionNotice] = {...captions[attentionNotice], start: 70.5, end: 73.5};
  if (attentionNotice > 0) captions[attentionNotice - 1] = {...captions[attentionNotice - 1], end: 70.5};
}
export const displayCaptions: CaptionCue[] = captions.map((cue) => cue.text.includes("需要注意的是") ? {...cue, start: 70.5, end: 73.5} : cue).flatMap((cue) => {
  if (cue.text.includes("需要注意的是这种行为")) return [{...cue, start: 70.5, end: 73.5, text: cue.text.replace(/[，。]/g, "")}];
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
