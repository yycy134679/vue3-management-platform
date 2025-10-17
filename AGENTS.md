# Repository Guidelines

## Project Structure & Module Organization
- `src/` 应用源码：
  - `src/components/` 复用组件（PascalCase，如 `CommonHeader.vue`）。
  - `src/views/` 路由页面视图。
  - `src/stores/` Pinia 状态管理。
  - `src/router/index.js` 路由入口。
  - `src/assets/{images,less}` 静态资源与样式（Less）。
- `public/` 静态公开资源。
- `index.html` 应用模板；`vite.config.js` 构建配置。

## Build, Test, and Development Commands
- `npm run dev`：本地启动 Vite 开发服务器。
- `npm run build`：生产构建到 `dist/`。
- `npm run preview`：本地预览构建产物。
- `npm run format`：使用 Prettier 格式化 `src/` 代码。
- Node 版本：`^20.19.0 || >=22.12.0`（见 `package.json`）。

## Coding Style & Naming Conventions
- 使用 Prettier（见 `.prettierrc.json`），建议 2 空格缩进、单文件组件 SFC（`<script setup>` 优先）。
- 组件文件与导出使用 PascalCase；路由名称与路径使用 kebab-case。
- 样式优先 Less，建议 BEM 命名（如 `.app-header__logo`）。
- 引入 UI：Element Plus 与 @element-plus/icons-vue。

## Testing Guidelines
- 目前未内置测试框架。若新增：推荐 Vitest + Vue Test Utils。
- 测试文件命名：与源文件同级 `*.spec.js` 或放置 `tests/`。
- 脚本示例：在 `package.json` 增加 `"test": "vitest"` 后运行 `npm test`。

## Commit & Pull Request Guidelines
- 提交遵循 Conventional Commits：`feat: ...`、`fix: ...`、`refactor: ...`、`docs: ...` 等（本仓库历史已有示例）。
- PR 要求：清晰描述、关联 Issue、包含 UI 变更截图/录屏、列出影响范围与测试要点。
- 一事一 PR；避免混合无关修改。

## Security & Configuration Tips
- 勿提交敏感信息；将私密配置放入本地未跟踪文件（如 `.env.local`）。
- 依赖最小化，按需引入组件与样式，减少包体与攻击面。

## Agent-Specific Instructions
- 本文件适用于仓库根目录及其子目录；保持最小变更、遵循现有目录与脚本约定。
