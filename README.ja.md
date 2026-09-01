# Fast Vue3

**言語：** [English](./README.en.md) | [简体中文](./README.md) | 日本語

> Vue3 + Monorepo をベースとした多 UI エコシステム工程プラットフォーム。7 大主流 Admin UI フレームワークを統合し、工学的アーキテクチャと長期保守性に特化しています。

---

## 📦 プロジェクト概要

| アプリ       | UI フレームワーク | ポート | 説明                            |
| ------------ | ----------------- | ------ | ------------------------------- |
| web-antd     | Ant Design Vue 4  | 3001   | 最も完成した Admin エコシステム |
| web-ele      | Element Plus 2    | 3002   | 最も人気な Vue3 UI ライブラリ   |
| web-naive    | Naive UI 2        | 3003   | TypeScript ネイティブサポート   |
| web-arco     | Arco Design Vue 2 | 3004   | ByteDance 製                    |
| web-tdesign  | TDesign Vue Next  | 3005   | Tencent 製                      |
| web-primevue | PrimeVue 4        | 3006   | 機能豊富な UI ライブラリ        |
| web-idux     | iDux 2            | 3007   | Ant Group 中/バックオフィス体系 |

---

## 🏗️ プロジェクト構成

```
fast-vue3/
├── apps/                 # 各 UI フレームワーク対応アプリ
│   ├── web-antd/         # Ant Design Vue
│   ├── web-arco/         # Arco Design
│   ├── web-ele/          # Element Plus
│   ├── web-idux/         # iDux
│   ├── web-naive/        # Naive UI
│   ├── web-primevue/     # PrimeVue
│   └── web-tdesign/      # TDesign
├── packages/             # 共有パッケージ
│   ├── @core/shared/     # コア型と定数
│   ├── effects/          # 副作用層（access/layout/request）
│   ├── locales/          # 国際化
│   ├── stores/           # Pinia ストア
│   └── utils/            # ユーティリティ関数
├── internal/             # 内部ツールパッケージ
│   ├── lint-configs/     # ESLint/Prettier/Stylelint 設定
│   ├── tsconfig/         # TypeScript 基本設定
│   └── vite-config/      # 共有 Vite 設定
└── scripts/              # スクリプトツール
    ├── turbo-run/        # インタラクティブ アプリ起動ツール
    └── vsh/              # プロジェクト スキャフォールディングツール
```

---

## ⚡ クイックスタート

### 環境要件

| ツール  | バージョン要件 |
| ------- | -------------- |
| Node.js | >= 20.0.0      |
| pnpm    | >= 9.5.0       |
| Git     | >= 2.30        |

> 推奨：Corepack で pnpm を管理：`corepack enable && corepack prepare pnpm@latest --activate`

### クローン＆インストール

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
pnpm install
```

### 開発サーバー起動

```bash
# インタラクティブ選択
pnpm dev

# または直接指定
pnpm dev:antd       # Ant Design Vue  → http://localhost:3001
pnpm dev:ele        # Element Plus    → http://localhost:3002
pnpm dev:naive      # Naive UI        → http://localhost:3003
pnpm dev:arco       # Arco Design     → http://localhost:3004
pnpm dev:tdesign    # TDesign         → http://localhost:3005
pnpm dev:primevue   # PrimeVue        → http://localhost:3006
pnpm dev:idux       # iDux            → http://localhost:3007
```

### デフォルトアカウント

全アプリはモックデータを使用します。デフォルトログイン情報：

- **ユーザー名：** `admin`
- **パスワード：** `123456`

---

## 🛠️ 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | Vue 3.5 + TypeScript 5.9 |
| ビルド | Vite 7 + Turborepo 2 |
| ルーター | Vue Router 4 + unplugin-vue-router（ファイルベースルーティング） |
| 状態管理 | Pinia 3 + pinia-plugin-persistedstate |
| スタイル | UnoCSS 66 |
| HTTP | Axios 1 |
| モック | vite-plugin-mock 3 |
| 自動インポート | unplugin-auto-import + unplugin-vue-components |
| コード品質 | ESLint Flat Config + Prettier + Stylelint + Lefthook + Commitlint |

---

## 📋 開発コマンド

```bash
# Lint チェック
pnpm lint

# 自動フォーマット
pnpm lint:fix

# 型チェック
pnpm typecheck

# コンベンショナルコミット（インタラクティブ）
pnpm commit
```

---

## 📄 ライセンス

[MIT](./LICENSE)
