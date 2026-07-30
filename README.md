# Dell-wiki

Dell-wiki 是一个使用 React、TypeScript 与 Tailwind CSS 构建的个人作品集网站。它以淡彩色像素风、玻璃拟态浮动窗口和游戏终端叙事展示个人简介、技能经历与视频作品。

项目面向 GitHub Pages 静态部署，不依赖后端服务。当前本地源码已经包含首页和 About Me 页面，Portfolio 页面仍是占位页。更精确的本地、提交和部署状态见 [项目状态](docs/project-status.md)。

## 当前页面

| 路由 | 状态 | 用途 |
|---|---|---|
| `/` | 已实现 | 首页入口、主题切换、点赞与邮箱操作、三项视频作品 |
| `/about` | 已实现 | RPG 角色档案式个人介绍 |
| `/portfolio` | 占位 | 未来的完整作品集页面 |

未知路由会回到首页。GitHub Pages 子路由刷新由 `public/404.html` 和 `src/main.tsx` 共同处理。

## 主要特性

- 浅色/深色主题与自定义像素光标，主题偏好保存在浏览器 `localStorage`。
- 首页俄罗斯方块 Canvas 动态背景、玻璃窗口和响应式布局。
- 三个可从顶栏拖拽的视频作品窗格，以及 Bilibili/抖音 iframe 播放模态层。
- 本地点赞计数、像素粒子喷发与邮箱复制提示。
- About 页面中的打字机、像素进度条、滚动进入动画和分区锚点。
- 使用 `import.meta.env.BASE_URL` 适配 GitHub Pages 的 `/Dell-wiki/` 子路径。

## 本地启动

项目没有环境变量或后端依赖。需要本机安装 Node.js 与 npm；当前仓库没有固定 Node.js 版本。

```bash
npm ci
npm run dev
```

Vite 会在终端输出本地访问地址。

## 验证与构建

```bash
npm run typecheck
npm run build
npm run preview
```

`npm run typecheck` 使用 `noEmit` 检查应用 TypeScript 和根目录 JS 配置，不生成文件。`npm run build` 会先执行同一检查，再由 Vite 生成 `dist/`。提交或部署前应至少确认构建通过，并检查 `/`、`/about`、`/portfolio` 以及直接刷新子路由。

## 部署

```bash
npm run deploy
```

部署脚本会先构建，再使用 `gh-pages` 发布 `dist/`。Vite `base` 当前固定为 `/Dell-wiki/`；变更仓库名或部署到自定义域名前，必须同步修改并重新验证资源路径与 404 回跳。

- GitHub 仓库：[womianfeile/Dell-wiki](https://github.com/womianfeile/Dell-wiki)
- 配置对应的 Pages 地址：[womianfeile.github.io/Dell-wiki](https://womianfeile.github.io/Dell-wiki/)

以上链接不代表本地未提交页面已经上线，发布状态以 [项目状态](docs/project-status.md) 的分层记录和实际部署验证为准。

## 项目结构

```text
.
├─ src/
│  ├─ components/          首页组件与本地图标
│  ├─ data/homepage.ts     邮箱、导航和视频作品数据
│  ├─ hooks/               主题与 localStorage 状态
│  ├─ pages/               Home、About、Portfolio 占位页
│  └─ styles/globals.css   主题 token、通用表面和动画
├─ public/                 404 回跳、光标、图标、头像和封面
├─ docs/                   项目知识库
├─ AGENTS.md               AI 协作规则与文档索引
├─ vite.config.js          Vite 的唯一配置来源
├─ tailwind.config.js      Tailwind 的唯一配置来源
└─ tsconfig.node.json      以 checkJs + noEmit 检查根目录 JS 配置
```

项目不维护平行的 Vite/Tailwind `.ts` 或 `.d.ts` 配置副本。

## 项目文档

- [架构说明](docs/architecture.md)：路由、模块边界、状态、主题、响应式与部署架构。
- [UI 设计规范](docs/ui-design.md)：页面目标、线框、主视觉色板、设计 token、组件状态与交互规则。
- [开发与部署](docs/development.md)：内容修改方法、验证清单、GitHub Pages 发布与故障排查。
- [项目状态](docs/project-status.md)：当前本地实现、提交、推送、部署状态和后续工作。

## 协作说明

不要手工编辑 `dist/`、`node_modules/` 或 `*.tsbuildinfo`。项目的 AI 协作规则见 [AGENTS.md](AGENTS.md)；README、AGENTS 和 `docs/` 都是正式项目文档并随仓库维护。
