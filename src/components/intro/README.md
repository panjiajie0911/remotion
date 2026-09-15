# 统一视频开篇

系列视频统一使用 `SeriesIntro`。头像背景图和动效固定，标题通过参数传入：

```tsx
import { SeriesIntro, SERIES_INTRO_DURATION } from "../../components";

<Sequence durationInFrames={SERIES_INTRO_DURATION}>
  <SeriesIntro
    eyebrow="第 01 期 · 心理观察"
    title={["那些你以为是", "正常", "其实是创伤"]}
  />
</Sequence>
```

`title` 支持字符串、换行字符串或字符串数组；`emphasisLine` 默认高亮第二行，`eyebrow` 和 `footer` 可选。组件本身不强制时间线，但标准片头时长由 `SERIES_INTRO_DURATION` 统一设为 3 秒。

旧版 `MinimalIntro` 保留用于其它需要自由布局的标题卡。

直接使用从组件总入口导出的 `MinimalIntro`，只需传入本期标题：

```tsx
import { MinimalIntro } from "../../components";

<MinimalIntro title="为什么我们总觉得自己不够好？" />
```

标题自动换行；需要控制分行时，使用数组或字符串中的换行符：

```tsx
<MinimalIntro
  title={["为什么我们总觉得", "自己不够好？"]}
  emphasis="不够好"
/>
```

`eyebrow`（眉题）、`label`（期数或栏目）、`author`（署名）均为可选项。配色、字体及字号来自公共 `theme`，不填写眉题时不占位，不显示装饰横线。

组件不决定片段时长。放入现有时间线的 `Sequence` 中，使用 `durationInFrames` 控制开篇长度。建议从 3 秒开始，根据标题阅读时间调整。

`PsychologyHook` 继续兼容原有的 `question`、`series` 参数，并复用此组件。
