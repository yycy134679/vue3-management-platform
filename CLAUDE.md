# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + Vite + Element Plus 的后台管理平台项目。

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 代码格式化
npm run format
```

## 核心架构

### 目录结构

```
src/
├── main.js                    # 应用入口：创建 Vue 应用、注册 Pinia、Router、全局 API
├── App.vue                    # 根组件
├── api/                       # API 层
│   ├── api.js                # API 统一导出，按模块组织（如 home.getTableData）
│   ├── request.js            # Axios 实例配置、请求/响应拦截器、Mock 开关控制
│   ├── mock.js               # Mock.js 拦截器配置
│   ├── config/index.js       # 环境配置（dev/test/prod）、全局 mock 开关
│   └── mockData/             # Mock 数据按模块划分
│       └── home.js           # 首页 Mock 数据（表格、统计卡片、图表）
├── router/index.js            # Vue Router 配置（Hash 模式）
├── stores/index.js            # Pinia 状态管理（useAllDataStore，管理侧边栏折叠状态等）
├── views/                     # 页面组件
│   ├── Main.vue              # 主布局容器（侧边栏 + 顶部栏 + 内容区）
│   └── Home.vue              # 首页（统计卡片、ECharts 图表、数据表格）
├── components/                # 通用组件
│   ├── CommonHeader.vue      # 顶部导航栏（折叠按钮、面包屑、用户菜单）
│   └── CommonAside.vue       # 左侧导航菜单（响应 Pinia store 的折叠状态）
└── assets/                    # 静态资源
    ├── images/               # 图片资源
    └── less/                 # 全局样式（index.less、reset.less）
```

### API 管理架构

**三层设计**：
1. **api/api.js** - 统一出口，按业务模块组织接口（如 `home.getTableData()`）
2. **api/request.js** - HTTP 请求封装，支持接口级别或全局 Mock 切换
3. **api/mockData/** - Mock 数据源，配合 mock.js 拦截请求

**Mock 切换方式**：
```javascript
// 方式 1：全局切换（api/config/index.js）
export default { mock: true }

// 方式 2：单个接口切换（调用时传入）
request({ url: '...', mock: true })
```

**环境配置**（api/config/index.js）：
- `development`：本地开发环境，baseApi 为 `/api`
- `test`：测试环境
- `prod`：生产环境

### 状态管理

使用 Pinia，当前有 `useAllDataStore`：
- `isCollapse`：侧边栏折叠状态（CommonHeader 修改，CommonAside 响应）

### 路由结构

使用 Hash 路由模式，结构为：
```
/ (Main 布局容器)
  └── /home (首页)
```

Main 组件包含固定布局（侧边栏 + 顶部栏），子路由通过 RouterView 渲染在内容区。

### 技术栈

- Vue 3.5.22 + Composition API
- Vite 7 - 构建工具
- Element Plus 2.11.4 - UI 组件库（自动导入配置）
- Vue Router 4 - 路由管理
- Pinia 3 - 状态管理
- Axios - HTTP 请求
- ECharts 6 - 数据可视化
- Mock.js - 数据模拟
- Less - CSS 预处理器

## 开发约定

### 添加新 API 接口

1. 在 `src/api/mockData/` 创建或更新模块文件（如 `user.js`）
2. 在 `src/api/mock.js` 添加 Mock 拦截规则
3. 在 `src/api/api.js` 导出接口方法
4. 组件中通过 `this.$api.moduleName.methodName()` 调用

### 添加新页面

1. 在 `src/views/` 创建页面组件
2. 在 `src/router/index.js` 的 Main children 中添加路由配置
3. 在 `src/components/CommonAside.vue` 的 menuData 中添加菜单项

### 配置说明

**vite.config.js**：
- 路径别名 `@` 指向 `./src`
- 使用 `unplugin-auto-import` 和 `unplugin-vue-components` 自动导入 Element Plus 组件
- Element Plus 图标需手动全局注册（已在 main.js 中完成）

**全局样式**：
- 入口：`src/assets/less/index.less`（在 main.js 中导入）
- 定义了常用工具类：`.fl`（左浮动）、`.fr`（右浮动）、`.clearfix`（清除浮动）

### 图表开发

使用 ECharts 6.0，参考 `src/views/Home.vue` 中的实现：
1. 在 `<template>` 中创建容器 div（需要明确宽高）
2. 在 `onMounted` 中初始化图表实例
3. 通过 API 获取数据后调用 `setOption` 配置图表

### 组件样式

- 使用 `<style scoped lang="less">` 确保样式作用域隔离
- 使用 `:deep()` 修改 Element Plus 组件内部样式
- 全局样式放在 `src/assets/less/` 中

### Node 版本要求

需要 Node.js `^20.19.0` 或 `>=22.12.0`
