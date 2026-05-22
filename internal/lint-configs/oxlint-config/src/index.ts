import type { OxlintConfig } from 'oxlint';

import { defineConfig } from 'oxlint';

const oxlintConfig: OxlintConfig = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  ignorePatterns: [
    'dist',
    'dev-dist',
    'node_modules',
    'coverage',
    '*.min.js',
    'public',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
  },
};

function defineFastVue3OxlintConfig(
  config: Partial<OxlintConfig> = {},
): OxlintConfig {
  return defineConfig({
    ...oxlintConfig,
    ...config,
    rules: {
      ...oxlintConfig.rules,
      ...config.rules,
    },
  } as OxlintConfig);
}

export { defineFastVue3OxlintConfig as defineConfig, oxlintConfig };
export type { OxlintConfig };
