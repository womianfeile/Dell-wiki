# 项目状态

> 状态核对日期：2026-07-31。本文件记录“现在是什么”，不是变更日志。每次页面完成、提交、推送或部署后，就地更新对应条目。

## 1. 发布完成度

| 范围 | 本地状态 | 已提交本地 `main` | 已推送最终提交 | 已部署当前版本 |
|---|---|---|---|---|
| 首页 `/` 当前版本 | 已实现 | 是 | 是 | 是 |
| About `/about` 当前版本 | 已实现 | 是 | 是 | 是 |
| Portfolio `/portfolio` | 仅占位 | 不适用 | 不适用 | 不适用 |
| JS 配置统一与依赖清理 | 本地完成 | 是 | 是 | 不适用 |
| 仓库卫生 | 本地完成 | 是 | 是 | 不适用 |
| 颜色命名与知识文档 | 本地完成 | 是 | 是 | 不适用 |
| 窗口顶栏圆点色差修复 | 本地完成 | 是 | 是 | 是 |
| Chromium 毛玻璃闪烁调查 | 层级调整已保留，问题仍未解决并暂时搁置 | 是 | 是 | 是 |

本地实现、Git 提交、push 和 GitHub Pages 部署是四个独立状态。2026-07-31 的首页毛玻璃层级调整与移动端拖拽收窄已提交并推送到 `main`，并已发布到 GitHub Pages。毛玻璃层级调整已经上线不代表闪烁问题解决；该问题仍按“未解决、暂时搁置”处理。

## 2. 页面状态

### 首页 `/`

当前源码包含 General/Hello 导航、主题切换、Canvas 俄罗斯方块背景、本地点赞、邮箱复制 Toast、三项真实封面与作品链接、桌面端可拖拽视频窗格和 iframe 播放模态层。小于 768px 时三个视频窗格关闭拖拽、移除拖拽提示并保留正常触摸滚动；切换回移动宽度时会归零桌面拖拽位移。三个视频窗格的顶栏圆点使用镂空像素环，中心直接透出顶栏底色，避免半透明颜色重复叠加。

General 和 Video 窗格已把桌面定位与 `z-index` 移到外层，毛玻璃裁切和 `backdrop-filter` 留在内层。这一调整的目的是解决 Chromium 浏览器中 Canvas 背景动画经过毛玻璃时的闪烁，但实际仍未解决，2026-07-31 暂时搁置。

其他现有缺口是视频 loading/error、模态 Esc 与焦点管理、reduced-motion、点击后持久置顶、顺时针入场和窗格到播放器的共享转场。

### About `/about`

当前源码包含 BIO、STATS、SKILLS、ACADEMY、MISSION、TROPHY 六个区块，以及返回首页、桌面锚点、主题切换、打字机、像素进度条、滚动进入动画和响应式布局。窗口顶栏圆点与首页视频窗格共用镂空像素环实现。2026-07-31 当前版本已部署，并验证直达与刷新。

### Portfolio `/portfolio`

当前只有 `PlaceholderPage`。尚未建立正式信息架构、项目卡片、筛选或详情页；实现前需确认作品范围和内容结构。

## 3. 本地工程状态

- Vite 与 Tailwind 已收敛为根目录 `vite.config.js`、`tailwind.config.js` 两个现行配置；同名 `.ts` 和 `.d.ts` 副本已删除。
- `tsconfig.node.json` 使用 `allowJs`、`checkJs`、`noEmit` 检查 Vite、Tailwind 与 PostCSS JS 配置；`package.json` 提供 `npm run typecheck`，构建不会生成平行配置副本。
- `lucide-react` 与 `pixelarticons` 已从 `package.json`、`package-lock.json`、本地 `node_modules/` 和源码引用中移除。
- 六个主视觉色使用跨主题固定的 `--palette-*`；品牌圆标使用 `--detail-muted-mint: #BEE6DD`；视频 chrome 使用 `coral`、`cream`、`sage`。
- 视频窗格与 About 窗口的 `.pixel-dot` 使用四段式镂空像素环，中心不再叠加半透明 chrome 色。
- General 与 Video 毛玻璃窗格使用外层布局、内层 `backdrop-filter` 的结构；该实现是 Chromium 动画闪烁问题的一次未完全奏效的排查尝试，不是已验证解决方案。
- `node_modules/`、`dist/` 和 `*.tsbuildinfo` 已从 Git 索引取消跟踪但本地仍可存在；`package-lock.json` 继续由 Git 管理。
- `.gitignore` 忽略 `node_modules/`、`dist/`、`dist-ssr/` 和 `*.tsbuildinfo`，不忽略 `package-lock.json`、`AGENTS.md`、`README.md` 或 `docs/`。
- 旧设计资料目录和独立 UI 色板文件均不存在；`docs/ui-design.md` 是详细 UI 规范的唯一来源。
- 2026-07-31 首页交互调整中，`npm run build` 的类型检查通过；Vite 在受限沙盒首次遇到已知的 esbuild `spawn EPERM`，按开发手册在正常权限下重试后完整构建通过。构建只更新被忽略的 `dist/`，没有生成新的 Git 噪声。

## 4. Git 快照

- 分支：`main`。
- remote：`https://github.com/womianfeile/Dell-wiki.git`。
- 本地 `main` 已包含并推送 2026-07-31 的毛玻璃层级调整、响应式视频拖拽和知识文档同步；源码、公开说明、UI 规范、开发手册和状态文档均纳入项目 Git。
- 暂存区、未暂存修改和未跟踪文件均为空。
- README 是普通 Git 跟踪文件；AGENTS 与 docs 不受 ignore、exclude、skip-worktree 或本地 hook 隔离。

2026-07-31 已确认远端 `main` 与本地一致。GitHub Pages 已从 `gh-pages` 根目录完成构建，发布提交为 `23d006cee8e4f51275f563c07dfb379d9f1c82ac`，对应本轮页面源码提交 `bd1c848505ba5ba77e3cb0f22a08dc2ccc6cd970`。线上地址为 <https://womianfeile.github.io/Dell-wiki/>。

## 5. 知识文档职责

- `README.md`：公开项目入口、页面、命令和文档导航。
- `AGENTS.md`：AI 开发硬规则与同步矩阵。
- `docs/architecture.md`：架构、路由、状态与部署机制。
- `docs/ui-design.md`：唯一详细 UI 规范。
- `docs/development.md`：开发、验证、仓库卫生、部署与排障。
- 本文件：2026-07-31 的本地、提交、推送和部署状态快照。

这些文件都属于当前项目 Git，并已纳入本地提交和远端仓库。

## 6. 发布验证

- 2026-07-30 本地 `/Dell-wiki/`：浅色与深色模式下三个视频窗格的圆点中心均与各自顶栏底色一致。
- 2026-07-30 本地 `/Dell-wiki/about`：窗口圆点使用同一实现，类型检查与生产构建通过。
- 2026-07-31 本地 `/Dell-wiki/`：390px 下三个视频窗格均无拖拽提示，拖动不产生位移且触摸滚动未被禁用；1280px 下顶栏仍可拖动；从桌面切回移动宽度后位移归零。
- 2026-07-31 类型检查与生产构建通过；本地浏览器未发现页面错误，仅保留 React Router 已知的 v7 future flag 警告。
- Chromium 毛玻璃背景动画闪烁仍可出现，本轮层级调整未解决该问题，当前暂时搁置。
- 2026-07-31 GitHub Pages API 确认发布提交 `23d006c` 状态为 `built`。
- 线上首页显示 Dell-wiki、About Me、My Portfolio、三项视频作品及当前拖拽提示；当前 JS、CSS、头像与三张视频封面均返回 HTTP 200。
- 线上 `/Dell-wiki/about` 直达与浏览器刷新均保留 BIO、STATS、SKILLS、ACADEMY、MISSION、TROPHY 六个区块。
- 线上 `/Dell-wiki/portfolio` 显示预期占位说明并保留 Back Home；浏览器控制台无错误或警告。
