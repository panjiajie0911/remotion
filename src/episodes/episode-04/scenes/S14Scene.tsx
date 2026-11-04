import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from "remotion";
import {CaptionScrim} from "../../../design-system";
import s14Invitation from "../assets/img/qt.jpg";
import s14Table from "../assets/img/table.jpg";
import {Grain} from "./cards";
import {SubtitleTrack} from "./SubtitleTrack";

export const S14_DURATION_IN_FRAMES = 150;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const FRAME_HEIGHT = 1920;
const PANEL_WIDTH = 1080;
const PANEL_HEIGHT = (1376 / 768) * PANEL_WIDTH;
const PANEL_TOP = (FRAME_HEIGHT - PANEL_HEIGHT) / 2;

export const S14Scene = () => {
  const frame = useCurrentFrame();

  const pan = interpolate(frame, [6, 116], [0, -PANEL_WIDTH], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.25, 1),
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#0B0908", overflow: "hidden"}}>
      <div
        style={{
          height: FRAME_HEIGHT,
          left: 0,
          position: "absolute",
          top: 0,
          translate: `${pan}px 0`,
          width: PANEL_WIDTH * 2,
        }}
      >
        <Img
          src={s14Invitation}
          style={{
            height: PANEL_HEIGHT,
            left: 0,
            maxWidth: "none",
            position: "absolute",
            top: PANEL_TOP,
            width: PANEL_WIDTH,
          }}
        />
        <Img
          src={s14Table}
          style={{
            height: PANEL_HEIGHT,
            left: PANEL_WIDTH,
            maxWidth: "none",
            position: "absolute",
            top: PANEL_TOP,
            width: PANEL_WIDTH,
          }}
        />

        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(11,9,8,0) 0%, rgba(11,9,8,0.82) 44%, rgba(201,162,39,0.42) 50%, rgba(11,9,8,0.82) 56%, rgba(11,9,8,0) 100%)",
            bottom: 0,
            left: PANEL_WIDTH - 15,
            position: "absolute",
            top: 0,
            width: 30,
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(76% 60% at 50% 48%, rgba(0,0,0,0) 40%, rgba(8,5,4,0.3) 82%, rgba(8,5,4,0.5) 100%)",
        }}
      />

      <AbsoluteFill style={{opacity: 0.12}}>
        <Grain opacity={1} />
      </AbsoluteFill>

      <CaptionScrim />
      <SubtitleTrack
        from={10}
        until={142}
        emphasisWords={["不结婚", "被人笑话", "不孝顺"]}
        lines={["“不结婚”变成了", "“被人笑话”“不孝顺”。"]}
      />
    </AbsoluteFill>
  );
};
