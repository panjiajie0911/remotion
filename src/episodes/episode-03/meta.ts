import type {EpisodeMeta} from "../../design-system/episode-meta";
import {theme} from "../../lib/theme";

export const EPISODE03_META: EpisodeMeta = {
  id: "Episode03EatingHabits",
  numberLabel: "第 03 期",
  seriesLabel: "心理观察",
  title: ["你的吃饭习惯", "暴露了你的心理"],
  emphasisWords: ["吃饭习惯"],
  hook: "你知道吗？",
  avatarSize: theme.layout.avatarLarge,
  closing: {
    kicker: "一个习惯，不能定义你",
    lines: ["事已至此", "先吃饭吧。"],
  },
  cover: {
    subtitle: "吃饭的样子，藏着你的来路",
    signoff: "事已至此，先吃饭吧。",
    note: "一个习惯，不能定义你",
  },
};
