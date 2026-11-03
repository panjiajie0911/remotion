# 使用说明

这套目录既是一个可审阅的设计体系，也是一个可以直接导入 OpenDesign 的本地包。

## 导入 OpenDesign

1. 打开「设计体系」。
2. 点右上角「创建」。
3. 展开「高级」，选择「本地代码」。
4. 选择本目录 `eating-psychology-series`。
5. 生成后先看预览与 `DESIGN.md`，确认无误再点「发布」。
6. 回到首页或项目里的设计体系选择器，选中「心理观察 · 系列视觉体系」。

这是本地包，不会自动同步到 GitHub；发布也不会把改动写回源目录。

## 阅读顺序

1. `DESIGN.md`：视觉意图、规则、正反例。
2. `tokens.css`：颜色、字号、间距、动效的唯一来源。
3. `components.html`：五个固定画面的静态对照。
4. `preview/index.html`：完整体系预览与真实封面输出。
5. `source/evidence.md`：这些值来自哪里。

## 在视频工程里使用

这套体系对应以下共享组件：

| 体系里的画面 | Remotion 组件 |
| --- | --- |
| 片头 | `SeriesIntro` |
| 素材 + 字幕 + 章节 | `FootageScene` |
| 章节卡 | `ChapterCard` |
| 字幕 | `VideoCaption` |
| 结尾卡 | `ClosingCard` |
| 9:16 封面 | `EpisodeCover` / `createEpisodeCover` |
| 全片容器 | `EpisodeShell` |

每一期只改：

- `meta.ts`：期号、系列名、标题分行、关键词、钩子、章节、结尾、封面文案。
- `timeline.ts`：片头与素材的帧数。
- `script/cues.ts`：每段字幕数组。

不要在每个单期里覆盖颜色、字号、间距、行高或动效。

## 字体

- 视频渲染使用本地 Noto Sans SC 可变子集。
- 新增文案后要重建子集，否则新字会回退到系统字体。
- 字体许可见 `assets/fonts/OFL.txt`。
- 在网页或文档里使用时，保留 `--font-body` 的完整回退栈。

## Token 约定

- `--bg` / `--paper`：纸白画布。
- `--fg` / `--ink`：主文字。
- `--accent` / `--gold`：唯一强调色。
- `--night`：深色字幕底与结尾卡。
- `--safe-bottom`：320px 平台安全区。
- `--caption-bottom`：字幕底边，固定 320px。
- `--frame-*`：1080 × 1920 的帧级尺寸。
- `--motion-*` / `--ease-standard`：动效时长与曲线。

不要发明新的 hex、字号、圆角或阴影。需要新值时，先改 `tokens.css` 和 `DESIGN.md`，再改组件。

## 每期检查

- [ ] 画布 1080 × 1920，30fps。
- [ ] 标题最多两行，字幕最多两行。
- [ ] 字幕底边 320px，最大宽 820px。
- [ ] 一帧最多一个金色元素组。
- [ ] 纸白底没有金色正文。
- [ ] 章节卡只出现在分段素材。
- [ ] 结尾卡只出现一次，且不叠字幕。
- [ ] 封面顶部有期号与系列名。
- [ ] 新增汉字后已重建字体子集。
