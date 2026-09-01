# @fast-vue3/vsh

Fast Vue 3 仓库内的工程化 CLI 工具，基于 [cac](https://github.com/cacjs/cac) + [consola](https://github.com/unjs/consola) 构建，通过 `tsdown` 打包为 `dist` 并在 `postinstall` 阶段生成 stub 产物。

## 命令列表

- `vsh lint`：运行代码检查（oxfmt + oxlint + eslint + stylelint）
- `vsh publint`：检查 `package.json` 是否符合发布规范
- `vsh code-workspace`：管理 VS Code 多根工作区配置
- `vsh check-circular`：扫描包之间的循环依赖
- `vsh check-dep`：检查未使用 / 缺失的依赖
- `vsh create-app`：在 Monorepo 的 `apps/` 下交互式创建一个新应用（选择 admin / site 模式与 UI 框架）

## 开发

```bash
# 本地构建 CLI
pnpm --filter @fast-vue3/vsh run build

# 运行命令
pnpm vsh [command]
```

> 说明：`create-app` 当前用于在**当前 Monorepo 内**生成应用骨架（依赖 `@fast-vue3/*` 内部共享包，使用 `workspace:*` 协议），并非独立可发布的工程模板。
