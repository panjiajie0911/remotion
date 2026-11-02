import type {EpisodeMeta} from "../../design-system/episode-meta";
import {theme} from "../../lib/theme";

export const TEMPLATE_META: EpisodeMeta = {
  id: "EpisodeTemplate",
  numberLabel: "第 00 期",
  seriesLabel: "系列名",
  title: ["标题第一行", "标题第二行"],
  emphasisWords: ["关键词"],
  hook: "你知道吗？",
  avatarSize: theme.layout.avatarLarge,
  closing: {
    kicker: "一句收束",
    lines: ["第一行", "第二行。"],
  },
  cover: {
    subtitle: "封面副标题",
    signoff: "封面收束语",
    note: "封面注脚",
  },
};
