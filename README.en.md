# Fast Vue3

**Languages:** English | [简体中文](./README.md) | [日本語](./README.ja.md)

> A Vue3 Monorepo engineering platform integrating 7 major Admin UI frameworks, focused on project architecture and long-term maintainability.

---

## 📦 Project Overview

| App          | UI Framework      | Port | Notes                            |
| ------------ | ----------------- | ---- | -------------------------------- |
| web-antd     | Ant Design Vue 4  | 3001 | Most complete Admin ecosystem    |
| web-ele      | Element Plus 2    | 3002 | Most popular Vue3 UI library     |
| web-naive    | Naive UI 2        | 3003 | Native TypeScript support        |
| web-arco     | Arco Design Vue 2 | 3004 | By ByteDance                     |
| web-tdesign  | TDesign Vue Next  | 3005 | By Tencent                       |
| web-primevue | PrimeVue 4        | 3006 | Feature-rich UI library          |
| web-idux     | iDux 2            | 3007 | Ant Group mid/back-office system |

---

## 🏗️ Project Architecture

```
fast-vue3/
├── apps/                 # Apps for each UI framework
│   ├── web-antd/         # Ant Design Vue
│   ├── web-arco/         # Arco Design
│   ├── web-ele/          # Element Plus
│   ├── web-idux/         # iDux
│   ├── web-naive/        # Naive UI
│   ├── web-primevue/     # PrimeVue
│   └── web-tdesign/      # TDesign
├── packages/             # Shared packages
│   ├── @core/shared/     # Core types and constants
│   ├── effects/          # Side-effect layer (access/layout/request)
│   ├── locales/          # Internationalization
│   ├── stores/           # Pinia stores
│   └── utils/            # Utility functions
├── internal/             # Internal tooling
│   ├── lint-configs/     # ESLint/Prettier/Stylelint configs
│   ├── tsconfig/         # TypeScript base configs
│   └── vite-config/      # Shared Vite configuration
└── scripts/              # Script tools
    ├── turbo-run/        # Interactive app launcher
    └── vsh/              # Project scaffolding tool
```

---

## ⚡ Quick Start

### Prerequisites

| Tool    | Version   |
| ------- | --------- |
| Node.js | >= 20.0.0 |
| pnpm    | >= 9.5.0  |
| Git     | >= 2.30   |

> Recommended: use Corepack to manage pnpm: `corepack enable && corepack prepare pnpm@latest --activate`

### Clone & Install

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
pnpm install
```

### Start Dev Server

```bash
# Interactive app selector
pnpm dev

# Or start a specific app
pnpm dev:antd       # Ant Design Vue  → http://localhost:3001
pnpm dev:ele        # Element Plus    → http://localhost:3002
pnpm dev:naive      # Naive UI        → http://localhost:3003
pnpm dev:arco       # Arco Design     → http://localhost:3004
pnpm dev:tdesign    # TDesign         → http://localhost:3005
pnpm dev:primevue   # PrimeVue        → http://localhost:3006
pnpm dev:idux       # iDux            → http://localhost:3007
```

### Default Credentials

All apps use mock data. Default login:

- **Username:** `admin`
- **Password:** `123456`

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Vue 3.5 + TypeScript 5.9 |
| Build | Vite 7 + Turborepo 2 |
| Router | Vue Router 4 + unplugin-vue-router (file-based routing) |
| State | Pinia 3 + pinia-plugin-persistedstate |
| Styling | UnoCSS 66 |
| HTTP | Axios 1 |
| Mock | vite-plugin-mock 3 |
| Auto Import | unplugin-auto-import + unplugin-vue-components |
| Code Quality | ESLint Flat Config + Prettier + Stylelint + Lefthook + Commitlint |

---

## 📋 Development

```bash
# Lint
pnpm lint

# Auto format
pnpm lint:fix

# Type check
pnpm typecheck

# Conventional commit (interactive)
pnpm commit
```

---

## 📄 License

[MIT](./LICENSE)
