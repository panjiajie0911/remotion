# 系列视觉系统

所有期共用一套 token 和组件。每期只提供内容：期号、标题、金色关键词、钩子、章节、字幕、结尾卡、封面文案。

## 新建一期

复制 `src/episodes/_template` 为 `src/episodes/episode-XX`，然后：

1. 改 `meta.ts`：期号、系列名、标题分行、`emphasisWords`、`hook`、`closing`、`cover`。
2. 改 `timeline.ts`：片头和每段素材的帧数。
3. 改 `script/cues.ts`：每段一个字幕数组，时间是场景时钟。
4. 在 `index.tsx` 用 `FootageScene` 组合素材，用 `EpisodeShell` 排列顺序。
5. 在 `src/entries/episode-XX.tsx` 注册正片和 `createEpisodeCover(meta)`。

新增文案后运行 `npm run font:subset`，重建本地 Noto Sans SC 子集。

## 组件

| 组件 | 用途 |
| --- | --- |
| `SeriesIntro` | 统一片头，支持分行标题、金色关键词、6 秒第二拍钩子、大头像和眨眼 |
| `FootageScene` | 素材 + 底部 scrim + 字幕 + 可选章节卡 + 叠化/结尾卡插槽 |
| `ChapterCard` | 顶部章节卡：金色序号、标题、说明，不遮挡字幕 |
| `VideoCaption` | 烧录字幕，支持第二行、关键词金色强调、定时退场 |
| `ClosingCard` | 结尾卡：压暗、金色短线、收束语、期号 |
| `EpisodeCover` | 9:16 封面，标题、金色下划线、头像、封面文案 |
| `EpisodeShell` | 片头 + 连续场景 + 口播 + BGM 的统一容器 |

## 规则

- 颜色、字号、间距、行高、动效只从 `src/lib/theme.ts` 取。
- 每期只改 `meta.ts` 和内容数组，不覆盖组件的字号、间距和颜色。
- 章节卡只放在需要分段的三段素材上，固定从场景开头进入、约 2.7 秒退场。
- 字幕底部固定在 320 安全区；关键词用 `emphasis` 标记，自动变金色。
- 运行 `npm run check:tokens` 检查硬编码颜色和字号；`npm run ds` 打开设计系统预览。
