# Fast-Vue3 版本更新

## v0.2.0-2026/04/30

- 🚀 升级核心依赖：Vue 3.5.33、Vite 7.3.2、TypeScript 5.9.3、Pinia 3.0.4
- 📦 升级 UI 组件库：Element Plus 2.13.7、Naive UI 2.44.1、TDesign 1.19.1、iDux 2.11.0
- 📦 升级工具链：UnoCSS 66.6.8、VueUse 14.2.1、Axios 1.15.2、vue-tsc 3.2.7
- 🔧 迁移 ESLint 至 Flat Config（ESLint 9），启用 simple-import-sort 自动排序
- 🔧 修复 vite.config.mts：启用 CORS、恢复 HMR overlay
- 🔧 修复 TypeScript 路径别名：tsconfig 新增 `#/*` 映射
- 🔧 修复 Axios 封装：添加 Bearer Token 前缀、统一 HTTP 方法大写
- 🐛 修复 Header 组件 `target="_bank"` → `target="_blank"` 拼写错误
- 🐛 修复 SvgIcon 组件 `calsses` → `classes` 拼写错误
- 🐛 修复 User Store `switchRoles` 逻辑错误
- 🐛 修复 lint-staged 配置中 `--write--parser` 拼写错误
- 🐛 修复 Plop 页面模板路径 `src/pages` → `src/views`
- 🔒 移除 UserState 中的 `password` 字段（安全风险）
- 🔒 移除 result.ts 中未使用的 `Recoverable` 类型导入
- ✨ 精简 AppState 类型定义，仅保留实际使用的字段
- ✨ 更新 index.html 标题、移除重复 CSS 类
- ✨ 更新首页版本描述文案
- ✨ 统一 prettier endOfLine 为 `lf`
- ✨ 移除 unocss.config.ts 中空的 shortcuts 和 rules
- 📝 同步更新文档站所有页面

## v0.1.3-2022/06/09

- ✋ 添加了 nprogress 进度条、setup 语法设置组件名支持、应用 mkcert 为 https 开发服务提供证书支持、构建进度条
- 🔧 替换 tailwindcss 成 windicss,更轻量级
- 🎹 优化了文档一些过时的描述
- ⭐ 升级了依赖，删除无用的文件，优化了 lint 规则

## V0.1.2-2022/05/17

- 🚃 删除字节跳动的 UI 框架，改为更加亲民的 ElementPlus
- 🥵 优化提了 750 遍的 bug
- 🎸 调整了中文文档顺序，优先中文阅读
- 😈 重写 axios 封装，目前进度 100%
- 🐯 packages 里面暗藏精彩的项目，可自取

## V0.1.1-2022/01/28

- 🚃 咱的 mock 模拟的是真实登录流程，请访问`login`路由
- 🥵 修复好几卡车的 bug
- 🎸 搞了一个好看的 logo，svg 的~
- 😈 重写 axios 封装，目前进度 80%，敬请期待~
- 🐯 过年了，代码不写了，祝群里的水友们新年发发发~

## V0.1.0-2022/01/26

- 🎉 增加 vite-plugin 模块化配置,根据环境变量按需打包
- 📱 增加 mock 支持，并开启区分环境
- 🧩 统一管理全局变量`constant.ts`
- 🎎 调整了 store 的自动生成，以模块化的方式`npm run plop`
- 🧬 重写了文档，方便快速上手
- 🍡 改写了 axios，支持到处 request 或`get`，`post`
- 🎸 此次改版将更加符合大型项目的结构，下个版本会重点通过 mock，解决更加复杂的问题，例如登录，权限，鉴权，nav-menu...等。
