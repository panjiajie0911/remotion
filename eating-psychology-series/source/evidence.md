# 来源与映射

这套体系不是凭空重画，而是从已经渲染完成的第三、四期视频与共享组件中抽取。

## 直接来源

| 体系内容 | 来源 |
| --- | --- |
| 画布、边距、字号、间距、动效 | `src/lib/theme.ts` |
| 片头三拍、钩子、眨眼、1.2% 缓推 | `src/components/intro/SeriesIntro.tsx` |
| 章节卡位置、字号、退场 | `src/design-system/ChapterCard.tsx` |
| 字幕 scrim、字号、关键词金色 | `src/design-system/VideoCaption.tsx` |
| 结尾卡压暗、金线、逐行出现 | `src/design-system/ClosingCard.tsx` |
| 9:16 封面版式 | `src/design-system/EpisodeCover.tsx` |
| 实际封面输出 | `out/episode-03-cover.png`、`out/episode-04-cover.png` |
| 字体与许可 | `src/assets/font/NotoSansSC-VF-subset.woff2`、`OFL.txt` |

## 取值说明

- 纸白 `#F5F6F7`、墨黑 `#15171C`、金色 `#C3A66B`、夜黑 `#0F1115` 均来自 `theme.ts` 的 palette。
- `theme.ts` 里的蓝色 `accent #527DCE` 是首版遗留，实际画面中的强调全部使用 `mark #C3A66B`。因此在本体系中，`--accent` 绑定金色，蓝色降级为 `--accent-cool`，不进入新画面。
- `--surface-warm` 与 `--border-soft` 由纸白与金色/分隔线混合得到，不新增手写 hex。
- 视频字号使用 `--frame-text-*`，与 `theme.ts` 的 24 / 30 / 28 / 40 / 48 / 64 / 88 / 120 一一对应。
- 字幕底边 320px、最大宽 820px、字号 48px、行高 1.5、字距 1px，来自 `theme.captions.onVideo`。
- 片头 90 帧、3 秒第二拍、6 秒缓推、四次眨眼，来自 `SeriesIntro.tsx` 与 `SERIES_INTRO_DURATION`。
- 封面头像 160px 来自 `theme.layout.avatarLarge / 2`；片头头像 96px 来自 `theme.layout.avatar`。

## 已知边界

- 这份包是静态设计规范与预览，不包含 Remotion 运行时。
- 预览页用 CSS 复刻画面比例与排版；真实动效以 Remotion 组件为准。
- 字体子集只覆盖当前文案与预览页用字；新增文案后需要重建子集。
- 真实封面图保留在 `assets/covers/`，用于对照；预览中的 9:16 画面是 CSS 复刻。
