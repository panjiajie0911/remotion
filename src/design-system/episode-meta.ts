/** Everything that changes from one episode to the next, and nothing else. */
export type EpisodeMeta = {
  id: string;
  /** e.g. "第 03 期" */
  numberLabel: string;
  /** e.g. "心理观察" */
  seriesLabel: string;
  /** One line per visual row in the shared intro. */
  title: string[];
  emphasisWords?: string[];
  /** Second-beat line revealed after the intro title settles. */
  hook?: string;
  avatarSize?: number;
  closing?: {
    kicker?: string;
    lines: string[];
  };
  cover?: {
    /** Cover-specific line breaks when the episode title is too long. */
    title?: string[];
    titleSize?: number;
    subtitle?: string;
    signoff?: string;
    note?: string;
  };
};
