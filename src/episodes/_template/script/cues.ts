import type {CaptionCue} from "../../../design-system/captions";

// One array per footage scene. Times live in the scene clock, not the episode clock.
export const TEMPLATE_CUES: CaptionCue[] = [
  {from: 0, text: "第一句字幕", emphasis: "关键字"},
  {from: 60, text: "第二句字幕", secondLine: "第二行"},
];
