# 开发与部署

本文是 Dell-wiki 的本地开发、内容维护、验证和 GitHub Pages 发布手册。系统结构见 [架构说明](architecture.md)，视觉实现见 [UI 设计规范](ui-design.md)。

## 1. 环境要求

- Node.js 与 npm。仓库当前没有 `.nvmrc`、`.node-version` 或 `package.json#engines`，因此没有声明固定版本。
- Git，用于提交和部署。
- 不需要后端、数据库或 `.env` 文件。

首次安装：

```bash
npm ci
```

`package-lock.json` 纳入 Git，用于固定 npm 依赖解析；`node_modules/` 不纳入 Git。需要更新依赖时使用 `npm install` 并一并检查 lockfile 变更。

## 2. 命令速查

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run typecheck` | 检查应用 TypeScript 和根目录 JS 配置，不生成文件 |
| `npm run build` | 先运行类型检查，再构建到 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run predeploy` | 部署前构建，由 npm 自动触发 |
| `npm run deploy` | 将 `dist/` 发布到 `gh-pages` |

当前没有 lint、单元测试、端到端测试或 CI 脚本。

## 3. 常见内容修改

### 修改首页作品

1. 编辑 `src/data/homepage.ts` 中的 title、subtitle、embedUrl 和 coverImagePath。
2. 把封面放入 `public/image/covers/`。
3. 路径写成相对 public 根的 `image/covers/name.jpg`，组件会自动拼接 `BASE_URL`。
4. 同时验证封面加载、tooltip 文案和第三方 iframe。

### 修改邮箱

编辑 `src/data/homepage.ts` 的 `emailAddress`，并实际点击 Email 检查剪贴板与 Toast。

### 修改个人资料

About 的 profile、academy、missions 和 trophies 当前硬编码在 `src/pages/AboutPage.tsx`。这些属于个人事实，修改前必须由用户确认；不要根据未经确认的资料自动覆盖。

### 新增页面

1. 在 `src/pages/` 创建页面组件。
2. 在 `src/App.tsx` 注册路由。
3. 更新相关导航数据或入口。
4. 更新 `docs/architecture.md` 路由树、README 路由表和 `docs/project-status.md`。
5. 验证站内跳转与 GitHub Pages 直接刷新。

### 修改视觉

先读 `docs/ui-design.md`。全局主题 token 在 `src/styles/globals.css`；局部布局可使用 Tailwind。新增颜色前先判断现有主视觉色板是否能表达所需角色，避免产生近似但不一致的色值。

`tailwind.config.js` 是 Tailwind 的唯一配置来源，并把 `palette-*` 类映射到同名 CSS 变量。六个主视觉色跨主题固定；调整主题时只覆盖背景、表面、文字、边框等基础 token。不要重新使用已退役的 `macaron-*` 含糊命名。

## 4. 开发检查

### TypeScript 只读检查

如果不希望写入仓库内的 `dist/`，可先运行：

```powershell
npm run typecheck
```

该命令分别使用 `tsconfig.json` 检查应用源码、使用 `tsconfig.node.json` 检查 `vite.config.js`、`tailwind.config.js` 与 `postcss.config.js`，且不会生成 `.js`、`.d.ts` 或 build info。

### 完整构建

```bash
npm run build
```

完整构建会更新已忽略的 `dist/`。类型检查使用 `noEmit`，不会生成或更新 `*.tsbuildinfo`；构建后仍应检查 `git status`，确认产物没有重新进入变更范围。

### 页面冒烟清单

- `/`：Canvas 背景、General、Hello、三项作品、Theme、Like、Email。
- `/about`：返回、主题、桌面锚点、逐字动画、进度条和滚动进入动画。
- `/portfolio`：占位页可返回首页。
- 浅色与深色主题。
- 小于 768px 的单列布局和大于等于 768px 的桌面布局。
- 视频窗格拖拽与封面点击。
- Bilibili、抖音 iframe 是否仍允许嵌入。
- 子路由直接输入 URL 和浏览器刷新。
- 控制台无资源 404 或明显运行时异常。

## 5. GitHub Pages 发布

当前配置：

- remote：`https://github.com/womianfeile/Dell-wiki.git`。
- Vite base：`/Dell-wiki/`。
- 发布目录：`dist/`。
- 发布工具：`gh-pages`。
- SPA fallback：`public/404.html` + `src/main.tsx`。

发布前：

1. 检查 `git status`，确认页面源码和 public 素材都在预期提交范围。
2. 运行构建和页面冒烟。
3. 确认 `dist/index.html` 的资源 URL 以 `/Dell-wiki/` 开头。
4. 执行 `npm run deploy`。
5. 在线打开首页与 `/Dell-wiki/about`，并在子路由刷新。
6. 只有线上验证成功后，才在 `docs/project-status.md` 标记“已部署”。

本地提交、推送 main 和发布 gh-pages 是三个独立动作，不能用其中一个推断另一个已经完成。

## 6. 故障排查

### Vite 构建出现 `spawn EPERM`

这台 Windows 机器过去曾在受限沙盒中由 esbuild 加载 Vite 配置时出现 `spawn EPERM`，在正常系统权限下重试后构建成功。先判断是否为执行环境权限限制，不要直接认定项目配置损坏。

检查顺序：

1. 确认使用项目本地 `node_modules/.bin` 工具。
2. 退出占用相关文件的开发服务器。
3. 在正常用户权限终端重试。
4. 再检查 Vite 配置和依赖安装。

### GitHub Pages 子路由 404

- 检查 `public/404.html` 是否进入构建产物。
- 检查 `main.tsx` 的 sessionStorage key 是否一致。
- 检查 BrowserRouter basename 与 Vite base。
- 检查仓库名或自定义域是否变化。

### 图片或光标在本地正常、线上 404

优先搜索硬编码的 `/image`、`/cursor` 等域名根路径。public 资源应经 `import.meta.env.BASE_URL` 拼接。

### 视频模态层打开但不能播放

先在浏览器控制台和 Network 检查第三方嵌入限制、CSP、Referer 或链接失效。应用当前没有 iframe 错误 UI，不要只凭黑屏重写模态层。

## 7. 仓库卫生边界

`.gitignore` 忽略 `node_modules/`、`dist/`、`dist-ssr/` 和所有 `*.tsbuildinfo`；`package-lock.json` 必须继续纳入 Git。2026-07-14 已通过提交 `a100d7c` 取消跟踪历史依赖和产物，本地目录没有被物理删除。

后续仓库卫生操作遵循以下边界：

- 只需取消跟踪时使用 `git rm --cached`，不要删除本地依赖或构建产物。
- 不把仓库卫生的大规模索引删除混入页面功能提交。
- 构建后确认被忽略的 `dist/` 没有产生新的未暂存或未跟踪状态；清理提交前，索引中的预期删除仍会显示。
- Vite/Tailwind 已统一为 JS 唯一来源，不要重新引入同名 `.ts` 或生成的 `.d.ts` 配置副本。

## 8. 项目知识文件

`AGENTS.md`、`README.md` 和整个 `docs/` 目录都属于 Dell-wiki 项目 Git，并随项目公开提交。不要为它们设置 `skip-worktree`，也不要通过 `.gitignore`、`.git/info/exclude`、本地 hook 或第二个 Git 仓库隔离这些文件。

- `AGENTS.md`：只保存 AI 开发必须遵守的硬规则与文档同步入口。
- `README.md`：面向第一次接触仓库的读者，提供项目入口和常用命令。
- `docs/`：分别维护架构、UI、开发部署和当前状态。

三者职责不同；更新代码事实时按 `AGENTS.md` 的同步矩阵就地修订，不追加会话流水账。
