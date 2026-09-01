# Agent Notes

This repository is a Vue 3 + TypeScript monorepo for building the same admin/site experience across multiple Vue UI ecosystems.

## Repo Shape

- `apps/`: runnable applications.
  - `web-*`: admin applications for Ant Design Vue, Arco Design, Element Plus, iDux, Naive UI, PrimeVue, and TDesign.
  - `site-*`: portal/marketing site templates for the same UI families.
  - `web-app`: generic site-style app.
  - `backend-mock`: Nitro mock API service.
- `packages/`: shared runtime packages used by apps.
  - `effects/request`: axios client factory and typed request helpers.
  - `stores`: Pinia setup and store modules.
  - `preferences`: theme/layout preference state.
  - `styles`: global/reset/theme/site CSS.
  - `types`, `constants`, `utils`, `locales`, `@core/shared`: shared contracts and helpers.
- `internal/`: internal engineering packages.
  - `vite-config`: shared Vite config and plugins.
  - `lint-configs`: eslint/prettier/stylelint/oxlint/oxfmt/commitlint presets.
  - `tsconfig`: shared TypeScript configs.
  - `node-utils`: Node helpers for local scripts.
- `scripts/`: local CLIs.
  - `vsh`: project commands including `lint` and `create-app`.
  - `turbo-run`: interactive package script runner.

## Common Commands

- Install with `pnpm install`.
- Run an interactive dev target with `pnpm dev`.
- Run a specific app with `pnpm dev:<app-name>`, for example `pnpm dev:web-antd` or `pnpm dev:site-antd`.
- Legacy short aliases also exist for admin apps, for example `pnpm dev:antd`.
- Build a specific app with `pnpm build:<app-name>`, for example `pnpm build:web-antd`.
- Check lint/format with `pnpm lint`.
- Auto-fix lint/format issues with `pnpm format`.
- Typecheck the workspace with `pnpm typecheck`.
- Create a new application with `pnpm create-app`.

## Create App Behavior

`scripts/vsh/src/create-app/index.ts` owns app scaffolding. When it creates `apps/<name>`, it also updates root `package.json` with:

- `dev:<name>` -> `pnpm -F @fast-vue3/<name> run dev`
- `build:<name>` -> `pnpm -F @fast-vue3/<name> run build`

If this logic changes, rebuild the CLI with:

```bash
pnpm -F @fast-vue3/vsh run stub
```

The executable `scripts/vsh/bin/vsh.mjs` loads `scripts/vsh/dist/index.mjs`, so source-only edits to `scripts/vsh/src/**` are not enough for local CLI behavior.

## Generated And Local Files

Do not commit generated or local state:

- `node_modules/`
- `dist/`, `.output/`, `.nitro/`, `.turbo/`
- `stats.html`
- `.eslintcache`, `.stylelintcache`
- `*.tsbuildinfo`
- `apps/backend-mock/.env`
- `.workbuddy/`

Front-end app `.env.development` and `.env.production` are shared environment templates in this repo. Treat them as source unless the task explicitly says otherwise.

## Coding Conventions

- Prefer existing workspace packages and patterns over new abstractions.
- Use `@fast-vue3/vite-config` for Vite app/library config.
- Use `@fast-vue3/request` for HTTP clients instead of creating unrelated axios wrappers.
- Use `@fast-vue3/stores` for Pinia setup.
- Keep UI-framework-specific code inside the matching `apps/web-*` or `apps/site-*` package.
- Keep cross-app logic in `packages/` only when it is truly shared.
- Keep internal tooling in `internal/` or `scripts/`, not in application packages.

## Lint Notes

`pnpm lint` may emit warnings for underscore-prefixed internals and two existing `v-html` usages, but it should exit successfully. Fix new errors rather than weakening global lint rules.

When fixing `unicorn/no-nested-ternary`, prefer small helper functions or straightforward `if` branches over parenthesizing complex nested ternaries.
