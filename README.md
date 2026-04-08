# Dell-wiki 首页框架

这是一个基于 React + TypeScript + Tailwind CSS + Framer Motion 的静态首页骨架，当前只实现首页和两个占位路由。

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 目前已实现

- 淡彩色像素风首页底座
- Hello 窗格
- GENERAL 窗格
- 右上角主题切换
- 点赞按钮和邮件复制按钮
- 3 个可拖拽视频窗格
- 视频模态层
- About / Portfolio 占位路由
- GitHub Pages 404 回跳文件

## 后续你需要替换的内容

- 头像素材
- GENERAL 窗格的像素 icon
- 3 个视频窗格封面
- 真实视频嵌入地址
- 如果要部署到 GitHub Pages 的子路径，需要再确认 `vite.config.ts` 的 `base`
