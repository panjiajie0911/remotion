# 统一视频开篇

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
