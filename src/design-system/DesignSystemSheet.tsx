import { SceneFrame } from "./SceneFrame";
import { Rule } from "./Type";
import { theme } from "../lib/theme";

const label = {
  color: theme.palette.inkMuted,
  fontFamily: theme.fonts.sans,
  fontSize: theme.typography.size.micro,
  fontWeight: theme.typography.weight.medium,
  letterSpacing: theme.typography.tracking.eyebrow,
  lineHeight: 1,
} as const;

const SectionLabel = ({ children }: { children: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
    <div style={label}>{children}</div>
    <div style={{ backgroundColor: theme.palette.line, flex: 1, height: theme.borderWidth.thin }} />
  </div>
);

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ width: 214 }}>
    <div
      style={{
        backgroundColor: value,
        border: `${theme.borderWidth.thin}px solid ${theme.palette.line}`,
        height: 96,
      }}
    />
    <div style={{ ...label, color: theme.palette.ink, letterSpacing: theme.typography.tracking.meta, marginTop: theme.spacing.sm }}>
      {name}
    </div>
    <div style={{ ...label, color: theme.palette.inkFaint, fontSize: theme.typography.size.micro }}>{value}</div>
  </div>
);

const TypeRow = ({
  name,
  sample,
  size,
  weight,
  tracking,
}: {
  name: string;
  sample: string;
  size: number;
  weight: number;
  tracking: number;
}) => (
  <div
    style={{
      alignItems: "baseline",
      borderBottom: `${theme.borderWidth.thin}px solid ${theme.palette.line}`,
      display: "flex",
      justifyContent: "space-between",
      padding: `${theme.spacing.md}px 0`,
    }}
  >
    <div
      style={{
        color: theme.palette.ink,
        fontFamily: theme.fonts.sans,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: tracking,
        lineHeight: theme.typography.lineHeight.tight,
      }}
    >
      {sample}
    </div>
    <div style={{ ...label, color: theme.palette.inkFaint }}>{name}</div>
  </div>
);

/**
 * Review sheet for the token set: ground, palette, type scale, caption rules.
 * Open with `pnpm ds` (src/entries/design-system.tsx).
 */
export const DesignSystemSheet = () => (
  <SceneFrame eyebrow="DESIGN SYSTEM" footer="EPISODE 03 · V1" contentStyle={{ justifyContent: "flex-start" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.xl }}>
      <div>
        <div
          style={{
            color: theme.palette.ink,
            fontFamily: theme.fonts.sans,
            fontSize: theme.typography.size.heading,
            fontWeight: theme.typography.weight.semibold,
            letterSpacing: theme.typography.tracking.heading,
            lineHeight: theme.typography.lineHeight.tight,
          }}
        >
          冷静 · 留白 · 一个强调色
        </div>
        <div style={{ marginTop: theme.spacing.lg }}>
          <Rule />
        </div>
      </div>

      <div>
        <SectionLabel>色板 / PALETTE</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.spacing.sm }}>
          <Swatch name="CANVAS" value={theme.palette.canvas} />
          <Swatch name="SURFACE" value={theme.palette.surface} />
          <Swatch name="INK" value={theme.palette.ink} />
          <Swatch name="INK MUTED" value={theme.palette.inkMuted} />
          <Swatch name="LINE" value={theme.palette.line} />
          <Swatch name="ACCENT" value={theme.palette.accent} />
          <Swatch name="ACCENT DEEP" value={theme.palette.accentDeep} />
          <Swatch name="NIGHT" value={theme.palette.night} />
        </div>
      </div>

      <div>
        <SectionLabel>字阶 / TYPE</SectionLabel>
        <TypeRow
          name="DISPLAY 120"
          sample="心理"
          size={theme.typography.size.display}
          weight={theme.typography.weight.bold}
          tracking={theme.typography.tracking.display}
        />
        <TypeRow
          name="TITLE 88"
          sample="进食与心理"
          size={theme.typography.size.title}
          weight={theme.typography.weight.semibold}
          tracking={theme.typography.tracking.title}
        />
        <TypeRow
          name="BODY 40"
          sample="一屏只讲一件事"
          size={theme.typography.size.body}
          weight={theme.typography.weight.regular}
          tracking={theme.typography.tracking.body}
        />
      </div>

      <div>
        <SectionLabel>字幕 / CAPTION</SectionLabel>
        <div
          style={{
            backgroundColor: theme.palette.night,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "flex-end",
            height: 300,
            justifyContent: "center",
            overflow: "hidden",
            padding: theme.spacing.xl,
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              background: `linear-gradient(150deg, ${theme.palette.accentDeep} 0%, ${theme.palette.night} 72%)`,
              inset: 0,
              opacity: 0.5,
              position: "absolute",
            }}
          />
          <div
            style={{
              color: theme.captions.onVideo.color,
              fontFamily: theme.fonts.sans,
              fontSize: theme.captions.onVideo.size,
              fontWeight: theme.captions.onVideo.weight,
              letterSpacing: theme.captions.onVideo.tracking,
              lineHeight: theme.captions.onVideo.lineHeight,
              position: "relative",
              textAlign: "center",
              textShadow: theme.captions.onVideo.shadow,
            }}
          >
            <div>潜意识中存在</div>
            <div>“不配得感”</div>
          </div>
        </div>
        <div style={{ ...label, marginTop: theme.spacing.sm }}>
          无描边 · 底部渐隐 · 单行 48Px · 距底 208Px
        </div>
      </div>
    </div>
  </SceneFrame>
);
