/** @param {import('stylelint').Config} [overrides] */
export function defineConfig(overrides = {}) {
  return {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order'],
    overrides: [
      {
        files: ['**/*.vue'],
        customSyntax: 'postcss-html',
      },
      {
        files: ['*.less', '**/*.less'],
        customSyntax: 'postcss-less',
      },
    ],
    rules: {
      'selector-not-notation': null,
      'import-notation': null,
      'function-no-unknown': null,
      'selector-class-pattern': null,
      'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global'] }],
      'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] }],
      'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'unocss'] }],
      'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    },
    ...overrides,
  };
}
