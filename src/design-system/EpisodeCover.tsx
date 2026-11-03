import {AbsoluteFill, getStaticFiles, Img} from "remotion";
import {theme} from "../lib/theme";
import type {EpisodeMeta} from "./episode-meta";
import {renderEmphasis} from "./emphasis";
import {Rule} from "./Type";

/** 9:16 poster shared by every episode; only the meta changes. */
export const EpisodeCover = ({meta}: {meta: EpisodeMeta}) => {
  const avatar = getStaticFiles().find((file) => file.name === "shared/avatar.png")?.src;
  const avatarSize = theme.layout.avatarLarge / 2;
  const cover = meta.cover ?? {};
  const titleLines = cover.title ?? meta.title;
  const titleSize = cover.titleSize ?? theme.typography.size.display;
  const hasSignoff = Boolean(cover.signoff || cover.note);

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
            {meta.numberLabel}
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
            {meta.seriesLabel}
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
              fontSize: titleSize,
              fontWeight: theme.typography.weight.semibold,
              letterSpacing: theme.typography.tracking.display,
              lineHeight: theme.typography.lineHeight.tight,
            }}
          >
            {titleLines.map((line) => (
              <div key={line}>{renderEmphasis(line, meta.emphasisWords)}</div>
            ))}
          </div>
          {cover.subtitle ? (
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
              {cover.subtitle}
            </div>
          ) : null}
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
          {hasSignoff ? (
            <div>
              {cover.signoff ? (
                <div
                  style={{
                    fontSize: theme.typography.size.label,
                    fontWeight: theme.typography.weight.medium,
                    letterSpacing: theme.typography.tracking.meta,
                    lineHeight: theme.typography.lineHeight.snug,
                  }}
                >
                  {cover.signoff}
                </div>
              ) : null}
              {cover.note ? (
                <div
                  style={{
                    color: theme.palette.inkMuted,
                    fontSize: theme.typography.size.micro,
                    letterSpacing: theme.typography.tracking.meta,
                    lineHeight: theme.typography.lineHeight.snug,
                    marginTop: theme.spacing.xs,
                  }}
                >
                  {cover.note}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const createEpisodeCover = (meta: EpisodeMeta) => {
  const Cover = () => <EpisodeCover meta={meta} />;
  Cover.displayName = `EpisodeCover(${meta.id})`;
  return Cover;
};
