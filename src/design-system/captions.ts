export type CaptionCue = {
  /** Frame in the scene clock at which this cue becomes visible. */
  from: number;
  text: string;
  secondLine?: string;
  /** Substring promoted to the gold emphasis treatment. */
  emphasis?: string;
  /** Scene-clock frame at which the cue starts fading out. */
  until?: number;
};

/** Last cue whose start has passed, matching the burned-in caption rhythm. */
export const findCue = (cues: CaptionCue[], frame: number): CaptionCue | undefined => {
  for (let index = cues.length - 1; index >= 0; index -= 1) {
    if (frame >= cues[index].from) return cues[index];
  }
  return undefined;
};
