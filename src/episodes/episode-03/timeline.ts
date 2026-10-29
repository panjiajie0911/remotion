import {SERIES_INTRO_DURATION} from "../../components/intro/SeriesIntro";
export const EPISODE03_FPS = 30;
// Provisional proportional timing until the narration is aligned sentence by sentence.
export const EPISODE03_NARRATION_DURATION = Math.ceil(88.681 * EPISODE03_FPS);
export const EPISODE03_TIME_SCALE = EPISODE03_NARRATION_DURATION / 1715;
export const EPISODE03_OPENING_DURATION = Math.ceil(122 * EPISODE03_TIME_SCALE);
export const EPISODE03_DELICIOUS_DURATION = Math.ceil(134 * EPISODE03_TIME_SCALE);
export const EPISODE03_REVERSE_DURATION = Math.ceil(303 * EPISODE03_TIME_SCALE);
export const EPISODE03_ADULT_DURATION = Math.ceil(304 * EPISODE03_TIME_SCALE); // ceil(10.100998 seconds * 30 fps).
export const EPISODE03_EAT_DURATION = Math.ceil(152 * EPISODE03_TIME_SCALE); // ceil(5.061995 seconds * 30 fps).
export const EPISODE03_DISAPPOINT_DURATION = Math.ceil(152 * EPISODE03_TIME_SCALE); // ceil(5.061995 seconds * 30 fps).
export const EPISODE03_FULL_DURATION = Math.ceil(123 * EPISODE03_TIME_SCALE); // ceil(4.087007 seconds * 30 fps).
export const EPISODE03_PICK_DURATION = Math.ceil(122 * EPISODE03_TIME_SCALE); // ceil(4.063991 seconds * 30 fps).
export const EPISODE03_FINAL_DURATION = Math.ceil(303 * EPISODE03_TIME_SCALE); // ceil(10.08 seconds * 30 fps).

// Total duration of the consecutive intro and video sequences.
export const EPISODE03_DURATION =
  SERIES_INTRO_DURATION +
  EPISODE03_OPENING_DURATION +
  EPISODE03_DELICIOUS_DURATION +
  EPISODE03_REVERSE_DURATION +
  EPISODE03_ADULT_DURATION +
  EPISODE03_EAT_DURATION +
  EPISODE03_DISAPPOINT_DURATION +
  EPISODE03_FULL_DURATION +
  EPISODE03_PICK_DURATION +
  EPISODE03_FINAL_DURATION;
