# 项目状态

> 状态核对日期：2026-08-11。本文件记录“现在是什么”，不是变更日志。每次页面完成、提交、推送或部署后，就地更新对应条目。

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

本地实现、Git 提交、push 和 GitHub Pages 部署是四个独立状态。2026-08-11 的首页头像与 About 专业修正已提交并推送到 `main`，并已发布到 GitHub Pages。此前保留的毛玻璃层级调整已经上线不代表闪烁问题解决；该问题仍按“未解决、暂时搁置”处理。

## 2. 页面状态

### 首页 `/`

当前源码包含 General/Hello 导航、主题切换、Canvas 俄罗斯方块背景、本地点赞、邮箱复制 Toast、三项真实封面与作品链接、桌面端可拖拽视频窗格和 iframe 播放模态层。Hello 使用 `public/image/avatar/dinosaur-music.png` 作为首页头像。小于 768px 时三个视频窗格关闭拖拽、移除拖拽提示并保留正常触摸滚动；切换回移动宽度时会归零桌面拖拽位移。三个视频窗格的顶栏圆点使用镂空像素环，中心直接透出顶栏底色，避免半透明颜色重复叠加。

General 和 Video 窗格已把桌面定位与 `z-index` 移到外层，毛玻璃裁切和 `backdrop-filter` 留在内层。这一调整的目的是解决 Chromium 浏览器中 Canvas 背景动画经过毛玻璃时的闪烁，但实际仍未解决，2026-07-31 暂时搁置。

其他现有缺口是视频 loading/error、模态 Esc 与焦点管理、reduced-motion、点击后持久置顶、顺时针入场和窗格到播放器的共享转场。

### About `/about`

当前源码包含 BIO、STATS、SKILLS、ACADEMY、MISSION、TROPHY 六个区块，以及返回首页、桌面锚点、主题切换、打字机、像素进度条、滚动进入动画和响应式布局。BIO 的专业字段为“广播电视编导”，About 头像继续使用 `public/image/avatar/dinosaur.png`。窗口顶栏圆点与首页视频窗格共用镂空像素环实现；当前版本已部署，并验证 Pages 直达。

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
- 2026-08-11 `npm run build` 与 `npm run deploy` 的类型检查和生产构建通过；首页头像从 `public/` 自动复制到被忽略的 `dist/`，没有手工维护构建产物。

## 4. Git 快照

- 分支：`main`。
- remote：`https://github.com/womianfeile/Dell-wiki.git`。
- 本地 `main` 已包含并推送 2026-08-11 的首页头像、About 专业修正和知识文档同步；页面源码提交为 `9206a78e63b697d31a462e0f42a33528b075f050`。
- 暂存区与未暂存修改为空；本地个人文件 `docs/指南.md` 按用户要求保持未跟踪且未上传。
- README 是普通 Git 跟踪文件；AGENTS 与 docs 不受 ignore、exclude、skip-worktree 或本地 hook 隔离。

2026-08-11 已确认页面源码提交推送到远端 `main`。GitHub Pages 已从 `gh-pages` 根目录完成构建，发布提交为 `6afe7b39778c2daf9832e6a519c66e2c7a60661b`，对应页面源码提交 `9206a78e63b697d31a462e0f42a33528b075f050`。线上地址为 <https://womianfeile.github.io/Dell-wiki/>。

## 5. 知识文档职责

- `README.md`：公开项目入口、页面、命令和文档导航。
- `AGENTS.md`：AI 开发硬规则与同步矩阵。
- `docs/architecture.md`：架构、路由、状态与部署机制。
- `docs/ui-design.md`：唯一详细 UI 规范。
- `docs/development.md`：开发、验证、仓库卫生、部署与排障。
- 本文件：2026-08-11 的本地、提交、推送和部署状态快照。

这些正式文档都属于当前项目 Git，并已纳入本地提交和远端仓库；`docs/指南.md` 是用户明确指定的本地个人文件，不在此列。

## 6. 发布验证

- 2026-08-11 类型检查与生产构建通过；本地浏览器确认首页新头像为 2048×2048 且正常加载，About 最终完整显示“广播电视编导”，两页均无损坏图片或控制台警告/错误。
- 2026-08-11 GitHub Pages API 确认发布提交 `6afe7b3` 状态为 `built`。
- 线上首页显示 Dell-wiki、About Me、My Portfolio 和三项视频作品；新头像 `dinosaur-music.png` 正常加载且没有损坏图片。
- 线上 `/Dell-wiki/about` 直达后保留 BIO、STATS、SKILLS、ACADEMY、MISSION、TROPHY 六个区块，显示“广播电视编导”且不再出现“数字媒体艺术”；About 原头像正常加载。
- Chromium 毛玻璃背景动画闪烁仍可能出现，本轮内容修改未处理该问题，继续保持“未解决、暂时搁置”。
