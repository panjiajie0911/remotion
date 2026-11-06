import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
import {createEpisodeCover, EpisodeShell} from "../../design-system";
import {theme} from "../../lib/theme";
import {EPISODE04_META} from "./meta";
import {S01Preview, S01_DURATION_IN_FRAMES} from "./scenes/S01Preview";
import {S02Scene, S02_DURATION_IN_FRAMES} from "./scenes/S02Scene";
import {S03Scene, S03_DURATION_IN_FRAMES} from "./scenes/S03Scene";
import {S04Scene, S04_DURATION_IN_FRAMES} from "./scenes/S04Scene";
import {S05Scene, S05_DURATION_IN_FRAMES} from "./scenes/S05Scene";
import {S06Scene, S06_DURATION_IN_FRAMES} from "./scenes/S06Scene";
import {S07Scene, S07_DURATION_IN_FRAMES} from "./scenes/S07Scene";
import {S08Scene, S08_DURATION_IN_FRAMES} from "./scenes/S08Scene";
import {S09Scene, S09_DURATION_IN_FRAMES} from "./scenes/S09Scene";
import {S10Scene, S10_DURATION_IN_FRAMES} from "./scenes/S10Scene";
import {S11Scene, S11_DURATION_IN_FRAMES} from "./scenes/S11Scene";
import {S12Scene, S12_DURATION_IN_FRAMES} from "./scenes/S12Scene";
import {S13Scene, S13_DURATION_IN_FRAMES} from "./scenes/S13Scene";
import {S14Scene, S14_DURATION_IN_FRAMES} from "./scenes/S14Scene";
import {S15Scene, S15_DURATION_IN_FRAMES} from "./scenes/S15Scene";
import {S16Scene, S16_DURATION_IN_FRAMES} from "./scenes/S16Scene";
import {S17Scene, S17_DURATION_IN_FRAMES} from "./scenes/S17Scene";
import {S18Scene, S18_DURATION_IN_FRAMES} from "./scenes/S18Scene";
import {S19Scene, S19_DURATION_IN_FRAMES} from "./scenes/S19Scene";
import {S20Scene, S20_DURATION_IN_FRAMES} from "./scenes/S20Scene";
import {S21Scene, S21_DURATION_IN_FRAMES} from "./scenes/S21Scene";
import {S22Scene, S22_DURATION_IN_FRAMES} from "./scenes/S22Scene";
import {S23Scene, S23_DURATION_IN_FRAMES} from "./scenes/S23Scene";
import {S24Scene, S24_DURATION_IN_FRAMES} from "./scenes/S24Scene";
import {S25Scene, S25_DURATION_IN_FRAMES} from "./scenes/S25Scene";
import {S26Scene, S26_DURATION_IN_FRAMES} from "./scenes/S26Scene";

export const EPISODE04_ID = EPISODE04_META.id;
export const EPISODE04_FPS = 30;
export const EPISODE04_INTRO_DURATION = SERIES_INTRO_DURATION;
export const EPISODE04_S01_DURATION = S01_DURATION_IN_FRAMES;
export const EPISODE04_S02_DURATION = S02_DURATION_IN_FRAMES;
export const EPISODE04_S03_DURATION = S03_DURATION_IN_FRAMES;
export const EPISODE04_S04_DURATION = S04_DURATION_IN_FRAMES;
export const EPISODE04_S05_DURATION = S05_DURATION_IN_FRAMES;
export const EPISODE04_S06_DURATION = S06_DURATION_IN_FRAMES;
export const EPISODE04_S07_DURATION = S07_DURATION_IN_FRAMES;
export const EPISODE04_S08_DURATION = S08_DURATION_IN_FRAMES;
export const EPISODE04_S09_DURATION = S09_DURATION_IN_FRAMES;
export const EPISODE04_S10_DURATION = S10_DURATION_IN_FRAMES;
export const EPISODE04_S11_DURATION = S11_DURATION_IN_FRAMES;
export const EPISODE04_S12_DURATION = S12_DURATION_IN_FRAMES;
export const EPISODE04_S13_DURATION = S13_DURATION_IN_FRAMES;
export const EPISODE04_S14_DURATION = S14_DURATION_IN_FRAMES;
export const EPISODE04_S15_DURATION = S15_DURATION_IN_FRAMES;
export const EPISODE04_S16_DURATION = S16_DURATION_IN_FRAMES;
export const EPISODE04_S17_DURATION = S17_DURATION_IN_FRAMES;
export const EPISODE04_S18_DURATION = S18_DURATION_IN_FRAMES;
export const EPISODE04_S19_DURATION = S19_DURATION_IN_FRAMES;
export const EPISODE04_S20_DURATION = S20_DURATION_IN_FRAMES;
export const EPISODE04_S21_DURATION = S21_DURATION_IN_FRAMES;
export const EPISODE04_S22_DURATION = S22_DURATION_IN_FRAMES;
export const EPISODE04_S23_DURATION = S23_DURATION_IN_FRAMES;
export const EPISODE04_S24_DURATION = S24_DURATION_IN_FRAMES;
export const EPISODE04_S25_DURATION = S25_DURATION_IN_FRAMES;
export const EPISODE04_S26_DURATION = S26_DURATION_IN_FRAMES;
export const EPISODE04_DURATION =
  EPISODE04_INTRO_DURATION +
  EPISODE04_S01_DURATION +
  EPISODE04_S02_DURATION +
  EPISODE04_S03_DURATION +
  EPISODE04_S04_DURATION +
  EPISODE04_S05_DURATION +
  EPISODE04_S06_DURATION +
  EPISODE04_S07_DURATION +
  EPISODE04_S08_DURATION +
  EPISODE04_S09_DURATION +
  EPISODE04_S10_DURATION +
  EPISODE04_S11_DURATION +
  EPISODE04_S12_DURATION +
  EPISODE04_S13_DURATION +
  EPISODE04_S14_DURATION +
  EPISODE04_S15_DURATION +
  EPISODE04_S16_DURATION +
  EPISODE04_S17_DURATION +
  EPISODE04_S18_DURATION +
  EPISODE04_S19_DURATION +
  EPISODE04_S20_DURATION +
  EPISODE04_S21_DURATION +
  EPISODE04_S22_DURATION +
  EPISODE04_S23_DURATION +
  EPISODE04_S24_DURATION +
  EPISODE04_S25_DURATION +
  EPISODE04_S26_DURATION;
export const Episode04Cover = createEpisodeCover(EPISODE04_META);

export const Episode04 = () => (
  <EpisodeShell
    background={theme.palette.night}
    intro={{
      name: "统一片头",
      durationInFrames: EPISODE04_INTRO_DURATION,
      node: (
        <SeriesIntro
          eyebrow={`${EPISODE04_META.numberLabel} · ${EPISODE04_META.seriesLabel}`}
          title={EPISODE04_META.title}
          emphasisWords={EPISODE04_META.emphasisWords}
          avatarSize={EPISODE04_META.avatarSize ?? theme.layout.avatar}
        />
      ),
    }}
    scenes={[
      {
        name: "S01 空教室 · 红领巾",
        durationInFrames: EPISODE04_S01_DURATION,
        node: <S01Preview />,
      },
      {
        name: "S02 校门口 · 红领巾",
        durationInFrames: EPISODE04_S02_DURATION,
        node: <S02Scene />,
      },
      {
        name: "S03 教室 · 当众批评",
        durationInFrames: EPISODE04_S03_DURATION,
        premountFor: 60,
        node: <S03Scene />,
      },
      {
        name: "S04 门外 · 罚站",
        durationInFrames: EPISODE04_S04_DURATION,
        premountFor: 60,
        node: <S04Scene />,
      },
      {
        name: "S05 走廊墙角 · 影子与红领巾",
        durationInFrames: EPISODE04_S05_DURATION,
        premountFor: 60,
        node: <S05Scene />,
      },
      {
        name: "S06 三连蒙太奇 · 多年之后",
        durationInFrames: EPISODE04_S06_DURATION,
        premountFor: 60,
        node: <S06Scene />,
      },
      {
        name: "S07 会议室 · 双重曝光",
        durationInFrames: EPISODE04_S07_DURATION,
        premountFor: 60,
        node: <S07Scene />,
      },
      {
        name: "S08 字卡 · 第一章 在恐吓中长大",
        durationInFrames: EPISODE04_S08_DURATION,
        premountFor: 24,
        node: <S08Scene />,
      },
      {
        name: "S09 分屏 · 家长与老师",
        durationInFrames: EPISODE04_S09_DURATION,
        premountFor: 60,
        node: <S09Scene />,
      },
      {
        name: "S10 黑板 · 红章压下后果",
        durationInFrames: EPISODE04_S10_DURATION,
        premountFor: 30,
        node: <S10Scene />,
      },
      {
        name: "S11 天平 · 人格问题",
        durationInFrames: EPISODE04_S11_DURATION,
        premountFor: 30,
        node: <S11Scene />,
      },
      {
        name: "S12 聚光灯 · 公开示众",
        durationInFrames: EPISODE04_S12_DURATION,
        premountFor: 30,
        node: <S12Scene />,
      },
      {
        name: "S13 试卷叠校门 · 没出息",
        durationInFrames: EPISODE04_S13_DURATION,
        premountFor: 30,
        node: <S13Scene />,
      },
      {
        name: "S14 请柬与餐桌 · 横移",
        durationInFrames: EPISODE04_S14_DURATION,
        premountFor: 30,
        node: <S14Scene />,
      },
      {
        name: "S15 路中央 · 三块标签",
        durationInFrames: EPISODE04_S15_DURATION,
        premountFor: 30,
        node: <S15Scene />,
      },
      {
        name: "S16 走廊 · 长大",
        durationInFrames: EPISODE04_S16_DURATION,
        premountFor: 30,
        node: <S16Scene />,
      },
      {
        name: "S17 字卡 · 第二章 身体还记得害怕",
        durationInFrames: EPISODE04_S17_DURATION,
        premountFor: 24,
        node: <S17Scene />,
      },
      {
        name: "S18 提线木偶 · 潜意识",
        durationInFrames: EPISODE04_S18_DURATION,
        premountFor: 30,
        node: <S18Scene />,
      },
      {
        name: "S19 办公室 · 一句批评",
        durationInFrames: EPISODE04_S19_DURATION,
        premountFor: 30,
        node: <S19Scene />,
      },
      {
        name: "S20 办公室变形 · 老师影子",
        durationInFrames: EPISODE04_S20_DURATION,
        premountFor: 30,
        node: <S20Scene />,
      },
      {
        name: "S21 肩颈特写 · 条件化反应",
        durationInFrames: EPISODE04_S21_DURATION,
        premountFor: 30,
        node: <S21Scene />,
      },
      {
        name: "S22 评审席 · 换脸",
        durationInFrames: EPISODE04_S22_DURATION,
        premountFor: 30,
        node: <S22Scene />,
      },
      {
        name: "S23 字卡 · 第三章 事实和价值分开",
        durationInFrames: EPISODE04_S23_DURATION,
        premountFor: 24,
        node: <S23Scene />,
      },
      {
        name: "S24 图解 · 事实 / 价值",
        durationInFrames: EPISODE04_S24_DURATION,
        premountFor: 24,
        node: <S24Scene />,
      },
      {
        name: "S25 桌面红领巾 · 标签飘走",
        durationInFrames: EPISODE04_S25_DURATION,
        premountFor: 30,
        node: <S25Scene />,
      },
      {
        name: "S26 四张卡片 · 都是事实",
        durationInFrames: EPISODE04_S26_DURATION,
        premountFor: 30,
        node: <S26Scene />,
      },
    ]}
  />
);

export default Episode04;
