function defineConfig(overrides = {}) {
  return {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'body-leading-blank': [1, 'always'],
      'footer-leading-blank': [1, 'always'],
      'header-max-length': [2, 'always', 108],
      'subject-empty': [2, 'never'],
      'type-empty': [2, 'never'],
      'type-enum': [
        2,
        'always',
        [
          'feat',
          'fix',
          'refactor',
          'perf',
          'style',
          'test',
          'docs',
          'ci',
          'chore',
          'revert',
          'build',
          'wip',
        ],
      ],
      ...overrides,
    },
  };
}

module.exports = defineConfig();
module.exports.defineConfig = defineConfig;
