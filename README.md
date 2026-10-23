# 心理科普视频制作项目

保留第 1～3 期代码和公共组件。每期使用独立入口，只打包本期代码与素材。默认打开第三期。

## 首次使用

安装 Node.js 与 pnpm，然后在本目录运行：

```powershell
pnpm install --frozen-lockfile
npm run media -- restore episode-03
npm run dev
```

默认从同级目录 `../material-archive` 恢复素材。如归档位于别处：

```powershell
npm run media -- restore episode-03 "E:\video-archive\material-archive"
```

也可以设置环境变量 `REMOTION_MEDIA_ARCHIVE`。恢复时校验 SHA-256，不覆盖已修改的本地素材。

## 切换期数和导出

```powershell
npm run media -- restore episode-02
npm run preview -- episode-02
npm run render -- episode-03
npm run media -- check episode-03
```

支持 episode-01、episode-02、episode-03。`restore all` 可恢复全部素材。导出到 `out/`，使用 1080×1920、30fps、H.264；各期原有时长、文案和动画保持原样。

修改素材后仍可预览和导出，`media check` 会提示与归档版本不同；清理工作副本前，应将新版素材备份并更新清单中的哈希和归档对象。当前清单是本次拆分的固定快照，并非自动素材管理器。

## 上传 GitHub

**仅上传本 remotion-studio 目录。** 此目录不含旧仓库的 `.git` 历史。

素材、字体、成片、依赖、缓存均被 `.gitignore` 排除。`media-manifest.json` 记录原路径、恢复路径、字节数及校验值。必须另行备份 `material-archive`；只克隆 GitHub 代码无法恢复图片、字体和视频。

本目录已初始化全新的 Git 仓库，尚未提交或连接远端。连接你的新仓库即可。不要在外层旧项目目录上传，也不要复制旧 `.git`。

## 后续增加期数

1. 在 `src/episodes/episode-04` 创建本期代码，在 `src/entries/episode-04.tsx` 注册独立合成。
2. 在 `scripts/episode.mjs` 的 ids 中登记合成 ID，并在 `scripts/media.mjs` 的期数列表中登记。
3. 公共素材继续复用；本期静态素材放 `.media/episode-04/public`。`staticFile()` 路径相对于该目录。
4. 新素材按 SHA-256 存入归档 `objects` 并登记清单；归档备份完成后再清理工作副本。不要直接删唯一素材。

## 注意

- 保留原项目的 pnpm 锁文件和依赖版本；目前 Remotion 依赖存在 4.0.522/4.0.524 混用，本次不升级，以免改变现有作品。
- `scripts/transcribe-episode-02.mjs` 为原项目历史工具，依赖原来的转写程序和音频路径，不属于预览/导出流程。
- 原项目未删除。确认新项目可用且归档已备份后，再自行清理旧项目以释放空间。
