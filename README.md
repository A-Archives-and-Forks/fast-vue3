# Fast Vue3

**语言：** [English](./README.en.md) | 简体中文 | [日本語](./README.ja.md)

> 基于 Vue3 + Monorepo 的多 UI 生态工程平台，集成 7 大主流 Vue UI 框架，提供后台管理（admin）与门户（site）两类应用模板，专注工程架构与长期可维护性。

---

## 📦 项目概览

| 应用         | UI 框架           | 说明                |
| ------------ | ----------------- | ------------------- |
| web-antd     | Ant Design Vue 4  | 最完整的 Admin 生态 |
| web-ele      | Element Plus 2    | 最流行的 Vue3 UI 库 |
| web-naive    | Naive UI 2        | TypeScript 原生支持 |
| web-arco     | Arco Design Vue 2 | 字节跳动出品        |
| web-tdesign  | TDesign Vue Next  | 腾讯出品            |
| web-primevue | PrimeVue 4        | 功能最丰富的 UI 库  |
| web-idux     | iDux 2            | 蚂蚁集团中后台体系  |

> 此外，每个 UI 框架还配套一个**门户（site）应用模板**，位于 `apps/site-<framework>/`，用于快速搭建产品官网 / SaaS 门户。

---

## 🏗️ 工程架构

```
fast-vue3/
├── apps/                 # 各 UI 框架对应的应用
│   ├── web-antd/         # Ant Design Vue
│   ├── web-arco/         # Arco Design
│   ├── web-ele/          # Element Plus
│   ├── web-idux/         # iDux
│   ├── web-naive/        # Naive UI
│   ├── web-primevue/     # PrimeVue
│   └── web-tdesign/      # TDesign
├── packages/             # 共享包
│   ├── @core/shared/     # 核心共享逻辑
│   ├── constants/        # 全局常量
│   ├── effects/          # 副作用层（access/layout/request）
│   ├── locales/          # 国际化
│   ├── preferences/      # 主题与偏好配置
│   ├── stores/           # Pinia stores
│   ├── styles/           # 全局样式（reset/global/themes）
│   ├── types/            # 共享类型定义
│   └── utils/            # 工具函数
├── internal/             # 内部工具包
│   ├── lint-configs/     # ESLint/Prettier/Stylelint/OxLint 配置
│   ├── node-utils/       # Node.js 工具函数
│   ├── tsconfig/         # TypeScript 基础配置
│   └── vite-config/      # Vite 共享配置
└── scripts/              # 脚本工具
    ├── turbo-run/        # 交互式选择启动应用
    └── vsh/              # 项目脚手架 & CLI 工具
```

---

## ⚡ 快速开始

### 环境要求

| 工具    | 版本要求   |
| ------- | ---------- |
| Node.js | >= 20.12.0 |
| pnpm    | >= 9.5.0   |
| Git     | >= 2.30    |

### 克隆与安装

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
pnpm install
```

### 启动开发服务器

```bash
# 交互式选择要启动的应用
pnpm dev

# 或直接指定应用
pnpm dev:antd
pnpm dev:ele
pnpm dev:naive
pnpm dev:arco
pnpm dev:tdesign
pnpm dev:primevue
pnpm dev:idux
```

### 创建新应用

```bash
pnpm run create-app
```

支持两种应用模式：

- **Admin（后台管理）**：带 layout、路由守卫、登录页
- **Site（门户 / 官网）**：轻量营销 / 产品门户页面

支持 7 种 UI 框架可选。

### 默认账号

所有应用均使用 Mock 数据，默认账号：

- **用户名：** `admin`
- **密码：** `123456`

---

## 🛠️ 技术栈

| 分类     | 技术                                                              |
| -------- | ----------------------------------------------------------------- | --- |
| 框架     | Vue 3.5 + TypeScript 6                                            |
| 构建     | Vite 8 + Turborepo 2 + tsdown                                     |
| 路由     | Vue Router 4 + unplugin-vue-router（文件路由）                    |
| 状态     | Pinia 3 + pinia-plugin-persistedstate                             |
| 样式     | Tailwind CSS v4 + CSS Variables 主题系统                          |
| HTTP     | Axios 1                                                           |
| Mock     | Nitro Mock 服务（开发期自动拉起，端口 5320）                      |     |
| 自动导入 | unplugin-auto-import + unplugin-vue-components                    |
| 代码质量 | ESLint 10 + Prettier + Stylelint + OxLint + Lefthook + Commitlint |
| 主题     | @fast-vue3/preferences（深色模式 / 主色 / 布局偏好）              |

---

## 🎨 主题配置

所有应用支持：

- 亮色 / 暗色 / 跟随系统 三种主题模式
- 自定义主色调
- 侧边栏折叠 / 宽度配置
- 标签页 / 面包屑开关
- 色弱模式 / 灰色模式

偏好设置通过 `@fast-vue3/preferences` 包管理，自动持久化到 localStorage。

---

## 📋 开发规范

```bash
# 代码检查
pnpm lint

# 自动格式化
pnpm lint:fix

# 类型检查
pnpm typecheck

# 规范提交（交互式）
pnpm commit
```

---

## 📄 License

[MIT](./LICENSE)
