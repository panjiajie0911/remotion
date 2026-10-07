import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { CSSProperties, PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{ delay?: number; duration?: number; style?: CSSProperties }>;

export const FadeIn = ({ children, delay = 0, duration = 18, style }: FadeInProps) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: `0px ${interpolate(frame, [delay, delay + duration], [16, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
