# 项目状态

> 状态核对日期：2026-07-14。本文件记录“现在是什么”，不是变更日志。每次页面完成、提交、推送或部署后，就地更新对应条目。

## 1. 发布完成度

| 范围 | 本地状态 | 已形成最终公开提交 | 已推送最终提交 | 已部署当前版本 |
|---|---|---|---|---|
| 首页 `/` 当前版本 | 已实现 | 否 | 否 | 否 |
| About `/about` | 已实现 | 否 | 否 | 否 |
| Portfolio `/portfolio` | 仅占位 | 不适用 | 不适用 | 不适用 |
| JS 配置统一与依赖清理 | 本地完成 | 否 | 否 | 不适用 |
| 仓库卫生 | 本地索引完成 | 否 | 否 | 不适用 |
| 颜色命名与知识文档 | 本地完成 | 否 | 否 | 不适用 |

本地实现、Git 提交、push 和 GitHub Pages 部署是四个独立状态。当前没有把本地完成误记为已发布。

## 2. 页面状态

### 首页 `/`

当前源码包含 General/Hello 导航、主题切换、Canvas 俄罗斯方块背景、本地点赞、邮箱复制 Toast、三项真实封面与作品链接、可拖拽视频窗格和 iframe 播放模态层。

现有缺口是视频 loading/error、模态 Esc 与焦点管理、reduced-motion、点击后持久置顶、顺时针入场和窗格到播放器的共享转场。

### About `/about`

当前源码包含 BIO、STATS、SKILLS、ACADEMY、MISSION、TROPHY 六个区块，以及返回首页、桌面锚点、主题切换、打字机、像素进度条、滚动进入动画和响应式布局。该页面尚未进入最终公开提交。

### Portfolio `/portfolio`

当前只有 `PlaceholderPage`。尚未建立正式信息架构、项目卡片、筛选或详情页；实现前需确认作品范围和内容结构。

## 3. 本地工程状态

- Vite 与 Tailwind 已收敛为根目录 `vite.config.js`、`tailwind.config.js` 两个现行配置；同名 `.ts` 和 `.d.ts` 副本已删除。
- `tsconfig.node.json` 使用 `allowJs`、`checkJs`、`noEmit` 检查 Vite、Tailwind 与 PostCSS JS 配置；`package.json` 提供 `npm run typecheck`，构建不会生成平行配置副本。
- `lucide-react` 与 `pixelarticons` 已从 `package.json`、`package-lock.json`、本地 `node_modules/` 和源码引用中移除。
- 六个主视觉色使用跨主题固定的 `--palette-*`；品牌圆标使用 `--detail-muted-mint: #BEE6DD`；视频 chrome 使用 `coral`、`cream`、`sage`。
- `node_modules/`、`dist/` 和 `*.tsbuildinfo` 已从 Git 索引取消跟踪但本地仍可存在；`package-lock.json` 继续由 Git 管理。
- `.gitignore` 忽略 `node_modules/`、`dist/`、`dist-ssr/` 和 `*.tsbuildinfo`，不忽略 `package-lock.json`、`AGENTS.md`、`README.md` 或 `docs/`。
- 旧设计资料目录和独立 UI 色板文件均不存在；`docs/ui-design.md` 是详细 UI 规范的唯一来源。
- 2026-07-14 最终知识同步中，独立 `npm run typecheck` 通过；`npm run build` 在受限沙盒首次遇到已知的 esbuild `spawn EPERM`，按开发手册在正常权限下重试后通过。构建只更新被忽略的 `dist/`，没有生成平行配置或新的 Git 噪声。

## 4. Git 快照

- 分支：`main`。
- HEAD：`a7fdec0`（`fix: theme cursors and base url paths`）。
- remote：`https://github.com/womianfeile/Dell-wiki.git`。
- 暂存区：8,622 个仓库卫生删除，其中 `node_modules/` 8,608、`dist/` 12、`*.tsbuildinfo` 2；尚未提交。
- 未暂存：配置、依赖、页面、样式和 README 修改。
- 未跟踪：About 页面、头像/封面资源、`AGENTS.md` 与 `docs/`。
- README 是普通 Git 跟踪文件；AGENTS 与 docs 不受 ignore、exclude、skip-worktree 或本地 hook 隔离。

本轮最终收尾不执行暂存、commit、push 或 deploy。远端和线上状态需要在后续发布阶段实时验证。

## 5. 知识文档职责

- `README.md`：公开项目入口、页面、命令和文档导航。
- `AGENTS.md`：AI 开发硬规则与同步矩阵。
- `docs/architecture.md`：架构、路由、状态与部署机制。
- `docs/ui-design.md`：唯一详细 UI 规范。
- `docs/development.md`：开发、验证、仓库卫生、部署与排障。
- 本文件：2026-07-14 的本地、提交、推送和部署状态快照。

这些文件都属于当前项目 Git，并纳入后续公开提交。

## 6. 后续发布门槛

1. 按预定拆分检查并提交仓库卫生、配置依赖、页面资源和知识文档。
2. push 后确认远端提交与本地一致。
3. 单独执行 GitHub Pages 部署。
4. 在线验证 `/Dell-wiki/`、`/Dell-wiki/about` 及子路由刷新后，再把“已部署当前版本”改为“是”。
