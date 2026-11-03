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

export const EPISODE04_ID = EPISODE04_META.id;
export const EPISODE04_FPS = 30;
export const EPISODE04_INTRO_DURATION = SERIES_INTRO_DURATION;
export const EPISODE04_S01_DURATION = S01_DURATION_IN_FRAMES;
export const EPISODE04_S02_DURATION = S02_DURATION_IN_FRAMES;
export const EPISODE04_S03_DURATION = S03_DURATION_IN_FRAMES;
export const EPISODE04_S04_DURATION = S04_DURATION_IN_FRAMES;
export const EPISODE04_S05_DURATION = S05_DURATION_IN_FRAMES;
export const EPISODE04_S06_DURATION = S06_DURATION_IN_FRAMES;
export const EPISODE04_DURATION =
  EPISODE04_INTRO_DURATION +
  EPISODE04_S01_DURATION +
  EPISODE04_S02_DURATION +
  EPISODE04_S03_DURATION +
  EPISODE04_S04_DURATION +
  EPISODE04_S05_DURATION +
  EPISODE04_S06_DURATION;
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
    ]}
  />
);

export default Episode04;
