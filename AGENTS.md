# Dell-wiki 项目协作规则

本文只保存会影响后续开发正确性的规则、边界和文档入口。系统细节、UI 规范、操作手册和进度分别维护在 `docs/`，不要把它们再次整段复制回本文。

## 事实来源

发生冲突时按以下顺序判断：

1. 当前 `src/`、`public/` 和配置文件。
2. `docs/architecture.md`、`docs/ui-design.md` 与 `docs/development.md`。
3. `docs/project-status.md` 中带日期的状态快照。
4. README。

## 开始任务前

| 任务 | 必读文档 |
|---|---|
| 页面结构、路由、状态或模块调整 | `docs/architecture.md` |
| 视觉、组件、动效或响应式调整 | `docs/ui-design.md` |
| 安装、构建、部署或排障 | `docs/development.md` |
| 判断完成度、提交或发布范围 | `docs/project-status.md` |

同时读取目标源码和当前 `git status`。文档不能替代代码核对。

## 项目边界

- 技术栈：React 18、TypeScript、Vite 5、Tailwind CSS 3、React Router 6、Framer Motion。
- 正式路由：`/`、`/about`；`/portfolio` 目前仍为占位页。
- 静态部署目标是 GitHub Pages，Vite `base` 为 `/Dell-wiki/`。
- 当前没有后端、数据库、认证、环境变量、国际化框架或全局状态库。
- 主题与点赞使用浏览器 `localStorage`；点赞不是全站真实数据。

## 不可破坏的实现规则

- 公共资源路径必须通过 `import.meta.env.BASE_URL` 拼接，或由 Vite import；不要写假定部署在域名根目录的绝对路径。
- 新增页面必须在 `src/App.tsx` 注册，并验证 GitHub Pages 直接访问与刷新。
- 视觉改动必须沿用 `src/styles/globals.css` 的主题变量和 `docs/ui-design.md` 的 token；不要另建平行设计体系。
- 新增首页视频作品优先修改 `src/data/homepage.ts`，封面放在 `public/image/covers/`。
- 修改个人简介、履历、奖项、邮箱或作品链接前必须向用户核实；重构不能顺带改写事实内容。
- `dist/`、`*.tsbuildinfo` 与 `node_modules/` 是产物或依赖，不要手工编辑，也不要把它们的现有噪声误判为本轮改动。
- Vite 与 Tailwind 均以根目录 `.js` 文件为唯一配置来源；`tsconfig.node.json` 以 `checkJs` + `noEmit` 检查这些 JS 配置。不要重新引入同名 `.ts` 或生成的 `.d.ts` 副本。
- 六个主视觉色使用 `--palette-*` 语义变量并跨主题固定；品牌圆标的 `#BEE6DD` 必须保留为 `--detail-muted-mint`。视频窗口 `chrome` 只使用 `coral`、`cream`、`sage`。不要重新引入 `--accent-*`、`--macaron-*`、`bg-macaron-*` 或错误的 `purple/yellow/grey` chrome 名称。
- 当前工作树包含用户未提交改动。禁止使用会覆盖它们的 reset、checkout 或批量清理操作。

## 文件与编码

- 中文路径或内容读取失败时先排查 PowerShell 编码、code page 和 subprocess 传参，不要直接判定文件损坏。
- 文本优先按 `utf-8-sig` / `utf-8` 读取，必要时再尝试 `gb18030` / `gbk`。
- 文本修改优先使用 `apply_patch`；整文件改写必须显式使用 UTF-8。
- 如果未来使用 Python 处理图片或文档，依赖必须安装在项目虚拟环境中，并使用 `pathlib.Path` 处理中文路径。

## 变更与验证

- 本地实现、已提交、已推送、已部署是四个不同状态，不得互相代替。
- 源码修改提交前至少运行 `npm run build`；若不希望改写仓库内 `dist/`，可先做无输出目录的 TypeScript 检查和临时目录 Vite 构建。
- UI 改动要检查浅色/深色、桌面/移动端、键盘焦点，以及加载、空、错误和禁用状态是否适用。
- 路由改动要检查首页进入、站内跳转、浏览器刷新和未知路由回退。
- 不要在普通功能提交中顺手清理历史跟踪的 `node_modules/`、`dist/` 或 build info；仓库卫生应单独规划。

## 文档同步

- 架构决策或模块边界变化：更新 `docs/architecture.md`。
- 视觉 token、布局、组件状态或交互变化：更新 `docs/ui-design.md`。
- 命令、部署和排障变化：更新 `docs/development.md` 与 README。
- 页面完成度、提交/推送/部署状态变化：更新 `docs/project-status.md`。
- `AGENTS.md`、`README.md` 和整个 `docs/` 目录都属于当前项目 Git，应随项目提交；不得通过 ignore、exclude、skip-worktree、hook 或第二个本地 Git 仓库隔离。
- 只有会让下一位 AI 犯错的硬规则才进入本文；历史过程和单次修复不要追加到 AGENTS.md。
