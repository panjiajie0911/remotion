import type {EpisodeMeta} from "../../design-system/episode-meta";
import {theme} from "../../lib/theme";

export const EPISODE04_META: EpisodeMeta = {
  id: "Episode04RedScarf",
  numberLabel: "第 04 期",
  seriesLabel: "心理观察",
  title: ["今天让你焦虑的事", "不过是小学三年级", "忘戴的红领巾"],
  emphasisWords: ["红领巾"],
  avatarSize: theme.layout.avatarLarge,
  cover: {
    title: ["今天让你焦虑的事", "不过是忘戴的红领巾"],
    titleSize: theme.typography.size.title,
    subtitle: "焦虑的背面，是小时候的自己",
    signoff: "今天让你焦虑的事",
    note: "不过是忘戴的红领巾",
  },
};
