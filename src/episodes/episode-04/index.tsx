import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
import {createEpisodeCover, EpisodeShell} from "../../design-system";
import {theme} from "../../lib/theme";
import {EPISODE04_META} from "./meta";

export const EPISODE04_ID = EPISODE04_META.id;
export const EPISODE04_FPS = 30;
export const EPISODE04_DURATION = SERIES_INTRO_DURATION;
export const Episode04Cover = createEpisodeCover(EPISODE04_META);

export const Episode04 = () => (
  <EpisodeShell
    background={theme.palette.canvas}
    intro={{
      name: "统一片头",
      durationInFrames: SERIES_INTRO_DURATION,
      node: (
        <SeriesIntro
          eyebrow={`${EPISODE04_META.numberLabel} · ${EPISODE04_META.seriesLabel}`}
          title={EPISODE04_META.title}
          emphasisWords={EPISODE04_META.emphasisWords}
          avatarSize={EPISODE04_META.avatarSize ?? theme.layout.avatar}
        />
      ),
    }}
    scenes={[]}
  />
);

export default Episode04;
