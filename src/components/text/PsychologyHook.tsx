import { MinimalIntro } from "../intro/MinimalIntro";
import type { MinimalIntroProps } from "../intro/MinimalIntro";

export type PsychologyHookProps = {
  question: MinimalIntroProps["title"];
  emphasis?: string;
  series: string;
  author: string;
  eyebrow?: string;
};

/** 心理学开头预设，保留已有调用接口。 */
export const PsychologyHook = ({
  question,
  emphasis,
  series,
  author,
  eyebrow = "",
}: PsychologyHookProps) => (
  <MinimalIntro
  
    title={question}
    emphasis={emphasis}
    eyebrow={eyebrow}
    label={series}
    author={author}
  />
);
