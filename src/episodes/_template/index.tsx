import {SeriesIntro} from "../../components/intro/SeriesIntro";
import {createEpisodeCover, EpisodeShell} from "../../design-system";
import {theme} from "../../lib/theme";
import {TEMPLATE_META} from "./meta";
import {TEMPLATE_INTRO_DURATION} from "./timeline";

export const EpisodeTemplate = () => (
  <EpisodeShell
    background={theme.palette.night}
    intro={{
      name: "统一片头",
      durationInFrames: TEMPLATE_INTRO_DURATION,
      node: (
        <SeriesIntro
          eyebrow={`${TEMPLATE_META.numberLabel} · ${TEMPLATE_META.seriesLabel}`}
          title={TEMPLATE_META.title}
          emphasisWords={TEMPLATE_META.emphasisWords}
          hook={TEMPLATE_META.hook}
          avatarSize={TEMPLATE_META.avatarSize ?? theme.layout.avatar}
        />
      ),
    }}
    scenes={[]}
  />
);

export const EpisodeTemplateCover = createEpisodeCover(TEMPLATE_META);

export default EpisodeTemplate;
