# 新一期模板

复制本目录为 `episode-XX`，按下面顺序替换内容，视觉规则不需要再改。

1. `meta.ts`：期号、系列名、标题分行、金色关键词、钩子句、结尾卡文案、封面文案。
2. `timeline.ts`：片头和各段时长，全部用帧表示。
3. `script/cues.ts`：每段素材的字幕数组，时间写在该段的场景时钟里。
4. `index.tsx`：把素材和字幕数组交给 `FootageScene`，再用 `EpisodeShell` 按顺序排好。
5. `src/entries/episode-XX.tsx`：注册正片和封面两个 Composition。

规则：

- 颜色、字号、间距、动效只从 `theme` 取，不写死数值。
- 片头、章节卡、字幕、结尾卡、封面全部使用共享组件。
- 新增文案后运行 `npm run font:subset`，让本地字体子集包含新汉字。
