import { defineConfig } from '@fast-vue3/oxfmt-config';

export default defineConfig({
  ignorePatterns: [
    'dist',
    'dev-dist',
    '.local',
    'node_modules',
    'coverage',
    '*.min.js',
    'public',
    '.npmrc',
    '*-lock.yaml',
    '**/*.svg',
    '**/*.sh',
    'stats.html',
    'types/auto-imports.d.ts',
    'types/components.d.ts',
    'types/typed-router.d.ts',
    'packages/styles/src/*.css.d.ts',
  ],
});
