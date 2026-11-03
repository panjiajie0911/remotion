import {AbsoluteFill, Series} from "remotion";
import {S01Preview, S01_DURATION_IN_FRAMES} from "./S01Preview";
import {CardChapter01, CardChapter02, CardChapter03, Closing05} from "./cards";

export const CARD01_DURATION = 75;
export const CARD02_DURATION = 75;
export const CARD03_DURATION = 75;
export const CLOSING_DURATION = 150;

export const SHOTS_PREVIEW_DURATION =
  S01_DURATION_IN_FRAMES + CARD01_DURATION + CARD02_DURATION + CARD03_DURATION + CLOSING_DURATION;

export const ShotsPreview = () => (
  <AbsoluteFill style={{backgroundColor: "#0D0A09"}}>
    <Series>
      <Series.Sequence durationInFrames={S01_DURATION_IN_FRAMES}>
        <S01Preview />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CARD01_DURATION}>
        <CardChapter01 durationInFrames={CARD01_DURATION} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CARD02_DURATION}>
        <CardChapter02 durationInFrames={CARD02_DURATION} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CARD03_DURATION}>
        <CardChapter03 durationInFrames={CARD03_DURATION} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CLOSING_DURATION}>
        <Closing05 durationInFrames={CLOSING_DURATION} />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
