import {Series} from "remotion";
import {SeriesIntro, SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";

export const EPISODE04_ID = "Episode04RedScarf";
export const EPISODE04_FPS = 30;
export const EPISODE04_DURATION = SERIES_INTRO_DURATION;

export const Episode04 = () => (
  <Series>
    <Series.Sequence durationInFrames={SERIES_INTRO_DURATION} name="统一片头">
      <SeriesIntro
        title={[
          "今天发生的一切",
          "让你焦虑的事情，",
          "都不过是小学三年级",
          "忘戴的红领巾",
        ]}
        emphasisLines={[3]}
      />
    </Series.Sequence>
  </Series>
);

export default Episode04;
