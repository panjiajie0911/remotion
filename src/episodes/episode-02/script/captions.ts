import type { CaptionCue } from "../../../components";

const script = `为什么同一家幼儿园里，有的孩子安静守规矩，有的孩子却频繁闯祸？

很多人会把原因归结为年龄或家庭教育。但，即使是双胞胎，性格和行为也可能很不一样。所以，孩子所谓的“熊”，通常不是由单一因素造成的。

精神分析提供了一种理解角度：有些看似捣乱的行为，可能是孩子把内在冲突“演”了出来。

弗洛伊德把人的心理活动分为“本我、自我和超我”。本我追求立刻满足；自我负责考虑现实；超我代表规则和道德。幼儿的自我控制能力还没有发展成熟，想要什么会立刻去拿；感到不满，会直接哭闹、抢夺或者顶嘴。

这不等于孩子天生就坏。很多时候，他们只是还不会管理冲动。

比如，年幼的孩子很难说清楚：“我感到被忽视、嫉妒、害怕或者委屈”。于是，他们可能通过捣乱、拒绝配合或争抢来表达情绪，并试图获得关注。需要注意的是，这种行为可能发生在不同家庭中。

心理学家温尼科特提出，孩子需要“足够好的环境”。当情绪失控时，成年人既要理解他的感受，更要提供清晰、稳定的边界。

如果父母一味放任，孩子很难学会规则；如果管教过度严厉，合理需求被压制，可能带来更强烈的反抗。真正有效的做法，是温和而坚定地告诉孩子：情绪可以被理解，但伤害别人、破坏物品的行为是不对的。

经典精神分析还用“死本能”解释人的攻击和破坏倾向。不过，这只是一个理论概念，并不是已经被证实的单一原因。现代儿童心理学更常从冲动控制、情绪调节、先天气质、压力和环境模仿等方面，综合理解孩子的攻击或破坏行为。

所以，比起简单地说“这就是个熊孩子”，更重要的是观察：这个行为在什么时候发生？孩子想表达什么？他是不会表达、控制不住，还是在试探边界？

看懂行为背后的需要，设立稳定的规则，再教给孩子更合适的表达方式，才是帮助他建立自我控制能力的开始。`;

const chunks = script.split(/(?<=[。！？])/).flatMap((sentence) => {
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
