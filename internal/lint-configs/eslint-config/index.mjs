import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @param {import('eslint').Linter.Config[]} [extraConfigs] */
export function defineConfig(extraConfigs = []) {
  return defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,
    {
      name: 'fast-vue3/base',
      files: ['**/*.{ts,mts,tsx,vue}'],
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        'vue/multi-word-component-names': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.turbo/**']),
    ...extraConfigs,
  );
}
