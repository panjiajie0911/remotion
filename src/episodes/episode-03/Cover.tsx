import {AbsoluteFill, getStaticFiles, Img} from "remotion";
import {Rule} from "../../design-system";
import {theme} from "../../lib/theme";

const emphasis = {
  textDecorationColor: theme.palette.mark,
  textDecorationLine: "underline" as const,
  textDecorationThickness: "0.07em",
  textUnderlineOffset: "0.14em",
};

/** 9:16 poster frame used as the episode thumbnail. */
export const Episode03Cover = () => {
  const avatar = getStaticFiles().find((file) => file.name === "shared/avatar.png")?.src;
  const avatarSize = theme.layout.avatarLarge / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.palette.canvas,
        color: theme.palette.ink,
        fontFamily: theme.fonts.sans,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: `${theme.layout.marginTop}px ${theme.layout.marginX}px ${theme.layout.marginBottom}px`,
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div
            style={{
              color: theme.palette.inkMuted,
              fontSize: theme.typography.size.micro,
              fontWeight: theme.typography.weight.medium,
              letterSpacing: theme.typography.tracking.eyebrow,
              lineHeight: 1,
            }}
          >
            第 03 期
          </div>
          <div
            style={{
              color: theme.palette.inkMuted,
              fontSize: theme.typography.size.micro,
              fontWeight: theme.typography.weight.medium,
              letterSpacing: theme.typography.tracking.eyebrow,
              lineHeight: 1,
            }}
          >
            心理观察
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: theme.spacing.xxl,
          }}
        >
          <div style={{marginBottom: theme.spacing.xxl}}>
            <Rule />
          </div>
          <div
            style={{
              fontSize: theme.typography.size.display,
              fontWeight: theme.typography.weight.semibold,
              letterSpacing: theme.typography.tracking.display,
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            <div>
              你的<span style={emphasis}>吃饭习惯</span>
            </div>
            <div>暴露了你的心理</div>
          </div>
          <div
            style={{
              color: theme.palette.inkMuted,
              fontSize: theme.typography.size.lead,
              fontWeight: theme.typography.weight.regular,
              letterSpacing: theme.typography.tracking.meta,
              lineHeight: theme.typography.lineHeight.snug,
              marginTop: theme.spacing.xl,
            }}
          >
            吃饭的样子，藏着你的来路
          </div>
        </div>

        <div style={{alignItems: "center", display: "flex", gap: theme.spacing.lg}}>
          {avatar ? (
            <div
              style={{
                border: `${theme.borderWidth.thin}px solid ${theme.palette.line}`,
                borderRadius: "50%",
                flexShrink: 0,
                height: avatarSize,
                overflow: "hidden",
                position: "relative",
                width: avatarSize,
              }}
            >
              <Img
                src={avatar}
                style={{
                  height: avatarSize * 1.35 * 1523 / 1204,
                  left: avatarSize * (1 - 1.35) / 2,
                  maxWidth: "none",
                  position: "absolute",
                  top: avatarSize * 0.05,
                  width: avatarSize * 1.35,
                }}
              />
            </div>
          ) : null}
          <div>
            <div
              style={{
                fontSize: theme.typography.size.label,
                fontWeight: theme.typography.weight.medium,
                letterSpacing: theme.typography.tracking.meta,
                lineHeight: theme.typography.lineHeight.snug,
              }}
            >
              事已至此，先吃饭吧。
            </div>
            <div
              style={{
                color: theme.palette.inkMuted,
                fontSize: theme.typography.size.micro,
                letterSpacing: theme.typography.tracking.meta,
                lineHeight: theme.typography.lineHeight.snug,
                marginTop: theme.spacing.xs,
              }}
            >
              一个习惯，不能定义你
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
